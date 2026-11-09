(function () {
  'use strict';

  const registry = window.NEZHA_CFA_ASSESSMENTS;
  if (!registry) return;

  const practice = {
    "version": 1,
    "sessionSize": 10,
    "topics": [
      {
        "id": "finance-math",
        "title": "Finance Math & Calculator",
        "description": "Time value, compounding, annuities, NPV/IRR, and BA II Plus workflow.",
        "lessonIds": [
          "cfa-fm-1",
          "cfa-fm-2",
          "cfa-fm-3",
          "cfa-fm-4",
          "cfa-fm-5",
          "cfa-fm-6"
        ]
      },
      {
        "id": "quant-tvm",
        "title": "Quant TVM",
        "description": "Rates, EAR/APR, loan amortization, uneven cash flows, and exam traps.",
        "lessonIds": [
          "cfa-tvm-1",
          "cfa-tvm-2",
          "cfa-tvm-3",
          "cfa-tvm-4",
          "cfa-tvm-5",
          "cfa-tvm-6"
        ]
      }
    ],
    "questions": [
      {
        "id": "cfa-p1-fm-c01",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-2",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "You invest $1,000 today at 6% compounded annually for 3 years. What is the future value?",
        "options": [
          "$1,200.00",
          "$1,191.02",
          "$1,180.00"
        ],
        "answer": 1,
        "explanation": "FV = $1,000 × 1.06^3 = $1,191.02.",
        "steps": [
          "FV = PV × (1 + r)^n",
          "FV = $1,000 × (1.06)^3",
          "FV = $1,000 × 1.191016 = $1,191.02"
        ]
      },
      {
        "id": "cfa-p1-fm-c02",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-2",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What is the present value of $5,000 to be received in 4 years if the discount rate is 8%?",
        "options": [
          "$3,675.15",
          "$3,800.00",
          "$3,500.00"
        ],
        "answer": 0,
        "explanation": "PV = $5,000 / 1.08^4 = $3,675.15.",
        "steps": [
          "PV = FV / (1 + r)^n",
          "PV = $5,000 / (1.08)^4",
          "PV = $5,000 / 1.360489 = $3,675.15"
        ]
      },
      {
        "id": "cfa-p1-fm-c03",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A deposit of $2,000 earns 5% compounded annually for 10 years. What is the ending balance?",
        "options": [
          "$3,000.00",
          "$3,500.00",
          "$3,257.79"
        ],
        "answer": 2,
        "explanation": "FV = $2,000 × 1.05^10 = $3,257.79.",
        "steps": [
          "FV = PV × (1 + r)^n",
          "FV = $2,000 × (1.05)^10",
          "FV = $2,000 × 1.628895 = $3,257.79"
        ]
      },
      {
        "id": "cfa-p1-fm-c04",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "You invest $1,000 for 2 years at 10% per year. How much more interest do you earn with annual compounding than with simple interest?",
        "options": [
          "$100.00",
          "$10.00",
          "$20.00"
        ],
        "answer": 1,
        "explanation": "Compound FV is $1,210.00; simple interest is $200.00 on $1,000, so compound interest is $210.00. The difference is $10.00.",
        "steps": [
          "Compound FV = $1,000 × 1.10^2 = $1,210.00",
          "Simple interest = $1,000 × 0.10 × 2 = $200.00",
          "Difference = $210.00 − $200.00 = $10.00"
        ]
      },
      {
        "id": "cfa-p1-fm-c05",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A nominal rate of 12% is compounded monthly. What is the effective annual rate?",
        "options": [
          "12.68%",
          "12.00%",
          "12.55%"
        ],
        "answer": 0,
        "explanation": "EAR = (1 + 0.12/12)^12 − 1 = 12.68%.",
        "steps": [
          "EAR = (1 + r/m)^m − 1",
          "EAR = (1 + 0.12/12)^12 − 1",
          "EAR = (1.01)^12 − 1 = 12.68%"
        ]
      },
      {
        "id": "cfa-p1-fm-c06",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A rate of 8% is continuously compounded. What is the effective annual rate?",
        "options": [
          "8.00%",
          "8.16%",
          "8.33%"
        ],
        "answer": 2,
        "explanation": "EAR = e^0.08 − 1 = 8.33%.",
        "steps": [
          "EAR = e^r − 1",
          "EAR = e^0.08 − 1",
          "EAR = 1.083287 − 1 = 8.33%"
        ]
      },
      {
        "id": "cfa-p1-fm-c07",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "An investment has an effective annual rate of 10.25% with monthly compounding. What is the nominal annual rate?",
        "options": [
          "10.25%",
          "9.80%",
          "11.76%"
        ],
        "answer": 1,
        "explanation": "APR = 12 × [(1.1025)^(1/12) − 1] = 9.80%.",
        "steps": [
          "APR = m × [(1 + EAR)^(1/m) − 1]",
          "APR = 12 × [(1.1025)^(1/12) − 1]",
          "APR = 12 × 0.008165 = 9.80%"
        ]
      },
      {
        "id": "cfa-p1-fm-c08",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "You deposit $1,000 at the end of each year for 5 years at 6%. What is the future value?",
        "options": [
          "$5,637.09",
          "$5,975.32",
          "$5,000.00"
        ],
        "answer": 0,
        "explanation": "FV = $1,000 × [((1.06)^5 − 1) / 0.06] = $5,637.09.",
        "steps": [
          "FV = PMT × [((1 + r)^n − 1) / r]",
          "FV = $1,000 × [(1.06^5 − 1) / 0.06]",
          "FV = $1,000 × 5.637093 = $5,637.09"
        ]
      },
      {
        "id": "cfa-p1-fm-c09",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What is the present value of $500 received at the end of each year for 10 years at 5%?",
        "options": [
          "$4,053.91",
          "$3,500.00",
          "$3,860.87"
        ],
        "answer": 2,
        "explanation": "PV = $500 × [(1 − 1.05^−10) / 0.05] = $3,860.87.",
        "steps": [
          "PV = PMT × [(1 − (1 + r)^−n) / r]",
          "PV = $500 × [(1 − 1.05^−10) / 0.05]",
          "PV = $500 × 7.721735 = $3,860.87"
        ]
      },
      {
        "id": "cfa-p1-fm-c10",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A perpetuity pays $100 at the end of each year. If the required return is 8%, what is its present value?",
        "options": [
          "$1,300.00",
          "$1,250.00",
          "$1,000.00"
        ],
        "answer": 1,
        "explanation": "PV = $100 / 0.08 = $1,250.00.",
        "steps": [
          "PV = PMT / r",
          "PV = $100 / 0.08",
          "PV = $1,250.00"
        ]
      },
      {
        "id": "cfa-p1-fm-c11",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A growing perpetuity pays $100 next year. The required return is 10% and the growth rate is 4%. What is the present value?",
        "options": [
          "$1,000.00",
          "$2,500.00",
          "$1,666.67"
        ],
        "answer": 2,
        "explanation": "PV = $100 / (0.10 − 0.04) = $1,666.67.",
        "steps": [
          "PV = CF1 / (r − g)",
          "PV = $100 / (0.10 − 0.04)",
          "PV = $100 / 0.06 = $1,666.67"
        ]
      },
      {
        "id": "cfa-p1-fm-c12",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "You pay $2,000 at the beginning of each year for 4 years at 7%. What is the future value?",
        "options": [
          "$9,501.47",
          "$8,879.88",
          "$9,000.00"
        ],
        "answer": 0,
        "explanation": "The ordinary annuity FV is $8,879.88; multiplying by 1.07 gives $9,501.47.",
        "steps": [
          "Ordinary FV = $2,000 × [((1.07)^4 − 1) / 0.07] = $8,879.88",
          "Annuity due FV = $8,879.88 × 1.07",
          "FV(due) = $9,501.47"
        ]
      },
      {
        "id": "cfa-p1-fm-c13",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A $20,000 loan is repaid with 5 equal annual payments at 8%. What is the annual payment?",
        "options": [
          "$5,200.00",
          "$5,009.13",
          "$4,800.00"
        ],
        "answer": 1,
        "explanation": "PMT = $20,000 / 3.992710 = $5,009.13.",
        "steps": [
          "PMT = PV / [(1 − (1 + r)^−n) / r]",
          "PMT = $20,000 / [(1 − 1.08^−5) / 0.08]",
          "PMT = $20,000 / 3.992710 = $5,009.13"
        ]
      },
      {
        "id": "cfa-p1-fm-c14",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "A $20,000 loan at 8% is repaid with 5 equal annual payments of $5,009.13. What is the balance immediately after the first payment?",
        "options": [
          "$16,590.87",
          "$15,990.87",
          "$17,000.00"
        ],
        "answer": 0,
        "explanation": "Balance = $20,000 × 1.08 − $5,009.13 = $16,590.87.",
        "steps": [
          "Interest in year 1 = $20,000 × 0.08 = $1,600.00",
          "Principal repaid = $5,009.13 − $1,600.00 = $3,409.13",
          "Balance = $20,000.00 − $3,409.13 = $16,590.87"
        ]
      },
      {
        "id": "cfa-p1-fm-c15",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "How many years does it take for $1,000 to double at an annual rate of 7%?",
        "options": [
          "11.00 years",
          "10.24 years",
          "10.00 years"
        ],
        "answer": 1,
        "explanation": "n = ln(2) / ln(1.07) = 10.24 years.",
        "steps": [
          "n = ln(FV / PV) / ln(1 + r)",
          "n = ln(2) / ln(1.07)",
          "n = 0.693147 / 0.067659 = 10.24"
        ]
      },
      {
        "id": "cfa-p1-fm-c16",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "$1,000 grows to $1,500 in 5 years. What annual compound rate did it earn?",
        "options": [
          "8.00%",
          "10.00%",
          "8.45%"
        ],
        "answer": 2,
        "explanation": "r = (1,500 / 1,000)^(1/5) − 1 = 8.45%.",
        "steps": [
          "r = (FV / PV)^(1/n) − 1",
          "r = (1.5)^(1/5) − 1",
          "r = 1.084472 − 1 = 8.45%"
        ]
      },
      {
        "id": "cfa-p1-fm-c17",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A project costs $10,000 today and returns $4,000 at the end of each year for 3 years. At a 10% required return, what is the NPV?",
        "options": [
          "−$52.59",
          "$52.59",
          "$1,000.00"
        ],
        "answer": 0,
        "explanation": "The PV of the inflows is $9,947.41, so NPV = $9,947.41 − $10,000 = −$52.59.",
        "steps": [
          "PV = $4,000 × [(1 − 1.10^−3) / 0.10]",
          "PV = $4,000 × 2.486852 = $9,947.41",
          "NPV = $9,947.41 − $10,000 = −$52.59"
        ]
      },
      {
        "id": "cfa-p1-fm-c18",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A project costs $10,000 today and returns $4,000 at the end of each year for 3 years. What is its IRR?",
        "options": [
          "10.00%",
          "12.00%",
          "9.70%"
        ],
        "answer": 2,
        "explanation": "The IRR solves $10,000 = $4,000 × annuity factor; the result is about 9.70%.",
        "steps": [
          "Set NPV = 0: $10,000 = $4,000 × [(1 − (1 + IRR)^−3) / IRR]",
          "Annuity factor needed = 2.5",
          "IRR ≈ 9.70%"
        ]
      },
      {
        "id": "cfa-p1-fm-c19",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What is the discount factor for a cash flow received in 4 years at 6%?",
        "options": [
          "0.7921",
          "0.7350",
          "0.8000"
        ],
        "answer": 0,
        "explanation": "DF = 1 / 1.06^4 = 0.7921.",
        "steps": [
          "DF = 1 / (1 + r)^n",
          "DF = 1 / 1.06^4",
          "DF = 1 / 1.262477 = 0.7921"
        ]
      },
      {
        "id": "cfa-p1-fm-c20",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What is the compound factor for 3 years at 5%?",
        "options": [
          "1.2000",
          "1.1576",
          "1.1500"
        ],
        "answer": 1,
        "explanation": "CF = 1.05^3 = 1.157625, or 1.1576.",
        "steps": [
          "CF = (1 + r)^n",
          "CF = 1.05^3",
          "CF = 1.157625"
        ]
      },
      {
        "id": "cfa-p1-fm-c21",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-2",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "The nominal rate is 8% and inflation is 3%. What is the real rate using the Fisher equation?",
        "options": [
          "4.85%",
          "5.00%",
          "5.50%"
        ],
        "answer": 0,
        "explanation": "Real rate = 1.08 / 1.03 − 1 = 4.85%.",
        "steps": [
          "Real rate = (1 + nominal) / (1 + inflation) − 1",
          "Real rate = 1.08 / 1.03 − 1",
          "Real rate = 0.048544 = 4.85%"
        ]
      },
      {
        "id": "cfa-p1-fm-c22",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What is the future value of $10,000 invested for 2 years at a continuously compounded rate of 6%?",
        "options": [
          "$11,274.97",
          "$11,200.00",
          "$11,300.00"
        ],
        "answer": 0,
        "explanation": "FV = $10,000 × e^(0.06 × 2) = $11,274.97.",
        "steps": [
          "FV = PV × e^(r × t)",
          "FV = $10,000 × e^0.12",
          "FV = $10,000 × 1.127497 = $11,274.97"
        ]
      },
      {
        "id": "cfa-p1-fm-c23",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Cash flows are $1,000 in year 1, $2,000 in year 2, and $3,000 in year 3. At a 10% discount rate, what is the present value?",
        "options": [
          "$4,500.00",
          "$5,000.00",
          "$4,815.93"
        ],
        "answer": 2,
        "explanation": "PV = 1,000/1.10 + 2,000/1.10^2 + 3,000/1.10^3 = $4,815.93.",
        "steps": [
          "PV1 = $1,000 / 1.10 = $909.09",
          "PV2 = $2,000 / 1.10^2 = $1,652.89",
          "PV3 = $3,000 / 1.10^3 = $2,253.94",
          "Total PV = $4,815.93"
        ]
      },
      {
        "id": "cfa-p1-fm-c24",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Cash flows are $1,000 in year 1, $2,000 in year 2, and $3,000 in year 3. At 8%, what is the future value at the end of year 3?",
        "options": [
          "$6,326.40",
          "$6,000.00",
          "$6,500.00"
        ],
        "answer": 0,
        "explanation": "FV = $1,000 × 1.08^2 + $2,000 × 1.08 + $3,000 = $6,326.40.",
        "steps": [
          "Year 1 grows for 2 years: $1,000 × 1.08^2 = $1,166.40",
          "Year 2 grows for 1 year: $2,000 × 1.08 = $2,160.00",
          "Year 3 does not grow: $3,000.00",
          "Total FV = $6,326.40"
        ]
      },
      {
        "id": "cfa-p1-fm-c25",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What is the present value of $1,000 paid at the beginning of each year for 3 years at 6%?",
        "options": [
          "$2,673.01",
          "$3,000.00",
          "$2,833.39"
        ],
        "answer": 2,
        "explanation": "The ordinary annuity PV is $2,673.01; multiplying by 1.06 gives $2,833.39.",
        "steps": [
          "Ordinary PV = $1,000 × [(1 − 1.06^−3) / 0.06] = $2,673.01",
          "Annuity due PV = $2,673.01 × 1.06",
          "PV(due) = $2,833.39"
        ]
      },
      {
        "id": "cfa-p1-fm-c26",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A perpetuity pays $100 immediately and continues to pay $100 each year. If the required return is 8%, what is the present value?",
        "options": [
          "$1,250.00",
          "$1,200.00",
          "$1,350.00"
        ],
        "answer": 2,
        "explanation": "PV = $100 + $100/0.08 = $1,350.00.",
        "steps": [
          "PV of future payments = $100 / 0.08 = $1,250.00",
          "Add the immediate payment of $100",
          "PV = $1,350.00"
        ]
      },
      {
        "id": "cfa-p1-fm-c27",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A $100,000 mortgage has a 6% nominal annual rate with monthly payments over 30 years. What is the principal portion of the first monthly payment?",
        "options": [
          "$599.55",
          "$99.55",
          "$500.00"
        ],
        "answer": 1,
        "explanation": "The monthly payment is $599.55. First-month interest is $500.00, so principal is $99.55.",
        "steps": [
          "Monthly rate = 0.06 / 12 = 0.005",
          "PMT = $100,000 / 166.7916 = $599.55",
          "Interest = $100,000 × 0.005 = $500.00",
          "Principal = $599.55 − $500.00 = $99.55"
        ]
      },
      {
        "id": "cfa-p1-fm-c28",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-4",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "A $10,000 loan at 12% is repaid with 5 equal annual payments of $2,774.10. What is the total interest paid over the life of the loan?",
        "options": [
          "$3,870.50",
          "$2,774.10",
          "$4,000.00"
        ],
        "answer": 0,
        "explanation": "Total payments are $2,774.10 × 5 = $13,870.50; interest is $13,870.50 − $10,000 = $3,870.50.",
        "steps": [
          "Total payments = $2,774.10 × 5 = $13,870.50",
          "Total interest = total payments − principal",
          "Total interest = $13,870.50 − $10,000 = $3,870.50"
        ]
      },
      {
        "id": "cfa-p1-fm-c29",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A project costs $50,000 and produces $6,000 per year forever. If the required return is 10%, what is the NPV?",
        "options": [
          "$6,000.00",
          "$60,000.00",
          "$10,000.00"
        ],
        "answer": 2,
        "explanation": "PV of the perpetuity is $60,000; NPV = $60,000 − $50,000 = $10,000.",
        "steps": [
          "PV = $6,000 / 0.10 = $60,000",
          "NPV = $60,000 − $50,000",
          "NPV = $10,000"
        ]
      },
      {
        "id": "cfa-p1-fm-c30",
        "topicId": "finance-math",
        "type": "calculation",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "An investment costs $50,000 and pays $6,000 per year forever. What is the IRR?",
        "options": [
          "12.00%",
          "10.00%",
          "8.00%"
        ],
        "answer": 0,
        "explanation": "IRR = $6,000 / $50,000 = 12.00%.",
        "steps": [
          "For a perpetuity, IRR = annual cash flow / initial cost",
          "IRR = $6,000 / $50,000",
          "IRR = 0.12 = 12.00%"
        ]
      },
      {
        "id": "cfa-p1-fm-a01",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Which offer is better: 8% compounded quarterly or 8.1% compounded annually?",
        "options": [
          "8.1% annually, because 8.1% is higher",
          "They are exactly equal",
          "8% compounded quarterly, because its EAR is about 8.24%"
        ],
        "answer": 2,
        "explanation": "The quarterly option has EAR = (1.02)^4 − 1 = 8.24%, which exceeds 8.1%.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a02",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A bank advertises 6% APR compounded monthly. Which statement best describes the true annual cost?",
        "options": [
          "The true annual cost is exactly 6.00%",
          "The true annual cost is below 6.00%",
          "The EAR is about 6.17%, slightly above the APR"
        ],
        "answer": 2,
        "explanation": "Monthly compounding makes EAR = (1.005)^12 − 1 = 6.17%.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a03",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-2",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "You can take $10,000 today or $11,000 in 2 years. At a 5% discount rate, which should you choose?",
        "options": [
          "It does not matter",
          "Take $10,000 today, because $11,000 in 2 years is worth about $9,977 today",
          "Take $11,000 in 2 years, because it is a larger number"
        ],
        "answer": 1,
        "explanation": "PV = $11,000 / 1.05^2 = $9,977.32, which is less than $10,000.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a04",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A project costs $25,000 and returns $32,000 in 3 years. At an 8% required return, should you accept it?",
        "options": [
          "No, because the return is only 28% of the cost",
          "Yes, because any project with a profit should be accepted",
          "Yes, because the PV of the return is about $25,402, so NPV is positive"
        ],
        "answer": 2,
        "explanation": "PV = $32,000 / 1.08^3 = $25,402.15; NPV = $402.15, so accept.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a05",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Two loans have the same APR and term. One requires monthly payments and the other requires annual payments. Which loan usually has lower total interest?",
        "options": [
          "Both have identical total interest",
          "The monthly-payment loan, because principal is repaid sooner",
          "The annual-payment loan, because there are fewer payments"
        ],
        "answer": 1,
        "explanation": "More frequent payments reduce principal earlier, lowering the average outstanding balance and total interest.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a06",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "Compare a 30-year mortgage at 6% with a 15-year mortgage at 5.5%. Which normally has the higher monthly payment?",
        "options": [
          "They are always equal",
          "The 15-year mortgage",
          "The 30-year mortgage"
        ],
        "answer": 1,
        "explanation": "A shorter amortization requires a larger monthly payment, even at a lower rate.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a07",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-2",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "You want a 4% real return and expect 3% inflation. What nominal return is required by the Fisher equation?",
        "options": [
          "About 7.12%",
          "Exactly 7.00%",
          "About 4.00%"
        ],
        "answer": 0,
        "explanation": "Nominal = (1.04)(1.03) − 1 = 7.12%, not simply 4% + 3%.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a08",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "If the required return on a perpetuity falls, what happens to its present value?",
        "options": [
          "It stays the same",
          "It rises",
          "It falls"
        ],
        "answer": 1,
        "explanation": "PV = PMT / r, so a lower denominator increases the present value.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a09",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "You need $50,000 in 5 years and can save at the same annual rate either monthly or annually. Which plan generally produces a larger future value?",
        "options": [
          "Monthly saving, because interest compounds more often",
          "Annual saving, because each deposit is larger",
          "Both produce the same future value"
        ],
        "answer": 0,
        "explanation": "More frequent compounding and earlier deposits increase the future value.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a10",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-5",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A project has a positive NPV at a 10% required return. What does that imply about its IRR?",
        "options": [
          "The IRR is less than 10%",
          "The IRR is exactly 10%",
          "The IRR is greater than 10%"
        ],
        "answer": 2,
        "explanation": "At a discount rate below the IRR, NPV is positive.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a11",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "An annuity due and an ordinary annuity have the same payment, rate, and number of payments. Which has the higher present value?",
        "options": [
          "The annuity due",
          "The ordinary annuity",
          "They are equal"
        ],
        "answer": 0,
        "explanation": "An annuity due pays earlier, so each cash flow is discounted for less time.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a12",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "In the early years of a level-payment amortizing loan, most of each payment is:",
        "options": [
          "Interest",
          "Principal",
          "A tax payment"
        ],
        "answer": 0,
        "explanation": "The outstanding balance is high early, so interest expense is high and principal repayment is small.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-a13",
        "topicId": "finance-math",
        "type": "application",
        "los": "FM-5",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "If a project's cash inflows are delayed but its cost stays the same, what happens to NPV?",
        "options": [
          "It is unchanged",
          "It falls",
          "It rises"
        ],
        "answer": 1,
        "explanation": "Delayed cash flows are discounted more heavily, reducing present value.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-k01",
        "topicId": "finance-math",
        "type": "conceptual",
        "los": "FM-1",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What is the core idea of the time value of money?",
        "options": [
          "Cash flows at different dates are not directly comparable without adjusting for time",
          "A larger cash flow is always better",
          "Inflation is the only reason to discount cash flows"
        ],
        "answer": 0,
        "explanation": "Money has an opportunity cost, so future cash flows must be discounted or compounded to a common date.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-k02",
        "topicId": "finance-math",
        "type": "conceptual",
        "los": "FM-2",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "In a present value calculation, the discount rate is best described as:",
        "options": [
          "The historical inflation rate",
          "The average coupon rate",
          "The required return or opportunity cost of capital"
        ],
        "answer": 2,
        "explanation": "The discount rate reflects the return available on an investment of similar risk.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-k03",
        "topicId": "finance-math",
        "type": "conceptual",
        "los": "FM-2",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "Opportunity cost of capital is:",
        "options": [
          "The highest possible return in the market",
          "The return available on the next best investment of similar risk",
          "The accounting cost of the project"
        ],
        "answer": 1,
        "explanation": "It is the return forgone by choosing one investment over an alternative with similar risk.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-k04",
        "topicId": "finance-math",
        "type": "conceptual",
        "los": "FM-1",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "Which statement about nominal and real cash flows is correct?",
        "options": [
          "Nominal cash flows include inflation; real cash flows exclude it",
          "Real cash flows include inflation; nominal cash flows exclude it",
          "They are always equal"
        ],
        "answer": 0,
        "explanation": "Nominal amounts reflect actual prices, while real amounts are measured in constant purchasing power.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-k05",
        "topicId": "finance-math",
        "type": "conceptual",
        "los": "FM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "For a given APR, what happens to the EAR as compounding becomes more frequent?",
        "options": [
          "The EAR decreases",
          "The EAR stays exactly the same",
          "The EAR increases"
        ],
        "answer": 2,
        "explanation": "More frequent compounding produces a higher effective annual rate.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-k06",
        "topicId": "finance-math",
        "type": "conceptual",
        "los": "FM-5",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What is the NPV decision rule?",
        "options": [
          "Accept every project with a positive IRR",
          "Accept a project when NPV is greater than zero",
          "Accept a project when NPV is less than zero"
        ],
        "answer": 1,
        "explanation": "A positive NPV means the project is expected to add value after covering the required return.",
        "steps": []
      },
      {
        "id": "cfa-p1-fm-k07",
        "topicId": "finance-math",
        "type": "conceptual",
        "los": "FM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Which is a limitation of IRR?",
        "options": [
          "It can rank projects poorly when scale or timing differs, and non-conventional cash flows can create multiple IRRs",
          "It cannot be calculated with a calculator",
          "It ignores the initial investment"
        ],
        "answer": 0,
        "explanation": "NPV is generally preferred for value creation because it measures the dollar amount added.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-c01",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-2",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What is the future value of $5,000 invested for 3 years at a nominal 12% rate compounded monthly?",
        "options": [
          "$7,000.00",
          "$7,200.00",
          "$7,153.84"
        ],
        "answer": 2,
        "explanation": "FV = $5,000 × (1 + 0.12/12)^(12 × 3) = $7,153.84.",
        "steps": [
          "Periodic rate = 0.12 / 12 = 0.01",
          "Number of periods = 3 × 12 = 36",
          "FV = $5,000 × 1.01^36 = $7,153.84"
        ]
      },
      {
        "id": "cfa-p1-tvm-c02",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-2",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What is the present value of $10,000 received in 4 years at a 9% nominal rate compounded monthly?",
        "options": [
          "$7,100.00",
          "$6,986.14",
          "$7,000.00"
        ],
        "answer": 1,
        "explanation": "PV = $10,000 / (1 + 0.09/12)^(12 × 4) = $6,986.14.",
        "steps": [
          "Periodic rate = 0.09 / 12 = 0.0075",
          "Number of periods = 4 × 12 = 48",
          "PV = $10,000 / 1.0075^48 = $6,986.14"
        ]
      },
      {
        "id": "cfa-p1-tvm-c03",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What is the EAR for an 8% nominal rate compounded semiannually?",
        "options": [
          "8.16%",
          "8.00%",
          "8.24%"
        ],
        "answer": 0,
        "explanation": "EAR = (1 + 0.08/2)^2 − 1 = 8.16%.",
        "steps": [
          "EAR = (1 + r/m)^m − 1",
          "EAR = (1.04)^2 − 1",
          "EAR = 8.16%"
        ]
      },
      {
        "id": "cfa-p1-tvm-c04",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What is the EAR for an 8% nominal rate compounded quarterly?",
        "options": [
          "8.00%",
          "8.24%",
          "8.16%"
        ],
        "answer": 1,
        "explanation": "EAR = (1 + 0.08/4)^4 − 1 = 8.24%.",
        "steps": [
          "EAR = (1 + r/m)^m − 1",
          "EAR = (1.02)^4 − 1",
          "EAR = 8.2432%"
        ]
      },
      {
        "id": "cfa-p1-tvm-c05",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A monthly periodic rate is 1%. What is the nominal APR?",
        "options": [
          "12.00%",
          "12.68%",
          "12.55%"
        ],
        "answer": 0,
        "explanation": "APR = monthly rate × 12 = 1% × 12 = 12.00%.",
        "steps": [
          "APR = periodic rate × periods per year",
          "APR = 0.01 × 12",
          "APR = 12.00%"
        ]
      },
      {
        "id": "cfa-p1-tvm-c06",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A loan has an APR of 12% with monthly compounding. What is the monthly periodic rate?",
        "options": [
          "12.00%",
          "0.50%",
          "1.00%"
        ],
        "answer": 2,
        "explanation": "Monthly rate = APR / 12 = 12% / 12 = 1.00%.",
        "steps": [
          "Periodic rate = APR / m",
          "Periodic rate = 0.12 / 12",
          "Periodic rate = 1.00%"
        ]
      },
      {
        "id": "cfa-p1-tvm-c07",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "A $10,000 loan has a monthly rate of 0.5% and monthly payments of $250. How many months are needed to repay it?",
        "options": [
          "50.00 months",
          "44.74 months",
          "40.00 months"
        ],
        "answer": 1,
        "explanation": "n = −ln(1 − 0.005 × 10,000 / 250) / ln(1.005) = 44.74 months.",
        "steps": [
          "n = −ln(1 − r × PV / PMT) / ln(1 + r)",
          "n = −ln(1 − 0.005 × 10,000 / 250) / ln(1.005)",
          "n = −ln(0.80) / 0.004988 = 44.74"
        ]
      },
      {
        "id": "cfa-p1-tvm-c08",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A $15,000 loan at 6% is repaid with 3 equal annual payments. What is the annual payment?",
        "options": [
          "$5,300.00",
          "$5,611.65",
          "$5,000.00"
        ],
        "answer": 1,
        "explanation": "PMT = $15,000 / 2.673012 = $5,611.65.",
        "steps": [
          "PMT = PV / [(1 − (1 + r)^−n) / r]",
          "PMT = $15,000 / [(1 − 1.06^−3) / 0.06]",
          "PMT = $15,000 / 2.673012 = $5,611.65"
        ]
      },
      {
        "id": "cfa-p1-tvm-c09",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "The $15,000 loan at 6% has annual payments of $5,611.65. What is the balance after 2 payments?",
        "options": [
          "$5,294.01",
          "$5,000.00",
          "$5,611.65"
        ],
        "answer": 0,
        "explanation": "After one payment the balance is $10,288.35; after the second it is $5,294.01.",
        "steps": [
          "Year 1 interest = $15,000 × 0.06 = $900.00",
          "Balance after year 1 = $15,000 × 1.06 − $5,611.65 = $10,288.35",
          "Balance after year 2 = $10,288.35 × 1.06 − $5,611.65 = $5,294.01"
        ]
      },
      {
        "id": "cfa-p1-tvm-c10",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "For the $15,000 loan at 6%, what is the interest portion of the first annual payment?",
        "options": [
          "$900.00",
          "$600.00",
          "$1,000.00"
        ],
        "answer": 0,
        "explanation": "Interest = $15,000 × 6% = $900.00.",
        "steps": [
          "Interest = beginning balance × periodic rate",
          "Interest = $15,000 × 0.06",
          "Interest = $900.00"
        ]
      },
      {
        "id": "cfa-p1-tvm-c11",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "The annual payment on the $15,000 loan is $5,611.65 and first-year interest is $900.00. What is the first-year principal repayment?",
        "options": [
          "$900.00",
          "$4,711.65",
          "$5,611.65"
        ],
        "answer": 1,
        "explanation": "Principal = payment − interest = $5,611.65 − $900.00 = $4,711.65.",
        "steps": [
          "Principal = PMT − interest",
          "Principal = $5,611.65 − $900.00",
          "Principal = $4,711.65"
        ]
      },
      {
        "id": "cfa-p1-tvm-c12",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A $200,000 mortgage has a 6% nominal rate, monthly payments, and a 30-year term. What is the monthly payment?",
        "options": [
          "$1,200.00",
          "$1,100.00",
          "$1,199.10"
        ],
        "answer": 2,
        "explanation": "PMT = $200,000 / 166.7916 = $1,199.10.",
        "steps": [
          "Monthly rate = 0.06 / 12 = 0.005",
          "Number of payments = 30 × 12 = 360",
          "PMT = $200,000 / [(1 − 1.005^−360) / 0.005] = $1,199.10"
        ]
      },
      {
        "id": "cfa-p1-tvm-c13",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "The $200,000 mortgage has monthly payments of $1,199.10 for 360 months. What is the total amount paid?",
        "options": [
          "$431,676.38",
          "$400,000.00",
          "$360,000.00"
        ],
        "answer": 0,
        "explanation": "Total payments = $1,199.10 × 360 = $431,676.38.",
        "steps": [
          "Total payments = monthly payment × number of payments",
          "Total payments = $1,199.10 × 360",
          "Total payments = $431,676.38"
        ]
      },
      {
        "id": "cfa-p1-tvm-c14",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "For the $200,000 mortgage, total payments are $431,676.38. What is total interest?",
        "options": [
          "$250,000.00",
          "$231,676.38",
          "$200,000.00"
        ],
        "answer": 1,
        "explanation": "Total interest = $431,676.38 − $200,000 = $231,676.38.",
        "steps": [
          "Total interest = total payments − principal",
          "Total interest = $431,676.38 − $200,000.00",
          "Total interest = $231,676.38"
        ]
      },
      {
        "id": "cfa-p1-tvm-c15",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What is the monthly payment on a $200,000 mortgage at 6% nominal with monthly payments over 15 years?",
        "options": [
          "$1,199.10",
          "$1,500.00",
          "$1,687.71"
        ],
        "answer": 2,
        "explanation": "PMT = $200,000 / [(1 − 1.005^−180) / 0.005] = $1,687.71.",
        "steps": [
          "Number of payments = 15 × 12 = 180",
          "PMT = $200,000 / 118.5035",
          "PMT = $1,687.71"
        ]
      },
      {
        "id": "cfa-p1-tvm-c16",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Cash flows are $2,000 in year 1, $3,000 in year 2, and $5,000 in year 3. At 8%, what is the present value?",
        "options": [
          "$8,393.03",
          "$8,000.00",
          "$9,000.00"
        ],
        "answer": 0,
        "explanation": "PV = 2,000/1.08 + 3,000/1.08^2 + 5,000/1.08^3 = $8,393.03.",
        "steps": [
          "PV1 = $2,000 / 1.08 = $1,851.85",
          "PV2 = $3,000 / 1.08^2 = $2,572.02",
          "PV3 = $5,000 / 1.08^3 = $3,969.16",
          "Total PV = $8,393.03"
        ]
      },
      {
        "id": "cfa-p1-tvm-c17",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Cash flows are $2,000 in year 1, $3,000 in year 2, and $5,000 in year 3. At 8%, what is the future value at the end of year 3?",
        "options": [
          "$11,000.00",
          "$10,572.80",
          "$10,000.00"
        ],
        "answer": 1,
        "explanation": "FV = $2,000 × 1.08^2 + $3,000 × 1.08 + $5,000 = $10,572.80.",
        "steps": [
          "Year 1 grows for 2 years: $2,000 × 1.08^2 = $2,332.80",
          "Year 2 grows for 1 year: $3,000 × 1.08 = $3,240.00",
          "Year 3 does not grow: $5,000.00",
          "Total FV = $10,572.80"
        ]
      },
      {
        "id": "cfa-p1-tvm-c18",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "A project costs $15,000 and returns $6,000, $7,000, and $5,000 at the end of years 1, 2, and 3. At a 9% required return, what is the NPV?",
        "options": [
          "$1,000.00",
          "$257.26",
          "−$257.26"
        ],
        "answer": 1,
        "explanation": "The PV of inflows is $15,257.26, so NPV = $257.26.",
        "steps": [
          "PV1 = $6,000 / 1.09 = $5,504.59",
          "PV2 = $7,000 / 1.09^2 = $5,891.76",
          "PV3 = $5,000 / 1.09^3 = $3,860.92",
          "NPV = $15,257.26 − $15,000 = $257.26"
        ]
      },
      {
        "id": "cfa-p1-tvm-c19",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "A project costs $10,000 and returns $6,000 at the end of each of the next 2 years. What is its IRR?",
        "options": [
          "12.00%",
          "15.00%",
          "13.07%"
        ],
        "answer": 2,
        "explanation": "Solve $10,000 = $6,000/(1 + IRR) + $6,000/(1 + IRR)^2; IRR is about 13.07%.",
        "steps": [
          "Set NPV = 0",
          "$10,000 = $6,000/(1 + IRR) + $6,000/(1 + IRR)^2",
          "IRR ≈ 13.07%"
        ]
      },
      {
        "id": "cfa-p1-tvm-c20",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A project costs $10,000 and returns $4,000 per year for 3 years. What is the payback period?",
        "options": [
          "2.5 years",
          "2.0 years",
          "3.0 years"
        ],
        "answer": 0,
        "explanation": "Cumulative cash flow reaches $10,000 halfway through year 3.",
        "steps": [
          "After year 1: $4,000",
          "After year 2: $8,000",
          "Remaining $2,000 ÷ $4,000 = 0.5 year",
          "Payback = 2.5 years"
        ]
      },
      {
        "id": "cfa-p1-tvm-c21",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "A project costs $10,000 and returns $5,000 per year for 3 years. At a 10% discount rate, what is the discounted payback period?",
        "options": [
          "2.00 years",
          "2.50 years",
          "2.35 years"
        ],
        "answer": 2,
        "explanation": "Discounted cash flows are $4,545.45, $4,132.23, and $3,756.57. Cumulative PV reaches $10,000 during year 3.",
        "steps": [
          "PV year 1 = $4,545.45; cumulative = $4,545.45",
          "PV year 2 = $4,132.23; cumulative = $8,677.68",
          "Remaining = $1,322.32; year 3 PV = $3,756.57",
          "Fraction = $1,322.32 / $3,756.57 = 0.35",
          "Discounted payback = 2.35 years"
        ]
      },
      {
        "id": "cfa-p1-tvm-c22",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A growing perpetuity pays $2,000 next year. The required return is 9% and growth is 3%. What is the present value?",
        "options": [
          "$22,222.22",
          "$25,000.00",
          "$33,333.33"
        ],
        "answer": 2,
        "explanation": "PV = $2,000 / (0.09 − 0.03) = $33,333.33.",
        "steps": [
          "PV = CF1 / (r − g)",
          "PV = $2,000 / (0.09 − 0.03)",
          "PV = $2,000 / 0.06 = $33,333.33"
        ]
      },
      {
        "id": "cfa-p1-tvm-c23",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-5",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "A growing cash flow starts at $1,000 next year and grows 5% annually for 3 years. At a 10% discount rate, what is the present value?",
        "options": [
          "$2,700.00",
          "$2,605.18",
          "$2,500.00"
        ],
        "answer": 1,
        "explanation": "PV = 1,000/1.10 + 1,050/1.10^2 + 1,102.50/1.10^3 = $2,605.18.",
        "steps": [
          "Year 1: $1,000 / 1.10 = $909.09",
          "Year 2: $1,050 / 1.10^2 = $867.77",
          "Year 3: $1,102.50 / 1.10^3 = $828.32",
          "Total PV = $2,605.18"
        ]
      },
      {
        "id": "cfa-p1-tvm-c24",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "You deposit $500 at the beginning of each month for 12 months at a 6% nominal rate with monthly compounding. What is the future value?",
        "options": [
          "$6,000.00",
          "$6,198.62",
          "$6,167.78"
        ],
        "answer": 1,
        "explanation": "The ordinary annuity FV is $6,167.78; as an annuity due it is $6,198.62.",
        "steps": [
          "Monthly rate = 0.06 / 12 = 0.005",
          "Ordinary FV = $500 × [(1.005^12 − 1) / 0.005] = $6,167.78",
          "Due FV = $6,167.78 × 1.005 = $6,198.62"
        ]
      },
      {
        "id": "cfa-p1-tvm-c25",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "How much must you save at the end of each month to reach $100,000 in 10 years at a 6% nominal rate with monthly compounding?",
        "options": [
          "$610.21",
          "$500.00",
          "$700.00"
        ],
        "answer": 0,
        "explanation": "PMT = $100,000 / 163.8793 = $610.21.",
        "steps": [
          "Monthly rate = 0.005; number of months = 120",
          "FV factor = [(1.005^120 − 1) / 0.005] = 163.8793",
          "PMT = $100,000 / 163.8793 = $610.21"
        ]
      },
      {
        "id": "cfa-p1-tvm-c26",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "How much must you save at the end of each year to reach $100,000 in 10 years at 6%?",
        "options": [
          "$7,586.80",
          "$7,000.00",
          "$8,000.00"
        ],
        "answer": 0,
        "explanation": "PMT = $100,000 / 13.1808 = $7,586.80.",
        "steps": [
          "FV factor = [(1.06^10 − 1) / 0.06] = 13.1808",
          "PMT = $100,000 / 13.1808",
          "PMT = $7,586.80"
        ]
      },
      {
        "id": "cfa-p1-tvm-c27",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "How many years does it take to double at an 8% annual compound rate?",
        "options": [
          "8.00 years",
          "10.00 years",
          "9.01 years"
        ],
        "answer": 2,
        "explanation": "n = ln(2) / ln(1.08) = 9.01 years.",
        "steps": [
          "n = ln(FV / PV) / ln(1 + r)",
          "n = ln(2) / ln(1.08)",
          "n = 0.693147 / 0.076961 = 9.01"
        ]
      },
      {
        "id": "cfa-p1-tvm-c28",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-3",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "How many years does it take to quadruple at a 7% annual compound rate?",
        "options": [
          "10.24 years",
          "14.00 years",
          "20.49 years"
        ],
        "answer": 2,
        "explanation": "n = ln(4) / ln(1.07) = 20.49 years.",
        "steps": [
          "n = ln(FV / PV) / ln(1 + r)",
          "n = ln(4) / ln(1.07)",
          "n = 1.386294 / 0.067659 = 20.49"
        ]
      },
      {
        "id": "cfa-p1-tvm-c29",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-2",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "The nominal rate is 10% and inflation is 4%. What is the real rate using the Fisher equation?",
        "options": [
          "4.00%",
          "5.77%",
          "6.00%"
        ],
        "answer": 1,
        "explanation": "Real rate = 1.10 / 1.04 − 1 = 5.77%.",
        "steps": [
          "Real rate = (1 + nominal) / (1 + inflation) − 1",
          "Real rate = 1.10 / 1.04 − 1",
          "Real rate = 0.057692 = 5.77%"
        ]
      },
      {
        "id": "cfa-p1-tvm-c30",
        "topicId": "quant-tvm",
        "type": "calculation",
        "los": "TVM-4",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "What is the monthly payment on a $100,000 loan at a 5% nominal rate with monthly payments over 10 years?",
        "options": [
          "$1,200.00",
          "$1,060.66",
          "$1,000.00"
        ],
        "answer": 1,
        "explanation": "PMT = $100,000 / 94.279 = $1,060.66.",
        "steps": [
          "Monthly rate = 0.05 / 12 = 0.004167",
          "Number of payments = 120",
          "PMT = $100,000 / [(1 − 1.004167^−120) / 0.004167] = $1,060.66"
        ]
      },
      {
        "id": "cfa-p1-tvm-a01",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "Which loan is cheaper: 12% APR compounded monthly or 12.2% compounded annually?",
        "options": [
          "They cost exactly the same",
          "The 12.2% annual loan, because the monthly loan has an EAR of about 12.68%",
          "The 12% monthly loan, because 12% is lower"
        ],
        "answer": 1,
        "explanation": "The monthly loan's EAR is (1.01)^12 − 1 = 12.68%, which exceeds 12.2%.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a02",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-3",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A credit card charges 1.5% per month with an 18% APR. Which measure best describes the true annual cost?",
        "options": [
          "The 1.5% monthly rate",
          "The EAR of about 19.56%",
          "The 18% APR"
        ],
        "answer": 1,
        "explanation": "EAR = (1.015)^12 − 1 = 19.56%, while the APR simply multiplies 1.5% by 12.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a03",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-3",
        "difficulty": "hard",
        "source": "NeZha original",
        "question": "Which has the higher EAR: 7% compounded annually or 6.8% compounded monthly?",
        "options": [
          "6.8% compounded monthly, with an EAR of about 7.02%",
          "7% compounded annually",
          "They are exactly equal"
        ],
        "answer": 0,
        "explanation": "(1 + 0.068/12)^12 − 1 = 7.02%, slightly above 7%.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a04",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A 15-year mortgage and a 30-year mortgage both charge 6%. Which statement is correct?",
        "options": [
          "The 15-year loan has a higher monthly payment but lower total interest",
          "The 30-year loan has a higher monthly payment",
          "Both have the same total interest"
        ],
        "answer": 0,
        "explanation": "A shorter term requires faster principal repayment, raising the payment but reducing interest over the life of the loan.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a05",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What happens when a borrower makes an extra principal payment early in a loan's life?",
        "options": [
          "Total interest rises because the payment is larger",
          "Nothing changes until the final payment",
          "Total interest falls and the loan may be repaid sooner"
        ],
        "answer": 2,
        "explanation": "Reducing the outstanding balance lowers future interest expense.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a06",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-2",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "If market interest rates rise, what happens to the present value of a fixed annuity?",
        "options": [
          "It increases",
          "It is unaffected",
          "It decreases"
        ],
        "answer": 2,
        "explanation": "Higher discount rates reduce the present value of future fixed cash flows.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a07",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-5",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A project has an IRR of 12% and the required return is 10%. What should you do?",
        "options": [
          "Wait until the IRR equals 10%",
          "Accept it, because the IRR exceeds the required return",
          "Reject it, because the IRR is positive"
        ],
        "answer": 1,
        "explanation": "A project creating value should have an IRR above the required return.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a08",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "A project has a negative NPV when discounted at the required return. What does this imply about its IRR?",
        "options": [
          "The IRR is below the required return",
          "The IRR is above the required return",
          "The IRR must be negative"
        ],
        "answer": 0,
        "explanation": "NPV falls as the discount rate rises; a negative NPV at the required return means IRR is lower.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a09",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-5",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A growing perpetuity and a level perpetuity have the same first payment and required return. Which has the higher present value?",
        "options": [
          "The level perpetuity",
          "They are always equal",
          "The growing perpetuity, as long as growth is positive and below the required return"
        ],
        "answer": 2,
        "explanation": "PV = CF1 / (r − g); a positive g lowers the denominator and raises PV.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a10",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "Which statement correctly distinguishes APR from EAR?",
        "options": [
          "They are always identical",
          "APR ignores intra-year compounding, while EAR reflects it",
          "EAR ignores compounding, while APR reflects it"
        ],
        "answer": 1,
        "explanation": "APR is a nominal annual quote; EAR converts the compounding effect into an annual rate.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a11",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "For the same APR, what happens as compounding frequency increases?",
        "options": [
          "The EAR decreases",
          "The EAR is unchanged",
          "The EAR increases"
        ],
        "answer": 2,
        "explanation": "More frequent compounding means interest is added to principal more often.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-a12",
        "topicId": "quant-tvm",
        "type": "application",
        "los": "TVM-2",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What is the price of a $1,000 zero-coupon bond that matures in 5 years if the annual discount rate is 8%?",
        "options": [
          "$700.00",
          "$750.00",
          "$680.58"
        ],
        "answer": 2,
        "explanation": "Price = $1,000 / 1.08^5 = $680.58.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k01",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-1",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "Which assumption is central to time value of money calculations?",
        "options": [
          "All cash flows are risk-free",
          "Inflation is always zero",
          "A dollar today can be invested and is therefore worth more than a dollar received later"
        ],
        "answer": 2,
        "explanation": "TVM compares cash flows by moving them to a common date using an appropriate rate.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k02",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "When NPV and IRR rank two projects differently, which measure is generally preferred for value creation?",
        "options": [
          "Payback period",
          "NPV",
          "IRR"
        ],
        "answer": 1,
        "explanation": "NPV measures the expected dollar value added and avoids some IRR ranking problems.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k03",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-3",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "What does the effective annual rate (EAR) measure?",
        "options": [
          "The true annual rate after accounting for compounding frequency",
          "The quoted rate before compounding",
          "The average coupon rate"
        ],
        "answer": 0,
        "explanation": "EAR converts a nominal rate with any compounding frequency into an equivalent annual rate.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k04",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "In a standard amortizing loan, how do interest and principal portions change over time?",
        "options": [
          "Both remain constant",
          "Interest falls and principal repayment rises as the balance declines",
          "Interest rises and principal falls"
        ],
        "answer": 1,
        "explanation": "Interest is charged on the outstanding balance, which declines after each payment.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k05",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "Why is an annuity due worth more than an ordinary annuity with the same payment and term?",
        "options": [
          "Each payment arrives one period earlier",
          "It has a higher interest rate",
          "It has more payments"
        ],
        "answer": 0,
        "explanation": "Earlier cash flows are discounted for less time, increasing present value.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k06",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-4",
        "difficulty": "easy",
        "source": "NeZha original",
        "question": "A perpetuity valuation assumes:",
        "options": [
          "The cash flow stops after 10 years",
          "The discount rate is zero",
          "The same cash flow continues forever"
        ],
        "answer": 2,
        "explanation": "PV = PMT / r assumes a perpetual level payment stream.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k07",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-6",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "On a BA II Plus, why must cash outflows and inflows usually have opposite signs?",
        "options": [
          "It changes the compounding frequency",
          "The TVM registers use sign convention to distinguish money paid from money received",
          "The calculator cannot store positive numbers"
        ],
        "answer": 1,
        "explanation": "PV, PMT, and FV must reflect direction: cash received is positive and cash paid is negative in a consistent convention.",
        "steps": []
      },
      {
        "id": "cfa-p1-tvm-k08",
        "topicId": "quant-tvm",
        "type": "conceptual",
        "los": "TVM-5",
        "difficulty": "medium",
        "source": "NeZha original",
        "question": "What reinvestment assumption underlies IRR?",
        "options": [
          "Interim cash flows are held as cash",
          "All cash flows are reinvested at the risk-free rate",
          "Interim cash flows are assumed to be reinvested at the IRR"
        ],
        "answer": 2,
        "explanation": "IRR implicitly assumes reinvestment at the IRR, which may not be realistic.",
        "steps": []
      }
    ],
    "counts": {
      "total": 100,
      "calculation": 60,
      "application": 25,
      "conceptual": 15
    }
  };

  registry.register({
    ...practice,
    id: 'cfa-phase1a-practice',
    phase: '1A',
    kind: 'practice',
    title: 'CFA Practice Phase 1A'
  });

  registry.register({
    id: 'cfa-phase1a-lesson-quizzes',
    phase: '1A',
    kind: 'lesson-quiz',
    title: 'CFA Phase 1A Lesson Quizzes',
    lessonQuizzes: {
    "cfa-fm-1": [
      {
        "id": "q-cfa-fm-1-1",
        "type": "mcq",
        "question": "What is the first step in a TVM problem?",
        "options": [
          "Press the TVM keys",
          "Draw a timeline and classify the cash flows",
          "Assume annual compounding",
          "Ignore the sign convention"
        ],
        "answer": 1,
        "explanation": "A timeline and pattern classification prevent most formula errors."
      },
      {
        "id": "q-cfa-fm-1-2",
        "type": "mcq",
        "question": "Equal monthly payments starting today are best described as:",
        "options": [
          "An ordinary annuity",
          "An annuity due",
          "A perpetuity",
          "An uneven cash flow"
        ],
        "answer": 1,
        "explanation": "The first payment occurs at time 0, so it is an annuity due."
      },
      {
        "id": "q-cfa-fm-1-3",
        "type": "mcq",
        "question": "Which question is a decision-rule question?",
        "options": [
          "What is the present value?",
          "Should the project be accepted?",
          "What is the monthly rate?",
          "How many months are there?"
        ],
        "answer": 1,
        "explanation": "Accept or reject is a decision rule, often based on NPV or IRR."
      }
    ],
    "cfa-fm-2": [
      {
        "id": "q-cfa-fm-2-1",
        "type": "mcq",
        "question": "What is the future value of $1,000 for 2 years at 10%?",
        "options": [
          "$1,100",
          "$1,200",
          "$1,210",
          "$1,220"
        ],
        "answer": 2,
        "explanation": "$1,000 × 1.10^2 = $1,210."
      },
      {
        "id": "q-cfa-fm-2-2",
        "type": "mcq",
        "question": "What happens to present value when the discount rate increases?",
        "options": [
          "It rises",
          "It falls",
          "It stays the same",
          "It becomes negative"
        ],
        "answer": 1,
        "explanation": "A higher discount rate reduces the present value of a future cash flow."
      },
      {
        "id": "q-cfa-fm-2-3",
        "type": "mcq",
        "question": "A monthly rate should be paired with:",
        "options": [
          "The number of years",
          "The number of months",
          "An annual payment",
          "A real rate only"
        ],
        "answer": 1,
        "explanation": "The period count must match the rate frequency."
      }
    ],
    "cfa-fm-3": [
      {
        "id": "q-cfa-fm-3-1",
        "type": "mcq",
        "question": "What is the monthly rate for a 12% APR with monthly compounding?",
        "options": [
          "12%",
          "1%",
          "0.12%",
          "6%"
        ],
        "answer": 1,
        "explanation": "12% / 12 = 1% per month."
      },
      {
        "id": "q-cfa-fm-3-2",
        "type": "mcq",
        "question": "Which rate is highest for the same APR?",
        "options": [
          "Annual compounding",
          "Semiannual compounding",
          "Monthly compounding",
          "Continuous compounding"
        ],
        "answer": 3,
        "explanation": "More frequent compounding increases the effective annual rate."
      },
      {
        "id": "q-cfa-fm-3-3",
        "type": "mcq",
        "question": "What is the EAR of 8% compounded quarterly?",
        "options": [
          "8.00%",
          "8.16%",
          "8.24%",
          "8.30%"
        ],
        "answer": 2,
        "explanation": "(1 + 0.08/4)^4 − 1 = 8.24%."
      }
    ],
    "cfa-fm-4": [
      {
        "id": "q-cfa-fm-4-1",
        "type": "mcq",
        "question": "Which stream is worth more today, all else equal?",
        "options": [
          "An ordinary annuity",
          "An annuity due",
          "They are equal",
          "It depends only on inflation"
        ],
        "answer": 1,
        "explanation": "An annuity due pays earlier, so it has a higher present value."
      },
      {
        "id": "q-cfa-fm-4-2",
        "type": "mcq",
        "question": "What is the future value factor for a 5-year ordinary annuity at 6%?",
        "options": [
          "5.0000",
          "5.6371",
          "6.0000",
          "7.7217"
        ],
        "answer": 1,
        "explanation": "((1.06^5 − 1) / 0.06) = 5.6371."
      },
      {
        "id": "q-cfa-fm-4-3",
        "type": "mcq",
        "question": "A growing perpetuity has CF1 = $200, r = 10%, and g = 4%. What is its PV?",
        "options": [
          "$2,000",
          "$2,500",
          "$3,333",
          "$5,000"
        ],
        "answer": 2,
        "explanation": "$200 / (0.10 − 0.04) = $3,333.33."
      }
    ],
    "cfa-fm-5": [
      {
        "id": "q-cfa-fm-5-1",
        "type": "mcq",
        "question": "A project has NPV of −$50 at the required return. What should you do?",
        "options": [
          "Accept it",
          "Reject it",
          "Accept it if IRR is positive",
          "Increase the initial cost"
        ],
        "answer": 1,
        "explanation": "A negative NPV means the project destroys value at the required return."
      },
      {
        "id": "q-cfa-fm-5-2",
        "type": "mcq",
        "question": "If a project’s IRR is 9% and the required return is 10%, the project:",
        "options": [
          "Has positive NPV",
          "Has negative NPV",
          "Has zero NPV",
          "Cannot be evaluated"
        ],
        "answer": 1,
        "explanation": "IRR below the required return implies negative NPV."
      },
      {
        "id": "q-cfa-fm-5-3",
        "type": "mcq",
        "question": "Which measure is generally preferred when ranking mutually exclusive projects?",
        "options": [
          "Payback period",
          "IRR alone",
          "NPV",
          "Accounting profit"
        ],
        "answer": 2,
        "explanation": "NPV measures the dollar value added and handles scale better."
      }
    ],
    "cfa-fm-6": [
      {
        "id": "q-cfa-fm-6-1",
        "type": "mcq",
        "question": "Which sequence clears the TVM worksheet?",
        "options": [
          "CE/C",
          "2nd CLR TVM",
          "2nd QUIT",
          "2nd ENTER"
        ],
        "answer": 1,
        "explanation": "2nd CLR TVM clears N, I/Y, PV, PMT, and FV."
      },
      {
        "id": "q-cfa-fm-6-2",
        "type": "mcq",
        "question": "For a beginning-of-period payment, the calculator should be in:",
        "options": [
          "END mode",
          "BGN mode",
          "CF mode",
          "STAT mode"
        ],
        "answer": 1,
        "explanation": "BGN mode treats the first payment as occurring immediately."
      },
      {
        "id": "q-cfa-fm-6-3",
        "type": "mcq",
        "question": "What should you check before computing a TVM answer?",
        "options": [
          "Only the interest rate",
          "Rate frequency, payment timing, and signs",
          "The color of the display",
          "The number of decimals only"
        ],
        "answer": 1,
        "explanation": "Frequency, timing, and sign convention are the main sources of silent errors."
      }
    ],
    "cfa-tvm-1": [
      {
        "id": "q-cfa-tvm-1-1",
        "type": "mcq",
        "question": "Which rate excludes inflation?",
        "options": [
          "Nominal rate",
          "Real rate",
          "APR",
          "Coupon rate"
        ],
        "answer": 1,
        "explanation": "The real rate is measured in purchasing-power terms."
      },
      {
        "id": "q-cfa-tvm-1-2",
        "type": "mcq",
        "question": "If nominal is 6% and inflation is 2%, the approximate real rate is:",
        "options": [
          "2%",
          "4%",
          "6%",
          "8%"
        ],
        "answer": 1,
        "explanation": "The exact Fisher rate is about 3.92%, so the approximation 4% is close."
      },
      {
        "id": "q-cfa-tvm-1-3",
        "type": "mcq",
        "question": "A higher-risk project should generally have:",
        "options": [
          "A lower required return",
          "A higher required return",
          "No required return",
          "A zero discount rate"
        ],
        "answer": 1,
        "explanation": "Investors demand more return for more risk."
      }
    ],
    "cfa-tvm-2": [
      {
        "id": "q-cfa-tvm-2-1",
        "type": "mcq",
        "question": "What is the EAR of 12% APR compounded monthly?",
        "options": [
          "12.00%",
          "12.36%",
          "12.68%",
          "13.00%"
        ],
        "answer": 2,
        "explanation": "(1.01)^12 − 1 = 12.68%."
      },
      {
        "id": "q-cfa-tvm-2-2",
        "type": "mcq",
        "question": "Which loan is cheaper if both have the same term?",
        "options": [
          "12% APR monthly",
          "12.2% APR annual",
          "They are equal",
          "Cannot compare"
        ],
        "answer": 1,
        "explanation": "The monthly loan has an EAR of 12.68%, above 12.2%."
      },
      {
        "id": "q-cfa-tvm-2-3",
        "type": "mcq",
        "question": "APR divided by 12 gives the:",
        "options": [
          "Effective annual rate",
          "Monthly periodic rate",
          "Real rate",
          "Continuous rate"
        ],
        "answer": 1,
        "explanation": "For monthly compounding, the periodic rate is APR / 12."
      }
    ],
    "cfa-tvm-3": [
      {
        "id": "q-cfa-tvm-3-1",
        "type": "mcq",
        "question": "For 9% nominal compounded monthly, what is the monthly rate?",
        "options": [
          "0.75%",
          "0.90%",
          "9.00%",
          "1.00%"
        ],
        "answer": 0,
        "explanation": "9% / 12 = 0.75% per month."
      },
      {
        "id": "q-cfa-tvm-3-2",
        "type": "mcq",
        "question": "How many periods are in 5 years with quarterly compounding?",
        "options": [
          "5",
          "10",
          "15",
          "20"
        ],
        "answer": 3,
        "explanation": "5 × 4 = 20 quarters."
      },
      {
        "id": "q-cfa-tvm-3-3",
        "type": "mcq",
        "question": "Which formula applies to continuous compounding?",
        "options": [
          "FV = PV × (1 + r)^t",
          "FV = PV × e^(r × t)",
          "FV = PMT / r",
          "FV = PV / (1 + r)^t"
        ],
        "answer": 1,
        "explanation": "Continuous compounding uses the exponential function."
      }
    ],
    "cfa-tvm-4": [
      {
        "id": "q-cfa-tvm-4-1",
        "type": "mcq",
        "question": "In an amortizing loan, the first payment is mostly:",
        "options": [
          "Principal",
          "Interest",
          "Taxes",
          "Insurance"
        ],
        "answer": 1,
        "explanation": "The beginning balance is highest, so first-period interest is highest."
      },
      {
        "id": "q-cfa-tvm-4-2",
        "type": "mcq",
        "question": "A 6% loan has a beginning balance of $10,000. What is the first month’s interest with monthly payments?",
        "options": [
          "$50",
          "$60",
          "$600",
          "$1,000"
        ],
        "answer": 0,
        "explanation": "$10,000 × 0.06 / 12 = $50."
      },
      {
        "id": "q-cfa-tvm-4-3",
        "type": "mcq",
        "question": "If total payments are $13,870 and principal is $10,000, total interest is:",
        "options": [
          "$3,870",
          "$10,000",
          "$13,870",
          "$23,870"
        ],
        "answer": 0,
        "explanation": "$13,870 − $10,000 = $3,870."
      }
    ],
    "cfa-tvm-5": [
      {
        "id": "q-cfa-tvm-5-1",
        "type": "mcq",
        "question": "Which tool is designed for uneven cash flows on the BA II Plus?",
        "options": [
          "TVM worksheet",
          "CF worksheet",
          "STAT worksheet",
          "BGN mode"
        ],
        "answer": 1,
        "explanation": "The CF worksheet stores CF0, C01, C02, and so on."
      },
      {
        "id": "q-cfa-tvm-5-2",
        "type": "mcq",
        "question": "A project costs $10,000 and returns $4,000 per year for 3 years. What is the payback period?",
        "options": [
          "2.0 years",
          "2.5 years",
          "3.0 years",
          "4.0 years"
        ],
        "answer": 1,
        "explanation": "Cumulative cash flow reaches $10,000 halfway through year 3."
      },
      {
        "id": "q-cfa-tvm-5-3",
        "type": "mcq",
        "question": "If a project has a positive NPV, its IRR is:",
        "options": [
          "Above the required return",
          "Below the required return",
          "Equal to zero",
          "Always negative"
        ],
        "answer": 0,
        "explanation": "A positive NPV means the project earns more than the required return."
      }
    ],
    "cfa-tvm-6": [
      {
        "id": "q-cfa-tvm-6-1",
        "type": "mcq",
        "question": "Which error is most likely if you leave the calculator in BGN mode for an ordinary annuity?",
        "options": [
          "The answer is too low",
          "The answer is too high",
          "The answer is unchanged",
          "The calculator crashes"
        ],
        "answer": 1,
        "explanation": "BGN mode adds one period of compounding, making the result too high."
      },
      {
        "id": "q-cfa-tvm-6-2",
        "type": "mcq",
        "question": "A monthly payment problem requires P/Y equal to:",
        "options": [
          "1",
          "4",
          "12",
          "365"
        ],
        "answer": 2,
        "explanation": "Monthly payments mean 12 payments per year."
      },
      {
        "id": "q-cfa-tvm-6-3",
        "type": "mcq",
        "question": "A project has IRR 14% and required return 12%. The project should be:",
        "options": [
          "Accepted",
          "Rejected",
          "Accepted only if payback is under 1 year",
          "Ignored because IRR is not a dollar amount"
        ],
        "answer": 0,
        "explanation": "IRR exceeds the required return, so the project adds value."
      }
    ]
  }
  });
})();
