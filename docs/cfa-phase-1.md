# CFA Phase 1 — Handoff Note

**Status:** Phase 0 and Phase 1A implemented. Phase 1A acceptance checks pass; assessment banks are split by phase; app renamed NeZha; expert content review remains pending.
**Date:** 2026-11-08
**Repo:** NeZha repository root

## 1. Product decisions

- Target learner: complete beginner.
- App role: main learning source.
- Timeline: 9–12 months, 6–8 hours/week, 300–400 total hours.
- Expert content review: available.
- CFAI LES/curriculum: reference and fallback until app topics are built.
- No pass guarantee and no CFA Institute endorsement.
- Do not copy CFAI curriculum, LES, or mock questions.
- Build each topic 2–3 weeks ahead of the study schedule.

## 2. Current app state

- Local-first vanilla JS app; no build step; `node server.js` on port `4173`.
- Existing tracks: IT 8 lessons, BA 54, CFA 65, Fintech 8; 135 curriculum lessons total.
- Existing CFA content: 53 orientation lessons, 12 Phase 1A lessons, plus 3 diagnostic/pacing mocks.
- Existing CFA mocks use 180 facts × 3 variants = 540 questions. They are diagnostic, not high-quality exam prep.
- Existing exam engine: timer, break, palette, flag, resume, review, topic breakdown. Keep it.
- State version is now 3. `defaultState` is in `app.js`; migration is handled by `normalizeState`.
- Routes are parsed in `app.js`; the render dispatch is in `render()`.
- Scripts load from `index.html` in classic-script order.
- Existing UI fix to preserve: the “Module tiếp theo →” button lives in the lesson sidebar next to mark-complete.
- Exam registry must keep append semantics; do not overwrite existing exams without `replace: true`.

## 3. Phase 0 — implemented

Phase 0 added:

- `cfa-blueprint.js` with 10 CFA topics, 2027 weight labels, a 40-question diagnostic, and plan defaults.
- State v3 with `state.cfa`: target date, weekly hours, diagnostic, plan metadata.
- `#/cfa` readiness hub:
  - positioning and disclaimer;
  - diagnostic status and route;
  - target date and weekly-hours planner;
  - topic weight overview;
  - Phase 0 scope and next-step explanation.
- `#/cfa/diagnostic`:
  - 40 original questions grouped by Foundations and 10 CFA topics;
  - scoring and route: `<50%` Foundations, `50–70%` Fast-track, `>70%` Core;
  - per-topic result breakdown;
  - retake flow.
- CFA track page entry card linking to the readiness hub.
- `scripts/validate-cfa-phase0.mjs` and `npm run validate:cfa`.
- `docs/cfa-phase-1.md`, `AGENTS.md`, and `opencode.json`.

Phase 0 does not add any lessons, practice bank, or mocks. Existing modules are intentionally unchanged.

### Phase 0 verification

- `npm run check` passed.
- `npm run validate:cfa` passed: 10 topics, 11 sections, 40 questions, answer distribution `0:14 / 1:13 / 2:13`.
- CDP smoke test passed:
  - hub renders and state initializes at version 3;
  - 40 diagnostic questions render in 11 sections;
  - submitting the diagnostic stores score, route, and 11 topic results;
  - a 100% diagnostic routes to Core;
  - retake resets the diagnostic;
  - target date and weekly hours persist;
  - CFA track entry card renders without changing the existing CFA modules;
  - mobile 390px has no horizontal overflow;
  - no browser console errors.
- Migration test passed: a version 2 state with legacy progress and sessions loads as version 3 with `state.cfa` defaults and preserves old data.

## 4. Phase 1A — implemented

Phase 1A is a 3–4 week vertical slice. Implementation and automated acceptance checks are complete. Expert review of the authored content is still pending.

Goal: a beginner can diagnose, learn Finance math/calculator and Quant TVM, practice 100 curated questions, log errors, and see readiness v1.

Deliverables:

- 12 lessons:
  - 6 Finance math/calculator lessons.
  - 6 Quant TVM lessons.
- 100 curated questions:
  - 60 calculation.
  - 25 application.
  - 15 conceptual.
- Practice mode with immediate feedback.
- Error log with reattempt and resolve.
- Formula sheet for TVM.
- Readiness v1.
- Full expert review of Phase 1A content (pending).

