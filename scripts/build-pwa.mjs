import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const files = [
  'index.html',
  'styles.css',
  'manifest.webmanifest',
  'sw.js',
  'pwa.js',
  'curriculum.js',
  'content-data.js',
  'curriculum-ext.js',
  'exams.js',
  'exams-ecba.js',
  'exams-cfa.js',
  'cfa-assessments.js',
  'cfa-assessments-phase0.js',
  'cfa-assessments-phase1a.js',
  'cfa-blueprint.js',
  'cfa-formulas.js',
  'cfa-foundations.js',
  'cfa-quant.js',
  'app.js',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon-180.png'
];

const missing = files.filter((file) => !existsSync(join(root, file)));
if (missing.length) {
  console.error(`Missing runtime files:\n${missing.join('\n')}`);
  process.exit(1);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const file of files) {
  const target = join(dist, file);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(root, file), target);
}

writeFileSync(join(dist, '.nojekyll'), '');
console.log(`Built ${files.length} PWA files in dist/`);
