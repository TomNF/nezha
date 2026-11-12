# ECBA Architecture Handoff

**Status:** Exam-ready core implemented and validated.
**Last verified:** 2026-11-12

## Exam facts

- The IIBA ECBA exam has **50 questions in 75 minutes**.
- The current blueprint is organized into **9 core domains**.
- IIBA **does not publish a fixed pass mark**. The app uses a **75% practice target** for full mocks and a **70% target** for the applied scenario drill; neither is an official pass score.

## BA module order

After the update, the BA track runs in this order:

`ba-mod-0` orientation -> `ba-mod-1` -> `ba-core-1..12` -> `ba-mod-2` -> `ba-mod-3` -> `ba-mod-4` -> `ba-mod-9` final review -> exam module (3 full mocks + scenario drill) -> optional wealth modules `ba-mod-5..8`.

## Practice content vs official content

- The three full mocks are **generated knowledge checks** built from the ECBA concept pool in `content-data.js`.
- The scenario drill (`exams-ecba-scenarios.js`) is **applied practice** using original workplace situations.
- None of these questions are official IIBA questions, and none should be described as an official mock or exam equivalent.

## Readiness rules

A learner is ready to sit the ECBA when all of the following are true:

- Core lessons: **100% complete**
- Lesson quizzes: **average >= 75%**
- Flashcard coverage: **>= 80%**
- Three full mocks: **average >= 75%**
- Scenario drill: **>= 70%**

## Source and disclaimers

Official blueprint reference: `https://www.iiba.org/globalassets/certification/ecba/files/ecba-exam-blueprint.pdf`

This project is not affiliated with or endorsed by IIBA. The app does not provide official mock exams, does not copy IIBA or BABOK material, and does not guarantee a pass. All practice questions are original and unofficial.

## Validation

The ECBA scenario data validation command is:

```sh
npm run validate:ecba-scenarios
npm run validate:all
```