Do not build the full Foundations track or all 10 core topics in Phase 1A.

### Finance math/calculator lessons

1. Finance math map.
2. Time value of money.
3. Compounding and discounting.
4. Annuities and perpetuities.
5. NPV and IRR.
6. BA II Plus calculator workflow.

### Quant TVM lessons

1. Interest rate interpretation.
2. EAR/APR.
3. Compounding frequency.
4. Loan amortization.
5. Uneven cash flows.
6. Exam-style TVM traps.

### Phase 1A state additions

Extend `state.cfa` with:

```js
practice: {
  attempts: [],
  active: null
},
errorLog: [],
formulas: {}
```

Cap `practice.attempts` and `errorLog` to avoid localStorage bloat. Export/import must include them. `resetProgress` clears CFA learning data but keeps target date and weekly hours.

### Phase 1A routes

- `#/cfa/practice`
- `#/cfa/practice/:topic`
- `#/cfa/formulas`
- `#/cfa/errors`
- `#/cfa/plan` if the plan is split out of the hub.

### Phase 1A files

New:

- `cfa-foundations.js`
- `cfa-quant.js`
- `cfa-assessments.js`
- `cfa-assessments-phase0.js`
- `cfa-assessments-phase1a.js`
- `cfa-formulas.js`

Modify:

- `app.js`
- `index.html`
- `styles.css`
- `package.json`

Tests:

- `scripts/validate-cfa-phase1.mjs`
- `scripts/cdp-cfa-phase1.mjs` if CDP/Puppeteer is available.

### Phase 1A implementation

Phase 1A now ships with:

- `cfa-formulas.js`: 29 formulas across 7 categories (Time value, Compounding, Annuities, Investment decisions, Loans, Exam shortcuts, BA II Plus).
- `cfa-assessments.js`: assessment registry (`window.NEZHA_CFA_ASSESSMENTS`) with `get`, `list`, `byPhase`, `byKind`, and `lessonQuizFor`.
- `cfa-assessments-phase0.js`: 40-question diagnostic bank.
- `cfa-assessments-phase1a.js`: 100 practice questions plus 36 lesson-quiz questions, registered as separate Phase 1A banks.
- `cfa-foundations.js`: module `cfa-phase1-finance-math` with 6 lessons (`cfa-fm-1` … `cfa-fm-6`); quiz data comes from the Phase 1A bank.
- `cfa-quant.js`: module `cfa-phase1-quant-tvm` with 6 lessons (`cfa-tvm-1` … `cfa-tvm-6`); quiz data comes from the Phase 1A bank.
- `app.js`: Phase 1A state, routes, practice session engine, error log, formula sheet, readiness v1, and handlers.
- Phase 1A routes: `#/cfa/practice`, `#/cfa/practice/:topic`, `#/cfa/formulas`, `#/cfa/errors`.
- State: `state.cfa.practice`, `state.cfa.errorLog`, `state.cfa.formulas`; attempts cap `500`, error log cap `200`.
- `styles.css`: practice, formula sheet, error log, readiness, and mobile styles.
- `scripts/validate-cfa-phase1.mjs`; `npm run validate:cfa` now runs Phase 0 and Phase 1A validation.
- `npm run check` includes the assessment registry, phase banks, content files, and validators.

The 12 lessons are inserted before `cfa-mod-1`; existing CFA modules are preserved. The next-module button remains beside mark-complete.

### Phase 1A verification

- `npm run check` passed.
- `npm run validate:cfa` passed:
  - Phase 0: 10 topics, 11 sections, 40 questions.
  - Phase 1A: 29 formulas, 100 questions, 2 modules, 12 lessons.
  - Calculation questions all include at least 2 worked steps.
  - Question IDs, stems, options, topics, LOS, difficulty, answers, and explanations validated.
- CDP Phase 1A smoke test passed:
  - practice hub renders 2 topics plus mixed drill;
  - a 10-question session starts and persists across reload;
  - wrong answers show immediate feedback, worked steps, and create error-log entries;
  - session summary shows 90% on a 9/10 run and links to the error log;
  - reattempt resolves the error; open/resolved/all filters work;
  - formula search filters 29 cards; category filter and confidence buttons work;
  - readiness v1 updates diagnostic, practice, error, and formula components;
  - Phase 1A lesson renders 3 quiz questions and 3 flashcards;
  - 390px viewport has no horizontal overflow;
  - no browser console errors.
