window.NEZHA_CONTENT = window.NEZHA_CONTENT || {};
window.NEZHA_CONTENT.istqb = {
  id: 'istqb',
  trackId: 'istqb',
  title: 'ISTQB Foundation (CTFL)',
  year: 2026,
  targetPercent: 65,
  passNote: 'Official CTFL pass mark: 26/40 (65%). These are unofficial original practice questions, not real exam items.',
  sections: [
    { id: 'istqb-section-1', title: 'CTFL Practice Mock', minutes: 60 }
  ],
  topics: [
    {
      id: 'istqb-fundamentals',
      title: 'Fundamentals of Testing',
      sectionId: 'istqb-section-1',
      examCount: 8,
      lessonTitles: ['What testing is & why it matters', 'Seven testing principles', 'Test activities, testware, roles & skills'],
      facts: [
        { term: 'Testing', definition: 'A process of evaluating work products and behavior to find defects, gain confidence, and provide information for decisions.' },
        { term: 'Quality assurance', definition: 'Process-oriented and preventive activities intended to build quality into how work is done.' },
        { term: 'Error', definition: 'A human action that produces an incorrect result in a work product.' },
        { term: 'Defect', definition: 'A flaw or imperfection in a work product that may cause the product to fail.' },
        { term: 'Failure', definition: 'An event in which a system or component does not perform as expected within its specified behavior.' },
        { term: 'Verification', definition: 'Checking that a work product satisfies its specified requirements, often phrased as building the product right.' },
        { term: 'Validation', definition: 'Checking that a product fulfills its intended purpose and user needs in the target environment.' },
        { term: 'Testware', definition: 'All work products created while testing, such as test plans, test cases, test data, scripts, and reports.' },
        { term: 'Test process', definition: 'A set of activities typically covering planning, monitoring and control, analysis, design, implementation, execution, and completion.' },
        { term: 'Testing principles', definition: 'Seven guiding ideas: testing shows defects but cannot prove correctness, exhaustive testing is impossible, early testing saves effort, defects cluster, repeated tests lose effectiveness, testing is context dependent, and defect-free software can still be unusable.' }
      ]
    },
    {
      id: 'istqb-sdlc',
      title: 'Testing Throughout the SDLC',
      sectionId: 'istqb-section-1',
      examCount: 6,
      lessonTitles: ['SDLC context & test levels', 'Test types & maintenance testing'],
      facts: [
        { term: 'Software development lifecycle', definition: 'The model and set of activities an organization uses to plan, build, verify, release, and maintain software.' },
        { term: 'Sequential development model', definition: 'A lifecycle model that performs development phases largely one after another, such as a waterfall approach.' },
        { term: 'Test level', definition: 'A group of test activities organized around a particular stage of development, such as component, integration, system, or acceptance.' },
        { term: 'Component testing', definition: 'Testing individual components or units in isolation to verify their behavior.' },
        { term: 'Integration testing', definition: 'Testing interfaces and interactions between components or systems to find communication and data-flow defects.' },
        { term: 'System testing', definition: 'End-to-end testing of a complete system to verify it meets specified requirements.' },
        { term: 'Acceptance testing', definition: 'Testing that validates whether a system is ready for deployment and use, often performed by or for users.' },
        { term: 'Functional testing', definition: 'Testing focused on what a system does, including behavior, business rules, and functional requirements.' },
        { term: 'Non-functional testing', definition: 'Testing focused on how well a system behaves, such as performance, security, usability, reliability, and maintainability.' },
        { term: 'Maintenance testing', definition: 'Testing changes to a system already in operation, including regression testing and confirmation of fixes.' }
      ]
    },
    {
      id: 'istqb-static',
      title: 'Static Testing',
      sectionId: 'istqb-section-1',
      examCount: 4,
      lessonTitles: ['Static testing & work products', 'Review process, roles & review types'],
      facts: [
        { term: 'Static testing', definition: 'Testing that examines work products without executing them, including reviews and static analysis.' },
        { term: 'Static analysis', definition: 'Automated examination of source code or other artifacts to find defects such as rule violations, poor structure, or unsafe patterns.' },
        { term: 'Work product', definition: 'Any artifact produced during development or testing, such as requirements, designs, code, test cases, or documentation.' },
        { term: 'Review', definition: 'A systematic examination of a work product by people with defined roles and a goal such as finding defects or building understanding.' },
        { term: 'Informal review', definition: 'A simple review with little or no documented process, often used for quick feedback.' },
        { term: 'Walkthrough', definition: 'A review led by the author or a nominated presenter to explain a work product and gather feedback.' },
        { term: 'Technical review', definition: 'A peer review performed by technically qualified reviewers following a defined process to evaluate technical quality.' },
        { term: 'Inspection', definition: 'The most formal review type, using defined roles, entry and exit criteria, checklists, and recorded findings.' }
      ]
    },
    {
      id: 'istqb-design',
      title: 'Test Analysis & Design',
      sectionId: 'istqb-section-1',
      examCount: 11,
      lessonTitles: ['Test conditions, cases, procedures & traceability', 'Black-box techniques', 'White-box techniques', 'Experience-based & collaboration-based approaches'],
      facts: [
        { term: 'Test condition', definition: 'A specific aspect of the test basis that is relevant to testing, sometimes called a test idea or test objective.' },
        { term: 'Test case', definition: 'A set of preconditions, inputs, actions, and expected results designed to exercise a test condition.' },
        { term: 'Test procedure', definition: 'A sequence of actions or test cases used to execute tests in a defined order.' },
        { term: 'Traceability', definition: 'The ability to link testware to its test basis, such as requirements or user stories, and to the results it produced.' },
        { term: 'Equivalence partitioning', definition: 'A black-box technique that divides inputs or outputs into partitions expected to behave the same way, then tests one representative value from each partition.' },
        { term: 'Boundary value analysis', definition: 'A black-box technique that tests values at and around the edges of equivalence partitions, where defects often cluster.' },
        { term: 'Decision table testing', definition: 'A black-box technique that models combinations of conditions and their resulting actions, then selects test cases to cover the rules.' },
        { term: 'State transition testing', definition: 'A black-box technique that models states, events, and transitions, then tests valid and invalid transitions.' },
        { term: 'Statement coverage', definition: 'A white-box measure of the percentage of executable statements that have been executed by tests.' },
        { term: 'Branch coverage', definition: 'A white-box measure of the percentage of decision outcomes, such as true and false branches, that have been executed.' },
        { term: 'Exploratory testing', definition: 'An experience-based approach in which the tester learns, designs tests, and executes them at the same time, using findings to guide the next step.' },
        { term: 'Error guessing & checklist-based testing', definition: 'Experience-based approaches that use intuition about likely mistakes and structured checklists to target defects that formal techniques may miss.' }
      ]
    },
    {
      id: 'istqb-management',
      title: 'Managing Test Activities',
      sectionId: 'istqb-section-1',
      examCount: 9,
      lessonTitles: ['Planning, strategy, risk & estimation', 'Monitoring, control & completion', 'Configuration & defect management'],
      facts: [
        { term: 'Test plan', definition: 'A document that describes testing objectives, scope, approach, resources, schedule, and risks.' },
        { term: 'Test strategy', definition: 'The general approach chosen for testing, aligned with project context, risk, and quality objectives.' },
        { term: 'Risk-based testing', definition: 'Prioritizing test effort according to the likelihood and impact of product risks.' },
        { term: 'Product risk', definition: 'A risk that a product may not meet stakeholder needs or may fail in use, as opposed to a project management risk.' },
        { term: 'Test estimation', definition: 'Estimating test effort and duration using techniques such as expert judgment, ratios, extrapolation, or planning poker.' },
        { term: 'Test monitoring', definition: 'Observing and comparing actual test progress and quality against the test plan.' },
        { term: 'Test control', definition: 'Taking corrective action when monitoring shows that testing is not progressing as planned.' },
        { term: 'Test completion', definition: 'Activities performed at project milestones, such as archiving testware, reporting results, and recording lessons learned.' },
        { term: 'Configuration management', definition: 'Identifying, controlling, and tracking versions of work products and testware so that builds and results are reproducible.' },
        { term: 'Defect management', definition: 'The process of logging, analyzing, prioritizing, tracking, and closing defects found during testing.' }
      ]
    },
    {
      id: 'istqb-tools',
      title: 'Test Tools',
      sectionId: 'istqb-section-1',
      examCount: 2,
      lessonTitles: ['Tool support & selection', 'Automation benefits, risks & CI/CD'],
      facts: [
        { term: 'Test tool', definition: 'Software that supports one or more test activities, such as test management, design, execution, or reporting.' },
        { term: 'Tool selection', definition: 'Evaluating candidate tools against project needs, integration constraints, cost, training, and risk before adoption.' },
        { term: 'Test automation', definition: 'Using tools to execute tests, compare actual and expected results, and support repetitive testing tasks.' },
        { term: 'Test automation benefits', definition: 'Advantages such as repeatability, speed, broader coverage, consistent execution, and reuse of test assets.' },
        { term: 'Test automation risks', definition: 'Risks such as unrealistic expectations, high maintenance cost, brittle tests, vendor lock-in, and skill gaps.' },
        { term: 'Continuous integration & delivery', definition: 'Practices that automatically integrate, build, and deliver changes frequently so that feedback arrives quickly.' }
      ]
    }
  ]
};

