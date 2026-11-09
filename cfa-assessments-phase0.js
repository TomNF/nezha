(function () {
  'use strict';

  const registry = window.NEZHA_CFA_ASSESSMENTS;
  if (!registry) return;

  registry.register({
    id: 'cfa-phase0-diagnostic',
    version: '2027.phase0',
    phase: '0',
    kind: 'diagnostic',
    title: 'CFA Diagnostic Phase 0',
    estimatedMinutes: 35,
    totalQuestions: 40,
    sections: [
    {
      "id": "foundations",
      "title": "Foundations",
      "description": "Finance math, accounting, statistics, economics, and calculator basics.",
      "questions": [
        {
          "id": "cfa-diag-found-1",
          "topicId": "foundations",
          "question": "You invest $1,000 at 5% for one year. What is the future value?",
          "options": [
            "$1,050",
            "$1,005",
            "$1,500"
          ],
          "answer": 0,
          "explanation": "$1,000 × 1.05 = $1,050."
        },
        {
          "id": "cfa-diag-found-2",
          "topicId": "foundations",
          "question": "Which equation is the accounting equation?",
          "options": [
            "Assets = Revenue − Expenses",
            "Assets = Liabilities + Equity",
            "Equity = Assets + Liabilities"
          ],
          "answer": 1,
          "explanation": "The balance sheet identity is Assets = Liabilities + Equity."
        },
        {
          "id": "cfa-diag-found-3",
          "topicId": "foundations",
          "question": "Standard deviation is most commonly used to measure:",
          "options": [
            "Average tax rate",
            "Coupon frequency",
            "Dispersion of returns around the mean"
          ],
          "answer": 2,
          "explanation": "Standard deviation measures the dispersion or volatility of returns."
        },
        {
          "id": "cfa-diag-found-4",
          "topicId": "foundations",
          "question": "Opportunity cost is best described as:",
          "options": [
            "Value of the next best alternative forgone",
            "Total accounting cost",
            "Market price of the chosen option"
          ],
          "answer": 0,
          "explanation": "Opportunity cost is the value of the next best alternative you give up."
        },
        {
          "id": "cfa-diag-found-5",
          "topicId": "foundations",
          "question": "On a BA II Plus, which key is used for present value in the TVM worksheet?",
          "options": [
            "FV",
            "PV",
            "PMT"
          ],
          "answer": 1,
          "explanation": "PV is the present value key; FV is future value and PMT is payment."
        },
        {
          "id": "cfa-diag-found-6",
          "topicId": "foundations",
          "question": "Diversification primarily reduces:",
          "options": [
            "Systematic risk",
            "Inflation risk",
            "Unsystematic risk"
          ],
          "answer": 2,
          "explanation": "Diversification reduces unsystematic risk, not systematic market risk."
        },
        {
          "id": "cfa-diag-found-7",
          "topicId": "foundations",
          "question": "Under accrual accounting, revenue is generally recognized when:",
          "options": [
            "The obligation is satisfied and revenue is earned",
            "Only when cash is received",
            "Only when the invoice is printed"
          ],
          "answer": 0,
          "explanation": "Accrual accounting recognizes revenue when earned, not necessarily when cash is received."
        },
        {
          "id": "cfa-diag-found-8",
          "topicId": "foundations",
          "question": "The correlation coefficient ranges from:",
          "options": [
            "0 to +1",
            "−1 to +1",
            "−100 to +100"
          ],
          "answer": 1,
          "explanation": "Correlation ranges from −1 to +1."
        },
        {
          "id": "cfa-diag-found-9",
          "topicId": "foundations",
          "question": "Inflation is best described as:",
          "options": [
            "A one-time increase in one product price",
            "A decrease in the money supply",
            "A sustained increase in the general price level"
          ],
          "answer": 2,
          "explanation": "Inflation is a sustained increase in the general price level."
        },
        {
          "id": "cfa-diag-found-10",
          "topicId": "foundations",
          "question": "Which BA II Plus sequence clears the TVM worksheet?",
          "options": [
            "2nd CLR TVM",
            "2nd QUIT",
            "2nd ENTER"
          ],
          "answer": 0,
          "explanation": "2nd CLR TVM clears the time-value-of-money registers."
        }
      ]
    },
    {
      "id": "ethics",
      "title": "Ethics",
      "description": "Code and Standards, professionalism, integrity of capital markets.",
      "questions": [
        {
          "id": "cfa-diag-ethics-1",
          "topicId": "ethics",
          "question": "The CFA Institute Code and Standards apply primarily to:",
          "options": [
            "All retail investors",
            "Members and candidates",
            "Only portfolio managers"
          ],
          "answer": 1,
          "explanation": "The Code and Standards apply to CFA Institute members and candidates."
        },
        {
          "id": "cfa-diag-ethics-2",
          "topicId": "ethics",
          "question": "Under the Standards, misrepresentation includes:",
          "options": [
            "Using a benchmark",
            "Citing a source",
            "Omitting material facts"
          ],
          "answer": 2,
          "explanation": "Misrepresentation includes false statements and omissions of material facts."
        },
        {
          "id": "cfa-diag-ethics-3",
          "topicId": "ethics",
          "question": "When client and employer interests conflict, a member should generally:",
          "options": [
            "Place client interests first",
            "Place employer interests first",
            "Avoid all client contact"
          ],
          "answer": 0,
          "explanation": "Standard III(A) requires loyalty, prudence, and care toward clients."
        }
      ]
    },
    {
      "id": "quant",
      "title": "Quantitative Methods",
      "description": "TVM, statistics, probability, and return concepts.",
      "questions": [
        {
          "id": "cfa-diag-quant-1",
          "topicId": "quant",
          "question": "If interest compounds more than once per year, the effective annual rate is:",
          "options": [
            "Equal to APR",
            "Greater than APR",
            "Less than APR"
          ],
          "answer": 1,
          "explanation": "More frequent compounding makes EAR greater than the stated APR."
        },
        {
          "id": "cfa-diag-quant-2",
          "topicId": "quant",
          "question": "Compared with the mean, the median is generally:",
          "options": [
            "Less affected by extreme outliers",
            "More affected by extreme outliers",
            "Always equal to the mode"
          ],
          "answer": 0,
          "explanation": "The median is resistant to extreme outliers."
        },
        {
          "id": "cfa-diag-quant-3",
          "topicId": "quant",
          "question": "A project with a positive net present value should generally be:",
          "options": [
            "Rejected",
            "Ignored",
            "Accepted"
          ],
          "answer": 2,
          "explanation": "A positive NPV adds value and is generally accepted."
        }
      ]
    },
    {
      "id": "economics",
      "title": "Economics",
      "description": "Microeconomics, macroeconomics, and market structures.",
      "questions": [
        {
          "id": "cfa-diag-economics-1",
          "topicId": "economics",
          "question": "A normal demand curve slopes:",
          "options": [
            "Upward",
            "Downward",
            "Vertically"
          ],
          "answer": 1,
          "explanation": "Quantity demanded generally falls as price rises, so the demand curve slopes downward."
        },
        {
          "id": "cfa-diag-economics-2",
          "topicId": "economics",
          "question": "GDP measures:",
          "options": [
            "Market value of final goods and services produced domestically in a period",
            "Total government spending only",
            "The money supply"
          ],
          "answer": 0,
          "explanation": "GDP is the market value of final goods and services produced domestically in a period."
        },
        {
          "id": "cfa-diag-economics-3",
          "topicId": "economics",
          "question": "A central bank raising policy rates is most likely trying to:",
          "options": [
            "Increase inflation immediately",
            "Eliminate unemployment",
            "Reduce inflation pressure"
          ],
          "answer": 2,
          "explanation": "Higher policy rates generally cool demand and reduce inflation pressure."
        }
      ]
    },
    {
      "id": "fsa",
      "title": "Financial Statement Analysis",
      "description": "Statements, ratios, accruals, and quality of earnings.",
      "questions": [
        {
          "id": "cfa-diag-fsa-1",
          "topicId": "fsa",
          "question": "Which statement shows financial position at a point in time?",
          "options": [
            "Income statement",
            "Statement of cash flows",
            "Balance sheet"
          ],
          "answer": 2,
          "explanation": "The balance sheet reports assets, liabilities, and equity at a point in time."
        },
        {
          "id": "cfa-diag-fsa-2",
          "topicId": "fsa",
          "question": "Gross profit equals:",
          "options": [
            "Revenue − operating expenses",
            "Revenue − cost of goods sold",
            "Net income + dividends"
          ],
          "answer": 1,
          "explanation": "Gross profit is revenue minus cost of goods sold."
        },
        {
          "id": "cfa-diag-fsa-3",
          "topicId": "fsa",
          "question": "When converting net income to operating cash flow, non-cash expenses are generally:",
          "options": [
            "Added back",
            "Subtracted",
            "Ignored"
          ],
          "answer": 0,
          "explanation": "Non-cash expenses such as depreciation are added back to net income."
        }
      ]
    },
    {
      "id": "corporate",
      "title": "Corporate Issuers",
      "description": "Capital structure, cost of capital, and governance.",
      "questions": [
        {
          "id": "cfa-diag-corporate-1",
          "topicId": "corporate",
          "question": "When NPV and IRR rank projects differently, the preferred method is usually:",
          "options": [
            "IRR",
            "Payback period",
            "NPV"
          ],
          "answer": 2,
          "explanation": "NPV is generally preferred because it measures value added directly."
        },
        {
          "id": "cfa-diag-corporate-2",
          "topicId": "corporate",
          "question": "WACC represents:",
          "options": [
            "Weighted average cost of debt and equity capital",
            "The coupon rate on all bonds",
            "The risk-free rate only"
          ],
          "answer": 0,
          "explanation": "WACC is the weighted average cost of the firm’s debt and equity capital."
        },
        {
          "id": "cfa-diag-corporate-3",
          "topicId": "corporate",
          "question": "An agency problem arises when:",
          "options": [
            "A company issues new shares",
            "Managers’ interests conflict with shareholders’ interests",
            "A bond matures"
          ],
          "answer": 1,
          "explanation": "Agency problems arise from conflicts between managers and shareholders."
        }
      ]
    },
    {
      "id": "equity",
      "title": "Equity Investments",
      "description": "Valuation, market structure, and industry analysis.",
      "questions": [
        {
          "id": "cfa-diag-equity-1",
          "topicId": "equity",
          "question": "Market capitalization equals:",
          "options": [
            "Revenue × net margin",
            "Dividends ÷ share price",
            "Share price × shares outstanding"
          ],
          "answer": 2,
          "explanation": "Market capitalization is share price multiplied by shares outstanding."
        },
        {
          "id": "cfa-diag-equity-2",
          "topicId": "equity",
          "question": "A P/E ratio of 20 most directly means:",
          "options": [
            "Price is 20 times earnings per share",
            "Dividend yield is 20%",
            "Debt is 20 times equity"
          ],
          "answer": 0,
          "explanation": "P/E is price divided by earnings per share."
        },
        {
          "id": "cfa-diag-equity-3",
          "topicId": "equity",
          "question": "A dividend discount model values a stock as:",
          "options": [
            "Book value of equity",
            "Present value of expected future dividends",
            "Sum of past dividends"
          ],
          "answer": 1,
          "explanation": "The DDM values a stock as the present value of expected future dividends."
        }
      ]
    },
    {
      "id": "fixed-income",
      "title": "Fixed Income",
      "description": "Bond pricing, yield, duration, and credit risk.",
      "questions": [
        {
          "id": "cfa-diag-fi-1",
          "topicId": "fixed-income",
          "question": "Bond prices and yields generally have:",
          "options": [
            "An inverse relationship",
            "A direct relationship",
            "No relationship"
          ],
          "answer": 0,
          "explanation": "When yields rise, bond prices generally fall, and vice versa."
        },
        {
          "id": "cfa-diag-fi-2",
          "topicId": "fixed-income",
          "question": "Duration measures a bond’s:",
          "options": [
            "Credit rating",
            "Coupon payment date",
            "Sensitivity to changes in yield"
          ],
          "answer": 2,
          "explanation": "Duration measures price sensitivity to changes in yield."
        },
        {
          "id": "cfa-diag-fi-3",
          "topicId": "fixed-income",
          "question": "If a bond trades above par, its yield to maturity is:",
          "options": [
            "Above the coupon rate",
            "Below the coupon rate",
            "Equal to the coupon rate"
          ],
          "answer": 1,
          "explanation": "A premium bond has a yield to maturity below its coupon rate."
        }
      ]
    },
    {
      "id": "derivatives",
      "title": "Derivatives",
      "description": "Forwards, futures, options, and swaps.",
      "questions": [
        {
          "id": "cfa-diag-derivatives-1",
          "topicId": "derivatives",
          "question": "A call option gives the holder the right to:",
          "options": [
            "Sell the underlying at the strike price",
            "Receive a fixed dividend",
            "Buy the underlying at the strike price"
          ],
          "answer": 2,
          "explanation": "A call gives the holder the right to buy the underlying at the strike price."
        },
        {
          "id": "cfa-diag-derivatives-2",
          "topicId": "derivatives",
          "question": "Compared with forwards, futures are generally:",
          "options": [
            "Standardized and exchange-traded",
            "Customized and OTC-only",
            "Always free of margin"
          ],
          "answer": 0,
          "explanation": "Futures are standardized and exchange-traded; forwards are customized and OTC."
        },
        {
          "id": "cfa-diag-derivatives-3",
          "topicId": "derivatives",
          "question": "The option premium is:",
          "options": [
            "The strike price",
            "The price paid for the option",
            "The underlying price"
          ],
          "answer": 1,
          "explanation": "The premium is the price paid by the option buyer to the seller."
        }
      ]
    },
    {
      "id": "alternatives",
      "title": "Alternative Investments",
      "description": "Hedge funds, private equity, real estate, and commodities.",
      "questions": [
        {
          "id": "cfa-diag-alternatives-1",
          "topicId": "alternatives",
          "question": "Hedge funds typically charge:",
          "options": [
            "Only a front-end load",
            "Management fee plus performance fee",
            "Only a government fee"
          ],
          "answer": 1,
          "explanation": "Hedge funds commonly charge both management and performance fees."
        },
        {
          "id": "cfa-diag-alternatives-2",
          "topicId": "alternatives",
          "question": "Private equity investments are generally:",
          "options": [
            "Illiquid",
            "Highly liquid",
            "Risk-free"
          ],
          "answer": 0,
          "explanation": "Private equity is generally illiquid and long-term in nature."
        },
        {
          "id": "cfa-diag-alternatives-3",
          "topicId": "alternatives",
          "question": "Compared with direct real estate, REITs generally offer:",
          "options": [
            "No market risk",
            "Guaranteed returns",
            "Greater liquidity"
          ],
          "answer": 2,
          "explanation": "REITs are exchange-traded and generally more liquid than direct real estate."
        }
      ]
    },
    {
      "id": "portfolio",
      "title": "Portfolio Management",
      "description": "Risk, return, diversification, and portfolio construction.",
      "questions": [
        {
          "id": "cfa-diag-portfolio-1",
          "topicId": "portfolio",
          "question": "Diversification benefits are strongest when correlations are:",
          "options": [
            "Exactly +1",
            "Below +1",
            "Above +1"
          ],
          "answer": 1,
          "explanation": "Lower correlations provide greater diversification benefits."
        },
        {
          "id": "cfa-diag-portfolio-2",
          "topicId": "portfolio",
          "question": "Beta measures:",
          "options": [
            "Unsystematic risk",
            "Liquidity risk",
            "Systematic risk"
          ],
          "answer": 2,
          "explanation": "Beta measures a security’s sensitivity to systematic market risk."
        },
        {
          "id": "cfa-diag-portfolio-3",
          "topicId": "portfolio",
          "question": "The Sharpe ratio measures:",
          "options": [
            "Excess return per unit of volatility",
            "Return per unit of book value",
            "Dividend per share"
          ],
          "answer": 0,
          "explanation": "The Sharpe ratio is excess return divided by volatility."
        }
      ]
    }
  ]
  });
})();
