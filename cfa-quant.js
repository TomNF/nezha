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
    topicId: 'quant-tvm'
  });

  const lessons = [
    lesson(
      'cfa-tvm-1',
      'Interest rate interpretation',
      40,
      [
        'Distinguish nominal, real, and effective rates',
        'Interpret a required return as an opportunity cost',
        'Use the Fisher equation correctly'
      ],
      `<p><strong>An interest rate is a price.</strong> It prices time and risk. The same numerical rate can mean different things depending on whether it is nominal, real, effective, or required.</p>
      <h4>Four labels to keep separate</h4>
      <ul>
        <li><strong>Nominal rate:</strong> a quoted rate that may include expected inflation.</li>
        <li><strong>Real rate:</strong> a rate measured in purchasing-power terms, excluding inflation.</li>
        <li><strong>Effective annual rate:</strong> the true annual rate after intra-year compounding.</li>
        <li><strong>Required return:</strong> the minimum return demanded for a given risk level.</li>
      </ul>
      <h4>Fisher equation</h4>
      <p>Real rate = (1 + nominal) / (1 + inflation) − 1. Nominal minus inflation is only an approximation.</p>
      <h4>Worked example</h4>
      <p>The nominal rate is 8% and expected inflation is 3%. What is the real rate?</p>
      <p>Real rate = 1.08 / 1.03 − 1 = 4.85%. The approximation 8% − 3% = 5% overstates the real return.</p>
      <h4>Common trap</h4>
      <p>Do not use a nominal rate to discount real cash flows or a real rate to discount nominal cash flows. Match the cash flow and the rate.</p>
      <h4>Exam move</h4>
      <p>If the question says “today’s dollars” or “purchasing power,” think real rate. If it says “quoted” or “stated,” think nominal rate.</p>`,
      [
        { term: 'Nominal rate', definition: 'A quoted rate that may include expected inflation.' },
        { term: 'Real rate', definition: 'A return measured after removing the effect of inflation.' },
        { term: 'Required return', definition: 'The minimum return an investor demands for taking on a given level of risk.' },
        { term: 'Fisher equation', definition: 'A formula linking nominal rates, real rates, and inflation.' }
      ],
      [
        fc('fc-cfa-tvm-1-1', 'What does the Fisher equation calculate?', 'The real rate from the nominal rate and inflation.'),
        fc('fc-cfa-tvm-1-2', 'Why is nominal minus inflation only an approximation?', 'Because the exact relationship is multiplicative: (1 + nominal) / (1 + inflation) − 1.'),
        fc('fc-cfa-tvm-1-3', 'What does a required return represent?', 'The minimum return demanded for the investment’s risk.')
      ],
      quizFor('cfa-tvm-1'),
      'Explain nominal versus real returns using a salary example and an investment example.'
    ),
    lesson(
      'cfa-tvm-2',
      'EAR and APR',
      45,
      [
        'Calculate EAR from an APR and compounding frequency',
        'Convert EAR back to a nominal APR',
        'Choose the correct rate for comparing financial products'
      ],
      `<p><strong>APR</strong> is a nominal annual quote. <strong>EAR</strong> is the true annual rate after compounding. When products compound more than once per year, EAR is the better comparison tool.</p>
      <h4>Formulas</h4>
      <ul>
        <li>EAR = (1 + APR/m)^m − 1</li>
        <li>APR = m × [(1 + EAR)^(1/m) − 1]</li>
      </ul>
      <p>Here m is the number of compounding periods per year. For monthly compounding, m = 12.</p>
      <h4>Worked example</h4>
      <p>A credit card quotes 18% APR with monthly compounding. What is the EAR?</p>
      <p>Monthly rate = 0.18 / 12 = 1.5%. EAR = 1.015^12 − 1 = 19.56%. The card costs more than the quoted 18% because interest compounds each month.</p>
      <h4>Comparing products</h4>
      <p>Compare 12% APR monthly with 12.2% APR annual. The monthly product has EAR = 1.01^12 − 1 = 12.68%, so the 12.2% annual product is cheaper.</p>
      <h4>Common trap</h4>
      <p>Do not compare an APR with an EAR directly. Convert both to the same basis first.</p>
      <h4>Exam move</h4>
      <p>If the question asks for the “true annual cost” or “effective annual return,” compute EAR. If it asks for the “quoted annual rate,” compute APR.</p>`,
      [
        { term: 'APR', definition: 'A nominal annual percentage rate that may ignore intra-year compounding.' },
        { term: 'EAR', definition: 'The effective annual rate after accounting for compounding.' },
        { term: 'Compounding frequency', definition: 'The number of times per year interest is added to principal.' },
        { term: 'Periodic rate', definition: 'The rate applied in one compounding period, equal to APR / m for a nominal APR.' }
      ],
      [
        fc('fc-cfa-tvm-2-1', 'How do you calculate EAR from APR?', 'EAR = (1 + APR/m)^m − 1.'),
        fc('fc-cfa-tvm-2-2', 'Which is higher for monthly compounding: APR or EAR?', 'EAR is higher because interest compounds during the year.'),
        fc('fc-cfa-tvm-2-3', 'When do APR and EAR equal each other?', 'When compounding occurs only once per year.')
      ],
      quizFor('cfa-tvm-2'),
      'Explain why a credit card’s EAR is higher than its APR and why that matters to a borrower.'
    ),
    lesson(
      'cfa-tvm-3',
      'Compounding frequency',
      45,
      [
        'Convert between annual and periodic rates',
        'Calculate future and present values with intra-year compounding',
        'Interpret continuous compounding and effective annual rates'
      ],
      `<p><strong>Frequency is not a detail.</strong> A rate without a frequency is incomplete. The periodic rate and the number of periods must match the compounding frequency.</p>
      <h4>General approach</h4>
      <ul>
        <li>Periodic rate = nominal annual rate / m</li>
        <li>Number of periods = m × t</li>
        <li>FV = PV × (1 + r/m)^(m × t)</li>
        <li>PV = FV / (1 + r/m)^(m × t)</li>
      </ul>
      <h4>Worked example</h4>
      <p>You invest $5,000 for 3 years at 12% nominal with monthly compounding.</p>
      <p>Monthly rate = 1%. Number of periods = 36. FV = $5,000 × 1.01^36 = $7,153.84. If you had used 3 periods at 12%, you would have understated the future value.</p>
      <h4>Continuous compounding</h4>
      <p>FV = PV × e^(r × t). The effective annual rate is e^r − 1. Continuous compounding produces the highest EAR for a given nominal rate.</p>
      <h4>Common trap</h4>
      <p>Do not divide the number of years by m. Multiply years by m to get periods. Do not use the annual rate as the periodic rate.</p>
      <h4>Exam move</h4>
      <p>Write the frequency beside the rate before you calculate. “12% monthly” becomes “1% per month, 36 months.”</p>`,
      [
        { term: 'Periodic rate', definition: 'The rate per compounding period, equal to the nominal annual rate divided by m.' },
        { term: 'Compounding periods', definition: 'The number of times interest is applied over the investment horizon.' },
        { term: 'Continuous compounding', definition: 'A limiting case where compounding occurs infinitely often.' },
        { term: 'Effective annual rate', definition: 'The annualized rate after including intra-year compounding.' }
      ],
      [
        fc('fc-cfa-tvm-3-1', 'How do you convert 12% monthly to a monthly rate?', 'Divide 12% by 12 to get 1% per month.'),
        fc('fc-cfa-tvm-3-2', 'How many monthly periods are in 4 years?', '4 × 12 = 48 months.'),
        fc('fc-cfa-tvm-3-3', 'Which compounding frequency produces the highest EAR for the same nominal rate?', 'Continuous compounding.')
      ],
      quizFor('cfa-tvm-3'),
      'Explain how changing compounding frequency changes the effective annual rate without changing the quoted APR.'
    ),
    lesson(
      'cfa-tvm-4',
      'Loan amortization',
      50,
      [
        'Calculate a level loan payment',
        'Separate interest and principal in a payment',
        'Estimate the remaining balance and total interest'
      ],
      `<p><strong>An amortizing loan</strong> is repaid with level payments that cover interest and principal. Early payments are mostly interest; later payments are mostly principal.</p>
      <h4>Payment formula</h4>
      <p>PMT = PV / [(1 − (1 + r)^−n) / r]</p>
      <p>Use the periodic rate and the total number of payments. A 30-year monthly mortgage has n = 360.</p>
      <h4>Worked example</h4>
      <p>A $100,000 mortgage at 6% nominal with monthly payments over 30 years. The monthly rate is 0.5% and n = 360. PMT = $100,000 / 166.7916 = $599.55.</p>
      <p>First-month interest = $100,000 × 0.005 = $500.00. Principal = $599.55 − $500.00 = $99.55. The remaining balance is $100,000 − $99.55 = $99,900.45.</p>
      <h4>Remaining balance</h4>
      <p>The balance after t payments is the present value of the remaining payments. You can also roll the balance forward one period at a time: new balance = old balance × (1 + r) − payment.</p>
      <h4>Common trap</h4>
      <p>The monthly payment is not the monthly interest expense. Do not multiply the payment by the number of months and call the result interest.</p>
      <h4>Exam move</h4>
      <p>If the question asks for total interest, compute total payments first and subtract the original principal.</p>`,
      [
        { term: 'Amortization', definition: 'The process of repaying a loan through scheduled payments of interest and principal.' },
        { term: 'Principal', definition: 'The amount of a payment that reduces the outstanding loan balance.' },
        { term: 'Interest expense', definition: 'The cost of borrowing for the period, equal to the beginning balance times the periodic rate.' },
        { term: 'Remaining balance', definition: 'The unpaid principal after a number of payments.' }
      ],
      [
        fc('fc-cfa-tvm-4-1', 'How do you find the interest portion of a payment?', 'Beginning balance × periodic rate.'),
        fc('fc-cfa-tvm-4-2', 'What happens to the principal portion over time?', 'It increases as the outstanding balance and interest expense decline.'),
        fc('fc-cfa-tvm-4-3', 'How do you compute total interest on a loan?', 'Total payments minus the original principal.')
      ],
      quizFor('cfa-tvm-4'),
      'Explain why a borrower’s early mortgage payments are mostly interest and why extra principal payments matter.'
    ),
    lesson(
      'cfa-tvm-5',
      'Uneven cash flows',
      50,
      [
        'Value a stream of different cash flows',
        'Use the CF worksheet for NPV and IRR',
        'Interpret payback and discounted payback'
      ],
      `<p><strong>Uneven cash flows</strong> do not fit a level annuity formula. Discount each cash flow separately, or use the CF worksheet on the BA II Plus.</p>
      <h4>Present value of uneven cash flows</h4>
      <p>PV = CF1/(1 + r)^1 + CF2/(1 + r)^2 + ... + CFn/(1 + r)^n</p>
      <h4>Worked example</h4>
      <p>Cash flows are $2,000, $3,000, and $5,000 at the end of years 1, 2, and 3. At 8%:</p>
      <ul>
        <li>PV1 = $2,000 / 1.08 = $1,851.85</li>
        <li>PV2 = $3,000 / 1.08^2 = $2,572.02</li>
        <li>PV3 = $5,000 / 1.08^3 = $3,969.16</li>
        <li>Total PV = $8,393.03</li>
      </ul>
      <h4>NPV and IRR</h4>
      <p>NPV = PV of inflows − initial investment. IRR is the rate that makes NPV zero. Use the CF worksheet: CF0, C01, C02, C03, then NPV or IRR.</p>
      <h4>Payback</h4>
      <p>Payback is the time to recover the initial cost from nominal cash flows. Discounted payback uses present values. Neither measures value creation as well as NPV.</p>
      <h4>Common trap</h4>
      <p>Do not use an annuity formula when the cash flows change. Also, do not enter CF0 as a future cash flow; it is the initial cash flow at time 0.</p>
      <h4>Exam move</h4>
      <p>For uneven cash flows, draw the timeline and list the discount factors before touching the calculator.</p>`,
      [
        { term: 'Uneven cash flow', definition: 'A series of cash flows that are not equal in amount.' },
        { term: 'NPV', definition: 'The present value of all cash flows, including the initial investment.' },
        { term: 'IRR', definition: 'The discount rate that makes NPV equal to zero.' },
        { term: 'Payback period', definition: 'The time required to recover the initial investment from cash flows.' }
      ],
      [
        fc('fc-cfa-tvm-5-1', 'Why can’t you use the ordinary annuity formula for uneven cash flows?', 'The annuity formula assumes equal payments.'),
        fc('fc-cfa-tvm-5-2', 'What does CF0 represent in the CF worksheet?', 'The initial cash flow at time 0, usually the investment cost.'),
        fc('fc-cfa-tvm-5-3', 'What is discounted payback?', 'The time to recover the initial investment using discounted cash flows.')
      ],
      quizFor('cfa-tvm-5'),
      'Explain how to value uneven cash flows and why the CF worksheet is safer than forcing an annuity formula.'
    ),
    lesson(
      'cfa-tvm-6',
      'Exam-style TVM traps',
      45,
      [
        'Recognize common timing and frequency traps',
        'Avoid sign-convention and calculator-mode errors',
        'Choose the correct decision rule under pressure'
      ],
      `<p><strong>Most TVM exam mistakes are setup mistakes.</strong> The math is usually simple once the timeline, rate, and mode are correct.</p>
      <h4>Trap 1: beginning versus end</h4>
      <p>An annuity due pays at the beginning of each period. Either switch the calculator to BGN mode or multiply the ordinary annuity result by (1 + r).</p>
      <h4>Trap 2: P/Y and C/Y</h4>
      <p>If payments are monthly but P/Y is annual, the calculator misinterprets N and I/Y. Set P/Y to 12 for monthly payments and check C/Y.</p>
      <h4>Trap 3: sign convention</h4>
      <p>If PV is positive and PMT is positive, the calculator cannot solve a normal loan. Make cash inflows and outflows opposite signs.</p>
      <h4>Trap 4: rate and period mismatch</h4>
      <p>A monthly rate requires monthly periods. A quarterly rate requires quarterly periods. Never mix them.</p>
      <h4>Trap 5: IRR versus required return</h4>
      <p>A high IRR is not enough. Compare IRR with the required return. For mutually exclusive projects, NPV is generally the better decision rule.</p>
      <h4>Worked example</h4>
      <p>A lease pays $800 at the beginning of each month for 24 months at 9% nominal monthly. Monthly rate = 0.75%, n = 24, BGN mode. If you leave the calculator in END mode, you will understate the present value by one period of interest.</p>
      <h4>Exam move</h4>
      <p>Before pressing CPT, check four things: frequency, timing, signs, and what the question is asking for.</p>`,
      [
        { term: 'Annuity due trap', definition: 'Using END mode for a beginning-of-period payment stream.' },
        { term: 'P/Y mismatch', definition: 'A calculator setting that does not match the actual payments per year.' },
        { term: 'Sign convention', definition: 'The rule that cash inflows and outflows must have opposite signs in TVM registers.' },
        { term: 'IRR comparison', definition: 'The need to compare IRR with the required return, not just check whether it is positive.' }
      ],
      [
        fc('fc-cfa-tvm-6-1', 'What are the four pre-compute checks?', 'Frequency, payment timing, signs, and the variable you need to solve for.'),
        fc('fc-cfa-tvm-6-2', 'How do you handle an annuity due?', 'Use BGN mode or multiply the ordinary annuity result by (1 + r).'),
        fc('fc-cfa-tvm-6-3', 'Why can a positive IRR still be unacceptable?', 'Because the IRR may be below the required return.')
      ],
      quizFor('cfa-tvm-6'),
      'List the five TVM traps you are most likely to make and the check you will use to avoid each one.'
    )
  ];

  const module = {
    id: 'cfa-phase1-quant-tvm',
    title: 'Foundations: Quant TVM',
    description: 'Phase 1A: six beginner lessons on rates, EAR/APR, compounding, amortization, uneven cash flows, and exam traps.',
    phase: '1A',
    lessons
  };

  if (!cfa.modules.some((item) => item.id === module.id)) {
    const insertAt = cfa.modules.findIndex((item) => item.id === 'cfa-mod-1');
    if (insertAt >= 0) cfa.modules.splice(insertAt, 0, module);
    else cfa.modules.push(module);
  }

  window.NEZHA_CFA_QUANT = {
    moduleId: module.id,
    lessonIds: lessons.map((item) => item.id)
  };
})();
