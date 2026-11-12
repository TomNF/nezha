window.NEZHA_CONTENT = window.NEZHA_CONTENT || {};
window.NEZHA_CONTENT.securities = {
  id: 'securities',
  trackId: 'securities',
  title: 'Securities Theory (SRTC)',
  year: 2026,
  targetPercent: 70,
  passNote: 'This is an unofficial English-language practice course for the public SRTC basic securities program. It is not the official SRTC exam, is not affiliated with SRTC or UBCKNN, and does not guarantee a pass. 70% is a practice target only.',
  sections: [
    { id: 'securities-section-1', title: 'SRTC Practice Mock', minutes: 60 }
  ],
  topics: [
    {
      id: 'securities-market-overview',
      title: 'Market Overview',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['Market structure & participants', 'Liquidity, indices & market quality'],
      facts: [
        { term: 'Primary market', definition: 'The market where new securities are issued and sold by an issuer to investors for the first time.' },
        { term: 'Secondary market', definition: 'The market where securities that were already issued are bought and sold among investors.' },
        { term: 'Organized exchange', definition: 'A centralized trading venue with standardized rules, listing requirements, and transparent price discovery.' },
        { term: 'Over-the-counter (OTC) market', definition: 'A decentralized market where dealers negotiate trades directly, often for less standardized instruments.' },
        { term: 'Market participant', definition: 'An entity such as an issuer, investor, broker, dealer, fund, or regulator that takes part in securities activity.' },
        { term: 'Institutional investor', definition: 'A professional investor such as a fund, insurer, or pension body that usually trades in large volumes.' },
        { term: 'Retail investor', definition: 'An individual investor who trades personal funds, usually in smaller amounts.' },
        { term: 'Liquidity', definition: 'The ease of buying or selling an asset quickly without causing a significant change in its price.' },
        { term: 'Market index', definition: 'A statistical measure that tracks the performance of a defined group of securities.' },
        { term: 'Market quality', definition: 'The degree to which a market provides fair pricing, sufficient liquidity, transparency, and low transaction costs.' }
      ]
    },
    {
      id: 'securities-instruments',
      title: 'Financial Instruments',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['Equity, bonds & fund certificates', 'Derivatives, ETFs & risk-return'],
      facts: [
        { term: 'Equity security', definition: 'An ownership interest in a company that may provide dividends and voting rights.' },
        { term: 'Common share', definition: 'Equity that typically carries voting rights and a residual claim on earnings and assets.' },
        { term: 'Preferred share', definition: 'Equity with priority over common shares for dividends and liquidation, often with limited voting rights.' },
        { term: 'Bond', definition: 'A debt security in which the issuer borrows principal and promises periodic interest and repayment.' },
        { term: 'Coupon rate', definition: 'The annual interest paid on a bond, expressed as a percentage of its face value.' },
        { term: 'Fund certificate', definition: 'A unit that represents an investor\'s ownership share in a collective investment fund.' },
        { term: 'Derivative', definition: 'A financial contract whose value depends on an underlying asset, interest rate, or index.' },
        { term: 'Exchange-traded fund (ETF)', definition: 'A fund listed and traded on an exchange, usually designed to track an index or a defined basket.' },
        { term: 'Risk-return trade-off', definition: 'The principle that a higher expected return generally requires accepting a higher level of risk.' },
        { term: 'Diversification', definition: 'Spreading investments across assets or sectors to reduce unsystematic risk.' }
      ]
    },
    {
      id: 'securities-primary-market',
      title: 'Primary Market',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['IPO, issuance & underwriting', 'Prospectus, pricing & allocation'],
      facts: [
        { term: 'Initial public offering (IPO)', definition: 'The first sale of shares by a company to the public.' },
        { term: 'Seasoned equity offering', definition: 'A sale of additional shares by a company that is already listed.' },
        { term: 'Private placement', definition: 'A sale of securities to a limited number of qualified investors without a public offering.' },
        { term: 'Underwriting', definition: 'The process in which a securities firm helps an issuer raise capital and often manages the placement risk.' },
        { term: 'Firm commitment underwriting', definition: 'An arrangement in which the underwriter buys the securities from the issuer and bears the risk of selling them.' },
        { term: 'Best efforts underwriting', definition: 'An arrangement in which the underwriter sells as much as possible but does not guarantee the full amount.' },
        { term: 'Prospectus', definition: 'A disclosure document describing the issuer, the securities, the risks, and the use of proceeds.' },
        { term: 'Book building', definition: 'The process of collecting investor demand to help determine the offering price.' },
        { term: 'Allocation', definition: 'The distribution of offered securities among investors after the offering is priced.' },
        { term: 'Use of proceeds', definition: 'The planned use of money raised in an offering, as disclosed to investors.' }
      ]
    },
    {
      id: 'securities-secondary-market',
      title: 'Secondary Market',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['Order types, matching & sessions', 'Price limits, margin & settlement'],
      facts: [
        { term: 'Market order', definition: 'An instruction to trade immediately at the best available price.' },
        { term: 'Limit order', definition: 'An instruction to buy no higher, or sell no lower, than a specified price.' },
        { term: 'Stop order', definition: 'An order that becomes a market order once a specified trigger price is reached.' },
        { term: 'Continuous trading', definition: 'A market session in which orders are matched continuously as they arrive.' },
        { term: 'Call auction', definition: 'A market session that collects orders and matches them at a single clearing price.' },
        { term: 'Price limit', definition: 'The maximum daily price movement allowed for a security, usually measured from a reference price.' },
        { term: 'Margin trading', definition: 'Buying securities with borrowed funds, using collateral and subject to maintenance requirements.' },
        { term: 'Short selling', definition: 'Selling borrowed securities in the hope of buying them back later at a lower price.' },
        { term: 'Settlement', definition: 'The process of transferring cash and securities to complete a trade.' },
        { term: 'Odd lot', definition: 'An order size below the standard trading unit for a security.' }
      ]
    },
    {
      id: 'securities-firms',
      title: 'Securities Firms',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['Brokerage, proprietary trading & underwriting', 'Advisory, controls & conflicts'],
      facts: [
        { term: 'Securities firm', definition: 'A licensed entity that provides services such as brokerage, dealing, underwriting, advisory, or related securities operations.' },
        { term: 'Securities brokerage', definition: 'The service of executing buy and sell orders on behalf of clients.' },
        { term: 'Proprietary trading', definition: 'Trading conducted for the securities firm\'s own account and risk.' },
        { term: 'Investment advisory', definition: 'Providing personalized investment recommendations to clients.' },
        { term: 'Client suitability', definition: 'Assessing whether a recommendation fits a client\'s objectives, knowledge, and risk tolerance.' },
        { term: 'Know-your-customer (KYC)', definition: 'The process of identifying clients and understanding their financial situation and investment objectives.' },
        { term: 'Best execution', definition: 'The duty to seek the best available terms for client orders under the circumstances.' },
        { term: 'Chinese wall', definition: 'An internal information barrier that separates advisory or research functions from trading functions.' },
        { term: 'Conflict of interest', definition: 'A situation in which a firm\'s or employee\'s interest could improperly influence professional judgment.' },
        { term: 'Segregation of client assets', definition: 'Keeping client money and securities separate from the firm\'s own assets.' }
      ]
    },
    {
      id: 'securities-fund-management',
      title: 'Fund Management & Investment Funds',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['Funds, NAV & portfolio management', 'Fund types, fees & governance'],
      facts: [
        { term: 'Investment fund', definition: 'A pooled vehicle that collects money from many investors and invests according to a stated strategy.' },
        { term: 'Fund management company', definition: 'A licensed firm that manages an investment fund\'s portfolio and operations.' },
        { term: 'Net asset value (NAV)', definition: 'A fund\'s assets minus its liabilities, usually expressed per fund unit.' },
        { term: 'Portfolio management', definition: 'The ongoing process of selecting and monitoring investments to meet a fund\'s objectives.' },
        { term: 'Open-end fund', definition: 'A fund whose units can generally be issued or redeemed at NAV on request, subject to its terms.' },
        { term: 'Closed-end fund', definition: 'A fund with a fixed number of units that trade on an exchange and may trade above or below NAV.' },
        { term: 'Fund charter', definition: 'The legal document that sets a fund\'s investment objectives, policies, and governance rules.' },
        { term: 'Management fee', definition: 'A periodic fee charged as a percentage of fund assets to cover management services.' },
        { term: 'Performance fee', definition: 'A fee based on fund performance above a benchmark or hurdle.' },
        { term: 'Fund custodian', definition: 'An entity that safekeeps fund assets and maintains independent records of them.' }
      ]
    },
    {
      id: 'securities-clearing-settlement',
      title: 'Registration, Custody, Clearing & Settlement',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['Registration, custody & securities accounts', 'Clearing, settlement & corporate actions'],
      facts: [
        { term: 'Securities registration', definition: 'Recording ownership of securities in the issuer\'s register or an authorized depository system.' },
        { term: 'Securities account', definition: 'An account that records an investor\'s securities holdings and related rights.' },
        { term: 'Custody', definition: 'The safekeeping of securities and the administration of related ownership records.' },
        { term: 'Custodian bank', definition: 'A bank licensed to hold securities and cash for clients and investment funds.' },
        { term: 'Clearing', definition: 'The process of confirming, matching, and calculating obligations before settlement.' },
        { term: 'Central securities depository (CSD)', definition: 'An institution that holds securities in electronic book-entry form and supports settlement.' },
        { term: 'Delivery versus payment (DVP)', definition: 'A settlement method that links the transfer of securities with payment so both occur together.' },
        { term: 'Settlement cycle', definition: 'The period between trade execution and final transfer of cash and securities, often expressed as T+n.' },
        { term: 'Corporate action', definition: 'An event initiated by an issuer that affects a security, such as a dividend, split, or rights issue.' },
        { term: 'Record date', definition: 'The date used to determine which security holders are entitled to a dividend or other corporate action.' }
      ]
    },
    {
      id: 'securities-disclosure',
      title: 'Market Disclosure',
      sectionId: 'securities-section-1',
      examCount: 5,
      lessonTitles: ['Periodic & extraordinary disclosure', 'Insider, related-party & enforcement'],
      facts: [
        { term: 'Disclosure', definition: 'The timely publication of material information so investors can make informed decisions.' },
        { term: 'Periodic disclosure', definition: 'Regular reporting such as annual, semi-annual, or quarterly financial statements.' },
        { term: 'Extraordinary disclosure', definition: 'Immediate disclosure of material events that may affect prices or investor decisions.' },
        { term: 'Material information', definition: 'Information that a reasonable investor would consider important in making an investment decision.' },
        { term: 'Insider', definition: 'A person who has access to confidential material information because of a position or relationship.' },
        { term: 'Insider trading', definition: 'Trading or tipping based on material nonpublic information in breach of a duty.' },
        { term: 'Related-party transaction', definition: 'A transaction between a company and a person or entity closely connected to it.' },
        { term: 'Related-party disclosure', definition: 'Reporting of related-party relationships and transactions to prevent hidden conflicts.' },
        { term: 'Information leakage', definition: 'The unauthorized release or premature use of confidential information.' },
        { term: 'Enforcement', definition: 'Regulatory action taken against violations, such as warnings, fines, suspension, or prosecution.' }
      ]
    }
  ]
};

const securitiesMetadata = {
  source: 'SRTC public basic securities program outline',
  verifiedOn: '2026-11-12',
  volatile: true,
  volatileReason: 'Fees, schedules, session format, and assessment rules can change; confirm current details with SRTC.'
};

const securities = window.NEZHA_CONTENT.securities;
Object.assign(securities, securitiesMetadata);
securities.topics.forEach((topic) => {
  topic.facts.forEach((fact) => {
    Object.assign(fact, securitiesMetadata);
  });
});
