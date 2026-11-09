window.NEZHA_CONTENT = (() => {
  const ecba = {
    id: 'ecba',
    trackId: 'ba',
    title: 'ECBA',
    year: 2025,
    targetPercent: 70,
    passNote: 'IIBA does not publish a fixed pass mark. 70% is a practice target, not an official pass score.',
    sections: [
      { id: 'ecba-section-1', title: 'ECBA Exam', minutes: 75 }
    ],
    topics: [
      {
        id: 'ecba-understanding-ba',
        title: 'Understanding Business Analysis',
        sectionId: 'ecba-section-1',
        examCount: 10,
        lessonTitles: ['BA role & value', 'BACCM & core concepts', 'BA Standard & BABOK'],
        facts: [
          { term: 'Business analysis', definition: 'The practice of enabling change in an enterprise by defining needs and recommending solutions that deliver value to stakeholders.' },
          { term: 'BACCM', definition: 'A framework of six core concepts: change, need, solution, stakeholder, value, and context.' },
          { term: 'Business Analysis Standard', definition: 'A foundational IIBA publication describing the business analysis profession, mindset, and practice.' },
          { term: 'BABOK Guide', definition: 'A guide to the business analysis body of knowledge covering knowledge areas, tasks, techniques, and competencies.' },
          { term: 'Business analyst role', definition: 'A change agent who elicits needs, analyzes context, and supports the delivery of valuable solutions.' },
          { term: 'Enterprise', definition: 'A system of interdependent parts that interacts with its environment to achieve a purpose.' },
          { term: 'Stakeholder', definition: 'A person or group with an interest in, or influence on, a change or solution.' },
          { term: 'Value', definition: 'The worth, importance, or usefulness of something to a stakeholder within a context.' },
          { term: 'Solution', definition: 'A set of changes to the enterprise that satisfies one or more needs.' },
          { term: 'Context', definition: 'The circumstances that influence and are influenced by a change.' }
        ]
      },
      {
        id: 'ecba-mindset',
        title: 'Business Analysis Mindset',
        sectionId: 'ecba-section-1',
        examCount: 7,
        lessonTitles: ['Systems & critical thinking', 'Communication & collaboration', 'Agility & ethics'],
        facts: [
          { term: 'Systems thinking', definition: 'Understanding how parts of an enterprise interact and how a change affects the whole system.' },
          { term: 'Critical thinking', definition: 'Objectively evaluating information and assumptions to reach a reasoned judgment.' },
          { term: 'Emotional intelligence', definition: 'Recognizing and managing one’s own emotions and the emotions of others.' },
          { term: 'Communication', definition: 'Exchanging information clearly and appropriately with different stakeholders.' },
          { term: 'Collaboration', definition: 'Working jointly with stakeholders to achieve shared outcomes.' },
          { term: 'Agility', definition: 'Adapting plans and behavior as new information and circumstances emerge.' },
          { term: 'Ethics', definition: 'Acting with integrity, honesty, and professionalism in business analysis work.' }
        ]
      },
      {
        id: 'ecba-implementing',
        title: 'Implementing Business Analysis',
        sectionId: 'ecba-section-1',
        examCount: 3,
        lessonTitles: ['BA approach & plan', 'Governance & performance'],
        facts: [
          { term: 'Business analysis approach', definition: 'The planned way of performing business analysis, including scope, activities, deliverables, and governance.' },
          { term: 'Governance', definition: 'Decision rights, accountability, and oversight for business analysis work.' },
          { term: 'Performance measurement', definition: 'Tracking the progress and quality of business analysis work against the plan.' },
          { term: 'Business analysis plan', definition: 'A document describing how business analysis will be conducted.' }
        ]
      },
      {
        id: 'ecba-change',
        title: 'Change',
        sectionId: 'ecba-section-1',
        examCount: 5,
        lessonTitles: ['Change strategy', 'Current, future & transition'],
        facts: [
          { term: 'Change strategy', definition: 'The approach for moving the enterprise from the current state to the future state.' },
          { term: 'Current state', definition: 'The existing situation, including processes, systems, capabilities, and problems.' },
          { term: 'Future state', definition: 'The desired situation that satisfies the need and delivers value.' },
          { term: 'Change readiness', definition: 'The extent to which stakeholders and the organization are prepared for change.' },
          { term: 'Transition state', definition: 'The temporary condition between the current state and the future state.' }
        ]
      },
      {
        id: 'ecba-need',
        title: 'Need',
        sectionId: 'ecba-section-1',
        examCount: 5,
        lessonTitles: ['Needs & problems', 'Root cause & opportunity', 'Desired outcomes'],
        facts: [
          { term: 'Need', definition: 'A problem or opportunity to be addressed in order to achieve a desired outcome.' },
          { term: 'Problem statement', definition: 'A concise description of the current problem and its impact.' },
          { term: 'Opportunity', definition: 'A favorable circumstance that can be used to create value.' },
          { term: 'Root cause', definition: 'The underlying reason a problem exists, not merely one of its symptoms.' },
          { term: 'Desired outcome', definition: 'The result or benefit the enterprise wants to achieve.' }
        ]
      },
      {
        id: 'ecba-solution',
        title: 'Solution',
        sectionId: 'ecba-section-1',
        examCount: 5,
        lessonTitles: ['Solution options', 'Solution design', 'Evaluation & requirements'],
        facts: [
          { term: 'Solution option', definition: 'A possible way to satisfy a need or achieve a desired outcome.' },
          { term: 'Solution design', definition: 'The specification of how a solution will meet the requirements.' },
          { term: 'Feasibility', definition: 'The extent to which a solution is practical and achievable.' },
          { term: 'Solution evaluation', definition: 'Assessing whether a solution delivers the intended value.' },
          { term: 'Requirement', definition: 'A useful representation of a need or a characteristic of a solution.' }
        ]
      },
      {
        id: 'ecba-stakeholder',
        title: 'Stakeholder',
        sectionId: 'ecba-section-1',
        examCount: 5,
        lessonTitles: ['Stakeholder analysis', 'Engagement & personas', 'Collaboration'],
        facts: [
          { term: 'Stakeholder analysis', definition: 'Identifying stakeholders and assessing their interests, influence, and impact.' },
          { term: 'Stakeholder engagement', definition: 'Planning and carrying out interaction with stakeholders.' },
          { term: 'Stakeholder map', definition: 'A visual representation of stakeholders and their relationships.' },
          { term: 'Persona', definition: 'A representative description of a stakeholder group.' },
          { term: 'Stakeholder collaboration', definition: 'Working with stakeholders to reach shared understanding and commitment.' }
        ]
      },
      {
        id: 'ecba-value',
        title: 'Value',
        sectionId: 'ecba-section-1',
        examCount: 5,
        lessonTitles: ['Value & benefits', 'Measurement & KPIs'],
        facts: [
          { term: 'Value proposition', definition: 'The benefit an enterprise offers to stakeholders.' },
          { term: 'Value realization', definition: 'The achievement of expected benefits from a solution.' },
          { term: 'Benefit', definition: 'A positive outcome that contributes to value.' },
          { term: 'Cost-benefit analysis', definition: 'Comparing the costs and benefits of alternatives.' },
          { term: 'Key performance indicator', definition: 'A measure used to track performance toward objectives.' }
        ]
      },
      {
        id: 'ecba-context',
        title: 'Context',
        sectionId: 'ecba-section-1',
        examCount: 5,
        lessonTitles: ['Organizational context', 'External environment & regulation'],
        facts: [
          { term: 'Organizational context', definition: 'The internal and external factors that shape business analysis work.' },
          { term: 'External environment', definition: 'Factors outside the organization that affect its objectives.' },
          { term: 'Organizational culture', definition: 'The shared values, beliefs, and behaviors in an organization.' },
          { term: 'Regulation', definition: 'Rules imposed by authorities that constrain or guide work.' },
          { term: 'Scope', definition: 'The boundaries of the change or analysis effort.' }
        ]
      },
      {
        id: 'ecba-techniques',
        title: 'BA Techniques',
        sectionId: 'ecba-section-1',
        examCount: 0,
        lessonTitles: ['Elicitation techniques', 'Modeling techniques', 'Analysis techniques', 'Facilitation & SWOT'],
        facts: [
          { term: 'Interview', definition: 'A structured conversation with a stakeholder to elicit information.' },
          { term: 'Workshop', definition: 'A facilitated group session designed to achieve a specific outcome.' },
          { term: 'Observation', definition: 'Watching work being performed in order to understand it.' },
          { term: 'Process model', definition: 'A visual representation of a process and its activities.' },
          { term: 'User story', definition: 'A short description of a user need written from the user’s perspective.' },
          { term: 'SWOT analysis', definition: 'An analysis of strengths, weaknesses, opportunities, and threats.' }
        ]
      },
      {
        id: 'ecba-competencies',
        title: 'Underlying Competencies',
        sectionId: 'ecba-section-1',
        examCount: 0,
        lessonTitles: ['Analytical & business knowledge', 'Tools & professionalism'],
        facts: [
          { term: 'Analytical thinking', definition: 'Breaking down complex information to identify patterns and causes.' },
          { term: 'Business knowledge', definition: 'Understanding the organization, industry, and business environment.' },
          { term: 'Tool proficiency', definition: 'Using tools effectively to support business analysis work.' }
        ]
      },
      {
        id: 'ecba-exam-skills',
        title: 'ECBA Exam Skills',
        sectionId: 'ecba-section-1',
        examCount: 0,
        lessonTitles: ['ECBA scenario strategy'],
        facts: [
          { term: 'Situation-based question', definition: 'A question that asks the candidate to choose the best action in a described scenario.' },
          { term: 'Distractor', definition: 'An incorrect answer option designed to be plausible.' }
        ]
      }
    ]
  };

  const cfa = {
    id: 'cfa',
    trackId: 'cfa',
    title: 'CFA Level I',
    year: 2027,
    targetPercent: 70,
    passNote: 'CFA Institute does not publish a fixed pass mark. 70% is a practice target, not an official pass score.',
    sections: [
      { id: 'cfa-session-1', title: 'Session 1', minutes: 135 },
      { id: 'cfa-session-2', title: 'Session 2', minutes: 135 }
    ],
    topics: [
      {
        id: 'cfa-ethics',
        title: 'Ethical & Professional Standards',
        sectionId: 'cfa-session-1',
        examCount: 21,
        lessonTitles: ['Code & Standards', 'Asset Manager Code & GIPS', 'Conflicts & duties', 'Ethics application'],
        facts: [
          { term: 'Code of Ethics', definition: 'A set of principles that guides professional conduct and protects the integrity of the investment profession.' },
          { term: 'Standards of Professional Conduct', definition: 'Seven standards covering professionalism, integrity of capital markets, duties to clients and employers, analysis, conflicts, and CFA Institute responsibilities.' },
          { term: 'CFA Institute', definition: 'The professional body that administers the CFA Program and enforces the Code and Standards.' },
          { term: 'GIPS', definition: 'Global Investment Performance Standards for fair and comparable presentation of investment performance.' },
          { term: 'Asset Manager Code', definition: 'A voluntary code of conduct for asset managers covering ethical and professional responsibilities.' },
          { term: 'Independence and objectivity', definition: 'Standard I(B), requiring members not to compromise professional judgment.' },
          { term: 'Misrepresentation', definition: 'Standard I(C), prohibiting false or misleading statements.' },
          { term: 'Misconduct', definition: 'Standard I(D), prohibiting conduct that reflects adversely on professional integrity.' },
          { term: 'Material nonpublic information', definition: 'Standard II(A), restricting trading or causing trading on confidential information.' },
          { term: 'Market manipulation', definition: 'Standard II(B), prohibiting practices that distort prices or market activity.' },
          { term: 'Fair dealing', definition: 'Standard III(B), requiring fair treatment of all clients.' },
          { term: 'Suitability', definition: 'Standard III(C), requiring recommendations to be consistent with client objectives and constraints.' },
          { term: 'Performance presentation', definition: 'Standard III(D), requiring fair, accurate, and complete performance reporting.' },
          { term: 'Confidentiality', definition: 'Standard III(E), protecting client information.' },
          { term: 'Loyalty', definition: 'Standard IV(A), requiring members to act in employers’ interests, subject to ethical constraints.' },
          { term: 'Additional compensation', definition: 'Standard IV(B), requiring disclosure and consent for outside compensation.' },
          { term: 'Responsibilities of supervisors', definition: 'Standard IV(C), requiring reasonable supervision of subordinates.' },
          { term: 'Investment analysis', definition: 'Standard V(A), requiring diligence, independence, and thoroughness.' },
          { term: 'Communication with clients', definition: 'Standard V(B), requiring disclosure of relevant information to clients.' },
          { term: 'Record retention', definition: 'Standard V(C), requiring maintenance of appropriate records.' },
          { term: 'Conflicts of interest', definition: 'Standard VI(A), requiring disclosure of conflicts that could impair independence.' }
        ]
      },
      {
        id: 'cfa-quant',
        title: 'Quantitative Methods',
        sectionId: 'cfa-session-1',
        examCount: 21,
        lessonTitles: ['Rates & returns', 'Time value of money', 'Statistics & probability', 'Sampling & hypothesis testing', 'Regression & data science'],
        facts: [
          { term: 'Required rate of return', definition: 'The minimum return an investor requires, equal to a real risk-free rate plus premiums for risk.' },
          { term: 'Nominal risk-free rate', definition: 'The real risk-free rate plus expected inflation.' },
          { term: 'Future value', definition: 'FV = PV × (1 + r)^n for a lump sum.' },
          { term: 'Present value', definition: 'PV = FV / (1 + r)^n for a lump sum.' },
          { term: 'Annuity due', definition: 'A series of equal payments where each payment occurs at the beginning of a period.' },
          { term: 'Ordinary annuity', definition: 'A series of equal payments where each payment occurs at the end of a period.' },
          { term: 'Holding period return', definition: 'HPR = (ending value − beginning value + income) / beginning value.' },
          { term: 'Geometric mean return', definition: 'The compound annual growth rate that links beginning and ending values.' },
          { term: 'Arithmetic mean return', definition: 'The simple average of periodic returns.' },
          { term: 'Money-weighted return', definition: 'The internal rate of return that equates cash inflows and outflows.' },
          { term: 'Standard deviation', definition: 'A measure of dispersion around the mean.' },
          { term: 'Coefficient of variation', definition: 'Standard deviation divided by expected return.' },
          { term: 'Sharpe ratio', definition: 'Excess portfolio return divided by portfolio standard deviation.' },
          { term: 'Covariance', definition: 'A measure of how two variables move together.' },
          { term: 'Correlation', definition: 'Covariance divided by the product of the two standard deviations.' },
          { term: 'Normal distribution', definition: 'A symmetric bell-shaped distribution described by its mean and standard deviation.' },
          { term: 'Sampling error', definition: 'The difference between a sample statistic and the population parameter.' },
          { term: 'Hypothesis test', definition: 'A procedure for deciding whether to reject a null hypothesis.' },
          { term: 'Type I error', definition: 'Rejecting a true null hypothesis.' },
          { term: 'Regression', definition: 'A statistical method for modeling the relationship between a dependent variable and independent variables.' },
          { term: 'R-squared', definition: 'The proportion of variation in the dependent variable explained by the independent variables.' }
        ]
      },
      {
        id: 'cfa-economics',
        title: 'Economics',
        sectionId: 'cfa-session-1',
        examCount: 13,
        lessonTitles: ['Firm & market structures', 'Business cycles', 'Fiscal, monetary & FX'],
        facts: [
          { term: 'Demand', definition: 'The quantity of a good consumers are willing and able to buy at a given price.' },
          { term: 'Supply', definition: 'The quantity of a good producers are willing and able to sell at a given price.' },
          { term: 'Elasticity', definition: 'A measure of the responsiveness of quantity to a change in price or income.' },
          { term: 'Perfect competition', definition: 'A market with many buyers and sellers, homogeneous products, and no pricing power.' },
          { term: 'Monopoly', definition: 'A market with a single seller and high barriers to entry.' },
          { term: 'Oligopoly', definition: 'A market dominated by a few large sellers.' },
          { term: 'GDP', definition: 'The market value of final goods and services produced in a country over a period.' },
          { term: 'Inflation', definition: 'A sustained increase in the general price level.' },
          { term: 'Business cycle', definition: 'Recurring expansion and contraction of economic activity.' },
          { term: 'Fiscal policy', definition: 'Government taxation and spending decisions.' },
          { term: 'Monetary policy', definition: 'Central bank actions affecting the money supply and interest rates.' },
          { term: 'Spot exchange rate', definition: 'The rate for immediate currency exchange.' },
          { term: 'Forward exchange rate', definition: 'The rate agreed today for future currency exchange.' }
        ]
      },
      {
        id: 'cfa-fsa',
        title: 'Financial Statement Analysis',
        sectionId: 'cfa-session-1',
        examCount: 22,
        lessonTitles: ['Statements & framework', 'Ratios & DuPont', 'Inventories & long-lived assets', 'Taxes, leases & quality', 'Cash flow & free cash flow', 'FSA applications'],
        facts: [
          { term: 'Balance sheet', definition: 'A financial statement showing assets, liabilities, and equity at a point in time.' },
          { term: 'Income statement', definition: 'A financial statement showing revenues, expenses, and profit over a period.' },
          { term: 'Cash flow statement', definition: 'A financial statement showing cash inflows and outflows from operating, investing, and financing activities.' },
          { term: 'Current ratio', definition: 'Current assets divided by current liabilities.' },
          { term: 'Quick ratio', definition: 'Cash, marketable securities, and receivables divided by current liabilities.' },
          { term: 'Inventory turnover', definition: 'Cost of goods sold divided by average inventory.' },
          { term: 'Receivables turnover', definition: 'Revenue divided by average receivables.' },
          { term: 'Total asset turnover', definition: 'Revenue divided by average total assets.' },
          { term: 'Debt-to-equity', definition: 'Total debt divided by total equity.' },
          { term: 'Return on assets', definition: 'Net income divided by average total assets.' },
          { term: 'Return on equity', definition: 'Net income divided by average shareholders’ equity.' },
          { term: 'Gross profit margin', definition: 'Gross profit divided by revenue.' },
          { term: 'Operating margin', definition: 'Operating income divided by revenue.' },
          { term: 'Net profit margin', definition: 'Net income divided by revenue.' },
          { term: 'DuPont analysis', definition: 'Decomposes return on equity into margin, turnover, and leverage.' },
          { term: 'LIFO', definition: 'An inventory cost method that assumes the most recent purchases are sold first.' },
          { term: 'FIFO', definition: 'An inventory cost method that assumes the oldest purchases are sold first.' },
          { term: 'Depreciation', definition: 'Systematic allocation of the cost of a long-lived asset over its useful life.' },
          { term: 'Goodwill', definition: 'An intangible asset representing excess purchase price over the fair value of net identifiable assets.' },
          { term: 'Deferred tax liability', definition: 'A tax obligation arising from temporary differences between accounting and taxable income.' },
          { term: 'Operating cash flow', definition: 'Cash generated from normal business operations.' },
          { term: 'Free cash flow', definition: 'Cash available after capital expenditures for distribution to investors or reinvestment.' }
        ]
      },
      {
        id: 'cfa-corporate',
        title: 'Corporate Issuers',
        sectionId: 'cfa-session-1',
        examCount: 13,
        lessonTitles: ['Governance & stakeholders', 'Capital budgeting & WACC', 'Working capital & business models'],
        facts: [
          { term: 'Corporate governance', definition: 'The system of rules and practices by which a company is directed and controlled.' },
          { term: 'Board of directors', definition: 'A body elected by shareholders to oversee management.' },
          { term: 'Agency problem', definition: 'A conflict between the interests of principals and agents.' },
          { term: 'Capital budgeting', definition: 'The process of evaluating long-term investment projects.' },
          { term: 'Net present value', definition: 'The present value of cash inflows minus the present value of cash outflows.' },
          { term: 'Internal rate of return', definition: 'The discount rate that makes net present value equal to zero.' },
          { term: 'Payback period', definition: 'The time required to recover the initial investment.' },
          { term: 'WACC', definition: 'The weighted average cost of capital from debt and equity.' },
          { term: 'Cost of equity', definition: 'The return required by equity investors.' },
          { term: 'Capital structure', definition: 'The mix of debt and equity used to finance a company.' },
          { term: 'Working capital', definition: 'Current assets minus current liabilities.' },
          { term: 'Business model', definition: 'How a company creates, delivers, and captures value.' },
          { term: 'Stakeholder management', definition: 'Balancing the interests of parties affected by the company.' }
        ]
      },
      {
        id: 'cfa-equity',
        title: 'Equity Investments',
        sectionId: 'cfa-session-2',
        examCount: 22,
        lessonTitles: ['Markets & orders', 'Indexes & efficiency', 'Equity valuation', 'Multiples & free cash flow', 'Industry analysis'],
        facts: [
          { term: 'Equity security', definition: 'An ownership interest in a company.' },
          { term: 'Primary market', definition: 'The market where new securities are issued.' },
          { term: 'Secondary market', definition: 'The market where existing securities are traded.' },
          { term: 'Market order', definition: 'An order to buy or sell immediately at the best available price.' },
          { term: 'Limit order', definition: 'An order to buy or sell at a specified price or better.' },
          { term: 'Price index', definition: 'An index weighted by the prices of constituent securities.' },
          { term: 'Market-cap index', definition: 'An index weighted by the market value of constituent securities.' },
          { term: 'Equal-weighted index', definition: 'An index where each constituent has the same weight.' },
          { term: 'Market efficiency', definition: 'The degree to which prices reflect available information.' },
          { term: 'Weak-form efficiency', definition: 'Prices reflect historical price and volume information.' },
          { term: 'Semi-strong efficiency', definition: 'Prices reflect all publicly available information.' },
          { term: 'Strong-form efficiency', definition: 'Prices reflect all public and private information.' },
          { term: 'CAPM', definition: 'Expected return = risk-free rate + beta × market risk premium.' },
          { term: 'Beta', definition: 'A measure of a stock’s sensitivity to market movements.' },
          { term: 'Dividend discount model', definition: 'Values a stock as the present value of expected future dividends.' },
          { term: 'Gordon growth model', definition: 'A dividend discount model with dividends growing at a constant rate.' },
          { term: 'P/E ratio', definition: 'Price per share divided by earnings per share.' },
          { term: 'P/B ratio', definition: 'Price per share divided by book value per share.' },
          { term: 'EV/EBITDA', definition: 'Enterprise value divided by earnings before interest, taxes, depreciation, and amortization.' },
          { term: 'Free cash flow to equity', definition: 'Cash flow available to equity holders after reinvestment and debt service.' },
          { term: 'Industry analysis', definition: 'Assessment of an industry’s structure, competition, and profitability.' },
          { term: 'Porter’s five forces', definition: 'A framework for analyzing industry competition.' }
        ]
      },
      {
        id: 'cfa-fixed-income',
        title: 'Fixed Income',
        sectionId: 'cfa-session-2',
        examCount: 22,
        lessonTitles: ['Bond features & markets', 'Yield measures', 'Duration & convexity', 'Credit & securitization', 'Term structure'],
        facts: [
          { term: 'Bond', definition: 'A debt security that pays interest and repays principal.' },
          { term: 'Coupon', definition: 'The periodic interest payment on a bond.' },
          { term: 'Face value', definition: 'The principal amount repaid at maturity.' },
          { term: 'Yield to maturity', definition: 'The internal rate of return on a bond held to maturity.' },
          { term: 'Current yield', definition: 'Annual coupon payment divided by bond price.' },
          { term: 'Spot rate', definition: 'The yield on a zero-coupon bond for a specific maturity.' },
          { term: 'Forward rate', definition: 'An interest rate agreed today for a future loan.' },
          { term: 'Duration', definition: 'A measure of a bond’s price sensitivity to changes in yield.' },
          { term: 'Modified duration', definition: 'Duration divided by one plus yield per period.' },
          { term: 'Convexity', definition: 'A measure of the curvature of a bond’s price-yield relationship.' },
          { term: 'Credit spread', definition: 'The yield spread over a benchmark for credit risk.' },
          { term: 'Investment grade', definition: 'A bond rated BBB-/Baa3 or higher.' },
          { term: 'High yield', definition: 'A bond rated below investment grade.' },
          { term: 'Securitization', definition: 'Pooling assets and issuing securities backed by their cash flows.' },
          { term: 'Asset-backed security', definition: 'A security backed by a pool of assets.' },
          { term: 'Mortgage-backed security', definition: 'A security backed by mortgage loans.' },
          { term: 'Callable bond', definition: 'A bond the issuer may redeem before maturity.' },
          { term: 'Putable bond', definition: 'A bond the holder may sell back before maturity.' },
          { term: 'Floating-rate bond', definition: 'A bond whose coupon resets with a reference rate.' },
          { term: 'Yield curve', definition: 'A graph of yields across maturities.' },
          { term: 'Inverted yield curve', definition: 'A yield curve where short-term yields exceed long-term yields.' },
          { term: 'Credit rating', definition: 'An assessment of a bond issuer’s creditworthiness.' }
        ]
      },
      {
        id: 'cfa-derivatives',
        title: 'Derivatives',
        sectionId: 'cfa-session-2',
        examCount: 13,
        lessonTitles: ['Forwards & futures', 'Options', 'Swaps & pricing'],
        facts: [
          { term: 'Derivative', definition: 'A financial instrument whose value depends on an underlying asset.' },
          { term: 'Forward contract', definition: 'A customized agreement to trade an asset at a future date and price.' },
          { term: 'Futures contract', definition: 'A standardized exchange-traded forward-like contract.' },
          { term: 'Option', definition: 'A contract giving the buyer a right, but not an obligation, to buy or sell an asset.' },
          { term: 'Call option', definition: 'The right to buy an underlying asset at a specified price.' },
          { term: 'Put option', definition: 'The right to sell an underlying asset at a specified price.' },
          { term: 'Strike price', definition: 'The price at which an option can be exercised.' },
          { term: 'Premium', definition: 'The price paid by the option buyer to the seller.' },
          { term: 'Swap', definition: 'An agreement to exchange cash flows or assets.' },
          { term: 'Interest rate swap', definition: 'A swap exchanging fixed and floating interest payments.' },
          { term: 'Put-call parity', definition: 'A relationship linking call, put, underlying, and risk-free bond prices.' },
          { term: 'Binomial model', definition: 'A pricing model using up and down states for the underlying asset.' },
          { term: 'Risk neutrality', definition: 'A pricing assumption where expected returns equal the risk-free rate.' }
        ]
      },
      {
        id: 'cfa-alternatives',
        title: 'Alternative Investments',
        sectionId: 'cfa-session-2',
        examCount: 13,
        lessonTitles: ['Features & structures', 'Private markets & real assets', 'Hedge funds & digital assets'],
        facts: [
          { term: 'Alternative investment', definition: 'An investment outside traditional stocks, bonds, and cash.' },
          { term: 'Hedge fund', definition: 'A private pooled investment vehicle using flexible strategies.' },
          { term: 'Private equity', definition: 'Equity investment in private companies or buyouts.' },
          { term: 'Venture capital', definition: 'Private equity financing for early-stage companies.' },
          { term: 'Real estate', definition: 'Property investments such as residential, commercial, or industrial assets.' },
          { term: 'Infrastructure', definition: 'Long-lived public assets such as roads, utilities, and airports.' },
          { term: 'Commodity', definition: 'A physical good traded in markets, such as oil or gold.' },
          { term: 'Digital asset', definition: 'A digital representation of value, including cryptocurrencies.' },
          { term: 'Due diligence', definition: 'Investigation of an investment before committing capital.' },
          { term: 'Illiquidity premium', definition: 'Extra return required for holding illiquid assets.' },
          { term: 'Leverage', definition: 'Using borrowed funds to increase investment exposure.' },
          { term: 'Management fee', definition: 'A periodic fee charged by an investment manager.' },
          { term: 'Carried interest', definition: 'A share of profits paid to private fund managers.' }
        ]
      },
      {
        id: 'cfa-portfolio',
        title: 'Portfolio Management',
        sectionId: 'cfa-session-2',
        examCount: 20,
        lessonTitles: ['Risk & return', 'CAPM & performance', 'Planning & IPS', 'Allocation & attribution'],
        facts: [
          { term: 'Portfolio', definition: 'A collection of investments held by an investor.' },
          { term: 'Expected return', definition: 'The probability-weighted average of possible returns.' },
          { term: 'Portfolio variance', definition: 'A measure of dispersion of portfolio returns.' },
          { term: 'Diversification', definition: 'Combining assets to reduce unsystematic risk.' },
          { term: 'Unsystematic risk', definition: 'Firm-specific risk that can be diversified away.' },
          { term: 'Systematic risk', definition: 'Market risk that cannot be diversified away.' },
          { term: 'Efficient frontier', definition: 'The set of portfolios offering the highest expected return for each level of risk.' },
          { term: 'Capital allocation line', definition: 'A line showing risk-return combinations of a risky portfolio and the risk-free asset.' },
          { term: 'Capital market line', definition: 'The capital allocation line using the market portfolio.' },
          { term: 'Portfolio beta', definition: 'A measure of systematic risk relative to the market.' },
          { term: 'CAPM', definition: 'Expected return = risk-free rate + beta × market risk premium.' },
          { term: 'Sharpe ratio', definition: 'Excess return divided by standard deviation.' },
          { term: 'Treynor ratio', definition: 'Excess return divided by beta.' },
          { term: 'Jensen’s alpha', definition: 'Actual return minus the CAPM-required return.' },
          { term: 'Investment policy statement', definition: 'A document stating objectives, constraints, and guidelines.' },
          { term: 'Risk tolerance', definition: 'The degree of risk an investor is willing and able to accept.' },
          { term: 'Asset allocation', definition: 'The distribution of portfolio assets across asset classes.' },
          { term: 'Rebalancing', definition: 'Adjusting portfolio weights back to target.' },
          { term: 'Performance attribution', definition: 'Explaining performance relative to a benchmark.' },
          { term: 'Benchmark', definition: 'A reference portfolio used to evaluate performance.' }
        ]
      },
      {
        id: 'cfa-exam-skills',
        title: 'CFA Exam Skills',
        sectionId: 'cfa-session-2',
        examCount: 0,
        lessonTitles: ['CFA exam strategy'],
        facts: [
          { term: 'Session pacing', definition: 'Allocating about 90 seconds per question across a 90-question session.' },
          { term: 'Three-option item', definition: 'A CFA Level I multiple-choice question with one best answer and two distractors.' }
        ]
      }
    ]
  };

  return { ecba, cfa };
})();
