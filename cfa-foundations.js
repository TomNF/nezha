(function () {
  'use strict';

  const curriculum = window.NEZHA_CURRICULUM;
  if (!curriculum || !Array.isArray(curriculum.tracks)) return;

  const cfa = curriculum.tracks.find((track) => track.id === 'cfa');
  if (!cfa) return;

  const fc = (id, front, back) => ({ id, front, back });
  const quizFor = (lessonId) => {
    const registry = window.NEZHA_CFA_ASSESSMENTS;
    return registry && typeof registry.lessonQuizFor === 'function'
      ? registry.lessonQuizFor(lessonId) || []
      : [];
  };
  const lesson = (id, title, estimatedMinutes, objectives, contentHtml, keyTerms, flashcards, quiz, feynman) => ({
    id,
    title,
    estimatedMinutes,
    objectives,
    contentHtml,
    keyTerms,
    flashcards,
    quiz,
    feynman,
    phase: '1A',
    topicId: 'finance-math'
  });

  const lessons = [
    lesson(
      'cfa-fm-1',
      'Finance math map',
      40,
      [
        'Identify the four building blocks of finance math',
        'Classify a problem by cash-flow timing and pattern',
        'Choose between TVM, annuity, perpetuity, NPV, and IRR tools'
      ],
      `<p><strong>Why start with a map?</strong> Most beginner errors are not calculator errors. They come from using the right formula on the wrong cash-flow pattern. Finance math is easier when you first classify the problem.</p>
      <h4>The four building blocks</h4>
      <ul>
        <li><strong>Timing:</strong> is the cash flow today, next year, monthly, or at the end of a project?</li>
        <li><strong>Rate:</strong> is the quoted rate annual, monthly, nominal, effective, real, or a required return?</li>
        <li><strong>Pattern:</strong> is the cash flow a single amount, a level annuity, a growing stream, a perpetuity, or uneven?</li>
        <li><strong>Decision:</strong> do you need a future value, a present value, a payment, a rate, an NPV, or an IRR?</li>
      </ul>
      <h4>A reliable workflow</h4>
      <ol>
        <li>Draw a timeline. Put 0 today and label every cash flow by date.</li>
        <li>Convert the rate and the number of periods to the same frequency.</li>
        <li>Choose the pattern: single sum, annuity, perpetuity, or uneven cash flows.</li>
        <li>Solve, then sanity-check the sign and size of the answer.</li>
      </ol>
      <h4>Worked example</h4>
      <p>A lease requires $800 at the beginning of each month for 24 months. The annual rate is 9% with monthly compounding. Which pattern is this?</p>
      <p>It is an <strong>annuity due</strong>: equal payments, monthly frequency, first payment at time 0. The monthly rate is 0.09 / 12 = 0.0075, and the number of payments is 24. You would use BGN mode on the BA II Plus, or multiply the ordinary annuity result by 1.0075.</p>
      <h4>Common trap</h4>
      <p>Do not start with the calculator. Start with the timeline. If you cannot describe the pattern in one sentence, you are not ready to press keys.</p>
      <h4>Exam move</h4>
      <p>When a question looks long, underline three things: the rate frequency, the payment timing (beginning or end), and what the question asks you to solve for.</p>`,
      [
        { term: 'Timeline', definition: 'A dated map of cash inflows and outflows used to choose the right TVM tool.' },
        { term: 'Cash-flow pattern', definition: 'The shape of a stream: single sum, level annuity, growing stream, perpetuity, or uneven.' },
        { term: 'Decision rule', definition: 'A rule such as accept a project when NPV is positive.' }
      ],
      [
        fc('fc-cfa-fm-1-1', 'What are the four building blocks of a finance math problem?', 'Timing, rate, cash-flow pattern, and the decision variable you need to solve for.'),
        fc('fc-cfa-fm-1-2', 'What should you draw before using a calculator?', 'A timeline with dated cash flows.'),
        fc('fc-cfa-fm-1-3', 'What is an annuity due?', 'A stream of equal payments where the first payment occurs immediately.')
      ],
      quizFor('cfa-fm-1'),
      'Explain the four building blocks of finance math using one personal example and one exam-style example.'
    ),
    lesson(
      'cfa-fm-2',
      'Time value of money',
      45,
      [
        'Explain why a dollar today differs from a dollar later',
        'Calculate present value and future value for a single sum',
        'Apply the correct rate and number of periods'
      ],
      `<p><strong>The core idea.</strong> A dollar today can be invested, so it is worth more than a dollar received later. Time value of money (TVM) moves cash flows to a common date so they can be compared.</p>
      <h4>The two basic formulas</h4>
      <ul>
        <li><strong>Future value:</strong> FV = PV × (1 + r)^n</li>
        <li><strong>Present value:</strong> PV = FV / (1 + r)^n</li>
      </ul>
      <p>The rate r must match the period. A monthly problem needs a monthly rate and a monthly count of periods.</p>
      <h4>Worked example</h4>
      <p>You invest $2,000 for 4 years at 7% compounded annually. What is the future value?</p>
      <p>FV = $2,000 × 1.07^4 = $2,000 × 1.310796 = $2,621.59. If the question instead asks what $2,621.59 in 4 years is worth today, reverse the formula: $2,621.59 / 1.07^4 = $2,000.</p>
      <h4>Common trap</h4>
      <p>Do not mix annual and monthly inputs. If the rate is 12% per year with monthly compounding, the periodic rate is 1% and the number of periods is the number of months, not the number of years.</p>
      <h4>Exam move</h4>
      <p>Check that the answer direction makes sense. At a positive rate, a future value must be larger than the present value, and a present value must be smaller than the future value.</p>`,
      [
        { term: 'Present value', definition: 'The value today of a future cash flow after discounting.' },
        { term: 'Future value', definition: 'The value at a future date of an amount invested today.' },
        { term: 'Discount rate', definition: 'The rate used to convert a future cash flow into present value.' },
        { term: 'Period', definition: 'The time unit matching the interest rate, such as a month or a year.' }
      ],
      [
        fc('fc-cfa-fm-2-1', 'State the future value formula for a single sum.', 'FV = PV × (1 + r)^n.'),
        fc('fc-cfa-fm-2-2', 'State the present value formula for a single sum.', 'PV = FV / (1 + r)^n.'),
        fc('fc-cfa-fm-2-3', 'What must match in a TVM calculation?', 'The rate, the number of periods, and the cash-flow timing must use the same frequency.')
      ],
      quizFor('cfa-fm-2'),
      'Teach a friend why receiving $1,000 today is not the same as receiving $1,000 in three years.'
    ),
    lesson(
      'cfa-fm-3',
      'Compounding and discounting',
      45,
      [
        'Convert nominal rates into periodic rates',
        'Handle intra-year compounding correctly',
        'Interpret effective annual rate and continuous compounding'
      ],
      `<p><strong>Compounding</strong> moves money forward. <strong>Discounting</strong> moves money backward. The key is always the periodic rate and the number of periods.</p>
      <h4>Intra-year compounding</h4>
      <p>If the nominal annual rate is r and there are m compounding periods per year, the periodic rate is r / m. For t years, the number of periods is m × t.</p>
      <ul>
        <li>FV = PV × (1 + r/m)^(m × t)</li>
        <li>PV = FV / (1 + r/m)^(m × t)</li>
        <li>EAR = (1 + r/m)^m − 1</li>
      </ul>
      <h4>Worked example</h4>
      <p>A bank quotes 12% APR with monthly compounding. What is the effective annual rate?</p>
      <p>The monthly rate is 0.12 / 12 = 0.01. EAR = 1.01^12 − 1 = 12.68%. The quoted APR is 12%, but the true annual growth rate is 12.68%.</p>
      <h4>Continuous compounding</h4>
      <p>For continuous compounding, FV = PV × e^(r × t) and EAR = e^r − 1. Use this only when the question says continuous.</p>
      <h4>Common trap</h4>
      <p>Do not add rates across periods. Compounding is multiplicative. Also do not use the annual count of periods when the rate is monthly.</p>
      <h4>Exam move</h4>
      <p>When two rates are compared, convert both to EAR unless the question explicitly asks for APR.</p>`,
      [
        { term: 'Nominal rate', definition: 'A quoted annual rate that may ignore the effect of intra-year compounding.' },
        { term: 'Periodic rate', definition: 'The rate applied in one compounding period, such as r / m.' },
        { term: 'Effective annual rate', definition: 'The true annual rate after accounting for compounding frequency.' },
        { term: 'Continuous compounding', definition: 'A limiting case where compounding occurs infinitely often.' }
      ],
      [
        fc('fc-cfa-fm-3-1', 'How do you convert an APR to a monthly rate?', 'Divide the APR by 12.'),
        fc('fc-cfa-fm-3-2', 'What is the EAR formula for m compounding periods?', 'EAR = (1 + r/m)^m − 1.'),
        fc('fc-cfa-fm-3-3', 'When should you use continuous compounding?', 'Only when the problem explicitly states continuous compounding.')
      ],
      quizFor('cfa-fm-3'),
      'Explain the difference between APR and EAR using a credit card or savings account example.'
    ),
    lesson(
      'cfa-fm-4',
      'Annuities and perpetuities',
      50,
      [
        'Distinguish ordinary annuities, annuities due, and perpetuities',
        'Calculate the present and future value of level payment streams',
        'Value a growing perpetuity and a loan payment'
      ],
      `<p><strong>An annuity</strong> is a series of equal payments. An <strong>ordinary annuity</strong> pays at the end of each period. An <strong>annuity due</strong> pays at the beginning. A <strong>perpetuity</strong> continues forever.</p>
      <h4>Core formulas</h4>
      <ul>
        <li>PV ordinary annuity = PMT × [(1 − (1 + r)^−n) / r]</li>
        <li>FV ordinary annuity = PMT × [((1 + r)^n − 1) / r]</li>
        <li>Annuity due = ordinary annuity × (1 + r)</li>
        <li>PV perpetuity = PMT / r</li>
        <li>PV growing perpetuity = CF1 / (r − g)</li>
      </ul>
      <h4>Worked example</h4>
      <p>What is the present value of $500 received at the end of each year for 10 years at 5%?</p>
      <p>PV = $500 × [(1 − 1.05^−10) / 0.05] = $500 × 7.721735 = $3,860.87. If the payments began today, the annuity due value would be $3,860.87 × 1.05 = $4,053.91.</p>
      <h4>Common trap</h4>
      <p>The most common error is using the ordinary annuity formula for a beginning-of-period payment. The second most common error is using the current cash flow rather than next period's cash flow in a growing perpetuity.</p>
      <h4>Exam move</h4>
      <p>When you see a lease, rent, insurance premium, or subscription, ask whether the first payment is today. That single word changes the answer.</p>`,
      [
        { term: 'Ordinary annuity', definition: 'A series of equal payments at the end of each period.' },
        { term: 'Annuity due', definition: 'A series of equal payments at the beginning of each period.' },
        { term: 'Perpetuity', definition: 'A level payment stream that continues forever.' },
        { term: 'Growing perpetuity', definition: 'A perpetual stream whose cash flow grows at a constant rate.' }
      ],
      [
        fc('fc-cfa-fm-4-1', 'How does an annuity due differ from an ordinary annuity?', 'The annuity due pays at the beginning of each period, so each cash flow is discounted one period less.'),
        fc('fc-cfa-fm-4-2', 'What is the present value of a $100 perpetuity at 8%?', '$100 / 0.08 = $1,250.'),
        fc('fc-cfa-fm-4-3', 'What cash flow goes in the numerator of a growing perpetuity?', 'The next period cash flow, CF1, not the most recent cash flow.')
      ],
      quizFor('cfa-fm-4'),
      'Explain why an annuity due is worth more than an ordinary annuity without using a formula.'
    ),
    lesson(
      'cfa-fm-5',
      'NPV and IRR',
      50,
      [
        'Calculate NPV from a cash-flow timeline',
        'Interpret IRR and compare it with the required return',
        'Recognize when NPV and IRR may disagree'
      ],
      `<p><strong>NPV</strong> is the present value of all expected cash flows minus the initial investment. It measures the value added in today's dollars.</p>
      <p><strong>NPV = Σ [CFt / (1 + r)^t] − Initial investment</strong></p>
      <p><strong>IRR</strong> is the discount rate that makes NPV equal to zero.</p>
      <h4>Decision rules</h4>
      <ul>
        <li>Accept an independent project when NPV is positive.</li>
        <li>Accept an independent project when IRR is greater than the required return.</li>
        <li>When NPV and IRR rank mutually exclusive projects differently, NPV is generally preferred.</li>
      </ul>
      <h4>Worked example</h4>
      <p>A project costs $10,000 and returns $4,000 at the end of each year for 3 years. At a 10% required return:</p>
      <p>PV of inflows = $4,000 × [(1 − 1.10^−3) / 0.10] = $9,947.41. NPV = $9,947.41 − $10,000 = −$52.59. Because NPV is negative, reject at 10%. The IRR is about 9.70%, which is below 10%.</p>
      <h4>Common trap</h4>
      <p>Do not assume a positive IRR means accept. Compare IRR with the required return. Also, non-conventional cash flows can produce multiple IRRs.</p>
      <h4>Exam move</h4>
      <p>For a quick check, if the project's IRR is below the discount rate used, NPV must be negative. If the IRR is above the discount rate, NPV must be positive.</p>`,
      [
        { term: 'NPV', definition: 'The present value of expected cash flows minus the initial investment.' },
        { term: 'IRR', definition: 'The discount rate that makes a project’s NPV equal to zero.' },
        { term: 'Required return', definition: 'The minimum return an investment must earn to be acceptable.' },
        { term: 'Mutually exclusive projects', definition: 'Projects where choosing one prevents choosing the other.' }
      ],
      [
        fc('fc-cfa-fm-5-1', 'What is the NPV acceptance rule?', 'Accept an independent project if NPV is greater than zero.'),
        fc('fc-cfa-fm-5-2', 'What does an IRR of 12% mean?', 'At a 12% discount rate, the project’s NPV is zero.'),
        fc('fc-cfa-fm-5-3', 'When can IRR mislead?', 'When projects differ in scale or timing, or when non-conventional cash flows create multiple IRRs.')
      ],
      quizFor('cfa-fm-5'),
      'Explain to a manager why a positive IRR does not always mean a project should be accepted.'
    ),
    lesson(
      'cfa-fm-6',
      'BA II Plus calculator workflow',
      45,
      [
        'Clear TVM registers before each problem',
        'Set P/Y, C/Y, and BGN/END correctly',
        'Use the cash-flow worksheet for uneven cash flows'
      ],
      `<p><strong>The calculator is not the strategy.</strong> The BA II Plus is fast only when the setup matches the timeline. Build a repeatable workflow.</p>
      <h4>TVM workflow</h4>
      <ol>
        <li>Press <strong>2nd CLR TVM</strong> to clear N, I/Y, PV, PMT, and FV.</li>
        <li>Set <strong>P/Y</strong> and <strong>C/Y</strong> to match the payment and compounding frequency.</li>
        <li>Choose <strong>END</strong> for ordinary annuities or <strong>BGN</strong> for annuities due.</li>
        <li>Enter four known values, then compute the fifth with <strong>CPT</strong>.</li>
        <li>Check the sign convention: money received is positive, money paid is negative.</li>
      </ol>
      <h4>Cash-flow worksheet</h4>
      <p>For uneven cash flows, use <strong>CF</strong>. Enter CF0, then C01, C02, and so on. Press <strong>NPV</strong>, enter the discount rate at <strong>I</strong>, and press <strong>CPT</strong>. For IRR, press <strong>IRR</strong> and then <strong>CPT</strong>.</p>
      <h4>Worked example</h4>
      <p>A project costs $10,000 today and returns $4,000, $5,000, and $6,000. Enter CF0 = −10,000, C01 = 4,000, C02 = 5,000, C03 = 6,000. Then use NPV at the required return or IRR to solve for the project’s return.</p>
      <h4>Common trap</h4>
      <p>Pressing CE/C does not clear TVM registers. Forgetting BGN mode or a wrong P/Y setting can silently produce a plausible but wrong answer.</p>
      <h4>Exam move</h4>
      <p>Before computing, say the frequency out loud: “monthly rate, monthly periods, end-of-month payments.” This one habit prevents many calculator errors.</p>`,
      [
        { term: 'CLR TVM', definition: 'The BA II Plus function that clears the five TVM registers.' },
        { term: 'P/Y', definition: 'Payments per year, used by the calculator to interpret N and I/Y.' },
        { term: 'BGN mode', definition: 'Calculator mode for payments at the beginning of each period.' },
        { term: 'CF worksheet', definition: 'The BA II Plus worksheet for uneven cash flows, NPV, and IRR.' }
      ],
      [
        fc('fc-cfa-fm-6-1', 'Which key sequence clears the TVM registers?', '2nd CLR TVM.'),
        fc('fc-cfa-fm-6-2', 'What is the sign convention for a loan?', 'The loan amount received is positive and the payments made are negative, or the reverse, as long as the signs are opposite.'),
        fc('fc-cfa-fm-6-3', 'Which worksheet handles uneven cash flows?', 'The CF worksheet, followed by NPV or IRR.')
      ],
      quizFor('cfa-fm-6'),
      'Write a five-step BA II Plus checklist you would use before every TVM question.'
    )
  ];

  const module = {
    id: 'cfa-phase1-finance-math',
    title: 'Foundations: Finance Math & Calculator',
    description: 'Phase 1A: six beginner lessons on timelines, TVM, compounding, annuities, NPV/IRR, and the BA II Plus.',
    phase: '1A',
    lessons
  };

  if (!cfa.modules.some((item) => item.id === module.id)) {
    const insertAt = cfa.modules.findIndex((item) => item.id === 'cfa-mod-1');
    if (insertAt >= 0) cfa.modules.splice(insertAt, 0, module);
    else cfa.modules.push(module);
  }

  window.NEZHA_CFA_FOUNDATIONS = {
    moduleId: module.id,
    lessonIds: lessons.map((item) => item.id)
  };
})();
