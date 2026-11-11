// IELTS Academic track: original study content for a 7.0+ target.
// This is a learning scaffold, not official IELTS material.
window.NEZHA_IELTS = (() => {
  const curriculum = window.NEZHA_CURRICULUM;
  if (!curriculum || !Array.isArray(curriculum.tracks)) return null;

  const fc = (id, front, back) => ({ id, front, back });
  const mcq = (id, question, options, answer, explanation) => ({
    id,
    type: 'mcq',
    question,
    options,
    answer,
    explanation
  });
  const tf = (id, question, answer, explanation) => ({
    id,
    type: 'tf',
    question,
    options: ['Đúng', 'Sai'],
    answer: answer ? 0 : 1,
    explanation
  });
  const lesson = (
    id,
    title,
    estimatedMinutes,
    objectives,
    contentHtml,
    keyTerms,
    flashcards,
    quiz,
    feynman
  ) => ({
    id,
    title,
    estimatedMinutes,
    objectives,
    contentHtml,
    keyTerms,
    flashcards,
    quiz,
    feynman
  });
  const mod = (id, title, description, lessons) => ({ id, title, description, lessons });

  const orientation = mod(
    'ielts-mod-0',
    'Orientation & 7.0+ Plan',
    'Understand the test, set a target, and build a weekly feedback loop.',
    [
      lesson(
        'ielts-0-1',
        'IELTS Academic format & 7.0+ targets',
        30,
        [
          'Describe the four IELTS Academic papers',
          'Understand how band scores combine',
          'Set realistic section targets for an overall 7.0+'
        ],
        `<p><strong>The four papers.</strong> IELTS Academic has Listening, Reading, Writing, and Speaking. Listening has four parts and 40 questions in about 30 minutes. Reading has three passages, 40 questions, and 60 minutes. Writing has two tasks in 60 minutes: Task 1 is at least 150 words and Task 2 is at least 250 words. Speaking is a face-to-face interview in three parts, usually 11–14 minutes.</p>
        <p><strong>Band scores.</strong> Each skill receives a band from 0 to 9. The overall band is the average of the four skills, rounded to the nearest 0.5. An overall 7.0 can be reached with different combinations, for example 7.5 Listening, 7.5 Reading, 6.5 Writing, and 6.5 Speaking. This is an illustration, not a guarantee.</p>
        <p><strong>What 7.0+ usually requires.</strong> At band 7, you can follow detailed arguments, manage time under pressure, write a clear position with developed support, and speak at length with flexible language. Aim for accuracy and control, not just “advanced” words or memorised phrases.</p>
        <ul>
          <li>Listening: predict before you hear, track paraphrase, and protect spelling.</li>
          <li>Reading: move quickly, locate evidence, and separate “not stated” from “false”.</li>
          <li>Writing: answer the task, organise ideas, and leave time to revise.</li>
          <li>Speaking: extend answers, explain reasons, and keep going without long pauses.</li>
        </ul>
        <p><strong>Practice target.</strong> A rough 7.0 practice target is around 30–32 correct out of 40 in Listening and Reading, but raw-score conversion changes by test. Writing and Speaking are judged on criteria, not a fixed number of correct answers. Use this as a planning signal, not an official score.</p>`,
        [
          { term: 'Overall band', definition: 'The average of the four skill bands, rounded to the nearest 0.5.' },
          { term: 'Raw score', definition: 'The number of correct answers before conversion to a band.' },
          { term: 'Band descriptor', definition: 'The public description of performance at each band level.' },
          { term: 'Task response', definition: 'How fully and relevantly a Writing task is answered.' }
        ],
        [
          fc('fc-ielts-0-1-1', 'How long is IELTS Academic Reading?', 'Three passages, 40 questions, 60 minutes.'),
          fc('fc-ielts-0-1-2', 'How is the overall band calculated?', 'Average the four skill bands and round to the nearest 0.5.'),
          fc('fc-ielts-0-1-3', 'What does a 7.0 target require in Writing?', 'A clear position, developed ideas, flexible organisation, and controlled language with frequent error-free sentences.')
        ],
        [
          mcq('q-ielts-0-1-1', 'How many questions are in IELTS Academic Reading?', ['20', '30', '40', '50'], 2, 'Reading has 40 questions across three passages.'),
          mcq('q-ielts-0-1-2', 'How long is the Writing paper?', ['30 minutes', '45 minutes', '60 minutes', '90 minutes'], 2, 'Writing Task 1 and Task 2 share 60 minutes.'),
          tf('q-ielts-0-1-3', 'The overall band is the highest of the four skill bands.', false, 'The overall band is the average, rounded to the nearest 0.5.')
        ],
        'Explain the four IELTS Academic papers and one realistic target for each skill if the overall goal is 7.0.'
      ),
      lesson(
        'ielts-0-2',
        'Diagnostic & 8-week study plan',
        30,
        [
          'Audit your current strengths and weaknesses',
          'Build a weekly plan around feedback',
          'Choose the first section to improve'
        ],
        `<p><strong>Start with evidence.</strong> Do one short task from each skill before planning: a Listening section, one Reading passage, one Writing Task 2 plan, and a two-minute Speaking answer recorded on your phone. Score what can be scored, then write one sentence about the main problem in each skill.</p>
        <p><strong>Use a simple diagnostic.</strong> Rate each skill from 1 to 5 for accuracy, speed, and confidence. A low accuracy score means review the basics. A low speed score means practise timed sets. A low confidence score means repeat the same task type until the process feels automatic.</p>
        <p><strong>An 8-week rhythm.</strong> A useful week contains one diagnostic block, two focused practice blocks, one review block, and one full section under time. For a 7.0+ target, plan roughly 10–15 focused hours per week and adjust after two weeks. Quality of review matters more than adding more questions.</p>
        <ul>
          <li>Monday: learn one question type and do 10–15 questions.</li>
          <li>Tuesday: timed practice on that question type.</li>
          <li>Thursday: Writing or Speaking feedback block.</li>
          <li>Saturday: full section under exam time.</li>
          <li>Sunday: review errors and update the next week.</li>
        </ul>
        <p><strong>Review loop.</strong> For every wrong answer, write the question type, why the answer was wrong, the evidence you missed, and the action for next time. Do not just read the answer key.</p>`,
        [
          { term: 'Diagnostic', definition: 'A short baseline task used to identify current strengths and weaknesses.' },
          { term: 'Focused practice', definition: 'Deliberate work on one question type or skill with immediate review.' },
          { term: 'Timed section', definition: 'A full section completed under the real time limit.' },
          { term: 'Review loop', definition: 'A repeated process of checking errors, finding causes, and changing the next attempt.' }
        ],
        [
          fc('fc-ielts-0-2-1', 'What should you record after a wrong answer?', 'Question type, cause, missed evidence, and the next action.'),
          fc('fc-ielts-0-2-2', 'Why start with a diagnostic?', 'It gives evidence for what to study instead of guessing.'),
          fc('fc-ielts-0-2-3', 'What is a useful weekly rhythm?', 'Learn, practise under time, get feedback, and review errors.')
        ],
        [
          mcq('q-ielts-0-2-1', 'What is the main purpose of a diagnostic?', ['To predict the official band', 'To find current weaknesses', 'To memorise answers', 'To avoid timed practice'], 1, 'A diagnostic gives evidence about what to improve.'),
          mcq('q-ielts-0-2-2', 'Which activity best builds speed?', ['Reading the answer key only', 'Timed section practice', 'Copying model essays', 'Watching videos without notes'], 1, 'Speed improves through timed practice followed by review.'),
          tf('q-ielts-0-2-3', 'More practice questions always matter more than reviewing errors.', false, 'Reviewing why errors happen is essential; otherwise the same mistakes repeat.')
        ],
        'Design a one-week IELTS plan for yourself using the diagnostic, focused practice, timed practice, and review loop.'
      ),
      lesson(
        'ielts-0-3',
        'Band descriptors, error log & mock debrief',
        30,
        [
          'Understand the four Writing and Speaking criteria',
          'Classify errors in a useful way',
          'Run a short mock debrief'
        ],
        `<p><strong>Writing criteria.</strong> Task 1 is judged on Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. Task 2 uses Task Response instead of Task Achievement. At band 7, the response addresses the task, presents a clear position, develops main ideas, uses cohesion flexibly, and shows a range of vocabulary and grammar with frequent error-free sentences.</p>
        <p><strong>Speaking criteria.</strong> Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. At band 7, you can speak at length, use connectives flexibly, use some less common vocabulary, and produce complex sentences with some errors that do not prevent understanding.</p>
        <p><strong>Error log.</strong> Use four categories: content, organisation, language, and test technique. “Content” means you missed part of the task. “Organisation” means the logic was hard to follow. “Language” means grammar or vocabulary failed. “Technique” means timing, instructions, spelling, or answer transfer.</p>
        <p><strong>Mock debrief.</strong> After a mock, wait before checking answers. Then mark every wrong answer, group the errors, and choose one fix for the next week. A debrief that produces three specific actions is more useful than a page of scores.</p>
        <ul>
          <li>What was the question type?</li>
          <li>Where was the evidence in the text or audio?</li>
          <li>Was the problem knowledge, speed, or attention?</li>
          <li>What will you do differently in the next attempt?</li>
        </ul>`,
        [
          { term: 'Coherence', definition: 'How clearly ideas are organised and connected.' },
          { term: 'Cohesion', definition: 'The use of linking devices and references to connect ideas.' },
          { term: 'Lexical resource', definition: 'The range, accuracy, and appropriateness of vocabulary.' },
          { term: 'Grammatical range and accuracy', definition: 'The variety of structures used and how many errors affect communication.' }
        ],
        [
          fc('fc-ielts-0-3-1', 'What are the four Writing Task 2 criteria?', 'Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.'),
          fc('fc-ielts-0-3-2', 'What are the four Speaking criteria?', 'Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation.'),
          fc('fc-ielts-0-3-3', 'What makes a mock debrief useful?', 'It groups errors and produces specific actions for the next attempt.')
        ],
        [
          mcq('q-ielts-0-3-1', 'Which criterion is used in Writing Task 2 but not Task 1?', ['Task Response', 'Coherence and Cohesion', 'Lexical Resource', 'Grammatical Range and Accuracy'], 0, 'Task 1 uses Task Achievement; Task 2 uses Task Response.'),
          mcq('q-ielts-0-3-2', 'Which Speaking criterion covers how easily a listener understands you?', ['Pronunciation', 'Task Response', 'Coherence', 'Lexical Resource'], 0, 'Pronunciation affects how easily the listener understands the message.'),
          tf('q-ielts-0-3-3', 'A debrief should end with specific actions for the next week.', true, 'Specific actions turn feedback into improvement.')
        ],
        'Explain how you would debrief a weak IELTS mock without simply counting correct answers.'
      )
    ]
  );

  const listening = mod(
    'ielts-mod-1',
    'Listening',
    'Prediction, paraphrase, spelling, and question-type control for all four parts.',
    [
      lesson(
        'ielts-1-1',
        'Part 1–2: form, note, table completion',
        35,
        [
          'Predict the type of answer before listening',
          'Respect word limits and spelling',
          'Capture names, numbers, dates, and addresses accurately'
        ],
        `<p><strong>What to expect.</strong> Part 1 is usually a conversation about a practical situation. Part 2 is often a monologue about a place, service, or event. Completion tasks ask you to write words or numbers from the recording into a form, table, or set of notes.</p>
        <p><strong>Read before the audio.</strong> Use the pause to identify the word class needed: a name, a place, a number, a date, a price, or a noun phrase. Look at the word limit, for example “NO MORE THAN TWO WORDS AND/OR A NUMBER”. If you write three words, the answer is wrong even if the meaning is correct.</p>
        <p><strong>Listen for corrections.</strong> Speakers often give a wrong detail and then correct it: “The course starts on the 12th — sorry, the 19th.” The final version is usually the answer. Listen for spelling too. A name may be spelled letter by letter, and a wrong letter loses the mark.</p>
        <p><strong>Common answer types.</strong> Names, addresses, postcodes, phone numbers, dates, times, prices, quantities, colours, materials, and simple noun phrases. Write the answer exactly as it is heard unless the instruction says otherwise.</p>
        <ul>
          <li>Predict word class before the audio starts.</li>
          <li>Underline the word limit.</li>
          <li>Expect corrections and distractors.</li>
          <li>Check spelling and singular/plural after the audio.</li>
        </ul>`,
        [
          { term: 'Word limit', definition: 'The maximum number of words allowed in a written answer.' },
          { term: 'Distractor', definition: 'A detail that sounds relevant but is not the final correct answer.' },
          { term: 'Correction', definition: 'A speaker changing a detail after first saying something else.' },
          { term: 'Word class', definition: 'The grammatical type of a word, such as noun, verb, or adjective.' }
        ],
        [
          fc('fc-ielts-1-1-1', 'Why underline the word limit?', 'Because an answer over the limit is marked wrong even if the meaning is correct.'),
          fc('fc-ielts-1-1-2', 'What should you do when a speaker corrects a detail?', 'Use the final corrected detail as the answer.'),
          fc('fc-ielts-1-1-3', 'What details should you check after a completion task?', 'Spelling, singular/plural, and the exact word limit.')
        ],
        [
          mcq('q-ielts-1-1-1', 'The instruction says “NO MORE THAN TWO WORDS”. Which answer is acceptable?', ['red leather bag', 'leather bag', 'a large leather bag', 'bags'], 1, '“Leather bag” has two words; the others exceed the limit or are too vague.'),
          mcq('q-ielts-1-1-2', 'What is the best use of the pause before Part 1?', ['Memorise the questions', 'Predict answer types and word limits', 'Write full sentences', 'Check answers from the previous section'], 1, 'Prediction directs attention before the audio begins.'),
          tf('q-ielts-1-1-3', 'A corrected detail is usually a distractor, not the answer.', false, 'The corrected detail is usually the final answer.')
        ],
        'Explain how you would prepare for a Part 1 form-completion task in the 30 seconds before the audio starts.'
      ),
      lesson(
        'ielts-1-2',
        'Part 3–4: MCQ, matching & maps',
        35,
        [
          'Recognise paraphrase between question and audio',
          'Separate correct details from distractors',
          'Follow direction and location language in map tasks'
        ],
        `<p><strong>Part 3</strong> is usually a discussion between two or more speakers, often about study or research. <strong>Part 4</strong> is usually a monologue, often a lecture. The language becomes more academic, and the correct answer is often expressed with different words from the question.</p>
        <p><strong>MCQ traps.</strong> All options may be mentioned. The test is not “which words did you hear?” but “which option answers the question?” A speaker may mention an option and reject it: “We considered the library, but it was too noisy.” Hearing the word is not enough.</p>
        <p><strong>Matching.</strong> Read the list and predict synonyms. Listen for the relationship between the item and the description, not just the topic. If two answers seem possible, wait for the qualifier: “mainly”, “originally”, “in the long term”.</p>
        <p><strong>Maps.</strong> Find the starting point, then follow direction language: opposite, next to, at the end of, turn left, just past, across from, in the corner. Mark the map as you listen. Do not wait until the end to reconstruct the route.</p>
        <ul>
          <li>Underline the difference between options.</li>
          <li>Expect synonyms and rejected options.</li>
          <li>Listen for qualifiers and corrections.</li>
          <li>Mark maps while the audio is playing.</li>
        </ul>`,
        [
          { term: 'Paraphrase', definition: 'Expressing the same idea with different words.' },
          { term: 'Qualifier', definition: 'A word that limits or adjusts meaning, such as mainly, usually, or originally.' },
          { term: 'Signpost', definition: 'A word or phrase that shows the direction of the talk, such as however or another reason.' },
          { term: 'Rejected option', definition: 'An option mentioned but then dismissed by the speaker.' }
        ],
        [
          fc('fc-ielts-1-2-1', 'Why can hearing an option word be a trap?', 'The speaker may mention it and then reject it; the correct answer must fit the question.'),
          fc('fc-ielts-1-2-2', 'What should you do in a map task?', 'Find the starting point and mark directions while listening.'),
          fc('fc-ielts-1-2-3', 'What role do qualifiers play?', 'They limit meaning and help distinguish a correct answer from a similar distractor.')
        ],
        [
          mcq('q-ielts-1-2-1', 'A speaker says, “We looked at the library, but it was too noisy.” What does this mean for an MCQ?', ['The library is the answer', 'The library is a rejected option', 'The library is not mentioned', 'The library is the starting point'], 1, 'The option is mentioned but rejected because it was too noisy.'),
          mcq('q-ielts-1-2-2', 'Which phrase is most useful for a map task?', ['In conclusion', 'Just past the entrance', 'On the other hand', 'As a result'], 1, '“Just past the entrance” gives a location and direction.'),
          tf('q-ielts-1-2-3', 'In Part 3, the correct answer is always expressed with the same words as the question.', false, 'Paraphrase is common; the same words may be a trap.')
        ],
        'Describe your process for an MCQ where all three options are mentioned in the recording.'
      ),
      lesson(
        'ielts-1-3',
        'Prediction, paraphrase & signposting',
        30,
        [
          'Use grammar and context to predict answers',
          'Recognise common paraphrase patterns',
          'Follow signposting through lectures'
        ],
        `<p><strong>Prediction is not guessing.</strong> Before the audio, use the question grammar to predict the answer shape. “The workshop will be held in the ______” needs a place. “The main advantage is ______” needs a benefit, often a noun phrase. Prediction gives your ear a target.</p>
        <p><strong>Paraphrase patterns.</strong> Watch for word-family changes (decide → decision), synonyms (cheap → affordable), opposites with a negative (not expensive → affordable), and grammatical changes (the city’s population → the population of the city). The answer often uses different words from the question.</p>
        <p><strong>Signposting in lectures.</strong> Listen for “first”, “another”, “however”, “the main reason”, “in contrast”, “to sum up”. These phrases tell you when a new point starts and when the speaker is correcting or limiting an earlier point.</p>
        <p><strong>Spelling discipline.</strong> Keep a personal list of words you often miss: accommodation, necessary, receipt, schedule, questionnaire, environment. In Listening, a correct idea with wrong spelling may still lose the mark.</p>
        <ul>
          <li>Predict answer shape from grammar.</li>
          <li>Expect synonyms and word-family changes.</li>
          <li>Use signposts to track structure.</li>
          <li>Review spelling errors separately from comprehension errors.</li>
        </ul>`,
        [
          { term: 'Prediction', definition: 'Using context and grammar to anticipate the answer before listening.' },
          { term: 'Word family', definition: 'A group of words built from the same root, such as decide, decision, decisive.' },
          { term: 'Signposting', definition: 'Language that signals the structure or direction of a talk.' },
          { term: 'Spelling error', definition: 'A wrong letter pattern that can make an otherwise correct answer incorrect.' }
        ],
        [
          fc('fc-ielts-1-3-1', 'How can grammar help before listening?', 'It predicts the answer type, such as a place, number, or noun phrase.'),
          fc('fc-ielts-1-3-2', 'Give an example of a word-family paraphrase.', 'Decide → decision.'),
          fc('fc-ielts-1-3-3', 'Why keep a spelling list?', 'Listening answers must be spelled correctly to receive the mark.')
        ],
        [
          mcq('q-ielts-1-3-1', 'The question says “The main benefit is ______”. What answer type is likely?', ['A date', 'A benefit or noun phrase', 'A person’s name', 'A map direction'], 1, 'The grammar signals a benefit, often expressed as a noun phrase.'),
          mcq('q-ielts-1-3-2', 'Which is a paraphrase of “not expensive”?', ['Very costly', 'Affordable', 'Luxurious', 'Free of charge'], 1, '“Affordable” expresses a similar idea to “not expensive”.'),
          tf('q-ielts-1-3-3', 'Signposting words can help you notice when the speaker changes direction.', true, 'Words such as however and another signal structure and contrast.')
        ],
        'Explain how prediction, paraphrase, and signposting work together in a Listening Part 4 lecture.'
      ),
      lesson(
        'ielts-1-4',
        'Listening review & mini drill',
        30,
        [
          'Apply a repeatable review method',
          'Separate comprehension errors from spelling errors',
          'Build a short daily listening routine'
        ],
        `<p><strong>Review method.</strong> After a Listening set, do not only check the answer key. Replay the audio and find the exact moment that contains the answer. Write the words you heard, the words in the question, and the paraphrase link between them.</p>
        <p><strong>Error types.</strong> Use four labels: missed signal, wrong prediction, vocabulary gap, and spelling/transfer error. If most errors are spelling, your comprehension may be fine. If most errors are missed signals, practise signposting and prediction.</p>
        <p><strong>Mini drill.</strong> Choose one 30-second section. Listen once and write the key nouns and numbers. Listen again and write the full meaning in one sentence. Then compare with the transcript. This trains selective attention without overwhelming you.</p>
        <p><strong>Daily routine.</strong> Ten minutes of prediction, ten minutes of one section, and ten minutes of transcript review is more useful than one long passive listening session. Keep a notebook of paraphrases: question phrase on the left, audio phrase on the right.</p>
        <ul>
          <li>Replay and locate the evidence.</li>
          <li>Label the error type.</li>
          <li>Write one paraphrase pair per error.</li>
          <li>Repeat the same section after 48 hours.</li>
        </ul>`,
        [
          { term: 'Evidence moment', definition: 'The exact part of the audio that contains the answer.' },
          { term: 'Selective attention', definition: 'Focusing on the information needed for a task while ignoring irrelevant details.' },
          { term: 'Transfer error', definition: 'A mistake made when moving an answer from notes to the answer sheet.' },
          { term: 'Paraphrase pair', definition: 'A question phrase matched with the different words used in the audio.' }
        ],
        [
          fc('fc-ielts-1-4-1', 'What should you find when reviewing a wrong Listening answer?', 'The exact evidence moment and the paraphrase link to the question.'),
          fc('fc-ielts-1-4-2', 'What does a spelling/transfer error mean?', 'You understood the answer but wrote it incorrectly or in the wrong place.'),
          fc('fc-ielts-1-4-3', 'What is a useful 30-minute listening routine?', 'Prediction, one timed section, and transcript review.')
        ],
        [
          mcq('q-ielts-1-4-1', 'You understood the answer but wrote “accomodation”. What error type is this?', ['Missed signal', 'Wrong prediction', 'Vocabulary gap', 'Spelling error'], 3, 'The answer was understood but misspelled.'),
          mcq('q-ielts-1-4-2', 'What is the main purpose of replaying the audio during review?', ['To memorise the whole transcript', 'To locate the evidence for each answer', 'To increase playback speed', 'To avoid reading the transcript'], 1, 'Replaying helps you locate the exact evidence and paraphrase.'),
          tf('q-ielts-1-4-3', 'A paraphrase notebook should link question wording to audio wording.', true, 'That link is the core skill being trained.')
        ],
        'Explain your review process for a Listening section where you understood the audio but lost marks on spelling.'
      )
    ]
  );

  const reading = mod(
    'ielts-mod-2',
    'Reading Academic',
    'Speed, evidence, and question-type control across three academic passages.',
    [
      lesson(
        'ielts-2-1',
        'Skimming, scanning & 20-minute passages',
        35,
        [
          'Read for structure before detail',
          'Scan for names, numbers, and keywords',
          'Budget 20 minutes per passage'
        ],
        `<p><strong>The reading problem.</strong> You do not need to understand every word. You need to find evidence quickly and answer accurately. Academic Reading has three passages and 40 questions in 60 minutes, so the average is 20 minutes per passage including transfer and checking.</p>
        <p><strong>Skim first.</strong> Read the title, first paragraph, first sentence of each paragraph, and the conclusion. This gives you a map of the passage: topic, purpose, and main stages. Do not spend five minutes reading every detail before looking at the questions.</p>
        <p><strong>Scan for anchors.</strong> Names, dates, numbers, technical terms, and capitalised words are easy to locate. For abstract questions, use synonyms and repeated concepts rather than exact words.</p>
        <p><strong>Question order.</strong> Many question sets follow the order of the passage, but matching headings and matching information may not. Decide the order before you start. If a question is taking too long, mark it and move on.</p>
        <ul>
          <li>2–3 minutes: skim structure.</li>
          <li>12–14 minutes: answer questions with evidence.</li>
          <li>3–4 minutes: check tricky items and transfer.</li>
          <li>Never leave a blank; there is no penalty for guessing.</li>
        </ul>`,
        [
          { term: 'Skimming', definition: 'Reading quickly for the main idea and structure.' },
          { term: 'Scanning', definition: 'Searching for specific information such as names, numbers, or keywords.' },
          { term: 'Anchor', definition: 'A distinctive word or detail that is easy to locate in a passage.' },
          { term: 'Evidence', definition: 'The part of the passage that supports an answer.' }
        ],
        [
          fc('fc-ielts-2-1-1', 'What should you read first when skimming?', 'Title, first paragraph, first sentence of each paragraph, and conclusion.'),
          fc('fc-ielts-2-1-2', 'Why are names and numbers useful?', 'They are easy anchors for scanning.'),
          fc('fc-ielts-2-1-3', 'What should you do if a question takes too long?', 'Mark it, move on, and return with remaining time.')
        ],
        [
          mcq('q-ielts-2-1-1', 'What is the main purpose of skimming?', ['To memorise every detail', 'To understand structure and main ideas', 'To check spelling', 'To learn new vocabulary'], 1, 'Skimming builds a map of the passage before detailed questions.'),
          mcq('q-ielts-2-1-2', 'Which detail is easiest to scan for?', ['A synonym for a concept', 'A date or name', 'An implied opinion', 'A paragraph purpose'], 1, 'Dates and names are distinctive anchors.'),
          tf('q-ielts-2-1-3', 'You should read the whole passage in detail before looking at any questions.', false, 'Skim for structure first; detailed reading should be guided by questions.')
        ],
        'Explain how you would use 20 minutes for one IELTS Academic Reading passage.'
      ),
      lesson(
        'ielts-2-2',
        'True/False/Not Given & Yes/No/Not Given',
        40,
        [
          'Distinguish false from not given',
          'Match the question to exact evidence',
          'Avoid using outside knowledge'
        ],
        `<p><strong>True/False/Not Given</strong> tests factual information. <strong>Yes/No/Not Given</strong> tests the writer’s views or claims. In both, the answer must come from the passage, not from what you know about the world.</p>
        <p><strong>True / Yes.</strong> The passage clearly supports the statement. The wording may be paraphrased, but the meaning matches.</p>
        <p><strong>False / No.</strong> The passage clearly contradicts the statement. The passage may say the opposite, or give a different number, date, or relationship.</p>
        <p><strong>Not Given.</strong> The passage does not say whether the statement is true or false. This is different from “I cannot find it quickly” or “it sounds unlikely”. If the passage neither supports nor contradicts the statement, the answer is Not Given.</p>
        <p><strong>Common traps.</strong> Extreme words (all, never, only), comparisons, cause and effect, and dates are frequent places where the passage and statement diverge. Read the exact sentence around the evidence, not just the matching keyword.</p>
        <ul>
          <li>Underline the claim and any qualifiers.</li>
          <li>Find the evidence sentence.</li>
          <li>Ask: supported, contradicted, or not stated?</li>
          <li>Do not use common sense as evidence.</li>
        </ul>`,
        [
          { term: 'Contradiction', definition: 'A statement that says the opposite of the passage.' },
          { term: 'Not Given', definition: 'A statement the passage neither supports nor contradicts.' },
          { term: 'Qualifier', definition: 'A word that limits a claim, such as some, most, often, or only.' },
          { term: 'Outside knowledge', definition: 'Information you know but the passage does not state.' }
        ],
        [
          fc('fc-ielts-2-2-1', 'What is the difference between False and Not Given?', 'False is contradicted by the passage; Not Given is neither supported nor contradicted.'),
          fc('fc-ielts-2-2-2', 'What does Yes/No/Not Given test?', 'The writer’s views or claims, not factual details.'),
          fc('fc-ielts-2-2-3', 'Why are extreme words important?', 'Words such as all, never, and only often make a statement easier to contradict.')
        ],
        [
          mcq('q-ielts-2-2-1', 'The passage says “The trial ran for six months.” The statement says “The trial ran for a year.” What is the answer?', ['True', 'False', 'Not Given', 'Yes'], 1, 'The passage states six months, which contradicts one year.'),
          mcq('q-ielts-2-2-2', 'The passage describes a city’s new transport plan but does not mention cost. The statement says “The plan was expensive.” What is the answer?', ['True', 'False', 'Not Given', 'No'], 2, 'The passage does not state whether the plan was expensive.'),
          tf('q-ielts-2-2-3', 'You may use your general knowledge to decide a True/False/Not Given answer.', false, 'Answers must be based on the passage, not outside knowledge.')
        ],
        'Explain the difference between False and Not Given using one example of each.'
      ),
      lesson(
        'ielts-2-3',
        'Matching headings, information & features',
        35,
        [
          'Identify paragraph purpose, not just topic',
          'Eliminate headings that are too broad or too narrow',
          'Match information and features without losing time'
        ],
        `<p><strong>Matching headings</strong> asks for the main idea of a paragraph. The correct heading covers the whole paragraph, not one detail. A heading that is too broad, too narrow, or only repeats a keyword is usually a distractor.</p>
        <p><strong>Process.</strong> Read the headings first and underline the key idea in each. Then read the first and last sentences of each paragraph, plus any repeated concept. Match the paragraph’s purpose: describing a cause, comparing views, giving an example, or explaining a process.</p>
        <p><strong>Matching information</strong> asks where a specific detail appears. The question may use synonyms, so scan for the concept rather than the exact word. Answers may repeat, and the questions may not follow passage order.</p>
        <p><strong>Matching features</strong> asks you to connect statements to people, places, or categories. Locate the feature names first, then read around each mention. Watch for opinions attributed to the wrong person.</p>
        <ul>
          <li>Headings: match the whole paragraph’s purpose.</li>
          <li>Information: scan for synonyms and concepts.</li>
          <li>Features: track who said or did what.</li>
          <li>Do the easier matching set first if time is tight.</li>
        </ul>`,
        [
          { term: 'Main idea', definition: 'The central point of a paragraph, not a supporting detail.' },
          { term: 'Too broad', definition: 'A heading that covers more than the paragraph actually discusses.' },
          { term: 'Too narrow', definition: 'A heading that focuses on one detail instead of the whole paragraph.' },
          { term: 'Feature', definition: 'A person, group, place, or category used in a matching task.' }
        ],
        [
          fc('fc-ielts-2-3-1', 'What makes a heading correct?', 'It captures the main idea of the whole paragraph.'),
          fc('fc-ielts-2-3-2', 'Why can a keyword match be a trap?', 'It may point to a detail rather than the paragraph’s main idea.'),
          fc('fc-ielts-2-3-3', 'What should you track in matching features?', 'Who said or did what, and which category each statement belongs to.')
        ],
        [
          mcq('q-ielts-2-3-1', 'A paragraph explains three causes of a problem. Which heading is best?', ['A single cause', 'Why the problem occurs', 'A possible solution', 'The history of the problem'], 1, '“Why the problem occurs” covers the paragraph’s main purpose.'),
          mcq('q-ielts-2-3-2', 'A heading repeats a word from the paragraph but ignores the main idea. What is it likely to be?', ['The correct answer', 'A distractor', 'A feature', 'A synonym'], 1, 'Keyword matching without main-idea coverage is a common trap.'),
          tf('q-ielts-2-3-3', 'Matching information questions always follow the order of the passage.', false, 'They may not follow passage order.')
        ],
        'Explain how you decide between two headings that both seem related to a paragraph.'
      ),
      lesson(
        'ielts-2-4',
        'Completion questions & reading review',
        35,
        [
          'Use grammar to predict completed answers',
          'Respect word limits in summary and sentence tasks',
          'Review reading errors by cause'
        ],
        `<p><strong>Completion tasks.</strong> Summary, sentence, table, and flow-chart completion require words from the passage. Read the instruction for the word limit, then predict the word class from the grammar around the gap. A gap after “the” often needs a noun; after “because” it often needs a clause or noun phrase.</p>
        <p><strong>Copy carefully.</strong> Use the exact words from the passage unless the instruction allows a change. Check singular/plural and spelling. If the grammar of the completed sentence is wrong, the answer is probably wrong even if the topic matches.</p>
        <p><strong>Review by cause.</strong> Label errors as locating, vocabulary, grammar, or time. If you found the evidence but chose the wrong word, it is a vocabulary or grammar issue. If you never found the evidence, work on scanning and synonyms.</p>
        <p><strong>Transfer.</strong> Leave time to check that answers are in the correct order and that no answer exceeds the word limit. Do not leave blanks; a guess costs nothing.</p>
        <ul>
          <li>Predict word class before scanning.</li>
          <li>Use exact passage words.</li>
          <li>Check grammar after completing.</li>
          <li>Review the cause of each error.</li>
        </ul>`,
        [
          { term: 'Completion task', definition: 'A task where words from the passage complete a summary, sentence, table, or flow chart.' },
          { term: 'Word class', definition: 'The grammatical category needed in a gap, such as noun, verb, or adjective.' },
          { term: 'Transfer', definition: 'Writing answers in the correct place and format within the time limit.' },
          { term: 'Locating error', definition: 'Failing to find the part of the passage that contains the answer.' }
        ],
        [
          fc('fc-ielts-2-4-1', 'Why predict word class in a completion task?', 'It narrows the search and helps check whether the completed sentence is grammatical.'),
          fc('fc-ielts-2-4-2', 'Should you paraphrase the answer in a completion task?', 'Usually no; use the exact words from the passage within the word limit.'),
          fc('fc-ielts-2-4-3', 'What does a locating error mean?', 'You could not find the evidence in the passage.')
        ],
        [
          mcq('q-ielts-2-4-1', 'The gap is “The report was published in ______.” What answer type is likely?', ['A year', 'A verb', 'An adjective', 'A person'], 0, 'The preposition “in” before a time expression suggests a year or date.'),
          mcq('q-ielts-2-4-2', 'The passage says “urban areas”; the gap needs a plural noun. What should you check?', ['That the answer is singular', 'That the answer fits grammatically and stays within the word limit', 'That the answer is a synonym', 'That the answer is a new sentence'], 1, 'Grammar and word limit both matter in completion tasks.'),
          tf('q-ielts-2-4-3', 'It is useful to leave completion answers blank if you are unsure.', false, 'There is no penalty for guessing; always enter an answer.')
        ],
        'Explain how grammar and word limits help you choose a completion answer under time pressure.'
      )
    ]
  );

  const writingTask1 = mod(
    'ielts-mod-3',
    'Writing Task 1',
    'Select, organise, and describe visual data accurately in 20 minutes.',
    [
      lesson(
        'ielts-3-1',
        'Task 1 overview & data selection',
        40,
        [
          'Understand what Task 1 requires',
          'Write a clear overview without listing every number',
          'Select the most important features from a chart'
        ],
        `<p><strong>The task.</strong> IELTS Academic Writing Task 1 asks you to describe visual information: a line graph, bar chart, pie chart, table, map, or process. You have about 20 minutes and must write at least 150 words. You do not give a personal opinion. You report and compare the information.</p>
        <p><strong>Four steps.</strong> First, paraphrase the question in one sentence. Second, write an overview of the main trends or differences. Third, describe two to four key features with selected data. Fourth, check units, tense, and word count.</p>
        <p><strong>The overview matters.</strong> The overview is the most important paragraph. It should identify the big picture, not every detail. For example: “Overall, digital payment methods became more common, while cash and cheques declined.” Do not turn the overview into a list of numbers.</p>
        <p><strong>Select, do not list.</strong> Choose the starting and ending points, the highest and lowest values, major changes, crossovers, and exceptions. A useful rule is two or three features per body paragraph, each supported by accurate data.</p>
        <p><strong>Common errors.</strong> No overview, personal opinion, listing every value, mixing units, wrong tense, and describing the visual rather than the data. For a process, describe stages. For a map, describe changes. For a chart, describe trends and comparisons.</p>
        <p><strong>Illustrative prompt.</strong> “The chart shows the percentage of households using four payment methods in one country in 2005 and 2025.” A possible overview: “Overall, mobile payments replaced cash as the most common method, while cheques almost disappeared.” The data would then support that claim.</p>`,
        [
          { term: 'Overview', definition: 'A short statement of the main trends or differences in the visual.' },
          { term: 'Key feature', definition: 'An important pattern, comparison, or change selected for description.' },
          { term: 'Paraphrase', definition: 'Restating the question in different words without changing the meaning.' },
          { term: 'Unit', definition: 'The measurement used in the data, such as percentage, number, or tonnes.' }
        ],
        [
          fc('fc-ielts-3-1-1', 'How long should you spend on Task 1?', 'About 20 minutes, leaving 40 minutes for Task 2.'),
          fc('fc-ielts-3-1-2', 'What is the most important paragraph in Task 1?', 'The overview of the main trends or differences.'),
          fc('fc-ielts-3-1-3', 'Should Task 1 include your opinion?', 'No. Describe and compare the data without a personal opinion.')
        ],
        [
          mcq('q-ielts-3-1-1', 'What is the main purpose of Writing Task 1?', ['To give a personal opinion', 'To describe visual data', 'To write a story', 'To summarise a lecture'], 1, 'Task 1 reports and compares visual information.'),
          mcq('q-ielts-3-1-2', 'Which sentence is the best overview?', ['In 2005, cash was 60% and mobile was 5%.', 'Overall, mobile payments rose sharply while cash declined.', 'The chart is blue and green.', 'I think mobile payments are better.'], 1, 'The overview identifies the main trends without listing every number.'),
          tf('q-ielts-3-1-3', 'You should describe every number shown in the chart.', false, 'Select the key features; listing every value loses focus and time.')
        ],
        'Explain how you would choose an overview and three key features for a chart with four categories over ten years.'
      ),
      lesson(
        'ielts-3-2',
        'Task 1 trends & comparisons',
        40,
        [
          'Use precise trend language',
          'Distinguish percentages from percentage points',
          'Compare data with appropriate grammar'
        ],
        `<p><strong>Trend language.</strong> Use a verb plus adverb or an adjective plus noun: “rose sharply”, “a sharp rise”, “declined steadily”, “a steady decline”. Avoid “increased up” and other double direction phrases.</p>
        <p><strong>Prepositions.</strong> Use “from … to …” for start and end, “by” for the size of a change, and “at” for a value at one point: “It rose from 20% to 45%”, “It rose by 25 percentage points”, “It stood at 30% in 2020”.</p>
        <p><strong>Percentage versus percentage point.</strong> A change from 20% to 25% is a rise of five percentage points, not a rise of five percent. A rise from 20% to 25% can also be described as a 25% relative increase, but this wording is easy to confuse. In Task 1, “percentage points” is usually clearer.</p>
        <p><strong>Comparisons.</strong> Use “while”, “whereas”, “compared with”, “in contrast”, “the same as”, “twice as high as”, and “the highest”. Keep the comparison balanced: “Mobile payments were twice as common as cheques” is clearer than a long sentence with three unrelated numbers.</p>
        <p><strong>Sample paragraph.</strong> “In 2005, cash was the most common method at 60%, but by 2025 it had fallen to 20%. Over the same period, mobile payments rose from 5% to 45%, while cheque use dropped from 25% to 5%. The figure for cards remained relatively stable at around 10%.” This is an original illustrative example, not real data.</p>
        <p><strong>Tense.</strong> Use the past simple for completed past data, the present simple for general facts and processes, and “is projected to” for future predictions. Keep the tense consistent with the time frame.</p>`,
        [
          { term: 'Percentage point', definition: 'The arithmetic difference between two percentages.' },
          { term: 'Relative change', definition: 'A change expressed as a proportion of the starting value.' },
          { term: 'Trend', definition: 'The general direction of data over time.' },
          { term: 'Stable', definition: 'Staying at roughly the same level over a period.' }
        ],
        [
          fc('fc-ielts-3-2-1', 'A value rises from 20% to 25%. How many percentage points is that?', 'Five percentage points.'),
          fc('fc-ielts-3-2-2', 'Which preposition shows the size of a change?', 'By, as in “rose by 10%”.'),
          fc('fc-ielts-3-2-3', 'Which tense fits data from 1990 to 2010?', 'The past simple, because the period is complete.')
        ],
        [
          mcq('q-ielts-3-2-1', 'A figure rises from 30% to 45%. What is the correct description?', ['A rise of 15%', 'A rise of 15 percentage points', 'A rise of 45 percentage points', 'A fall of 15 percentage points'], 1, 'The arithmetic difference between the percentages is 15 percentage points.'),
          mcq('q-ielts-3-2-2', 'Which sentence uses “from … to …” correctly?', ['It rose from 20% to 45%.', 'It rose from 20% by 45%.', 'It rose to 20% from 45%.', 'It rose at 20% to 45%.'], 0, '“From” marks the starting value and “to” marks the ending value.'),
          tf('q-ielts-3-2-3', '“While” can connect two contrasting trends in one sentence.', true, '“While” is useful for showing contrast between two data patterns.')
        ],
        'Explain the difference between a percentage change and a percentage-point change using your own example.'
      ),
      lesson(
        'ielts-3-3',
        'Task 1 process, maps & review',
        40,
        [
          'Describe a process with passive voice and sequencers',
          'Describe map changes with accurate location language',
          'Run a final Task 1 review checklist'
        ],
        `<p><strong>Process diagrams.</strong> A process task shows stages, not trends. Use the present simple passive when the actor is unknown or unimportant: “The material is collected”, “The mixture is heated”, “The products are packaged”. Use sequencers: first, next, after that, once, before, finally.</p>
        <p><strong>Do not invent stages.</strong> Describe what the diagram shows. If a stage is unclear, use cautious language: “The material appears to be filtered” rather than inventing a detailed chemical process.</p>
        <p><strong>Maps.</strong> Use location language: in the north, to the east of, next to, opposite, at the end of, along, surrounding. Use change verbs: replaced, extended, converted, demolished, built, expanded, removed. Passive voice is common: “The cafe was replaced by a library.”</p>
        <p><strong>Map sample.</strong> “The main change was the conversion of the western field into a housing estate. A new road was built to the north of the station, and the small car park was extended.” This describes changes without adding information that is not visible.</p>
        <p><strong>Review checklist.</strong> Does the answer have an overview? Are the key features selected? Are units and dates accurate? Is the tense consistent? Is the word count at least 150? Are there repeated sentence patterns? Did you avoid opinion and unnecessary detail?</p>
        <p><strong>Time control.</strong> Finish planning in three minutes, write for about 15 minutes, and leave two minutes to check grammar, data, and spelling. If you cannot finish, protect the overview and the main comparisons.</p>`,
        [
          { term: 'Passive voice', definition: 'A structure where the action is more important than the actor, such as “The water is heated”.' },
          { term: 'Sequencer', definition: 'A word or phrase that shows the order of stages, such as first, next, or finally.' },
          { term: 'Conversion', definition: 'A change from one use or type to another, often used in map tasks.' },
          { term: 'Location language', definition: 'Phrases such as to the north of, opposite, or next to.' }
        ],
        [
          fc('fc-ielts-3-3-1', 'Which voice is common in process descriptions?', 'The passive voice, especially when the actor is unknown or unimportant.'),
          fc('fc-ielts-3-3-2', 'What should you avoid when describing a map?', 'Inventing changes or details that are not visible.'),
          fc('fc-ielts-3-3-3', 'What should the final Task 1 review check?', 'Overview, key features, units, tense, word count, and repeated patterns.')
        ],
        [
          mcq('q-ielts-3-3-1', 'Which sentence is most appropriate for a process diagram?', ['The worker heats the water because he wants to.', 'The water is heated.', 'I think the water should be heated.', 'The water was heated last year.'], 1, 'The passive present simple is typical for process stages.'),
          mcq('q-ielts-3-3-2', 'Which phrase best describes a map change?', ['The cafe was replaced by a library.', 'The cafe is more popular than the library.', 'I prefer the library.', 'The cafe should be replaced.'], 0, 'It uses a passive change verb and a location-free but accurate description.'),
          tf('q-ielts-3-3-3', 'You should invent extra stages to make a process description longer.', false, 'Describe only what the diagram shows; do not invent stages.')
        ],
        'Explain how you would describe a process diagram and a map differently in Task 1.'
      )
    ]
  );

  const writingTask2 = mod(
    'ielts-mod-4',
    'Writing Task 2',
    'Build a clear position, develop arguments, and write a controlled 250-word essay.',
    [
      lesson(
        'ielts-4-1',
        'Task 2 question types & position',
        40,
        [
          'Identify the task type and all required parts',
          'Write a clear, consistent position',
          'Plan a 40-minute essay'
        ],
        `<p><strong>Task 2 in brief.</strong> You have 40 minutes and must write at least 250 words. The essay should answer the question, present a clear position, develop ideas, and use accurate, varied language. There is no single correct opinion, but your position must be clear and consistent.</p>
        <p><strong>Question types.</strong> Common types include opinion (agree or disagree), discussion (both views and your opinion), problem and solution, advantages and disadvantages, and two-part questions. Read the task words carefully. “Discuss both views and give your own opinion” requires all three parts.</p>
        <p><strong>Position.</strong> A strong position is not “it depends” without a clear answer. You can partly agree, but state the limits: “While I accept that X is useful, I believe Y is more important because …”. Keep the same position in the introduction, body, and conclusion.</p>
        <p><strong>Planning.</strong> Spend about five minutes on a plan. Write your position, two main reasons, one example or explanation for each, and a possible concession. A clear plan prevents repetition and saves time during writing.</p>
        <p><strong>Task analysis example.</strong> “Some people believe that university education should be free for everyone. To what extent do you agree or disagree?” The task asks for your extent of agreement, not a list of advantages and disadvantages. A position such as “I largely agree, but the policy should be limited to low-income students” is clear and arguable.</p>
        <p><strong>Common errors.</strong> Answering only one part, copying the prompt, presenting two unrelated positions, and using memorised sentences that do not fit the question.</p>`,
        [
          { term: 'Position', definition: 'The main opinion or stance you take in the essay.' },
          { term: 'Task words', definition: 'The instruction words that tell you what to do, such as discuss, agree, or evaluate.' },
          { term: 'Concession', definition: 'Acknowledging a point from the other side before explaining your view.' },
          { term: 'Thesis', definition: 'A sentence that states your main position and the direction of the essay.' }
        ],
        [
          fc('fc-ielts-4-1-1', 'How long should Task 2 take?', 'About 40 minutes, with at least 250 words.'),
          fc('fc-ielts-4-1-2', 'What does “discuss both views and give your opinion” require?', 'Both views plus a clear personal position.'),
          fc('fc-ielts-4-1-3', 'Why plan before writing?', 'It prevents repetition, clarifies the position, and saves time.')
        ],
        [
          mcq('q-ielts-4-1-1', 'How many words must Task 2 contain at minimum?', ['150', '200', '250', '300'], 2, 'Task 2 requires at least 250 words.'),
          mcq('q-ielts-4-1-2', 'A prompt says “Discuss both views and give your own opinion.” What must you include?', ['Only your opinion', 'Only the two views', 'Both views and your opinion', 'A personal story'], 2, 'All three parts are required.'),
          tf('q-ielts-4-1-3', 'A partly agreed position is acceptable if the limits are clear.', true, 'A qualified position can be strong if it is stated and developed consistently.')
        ],
        'Explain how you would identify the task type and position for an agree/disagree question.'
      ),
      lesson(
        'ielts-4-2',
        'Task 2 introductions & body paragraphs',
        45,
        [
          'Write a concise introduction with a thesis',
          'Build body paragraphs with topic sentences and support',
          'Avoid memorised openings and unsupported claims'
        ],
        `<p><strong>Introduction.</strong> Two or three sentences are enough. Paraphrase the question, then state your position. Do not copy the prompt word for word, and do not begin with a memorised phrase such as “In this day and age” unless it genuinely fits.</p>
        <p><strong>Sample introduction.</strong> Prompt: “Some people believe that university education should be free for everyone. To what extent do you agree or disagree?” Introduction: “University fees are a major barrier for many students, and some argue that public funding should remove this barrier entirely. While I support greater access, I believe free university education should be targeted at students who cannot afford it rather than provided to everyone.” This paraphrases the issue and states a qualified position.</p>
        <p><strong>Body paragraph structure.</strong> Start with a topic sentence that states one reason. Explain the reason in one or two sentences. Add a specific example or consequence. End with a short link back to the question. One central idea per paragraph is easier to develop and control.</p>
        <p><strong>Sample body paragraph.</strong> “Targeted funding would use public money more efficiently. If tuition is free for all students, including those from wealthy families, the government must spend billions that could be used to improve teaching or support disadvantaged learners. A means-tested system, by contrast, could cover the full cost for low-income students while asking others to contribute according to their ability.”</p>
        <p><strong>Support, not assertion.</strong> “Education is important” is too general. Explain why it matters in this context, who is affected, and what consequence follows. Examples do not need to be statistically exact, but they must be relevant and plausible.</p>
        <p><strong>Avoid.</strong> Long introductions, multiple unrelated ideas in one paragraph, examples with no link to the reason, and conclusions that introduce a new argument.</p>`,
        [
          { term: 'Topic sentence', definition: 'The first sentence of a body paragraph that states its main idea.' },
          { term: 'Support', definition: 'Explanation, evidence, or an example that develops the topic sentence.' },
          { term: 'Means-tested', definition: 'Available only to people below a certain income level.' },
          { term: 'Paraphrase', definition: 'Restating the prompt in your own words while keeping the meaning.' }
        ],
        [
          fc('fc-ielts-4-2-1', 'What should a body paragraph begin with?', 'A clear topic sentence stating one main reason.'),
          fc('fc-ielts-4-2-2', 'How long should a Task 2 introduction be?', 'Usually two or three sentences: paraphrase and position.'),
          fc('fc-ielts-4-2-3', 'What is the problem with unsupported claims?', 'They do not show why the argument is valid or what follows from it.')
        ],
        [
          mcq('q-ielts-4-2-1', 'Which is the best topic sentence?', ['Education is important.', 'Targeted funding would use public money more efficiently.', 'I will now discuss my opinion.', 'Many people think many things.'], 1, 'It states one arguable reason that the paragraph can develop.'),
          mcq('q-ielts-4-2-2', 'What should follow a topic sentence?', ['A new unrelated topic', 'Explanation and support', 'A memorised quotation', 'The conclusion'], 1, 'The paragraph should explain and support the main idea.'),
          tf('q-ielts-4-2-3', 'A Task 2 introduction should copy the prompt exactly.', false, 'Paraphrase the prompt and state your position instead of copying it.')
        ],
        'Write an introduction and one body paragraph for an agree/disagree task, then explain how they connect.'
      ),
      lesson(
        'ielts-4-3',
        'Task 2 conclusions, cohesion & precision',
        40,
        [
          'Write a conclusion that restates without repeating',
          'Use cohesion without overusing linking words',
          'Choose precise vocabulary and appropriate hedging'
        ],
        `<p><strong>Conclusion.</strong> Restate your position and summarise the main reasons. Do not introduce a new argument or a new example. Two or three sentences are usually enough.</p>
        <p><strong>Sample conclusion.</strong> “In conclusion, free university education can widen access, but universal funding is difficult to justify when public budgets are limited. A targeted system would protect the students who need support most while using public money more responsibly.” It restates the qualified position and the main reason.</p>
        <p><strong>Cohesion.</strong> Cohesion is more than linking words. Use pronouns and references: “this policy”, “such students”, “the latter”, “that problem”. Use linking words only when the relationship is clear: however, whereas, because, therefore, despite, in contrast. Do not put “moreover” at the start of every sentence.</p>
        <p><strong>Lexical precision.</strong> Choose words that fit the topic. “Cost” is not always the same as “price”; “students” is not always the same as “learners”; “government spending” is not always “investment”. A precise common word is better than an impressive word used wrongly.</p>
        <p><strong>Hedging.</strong> Academic writing often avoids absolute claims. Use “tends to”, “is likely to”, “may”, “can”, “in many cases”, and “for most students”. Hedging does not weaken a clear position; it makes the claim more accurate.</p>
        <p><strong>Common errors.</strong> A conclusion with a new idea, repeated sentences, mechanical linking, and overgeneralisation with “all”, “never”, or “everyone”.</p>`,
        [
          { term: 'Conclusion', definition: 'The final paragraph that restates the position and main reasons.' },
          { term: 'Cohesion', definition: 'The use of references and linking devices to connect ideas smoothly.' },
          { term: 'Hedging', definition: 'Using cautious language to avoid absolute or unsupported claims.' },
          { term: 'Precision', definition: 'Choosing the word that expresses the intended meaning most accurately.' }
        ],
        [
          fc('fc-ielts-4-3-1', 'What should a conclusion not do?', 'It should not introduce a new argument or example.'),
          fc('fc-ielts-4-3-2', 'What is cohesion beyond linking words?', 'Using references and pronoun links so ideas connect naturally.'),
          fc('fc-ielts-4-3-3', 'Why use hedging?', 'It makes claims more accurate and avoids overgeneralisation.')
        ],
        [
          mcq('q-ielts-4-3-1', 'Which is the best conclusion move?', ['Add a new solution', 'Restate the position and main reasons', 'Repeat the introduction word for word', 'Introduce a new example'], 1, 'A conclusion should restate and summarise, not add new ideas.'),
          mcq('q-ielts-4-3-2', 'Which phrase is a hedge?', ['Every student will benefit.', 'This policy is likely to help.', 'All governments must act.', 'Nobody disagrees.'], 1, '“Is likely to” is cautious and qualified.'),
          tf('q-ielts-4-3-3', 'Using “moreover” at the start of every sentence improves cohesion.', false, 'Mechanical linking can make writing repetitive; cohesion also depends on references and logical flow.')
        ],
        'Explain how you would revise a conclusion that introduces a new idea and repeats the introduction.'
      ),
      lesson(
        'ielts-4-4',
        'Task 2 timed plan & self-assessment',
        45,
        [
          'Manage 40 minutes across planning, writing, and checking',
          'Self-assess against the four Writing criteria',
          'Build a personal error-correction checklist'
        ],
        `<p><strong>Time budget.</strong> Use about five minutes to plan, thirty minutes to write, and five minutes to check. If you run out of time, protect the conclusion and the main topic sentences. A complete essay with clear ideas is stronger than an unfinished essay with sophisticated vocabulary.</p>
        <p><strong>Self-assessment.</strong> Use the four criteria: Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. For each criterion, write one strength and one specific fix. “Vocabulary is bad” is not useful; “I repeat important and use vague nouns such as thing” is useful.</p>
        <p><strong>Task Response check.</strong> Did you answer every part? Is your position clear throughout? Are the main ideas relevant and developed? Is the conclusion consistent with the body?</p>
        <p><strong>Coherence check.</strong> Does each paragraph have one main idea? Are the links logical? Do pronouns refer clearly? Is the order easy to follow?</p>
        <p><strong>Language check.</strong> Look for subject–verb agreement, articles, plural forms, sentence fragments, comma splices, and repeated words. Do not try to replace every simple word; fix errors that affect meaning first.</p>
        <p><strong>Error log.</strong> After each essay, record the top three errors and one sentence you would rewrite. Repeat the same checklist next time. Improvement comes from removing repeated errors, not from writing more essays without review.</p>`,
        [
          { term: 'Task Response', definition: 'How fully and relevantly the essay answers the task.' },
          { term: 'Coherence and Cohesion', definition: 'How well ideas are organised and connected.' },
          { term: 'Comma splice', definition: 'Joining two independent clauses with only a comma.' },
          { term: 'Error log', definition: 'A record of repeated mistakes and the corrections to apply next time.' }
        ],
        [
          fc('fc-ielts-4-4-1', 'What is a practical 40-minute Task 2 time budget?', 'About 5 minutes planning, 30 minutes writing, and 5 minutes checking.'),
          fc('fc-ielts-4-4-2', 'What are the four Writing criteria?', 'Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.'),
          fc('fc-ielts-4-4-3', 'What should an error log contain?', 'The top repeated errors and a specific correction for the next essay.')
        ],
        [
          mcq('q-ielts-4-4-1', 'How should you spend the first five minutes of Task 2?', ['Writing the conclusion', 'Planning the position and main ideas', 'Checking spelling', 'Copying the prompt'], 1, 'Planning clarifies the position and saves time during writing.'),
          mcq('q-ielts-4-4-2', 'Which is the most useful self-assessment note?', ['My writing is bad.', 'I repeat “important” and use vague nouns such as “thing”.', 'I need more big words.', 'I should write faster.'], 1, 'It identifies a specific pattern that can be corrected.'),
          tf('q-ielts-4-4-3', 'Writing more essays without reviewing errors is the fastest way to improve.', false, 'Review and correction are needed to stop repeating the same errors.')
        ],
        'Design a 40-minute Task 2 checklist and explain which three errors you would track first.'
      )
    ]
  );

  const speaking = mod(
    'ielts-mod-5',
    'Speaking',
    'Speak at length, organise answers, and improve fluency with deliberate practice.',
    [
      lesson(
        'ielts-5-1',
        'Part 1: fluency, extension & natural answers',
        35,
        [
          'Give extended answers without sounding memorised',
          'Use reasons and examples naturally',
          'Reduce hesitation and one-word responses'
        ],
        `<p><strong>Part 1.</strong> The examiner asks familiar questions about home, work, study, hobbies, and daily life. The whole part usually lasts four to five minutes. Answers should be natural and extended, usually two or three sentences, not a speech.</p>
        <p><strong>Answer formula.</strong> Answer the question, give a reason, and add a short example or detail. For example: “Do you enjoy reading?” — “Yes, especially non-fiction. I like learning how people solve problems, and I recently read a book about urban planning that changed how I see my own city.”</p>
        <p><strong>Avoid memorised answers.</strong> A rehearsed paragraph can sound unnatural and may not answer the exact question. Prepare ideas, not scripts. It is fine to pause briefly and think; a natural “That’s an interesting question” is better than a blank stare.</p>
        <p><strong>Fluency.</strong> Fluency is not speed. It is the ability to keep going with reasonable flow. Use fillers sparingly: “well”, “I suppose”, “to be honest”. Do not overuse “you know” or long “um”.</p>
        <p><strong>Practice.</strong> Record 60-second answers to five familiar questions. Listen for one-word answers, repeated words, and long pauses. Re-record one answer with a clearer reason and example.</p>`,
        [
          { term: 'Fluency', definition: 'The ability to speak with reasonable flow and without excessive hesitation.' },
          { term: 'Extension', definition: 'Adding a reason, example, or detail to a basic answer.' },
          { term: 'Filler', definition: 'A short phrase used to manage thinking time, such as “well” or “I suppose”.' },
          { term: 'Memorised answer', definition: 'A rehearsed response that may not fit the exact question.' }
        ],
        [
          fc('fc-ielts-5-1-1', 'How long should a Part 1 answer usually be?', 'About two or three sentences, with a reason or example.'),
          fc('fc-ielts-5-1-2', 'What is fluency?', 'Reasonable flow without excessive hesitation, not simply fast speech.'),
          fc('fc-ielts-5-1-3', 'Why avoid memorised answers?', 'They can sound unnatural and may not answer the exact question.')
        ],
        [
          mcq('q-ielts-5-1-1', 'What is a good Part 1 answer structure?', ['One word', 'Answer plus reason and example', 'A memorised essay', 'A list of vocabulary'], 1, 'Answer, reason, and example create a natural extension.'),
          mcq('q-ielts-5-1-2', 'Which is the best response to “Do you enjoy reading?”', ['Yes.', 'Yes, I do.', 'Yes, especially non-fiction, because I like learning how people solve problems.', 'Reading is a very important activity in modern society.'], 2, 'It answers directly and adds a reason and detail.'),
          tf('q-ielts-5-1-3', 'Speaking quickly is the same as speaking fluently.', false, 'Fluency is about flow and coherence, not raw speed.')
        ],
        'Record a two-sentence answer to a familiar Part 1 question and identify one way to extend it naturally.'
      ),
      lesson(
        'ielts-5-2',
        'Part 2: long turn & cue-card strategy',
        35,
        [
          'Use the one-minute preparation time effectively',
          'Structure a two-minute long turn',
          'Keep speaking when notes run out'
        ],
        `<p><strong>Part 2.</strong> You receive a cue card, have one minute to prepare, and then speak for one to two minutes. The examiner may ask one follow-up question. You can make notes, but do not write full sentences.</p>
        <p><strong>Use the bullet points.</strong> A typical cue card asks you to describe a person, place, object, event, or experience, with prompts such as what, when, where, who, why, and how you felt. Use the prompts as a structure, not a checklist to read aloud.</p>
        <p><strong>Notes.</strong> Write four or five keywords: a person, a time, a place, a reason, a feeling. Notes should trigger ideas, not become a script.</p>
        <p><strong>Structure.</strong> Start with a direct answer, then describe the details, explain why it matters, and finish with a reflection or consequence. For example: “The person I want to describe is my first manager. I met her when I joined a small design company … She influenced me because …”</p>
        <p><strong>If you finish early.</strong> Do not stop at 45 seconds. Add a reflection: why you remember it, how it changed you, or what you would say to that person now. If you need a moment, use a natural phrase: “Another thing I remember is …”.</p>
        <p><strong>Practice.</strong> Record two minutes without stopping. Listen for long pauses, repeated words, and a clear ending. Re-record with a stronger structure, not a memorised script.</p>`,
        [
          { term: 'Cue card', definition: 'The prompt card in Part 2 that gives a topic and bullet points.' },
          { term: 'Long turn', definition: 'The one-to-two-minute talk in Speaking Part 2.' },
          { term: 'Keyword note', definition: 'A short note that triggers an idea rather than a full sentence.' },
          { term: 'Reflection', definition: 'A comment on why something matters or how it affected you.' }
        ],
        [
          fc('fc-ielts-5-2-1', 'How long is the Part 2 long turn?', 'One to two minutes, after one minute of preparation.'),
          fc('fc-ielts-5-2-2', 'What should your notes contain?', 'A few keywords that trigger ideas, not a full script.'),
          fc('fc-ielts-5-2-3', 'What should you do if you finish early?', 'Add a reflection, consequence, or related detail.')
        ],
        [
          mcq('q-ielts-5-2-1', 'How long do you have to prepare for Part 2?', ['30 seconds', '1 minute', '2 minutes', '5 minutes'], 1, 'You have one minute to prepare before the long turn.'),
          mcq('q-ielts-5-2-2', 'What is the best use of the cue-card bullet points?', ['Read them aloud in order', 'Use them as a structure for ideas', 'Ignore them completely', 'Copy them into full sentences'], 1, 'They provide a structure, but the talk should sound natural.'),
          tf('q-ielts-5-2-3', 'Stopping after 45 seconds is acceptable because the minimum is not enforced.', false, 'You should aim to speak for the full one to two minutes; stopping early limits fluency evidence.')
        ],
        'Plan a two-minute Part 2 answer using five keywords and explain how you would extend it if you finish early.'
      ),
      lesson(
        'ielts-5-3',
        'Part 3: abstract discussion & self-assessment',
        35,
        [
          'Discuss abstract ideas with reasons and examples',
          'Compare, speculate, and qualify your opinion',
          'Self-assess Speaking with the four criteria'
        ],
        `<p><strong>Part 3.</strong> The examiner asks broader questions connected to the Part 2 topic. You need to explain, compare, speculate, and give opinions. Answers should be longer and more abstract than Part 1, but still clear.</p>
        <p><strong>Useful moves.</strong> Compare: “Compared with the past, people now …”. Speculate: “It is likely that …”, “One possible reason is …”. Qualify: “In general, yes, although …”. Give an example: “For instance, in many cities …”.</p>
        <p><strong>Sample question.</strong> “Why do some people prefer to work from home?” A strong answer: “I think the main reason is control over time. People can avoid commuting and arrange their day around deep work, although this depends on the job. For example, a software developer may benefit more than a nurse, whose work requires physical presence.”</p>
        <p><strong>Do not force a perfect answer.</strong> It is acceptable to think aloud: “I have not considered that before, but I suppose …”. The examiner is assessing language and communication, not whether your opinion is correct.</p>
        <p><strong>Self-assessment.</strong> Use Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation. Record a three-minute Part 3 practice. Note one strength and one specific fix for each criterion. For pronunciation, check word stress and clear endings, not accent removal.</p>
        <p><strong>Practice cycle.</strong> Answer one question, transcribe 30 seconds, mark repetitions and grammar slips, then answer the same question again without reading a script.</p>`,
        [
          { term: 'Speculate', definition: 'Discuss a possibility without claiming certainty.' },
          { term: 'Qualify', definition: 'Limit or balance a statement with conditions or exceptions.' },
          { term: 'Word stress', definition: 'The syllable that receives the strongest emphasis in a word.' },
          { term: 'Transcribe', definition: 'Write down what you said in order to review it.' }
        ],
        [
          fc('fc-ielts-5-3-1', 'What is the focus of Part 3?', 'Broader, more abstract discussion connected to the Part 2 topic.'),
          fc('fc-ielts-5-3-2', 'Give one phrase for speculating.', '“It is likely that …” or “One possible reason is …”.'),
          fc('fc-ielts-5-3-3', 'What are the four Speaking criteria?', 'Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation.')
        ],
        [
          mcq('q-ielts-5-3-1', 'Which answer is most appropriate for Part 3?', ['Yes.', 'I like my job.', 'One possible reason is control over time, although this depends on the job.', 'I do not know.'], 2, 'It gives an abstract reason, a qualification, and a clear opinion.'),
          mcq('q-ielts-5-3-2', 'What does “qualify” mean in a Speaking answer?', ['Speak faster', 'Add a condition or exception', 'Use more idioms', 'Change the topic'], 1, 'Qualifying means limiting or balancing a claim.'),
          tf('q-ielts-5-3-3', 'You should try to remove your accent completely for IELTS Speaking.', false, 'The goal is clear pronunciation, not accent removal.')
        ],
        'Answer a Part 3 question with a comparison, a speculation, and a qualification, then assess one strength and one fix.'
      )
    ]
  );

  const language = mod(
    'ielts-mod-6',
    'Grammar & Vocabulary',
    'Build accuracy and range for Writing and Speaking without overcomplicating sentences.',
    [
      lesson(
        'ielts-6-1',
        'Complex sentences & accuracy for band 7',
        35,
        [
          'Use relative clauses, conditionals, and concession accurately',
          'Balance complex sentences with clear simple sentences',
          'Reduce common grammar errors'
        ],
        `<p><strong>Range with control.</strong> Band 7 does not require every sentence to be complex. It requires a variety of structures and frequent error-free sentences. A clear simple sentence is better than a long sentence that collapses halfway through.</p>
        <p><strong>Relative clauses.</strong> Use “who”, “which”, “that”, “where”, and “whose” to add information: “Students who receive targeted funding are more likely to complete their degrees.” Check that the clause has a clear subject and does not repeat it.</p>
        <p><strong>Conditionals.</strong> Use the first conditional for real possibilities: “If governments invest in public transport, congestion may fall.” Use the second conditional for hypothetical situations: “If tuition were free, more low-income students could attend.” Keep the verb forms consistent.</p>
        <p><strong>Concession.</strong> Use “although”, “even though”, “while”, “despite”, and “in spite of”. “Although tuition is free, living costs remain a barrier.” Do not write “Although … but …” in the same clause.</p>
        <p><strong>Nominalisation.</strong> Turning verbs into nouns can create an academic tone: “The government decided to invest” → “The government’s decision to invest”. Use it selectively; too much nominalisation makes writing dense and hard to follow.</p>
        <p><strong>Accuracy check.</strong> Look for subject–verb agreement, articles, plural forms, tense consistency, prepositions, and sentence fragments. Fix meaning-changing errors before replacing simple vocabulary.</p>`,
        [
          { term: 'Relative clause', definition: 'A clause that gives more information about a noun, often beginning with who, which, or that.' },
          { term: 'Conditional', definition: 'A sentence structure that describes a real or hypothetical condition and result.' },
          { term: 'Concession', definition: 'Acknowledging an opposing or limiting point.' },
          { term: 'Nominalisation', definition: 'Changing a verb or adjective into a noun form.' }
        ],
        [
          fc('fc-ielts-6-1-1', 'Does band 7 require every sentence to be complex?', 'No. It requires a range of structures and frequent error-free sentences.'),
          fc('fc-ielts-6-1-2', 'What is wrong with “Although it is free, but it is crowded”?', '“Although” and “but” should not be used together in this structure.'),
          fc('fc-ielts-6-1-3', 'What should you check before replacing simple vocabulary?', 'Meaning-changing grammar errors such as agreement, articles, and tense.')
        ],
        [
          mcq('q-ielts-6-1-1', 'Which sentence is grammatically correct?', ['Although tuition is free, but living costs are high.', 'Although tuition is free, living costs are high.', 'Although tuition is free, however living costs are high.', 'Although tuition is free, and living costs are high.'], 1, '“Although” introduces the concession without “but” or “however” in the same clause.'),
          mcq('q-ielts-6-1-2', 'Which is a second conditional?', ['If governments invest, congestion falls.', 'If tuition were free, more students could attend.', 'If tuition is free, students attend.', 'If tuition will be free, students attend.'], 1, '“Were” and “could” mark a hypothetical situation.'),
          tf('q-ielts-6-1-3', 'A short clear sentence can be better than a long inaccurate one.', true, 'Accuracy and clarity matter more than length.')
        ],
        'Rewrite three simple sentences about education using a relative clause, a conditional, and a concession accurately.'
      ),
      lesson(
        'ielts-6-2',
        'Academic vocabulary & collocation',
        35,
        [
          'Use topic-specific collocations accurately',
          'Choose precise words instead of impressive but vague ones',
          'Paraphrase without changing the meaning'
        ],
        `<p><strong>Collocation.</strong> Academic vocabulary is not only individual words; it is words that commonly go together. We say “public funding”, “living costs”, “academic performance”, “policy implementation”, and “a significant increase”. Learning collocations makes writing sound natural and precise.</p>
        <p><strong>Precision.</strong> “Big” is not always “significant”; “problem” is not always “issue”; “make” is not always “implement”. Choose the word that expresses the exact relationship. A precise common word is better than a rare word used incorrectly.</p>
        <p><strong>Word families.</strong> Learn noun, verb, adjective, and adverb forms: “economy, economic, economical, economise”; “benefit, beneficial, beneficially”; “access, accessible, accessibility”. Check the grammar of the form you use.</p>
        <p><strong>Paraphrase.</strong> Paraphrase meaning, not just words. “The government should spend more on public transport” can become “Greater public investment in transport is needed.” Do not replace every word with a synonym; the result can become unnatural.</p>
        <p><strong>Avoid synonym dumping.</strong> Do not write “utilise” when “use” is clearer, or “plethora” when “many” is enough. In Task 2, precision and natural collocation matter more than showing off.</p>
        <p><strong>Practice.</strong> Build topic maps: education, environment, technology, health, work. For each topic, record five collocations and one common verb pattern. Use them in a sentence about a real issue.</p>`,
        [
          { term: 'Collocation', definition: 'A combination of words that commonly occur together.' },
          { term: 'Word family', definition: 'Related noun, verb, adjective, and adverb forms of a word.' },
          { term: 'Precision', definition: 'Using the word that expresses the meaning most exactly.' },
          { term: 'Synonym dumping', definition: 'Replacing simple words with unnecessarily difficult synonyms.' }
        ],
        [
          fc('fc-ielts-6-2-1', 'What is a collocation?', 'A natural word combination, such as “public funding” or “academic performance”.'),
          fc('fc-ielts-6-2-2', 'Why is synonym dumping a problem?', 'It can make writing unnatural or inaccurate without improving meaning.'),
          fc('fc-ielts-6-2-3', 'What should a topic map include?', 'Topic collocations and common verb patterns used in sentences.')
        ],
        [
          mcq('q-ielts-6-2-1', 'Which is the most natural collocation?', ['make a significant increase', 'a significant increase', 'do a significant increase', 'perform a significant increase'], 1, '“A significant increase” is a natural noun phrase.'),
          mcq('q-ielts-6-2-2', 'Which word is most precise in “The policy had a ______ effect on low-income families”?', ['big', 'significant', 'massive', 'huge'], 1, '“Significant” is precise and academic; the others are more informal or vague.'),
          tf('q-ielts-6-2-3', 'Replacing every simple word with a rare synonym always improves academic writing.', false, 'Precision and natural collocation matter more than rarity.')
        ],
        'Build a five-word topic map for education or environment and write one precise sentence using two collocations.'
      ),
      lesson(
        'ielts-6-3',
        'Linking, hedging & exam-language review',
        35,
        [
          'Connect ideas logically without mechanical linking',
          'Use hedging and cautious language appropriately',
          'Review register and common exam-language errors'
        ],
        `<p><strong>Linking is logic, not decoration.</strong> Use “because” for cause, “therefore” for result, “whereas” for contrast, “despite” before a noun phrase, and “although” before a clause. If the relationship is not clear, a linking word will not fix it.</p>
        <p><strong>Do not overuse.</strong> “Moreover”, “furthermore”, and “in addition” are useful, but not in every sentence. Sometimes no linker is needed: “The policy reduced costs. It also improved access.” Clear references and sentence order can do the work.</p>
        <p><strong>Hedging.</strong> Use cautious language when a claim is not absolute: “may”, “can”, “tends to”, “is likely to”, “in many cases”, “for some students”. Compare “Free tuition solves inequality” with “Free tuition can reduce some financial barriers, although it does not address all causes of inequality.”</p>
        <p><strong>Register.</strong> Avoid spoken fillers in writing: “a lot of”, “kind of”, “stuff”, “things”, “really really”. In Speaking, natural fillers are acceptable in moderation, but academic vocabulary should still be clear and appropriate.</p>
        <p><strong>Review checklist.</strong> Does each linker express the right relationship? Are pronouns clear? Is the claim too absolute? Is the register consistent? Are there repeated sentence openings? Can one sentence be shorter and clearer?</p>
        <p><strong>Practice.</strong> Take a paragraph you wrote and remove every linker. Then add back only the ones that are logically necessary. This often makes the argument clearer.</p>`,
        [
          { term: 'Linking device', definition: 'A word or phrase that shows the relationship between ideas.' },
          { term: 'Hedging', definition: 'Cautious language that avoids absolute claims.' },
          { term: 'Register', definition: 'The level of formality and style appropriate to the situation.' },
          { term: 'Reference', definition: 'A pronoun or phrase that points back to an earlier idea.' }
        ],
        [
          fc('fc-ielts-6-3-1', 'What does “whereas” signal?', 'Contrast between two ideas.'),
          fc('fc-ielts-6-3-2', 'Why is overusing linking words a problem?', 'It can make writing mechanical and hide unclear logic.'),
          fc('fc-ielts-6-3-3', 'Give two hedging phrases.', '“May”, “tends to”, “is likely to”, or “in many cases”.')
        ],
        [
          mcq('q-ielts-6-3-1', 'Which linker best completes “______ the policy was expensive, it improved access”?', ['Because', 'Although', 'Therefore', 'Moreover'], 1, '“Although” introduces a concession: expensive but still beneficial.'),
          mcq('q-ielts-6-3-2', 'Which sentence is appropriately hedged?', ['Free tuition solves inequality.', 'Free tuition can reduce some financial barriers.', 'Free tuition is the only solution.', 'Everyone agrees with free tuition.'], 1, '“Can reduce some” is cautious and qualified.'),
          tf('q-ielts-6-3-3', 'Every sentence needs a linking word at the beginning.', false, 'Clear references and logical order often connect ideas without an explicit linker.')
        ],
        'Revise a paragraph by removing unnecessary linkers and adding hedging where the claim is too absolute.'
      )
    ]
  );

  const ielts = {
    id: 'ielts',
    title: 'IELTS Academic',
    shortTitle: 'IELTS',
    description: 'Academic IELTS study track for a 7.0+ target: Listening, Reading, Writing, Speaking, grammar, and full mock practice.',
    modules: [orientation, listening, reading, writingTask1, writingTask2, speaking, language]
  };
  ielts.optional = true;
  ielts.prerequisiteId = null;

  if (!curriculum.tracks.some((track) => track.id === ielts.id)) {
    curriculum.tracks.push(ielts);
  }

  return {
    track: ielts,
    targetBand: '7.0+',
    moduleIds: ielts.modules.map((module) => module.id)
  };
})();
