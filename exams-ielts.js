// Original IELTS Academic practice mocks. Not official IELTS material.
window.NEZHA_IELTS_EXAMS = (() => {
  const q = (id, sectionId, topicTitle, lessonRef, question, options, answer, explanation) => ({
    id,
    sectionId,
    topicId: sectionId,
    topicTitle,
    lessonRef,
    question,
    options,
    answer,
    explanation
  });
  const transcriptHtml = (segments) => segments
    .map(([speaker, text]) => `<p><strong>${speaker}:</strong> ${text}</p>`)
    .join('');

  const part1Segments = [
    ['Narrator', 'Part 1. You will hear a telephone conversation between a man and a receptionist at a community arts centre.'],
    ['Priya', 'Good morning, Riverside Community Arts Centre. How can I help?'],
    ['Alex', 'Hi, I’m interested in joining the centre. Could you tell me about membership?'],
    ['Priya', 'Of course. Annual membership is thirty-six pounds for adults, or twenty-four pounds for students and seniors. Family membership is sixty pounds.'],
    ['Alex', 'I’m a student, so twenty-four pounds. What does it include?'],
    ['Priya', 'You get access to the library and two free workshops each term. Some classes also charge a materials fee.'],
    ['Alex', 'I’d like to do a pottery class. When does it start?'],
    ['Priya', 'The next beginners’ course begins on the fourteenth of September and runs for eight weeks, on Tuesday evenings from six thirty to eight thirty.'],
    ['Alex', 'How much is it?'],
    ['Priya', 'Ninety-six pounds, plus twenty pounds for clay and tools. The fee covers firing.'],
    ['Alex', 'Is there a waiting list?'],
    ['Priya', 'There were three places, but one has just gone. Two places are left. You can reserve by phone, but payment is required by the fifth of September.'],
    ['Alex', 'What’s the address?'],
    ['Priya', 'Eighteen Mill Lane, opposite the old library. Parking is limited, but there’s a bus stop on Bridge Street.'],
    ['Alex', 'Do I need to bring anything?'],
    ['Priya', 'An apron and a notebook for the first session. We provide the tools.'],
    ['Alex', 'Great. My name is Alex Turner, T-U-R-N-E-R. My phone number is zero seven seven zero zero, nine zero zero, four one two.'],
    ['Priya', 'Thank you. I’ll send a confirmation email. What’s your email address?'],
    ['Alex', 'Alex dot Turner at example dot com.'],
    ['Priya', 'Perfect. I’ll reserve the place until the payment deadline.'],
    ['Narrator', 'That is the end of Part 1.']
  ];

  const part2Segments = [
    ['Narrator', 'Part 2. You will hear a talk given to new volunteers at a city farm.'],
    ['Maya', 'Welcome to Northfield City Farm. This short talk explains what volunteers need to know before their first day. The farm is open to the public from Wednesday to Sunday, nine to four. Volunteers start at eight thirty for the morning briefing.'],
    ['Maya', 'The main entrance is on Oak Road, but volunteers should use the side gate next to the tool shed, not the visitor entrance.'],
    ['Maya', 'There are three volunteer teams: garden, animal care, and education. New volunteers begin in the garden team for the first four weeks so they can learn the site and the safety routines. After that, they can request a transfer.'],
    ['Maya', 'Please wear closed shoes and bring a water bottle. We provide gloves and aprons. Do not bring your own tools, because we have a strict equipment policy.'],
    ['Maya', 'The morning break is at ten thirty in the barn kitchen. Tea and coffee are free, but lunch is not provided. There is a small café open on Saturdays and Sundays.'],
    ['Maya', 'If you cannot attend, call the volunteer coordinator before eight in the morning. Repeated no-shows may result in losing your place.'],
    ['Maya', 'At the end of each session, record your hours in the blue folder in the office. These hours count towards the farm’s volunteer certificate, which requires forty hours.'],
    ['Maya', 'Finally, the farm relies on donations. The most useful items this month are bird seed, old newspapers, and clean plastic pots. Please leave donations at the side gate, not at the main office.'],
    ['Narrator', 'That is the end of Part 2.']
  ];

  const part3Segments = [
    ['Narrator', 'Part 3. You will hear a discussion between two students and their tutor about a research project.'],
    ['Dr Hayes', 'So, Lena and Marcus, you’re planning a project on urban green spaces. Where are you now?'],
    ['Lena', 'We want to compare two parks near the university, but we’re not sure whether to measure stress with questionnaires or saliva samples.'],
    ['Dr Hayes', 'Saliva samples are more objective, but they’re expensive and require ethics approval. Questionnaires are quicker, though self-report can be unreliable.'],
    ['Marcus', 'We have only six weeks. Maybe we use a short questionnaire and add a small saliva sample group?'],
    ['Dr Hayes', 'That’s sensible. Keep the sample small, perhaps twelve participants. But you need a control group.'],
    ['Lena', 'We thought of comparing people who walk in the park with people who walk along a busy road.'],
    ['Dr Hayes', 'Good. Control for time of day and weather. Also record noise levels.'],
    ['Marcus', 'We planned to use the university’s noise meter. Is that available?'],
    ['Dr Hayes', 'Yes, book it through the lab manager. You’ll need to return it within forty-eight hours.'],
    ['Lena', 'What about the literature review? We have twenty sources, but most are about adults.'],
    ['Dr Hayes', 'That’s a gap you can mention. Include at least three studies on older people.'],
    ['Marcus', 'Should we interview park users?'],
    ['Dr Hayes', 'Only as a pilot. Three or four short interviews will help you design the questionnaire, but don’t overcommit.'],
    ['Lena', 'We’re worried about the deadline for the ethics form.'],
    ['Dr Hayes', 'Submit the form by Friday next week. The committee meets on the first Monday of the month. If you miss it, you’ll lose two weeks.'],
    ['Marcus', 'So the main priorities are the ethics form, the noise meter booking, and refining the questionnaire.'],
    ['Dr Hayes', 'Yes. And remember to keep a research diary. It will help with your reflection section.'],
    ['Narrator', 'That is the end of Part 3.']
  ];

  const part4Segments = [
    ['Narrator', 'Part 4. You will hear a lecture about the history of the bicycle.'],
    ['Dr Rossi', 'Good afternoon. Today I want to trace how the bicycle changed from a luxury toy into a practical form of transport.'],
    ['Dr Rossi', 'The first bicycle-like machine, the draisine, was invented in eighteen seventeen by Karl von Drais. It had no pedals; riders pushed their feet against the ground. It was popular among wealthy men, but it was expensive and uncomfortable on rough roads.'],
    ['Dr Rossi', 'The penny-farthing appeared in the eighteen seventies. Its large front wheel allowed higher speeds, but falls were dangerous. The development of the chain drive in the eighteen eighties made smaller wheels possible. This design, often called the safety bicycle, became the basis of the modern bicycle.'],
    ['Dr Rossi', 'The pneumatic tyre, patented by John Boyd Dunlop in eighteen eighty-eight, improved comfort and speed. Cycling clubs and magazines spread the fashion, and the bicycle gave women greater independence. In the eighteen nineties, the bicycle was linked to changes in clothing, as women adopted shorter skirts and divided skirts.'],
    ['Dr Rossi', 'But the bicycle’s social impact was uneven. In many cities, cycling was restricted by cost and by social norms. In rural areas, it reduced isolation by making it easier to visit neighbouring towns. It also influenced the development of roads and the early automobile industry.'],
    ['Dr Rossi', 'Today, cycling is promoted for health and environmental reasons. However, safety remains a major issue. Protected lanes, lower speed limits, and better junction design are more effective than simply encouraging people to wear helmets. That is not to say helmets are unimportant; rather, infrastructure shapes whether people feel safe enough to cycle.'],
    ['Dr Rossi', 'In conclusion, the bicycle is not only a machine but a lens for studying technology, class, gender, and urban change.'],
    ['Narrator', 'That is the end of Part 4.']
  ];

  const listeningSections = [
    {
      id: 'ielts-listening-1-1',
      title: 'Listening Part 1 · Community Arts Centre',
      minutes: 10,
      type: 'listening',
      audioSrc: 'assets/ielts/listening/ielts-listening-mock-1-part-1.m4a',
      instructions: 'Listen once and answer the questions. The audio is an original practice recording.',
      transcriptSegments: part1Segments,
      transcriptHtml: transcriptHtml(part1Segments)
    },
    {
      id: 'ielts-listening-1-2',
      title: 'Listening Part 2 · City Farm Orientation',
      minutes: 10,
      type: 'listening',
      audioSrc: 'assets/ielts/listening/ielts-listening-mock-1-part-2.m4a',
      instructions: 'Listen once and answer the questions. The audio is an original practice recording.',
      transcriptSegments: part2Segments,
      transcriptHtml: transcriptHtml(part2Segments)
    },
    {
      id: 'ielts-listening-1-3',
      title: 'Listening Part 3 · Research Tutorial',
      minutes: 10,
      type: 'listening',
      audioSrc: 'assets/ielts/listening/ielts-listening-mock-1-part-3.m4a',
      instructions: 'Listen once and answer the questions. The audio is an original practice recording.',
      transcriptSegments: part3Segments,
      transcriptHtml: transcriptHtml(part3Segments)
    },
    {
      id: 'ielts-listening-1-4',
      title: 'Listening Part 4 · History of the Bicycle',
      minutes: 10,
      type: 'listening',
      audioSrc: 'assets/ielts/listening/ielts-listening-mock-1-part-4.m4a',
      instructions: 'Listen once and answer the questions. The audio is an original practice recording.',
      transcriptSegments: part4Segments,
      transcriptHtml: transcriptHtml(part4Segments)
    }
  ];

  const listeningQuestions = [
    q('ielts-l1-q1', 'ielts-listening-1-1', 'Part 1 · Membership', 'ielts-1-1', 'How much is annual membership for a student?', ['£24', '£36', '£60', '£96'], 0, 'The receptionist says student membership is twenty-four pounds.'),
    q('ielts-l1-q2', 'ielts-listening-1-1', 'Part 1 · Membership', 'ielts-1-1', 'What does student membership include?', ['Unlimited classes', 'Library access and two free workshops', 'A free apron', 'Parking'], 1, 'It includes library access and two free workshops each term.'),
    q('ielts-l1-q3', 'ielts-listening-1-1', 'Part 1 · Pottery course', 'ielts-1-1', 'When does the beginners’ pottery course begin?', ['5 September', '14 September', '24 September', '1 October'], 1, 'The next course begins on 14 September.'),
    q('ielts-l1-q4', 'ielts-listening-1-1', 'Part 1 · Pottery course', 'ielts-1-1', 'When does the pottery class meet?', ['Monday 6:30–8:30', 'Tuesday 6:30–8:30', 'Thursday 7:00–9:00', 'Saturday 10:00–12:00'], 1, 'It runs on Tuesday evenings from 6:30 to 8:30.'),
    q('ielts-l1-q5', 'ielts-listening-1-1', 'Part 1 · Pottery course', 'ielts-1-1', 'What is the course fee?', ['£20', '£60', '£96', '£116'], 2, 'The course costs ninety-six pounds.'),
    q('ielts-l1-q6', 'ielts-listening-1-1', 'Part 1 · Pottery course', 'ielts-1-1', 'How much extra is charged for clay and tools?', ['£12', '£20', '£24', '£36'], 1, 'There is an additional twenty pounds for clay and tools.'),
    q('ielts-l1-q7', 'ielts-listening-1-1', 'Part 1 · Booking', 'ielts-1-1', 'By what date must payment be made?', ['5 September', '14 September', '20 September', '1 October'], 0, 'Payment is required by 5 September.'),
    q('ielts-l1-q8', 'ielts-listening-1-1', 'Part 1 · Location', 'ielts-1-1', 'What is the address of the arts centre?', ['18 Mill Lane', '18 Bridge Street', '80 Mill Lane', '80 Oak Road'], 0, 'The address is 18 Mill Lane, opposite the old library.'),
    q('ielts-l1-q9', 'ielts-listening-1-1', 'Part 1 · Preparation', 'ielts-1-1', 'What should Alex bring to the first session?', ['Clay and tools', 'An apron and notebook', 'Gloves and a water bottle', 'A laptop'], 1, 'The receptionist says to bring an apron and a notebook.'),
    q('ielts-l1-q10', 'ielts-listening-1-1', 'Part 1 · Contact details', 'ielts-1-1', 'What is Alex’s phone number?', ['07700 900 142', '07700 900 412', '07700 904 012', '07700 940 120'], 1, 'Alex gives the number 07700 900 412.'),

    q('ielts-l2-q11', 'ielts-listening-1-2', 'Part 2 · Opening hours', 'ielts-1-2', 'When is the farm open to the public?', ['Monday to Friday', 'Wednesday to Sunday', 'Tuesday to Saturday', 'Every day'], 1, 'The farm is open from Wednesday to Sunday.'),
    q('ielts-l2-q12', 'ielts-listening-1-2', 'Part 2 · Arrival', 'ielts-1-2', 'What time do volunteers start?', ['7:30', '8:00', '8:30', '9:00'], 2, 'Volunteers start at 8:30 for the morning briefing.'),
    q('ielts-l2-q13', 'ielts-listening-1-2', 'Part 2 · Entrance', 'ielts-1-2', 'Which entrance should volunteers use?', ['The main visitor entrance', 'The side gate next to the tool shed', 'The café entrance', 'The office door'], 1, 'Volunteers use the side gate next to the tool shed.'),
    q('ielts-l2-q14', 'ielts-listening-1-2', 'Part 2 · Teams', 'ielts-1-2', 'Which team do new volunteers join first?', ['Animal care', 'Education', 'Garden', 'Maintenance'], 2, 'New volunteers begin in the garden team.'),
    q('ielts-l2-q15', 'ielts-listening-1-2', 'Part 2 · Teams', 'ielts-1-2', 'How long before volunteers can request a transfer?', ['Two weeks', 'Four weeks', 'Eight weeks', 'Twelve weeks'], 1, 'They work in the garden team for the first four weeks.'),
    q('ielts-l2-q16', 'ielts-listening-1-2', 'Part 2 · Equipment', 'ielts-1-2', 'What does the farm provide?', ['Boots and tools', 'Gloves and aprons', 'Lunch and drinks', 'A water bottle'], 1, 'The farm provides gloves and aprons.'),
    q('ielts-l2-q17', 'ielts-listening-1-2', 'Part 2 · Breaks', 'ielts-1-2', 'Where is the morning break held?', ['In the barn kitchen', 'In the café', 'In the office', 'In the tool shed'], 0, 'The morning break is in the barn kitchen.'),
    q('ielts-l2-q18', 'ielts-listening-1-2', 'Part 2 · Food', 'ielts-1-2', 'What does the talk say about lunch?', ['It is free for volunteers', 'It is provided on weekends only', 'It is not provided', 'It is available in the barn'], 2, 'Lunch is not provided, although a café opens at weekends.'),
    q('ielts-l2-q19', 'ielts-listening-1-2', 'Part 2 · Certificate', 'ielts-1-2', 'How many hours are needed for the volunteer certificate?', ['20', '30', '40', '50'], 2, 'The certificate requires forty hours.'),
    q('ielts-l2-q20', 'ielts-listening-1-2', 'Part 2 · Donations', 'ielts-1-2', 'Which item is requested for donation this month?', ['Bird seed', 'Plastic bottles', 'Old clothes', 'Wooden tools'], 0, 'The talk asks for bird seed, old newspapers, and clean plastic pots.'),

    q('ielts-l3-q21', 'ielts-listening-1-3', 'Part 3 · Project design', 'ielts-1-2', 'What are the students comparing?', ['Two university libraries', 'Two parks near the university', 'A park and a shopping centre', 'Two groups of athletes'], 1, 'They plan to compare two parks near the university.'),
    q('ielts-l3-q22', 'ielts-listening-1-3', 'Part 3 · Methods', 'ielts-1-2', 'What is the problem with saliva samples?', ['They are too slow', 'They are expensive and need ethics approval', 'They are not accurate', 'They require a doctor'], 1, 'Saliva samples are expensive and require ethics approval.'),
    q('ielts-l3-q23', 'ielts-listening-1-3', 'Part 3 · Methods', 'ielts-1-2', 'What weakness of questionnaires does the tutor mention?', ['They are too expensive', 'Self-report can be unreliable', 'They take too long', 'They require saliva'], 1, 'The tutor says self-report can be unreliable.'),
    q('ielts-l3-q24', 'ielts-listening-1-3', 'Part 3 · Sample', 'ielts-1-2', 'How many participants does the tutor suggest?', ['Six', 'Twelve', 'Twenty', 'Forty'], 1, 'The tutor suggests a small sample of twelve participants.'),
    q('ielts-l3-q25', 'ielts-listening-1-3', 'Part 3 · Control', 'ielts-1-2', 'Which group is suggested as a control?', ['People walking along a busy road', 'Students in a library', 'Park workers', 'Older adults'], 0, 'They suggest comparing park walkers with people walking along a busy road.'),
    q('ielts-l3-q26', 'ielts-listening-1-3', 'Part 3 · Control', 'ielts-1-2', 'Which factors should the students control?', ['Age and gender', 'Time of day and weather', 'Diet and sleep', 'Noise and income'], 1, 'The tutor says to control for time of day and weather.'),
    q('ielts-l3-q27', 'ielts-listening-1-3', 'Part 3 · Equipment', 'ielts-1-2', 'Who should the students ask about booking the noise meter?', ['The lab manager', 'The park office', 'Their tutor', 'The library desk'], 0, 'They should book it through the lab manager.'),
    q('ielts-l3-q28', 'ielts-listening-1-3', 'Part 3 · Equipment', 'ielts-1-2', 'Within what period must the noise meter be returned?', ['24 hours', '48 hours', 'One week', 'Two weeks'], 1, 'It must be returned within forty-eight hours.'),
    q('ielts-l3-q29', 'ielts-listening-1-3', 'Part 3 · Literature', 'ielts-1-2', 'Which group is missing from most of the literature?', ['Children', 'Older people', 'University students', 'Park staff'], 1, 'Most sources are about adults, so older people are a gap.'),
    q('ielts-l3-q30', 'ielts-listening-1-3', 'Part 3 · Deadline', 'ielts-1-2', 'When must the ethics form be submitted?', ['Friday next week', 'Monday next week', 'The first Monday of the month', 'At the end of the project'], 0, 'The tutor says to submit it by Friday next week.'),

    q('ielts-l4-q31', 'ielts-listening-1-4', 'Part 4 · Early bicycles', 'ielts-1-3', 'Who invented the draisine?', ['John Boyd Dunlop', 'Karl von Drais', 'Elena Rossi', 'James Starley'], 1, 'The draisine was invented by Karl von Drais.'),
    q('ielts-l4-q32', 'ielts-listening-1-4', 'Part 4 · Early bicycles', 'ielts-1-3', 'What did the draisine lack?', ['Wheels', 'Pedals', 'A seat', 'Brakes'], 1, 'The draisine had no pedals; riders pushed their feet against the ground.'),
    q('ielts-l4-q33', 'ielts-listening-1-4', 'Part 4 · Design', 'ielts-1-3', 'Which part of the penny-farthing was unusually large?', ['The rear wheel', 'The front wheel', 'The chain', 'The tyre'], 1, 'The penny-farthing had a large front wheel.'),
    q('ielts-l4-q34', 'ielts-listening-1-4', 'Part 4 · Design', 'ielts-1-3', 'What did the chain drive make possible?', ['Higher seats', 'Smaller wheels', 'Better brakes', 'Cheaper tyres'], 1, 'The chain drive made smaller wheels possible.'),
    q('ielts-l4-q35', 'ielts-listening-1-4', 'Part 4 · Tyres', 'ielts-1-3', 'Who patented the pneumatic tyre?', ['Karl von Drais', 'John Boyd Dunlop', 'James Starley', 'Elena Rossi'], 1, 'John Boyd Dunlop patented the pneumatic tyre.'),
    q('ielts-l4-q36', 'ielts-listening-1-4', 'Part 4 · Tyres', 'ielts-1-3', 'In which year was the pneumatic tyre patented?', ['1817', '1870', '1888', '1890'], 2, 'The lecture gives the year as 1888.'),
    q('ielts-l4-q37', 'ielts-listening-1-4', 'Part 4 · Social impact', 'ielts-1-3', 'What did the bicycle give women, according to the lecture?', ['The vote', 'Greater independence', 'Free travel', 'Better jobs'], 1, 'The lecture says the bicycle gave women greater independence.'),
    q('ielts-l4-q38', 'ielts-listening-1-4', 'Part 4 · Social impact', 'ielts-1-3', 'What effect did the bicycle have in rural areas?', ['More traffic', 'Reduced isolation', 'Higher food prices', 'Fewer schools'], 1, 'It reduced isolation by making it easier to visit neighbouring towns.'),
    q('ielts-l4-q39', 'ielts-listening-1-4', 'Part 4 · Safety', 'ielts-1-3', 'What does the lecturer say is more effective than simply encouraging helmets?', ['More cycling clubs', 'Protected lanes and lower speed limits', 'Better tyres', 'Cheaper bicycles'], 1, 'Protected lanes, lower speed limits, and better junctions are more effective.'),
    q('ielts-l4-q40', 'ielts-listening-1-4', 'Part 4 · Main idea', 'ielts-1-3', 'What is the main theme of the lecture?', ['The engineering of the chain drive', 'Technology and social change', 'The history of roads', 'The dangers of cycling'], 1, 'The lecture uses the bicycle to study technology, class, gender, and urban change.')
  ];

  const readingPassage1 = `<p><strong>Urban trees.</strong> Cities are increasingly planting trees as a response to rising temperatures, poor air quality, and pressure on drainage systems. Trees provide shade, cool the air through evapotranspiration, capture some pollutants, and slow the movement of rainwater into drains. They can also improve mental well-being and make streets feel safer and more attractive.</p>
  <p>The urban heat island effect occurs because concrete, asphalt, and glass absorb and release heat, while vegetation is often sparse. A mature tree can lower surface temperatures through shade and can reduce air temperature as water evaporates from its leaves. The effect varies with species, soil moisture, wind, and the design of the surrounding streets.</p>
  <p>Species selection is therefore critical. A tree that thrives in a wet, cool climate may struggle in a hot, dry city. Some species also produce allergens, block drains, or become invasive. Planting the same species everywhere creates a uniform landscape that can be quickly damaged by a single pest or disease. A diverse planting plan is more resilient.</p>
  <p>Urban trees need space below ground as well as above it. Roots require enough soil volume to reach water and anchor the tree, but underground services, pavements, and compacted soil often limit growth. Young trees also need watering, pruning, and protection from damage during their first years. These maintenance costs continue long after planting, so short-term planting programmes can leave cities with trees that decline or die.</p>
  <p>Canopy cover is not distributed equally. Wealthier neighbourhoods often have more trees, while poorer areas may have fewer and smaller trees, more heat, and less shade. The term tree equity describes efforts to correct this imbalance. It is not enough to increase the total number of trees; the benefits need to reach the people who face the greatest heat and health risks.</p>
  <p>The phrase right tree, right place captures the central planning principle. The right species must match the site’s climate, soil, available space, and management capacity. Residents can contribute through citizen science, recording tree health, damage, and seasonal changes. Such data can help councils target maintenance and choose future species. Urban forestry is therefore not a single act of planting but a long-term public commitment.</p>`;

  const readingPassage2 = `<p><strong>Forgetting as a process.</strong> Forgetting is often treated as a failure of memory, but it can also be understood as part of a system that manages too much information. A memory system that retained every detail would struggle to identify what is current, relevant, or useful. Forgetting can remove outdated information and reduce competition between similar memories.</p>
  <p>One cause of forgetting is interference. When two experiences are similar, the memory of one can make the other harder to retrieve. A new password, for example, may compete with an old one. Forgetting the old password is inconvenient, but keeping both equally available can create confusion. In this sense, some forgetting is adaptive: it reduces conflict between old and new knowledge.</p>
  <p>Retrieval also depends on cues. A retrieval cue is a trigger that helps bring a memory back, such as a smell, a place, or a question. Context-dependent memory describes the way recall improves when the environment resembles the original learning environment. Students who study in several different settings may therefore build more flexible access to what they have learned.</p>
  <p>Sleep plays a role in both consolidation and filtering. During sleep, the brain strengthens some connections and weakens others. This process may help generalise knowledge while discarding details that are not needed. The metaphor of pruning is often used: weak connections are removed while important pathways are strengthened. The metaphor is imperfect, but it captures the selective nature of memory.</p>
  <p>Technology changes the picture. Searching online for a fact can reduce memory for the detail itself, a phenomenon sometimes linked to cognitive offloading. Using an external tool to store information is not necessarily harmful; it can free attention for other tasks. However, offloading may reduce the depth of memory when people rely on search instead of trying to retrieve information themselves.</p>
  <p>Not all forgetting is useful. Clinical forgetting occurs when memory loss disrupts daily life, and it can be a sign of neurological disease. The difference between adaptive forgetting and harmful forgetting is partly a matter of degree and context. A balanced view recognises that memory is not a warehouse but a dynamic system that selects, updates, and sometimes lets go.</p>
  <p>For students, the practical lesson is that rereading is often less effective than retrieval practice. Testing yourself, spacing study over time, and varying the context can strengthen access to knowledge. Forgetting is not simply the enemy of learning; it is part of the background against which learning happens.</p>`;

  const readingPassage3 = `<p><strong>The repair question.</strong> For much of the twentieth century, economic growth depended on people buying new products. Many goods were designed to be replaced rather than repaired, a practice often called planned obsolescence. Sometimes products were given a shorter physical life; sometimes they were made difficult to open, update, or find parts for. The result was a culture in which replacement became the default response to failure.</p>
  <p>The right-to-repair movement argues that consumers should have access to parts, tools, manuals, and software that allow independent repair. One barrier is parts pairing, where a device’s software recognises only components supplied by the manufacturer. Even a functional replacement may be rejected unless it is authorised. Warranty terms can also discourage repair, because using an independent shop may be presented as a reason to void coverage.</p>
  <p>Repair has clear environmental advantages. Manufacturing a new product requires materials, energy, and transport, while repair can extend the life of what already exists. Keeping products in use is central to the idea of a circular economy, in which materials circulate for as long as possible instead of moving quickly from purchase to waste. Repair shops can also create local employment and preserve skills that are otherwise lost.</p>
  <p>Manufacturers raise legitimate concerns. They argue that repair rules can affect safety, particularly for products with batteries, electrical systems, or medical functions. They also warn that unauthorised repairs may reduce quality or slow innovation. These arguments have some force, but they can also be used to protect market control. The policy question is how to allow safe, high-quality repair without removing incentives to improve products.</p>
  <p>The economics are not always simple. Repair may cost more than replacement in the short term, especially when parts are expensive or labour is scarce. Consumers may lack time, tools, or confidence. A repair policy that focuses only on legal access may therefore have limited effect if the practical barriers remain.</p>
  <p>Legislation can change the balance by requiring access to parts, information, and diagnostic tools. It can also set rules for warranties and for the availability of updates. Yet repair is not always the best option: an inefficient old appliance may use more energy than a newer model, and some repairs may be unsafe. A sensible approach compares the whole lifecycle of the product rather than treating repair as an automatic good.</p>
  <p>The debate is therefore about more than screws and manuals. It concerns who controls product knowledge, how long goods should last, and how the costs of waste are shared. A circular economy needs both better products and better repair systems, supported by information that consumers and independent businesses can actually use.</p>`;

  const readingSections = [
    {
      id: 'ielts-reading-1-1',
      title: 'Reading Passage 1 · Urban Trees',
      minutes: 20,
      type: 'reading',
      instructions: 'Read the passage and answer the questions. There is no extra transfer time.',
      passageHtml: readingPassage1
    },
    {
      id: 'ielts-reading-1-2',
      title: 'Reading Passage 2 · Forgetting',
      minutes: 20,
      type: 'reading',
      instructions: 'Read the passage and answer the questions. There is no extra transfer time.',
      passageHtml: readingPassage2
    },
    {
      id: 'ielts-reading-1-3',
      title: 'Reading Passage 3 · The Economics of Repair',
      minutes: 20,
      type: 'reading',
      instructions: 'Read the passage and answer the questions. There is no extra transfer time.',
      passageHtml: readingPassage3
    }
  ];

  const readingQuestions = [
    q('ielts-r1-q1', 'ielts-reading-1-1', 'Passage 1 · Main idea', 'ielts-2-1', 'What is the main purpose of the passage?', ['To argue that cities should stop planting trees', 'To explain the benefits and difficulties of urban tree programmes', 'To compare tree species in tropical forests', 'To describe how to grow trees in pots'], 1, 'The passage presents benefits, planning challenges, maintenance, and equity.'),
    q('ielts-r1-q2', 'ielts-reading-1-1', 'Passage 1 · Heat', 'ielts-2-1', 'What causes the urban heat island effect?', ['Too much vegetation', 'Heat-absorbing surfaces and limited vegetation', 'Strong winds', 'Heavy rainfall'], 1, 'Concrete, asphalt, and glass absorb heat while vegetation is sparse.'),
    q('ielts-r1-q3', 'ielts-reading-1-1', 'Passage 1 · Cooling', 'ielts-2-1', 'How does evapotranspiration help cool the air?', ['It blocks sunlight completely', 'Water released by leaves evaporates and cools the air', 'It increases wind speed', 'It reduces soil moisture'], 1, 'Water evaporating from leaves has a cooling effect.'),
    q('ielts-r1-q4', 'ielts-reading-1-1', 'Passage 1 · Benefits', 'ielts-2-3', 'Which benefit is NOT mentioned in the passage?', ['Shade', 'Air quality', 'Mental well-being', 'Reduced traffic congestion'], 3, 'Traffic congestion is not listed among the tree benefits.'),
    q('ielts-r1-q5', 'ielts-reading-1-1', 'Passage 1 · Species', 'ielts-2-3', 'Why is species selection important?', ['All species grow at the same rate', 'Urban conditions vary and some species are vulnerable', 'Only one species is available', 'Trees do not affect allergies'], 1, 'A species suited to one climate may struggle in another, and some cause problems.'),
    q('ielts-r1-q6', 'ielts-reading-1-1', 'Passage 1 · Equity', 'ielts-2-2', 'What does “tree equity” refer to?', ['The price of trees', 'The unequal distribution of canopy cover', 'The age of trees', 'The number of species in a forest'], 1, 'Tree equity describes efforts to correct unequal canopy cover and its benefits.'),
    q('ielts-r1-q7', 'ielts-reading-1-1', 'Passage 1 · Soil', 'ielts-2-3', 'Why does soil volume matter for urban trees?', ['Roots need space to reach water and grow', 'It makes trees grow faster in pots', 'It prevents all pests', 'It reduces the need for sunlight'], 0, 'Roots need enough soil to reach water and anchor the tree.'),
    q('ielts-r1-q8', 'ielts-reading-1-1', 'Passage 1 · Maintenance', 'ielts-2-3', 'Why do urban tree programmes need long-term budgets?', ['Trees stop growing after planting', 'Maintenance continues after planting', 'All trees die within a year', 'Planting is illegal without a budget'], 1, 'Young trees need watering, pruning, and protection after planting.'),
    q('ielts-r1-q9', 'ielts-reading-1-1', 'Passage 1 · Resilience', 'ielts-2-2', 'Why is planting the same species everywhere risky?', ['It makes streets too colourful', 'Pests and diseases can spread quickly', 'It reduces soil volume', 'It increases rainfall'], 1, 'A uniform landscape can be damaged by a single pest or disease.'),
    q('ielts-r1-q10', 'ielts-reading-1-1', 'Passage 1 · Planning', 'ielts-2-3', 'What does “right tree, right place” mean?', ['Planting the tallest tree available', 'Matching species to site conditions', 'Planting only native trees', 'Planting trees in every available space'], 1, 'The phrase means matching the species to climate, soil, space, and management capacity.'),
    q('ielts-r1-q11', 'ielts-reading-1-1', 'Passage 1 · Citizens', 'ielts-2-3', 'What role can citizen science play?', ['It replaces all council planning', 'It collects data on tree health and damage', 'It guarantees tree survival', 'It removes the need for maintenance'], 1, 'Residents can record tree health, damage, and seasonal changes.'),
    q('ielts-r1-q12', 'ielts-reading-1-1', 'Passage 1 · Attitude', 'ielts-2-2', 'What is the author’s attitude towards urban tree programmes?', ['Completely opposed', 'Supportive but cautious', 'Uninterested', 'Certain that planting alone is enough'], 1, 'The passage supports trees but stresses planning, equity, and long-term care.'),
    q('ielts-r1-q13', 'ielts-reading-1-1', 'Passage 1 · Inference', 'ielts-2-2', 'What can be inferred about a successful urban tree programme?', ['It needs only a single planting day', 'It requires planning and sustained funding', 'It should use one species', 'It should avoid resident involvement'], 1, 'The passage repeatedly emphasizes planning, diversity, maintenance, and long-term commitment.'),

    q('ielts-r2-q14', 'ielts-reading-1-2', 'Passage 2 · Main idea', 'ielts-2-1', 'What is the main idea of the passage?', ['Forgetting is always a sign of disease', 'Forgetting can be adaptive but also costly', 'Memory should retain every detail', 'Technology has destroyed human memory'], 1, 'The passage presents forgetting as partly useful and partly harmful.'),
    q('ielts-r2-q15', 'ielts-reading-1-2', 'Passage 2 · Cues', 'ielts-2-3', 'What is a retrieval cue?', ['A trigger that helps access a memory', 'A type of sleep stage', 'A method of deleting memories', 'A sign of neurological disease'], 0, 'A cue is a trigger such as a smell, place, or question.'),
    q('ielts-r2-q16', 'ielts-reading-1-2', 'Passage 2 · Interference', 'ielts-2-2', 'What is interference?', ['Memories disappearing without a cause', 'Similar memories competing with each other', 'A technique for faster reading', 'A form of sleep deprivation'], 1, 'Similar experiences can make each other harder to retrieve.'),
    q('ielts-r2-q17', 'ielts-reading-1-2', 'Passage 2 · Adaptive', 'ielts-2-2', 'Why can forgetting outdated information be useful?', ['It reduces conflict with current information', 'It makes all memories permanent', 'It prevents sleep', 'It increases interference'], 0, 'Letting go of old information can reduce competition with new knowledge.'),
    q('ielts-r2-q18', 'ielts-reading-1-2', 'Passage 2 · Context', 'ielts-2-3', 'What is context-dependent memory?', ['Memory that improves when the environment resembles the learning environment', 'Memory that never changes', 'Memory for faces only', 'Memory that is stored online'], 0, 'Recall improves when the context matches the original learning setting.'),
    q('ielts-r2-q19', 'ielts-reading-1-2', 'Passage 2 · Sleep', 'ielts-2-2', 'What does the passage say about sleep and memory?', ['Sleep has no effect on memory', 'Sleep consolidates some memories and weakens others', 'Sleep erases all memories', 'Sleep only affects physical skills'], 1, 'Sleep strengthens some connections and weakens others.'),
    q('ielts-r2-q20', 'ielts-reading-1-2', 'Passage 2 · Technology', 'ielts-2-2', 'What effect can searching online have on memory?', ['It always improves memory for details', 'It may reduce memory for the detail itself', 'It prevents cognitive offloading', 'It removes the need for retrieval cues'], 1, 'The passage says search can reduce memory for the detail itself.'),
    q('ielts-r2-q21', 'ielts-reading-1-2', 'Passage 2 · Offloading', 'ielts-2-3', 'What is cognitive offloading?', ['Using external tools to reduce memory load', 'Forgetting a password', 'Sleeping less to study more', 'Repeating information aloud'], 0, 'It means using an external tool to store or manage information.'),
    q('ielts-r2-q22', 'ielts-reading-1-2', 'Passage 2 · Attitude', 'ielts-2-2', 'What is the author’s overall view of forgetting?', ['It is entirely harmful', 'It is entirely beneficial', 'It is a dynamic part of memory with costs and benefits', 'It is unrelated to learning'], 2, 'The passage argues for a balanced view of forgetting.'),
    q('ielts-r2-q23', 'ielts-reading-1-2', 'Passage 2 · Examples', 'ielts-2-2', 'Which is NOT an example of adaptive forgetting?', ['Letting go of an old password', 'Removing outdated information', 'Forgetting a password you still need', 'Reducing competition between similar memories'], 2, 'Forgetting a password you still need is harmful, not adaptive.'),
    q('ielts-r2-q24', 'ielts-reading-1-2', 'Passage 2 · Metaphor', 'ielts-2-3', 'What does the pruning metaphor describe?', ['Removing weak connections while strengthening important ones', 'Cutting paper into small pieces', 'Deleting all memories', 'Planting new trees'], 0, 'Pruning describes the selective strengthening and weakening of connections.'),
    q('ielts-r2-q25', 'ielts-reading-1-2', 'Passage 2 · Clinical', 'ielts-2-2', 'When does forgetting become clinical?', ['When it happens at night', 'When it disrupts daily life', 'When it involves a password', 'When it occurs during sleep'], 1, 'Clinical forgetting is defined by disruption to daily life.'),
    q('ielts-r2-q26', 'ielts-reading-1-2', 'Passage 2 · Inference', 'ielts-2-2', 'What study method does the passage support?', ['Rereading the same page repeatedly', 'Retrieval practice and spacing', 'Avoiding all tests', 'Studying only in one place'], 1, 'The passage says retrieval practice and spacing are more effective than rereading.'),

    q('ielts-r3-q27', 'ielts-reading-1-3', 'Passage 3 · Main idea', 'ielts-2-1', 'What is the main purpose of the passage?', ['To explain how to repair a smartphone', 'To examine economic and environmental arguments around repair', 'To criticise all manufacturers', 'To describe the history of warranties'], 1, 'The passage examines repair, waste, access, safety, and policy trade-offs.'),
    q('ielts-r3-q28', 'ielts-reading-1-3', 'Passage 3 · Obsolescence', 'ielts-2-3', 'What is planned obsolescence?', ['Designing products with a limited lifespan', 'Repairing products too often', 'Buying second-hand goods', 'Making products last forever'], 0, 'Products are designed to be replaced rather than repaired.'),
    q('ielts-r3-q29', 'ielts-reading-1-3', 'Passage 3 · Parts pairing', 'ielts-2-2', 'What is parts pairing?', ['Matching colours of parts', 'Software locks that require manufacturer parts', 'A method of recycling metals', 'A warranty for new products'], 1, 'Software may reject functional replacement parts unless authorised.'),
    q('ielts-r3-q30', 'ielts-reading-1-3', 'Passage 3 · Environment', 'ielts-2-2', 'Why can repair be environmentally beneficial?', ['It saves materials and energy used to make new products', 'It increases transport emissions', 'It makes products heavier', 'It removes the need for recycling'], 0, 'Repair avoids the materials, energy, and transport needed for a new product.'),
    q('ielts-r3-q31', 'ielts-reading-1-3', 'Passage 3 · Consumers', 'ielts-2-3', 'What practical barriers to repair are mentioned?', ['Cost, time, and access', 'Too many repair shops', 'Excessive warranties', 'Free parts'], 0, 'Consumers may lack time, tools, confidence, or affordable parts.'),
    q('ielts-r3-q32', 'ielts-reading-1-3', 'Passage 3 · Shops', 'ielts-2-3', 'How can right-to-repair rules affect small repair shops?', ['They can benefit from access to parts and manuals', 'They are forced to close', 'They lose all customers', 'They must stop using tools'], 0, 'Access to parts, information, and diagnostic tools can support independent repair.'),
    q('ielts-r3-q33', 'ielts-reading-1-3', 'Passage 3 · Circular economy', 'ielts-2-3', 'What is the central aim of a circular economy?', ['To keep materials in use for as long as possible', 'To increase single-use packaging', 'To shorten product lifespans', 'To eliminate all repair shops'], 0, 'A circular economy keeps materials circulating instead of becoming waste.'),
    q('ielts-r3-q34', 'ielts-reading-1-3', 'Passage 3 · Manufacturers', 'ielts-2-2', 'Which concern do manufacturers raise?', ['Repair always improves safety', 'Repair rules may affect safety and quality', 'Repair reduces innovation completely', 'Consumers refuse to buy new products'], 1, 'Manufacturers argue that repair rules can affect safety and quality.'),
    q('ielts-r3-q35', 'ielts-reading-1-3', 'Passage 3 · Attitude', 'ielts-2-2', 'What is the author’s view of repair?', ['Repair is always the best option', 'Repair is never worthwhile', 'Repair has benefits but is not always the best choice', 'Repair should be banned'], 2, 'The author says repair is not automatically good and should be compared over the lifecycle.'),
    q('ielts-r3-q36', 'ielts-reading-1-3', 'Passage 3 · Culture', 'ielts-2-3', 'What does “throwaway culture” describe?', ['A habit of replacing rather than repairing', 'A method of recycling electronics', 'A type of warranty', 'A repair technique'], 0, 'It describes a default response of replacement rather than repair.'),
    q('ielts-r3-q37', 'ielts-reading-1-3', 'Passage 3 · Legislation', 'ielts-2-2', 'What can repair legislation require?', ['Access to parts, information, and diagnostic tools', 'Free products for all consumers', 'A ban on all new products', 'Mandatory replacement every year'], 0, 'Legislation can require access to parts, information, and diagnostic tools.'),
    q('ielts-r3-q38', 'ielts-reading-1-3', 'Passage 3 · Warranties', 'ielts-2-2', 'How can warranty terms discourage repair?', ['They may void coverage if an independent shop is used', 'They always pay for repairs', 'They make parts cheaper', 'They require manufacturers to repair everything'], 0, 'Using an independent shop may be presented as a reason to void coverage.'),
    q('ielts-r3-q39', 'ielts-reading-1-3', 'Passage 3 · Inference', 'ielts-2-2', 'What can be inferred about good repair policy?', ['It should ignore safety', 'It should balance environmental gains and safety', 'It should ban independent shops', 'It should focus only on legal access'], 1, 'The passage says policy must consider safety, quality, and the whole lifecycle.'),
    q('ielts-r3-q40', 'ielts-reading-1-3', 'Passage 3 · Vocabulary', 'ielts-2-4', 'What does “obsolescence” mean in the passage?', ['The state of no longer being useful or current', 'The process of repairing a product', 'The cost of a new product', 'The length of a warranty'], 0, 'Obsolescence refers to products becoming outdated or no longer useful.')
  ];

  const listening = {
    id: 'ielts-listening-mock-1',
    title: 'IELTS Listening Full Mock 1',
    trackId: 'ielts',
    examType: 'IELTS_LISTENING',
    lessonId: 'ielts-listening-mock-1',
    year: 1,
    targetPercent: 75,
    passNote: 'Original practice mock. Target 75% is a study signal, not an official IELTS band. Audio is TTS, not a human recording.',
    source: 'ielts',
    sections: listeningSections,
    questions: listeningQuestions,
    formNumber: 1,
    durationMinutes: 40
  };

  const reading = {
    id: 'ielts-reading-mock-1',
    title: 'IELTS Reading Full Mock 1',
    trackId: 'ielts',
    examType: 'IELTS_READING',
    lessonId: 'ielts-reading-mock-1',
    year: 1,
    targetPercent: 75,
    passNote: 'Original practice mock. Target 75% is a study signal, not an official IELTS band.',
    source: 'ielts',
    sections: readingSections,
    questions: readingQuestions,
    formNumber: 2,
    durationMinutes: 60
  };

  const writingTask1Html = `<p><strong>Writing Task 1</strong></p>
    <p>The table shows the average weekly household spending on four categories in one country in 2000, 2010 and 2020.</p>
    <table>
      <thead><tr><th>Category</th><th>2000 (£)</th><th>2010 (£)</th><th>2020 (£)</th></tr></thead>
      <tbody>
        <tr><td>Food</td><td>60</td><td>70</td><td>75</td></tr>
        <tr><td>Housing</td><td>80</td><td>95</td><td>120</td></tr>
        <tr><td>Transport</td><td>45</td><td>50</td><td>55</td></tr>
        <tr><td>Leisure</td><td>30</td><td>40</td><td>45</td></tr>
      </tbody>
    </table>
    <p>Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.</p>`;

  const writingTask2Html = `<p><strong>Writing Task 2</strong></p>
    <p>Some people believe that public libraries are no longer necessary because information is freely available online. To what extent do you agree or disagree?</p>
    <p>Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.</p>`;

  const writingSections = [
    {
      id: 'ielts-writing-1-1',
      title: 'Writing · Task 1 + Task 2',
      minutes: 60,
      type: 'writing',
      instructions: 'You have 60 minutes. Spend about 20 minutes on Task 1 and 40 minutes on Task 2. Task 2 carries more weight in the real test, so plan before writing.',
      tasks: [
        {
          id: 'ielts-w1-task-1',
          title: 'Task 1 · Household spending',
          minWords: 150,
          recommendedMinutes: 20,
          promptHtml: writingTask1Html
        },
        {
          id: 'ielts-w1-task-2',
          title: 'Task 2 · Public libraries',
          minWords: 250,
          recommendedMinutes: 40,
          promptHtml: writingTask2Html
        }
      ]
    }
  ];

  const speakingPart1Html = `<p><strong>Part 1 · Introduction and interview</strong></p>
    <p>Let’s talk about where you live.</p>
    <ul>
      <li>Do you live in a house or an apartment?</li>
      <li>What do you like most about your area?</li>
      <li>Is there anything you would like to change about it?</li>
      <li>Do you prefer living in a city or in the countryside? Why?</li>
    </ul>`;

  const speakingPart2Html = `<p><strong>Part 2 · Individual long turn</strong></p>
    <p>Describe a difficult skill you learned.</p>
    <p>You should say:</p>
    <ul>
      <li>what the skill was</li>
      <li>why it was difficult for you</li>
      <li>how you learned it</li>
      <li>how you felt when you could do it</li>
    </ul>
    <p>You have 1 minute to prepare. Then speak for 1–2 minutes.</p>`;

  const speakingPart3Html = `<p><strong>Part 3 · Two-way discussion</strong></p>
    <ul>
      <li>Why do some people give up when a skill is difficult to learn?</li>
      <li>Are practical skills as important as academic knowledge? Why?</li>
      <li>How can schools help students become better at learning new skills?</li>
      <li>Do adults find it harder to learn new skills than children? Why or why not?</li>
    </ul>`;

  const speakingSections = [
    {
      id: 'ielts-speaking-1-1',
      title: 'Speaking · Parts 1–3',
      minutes: 14,
      type: 'speaking',
      instructions: 'Record your answers on your phone if possible. For Part 2, use the one-minute preparation time to make brief notes, then speak for 1–2 minutes without stopping.',
      tasks: [
        {
          id: 'ielts-s1-part-1',
          title: 'Introduction and interview',
          recommendedMinutes: 5,
          promptHtml: speakingPart1Html
        },
        {
          id: 'ielts-s1-part-2',
          title: 'Individual long turn',
          recommendedMinutes: 4,
          promptHtml: speakingPart2Html,
          cueCardHtml: '<strong>Preparation notes</strong><ul><li>What was the skill?</li><li>Why was it hard?</li><li>How did you learn it?</li><li>How did success feel?</li></ul>'
        },
        {
          id: 'ielts-s1-part-3',
          title: 'Two-way discussion',
          recommendedMinutes: 5,
          promptHtml: speakingPart3Html
        }
      ]
    }
  ];

  const writing = {
    id: 'ielts-writing-mock-1',
    title: 'IELTS Writing Full Mock 1',
    trackId: 'ielts',
    examType: 'IELTS_WRITING',
    lessonId: 'ielts-writing-mock-1',
    year: 1,
    targetPercent: 75,
    passNote: 'Original practice mock. Self-assess with the rubric; this is not an official IELTS band or examiner score.',
    source: 'ielts',
    sections: writingSections,
    questions: [],
    formNumber: 3,
    durationMinutes: 60
  };

  const speaking = {
    id: 'ielts-speaking-mock-1',
    title: 'IELTS Speaking Full Mock 1',
    trackId: 'ielts',
    examType: 'IELTS_SPEAKING',
    lessonId: 'ielts-speaking-mock-1',
    year: 1,
    targetPercent: 75,
    passNote: 'Original practice mock. Record yourself and self-assess with the rubric; this is not an official IELTS band or examiner score.',
    source: 'ielts',
    sections: speakingSections,
    questions: [],
    formNumber: 4,
    durationMinutes: 14
  };

  const exports = { listening, reading, writing, speaking };
  if (window.NEZHA_EXAMS) {
    window.NEZHA_EXAMS.registerMany([listening, reading, writing, speaking], { source: 'ielts' });
  }
  return exports;
})();
