# ISTQB Foundation (CTFL v4.0) — Handoff Note

**Status:** Track shell, content data, objective map, K3 scenario drill, metadata, mock registration, and coverage report implemented.
**Date:** 2026-11-12
**Repo:** NeZha repository root

## 1. Official CTFL facts used

- Certification: ISTQB Certified Tester Foundation Level (CTFL v4.0).
- Syllabus: v4.0.1.
- Exam: 40 multiple-choice questions.
- Standard duration: 60 minutes.
- Approved 25% non-native-language extension: 75 minutes.
- Pass mark: 26/40 = 65%.
- Prerequisite: none.
- Validity: lifetime.
- Chapter distribution: Ch1 8, Ch2 6, Ch3 4, Ch4 11, Ch5 9, Ch6 2.
- K-level mix: 8 K1, 24 K2, 8 K3.

App mocks are single-best-answer approximations. Official items may differ.

Recorded metadata: `source = "ISTQB CTFL v4.0 syllabus v4.0.1, public outline"`, `verifiedOn = "2026-11-12"`, `volatile = false`. Every study fact carries the same metadata.

## 2. Chapter mapping

| App module | CTFL chapter | Questions |
| --- | --- | --- |
| `istqb-fundamentals` | Ch1 Fundamentals of Testing | 8 |
| `istqb-sdlc` | Ch2 Testing Throughout the SDLC | 6 |
| `istqb-static` | Ch3 Static Testing | 4 |
| `istqb-design` | Ch4 Test Analysis and Design | 11 |
| `istqb-management` | Ch5 Managing Test Activities | 9 |
| `istqb-tools` | Ch6 Test Tools | 2 |

## 3. App course architecture

- 2 orientation lessons (`istqb-mod-0`) + 6 generated topic modules (`istqb-core-1..6`, 16 lessons) + 2 final-review lessons (`istqb-mod-7`) = 20 core lessons.
- 20 core lessons × 3 quiz questions = 60 quiz questions.
- 20 core lessons × 3 flashcards = 60 flashcards.
- Optional 2-lesson trading-app QA bridge (`istqb-mod-8`) is additional and not counted in the 20 core lessons.
- `curriculum-ext.js` is expected to insert `istqb-core-1..6` before `istqb-mod-7` using the content topics.
- The ISTQB track is inserted after Securities when present, otherwise after BA.
- Track is optional (`optional = true`), has no prerequisite, and does not affect the overall score.
- All 60 study facts are bound to 21 original objective codes (`NZ-FND-*`, `NZ-SDLC-*`, `NZ-STAT-*`, `NZ-DES-*`, `NZ-MGT-*`, `NZ-TOOL-*`).
- The objective map and fact counts are documented in `docs/istqb-coverage.md`.

## 4. Practice mocks

- 3 practice mocks built from `window.NEZHA_CONTENT.istqb` by `exams-istqb.js`.
- Each mock: 40 questions, 60 minutes, target 65% (26/40).
- Question counts follow the six-chapter distribution above.
- Registration uses the existing exam registry: `window.NEZHA_EXAMS.buildFactExamSets(...)` with 3 forms and 4 options per question.
- `istqb-k3-scenario-drill` adds 20 original K3 questions in 30 minutes: 7 equivalence partitioning, 7 boundary-value analysis, and 6 decision table.
- The K3 drill uses a 65% practice target and is not a real exam form.

## 5. Mock limitations

- The app uses a single-best-answer format only.
- Official items may ask for two answers or use multi-select; the app does not simulate that.
- Generated distractors and wording are original approximations, not official item styles.
- Mock scores are practice signals, not predictions of the real result.

## 6. Disclaimer

Unofficial original study content. No ISTQB affiliation, endorsement, or approval. These are not official mock exams and there is no pass guarantee. Do not copy ISTQB syllabus, sample-exam, or exam material. Keep the UI in Vietnamese and the learning content in English.

## 7. Official sources

- Certification page: `https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0`
- Syllabus download: `https://istqb.org/?sdm_process_download=1&download_id=3345`

## 8. Validation

Run:

```bash
npm run check
npm run validate:istqb
```

For the full repository check:

```bash
npm run validate:all
npm run build:pwa
```

The validator checks the 3 full mocks, the 20-question K3 drill, objective coverage, unique stems, explanations, forbidden option patterns, answer balance, and source/verifiedOn/volatile metadata.