const istqbLearningObjectives = {
  'istqb-fundamentals': [
    { id: 'NZ-FND-01', title: 'Explain what testing is for and how it differs from preventive quality assurance.' },
    { id: 'NZ-FND-02', title: 'Distinguish human errors, defects, and observable failures.' },
    { id: 'NZ-FND-03', title: 'Use verification, validation, and testware correctly in context.' },
    { id: 'NZ-FND-04', title: 'Describe the test process and the limits expressed by testing principles.' }
  ],
  'istqb-sdlc': [
    { id: 'NZ-SDLC-01', title: 'Relate lifecycle models and test levels to the scope of what is being tested.' },
    { id: 'NZ-SDLC-02', title: 'Separate functional behavior from non-functional quality characteristics.' },
    { id: 'NZ-SDLC-03', title: 'Plan maintenance testing for changes to an operating system.' }
  ],
  'istqb-static': [
    { id: 'NZ-STAT-01', title: 'Explain static testing and static analysis without executing the product.' },
    { id: 'NZ-STAT-02', title: 'Identify work products and the purpose of reviewing them.' },
    { id: 'NZ-STAT-03', title: 'Choose a review type based on formality, roles, and feedback needs.' }
  ],
  'istqb-design': [
    { id: 'NZ-DES-01', title: 'Connect test conditions, cases, procedures, and traceability into a coherent design.' },
    { id: 'NZ-DES-02', title: 'Select a black-box technique for a given input, rule, or state-based problem.' },
    { id: 'NZ-DES-03', title: 'Interpret statement and branch coverage as white-box evidence.' },
    { id: 'NZ-DES-04', title: 'Use experience and collaboration to target risks that formal techniques may miss.' }
  ],
  'istqb-management': [
    { id: 'NZ-MGT-01', title: 'Build a test approach around objectives, risk, scope, and strategy.' },
    { id: 'NZ-MGT-02', title: 'Estimate effort and adjust testing through monitoring and control.' },
    { id: 'NZ-MGT-03', title: 'Close testing and control work-product versions reproducibly.' },
    { id: 'NZ-MGT-04', title: 'Track defects from discovery through resolution.' }
  ],
  'istqb-tools': [
    { id: 'NZ-TOOL-01', title: 'Evaluate tool support and fit before adopting a test tool.' },
    { id: 'NZ-TOOL-02', title: 'Explain what automation is good for and where it creates value.' },
    { id: 'NZ-TOOL-03', title: 'Recognize automation risks and the role of frequent feedback in CI/CD.' }
  ]
};