- Phase 0 smoke test still passed after Phase 1A changes.
- A v2 state with legacy progress and sessions migrates to v3, preserves old data, and initializes Phase 1A state defaults.
- 100% diagnostic still routes to Core.

### Assessment modules and NeZha rename

- Assessment data is now organized by phase:
  - Phase 0: `cfa-assessments-phase0.js`.
  - Phase 1A: `cfa-assessments-phase1a.js` for practice and lesson quizzes.
  - Future phases: add `cfa-assessments-phaseX.js` and one script tag in `index.html`.
- `cfa-blueprint.js` contains topic metadata, plan, routes, and disclaimer only; its diagnostic is read from the Phase 0 bank.
- The practice and lesson-quiz data is no longer embedded in content files. Content files request quizzes through `NEZHA_CFA_ASSESSMENTS.lessonQuizFor(lessonId)`.
- Timed mock exams remain in `exams.js` and `exams-cfa.js`; they are not phase assessment banks.
- The app, UI, globals, package name, export filename, and documentation use the NeZha name.
- Storage key is `nezha.v1`. Existing legacy data migrates automatically to `nezha.v1` on first load and preserves progress, sessions, CFA state, and settings.
- `cfa-practice.js` was removed after its data moved to `cfa-assessments-phase1a.js`.

### Assessment split verification

- `npm run check` passed with the registry, phase banks, content files, and validators.
- `npm run validate:cfa` passed:
  - 3 assessment banks: Phase 0 diagnostic, Phase 1A practice, Phase 1A lesson quizzes.
  - Phase 0: 11 sections, 40 questions.
  - Phase 1A: 100 practice questions and 36 lesson-quiz questions across 12 lessons.
  - Every Phase 1A lesson resolves its quiz from the assessment bank.
- CDP smoke test passed:
  - NeZha title, sidebar brand, and document titles render correctly.
  - Diagnostic still renders 40 questions and stores the route.
  - Practice still renders 100 questions and starts a 10-question session.
  - Phase 1A lessons still render 3 quiz questions and persist quiz progress.
  - Timed mock exams still render.
  - Legacy local state migrates to `nezha.v1`.
  - Mobile 390px has no horizontal overflow and there are no console errors.

## 5. Quality gates for Phase 1A

- 12 lessons with objectives, worked examples, common traps, and practice.
- 100 questions with unique IDs, 3 options, valid answer, explanation, steps where relevant, topic, LOS, difficulty, and source.
- 0 duplicate stems.
- 100% of calculation questions include worked steps.
- All Phase 1A content reviewed.
- Practice mode gives immediate feedback.
- Wrong answers create error-log entries.
- Formula sheet search/filter works.
- Readiness v1 shows diagnostic, practice accuracy, error resolution, and formula confidence.
- State migration v2 → v3 preserves old data.
- Export/import/reset work.
- `npm run check` passes.
- `npm run validate:cfa` passes.
- Desktop and mobile smoke tests pass; no console errors; 390px no overflow.

## 6. Later phases

Phase 1B:

- Full Foundations: accounting, statistics, economics, markets/instruments, ethics basics.
- 400–500 questions.

Phase 2:

- Core topics: FSA, Corporate, Equity, Fixed Income.
- Then Derivatives, Alternatives, Portfolio, Ethics deep.
- About 70–90 lessons and 1,500–2,000 practice questions total.

Phase 3:

- 6 independent mocks.
- Adaptive drills and error-log remediation.
- Readiness gate.

Phase 4:

- Expert QA, item analysis, annual blueprint versioning.

## 7. Non-negotiables

- Do not rebuild the exam engine.
- Do not delete existing tracks or content.
- Do not generate question variants from 180 facts and call them quality.
- Do not copy CFAI content.
- Do not claim a pass guarantee.
- Do not regress the lesson-sidebar next-module button.
- Keep the app local-first; no auth or secrets.
- Run checks and validation after changes.

## 8. Next session start prompt

> Read `docs/cfa-phase-1.md` first. Phase 1A is implemented and accepted; do not rebuild it. Wait for explicit approval before starting Phase 1B. Preserve the existing exam engine, registry semantics, and local-first architecture. Run `npm run check` + validation + CDP tests after any change.
