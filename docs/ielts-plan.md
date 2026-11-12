# IELTS Academic — Handoff Note

**Status:** IELTS Academic track implemented through full mock exams. Automated content checks and browser smoke tests pass.
**Date:** 2026-11-11
**Repo:** NeZha repository root

## 1. Product decisions

- Target: IELTS Academic 7.0+ study track inside NeZha.
- UI is Vietnamese; learning content and mock prompts are English.
- This is an original study scaffold, not official IELTS material.
- No affiliation with IELTS, the British Council, IDP, or Cambridge.
- No pass guarantee. Practice targets are study signals, not official band scores.
- Writing and Speaking are self-assessed with rubrics. There is no AI examiner or backend scoring.
- Listening and Reading use MCQ approximations inside the existing exam engine.
- Keep the app local-first and offline-capable.

## 2. Implemented

### Core curriculum

- 7 modules, 24 core lessons.
- 72 quiz questions and 72 flashcards.
- Modules: Orientation, Listening, Reading, Writing Task 1, Writing Task 2, Speaking, Language.
- Full Mock Exams are hydrated from the exam registry into the IELTS track at runtime.

### Full mock exams

| Exam | ID | Content | Time |
| --- | --- | --- | --- |
| Listening Full Mock 1 | `ielts-listening-mock-1` | 4 parts, 40 MCQ, transcript | 40 min |
| Reading Full Mock 1 | `ielts-reading-mock-1` | 3 passages, 40 MCQ | 60 min |
| Writing Full Mock 1 | `ielts-writing-mock-1` | Task 1 + Task 2 | 60 min |
| Speaking Full Mock 1 | `ielts-speaking-mock-1` | Parts 1–3 notes | 14 min |

Listening audio is generated TTS stored in `assets/ielts/listening/`. It is shorter than the real IELTS recording and is labeled as practice in the UI.

### Writing and Speaking rubric

Writing criteria:

- Task Response
- Coherence and Cohesion
- Lexical Resource
- Grammatical Range and Accuracy

Speaking criteria:

- Fluency and Coherence
- Lexical Resource
- Grammatical Range and Accuracy
- Pronunciation

Scores use a 1–9 self-assessment scale. The app converts the average to a practice percentage for history and target badges.

### Exam engine changes

- Section resources: audio, transcript, and reading passage.
- Task sections with `questions: []` and `tasks`.
- Writing response persistence and word counts.
- Speaking notes persistence.
- Rubric persistence, review, and history.
- Existing MCQ timer, break, palette, flag, resume, and topic review behavior is preserved.

## 3. Data and files

- `ielts-curriculum.js`: core track and lessons.
- `exams-ielts.js`: all four mock exams.
- `assets/ielts/listening/*.m4a`: TTS audio.
- `scripts/build-ielts-audio.mjs`: regenerates listening audio with macOS `say` and `afconvert`.
- `scripts/validate-ielts.mjs`: content and exam validation.
- `exams.js`: preserves section/task/resource fields during normalization.

## 4. Commands

```bash
npm run check
npm run validate:ielts
npm run validate:cfa
npm run build:ielts-audio
npm run build:pwa
npm run deploy:pages
```

## 5. Acceptance checks

- `npm run check` passes.
- `npm run validate:ielts` passes:
  - 24 lessons, 72 quiz, 72 flashcards;
  - 40 listening questions, 40 reading questions;
  - 2 writing tasks, 3 speaking parts;
  - audio files exist and are non-empty.
- `npm run validate:cfa` passes; existing CFA data is unchanged.
- Browser smoke test:
  - track page lists all four IELTS mocks;
  - writing flow saves responses, updates word count, submits, reviews, and persists rubric scores;
  - listening player and hidden transcript render correctly;
  - reading passage renders during the exam;
  - speaking notes render for all three parts;
  - no runtime errors captured.

## 6. Remaining limitations

- Listening audio is synthetic and shorter than the real test.
- MCQ does not cover all real IELTS task types.
- Writing/Speaking scoring is self-assessment only.
- Expert content review and learner testing remain pending.
- Audio generation requires macOS voices.
