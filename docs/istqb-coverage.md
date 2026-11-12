# ISTQB Foundation Coverage Map

This document records how NeZha's original ISTQB Foundation study facts map to learning
objectives and applied K3 practice. The wording here is authored for this project and is not
copied from the official ISTQB syllabus. NeZha is not affiliated with or endorsed by ISTQB.

Metadata: `source = "ISTQB CTFL v4.0 syllabus v4.0.1, public outline"`,
`verifiedOn = "2026-11-12"`, `volatile = false`.

## Coverage Summary

| Topic | Study facts | Learning objectives | K3 scenarios |
| --- | ---: | ---: | ---: |
| `istqb-fundamentals` | 10 | 4 | 0 |
| `istqb-sdlc` | 10 | 3 | 0 |
| `istqb-static` | 8 | 3 | 0 |
| `istqb-design` | 12 | 4 | 20 |
| `istqb-management` | 10 | 4 | 0 |
| `istqb-tools` | 6 | 3 | 0 |
| **Total** | **60** | **21** | **20** |

Every study fact has one `objectiveId`. Every objective has at least one mapped fact. The
validator enforces both rules, unique objective codes, and balanced answers across the three
full mocks plus the K3 drill.

## Objective Detail

| Objective | Topic | Scope | Facts |
| --- | --- | --- | ---: |
| `NZ-FND-01` | Fundamentals | Testing purpose and preventive quality assurance | 2 |
| `NZ-FND-02` | Fundamentals | Human error, defect, and failure relationships | 3 |
| `NZ-FND-03` | Fundamentals | Verification, validation, and testware | 3 |
| `NZ-FND-04` | Fundamentals | Test process activities and testing principles | 2 |
| `NZ-SDLC-01` | SDLC | Lifecycle models and test-level scope | 7 |
| `NZ-SDLC-02` | SDLC | Functional and non-functional test types | 2 |
| `NZ-SDLC-03` | SDLC | Maintenance and regression planning | 1 |
| `NZ-STAT-01` | Static Testing | Static testing and static analysis | 2 |
| `NZ-STAT-02` | Static Testing | Review work products and purpose | 2 |
| `NZ-STAT-03` | Static Testing | Review types, roles, and formality | 4 |
| `NZ-DES-01` | Test Design | Conditions, cases, procedures, and traceability | 4 |
| `NZ-DES-02` | Test Design | Black-box technique selection | 4 |
| `NZ-DES-03` | Test Design | Statement and branch coverage | 2 |
| `NZ-DES-04` | Test Design | Experience-based and collaboration-based testing | 2 |
| `NZ-MGT-01` | Management | Objectives, risk, scope, and strategy | 4 |
| `NZ-MGT-02` | Management | Estimation, monitoring, and control | 3 |
| `NZ-MGT-03` | Management | Test closure and configuration management | 2 |
| `NZ-MGT-04` | Management | Defect lifecycle and reporting | 1 |
| `NZ-TOOL-01` | Tools | Tool evaluation and adoption fit | 2 |
| `NZ-TOOL-02` | Tools | Automation purpose and value | 2 |
| `NZ-TOOL-03` | Tools | Automation risk and CI/CD feedback | 2 |

## K3 Scenario Drill

`istqb-k3-scenario-drill` contains 20 original applied questions in 30 minutes:

| Technique | Questions | IDs |
| --- | ---: | --- |
| Equivalence partitioning | 7 | `q-istqb-k3-1` to `q-istqb-k3-7` |
| Boundary-value analysis | 7 | `q-istqb-k3-8` to `q-istqb-k3-14` |
| Decision table | 6 | `q-istqb-k3-15` to `q-istqb-k3-20` |

The drill uses a 65% target consistent with the CTFL pass threshold, but it is practice only.
It does not reproduce live exam questions and does not guarantee a pass.

## Validation

Run:

```bash
npm run check
npm run validate:all
```

`validate-istqb.mjs` fails when a fact lacks an objective, an objective has no facts, an
objective code is duplicated, a K3 question is mislabeled, or answer distribution drifts
outside the configured bounds.
