(function () {
  if (!window.NEZHA_EXAMS) return;

  const examSet = {
    id: 'ecba-scenario-drill',
    title: 'ECBA Scenario Drill',
    trackId: 'ba',
    examType: 'ECBA',
    lessonId: 'ecba-scenario-drill',
    year: 2026,
    targetPercent: 70,
    passNote: 'Unofficial scenario practice created for this app. It is not IIBA exam content and does not guarantee a pass; use it to practise applying business analysis judgment.',
    source: 'ecba-scenarios',
    examKind: 'scenario',
    formNumber: 4,
    sections: [
      { id: 'ecba-scenario-section-1', title: 'ECBA Scenario Drill', minutes: 30 }
    ],
    questions: [
      {
        id: 'q-ecba-scenario-1',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-understanding-ba',
        topicTitle: 'Understanding Business Analysis',
        lessonRef: 'ba-core-1-1',
        question: 'A regional insurer is replacing its manual claims intake process. The sponsor asks the BA to "write the system requirements immediately." The BA notices that the stated goal is to reduce claims handling time, but no one has agreed how success will be measured. What should the BA do first?',
        options: [
          'Draft detailed system requirements so the development team can start on time.',
          'Clarify the need, affected stakeholders, and the measure of value with the sponsor before defining solution requirements.',
          'Send the request to the project manager and limit BA work to documenting decisions.',
          'Copy a competitor\'s claims system requirements and recommend the same features.'
        ],
        answer: 1,
        explanation: 'Business analysis enables change by defining needs and recommending solutions that deliver value. Clarifying the need and value measure first keeps the team from encoding an unvalidated assumption. Option 0 is the main distractor because starting requirements looks efficient, but it risks building the wrong solution.'
      },
      {
        id: 'q-ecba-scenario-2',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-understanding-ba',
        topicTitle: 'Understanding Business Analysis',
        lessonRef: 'ba-core-1-1',
        question: 'A BA joins a programme to improve onboarding for new financial advisers. Separate workstreams for compliance, training, and technology are each optimizing their own tasks, and hand-offs between them are failing. Which perspective should the BA bring to the next planning session?',
        options: [
          'Treat the workstreams as independent projects and report each team\'s output separately.',
          'Focus on the technology workstream because most hand-off failures involve systems.',
          'View onboarding as an enterprise system and examine how need, stakeholders, value, context, and change interact across workstreams.',
          'Ask every workstream to finish its solution design before coordinating with the others.'
        ],
        answer: 2,
        explanation: 'The BACCM and systems thinking encourage the BA to consider the whole enterprise rather than optimize isolated parts. Option 0 is the main distractor because workstream ownership feels practical, but it reinforces the silos that are causing the hand-off failures.'
      },
      {
        id: 'q-ecba-scenario-3',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-mindset',
        topicTitle: 'Business Analysis Mindset',
        lessonRef: 'ba-core-2-1',
        question: 'During a requirements workshop, two senior stakeholders define "customer" differently and each insists their definition must be used. The BA has data showing both groups are affected in different ways. What is the most appropriate response?',
        options: [
          'Adopt the definition of the more senior stakeholder to protect sponsorship.',
          'Record both definitions in the notes without deciding how requirements will use the term.',
          'Surface the assumptions behind each definition and facilitate agreement on a shared definition for this change.',
          'End the workshop and ask the PMO to resolve the conflict.'
        ],
        answer: 2,
        explanation: 'Critical thinking, collaboration, and ethics mean making the disagreement explicit and helping stakeholders reach a workable, evidence-based agreement. Option 0 is the main distractor because preserving sponsorship feels pragmatic, but it lets authority override accuracy and leaves requirements ambiguous.'
      },
      {
        id: 'q-ecba-scenario-4',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-mindset',
        topicTitle: 'Business Analysis Mindset',
        lessonRef: 'ba-core-2-1',
        question: 'A product team must deliver a regulatory report in six weeks. The BA planned a sequential requirements phase, but the regulator may change one key field definition next month. How should the BA adapt?',
        options: [
          'Keep the original plan so the team can demonstrate disciplined delivery.',
          'Drop documentation and rely on verbal agreements to move faster.',
          'Re-plan in short increments, prioritize stable requirements, and manage the uncertain field as a risk with a decision point.',
          'Wait for the regulator\'s final definition before doing any analysis.'
        ],
        answer: 2,
        explanation: 'Agility means adapting the approach as new information emerges while keeping enough structure to manage risk. Option 0 is the main distractor because plan discipline sounds professional, but refusing to adapt would expose the report to avoidable rework.'
      },
      {
        id: 'q-ecba-scenario-5',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-implementing',
        topicTitle: 'Implementing Business Analysis',
        lessonRef: 'ba-core-3-1',
        question: 'A bank has three business units using different definitions of "high-value client." The BA lead must define how analysis work will be governed across the units. Which approach is most appropriate?',
        options: [
          'Let each unit follow its own approach and reconcile the outputs at the end.',
          'Define a BA approach with scope, shared decision rights, deliverables, and escalation paths, then tailor engagement by unit.',
          'Ask the PMO to own every BA deliverable and decision so the units do not conflict.',
          'Skip formal governance because each unit already has project managers.'
        ],
        answer: 1,
        explanation: 'An implemented BA approach sets scope, activities, deliverables, and governance, including who decides and how conflicts escalate. Option 0 is the main distractor because local autonomy can feel efficient, but it postpones conflicts and creates late rework across units.'
      },
      {
        id: 'q-ecba-scenario-6',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-implementing',
        topicTitle: 'Implementing Business Analysis',
        lessonRef: 'ba-core-3-1',
        question: 'A BA is tracking a discovery effort. The team has completed 20 of 30 planned interviews, but only one customer segment has been represented. Which action best reflects effective performance measurement?',
        options: [
          'Report 67% completion and continue as planned because the interview count is on schedule.',
          'Rebalance the remaining interviews toward the missing segment and update the plan and risks for coverage gaps.',
          'Cancel the remaining interviews and write up the findings now.',
          'Schedule extra interviews with the same segment to reach the original total.'
        ],
        answer: 1,
        explanation: 'Performance measurement should track the quality and coverage of BA work, not only activity counts. Option 0 is the main distractor because the schedule metric looks healthy, but it hides a coverage gap that could invalidate the findings.'
      },
      {
        id: 'q-ecba-scenario-7',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-change',
        topicTitle: 'Change',
        lessonRef: 'ba-core-4-1',
        question: 'A retailer is moving purchase approvals from email to a workflow tool. Managers say they support the change, but the BA sees many still approve by email "just to be safe." What should the BA analyze next?',
        options: [
          'Assume the resistance is irrational and ask leadership to mandate the new tool.',
          'Examine current-state behaviours, transition constraints, and change readiness to understand why the workaround persists.',
          'Recommend a larger training budget and close the analysis.',
          'Delay the change until every manager personally requests the new tool.'
        ],
        answer: 1,
        explanation: 'Change strategy depends on understanding the current state, the future state, the transition, and stakeholder readiness. Option 0 is the main distractor because a mandate seems decisive, but it ignores the reason for the workaround and may increase resistance.'
      },
      {
        id: 'q-ecba-scenario-8',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-change',
        topicTitle: 'Change',
        lessonRef: 'ba-core-4-1',
        question: 'A hospital replaces its scheduling system. The future-state design removes a duplicate check, but in the first week staff cannot tell whether appointments were saved, causing double bookings. What is the most appropriate action?',
        options: [
          'Declare the future state a failure and restore the old system permanently.',
          'Ignore the problem because the duplicate check was intentionally removed from the future state.',
          'Add temporary transition controls, such as a verification step and a clear fallback, until system feedback and staff confidence are stable.',
          'Ask staff to stop discussing the issue so the change can settle.'
        ],
        answer: 2,
        explanation: 'The transition state is temporary and may need controls that are not part of the final design. Option 1 is the main distractor because the duplicate check is indeed gone from the future state, but that design decision does not remove the transition risk.'
      },
      {
        id: 'q-ecba-scenario-9',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-need',
        topicTitle: 'Need',
        lessonRef: 'ba-core-5-1',
        question: 'A logistics company says, "We need a new dashboard." The BA learns that operations managers receive conflicting daily figures from three reports and spend two hours reconciling them. What is the best starting need statement?',
        options: [
          '"We need a dashboard with five tabs and colour-coded alerts."',
          '"Operations managers cannot obtain a consistent daily view of delivery performance, causing two hours of manual reconciliation and delayed decisions."',
          '"The reporting team needs stronger SQL skills."',
          '"We need to replace all three reports with one vendor tool."'
        ],
        answer: 1,
        explanation: 'A need or problem statement describes the problem and its impact without prematurely prescribing a solution. Option 0 is the main distractor because a dashboard sounds responsive, but it jumps to a solution before the need and outcome are agreed.'
      },
      {
        id: 'q-ecba-scenario-10',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-need',
        topicTitle: 'Need',
        lessonRef: 'ba-core-5-1',
        question: 'A call centre\'s average handling time has risen. The manager wants more self-service options. The BA finds the rise began when a compliance script added 12 mandatory questions, and many calls are repeat contacts about the same unresolved issue. What should the BA do?',
        options: [
          'Approve self-service because it directly targets call volume.',
          'Investigate root causes, including the compliance script and repeat-contact pattern, before selecting a solution.',
          'Tell the manager the data is inconclusive and take no action.',
          'Focus only on hiring more agents to reduce waiting time.'
        ],
        answer: 1,
        explanation: 'Need analysis looks for the underlying cause rather than treating a symptom, then connects the cause to a desired outcome. Option 0 is the main distractor because self-service is a plausible response, but it may not address either the script burden or the repeat contacts.'
      },
      {
        id: 'q-ecba-scenario-11',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-need',
        topicTitle: 'Need',
        lessonRef: 'ba-core-5-1',
        question: 'A university wants to increase course completion and the sponsor proposes a mobile reminder app. The BA finds most dropouts occur after students fail their first assignment, and students say they do not understand the feedback. Which desired outcome should the BA clarify first?',
        options: [
          'Launch the reminder app before the next semester.',
          'Increase the proportion of students who recover after a first-assignment setback and continue to completion.',
          'Send more reminders to all students.',
          'Reduce the number of assignments so the course is easier.'
        ],
        answer: 1,
        explanation: 'A desired outcome states the result or benefit the enterprise wants to achieve, not the solution or activity. Option 0 is the main distractor because sponsors often express a solution as the goal, but launching an app does not by itself define or deliver the needed outcome.'
      },
      {
        id: 'q-ecba-scenario-12',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-solution',
        topicTitle: 'Solution',
        lessonRef: 'ba-core-6-1',
        question: 'A BA has identified three ways to fix a claims intake problem: improve the current system, buy a configurable package, or build a custom module. Executives want a recommendation next week. Which analysis best supports a defensible recommendation?',
        options: [
          'Choose the custom build because it can fit every requirement exactly.',
          'Compare the options against the need, feasibility, risk, cost, and value, documenting assumptions and trade-offs.',
          'Choose the cheapest option regardless of fit.',
          'Defer the decision until every stakeholder prefers the same option.'
        ],
        answer: 1,
        explanation: 'Solution options should be evaluated against the need, feasibility, and value, with assumptions and trade-offs made explicit. Option 0 is the main distractor because a custom fit sounds strongest, but it ignores cost, delivery risk, and whether the extra fit creates value.'
      },
      {
        id: 'q-ecba-scenario-13',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-solution',
        topicTitle: 'Solution',
        lessonRef: 'ba-core-6-1',
        question: 'A new lending workflow has been live for two months. Usage is high, but the default rate has not improved and staff still use spreadsheets for key checks. Which solution evaluation question matters most?',
        options: [
          'Did the project deliver on time and on budget?',
          'Did the solution create the intended outcome, and which adoption or design gaps explain the result?',
          'Can the vendor add more features to the workflow?',
          'Did the team follow the original requirements document?'
        ],
        answer: 1,
        explanation: 'Solution evaluation assesses whether the solution delivers the intended value and why it may not. Option 0 is the main distractor because delivery metrics are familiar and positive, but on-time and on-budget delivery does not prove that the business outcome improved.'
      },
      {
        id: 'q-ecba-scenario-14',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-stakeholder',
        topicTitle: 'Stakeholder',
        lessonRef: 'ba-core-7-1',
        question: 'A BA is redesigning a customer refund process. The sponsor is the finance director; frontline agents, fraud analysts, and customers are also affected. The director says, "Just interview me; I know what is needed." What should the BA do?',
        options: [
          'Follow the sponsor\'s request to save time and avoid politics.',
          'Identify and analyse all affected stakeholder groups, their interests and influence, and plan engagement that includes frontline and customer perspectives.',
          'Interview only the fraud team because they manage the main risk.',
          'Survey customers and skip internal stakeholders to keep the analysis simple.'
        ],
        answer: 1,
        explanation: 'Stakeholder analysis identifies who is affected, what they need, and how much influence they have, so engagement is not limited to the sponsor. Option 0 is the main distractor because it is efficient and respects hierarchy, but it misses operational reality and customer impact.'
      },
      {
        id: 'q-ecba-scenario-15',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-stakeholder',
        topicTitle: 'Stakeholder',
        lessonRef: 'ba-core-7-1',
        question: 'Two departments will use a new procurement portal. Procurement wants strict controls; research wants fast purchases. In a workshop, each side keeps deleting the other\'s requirements. What is the most appropriate facilitation approach?',
        options: [
          'Let the more influential department\'s requirements stand and revisit the issue later.',
          'Build two separate portals so each department gets what it wants.',
          'Use structured collaboration to surface shared objectives, make trade-offs explicit, and agree on decision criteria and owners.',
          'Escalate to senior management to choose one department\'s list.'
        ],
        answer: 2,
        explanation: 'Stakeholder collaboration aims for shared understanding and commitment by working through trade-offs rather than avoiding them. Option 1 is the main distractor because separate portals appear to satisfy both groups, but they add cost and complexity while leaving the real conflict unresolved.'
      },
      {
        id: 'q-ecba-scenario-16',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-value',
        topicTitle: 'Value',
        lessonRef: 'ba-core-8-1',
        question: 'A BA is defining success measures for a new adviser onboarding programme. The sponsor suggests tracking "number of training modules completed." The programme\'s goal is to reduce time-to-productivity for new advisers. Which measure set best reflects value?',
        options: [
          'Number of modules completed and number of workshops delivered.',
          'Time to first independent client meeting, quality of early client interactions, and six-month retention, linked to the productivity goal.',
          'Project budget spent and number of system features launched.',
          'Number of trainers hired and classrooms booked.'
        ],
        answer: 1,
        explanation: 'Value should be measured through outcomes and benefits that matter to stakeholders, not only through activity or output counts. Option 0 is the main distractor because module completion is easy to measure, but it does not show whether new advisers became productive faster.'
      },
      {
        id: 'q-ecba-scenario-17',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-context',
        topicTitle: 'Context',
        lessonRef: 'ba-core-9-1',
        question: 'A BA is helping a wealth-management firm launch a new client onboarding journey. The firm operates in three countries with different data-privacy rules, and one market has a strongly relationship-based culture. Which context factor should most directly shape the BA approach?',
        options: [
          'The project team\'s preferred meeting cadence.',
          'The regulatory requirements and cultural norms in each market, because they constrain the solution and how stakeholders should be engaged.',
          'The number of slides required in the final presentation.',
          'The vendor\'s standard implementation timeline.'
        ],
        answer: 1,
        explanation: 'Context includes external regulation and organizational culture, both of which shape what the solution can do and how stakeholders should be involved. Option 0 is the main distractor because team preferences matter for planning, but they are secondary to legal and cultural constraints.'
      },
      {
        id: 'q-ecba-scenario-18',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-techniques',
        topicTitle: 'BA Techniques',
        lessonRef: 'ba-core-10-1',
        question: 'A BA needs to understand how loan officers actually use a new screening tool. The officers say the tool is "fine," but the BA suspects workarounds. Which technique combination best fits the situation?',
        options: [
          'Send a multiple-choice survey and rely on the self-reported answers.',
          'Observe officers working real cases, then follow up with targeted interviews about the workarounds observed.',
          'Run a SWOT analysis with senior managers only.',
          'Read the vendor\'s user manual and document the intended process.'
        ],
        answer: 1,
        explanation: 'Observation reveals actual behaviour, and interviews help explain the meaning of what was observed. Option 0 is the main distractor because a survey is efficient and scalable, but self-report is likely to hide the workarounds the BA needs to discover.'
      },
      {
        id: 'q-ecba-scenario-19',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-competencies',
        topicTitle: 'Underlying Competencies',
        lessonRef: 'ba-core-11-1',
        question: 'A BA receives a large set of support tickets about a new billing system. The business wants a quick answer on why complaints are rising. Which response best demonstrates the underlying competencies of a business analyst?',
        options: [
          'Forward every ticket to IT and wait for their analysis.',
          'Categorize the tickets, test patterns against operational data, and validate the findings with business stakeholders before recommending action.',
          'Use the most advanced analytics tool available, even if the team cannot maintain it.',
          'Adopt the interpretation offered by the stakeholder who complains most loudly.'
        ],
        answer: 1,
        explanation: 'Analytical thinking breaks complex information into patterns and causes, while business knowledge and collaboration ensure the findings are relevant and validated. Option 2 is the main distractor because tool proficiency looks sophisticated, but a tool the team cannot sustain does not improve the analysis.'
      },
      {
        id: 'q-ecba-scenario-20',
        sectionId: 'ecba-scenario-section-1',
        topicId: 'ecba-exam-skills',
        topicTitle: 'ECBA Exam Skills',
        lessonRef: 'ba-core-12-1',
        question: 'In a timed ECBA-style scenario, a candidate narrows the choices to two. One option is a sensible action but depends on facts not stated in the scenario; the other directly addresses the need and stakeholders described. What is the best exam-judgment approach?',
        options: [
          'Choose the longer, more detailed option because it demonstrates more expertise.',
          'Choose the option that relies on facts stated in the scenario and best fits the described need, context, and stakeholders.',
          'Choose the option that sounds most like a textbook definition.',
          'Choose the first option that mentions a recognized tool or technique.'
        ],
        answer: 1,
        explanation: 'Scenario questions ask for the best action given the facts provided, so unsupported assumptions and surface cues should be eliminated. Option 0 is the main distractor because detailed answers feel authoritative, but length and technical vocabulary are not evidence that an action fits the situation.'
      }
    ]
  };

  window.NEZHA_EXAMS.register(examSet, { source: 'ecba-scenarios' });
})();