const istqbFactObjectives = {
  'istqb-fundamentals': [
    'NZ-FND-01',
    'NZ-FND-01',
    'NZ-FND-02',
    'NZ-FND-02',
    'NZ-FND-02',
    'NZ-FND-03',
    'NZ-FND-03',
    'NZ-FND-03',
    'NZ-FND-04',
    'NZ-FND-04'
  ],
  'istqb-sdlc': [
    'NZ-SDLC-01',
    'NZ-SDLC-01',
    'NZ-SDLC-01',
    'NZ-SDLC-01',
    'NZ-SDLC-01',
    'NZ-SDLC-01',
    'NZ-SDLC-01',
    'NZ-SDLC-02',
    'NZ-SDLC-02',
    'NZ-SDLC-03'
  ],
  'istqb-static': [
    'NZ-STAT-01',
    'NZ-STAT-01',
    'NZ-STAT-02',
    'NZ-STAT-02',
    'NZ-STAT-03',
    'NZ-STAT-03',
    'NZ-STAT-03',
    'NZ-STAT-03'
  ],
  'istqb-design': [
    'NZ-DES-01',
    'NZ-DES-01',
    'NZ-DES-01',
    'NZ-DES-01',
    'NZ-DES-02',
    'NZ-DES-02',
    'NZ-DES-02',
    'NZ-DES-02',
    'NZ-DES-03',
    'NZ-DES-03',
    'NZ-DES-04',
    'NZ-DES-04'
  ],
  'istqb-management': [
    'NZ-MGT-01',
    'NZ-MGT-01',
    'NZ-MGT-01',
    'NZ-MGT-01',
    'NZ-MGT-02',
    'NZ-MGT-02',
    'NZ-MGT-02',
    'NZ-MGT-03',
    'NZ-MGT-03',
    'NZ-MGT-04'
  ],
  'istqb-tools': [
    'NZ-TOOL-01',
    'NZ-TOOL-01',
    'NZ-TOOL-02',
    'NZ-TOOL-02',
    'NZ-TOOL-03',
    'NZ-TOOL-03'
  ]
};

const istqb = window.NEZHA_CONTENT.istqb;
Object.entries(istqbFactObjectives).forEach(([topicId, objectiveIds]) => {
  const topic = istqb.topics.find((item) => item.id === topicId);
  if (!topic) return;
  topic.learningObjectives = istqbLearningObjectives[topicId] || [];
  objectiveIds.forEach((objectiveId, index) => {
    if (topic.facts[index]) topic.facts[index].objectiveId = objectiveId;
  });
});

const istqbMetadata = {
  source: 'ISTQB CTFL v4.0 syllabus v4.0.1, public outline',
  verifiedOn: '2026-11-12',
  volatile: false
};

Object.assign(istqb, istqbMetadata);
istqb.topics.forEach((topic) => {
  topic.facts.forEach((fact) => {
    Object.assign(fact, istqbMetadata);
  });
});
