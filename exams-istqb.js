(function () {
  if (!window.NEZHA_EXAMS || !window.NEZHA_CONTENT || !window.NEZHA_CONTENT.istqb) return;
  const forms = window.NEZHA_EXAMS.buildFactExamSets(window.NEZHA_CONTENT.istqb, {
    forms: 3,
    optionsPerQuestion: 4
  });
  window.NEZHA_EXAMS.registerMany(forms, { source: 'istqb' });
})();

(function () {
  if (!window.NEZHA_EXAMS) return;

  const sectionId = 'istqb-k3-section-1';
  const examSet = {
    id: 'istqb-k3-scenario-drill',
    title: 'ISTQB K3 Scenario Drill',
    trackId: 'istqb',
    examType: 'ISTQB',
    lessonId: 'istqb-k3-scenario-drill',
    year: 2026,
    targetPercent: 65,
    passNote: 'Original applied practice for K3 technique selection. Not ISTQB exam material and not a pass guarantee.',
    source: 'istqb-k3',
    examKind: 'scenario',
    formNumber: 4,
    sections: [
      { id: sectionId, title: 'K3 Technique Scenarios', minutes: 30 }
    ],
    questions: [
      {
        id: 'q-istqb-k3-1',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'equivalence-partitioning',
        question: 'A trading app accepts order quantities from 1 to 1,000 shares. A tester wants one representative value from each equivalence class for the quantity rule. Which set best applies equivalence partitioning?',
        options: [
          'One value inside 1–1,000, one value below 1, and one value above 1,000',
          '0, 1, 1,000, and 1,001 shares',
          'Only 500 shares because it is the midpoint',
          'Fifty random quantities across the entire input range'
        ],
        answer: 0,
        explanation: 'Equivalence partitioning selects one representative from each class expected to behave the same way. The set of 0, 1, 1,000, and 1,001 is boundary-oriented, not a pure partition selection.'
      },
      {
        id: 'q-istqb-k3-2',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'equivalence-partitioning',
        question: 'A fee engine classifies trades as low, medium, or high risk. It also rejects an unknown risk label. Which set is the strongest equivalence-partition selection?',
        options: [
          'Only low-risk trades because most users are low risk',
          'One valid trade from each risk class plus one unknown label',
          'Every fee amount that can be generated',
          'Only the highest-risk trade'
        ],
        answer: 1,
        explanation: 'The valid classes are low, medium, and high risk, with an invalid class for unknown labels. Testing one representative from each class gives efficient coverage of the behavior.'
      },
      {
        id: 'q-istqb-k3-3',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'equivalence-partitioning',
        question: 'A password rule accepts lengths 8–20. Testers want an equivalence-partition set rather than a boundary set. Which selection fits best?',
        options: [
          '7, 8, 20, and 21 characters',
          'Only a 14-character password',
          'One length below 8, one length from 8–20, and one length above 20',
          'Every length from 1 to 30'
        ],
        answer: 2,
        explanation: 'The rule has three classes: below the minimum, within the accepted range, and above the maximum. Choosing 7, 8, 20, and 21 would be a boundary-value selection instead.'
      },
      {
        id: 'q-istqb-k3-4',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'equivalence-partitioning',
        question: 'An order-status filter supports draft, submitted, approved, and rejected, and must handle an invalid status. Which set best applies equivalence partitioning?',
        options: [
          'Only approved orders',
          'Draft and rejected orders only',
          'Every status string stored in the database',
          'One order from each valid status plus one invalid status'
        ],
        answer: 3,
        explanation: 'Each supported status is a valid class, and the unsupported value is an invalid class. One representative per class gives the intended partition coverage.'
      },
      {
        id: 'q-istqb-k3-5',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'equivalence-partitioning',
        question: 'Account opening accepts ages 18–65. A tester needs an equivalence-partition set, not a boundary set. Which set is most appropriate?',
        options: [
          'One age below 18, one age from 18–65, and one age above 65',
          '17, 18, 65, and 66',
          'Only age 18',
          'Every age from 0 to 100'
        ],
        answer: 0,
        explanation: 'The three equivalence classes are underage, eligible age, and overage. The 17/18/65/66 set focuses on boundaries, while testing every age is exhaustive.'
      },
      {
        id: 'q-istqb-k3-6',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'equivalence-partitioning',
        question: 'A promotion code can be active, expired, or unknown. Which equivalence-partition set gives the best first pass?',
        options: [
          'Only an active code',
          'One active code, one expired code, and one unknown code',
          'Every code in the production database',
          'Only the longest code'
        ],
        answer: 1,
        explanation: 'Active, expired, and unknown are distinct classes with potentially different outcomes. One representative from each class is the core equivalence-partition choice.'
      },
      {
        id: 'q-istqb-k3-7',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'equivalence-partitioning',
        question: 'A notification service supports email, SMS, and push, and must reject an unsupported channel. Which set best applies equivalence partitioning?',
        options: [
          'Only email',
          'Email and SMS',
          'One email, one SMS, one push, and one unsupported channel',
          'Every device model that can receive notifications'
        ],
        answer: 2,
        explanation: 'The three supported channels and the unsupported channel form four classes. Selecting one representative from each class covers the valid and invalid behavior efficiently.'
      },
      {
        id: 'q-istqb-k3-8',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'boundary-value-analysis',
        question: 'An order quantity must be 1–1,000 shares. Which set is the strongest three-value boundary-value analysis for this rule?',
        options: [
          '500 shares',
          '1 and 1,000 shares',
          '2, 500, and 999 shares',
          '0, 1, 2, 999, 1,000, and 1,001 shares'
        ],
        answer: 3,
        explanation: 'Three-value boundary analysis tests just below, at, and just above each boundary. For 1–1,000, that yields 0, 1, 2, 999, 1,000, and 1,001.'
      },
      {
        id: 'q-istqb-k3-9',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'boundary-value-analysis',
        question: 'A price field accepts 0.01 to 100,000.00. Which set best targets the boundaries?',
        options: [
          '0.00, 0.01, 0.02, 99,999.99, 100,000.00, and 100,000.01',
          '50,000.00 only',
          'Every decimal value in the range',
          '0.02 and 99,999.99 only'
        ],
        answer: 0,
        explanation: 'Boundary values sit at and immediately outside each edge. The set includes values just below, at, and just above both the minimum and maximum.'
      },
      {
        id: 'q-istqb-k3-10',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'boundary-value-analysis',
        question: 'A password must be 8–20 characters. Which set is the best boundary-value selection?',
        options: [
          '8 and 20 characters',
          '7, 8, 9, 19, 20, and 21 characters',
          '1, 10, and 30 characters',
          'Every length from 8 to 20'
        ],
        answer: 1,
        explanation: 'The strongest boundary set includes values immediately below, at, and above each boundary. Testing only 8 and 20 skips just-outside values, and testing every length is exhaustive.'
      },
      {
        id: 'q-istqb-k3-11',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'boundary-value-analysis',
        question: 'A daily withdrawal limit is 5,000,000 VND. Which set best applies boundary-value analysis?',
        options: [
          '0 and 5,000,000 VND',
          '1,000,000, 2,000,000, and 3,000,000 VND',
          '4,999,999, 5,000,000, and 5,000,001 VND',
          '5,000,002 VND only'
        ],
        answer: 2,
        explanation: 'The critical boundary is the maximum allowed amount. Testing one unit below, the limit, and one unit above targets the edge where acceptance behavior changes.'
      },
      {
        id: 'q-istqb-k3-12',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'boundary-value-analysis',
        question: 'An interest-rate field accepts 0.50% to 12.50%. Which set best covers both boundaries?',
        options: [
          '6.50% only',
          '0.50% and 12.50%',
          '0.51% and 12.49%',
          '0.49%, 0.50%, 0.51%, 12.49%, 12.50%, and 12.51%'
        ],
        answer: 3,
        explanation: 'Both ends of the range are boundaries, so the set should include just below, at, and just above each end. The other sets either miss one boundary or omit values outside the range.'
      },
      {
        id: 'q-istqb-k3-13',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'boundary-value-analysis',
        question: 'A results page accepts 1–100 items. Which set is the strongest boundary-value analysis?',
        options: [
          '0, 1, 2, 99, 100, and 101 items',
          '50 items',
          '1 and 100 items',
          '0 and 101 items'
        ],
        answer: 0,
        explanation: 'The set covers just below, at, and just above both the lower and upper boundaries. Testing only 1 and 100 covers the edges but not the immediate outside values.'
      },
      {
        id: 'q-istqb-k3-14',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'boundary-value-analysis',
        question: 'Settlement is allowed from T+1 through T+3. Which set best targets the settlement boundaries?',
        options: [
          'T+2 only',
          'T+0, T+1, T+2, T+3, and T+4',
          'T+0 and T+4 only',
          'T+1 and T+3 only'
        ],
        answer: 1,
        explanation: 'Settlement boundaries occur at T+1 and T+3. Testing T+0 and T+4 adds the immediate outside values, while T+2 is an interior representative.'
      },
      {
        id: 'q-istqb-k3-15',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'decision-table',
        question: 'An order is accepted only when the user is logged in, the account is verified, and buying power is sufficient. Which test case represents the rule that should produce acceptance?',
        options: [
          'Logged out, verified account, sufficient buying power',
          'Logged in, unverified account, sufficient buying power',
          'Logged in, verified account, sufficient buying power',
          'Logged in, verified account, insufficient buying power'
        ],
        answer: 2,
        explanation: 'The acceptance rule requires every condition to be true. Any case with one false condition belongs to a rejection rule in the decision table.'
      },
      {
        id: 'q-istqb-k3-16',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'decision-table',
        question: 'A decision table accepts an order only when the market session is open and the symbol is tradable. Tests already cover open/tradable -> accept, closed/tradable -> reject, and open/non-tradable -> reject. Which combination is still missing?',
        options: [
          'Open and tradable',
          'Closed and tradable',
          'Open and non-tradable',
          'Closed and non-tradable'
        ],
        answer: 3,
        explanation: 'With two conditions there are four combinations. Three are already covered, so the missing rule is the combination where both conditions are false.'
      },
      {
        id: 'q-istqb-k3-17',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'decision-table',
        question: 'A fee is waived when the client is an employee OR has at least five trades this month. Which case should the decision table mark as fee waived?',
        options: [
          'Employee, with two trades this month',
          'Non-employee, with two trades this month',
          'Non-employee, with no trades this month',
          'Non-employee, with one trade this month'
        ],
        answer: 0,
        explanation: 'The OR rule is satisfied when either condition is true. The employee case is true even though the trade-count condition is false, so the fee is waived.'
      },
      {
        id: 'q-istqb-k3-18',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'decision-table',
        question: 'Trading is allowed only when KYC is complete AND the risk profile is current. Which case represents the acceptance rule?',
        options: [
          'KYC incomplete, risk profile current',
          'KYC complete, risk profile current',
          'KYC complete, risk profile expired',
          'KYC incomplete, risk profile expired'
        ],
        answer: 1,
        explanation: 'An AND rule accepts only the combination where all conditions are true. Every other combination has at least one false condition and should be rejected.'
      },
      {
        id: 'q-istqb-k3-19',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'decision-table',
        question: 'A limit-order rule has three conditions: order type is limit, price is within the allowed band, and buying power is sufficient. Tests cover all true plus each single false condition. Which additional rule group should the decision table include?',
        options: [
          'Only the all-true rule',
          'Only one-false rules',
          'Combinations where two or more conditions are false',
          'Only cases with no conditions false'
        ],
        answer: 2,
        explanation: 'A complete decision table considers combinations, not only one condition at a time. Testing two or more false conditions may expose interactions that single-false cases miss.'
      },
      {
        id: 'q-istqb-k3-20',
        sectionId,
        topicId: 'istqb-design',
        topicTitle: 'Test Analysis & Design',
        lessonRef: 'istqb-core-4-2',
        kLevel: 'K3',
        technique: 'decision-table',
        question: 'An alert requires a new review when a trade is high value OR comes from a new device. Which combination should trigger a new review?',
        options: [
          'Low value, known device, with no prior review',
          'Low value, known device, with review completed',
          'High value, known device, with review completed',
          'Low value, new device, with no prior review'
        ],
        answer: 3,
        explanation: 'The OR rule triggers a new review when either condition is true. A new-device trade requires review even when the value is low; the other cases do not create a new review trigger.'
      }
    ]
  };

  window.NEZHA_EXAMS.register(examSet, { source: 'istqb-k3' });
})();
