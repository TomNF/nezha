(function () {
  'use strict';

  const formulas = [
    {
      id: 'fv-single',
      category: 'Time value',
      topicId: 'finance-math',
      name: 'Future value of a single sum',
      formula: 'FV = PV × (1 + r)^n',
      variables: 'PV = present value; r = rate per period; n = number of periods.',
      when: 'Use when one amount grows for several periods at a constant rate.',
      trap: 'Match r and n to the same period. A monthly rate needs a monthly n.'
    },
    {
      id: 'pv-single',
      category: 'Time value',
      topicId: 'finance-math',
      name: 'Present value of a single sum',
      formula: 'PV = FV / (1 + r)^n',
      variables: 'FV = future value; r = discount rate per period; n = number of periods.',
      when: 'Use to bring one future amount back to today.',
      trap: 'Do not subtract the discount rate from 1; divide by (1 + r)^n.'
    },
    {
      id: 'discount-factor',
      category: 'Time value',
      topicId: 'finance-math',
      name: 'Discount factor',
      formula: 'DF = 1 / (1 + r)^n',
      variables: 'DF = present value of 1 received in period n.',
      when: 'Use to value uneven cash flows one period at a time.',
      trap: 'A higher rate makes the discount factor smaller.'
    },
    {
      id: 'compound-factor',
      category: 'Time value',
      topicId: 'finance-math',
      name: 'Compound factor',
      formula: 'CF = (1 + r)^n',
      variables: 'CF = future value of 1 invested today.',
      when: 'Use to move a single amount forward in time.',
      trap: 'Compounding is multiplicative; do not just add r × n.'
    },
    {
      id: 'fv-compound-m',
      category: 'Compounding',
      topicId: 'quant-tvm',
      name: 'Future value with m compounding periods',
      formula: 'FV = PV × (1 + r/m)^(m × t)',
      variables: 'r = nominal annual rate; m = compounds per year; t = years.',
      when: 'Use when interest compounds more than once per year.',
      trap: 'Divide the annual rate by m and multiply the number of years by m.'
    },
    {
      id: 'pv-compound-m',
      category: 'Compounding',
      topicId: 'quant-tvm',
      name: 'Present value with m compounding periods',
      formula: 'PV = FV / (1 + r/m)^(m × t)',
      variables: 'r = nominal annual rate; m = compounds per year; t = years.',
      when: 'Use to discount a future amount when compounding is intra-year.',
      trap: 'The periodic rate is r/m, not r.'
    },
    {
      id: 'ear',
      category: 'Compounding',
      topicId: 'quant-tvm',
      name: 'Effective annual rate',
      formula: 'EAR = (1 + r/m)^m − 1',
      variables: 'r = nominal annual rate; m = compounds per year.',
      when: 'Use to compare investments or loans with different compounding frequencies.',
      trap: 'EAR equals APR only when m = 1.'
    },
    {
      id: 'apr-from-ear',
      category: 'Compounding',
      topicId: 'quant-tvm',
      name: 'APR from EAR',
      formula: 'APR = m × [(1 + EAR)^(1/m) − 1]',
      variables: 'm = compounds per year; EAR = effective annual rate.',
      when: 'Use when the true annual cost is known but the quoted APR is requested.',
      trap: 'Do not divide EAR by m; reverse the compounding.'
    },
    {
      id: 'continuous-fv',
      category: 'Compounding',
      topicId: 'quant-tvm',
      name: 'Continuous compounding future value',
      formula: 'FV = PV × e^(r × t)',
      variables: 'e ≈ 2.71828; r = continuously compounded rate; t = years.',
      when: 'Use when the problem explicitly says continuous compounding.',
      trap: 'Do not use the ordinary (1 + r)^t formula for continuous compounding.'
    },
    {
      id: 'continuous-ear',
      category: 'Compounding',
      topicId: 'quant-tvm',
      name: 'Continuous compounding EAR',
      formula: 'EAR = e^r − 1',
      variables: 'r = continuously compounded annual rate.',
      when: 'Use to compare a continuous rate with an ordinary EAR.',
      trap: 'The continuous rate is not the same as the EAR.'
    },
    {
      id: 'fv-annuity',
      category: 'Annuities',
      topicId: 'quant-tvm',
      name: 'Future value of an ordinary annuity',
      formula: 'FV = PMT × [((1 + r)^n − 1) / r]',
      variables: 'PMT = payment per period; r = rate per period; n = number of payments.',
      when: 'Use when equal payments occur at the end of each period.',
      trap: 'An annuity due has one extra period of compounding.'
    },
    {
      id: 'pv-annuity',
      category: 'Annuities',
      topicId: 'quant-tvm',
      name: 'Present value of an ordinary annuity',
      formula: 'PV = PMT × [(1 − (1 + r)^−n) / r]',
      variables: 'PMT = payment per period; r = rate per period; n = number of payments.',
      when: 'Use to value a level stream of end-of-period payments.',
      trap: 'Do not use the perpetuity formula when n is finite.'
    },
    {
      id: 'fv-annuity-due',
      category: 'Annuities',
      topicId: 'quant-tvm',
      name: 'Future value of an annuity due',
      formula: 'FV(due) = FV(ordinary) × (1 + r)',
      variables: 'r = rate per period.',
      when: 'Use when payments occur at the beginning of each period.',
      trap: 'Switch the calculator to BGN mode, or multiply the ordinary result by (1 + r).'
    },
    {
      id: 'pv-annuity-due',
      category: 'Annuities',
      topicId: 'quant-tvm',
      name: 'Present value of an annuity due',
      formula: 'PV(due) = PV(ordinary) × (1 + r)',
      variables: 'r = rate per period.',
      when: 'Use when the first payment is received immediately.',
      trap: 'An annuity due is worth more than the same ordinary annuity.'
    },
    {
      id: 'pv-perpetuity',
      category: 'Annuities',
      topicId: 'finance-math',
      name: 'Present value of a perpetuity',
      formula: 'PV = PMT / r',
      variables: 'PMT = constant payment per period; r = required return per period.',
      when: 'Use when the same cash flow continues forever.',
      trap: 'The first payment is assumed to arrive one period from now.'
    },
    {
      id: 'pv-growing-perpetuity',
      category: 'Annuities',
      topicId: 'finance-math',
      name: 'Present value of a growing perpetuity',
      formula: 'PV = CF1 / (r − g)',
      variables: 'CF1 = next period cash flow; r = required return; g = growth rate; r > g.',
      when: 'Use for a cash flow that grows forever at a constant rate.',
      trap: 'Use next year’s cash flow, not the most recent cash flow.'
    },
    {
      id: 'pv-uneven',
      category: 'Annuities',
      topicId: 'quant-tvm',
      name: 'Present value of uneven cash flows',
      formula: 'PV = Σ [CFt / (1 + r)^t]',
      variables: 'CFt = cash flow in period t; r = discount rate.',
      when: 'Use when cash flows change from period to period.',
      trap: 'Do not use an annuity formula unless the cash flows are equal.'
    },
    {
      id: 'fv-uneven',
      category: 'Annuities',
      topicId: 'quant-tvm',
      name: 'Future value of uneven cash flows',
      formula: 'FV = Σ [CFt × (1 + r)^(n − t)]',
      variables: 'CFt = cash flow in period t; n = final period; r = rate.',
      when: 'Use to move a series of different cash flows to one future date.',
      trap: 'The last cash flow receives no compounding.'
    },
    {
      id: 'npv',
      category: 'Investment decisions',
      topicId: 'finance-math',
      name: 'Net present value',
      formula: 'NPV = Σ [CFt / (1 + r)^t] − Initial investment',
      variables: 'CFt = cash flow in period t; r = required return.',
      when: 'Use to decide whether a project adds value.',
      trap: 'Accept a positive NPV project; a negative NPV destroys value.'
    },
    {
      id: 'irr',
      category: 'Investment decisions',
      topicId: 'finance-math',
      name: 'Internal rate of return',
      formula: '0 = Σ [CFt / (1 + IRR)^t] − Initial investment',
      variables: 'IRR = discount rate that makes NPV equal to zero.',
      when: 'Use to compare a project’s return with the required return.',
      trap: 'IRR can be misleading with non-conventional cash flows or when projects differ in scale.'
    },
    {
      id: 'fisher',
      category: 'Investment decisions',
      topicId: 'quant-tvm',
      name: 'Fisher real rate',
      formula: 'Real rate = (1 + nominal) / (1 + inflation) − 1',
      variables: 'nominal = nominal rate; inflation = expected inflation rate.',
      when: 'Use to convert a nominal return into a real return.',
      trap: 'Nominal minus inflation is only an approximation.'
    },
    {
      id: 'loan-payment',
      category: 'Loans',
      topicId: 'quant-tvm',
      name: 'Loan payment',
      formula: 'PMT = PV / [(1 − (1 + r)^−n) / r]',
      variables: 'PV = loan amount; r = periodic rate; n = number of payments.',
      when: 'Use to calculate a level amortizing loan payment.',
      trap: 'The payment includes both interest and principal; it is not the interest expense.'
    },
    {
      id: 'remaining-balance',
      category: 'Loans',
      topicId: 'quant-tvm',
      name: 'Remaining loan balance',
      formula: 'Balance = PV × (1 + r)^t − PMT × [((1 + r)^t − 1) / r]',
      variables: 't = number of payments already made.',
      when: 'Use to find the principal outstanding after a number of payments.',
      trap: 'The remaining balance is the present value of the remaining payments.'
    },
    {
      id: 'number-periods',
      category: 'Loans',
      topicId: 'finance-math',
      name: 'Number of periods',
      formula: 'n = ln(FV / PV) / ln(1 + r)',
      variables: 'FV = target value; PV = starting value; r = rate per period.',
      when: 'Use to estimate how long a single sum takes to reach a target.',
      trap: 'Use natural logarithms and keep r and n in the same period.'
    },
    {
      id: 'rule-72',
      category: 'Exam shortcuts',
      topicId: 'quant-tvm',
      name: 'Rule of 72',
      formula: 'Approximate doubling time = 72 / annual rate (%)',
      variables: 'annual rate is expressed as a percent, not a decimal.',
      when: 'Use for a quick sanity check, not an exact answer.',
      trap: 'The rule is only an approximation; exact doubling time uses ln(2) / ln(1 + r).'
    },
    {
      id: 'ba2plus-clear',
      category: 'BA II Plus',
      topicId: 'finance-math',
      name: 'Clear TVM registers',
      formula: '2nd CLR TVM',
      variables: 'Clears N, I/Y, PV, PMT, and FV.',
      when: 'Use before every new TVM problem.',
      trap: 'Clearing the display or pressing CE/C does not clear TVM registers.'
    },
    {
      id: 'ba2plus-pyy',
      category: 'BA II Plus',
      topicId: 'quant-tvm',
      name: 'Set payments per year',
      formula: '2nd P/Y → enter payments per year → ENTER → 2nd QUIT',
      variables: 'P/Y = payments per year; C/Y is often set to match.',
      when: 'Use when payments are monthly, quarterly, or semiannual.',
      trap: 'If P/Y is wrong, N and I/Y are interpreted for the wrong period.'
    },
    {
      id: 'ba2plus-bgn',
      category: 'BA II Plus',
      topicId: 'quant-tvm',
      name: 'Switch to annuity due',
      formula: '2nd BGN → 2nd SET → 2nd QUIT',
      variables: 'BGN mode makes the first payment occur immediately.',
      when: 'Use for lease payments, rent, or any beginning-of-period cash flow.',
      trap: 'Forgetting to switch back to END mode corrupts the next ordinary annuity problem.'
    },
    {
      id: 'ba2plus-cf',
      category: 'BA II Plus',
      topicId: 'finance-math',
      name: 'Uneven cash flow worksheet',
      formula: 'CF → enter CF0 → ENTER → ↓ → C01 → ... → NPV → I → CPT',
      variables: 'CF0 is the initial cash flow; C01, C02, ... are later cash flows.',
      when: 'Use for uneven cash flows, NPV, and IRR.',
      trap: 'CF0 is usually negative; C01 is the first future cash flow, not today’s flow.'
    }
  ];

  window.NEZHA_CFA_FORMULAS = {
    version: 1,
    categories: [...new Set(formulas.map((formula) => formula.category))],
    formulas
  };
})();
