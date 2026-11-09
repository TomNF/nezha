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

## Commands

- Start: `npm start`
- Syntax check: `npm run check`
- CFA data validation: `npm run validate:cfa`
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
