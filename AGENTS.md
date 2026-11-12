# NeZha Project Rules

## CFA roadmap — read first

Before any CFA-related work, read the full handoff note:

@docs/cfa-phase-1.md

Then follow these rules:

- Continue the roadmap in the handoff note; do not skip phases without approval.
- Phase 0 and Phase 1A are implemented. Do not rebuild them.
- Do not start Phase 1B or Phase 2 unless explicitly asked.
- Preserve the existing exam engine, exam registry semantics, and local-first architecture.
- Do not delete or rewrite existing tracks/modules.
- Keep the next-module button in the lesson sidebar next to mark-complete.
- Do not claim a pass guarantee or CFA Institute endorsement.
- Do not copy CFAI curriculum, LES, or mock questions.
- Keep the UI in Vietnamese and learning content in English.
- Put CFA diagnostic, practice, and lesson-quiz data in `cfa-assessments-phase*.js`; register it with `window.NEZHA_CFA_ASSESSMENTS` and do not embed new question data in content files.
- Browser globals use the `NEZHA_*` namespace. Keep timed mock exams in the existing exam registry.
- Run `npm run check` and `npm run validate:cfa` after changes.
- Stop after the requested phase and report acceptance results.

## IELTS roadmap

Read `docs/ielts-plan.md` before changing IELTS content or mock behavior.

- Keep IELTS lessons in `ielts-curriculum.js` and mock exams in `exams-ielts.js`.
- Do not copy official IELTS, Cambridge, British Council, or IDP material.
- Listening/Reading are MCQ approximations; Writing/Speaking are self-assessed with rubrics.
- Keep the exam engine generic; task sections use `questions: []` plus `section.tasks`.
- Listening audio is generated TTS; do not describe it as an official recording.
- Do not claim an official IELTS band, pass guarantee, or affiliation.
- Run `npm run check`, `npm run validate:ielts`, and `npm run validate:cfa` after changes.

## ECBA roadmap

Read `docs/ecba-architecture.md` before changing ECBA content, mocks, or the BA track.

- Keep the internal track id `ba`; the display title/short title is `ECBA`.
- Keep the core path exam-ready: orientation, nine domains, applied BA labs, final review, three full mocks, and the 20-question scenario drill.
- Wealth modules `ba-mod-5` through `ba-mod-8` are optional and must stay after the exam module.
- Do not copy IIBA content or claim IIBA affiliation, endorsement, or a pass guarantee. IIBA does not publish a fixed ECBA pass mark; use 75% as a practice target only.
- Run `npm run check` and `npm run validate:ecba-scenarios` after changes.

## Securities track

Read `docs/securities-plan.md` before changing Securities content or mocks.

- Map the eight core modules to the public SRTC basic topics: market overview, instruments, primary market, secondary market, firms, funds, clearing/settlement, and disclosure.
- Keep the track optional, `prerequisiteId: null`, and `affectsOverall: false`.
- `sec-mod-10` is an optional trading-app bridge; keep it after the exam module.
- Do not claim SRTC/UBCKNN affiliation, official course status, certificate issuance, or a pass guarantee. Verify fees, schedules, and assessment rules with SRTC.
- Run `npm run check` and `npm run validate:securities` after changes.

## ISTQB track

Read `docs/istqb-plan.md` before changing ISTQB content or mocks.

- Use CTFL v4.0/syllabus v4.0.1 scope: six chapters and three 40-question, 60-minute practice mocks.
- The official pass mark is 26/40 (65%); use 70% as the internal readiness buffer.
- Keep the track optional, `prerequisiteId: null`, and `affectsOverall: false`.
- `istqb-mod-8` is an optional trading-app QA bridge; keep it after the exam module.
- Do not copy ISTQB syllabus or exam material, and do not claim ISTQB affiliation, endorsement, or a pass guarantee.
- Run `npm run check` and `npm run validate:istqb` after changes.

## Commands

- Start: `npm start`
- Syntax check: `npm run check`
- CFA data validation: `npm run validate:cfa`
- IELTS data validation: `npm run validate:ielts`
- ECBA scenario validation: `npm run validate:ecba-scenarios`
- Securities data validation: `npm run validate:securities`
- ISTQB data validation: `npm run validate:istqb`
- IELTS audio generation: `npm run build:ielts-audio`
- PWA deploy build: `npm run build:pwa`

## Project shape

- Local-first vanilla JS app; runtime has no build step.
- PWA build copies runtime files to `dist/` for local checks; do not commit `dist/`.
- Entry point: `index.html`, app logic: `app.js`, styles: `styles.css`.
- Data is stored in localStorage under `nezha.v1`; legacy local data migrates automatically on first load.
- Server is `server.js` on port `4173`.
- GitHub Pages serves the `gh-pages` branch; deploy with `npm run deploy:pages` after app changes.

## PWA rules

- Keep manifest, service worker, and asset URLs relative so the app works under `/nezha/`.
- Bump `CACHE_VERSION` in `sw.js` when changing cached runtime files.
- Keep `manifest.webmanifest` icons and the precache list in sync with runtime files.
