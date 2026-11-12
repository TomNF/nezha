// ISTQB Foundation (CTFL v4.0) track: original study content for exam preparation.
// This is an unofficial learning scaffold and does not contain ISTQB exam items.
window.NEZHA_ISTQB = (() => {
  const curriculum = window.NEZHA_CURRICULUM;
  if (!curriculum || !Array.isArray(curriculum.tracks)) return null;

  const fc = (id, front, back) => ({ id, front, back });
  const mcq = (id, question, options, answer, explanation) => ({
    id,
    type: 'mcq',
    question,
    options,
    answer,
    explanation
  });
  const tf = (id, question, answer, explanation) => ({
    id,
    type: 'tf',
    question,
    options: ['Đúng', 'Sai'],
    answer: answer ? 0 : 1,
    explanation
  });
  const lesson = (
    id,
    title,
    estimatedMinutes,
    objectives,
    contentHtml,
    keyTerms,
    flashcards,
    quiz,
    feynman
  ) => ({
    id,
    title,
    estimatedMinutes,
    objectives,
    contentHtml,
    keyTerms,
    flashcards,
    quiz,
    feynman
  });
  const mod = (id, title, description, lessons) => ({ id, title, description, lessons });

  const orientation = mod(
    'istqb-mod-0',
    'Orientation & CTFL Exam Map',
    'Understand the CTFL v4.0 format, six-chapter weighting, and a practical three-week plan.',
    [
      lesson(
        'istqb-0-1',
        'CTFL v4.0 format & six chapters',
        25,
        [
          'Describe the CTFL v4.0 exam format and scoring',
          'Identify the six chapters and their question distribution',
          'Explain K-levels and how they shape question difficulty',
          'Choose a study order based on chapter weight'
        ],
        `<p><strong>The exam format.</strong> The current ISTQB Certified Tester Foundation Level (CTFL v4.0, syllabus v4.0.1) exam has 40 multiple-choice questions and a standard duration of 60 minutes. Candidates approved for a 25% non-native-language extension receive 75 minutes. The pass mark is 26 out of 40, which is 65%. There is no prerequisite, and the certification has lifetime validity.</p>
        <p><strong>The six chapters.</strong> The questions are distributed by chapter: Fundamentals of Testing has 8 questions, Testing Throughout the SDLC has 6, Static Testing has 4, Test Analysis and Design has 11, Managing Test Activities has 9, and Test Tools has 2. Test Analysis and Design plus Managing Test Activities therefore account for 20 of the 40 questions, so they deserve the largest share of study time.</p>
        <p><strong>K-levels.</strong> The syllabus labels learning objectives by cognitive level. Roughly 8 questions are K1 recall, 24 are K2 understanding or application, and 8 are K3 application or analysis. In practice, many items give a short scenario and ask for the best answer rather than a memorized definition. Learn the terminology first, then practise explaining why one option is better than the others.</p>
        <p><strong>How this app maps to the exam.</strong> The generated core modules follow the six chapters one-to-one. The app mocks use the official question counts and chapter distribution, so a mock score of 26 or more is a useful readiness signal. The mocks are single-best-answer approximations; official items may differ, and some official questions may ask you to select more than one answer.</p>
        <ul>
          <li>40 questions · 60 minutes (75 with approved extension)</li>
          <li>Pass mark 26/40 = 65% · no prerequisite · lifetime validity</li>
          <li>Chapter order: 8, 6, 4, 11, 9, 2</li>
          <li>Highest-value chapters: Test Analysis and Design, Managing Test Activities</li>
          <li>The app is unofficial and does not contain real ISTQB questions</li>
        </ul>`,
        [
          { term: 'CTFL', definition: 'Certified Tester Foundation Level, the entry-level ISTQB certification covered by syllabus v4.0.1.' },
          { term: 'Syllabus', definition: 'The published document that defines learning objectives, terminology, and the structure of the certification exam.' },
          { term: 'K-level', definition: 'The cognitive level of a learning objective, from K1 recall through K2 understanding to K3 application or analysis.' },
          { term: 'Pass mark', definition: 'The minimum score required to pass, which for CTFL v4.0 is 26 out of 40 correct answers.' }
        ],
        [
          fc('fc-istqb-0-1-1', 'How many questions and how much time does CTFL v4.0 have?', '40 multiple-choice questions in 60 minutes, or 75 minutes with an approved 25% extension.'),
          fc('fc-istqb-0-1-2', 'What is the CTFL pass mark?', '26 out of 40 correct answers, which is 65%.'),
          fc('fc-istqb-0-1-3', 'Which two chapters carry the most questions?', 'Test Analysis and Design with 11 questions and Managing Test Activities with 9.')
        ],
        [
          mcq('q-istqb-0-1-1', 'How many questions are in the CTFL v4.0 exam?', ['30', '40', '50', '60'], 1, 'The exam has 40 multiple-choice questions.'),
          mcq('q-istqb-0-1-2', 'What is the official pass mark?', ['20/40', '24/40', '26/40', '30/40'], 2, 'The pass mark is 26/40, which equals 65%.'),
          tf('q-istqb-0-1-3', 'Candidates approved for a 25% extension receive 75 minutes.', true, '60 minutes plus 25% equals 75 minutes.')
        ],
        'Explain the CTFL v4.0 format, the six-chapter weighting, and why Test Analysis and Design deserves extra study time.'
      ),
      lesson(
        'istqb-0-2',
        '3-week study plan & readiness',
        25,
        [
          'Build a realistic three-week study plan',
          'Set a readiness target and a mock target',
          'Use a review loop instead of rereading passively',
          'Decide when to move from learning to timed practice'
        ],
        `<p><strong>Week 1: foundations and vocabulary.</strong> Work through Chapters 1 to 3 and the corresponding generated modules. Read each lesson, say the definitions aloud in your own words, and complete the lesson quizzes. End the week with a short review of every term you could not explain without looking. This week is about accuracy of language, because CTFL questions often turn on a single distinction such as verification versus validation or error versus defect.</p>
        <p><strong>Week 2: the high-weight chapters.</strong> Spend most of the week on Chapter 4 (test analysis and design) and Chapter 5 (managing test activities). Practise applying techniques to small examples: choose partitions and boundaries, build a decision table, draw a simple state model, and calculate statement or branch coverage. For management, practise reading a scenario and identifying risk, estimation, monitoring, or completion activities.</p>
        <p><strong>Week 3: consolidation and mocks.</strong> Finish Chapter 6, then take Mock 1 under time. Debrief it before taking Mock 2. Use Mock 2 to test whether your corrections worked, and keep Mock 3 for a final timed check. If you score below 65%, do not simply take another mock; return to the weakest chapter, review the relevant lessons, and retest that topic.</p>
        <p><strong>Readiness rules.</strong> Use 70% on practice sets as a readiness target and 65% on a full timed mock as the minimum mock target. A single high score can be luck, so look for consistency across at least two mocks. Track your scores by chapter, not only overall, because the overall score can hide a weak area that the real exam will expose.</p>
        <ul>
          <li>Week 1: Chapters 1–3, terminology, lesson quizzes</li>
          <li>Week 2: Chapters 4–5, techniques, scenario practice</li>
          <li>Week 3: Chapter 6, three timed mocks, targeted review</li>
          <li>Daily rhythm: 45–60 minutes of study plus 15 minutes of review</li>
          <li>Readiness: about 70% on practice sets, 65% or more on full mocks</li>
          <li>If a mock is weak, review the chapter before taking another mock</li>
        </ul>
        <p><strong>Review loop.</strong> After every practice block, write down the chapter, the term or technique involved, why you chose the wrong answer, and the rule you will use next time. A short, specific error log is more valuable than a folder of untimed questions. The goal is to stop repeating the same mistake, not to collect more questions.</p>`,
        [
          { term: 'Readiness target', definition: 'A practice score that suggests you are prepared, set here at about 70% on practice sets.' },
          { term: 'Mock target', definition: 'The minimum acceptable score on a full timed mock, set here at 65% to match the official pass mark.' },
          { term: 'Spaced review', definition: 'Revisiting material after a delay so that recall is tested rather than recognition.' },
          { term: 'Error log', definition: 'A record of wrong answers with the cause and the rule to apply next time.' }
        ],
        [
          fc('fc-istqb-0-2-1', 'What should Week 2 focus on?', 'The high-weight chapters: Test Analysis and Design and Managing Test Activities.'),
          fc('fc-istqb-0-2-2', 'What are the readiness and mock targets?', 'About 70% on practice sets and at least 65% on a full timed mock.'),
          fc('fc-istqb-0-2-3', 'What should you do after a weak mock?', 'Review the weakest chapter and retest it before taking another full mock.')
        ],
        [
          mcq('q-istqb-0-2-1', 'Which chapter has the most exam questions?', ['Fundamentals of Testing', 'Static Testing', 'Test Analysis and Design', 'Test Tools'], 2, 'Test Analysis and Design has 11 questions, the largest share.'),
          mcq('q-istqb-0-2-2', 'What is the most useful response to a mock score below 65%?', ['Take another mock immediately', 'Review the weakest chapter and retest it', 'Memorize all options', 'Skip the remaining mocks'], 1, 'Targeted review fixes the cause; another mock without review usually repeats it.'),
          tf('q-istqb-0-2-3', 'A 26/40 score equals 65%.', true, '26 divided by 40 is 0.65, which is 65%.')
        ],
        'Design a three-week CTFL plan with one goal per week, a daily rhythm, and a rule for when to take the next mock.'
      )
    ]
  );

  const finalReview = mod(
    'istqb-mod-7',
    'Final Review & Exam Day',
    'Turn mock results into targeted review, then prepare a calm and repeatable exam-day routine.',
    [
      lesson(
        'istqb-7-1',
        'Mock debrief & weak-topic review',
        25,
        [
          'Debrief a mock by cause rather than by score alone',
          'Map wrong answers to chapters and K-levels',
          'Choose a focused review action for each weak area',
          'Decide whether you are ready for another timed attempt'
        ],
        `<p><strong>Start with evidence, not emotion.</strong> After a mock, note the overall score, then separate wrong answers by chapter. A score of 25/40 can hide a strong Chapter 4 and a weak Chapter 1, or the reverse. The chapter breakdown tells you where the next hour of study will produce the most improvement.</p>
        <p><strong>Classify each error.</strong> Use four causes: a knowledge gap, a misread question, a weak technique, or a time problem. A knowledge gap means you did not know the term or rule. A misread means you knew it but missed a qualifier such as NOT, EXCEPT, or best. A weak technique means you could not apply a method such as boundary values. A time problem means you rushed or left questions unanswered.</p>
        <p><strong>Review the smallest useful unit.</strong> For a knowledge gap, reread the specific lesson facts and say the definition without looking. For a technique, redo two or three small examples. For a misread, practise underlining the task word before reading the options. For time, rehearse a two-pass strategy: answer clear questions first, flag uncertain ones, and return with the remaining time.</p>
        <p><strong>Look for patterns across mocks.</strong> If the same chapter keeps appearing in your error log, that is your priority. If errors move around, the issue may be technique or attention rather than content. Do not chase a perfect score on every topic; aim for a stable margin above 26 correct answers and no chapter that is clearly below its share.</p>
        <ul>
          <li>Record the overall score and the chapter-by-chapter breakdown</li>
          <li>Label each error: knowledge, misread, technique, or time</li>
          <li>Review one small unit, then answer two or three similar questions</li>
          <li>Repeat a weak topic after 24–48 hours to test retention</li>
          <li>Take the next full mock only after the review actions are complete</li>
        </ul>`,
        [
          { term: 'Debrief', definition: 'A structured review of a mock that examines errors, causes, and next actions rather than only the score.' },
          { term: 'Distractor', definition: 'An incorrect option that is plausible enough to attract a candidate who has not applied the concept precisely.' },
          { term: 'Knowledge gap', definition: 'A wrong answer caused by not knowing the relevant term, rule, or technique.' },
          { term: 'Retest', definition: 'Answering new questions on a reviewed topic after a delay to check that learning persisted.' }
        ],
        [
          fc('fc-istqb-7-1-1', 'What is the first useful step after a mock?', 'Break the result down by chapter and label the cause of each wrong answer.'),
          fc('fc-istqb-7-1-2', 'What are four useful error causes?', 'Knowledge gap, misread question, weak technique, and time problem.'),
          fc('fc-istqb-7-1-3', 'When should you take the next mock?', 'After completing targeted review actions, not immediately after a weak result.')
        ],
        [
          mcq('q-istqb-7-1-1', 'You knew the concept but missed the word EXCEPT in the question. What is the cause?', ['Knowledge gap', 'Misread question', 'Weak technique', 'Time problem'], 1, 'The issue was reading the task word, not missing knowledge.'),
          mcq('q-istqb-7-1-2', 'What is the best use of the chapter breakdown?', ['To predict the exact exam questions', 'To prioritize the next review block', 'To ignore the overall score', 'To avoid timed practice'], 1, 'The breakdown shows where review effort will have the most impact.'),
          tf('q-istqb-7-1-3', 'Taking mocks repeatedly without review is the fastest way to improve.', false, 'Without review, the same errors tend to repeat; targeted review is essential.')
        ],
        'Explain how you would debrief a 25/40 mock and choose the next three study actions.'
      ),
      lesson(
        'istqb-7-2',
        'Exam-day checklist',
        20,
        [
          'Prepare logistics before exam day',
          'Apply a workable time budget for 40 questions',
          'Use a two-pass strategy with flags and no blanks',
          'Stay calm and avoid last-minute content overload'
        ],
        `<p><strong>Before the exam.</strong> Confirm the test format, start time, location or online platform requirements, and accepted identification. For an online proctored exam, test your camera, microphone, browser, and internet connection in advance. Keep water and any permitted items ready, and avoid scheduling a heavy study session immediately before the exam.</p>
        <p><strong>Time budget.</strong> With 60 minutes for 40 questions, the average is 90 seconds per question. Do not spend five minutes on one hard item early. Use the first pass to answer clear questions and flag uncertain ones. In the second pass, return to flagged items with the time you have saved. If the extension applies, the average rises to about 112 seconds per question, but the same two-pass logic still works.</p>
        <p><strong>Question technique.</strong> Read the task word carefully: best, most likely, NOT, EXCEPT, or which is least accurate. Predict the answer before reading all options where possible, then eliminate clearly wrong choices. Watch for absolute words such as always or never, and for options that are true in general but do not answer the specific question. Choose the best available answer, not a perfect one.</p>
        <p><strong>No blanks.</strong> There is no penalty for a wrong answer, so every question should have an answer before you finish. If time is short, eliminate two options and choose between the remaining two. After the exam, avoid a detailed post-mortem with other candidates; it usually adds stress without changing the result.</p>
        <ul>
          <li>Check ID, platform requirements, and timing the day before</li>
          <li>Average 90 seconds per question; 112 seconds with the extension</li>
          <li>First pass: answer clear items and flag the rest</li>
          <li>Second pass: return to flags and answer everything</li>
          <li>Underline qualifiers: best, NOT, EXCEPT, least accurate</li>
          <li>Never leave a blank; there is no guessing penalty</li>
        </ul>`,
        [
          { term: 'Time boxing', definition: 'Allocating a fixed amount of time to each question or section to keep the whole exam on schedule.' },
          { term: 'Flagging', definition: 'Marking a question for review so you can return to it without losing your place.' },
          { term: 'Qualifier', definition: 'A word such as best, NOT, or EXCEPT that changes the exact task the question is asking.' },
          { term: 'Single-best-answer', definition: 'A question format in which one option is the most appropriate answer even if others are partly true.' }
        ],
        [
          fc('fc-istqb-7-2-1', 'What is the average time per question in the standard exam?', 'About 90 seconds for each of the 40 questions in 60 minutes.'),
          fc('fc-istqb-7-2-2', 'What should you do with a hard question on the first pass?', 'Answer if possible, flag it, and return after completing the easier questions.'),
          fc('fc-istqb-7-2-3', 'Why should you never leave a blank?', 'There is no penalty for a wrong answer, so a reasoned guess is always better than no answer.')
        ],
        [
          mcq('q-istqb-7-2-1', 'What is the average time per question in 60 minutes for 40 questions?', ['45 seconds', '60 seconds', '90 seconds', '120 seconds'], 2, '60 minutes divided by 40 questions is 1.5 minutes, or 90 seconds.'),
          mcq('q-istqb-7-2-2', 'Which word most changes the task in a question?', ['System', 'EXCEPT', 'Testing', 'Defect'], 1, 'EXCEPT reverses the task and is a common source of avoidable errors.'),
          tf('q-istqb-7-2-3', 'With the approved extension, you have 75 minutes.', true, 'The extension adds 25% to the standard 60 minutes.')
        ],
        'Describe your exam-day routine, including logistics, a 90-second time box, and a two-pass strategy.'
      )
    ]
  );

  const trading = mod(
    'istqb-mod-8',
    'Trading App QA Lens',
    'Apply CTFL concepts to a retail trading app: risk-based testing, reconciliation, and audit behavior.',
    [
      lesson(
        'istqb-8-1',
        'Risk-based testing for an order ticket',
        25,
        [
          'Identify product risks in an order ticket',
          'Prioritize tests by likelihood and impact',
          'Apply equivalence partitioning and boundary values to order inputs',
          'Use state transition thinking for order lifecycle behavior'
        ],
        `<p><strong>The scenario.</strong> A retail trading app lets a customer enter an order ticket with a side, symbol, quantity, price or order type, time in force, and account. The ticket then moves through validation, submission, acknowledgement, possible partial fills, and a terminal state such as filled, cancelled, or rejected. This is a rich area for risk-based testing because a small input error can cause a large financial or customer-impacting failure.</p>
        <p><strong>Product risks.</strong> A risk is a combination of likelihood and impact. High-impact examples include submitting an order that exceeds buying power, showing a stale price as if it were live, duplicating a submission after a timeout, or allowing an invalid state transition such as cancelling an order that is already filled. Lower-impact examples include a confusing label or a cosmetic alignment issue. Test effort should follow the high-impact risks first.</p>
        <p><strong>Black-box design.</strong> For quantity, use equivalence partitions such as below the minimum, valid range, and above the maximum, then test the boundaries with boundary value analysis. For price, consider tick size, negative values, zero, and extreme values. For order type, build a decision table that combines order type, time in force, and market state so that invalid combinations are explicitly covered rather than discovered by chance.</p>
        <p><strong>State thinking.</strong> Model the order as draft, validated, submitted, acknowledged, partially filled, filled, cancelled, and rejected. Test valid transitions and invalid attempts, such as modifying a submitted order or filling a cancelled one. Check that the user interface prevents invalid actions and that the server still rejects them if the interface is bypassed.</p>
        <ul>
          <li>Prioritize buying-power, price freshness, duplicate submission, and state errors</li>
          <li>Use partitions and boundaries for quantity, price, and notional value</li>
          <li>Use decision tables for order type, time in force, and market state</li>
          <li>Test both valid and invalid order-state transitions</li>
          <li>Verify the server enforces rules even when the client is bypassed</li>
        </ul>
        <p><strong>Bridge to CTFL.</strong> This exercise uses the same concepts as Chapter 4 and Chapter 5: test conditions, risk-based prioritization, black-box techniques, and traceability from a business rule to a test case. It is an optional QA practice lens, not investment advice and not a trading strategy.</p>`,
        [
          { term: 'Order ticket', definition: 'The form and data used to capture an order, including side, symbol, quantity, price, order type, and account.' },
          { term: 'Buying power', definition: 'The amount a customer is permitted to commit to new positions, based on cash, collateral, and margin rules.' },
          { term: 'State transition', definition: 'A change from one order or system state to another, triggered by an event such as submit, fill, or cancel.' },
          { term: 'Risk-based prioritization', definition: 'Ordering test effort by the likelihood and impact of potential product failures.' }
        ],
        [
          fc('fc-istqb-8-1-1', 'Which order-ticket risks should be tested first?', 'High-impact risks such as buying-power breaches, stale prices, duplicate submissions, and invalid state transitions.'),
          fc('fc-istqb-8-1-2', 'How can boundary value analysis help with quantity?', 'Test the minimum, maximum, and values just inside and outside the allowed range.'),
          fc('fc-istqb-8-1-3', 'Why test invalid order-state transitions?', 'They can cause incorrect fills, cancelled orders being executed, or inconsistent customer balances.')
        ],
        [
          mcq('q-istqb-8-1-1', 'Which is a high-impact order-ticket risk?', ['A button label is slightly misaligned', 'An order exceeds buying power', 'The help icon is too small', 'A tooltip uses the wrong font'], 1, 'A buying-power breach can create financial loss and regulatory exposure.'),
          mcq('q-istqb-8-1-2', 'Which technique best models order type plus time in force plus market state?', ['Statement coverage', 'Decision table testing', 'Error guessing', 'Retrospective'], 1, 'A decision table covers combinations of conditions and actions.'),
          tf('q-istqb-8-1-3', 'Client-side validation is enough because users cannot bypass the interface.', false, 'Server-side validation is also required because requests can be replayed or modified outside the interface.')
        ],
        'Explain how you would prioritize tests for an order ticket using product risk, boundary values, and state transitions.'
      ),
      lesson(
        'istqb-8-2',
        'Non-functional, reconciliation & audit testing',
        25,
        [
          'Identify non-functional risks for a trading workflow',
          'Describe reconciliation and break investigation',
          'Verify audit trails and access controls',
          'Choose test data and environments that protect sensitive information'
        ],
        `<p><strong>Non-functional behavior.</strong> Functional tests ask whether the order ticket does the right thing; non-functional tests ask how well it does it. Latency matters because a slow price refresh or submission can turn a valid decision into a bad fill. Throughput matters at market open, when many users act at once. Availability, recoverability, security, and usability all affect whether the workflow is trustworthy under real conditions.</p>
        <p><strong>Reconciliation.</strong> Reconciliation compares records that should agree, such as orders versus executions, executions versus positions, and positions versus cash. A break is a mismatch that must be investigated. Test end-of-day and intraday reconciliation with known scenarios: partial fills, cancellations, corrections, fees, and corporate actions. The expected result is not only a correct total but also a clear report that identifies the source of each break.</p>
        <p><strong>Audit and control.</strong> An audit trail should record who did what, when, from where, and with what result. Test that events are recorded in the right order, that timestamps are consistent, and that logs cannot be silently altered by ordinary users. Access control should prevent a customer from viewing another customer’s orders, and privileged actions should be traceable. Retention rules and masking of sensitive data also need testing.</p>
        <p><strong>Test environment caution.</strong> Use synthetic or properly masked data. Never copy live credentials or personal data into a test environment without authorization. Verify behavior during dependency failures, such as a market-data feed outage or a clearing-service timeout, and check that the user sees a safe, understandable state rather than a misleading success message.</p>
        <ul>
          <li>Measure latency and throughput under realistic peak load</li>
          <li>Test availability and recovery when dependencies fail</li>
          <li>Reconcile orders, executions, positions, and cash; investigate breaks</li>
          <li>Verify audit records, access control, retention, and masking</li>
          <li>Use synthetic or masked data and never expose live credentials</li>
        </ul>
        <p><strong>Bridge to CTFL.</strong> These checks connect to non-functional testing, risk-based prioritization, defect management, and configuration management. They are optional practice ideas for QA thinking, not a compliance certification or investment recommendation.</p>`,
        [
          { term: 'Reconciliation', definition: 'Comparing related records, such as orders and executions, to confirm they agree and to identify mismatches.' },
          { term: 'Break', definition: 'A reconciliation mismatch that requires investigation before the records can be trusted.' },
          { term: 'Audit trail', definition: 'A chronological record of who performed which action, when, and with what result.' },
          { term: 'Latency', definition: 'The delay between a request or event and the observed response.' }
        ],
        [
          fc('fc-istqb-8-2-1', 'What is a reconciliation break?', 'A mismatch between records that should agree, such as orders and executions.'),
          fc('fc-istqb-8-2-2', 'What should an audit trail capture?', 'Who did what, when, from where, and with what result, in a form that cannot be silently altered.'),
          fc('fc-istqb-8-2-3', 'What data should be used in test environments?', 'Synthetic or properly masked data, never live credentials or unprotected personal data.')
        ],
        [
          mcq('q-istqb-8-2-1', 'Which is a non-functional test concern?', ['Whether the order ticket accepts a valid quantity', 'Whether the order ticket responds quickly at peak load', 'Whether the side field has two options', 'Whether the submit button exists'], 1, 'Response time under load is a non-functional characteristic.'),
          mcq('q-istqb-8-2-2', 'Orders and executions do not match. What is this called?', ['A traceability matrix', 'A reconciliation break', 'A boundary value', 'A test condition'], 1, 'A mismatch in reconciliation is a break.'),
          tf('q-istqb-8-2-3', 'An audit trail should allow ordinary users to edit past records.', false, 'Audit records must be protected from silent alteration and reviewed through controlled access.')
        ],
        'Explain how you would test reconciliation and audit behavior for a trading app after an order is corrected.'
      )
    ]
  );
  trading.optional = true;

  const istqb = {
    id: 'istqb',
    title: 'ISTQB Foundation (CTFL)',
    shortTitle: 'ISTQB',
    description: 'CTFL v4.0 coverage for the current Foundation Level syllabus: six chapters, 3 practice mocks, and an optional trading-app QA bridge. This is an unofficial original study track, not ISTQB material.',
    modules: [orientation, finalReview, trading],
    optional: true,
    prerequisiteId: null,
    affectsOverall: false,
    examModuleTitle: 'Practice Mocks',
    examPrep: {
      examName: 'ISTQB CTFL v4.0',
      provider: 'ISTQB',
      format: '40 MCQ · 60 phút',
      targetPercent: 65,
      readinessTarget: 70,
      mockTarget: 65,
      passMark: '26/40',
      disclaimer: 'Unofficial original practice. Not affiliated with, endorsed by, or approved by ISTQB. These are not official mock exams and do not guarantee a pass. Do not copy or redistribute ISTQB syllabus or exam material.'
    }
  };

  if (!curriculum.tracks.some((track) => track.id === 'istqb')) {
    const anchorIndex = curriculum.tracks.findIndex((track) => track.id === 'securities');
    const baIndex = curriculum.tracks.findIndex((track) => track.id === 'ba');
    const insertIndex = anchorIndex >= 0 ? anchorIndex + 1 : (baIndex >= 0 ? baIndex + 1 : curriculum.tracks.length);
    curriculum.tracks.splice(insertIndex, 0, istqb);
  }

  return {
    track: istqb,
    moduleIds: istqb.modules.map((module) => module.id)
  };
})();
