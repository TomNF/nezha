(function () {
  const curriculum = window.NEZHA_CURRICULUM;
  if (!curriculum || !Array.isArray(curriculum.tracks)) return;

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
    'sec-mod-0',
    'Orientation & SRTC Exam Map',
    'Understand the public SRTC basic certificate, map the eight topics, and build a realistic study routine.',
    [
      lesson(
        'sec-0-1',
        'SRTC basic certificate & 8-topic map',
        25,
        [
          'Describe the public SRTC basic securities program without claiming affiliation',
          'Map the eight certificate topics to the eight app modules',
          'Distinguish app practice mocks from the official program assessment',
          'Use the track in a sequence that supports recall and review'
        ],
        `<p><strong>What this track is.</strong> This is an original English-language study track for the public SRTC certificate titled “Những vấn đề cơ bản về chứng khoán và thị trường chứng khoán”. The public program is commonly described as eight topics delivered over twelve sessions, with eleven study sessions and a final test. A reference fee of 3.2 million VND is often quoted, but fees, schedules, and assessment rules can change, so verify current details directly with SRTC.</p>
        <p><strong>Important boundary.</strong> NeZha is not an official SRTC or UBCKNN product. The lessons, quizzes, and mocks here are original practice material. They do not copy official curriculum text, do not award the certificate, and do not guarantee a pass. The official program, not this app, controls enrollment, teaching, fees, and final assessment.</p>
        <p><strong>The eight-topic map.</strong> Topic 1 is market overview; Topic 2 is financial instruments; Topic 3 is the primary market; Topic 4 is the secondary market; Topic 5 is securities firms; Topic 6 is fund management and investment funds; Topic 7 is registration, custody, clearing, and settlement; Topic 8 is market disclosure. Each app core module follows one topic and contains two lessons, so the mapping stays easy to audit.</p>
        <ul>
          <li>Topics 1–2 build vocabulary for markets, ownership, debt, funds, and derivatives.</li>
          <li>Topics 3–4 follow a security from issuance through trading and settlement.</li>
          <li>Topics 5–6 cover the firms and funds that operate in the market.</li>
          <li>Topics 7–8 cover the infrastructure and disclosure rules that support trust.</li>
        </ul>
        <p><strong>How the app is organized.</strong> Start with this orientation, then work through the eight generated core modules. Each core module has two lessons, combined with a quiz and flashcards. After the core modules, use the three 40-question, 60-minute practice mocks. Finish with the final review module, or use the optional trading-app bridge if you want a product-analysis angle. The app target is 70%, but that is a study threshold, not an official pass mark.</p>`,
        [
          { term: 'SRTC', definition: 'Securities Research and Training Center, a public securities training provider in Vietnam.' },
          { term: 'UBCKNN', definition: 'The State Securities Commission of Vietnam, the securities market regulator.' },
          { term: 'Practice mock', definition: 'An original timed question set used for study, not an official examination.' },
          { term: 'Syllabus map', definition: 'A table or list that connects each app module to one certificate topic.' }
        ],
        [
          fc('fc-sec-0-1-1', 'How many topics does the public SRTC basic program cover?', 'Eight topics, usually delivered over twelve sessions with a final test.'),
          fc('fc-sec-0-1-2', 'Is NeZha an official SRTC or UBCKNN course?', 'No. It is original, unofficial practice material with no affiliation or certificate.'),
          fc('fc-sec-0-1-3', 'What is the app mock format?', 'Three practice mocks, each with 40 questions and 60 minutes, with a 70% study target.')
        ],
        [
          mcq('q-sec-0-1-1', 'How many topic modules does this securities track map to the SRTC basic program?', ['Four', 'Six', 'Eight', 'Twelve'], 2, 'The public program is described as eight topics, and the app maps one core module to each topic.'),
          mcq('q-sec-0-1-2', 'What does the 70% target in this app represent?', ['The official SRTC pass mark', 'A practice threshold chosen by the app', 'A guarantee of certification', 'The fee percentage'], 1, 'Seventy percent is a practice target, not an official pass score or guarantee.'),
          tf('q-sec-0-1-3', 'Completing this app automatically awards the SRTC certificate.', false, 'The app is unofficial practice only and does not award any certificate.')
        ],
        'Explain to a friend what the SRTC basic program covers, and why this app is useful practice without being an official course.'
      ),
      lesson(
        'sec-0-2',
        '3-week study plan & readiness',
        25,
        [
          'Run a short baseline without treating it as an official prediction',
          'Build a three-week plan across the eight topic modules',
          'Use an error log to decide what to review next',
          'Apply readiness criteria before booking or sitting the official test'
        ],
        `<p><strong>Start with a baseline, not a verdict.</strong> Read the orientation, then try the first practice mock or a 10-question sample without studying. Record the score by topic, the time used, and a confidence rating from 1 to 5. A low baseline is useful evidence about where to begin; it is not a prediction of the official result.</p>
        <p><strong>Three-week rhythm.</strong> The plan below assumes roughly 45–60 focused minutes per day, but adjust to your schedule. The key is to study a topic, recall it without notes, answer questions, and then review the cause of each error.</p>
        <ul>
          <li>Week 1: Topics 1–3. Study one lesson per day, review flashcards, and finish the week with a mixed 20-question drill.</li>
          <li>Week 2: Topics 4–6. Add a full 60-minute mock and spend the next day reviewing every wrong answer by topic.</li>
          <li>Week 3: Topics 7–8, then the remaining mocks. Reserve the last two days for weak-topic review and exam logistics.</li>
        </ul>
        <p><strong>Daily study loop.</strong> Read one lesson, close it, and write the four key terms from memory. Then explain one concept in plain English, answer the lesson quiz, and update the error log. If a topic scores below 60%, reread the lesson and repeat the quiz after a short break instead of immediately retaking it.</p>
        <p><strong>Readiness checklist.</strong> You are reasonably ready to attempt the official assessment when you have completed all eight core modules, scored at least 70% on two different practice mocks, have no topic stuck below 50%, can explain the key definitions without notes, and understand the current SRTC schedule and rules. These are sensible study gates, not official eligibility criteria.</p>`,
        [
          { term: 'Baseline diagnostic', definition: 'A short first attempt used to identify starting strengths and weaknesses.' },
          { term: 'Spaced review', definition: 'Reviewing material after a delay so recall is tested rather than merely recognized.' },
          { term: 'Error log', definition: 'A record of wrong answers, their causes, and the next corrective action.' },
          { term: 'Readiness threshold', definition: 'A self-chosen practice standard that must be met before attempting the official test.' }
        ],
        [
          fc('fc-sec-0-2-1', 'What should a baseline record besides the total score?', 'Topic-level results, time used, confidence, and the causes of errors.'),
          fc('fc-sec-0-2-2', 'What belongs in a three-week plan?', 'Topic lessons, recall practice, mixed drills, full mocks, and targeted review.'),
          fc('fc-sec-0-2-3', 'Name two sensible readiness gates.', 'At least 70% on two different mocks, no topic below 50%, and completed core modules.')
        ],
        [
          mcq('q-sec-0-2-1', 'What is the best next step after a weak practice mock?', ['Retake it immediately', 'Review wrong answers and weak topics', 'Ignore the score', 'Skip to the final test'], 1, 'Reviewing causes and weak topics turns a mock into useful feedback.'),
          mcq('q-sec-0-2-2', 'How many practice mocks does this track provide?', ['One', 'Two', 'Three', 'Five'], 2, 'The track registers three practice mocks with 40 questions each.'),
          tf('q-sec-0-2-3', 'A baseline score is an official prediction of the SRTC result.', false, 'It is only a study diagnostic, not an official prediction.')
        ],
        'Design a three-week plan that fits your calendar, and explain what you will do when one topic stays below 60%.'
      )
    ]
  );

  const finalReview = mod(
    'sec-mod-9',
    'Final Review & Exam Day',
    'Turn mock results into targeted review, then prepare the practical details for test day.',
    [
      lesson(
        'sec-9-1',
        'Mock debrief & weak-topic review',
        25,
        [
          'Score a mock by topic rather than only by total',
          'Classify each error as knowledge, reading, strategy, or time',
          'Choose a focused review action for the weakest topic',
          'Build a repeatable debrief routine for all three mocks'
        ],
        `<p><strong>Debrief after a pause.</strong> Finish the mock, step away for a short break, and only then review the answers. Mark the total score, then calculate the score for each of the eight topics. A total of 70% can hide one very weak topic, so the topic breakdown decides what to study next.</p>
        <p><strong>Classify the cause.</strong> Do not label every miss as “I did not know it”. Use four categories: knowledge, reading, strategy, and time. A knowledge error means the definition was unfamiliar. A reading error means the question or option was misread. A strategy error means the answer was changed without evidence. A time error means the question was rushed or left blank.</p>
        <ul>
          <li>Knowledge: revisit the fact, key term, and lesson example.</li>
          <li>Reading: underline the qualifier, subject, and question stem before choosing.</li>
          <li>Strategy: practise a first-pass rule and avoid unexplained answer changes.</li>
          <li>Time: use a visible pace target and flag difficult items for a second pass.</li>
        </ul>
        <p><strong>Targeted review.</strong> For the weakest topic, reread both lessons, cover the definitions, and teach the topic aloud in three minutes. Then answer ten mixed questions from that topic and one neighbouring topic. If accuracy is still below 60%, stop adding new mocks and repeat the cycle after a day.</p>
        <p><strong>Pacing.</strong> Forty questions in sixty minutes averages about 90 seconds per question. Aim to finish the first pass with roughly ten minutes left for review. Do not spend four minutes on one unfamiliar definition while several easier questions remain unanswered. The mock is practice for decision-making, not a test of stubbornness.</p>`,
        [
          { term: 'Topic score', definition: 'The number or percentage of correct answers within one topic area.' },
          { term: 'Error classification', definition: 'Grouping mistakes by cause, such as knowledge, reading, strategy, or time.' },
          { term: 'Root cause', definition: 'The underlying reason an answer was wrong, not just the correct letter.' },
          { term: 'Targeted review', definition: 'A short study cycle aimed at one weak topic and its linked concepts.' }
        ],
        [
          fc('fc-sec-9-1-1', 'Why score a mock by topic?', 'A strong total can hide a weak topic that still needs focused review.'),
          fc('fc-sec-9-1-2', 'What are the four error categories?', 'Knowledge, reading, strategy, and time.'),
          fc('fc-sec-9-1-3', 'What is a sensible pace for 40 questions in 60 minutes?', 'About 90 seconds per question, with time left for a review pass.')
        ],
        [
          mcq('q-sec-9-1-1', 'A candidate scores 72% overall but 40% in clearing and settlement. What should they do?', ['Ignore the topic because the total is above 70%', 'Review clearing and settlement before the next mock', 'Only practise the strongest topic', 'Retake the same mock without review'], 1, 'Topic-level weakness matters even when the total clears the target.'),
          mcq('q-sec-9-1-2', 'Which error is caused by changing a correct answer without new evidence?', ['Knowledge', 'Reading', 'Strategy', 'Enforcement'], 2, 'Changing an answer without a clear reason is a test-strategy error.'),
          tf('q-sec-9-1-3', 'Reviewing only the total score is enough to plan the next study block.', false, 'A topic breakdown and error classification are needed to choose targeted review.')
        ],
        'Debrief a mock result as if you were coaching a colleague: identify the weakest topic, the main error pattern, and the next three study actions.'
      ),
      lesson(
        'sec-9-2',
        'Exam-day checklist',
        20,
        [
          'Confirm official logistics from SRTC rather than relying on app assumptions',
          'Prepare identity, schedule, and materials before test day',
          'Apply a clear time and question strategy during the assessment',
          'Use a calm recovery plan when an answer or technical detail goes wrong'
        ],
        `<p><strong>Confirm the official details.</strong> Check the current SRTC notice for the session date, location or platform, identification requirements, permitted materials, fee, and assessment rules. The app cannot confirm these details. If any instruction conflicts with this lesson, follow the official SRTC instruction.</p>
        <p><strong>Prepare the day before.</strong> Confirm travel time or the online meeting link, charge devices, prepare identification, and write down the contact point for issues. Avoid starting a brand-new topic late at night. A short review of your error log and key definitions is more useful than cramming an unfamiliar module.</p>
        <ul>
          <li>Arrive or log in early with identification ready.</li>
          <li>Read the official instructions and time limit before starting.</li>
          <li>Use a first pass on clear questions, then return to flagged items.</li>
          <li>Watch qualifiers such as “best”, “least”, “except”, and “most likely”.</li>
          <li>Leave a short final check for unanswered items and accidental misclicks.</li>
        </ul>
        <p><strong>Question strategy.</strong> Answer the question that is asked, not the topic you wish were asked. If two options seem plausible, compare their scope and precision. Eliminate an option that is too absolute unless the source concept truly is absolute. Do not let one hard question consume the time budget for several easier ones.</p>
        <p><strong>Recovery plan.</strong> If you blank on a definition, move on and return later; a related question may trigger recall. If a technical problem occurs, notify the invigilator or official contact immediately and record what happened. After the test, write a short debrief while the experience is fresh, whether the result is known or not.</p>`,
        [
          { term: 'Official instruction', definition: 'A rule or direction issued by SRTC or the test administrator for the assessment.' },
          { term: 'Time budget', definition: 'A planned allocation of the available minutes across questions and review.' },
          { term: 'Flagged item', definition: 'A question marked for a second look after the first pass.' },
          { term: 'Contingency plan', definition: 'A prepared response for delays, technical problems, or missing materials.' }
        ],
        [
          fc('fc-sec-9-2-1', 'What should override the app if official rules differ?', 'The current official SRTC instruction always takes priority.'),
          fc('fc-sec-9-2-2', 'What belongs in a first-pass strategy?', 'Answer clear questions, flag hard ones, and return with the remaining time.'),
          fc('fc-sec-9-2-3', 'What should you do after a technical problem during the test?', 'Notify the invigilator or official contact immediately and record what happened.')
        ],
        [
          mcq('q-sec-9-2-1', 'What should you do if an SRTC instruction conflicts with this app?', ['Follow the app', 'Follow the official instruction', 'Ignore both', 'Choose the easier rule'], 1, 'Official SRTC instructions control the assessment.'),
          mcq('q-sec-9-2-2', 'Which question wording deserves special attention?', ['A short factual question', 'A question with “least accurate” or “except”', 'A question you already know', 'A question with one option'], 1, 'Negative or superlative qualifiers change what the question is asking.'),
          tf('q-sec-9-2-3', 'Cramming a brand-new module the night before is the best use of final study time.', false, 'Reviewing familiar errors and definitions is usually more effective than starting new material.')
        ],
        'Write your own exam-day checklist for the next 24 hours before the test, including one recovery action for a technical problem.'
      )
    ]
  );

  const tradingApp = mod(
    'sec-mod-10',
    'Trading App BA Lens',
    'Optional bridge from securities theory to product requirements, controls, and risk communication.',
    [
      lesson(
        'sec-10-1',
        'Market structure as product requirements',
        25,
        [
          'Translate market rules into user stories and acceptance criteria',
          'Model the order lifecycle and its exception states',
          'Distinguish functional requirements from non-functional requirements',
          'Identify edge cases that a trading app must handle safely'
        ],
        `<p><strong>Why market structure matters to a product team.</strong> A trading app is not only a screen with a buy button. It represents market sessions, order types, price limits, buying power, matching, and settlement. If the product ignores those rules, the user sees rejected orders, misleading prices, or balances that do not match reality.</p>
        <p><strong>From rule to requirement.</strong> A market rule becomes a user story and testable acceptance criteria. For example: “As an investor, I want to place a limit order so that I do not pay more than my stated price.” Acceptance criteria should state the validation, the confirmation message, the resulting order state, and what happens when the market is closed or the price is outside the allowed limit.</p>
        <ul>
          <li>Order ticket: symbol, side, quantity, order type, price, time in force.</li>
          <li>Validation: lot size, price limit, buying power, trading session, account status.</li>
          <li>Order lifecycle: draft, submitted, accepted, partially filled, filled, cancelled, rejected.</li>
          <li>Market data: last price, bid, ask, timestamp, delayed-data label, stale-data handling.</li>
        </ul>
        <p><strong>Functional and non-functional requirements.</strong> Functional requirements describe what the app does, such as submitting or cancelling an order. Non-functional requirements describe qualities: latency, availability, auditability, security, accessibility, and recovery after failure. A fast order ticket without an audit trail is not a safe product.</p>
        <p><strong>Edge cases are requirements too.</strong> Decide what happens when a partial fill arrives, a cancel request races with an execution, the session closes, the price limit changes, or market data is delayed. Write these cases into the acceptance criteria and UAT scenarios before release. The best BA question is often: “What should the user see when this fails?”</p>`,
        [
          { term: 'User story', definition: 'A short description of a user need written from the user\'s perspective.' },
          { term: 'Acceptance criteria', definition: 'Testable conditions that must be true for a story to be accepted.' },
          { term: 'Order lifecycle', definition: 'The sequence of states an order passes through from submission to final outcome.' },
          { term: 'Non-functional requirement', definition: 'A quality or constraint such as performance, security, or availability.' }
        ],
        [
          fc('fc-sec-10-1-1', 'What should a limit-order acceptance criterion include?', 'The price validation, confirmation, order state, and handling of invalid or closed-market cases.'),
          fc('fc-sec-10-1-2', 'Name four order lifecycle states.', 'Submitted, accepted, partially filled, filled, cancelled, or rejected.'),
          fc('fc-sec-10-1-3', 'Why are non-functional requirements important in a trading app?', 'They cover latency, availability, security, auditability, and failure recovery, which affect trust and safety.')
        ],
        [
          mcq('q-sec-10-1-1', 'Which is the best acceptance criterion for a limit buy order?', ['The order looks nice', 'The app rejects a buy price above the stated limit', 'The app always fills the order', 'The app hides the price'], 1, 'A limit order must enforce the stated maximum price.'),
          mcq('q-sec-10-1-2', 'Which item is a non-functional requirement?', ['Submit an order', 'Cancel an order', 'Show a confirmation', 'Respond within two seconds under normal load'], 3, 'Response time is a quality constraint, not a business action.'),
          tf('q-sec-10-1-3', 'A partially filled order should be treated as a normal state in the product design.', true, 'Partial fills are common and must be displayed and handled explicitly.')
        ],
        'Turn one market rule into a user story with at least three acceptance criteria and two edge cases.'
      ),
      lesson(
        'sec-10-2',
        'Disclosure, suitability & trading-app risk',
        25,
        [
          'Explain how disclosure supports informed investment decisions',
          'Design a suitability flow that records client objectives and risk tolerance',
          'Identify controls that reduce trading-app misuse and operational risk',
          'Write product requirements for warnings, audit trails, and incident handling'
        ],
        `<p><strong>Disclosure is a product feature.</strong> Users need clear information about fees, order handling, market-data delays, product risks, and conflicts of interest. Disclosure should appear before a decision, not buried in a long document after the trade. Plain language, visible risk warnings, and a record that the user saw the information are all product requirements.</p>
        <p><strong>Suitability is not a guarantee.</strong> A suitability process collects the client\'s objectives, time horizon, financial situation, knowledge, and risk tolerance. It then compares the client profile with the product\'s risk level and warns when they do not match. A risk questionnaire reduces some mistakes, but it does not remove market risk or guarantee a suitable outcome.</p>
        <ul>
          <li>Capture and timestamp the risk profile and its review date.</li>
          <li>Show a product risk rating and a clear mismatch warning.</li>
          <li>Require fresh confirmation when the profile is missing or expired.</li>
          <li>Record acknowledgements, order changes, and cancellations in an audit trail.</li>
          <li>Provide access controls, session security, and a complaint or incident route.</li>
        </ul>
        <p><strong>Risk scenarios.</strong> A trading app can fail through stale prices, a misleading return claim, an order sent to the wrong account, an unauthorized login, or a warning that users can dismiss without understanding it. Product requirements should address prevention, detection, and recovery. For each scenario, define the user message, the control, the log, and the escalation path.</p>
        <p><strong>Compliance as a design partner.</strong> Involve compliance, legal, operations, and customer support early. Review marketing language for promises that cannot be supported. Test the suitability flow with realistic profiles, including missing data and changed circumstances. The goal is not to block every trade; it is to make risk visible, decisions recorded, and failures recoverable.</p>`,
        [
          { term: 'Risk profile', definition: 'A record of a client\'s objectives, horizon, financial situation, knowledge, and risk tolerance.' },
          { term: 'Product risk rating', definition: 'A classification of a product\'s risk level used when comparing it with a client profile.' },
          { term: 'Audit trail', definition: 'A chronological record of actions and events that supports review and accountability.' },
          { term: 'Risk warning', definition: 'A clear statement that helps a user understand a potential loss or limitation before deciding.' }
        ],
        [
          fc('fc-sec-10-2-1', 'When should a risk warning appear?', 'Before the investment decision, in clear language, with a record that the user saw it.'),
          fc('fc-sec-10-2-2', 'What should a suitability flow compare?', 'The client risk profile and objectives against the product\'s risk and features.'),
          fc('fc-sec-10-2-3', 'What is the purpose of an audit trail?', 'To record actions and events so they can be reviewed, investigated, and explained.')
        ],
        [
          mcq('q-sec-10-2-1', 'What should happen when a client risk profile is missing or expired?', ['Execute the order silently', 'Show a mismatch warning and refresh the profile before proceeding', 'Delete the account', 'Hide the product risk rating'], 1, 'A missing or stale profile should trigger a controlled suitability step, not silent execution.'),
          mcq('q-sec-10-2-2', 'Which control best supports accountability after an order change?', ['A colourful button', 'An audit trail with timestamps', 'A shorter marketing slogan', 'A hidden fee'], 1, 'An audit trail records who changed what and when.'),
          tf('q-sec-10-2-3', 'A high-return marketing message can safely omit the product risk warning.', false, 'Risk must be presented clearly and not hidden by return claims.')
        ],
        'Explain how you would design a suitability and disclosure flow for a trading app without promising that it prevents all investment losses.'
      )
    ]
  );

  tradingApp.optional = true;

  const securities = {
    id: 'securities',
    title: 'Securities Theory (SRTC)',
    shortTitle: 'SEC',
    description: 'Unofficial English practice mapped to the eight public SRTC basic securities topics, with three practice mocks, a final review, and an optional trading-app bridge. Not affiliated with SRTC or UBCKNN and not a certificate or pass guarantee.',
    modules: [orientation, finalReview, tradingApp]
  };

  securities.optional = true;
  securities.prerequisiteId = null;
  securities.affectsOverall = false;
  securities.examModuleTitle = 'Practice Mocks';
  securities.examPrep = {
    examName: 'SRTC Basic Securities',
    provider: 'SRTC/UBCKNN',
    format: '12 sessions · final test',
    targetPercent: 70,
    mockTarget: 70,
    disclaimer: 'Unofficial practice only. NeZha is not affiliated with SRTC or UBCKNN. The official program, fee, schedule, and assessment are controlled by SRTC, so verify current details with SRTC. This app does not award the certificate and does not guarantee a pass.'
  };

  securities.source = 'SRTC public basic securities program outline';
  securities.verifiedOn = '2026-11-12';
  securities.volatile = true;
  securities.volatileReason = 'Fees, schedules, session format, and assessment rules can change; confirm current details with SRTC.';
  securities.examPrep.source = securities.source;
  securities.examPrep.verifiedOn = securities.verifiedOn;
  securities.examPrep.volatile = securities.volatile;
  securities.examPrep.volatileReason = securities.volatileReason;

  if (!curriculum.tracks.some((track) => track.id === securities.id)) {
    const baIndex = curriculum.tracks.findIndex((track) => track.id === 'ba');
    curriculum.tracks.splice(baIndex >= 0 ? baIndex + 1 : curriculum.tracks.length, 0, securities);
  }

  return {
    track: securities,
    moduleIds: securities.modules.map((module) => module.id)
  };
})();
