(function () {
  const curriculum = window.NEZHA_CURRICULUM;
  const content = window.NEZHA_CONTENT;
  if (!curriculum || !Array.isArray(curriculum.tracks) || !content) return;

  const trackById = Object.fromEntries(curriculum.tracks.map((track) => [track.id, track]));

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (character) => {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[character];
    });
  }

  function hashString(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function rotate(items, offset) {
    if (!items.length) return items.slice();
    const index = ((offset % items.length) + items.length) % items.length;
    return items.slice(index).concat(items.slice(0, index));
  }

  function splitFacts(facts, groups) {
    const result = [];
    const base = Math.floor(facts.length / groups);
    const remainder = facts.length % groups;
    let cursor = 0;
    for (let index = 0; index < groups; index += 1) {
      const size = base + (index < remainder ? 1 : 0);
      result.push(facts.slice(cursor, cursor + size));
      cursor += size;
    }
    return result;
  }

  function buildQuiz(topic, lessonTitle, facts, optionsPerQuestion, lessonId) {
    const quiz = [];
    const allFacts = topic.facts;
    facts.slice(0, 3).forEach((fact, factIndex) => {
      const distractors = rotate(
        allFacts.filter((item) => item.term !== fact.term),
        hashString(`${lessonId}|${fact.term}`) + factIndex
      ).slice(0, Math.max(1, optionsPerQuestion - 1));
      const options = [fact.definition].concat(distractors.map((item) => item.definition));
      const shift = hashString(`${lessonId}|answer|${fact.term}`) % options.length;
      const shuffled = rotate(options, shift);
      const answer = shuffled.indexOf(fact.definition);
      quiz.push({
        id: `q-${lessonId}-${factIndex + 1}`,
        type: 'mcq',
        question: `Which statement best describes “${fact.term}”?`,
        options: shuffled,
        answer,
        explanation: `${fact.term}: ${fact.definition}`
      });
    });
    return quiz.length ? quiz : [{
      id: `q-${lessonId}-1`,
      type: 'mcq',
      question: `What is the main focus of ${lessonTitle}?`,
      options: ['A different topic', lessonTitle, 'A unrelated process', 'A tool feature'],
      answer: 1,
      explanation: `This lesson focuses on ${lessonTitle}.`
    }];
  }

  function buildLesson(config) {
    const {
      trackId,
      topic,
      topicIndex,
      lessonTitle,
      lessonIndex,
      facts,
      optionsPerQuestion
    } = config;
    const lessonId = `${trackId}-core-${topicIndex + 1}-${lessonIndex + 1}`;
    const objectives = facts.slice(0, 3).map((fact) => `Explain ${fact.term} and when it matters.`);
    const keyTerms = facts.map((fact) => ({ term: fact.term, definition: fact.definition }));
    const flashcards = facts.slice(0, 3).map((fact, index) => ({
      id: `fc-${lessonId}-${index + 1}`,
      front: fact.term,
      back: fact.definition
    }));
    const contentHtml = `<p><strong>${escapeHtml(lessonTitle)}.</strong> This lesson is part of <strong>${escapeHtml(topic.title)}</strong> and is written around the concepts most likely to appear in scenario questions.</p>
      <ul>${facts.map((fact) => `<li><strong>${escapeHtml(fact.term)}:</strong> ${escapeHtml(fact.definition)}</li>`).join('')}</ul>
      <p><strong>How to study it.</strong> Read each definition, then ask: what problem does this concept solve, which stakeholder cares, and what would a wrong answer look like? For exam practice, connect the concept to a short workplace scenario instead of memorizing the sentence.</p>
      <p><strong>Exam link.</strong> The full mock exams use the same concept pool, so a weak quiz here points to a topic worth reviewing before a timed attempt.</p>`;

    return {
      id: lessonId,
      title: lessonTitle,
      estimatedMinutes: trackId === 'cfa' ? 35 : 30,
      objectives,
      contentHtml,
      keyTerms,
      flashcards,
      quiz: buildQuiz(topic, lessonTitle, facts, optionsPerQuestion, lessonId),
      feynman: `Explain ${lessonTitle} to a colleague using one concrete example and one exam-style trap.`,
      examTopics: [topic.id]
    };
  }

  function buildModule(config) {
    const {
      trackId,
      topic,
      topicIndex,
      optionsPerQuestion
    } = config;
    const lessonTitles = topic.lessonTitles && topic.lessonTitles.length
      ? topic.lessonTitles
      : [topic.title];
    const factGroups = splitFacts(topic.facts, lessonTitles.length);
    const lessons = lessonTitles.map((lessonTitle, lessonIndex) => buildLesson({
      trackId,
      topic,
      topicIndex,
      lessonTitle,
      lessonIndex,
      facts: factGroups[lessonIndex],
      optionsPerQuestion
    }));

    return {
      id: `${trackId}-core-${topicIndex + 1}`,
      title: topic.title,
      description: `Deep-dive lessons for ${topic.title.toLowerCase()}, aligned to the full mock exams.`,
      lessons,
      examTopics: [topic.id]
    };
  }

  function buildModules(trackId, examContent, optionsPerQuestion) {
    return examContent.topics.map((topic, topicIndex) => buildModule({
      trackId,
      topic,
      topicIndex,
      optionsPerQuestion
    }));
  }

  function attach(trackId, modules, insertBeforeId) {
    const track = trackById[trackId];
    if (!track) return;
    const existingIds = new Set(track.modules.map((module) => module.id));
    const newModules = modules.filter((module) => !existingIds.has(module.id));
    if (!newModules.length) return;

    if (insertBeforeId) {
      const index = track.modules.findIndex((module) => module.id === insertBeforeId);
      if (index >= 0) {
        track.modules = track.modules.slice(0, index).concat(newModules, track.modules.slice(index));
        return;
      }
    }
    track.modules = track.modules.concat(newModules);
  }

  const baModules = buildModules('ba', content.ecba, 4);
  const cfaModules = buildModules('cfa', content.cfa, 3);
  const securitiesModules = content.securities ? buildModules('securities', content.securities, 4) : [];
  const istqbModules = content.istqb ? buildModules('istqb', content.istqb, 4) : [];

  attach('ba', baModules, 'ba-mod-5');
  attach('cfa', cfaModules);
  attach('securities', securitiesModules, 'sec-mod-9');
  attach('istqb', istqbModules, 'istqb-mod-7');

  const ba = trackById.ba;
  if (ba) {
    const baOrder = [
      'ba-mod-0',
      'ba-mod-1',
      'ba-core-1',
      'ba-core-2',
      'ba-core-3',
      'ba-core-4',
      'ba-core-5',
      'ba-core-6',
      'ba-core-7',
      'ba-core-8',
      'ba-core-9',
      'ba-core-10',
      'ba-core-11',
      'ba-core-12',
      'ba-mod-2',
      'ba-mod-3',
      'ba-mod-4',
      'ba-mod-9'
    ];
    const byId = new Map(ba.modules.map((module) => [module.id, module]));
    const ordered = baOrder.map((id) => byId.get(id)).filter(Boolean);
    const orderedIds = new Set(baOrder);
    const rest = ba.modules.filter((module) => !orderedIds.has(module.id));
    ba.modules = ordered.concat(rest);
    ba.description = 'Exam-ready ECBA coverage: BACCM and the nine domains, applied BA labs, three full mocks, an original scenario drill, and an optional wealth specialization.';
    ba.lessonsNote = 'Core ECBA deep dives, applied BA labs, three full mock exams, a scenario drill, and optional wealth modules.';
  }

  const cfa = trackById.cfa;
  if (cfa) {
    cfa.description = 'CFA Level I 2027 orientation plus full-coverage deep dives and three full mock exams.';
    cfa.lessonsNote = 'Deep dives, three full mock exams, and a 2027-weight study plan.';
  }

  const securities = trackById.securities;
  if (securities) {
    securities.lessonsNote = 'Two orientation lessons, eight SRTC-aligned topic modules, a final review, three practice mocks, and an optional trading-app bridge.';
  }

  const istqb = trackById.istqb;
  if (istqb) {
    istqb.lessonsNote = 'Two orientation lessons, six CTFL chapter modules, a final review, three practice mocks, and an optional trading-app QA bridge.';
  }
})();
