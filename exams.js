window.NEZHA_EXAMS = (() => {
  const registry = new Map();
  const insertionOrder = [];

  function hashString(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let value = seed >>> 0;
    return () => {
      value = Math.imul(value + 0x6D2B79F5, 1);
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(items, seed) {
    const copy = items.slice();
    const random = seededRandom(seed);
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function normalizeExamSet(raw) {
    if (!raw || typeof raw !== 'object' || !raw.id) return null;
    if (!Array.isArray(raw.sections) || !Array.isArray(raw.questions)) return null;
    const sections = raw.sections.map((section) => ({
      ...section,
      id: String(section.id),
      title: String(section.title || section.id),
      minutes: Math.max(1, Number(section.minutes) || 1),
      type: String(section.type || 'mcq'),
      description: String(section.description || ''),
      instructions: String(section.instructions || ''),
      audioSrc: String(section.audioSrc || ''),
      transcriptHtml: String(section.transcriptHtml || ''),
      passageHtml: String(section.passageHtml || ''),
      tasks: Array.isArray(section.tasks)
        ? section.tasks.map((task) => ({
          ...task,
          id: String(task.id || ''),
          title: String(task.title || ''),
          promptHtml: String(task.promptHtml || ''),
          cueCardHtml: String(task.cueCardHtml || ''),
          minWords: Math.max(0, Number(task.minWords) || 0),
          recommendedMinutes: Math.max(1, Number(task.recommendedMinutes) || 1)
        }))
        : []
    }));
    const questions = raw.questions.filter((question) => {
      return question
        && question.id
        && Array.isArray(question.options)
        && question.options.length >= 2
        && Number.isInteger(Number(question.answer));
    }).map((question) => ({
      ...question,
      id: String(question.id),
      answer: Number(question.answer),
      sectionId: String(question.sectionId || ''),
      topicId: String(question.topicId || ''),
      topicTitle: String(question.topicTitle || ''),
      lessonRef: String(question.lessonRef || '')
    }));
    return {
      ...raw,
      id: String(raw.id),
      title: String(raw.title || raw.id),
      trackId: String(raw.trackId || ''),
      examType: String(raw.examType || ''),
      lessonId: String(raw.lessonId || raw.id),
      year: Number(raw.year) || null,
      targetPercent: Number(raw.targetPercent) || 70,
      passNote: String(raw.passNote || ''),
      source: String(raw.source || ''),
      sections,
      questions,
      questionCount: questions.length,
      durationMinutes: Number(raw.durationMinutes) || sections.reduce((sum, section) => sum + section.minutes, 0)
    };
  }

  function register(rawSet, options) {
    const examSet = normalizeExamSet(rawSet);
    if (!examSet) return false;
    const config = options && typeof options === 'object' ? options : {};
    const existing = registry.get(examSet.id);

    if (!existing || config.replace === true) {
      registry.set(examSet.id, examSet);
      if (!insertionOrder.includes(examSet.id)) insertionOrder.push(examSet.id);
      return true;
    }

    const existingFormIds = new Set(existing.questions.map((question) => question.id));
    const newQuestions = examSet.questions.filter((question) => !existingFormIds.has(question.id));
    const sectionIds = new Set(existing.sections.map((section) => section.id));
    const newSections = examSet.sections.filter((section) => !sectionIds.has(section.id));

    if (newQuestions.length) {
      existing.questions = existing.questions.concat(newQuestions);
      existing.sections = existing.sections.concat(newSections);
      existing.questionCount = existing.questions.length;
      existing.durationMinutes = existing.sections.reduce((sum, section) => sum + section.minutes, 0);
      existing.updatedAt = Date.now();
      return true;
    }

    return false;
  }

  function registerMany(rawSets, options) {
    if (!Array.isArray(rawSets)) return 0;
    let added = 0;
    rawSets.forEach((rawSet) => {
      if (register(rawSet, options)) added += 1;
    });
    return added;
  }

  function list() {
    return insertionOrder.map((id) => registry.get(id)).filter(Boolean);
  }

  function byTrack(trackId) {
    return list().filter((examSet) => examSet.trackId === trackId);
  }

  function get(id) {
    return registry.get(String(id || '')) || null;
  }

  function makeQuestion(config) {
    const {
      content,
      topic,
      topicIndex,
      fact,
      factIndex,
      variant,
      optionsPerQuestion,
      seed
    } = config;
    const otherFacts = topic.facts
      .map((item, index) => ({ ...item, sourceIndex: index }))
      .filter((item) => item.sourceIndex !== factIndex);
    const distractors = shuffle(otherFacts, seed).slice(0, Math.max(1, optionsPerQuestion - 1));
    const lessonRef = `${content.trackId}-core-${topicIndex + 1}-1`;

    if (variant === 1) {
      const options = shuffle(
        [{ text: fact.term, correct: true }].concat(distractors.map((item) => ({ text: item.term, correct: false }))),
        seed + 17
      );
      const answer = options.findIndex((item) => item.correct);
      return {
        id: `q-${content.id}-${topic.id}-${factIndex + 1}-${variant + 1}`,
        sectionId: topic.sectionId,
        topicId: topic.id,
        topicTitle: topic.title,
        lessonRef,
        question: `Which term best matches this description: “${fact.definition}”?`,
        options: options.map((item) => item.text),
        answer,
        explanation: `${fact.term} is the term defined as: ${fact.definition}`
      };
    }

    const correctText = fact.definition;
    const wrongText = distractors[0] ? distractors[0].definition : 'A different concept is being described.';
    const baseOptions = variant === 2
      ? [{ text: correctText, correct: false }, { text: wrongText, correct: true }].concat(
        distractors.slice(1).map((item) => ({ text: item.definition, correct: false }))
      )
      : [{ text: correctText, correct: true }].concat(
        distractors.map((item) => ({ text: item.definition, correct: false }))
      );
    const options = shuffle(baseOptions, seed + 31);
    const answer = options.findIndex((item) => item.correct);
    const question = variant === 2
      ? `Which statement is least accurate regarding “${fact.term}”?`
      : `Which statement best describes “${fact.term}”?`;
    const explanation = variant === 2
      ? `The least accurate statement is: “${wrongText}” — it is not a description of ${fact.term}. ${fact.term} is best described as: ${fact.definition}`
      : `${fact.term} is best described as: ${fact.definition}`;

    return {
      id: `q-${content.id}-${topic.id}-${factIndex + 1}-${variant + 1}`,
      sectionId: topic.sectionId,
      topicId: topic.id,
      topicTitle: topic.title,
      lessonRef,
      question,
      options: options.map((item) => item.text),
      answer,
      explanation
    };
  }

  function buildForm(content, formIndex, options) {
    const examId = `${content.id}-mock-${formIndex + 1}`;
    const sections = content.sections.map((section) => ({ ...section }));
    const questions = [];
    const theoryTopics = content.topics.filter((topic) => Number(topic.examCount) > 0);

    theoryTopics.forEach((topic, topicIndex) => {
      const count = Number(topic.examCount) || 0;
      for (let index = 0; index < count; index += 1) {
        const factIndex = (formIndex + index) % topic.facts.length;
        const fact = topic.facts[factIndex];
        const variant = formIndex % 3;
        const seed = hashString(`${examId}|${topic.id}|${factIndex}|${variant}`);
        questions.push(makeQuestion({
          content,
          topic,
          topicIndex: content.topics.findIndex((item) => item.id === topic.id),
          fact,
          factIndex,
          variant,
          optionsPerQuestion: options.optionsPerQuestion,
          seed
        }));
      }
    });

    return {
      id: examId,
      title: `${content.title} Full Mock ${formIndex + 1}`,
      trackId: content.trackId,
      examType: content.id.toUpperCase(),
      lessonId: examId,
      year: content.year,
      targetPercent: content.targetPercent,
      passNote: content.passNote,
      source: content.id,
      sections,
      questions,
      formNumber: formIndex + 1,
      questionCount: questions.length,
      durationMinutes: sections.reduce((sum, section) => sum + section.minutes, 0)
    };
  }

  function buildFactExamSets(content, options) {
    const config = options && typeof options === 'object' ? options : {};
    const formCount = Math.max(1, Number(config.forms) || 3);
    const optionsPerQuestion = Math.max(2, Number(config.optionsPerQuestion) || 4);
    const forms = [];
    for (let formIndex = 0; formIndex < formCount; formIndex += 1) {
      forms.push(buildForm(content, formIndex, { optionsPerQuestion }));
    }
    return forms;
  }

  return {
    register,
    registerMany,
    list,
    byTrack,
    get,
    buildFactExamSets,
    all: list
  };
})();
