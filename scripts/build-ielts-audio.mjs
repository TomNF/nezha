import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tempRoot = join(root, '.tmp-ielts-audio');
const source = readFileSync(join(root, 'exams-ielts.js'), 'utf8');
const sandbox = { window: { NEZHA_EXAMS: { registerMany() {} } } };
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: 'exams-ielts.js' });

const data = sandbox.window.NEZHA_IELTS_EXAMS;
if (!data || !data.listening) {
  console.error('Cannot read IELTS listening data.');
  process.exit(1);
}

const voices = {
  Narrator: 'Samantha',
  Priya: 'Rishi',
  Alex: 'Daniel',
  Maya: 'Karen',
  'Dr Hayes': 'Daniel',
  Lena: 'Samantha',
  Marcus: 'Karen',
  'Dr Rossi': 'Samantha'
};

function wavParts(buffer) {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Not a WAV file.');
  }
  let offset = 12;
  let format = null;
  let data = null;
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const body = buffer.subarray(offset + 8, offset + 8 + size);
    if (id === 'fmt ') format = body;
    if (id === 'data') data = body;
    offset += 8 + size + (size % 2);
  }
  if (!format || !data) throw new Error('WAV is missing fmt or data chunk.');
  return { format, data };
}

function concatWav(files, output) {
  const parts = files.map((file) => wavParts(readFileSync(file)));
  const format = parts[0].format;
  const channels = format.readUInt16LE(2);
  const sampleRate = format.readUInt32LE(4);
  const bitsPerSample = format.readUInt16LE(14);
  const silence = Buffer.alloc(Math.floor(sampleRate * 0.35) * channels * (bitsPerSample / 8));
  const chunks = [];
  parts.forEach((part, index) => {
    if (index) chunks.push(silence);
    chunks.push(part.data);
  });
  const data = Buffer.concat(chunks);
  const header = Buffer.alloc(44);
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * channels * (bitsPerSample / 8), 28);
  header.writeUInt16LE(channels * (bitsPerSample / 8), 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(data.length, 40);
  writeFileSync(output, Buffer.concat([header, data]));
}

if (!existsSync(tempRoot)) mkdirSync(tempRoot, { recursive: true });

try {
  for (const section of data.listening.sections) {
    const files = [];
    section.transcriptSegments.forEach(([speaker, text], index) => {
      const voice = voices[speaker] || 'Samantha';
      const file = join(tempRoot, `${section.id}-${index}.wav`);
      execFileSync('say', [
        '-v', voice,
        '-r', '168',
        '-o', file,
        '--data-format=LEI16@22050',
        text
      ]);
      files.push(file);
    });

    const wav = join(tempRoot, `${section.id}.wav`);
    concatWav(files, wav);
    const target = join(root, section.audioSrc);
    mkdirSync(dirname(target), { recursive: true });
    execFileSync('afconvert', [
      '-f', 'm4af',
      '-d', 'aac',
      '-b', '32000',
      '-c', '1',
      wav,
      target
    ]);
    console.log(`Built ${relative(root, target)} (${section.transcriptSegments.length} segments)`);
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
