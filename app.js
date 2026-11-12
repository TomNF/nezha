(() => {
  'use strict';

  const STORAGE_KEY = 'nezha.v1';
  const LEGACY_STORAGE_KEYS = ['study' + 'os.v1'];
  const CURRICULUM = window.NEZHA_CURRICULUM;

  if (!CURRICULUM || !Array.isArray(CURRICULUM.tracks)) {
    const appRoot = document.getElementById('app');
    if (appRoot) {
      appRoot.innerHTML = '<div class="empty-state"><div><h3>Không tải được dữ liệu</h3><p>Kiểm tra lại curriculum.js.</p></div></div>';
    }
    return;
  }

  const TRACKS = CURRICULUM.tracks;
  const TRACK_BY_ID = Object.fromEntries(TRACKS.map((track) => [track.id, track]));
  const EXAM_REGISTRY = window.NEZHA_EXAMS;
  const EXAM_SETS = EXAM_REGISTRY ? EXAM_REGISTRY.list() : [];
  const EXAM_BY_ID = new Map();
  const EXAM_BY_LESSON = new Map();
  const LESSON_CONTEXT = new Map();
  const CARD_CONTEXT = new Map();
  const ALL_LESSONS = [];
  const ALL_CARDS = [];
  const CFA_ASSESSMENT_REGISTRY = window.NEZHA_CFA_ASSESSMENTS || null;
  const CFA_PHASE0 = window.NEZHA_CFA_PHASE0 || null;
  const CFA_TOPICS = CFA_PHASE0 && Array.isArray(CFA_PHASE0.topics) ? CFA_PHASE0.topics : [];
  const CFA_PHASE0_ASSESSMENT = CFA_ASSESSMENT_REGISTRY
    ? CFA_ASSESSMENT_REGISTRY.get('cfa-phase0-diagnostic')
    : null;
  const CFA_DIAGNOSTIC = CFA_PHASE0_ASSESSMENT
    || (CFA_PHASE0 && CFA_PHASE0.diagnostic)
    || { totalQuestions: 0, estimatedMinutes: 0, sections: [] };
  const CFA_PLAN = CFA_PHASE0 && CFA_PHASE0.plan
    ? CFA_PHASE0.plan
    : { totalHours: 300, defaultWeeklyHours: 6, minWeeklyHours: 3, maxWeeklyHours: 20, recommendedMonths: '9–12' };
  const CFA_ROUTES = CFA_PHASE0 && CFA_PHASE0.routes
    ? CFA_PHASE0.routes
    : {
      foundations: { id: 'foundations', label: 'Foundations', summary: 'Bắt đầu với nền tảng trước khi vào core CFA.' },
      'fast-track': { id: 'fast-track', label: 'Fast-track', summary: 'Làm nền tảng nhanh rồi vào core.' },
      core: { id: 'core', label: 'Core-ready', summary: 'Có thể bắt đầu core sớm.' }
    };
  const CFA_DISCLAIMER = CFA_PHASE0 && CFA_PHASE0.disclaimer
    ? CFA_PHASE0.disclaimer
    : 'Đây là chẩn đoán định hướng, không phải điểm pass CFA và không phải đề thi chính thức.';
  const CFA_PRACTICE = (CFA_ASSESSMENT_REGISTRY
    ? CFA_ASSESSMENT_REGISTRY.get('cfa-phase1a-practice')
    : null)
    || window.NEZHA_CFA_PRACTICE
    || null;
  const CFA_LESSON_QUIZ_BANK = CFA_ASSESSMENT_REGISTRY
    ? CFA_ASSESSMENT_REGISTRY.get('cfa-phase1a-lesson-quizzes')
    : null;
  const CFA_PRACTICE_TOPICS = CFA_PRACTICE && Array.isArray(CFA_PRACTICE.topics) ? CFA_PRACTICE.topics : [];
  const CFA_PRACTICE_QUESTIONS = CFA_PRACTICE && Array.isArray(CFA_PRACTICE.questions)
    ? CFA_PRACTICE.questions
    : [];
  const CFA_PRACTICE_BY_ID = new Map(CFA_PRACTICE_QUESTIONS.map((question) => [question.id, question]));
  const CFA_PRACTICE_BY_TOPIC = Object.fromEntries(CFA_PRACTICE_TOPICS.map((topic) => [
    topic.id,
    CFA_PRACTICE_QUESTIONS.filter((question) => question.topicId === topic.id)
  ]));
  const CFA_FORMULAS = window.NEZHA_CFA_FORMULAS || null;
  const CFA_FORMULA_LIST = CFA_FORMULAS && Array.isArray(CFA_FORMULAS.formulas)
    ? CFA_FORMULAS.formulas
    : [];
  const CFA_FORMULA_BY_ID = new Map(CFA_FORMULA_LIST.map((formula) => [formula.id, formula]));
  const CFA_FORMULA_CATEGORIES = CFA_FORMULAS && Array.isArray(CFA_FORMULAS.categories)
    ? CFA_FORMULAS.categories
    : [];
  const CFA_PRACTICE_ATTEMPT_LIMIT = 500;
  const CFA_ERROR_LIMIT = 200;

  function examLesson(examSet) {
    const taskCount = examSet.sections.reduce((sum, section) => {
      return sum + (Array.isArray(section.tasks) ? section.tasks.length : 0);
    }, 0);
    const isTaskExam = taskCount > 0;
    const objectives = isTaskExam
      ? [
        `Complete ${taskCount} timed task${taskCount === 1 ? '' : 's'}`,
        'Save your response and review it against the rubric',
        'Choose one language or structure goal for the next attempt'
      ]
      : [
        `Complete ${examSet.questions.length} questions under timed conditions`,
        'Review every incorrect answer by topic',
        'Use the result to choose the next study block'
      ];
    return {
      id: examSet.lessonId,
      title: examSet.title,
      estimatedMinutes: Number(examSet.durationMinutes) || examSet.sections.reduce((sum, section) => sum + Number(section.minutes || 0), 0),
      objectives,
      contentHtml: '',
      keyTerms: [],
      flashcards: [],
      quiz: [],
      feynman: '',
      examId: examSet.id,
      examFormNumber: Number(examSet.formNumber) || 0,
      examQuestionCount: examSet.questions.length || taskCount,
      isExam: true
    };
  }

  function hydrateExamModules() {
    const byTrack = new Map();
    EXAM_SETS.forEach((examSet) => {
      if (!TRACK_BY_ID[examSet.trackId]) return;
      const list = byTrack.get(examSet.trackId) || [];
      list.push(examSet);
      byTrack.set(examSet.trackId, list);
    });

    byTrack.forEach((sets, trackId) => {
      const track = TRACK_BY_ID[trackId];
      let module = track.modules.find((item) => item.id === `${trackId}-exam-module`);
      if (!module) {
        module = {
          id: `${trackId}-exam-module`,
          title: track.examModuleTitle || 'Full Mock Exams',
          description: 'Timed practice exams with section timing, review, and topic breakdown.',
          lessons: []
        };
        const optionalIndex = track.modules.findIndex((item) => item && item.optional);
        if (optionalIndex >= 0) {
          track.modules.splice(optionalIndex, 0, module);
        } else {
          track.modules.push(module);
        }
      } else if (track.examModuleTitle) {
        module.title = track.examModuleTitle;
      }
      const existing = new Set(module.lessons.map((lesson) => lesson.id));
      sets.forEach((examSet) => {
        if (!existing.has(examSet.lessonId)) module.lessons.push(examLesson(examSet));
      });
      module.lessons.sort((a, b) => (a.examFormNumber || 0) - (b.examFormNumber || 0));
    });

    EXAM_SETS.forEach((examSet) => {
      EXAM_BY_ID.set(examSet.id, examSet);
      EXAM_BY_LESSON.set(examSet.lessonId, examSet);
    });
  }

  hydrateExamModules();
  const PORTFOLIO_ARTIFACTS = Array.isArray(CURRICULUM.portfolioArtifacts)
    ? CURRICULUM.portfolioArtifacts
    : [];
  const INTERVIEW_QUESTIONS = Array.isArray(CURRICULUM.interviewQuestions)
    ? CURRICULUM.interviewQuestions
    : [];

  TRACKS.forEach((track) => {
    track.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (CFA_LESSON_QUIZ_BANK && CFA_LESSON_QUIZ_BANK.lessonQuizzes) {
          const bankQuiz = CFA_LESSON_QUIZ_BANK.lessonQuizzes[lesson.id];
          if (Array.isArray(bankQuiz)) lesson.quiz = bankQuiz;
        }
        LESSON_CONTEXT.set(lesson.id, { track, module, lesson });
        ALL_LESSONS.push({ track, module, lesson });
        lesson.flashcards.forEach((flashcard) => {
          const entry = { flashcard, lesson, module, track };
          CARD_CONTEXT.set(flashcard.id, entry);
          ALL_CARDS.push(entry);
        });
      });
    });
  });

  const app = document.getElementById('app');
  const pageTitle = document.getElementById('pageTitle');
  const topWeekMinutes = document.getElementById('topWeekMinutes');
  const topStreak = document.getElementById('topStreak');
  const topDueCards = document.getElementById('topDueCards');
  const toastEl = document.getElementById('toast');

  const ROUTE_TITLES = {
    dashboard: 'Dashboard',
    today: 'Hôm nay',
    tracks: 'Lộ trình',
    review: 'Ôn tập',
    stats: 'Thống kê',
    portfolio: 'Hồ sơ',
    settings: 'Cài đặt',
    cfa: 'CFA Readiness',
    'cfa-diagnostic': 'CFA Diagnostic',
    'cfa-practice': 'CFA Practice',
    'cfa-formulas': 'CFA Formula Sheet',
    'cfa-errors': 'CFA Error Log'
  };

  const quizState = Object.create(null);
  const examReviewState = Object.create(null);
  const reviewState = { currentId: null, revealed: false };
  const cfaFormulaView = { query: '', category: 'all' };
  const cfaErrorView = { status: 'open' };
  const focusTimer = {
    duration: 25 * 60,
    remaining: 25 * 60,
    running: false,
    paused: false,
    intervalId: null
  };

  function clampNumber(value, min, max, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, Math.round(number)));
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || 0));
  }

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

  function dateKey(date) {
    const value = new Date(date);
    return [
      value.getFullYear(),
      String(value.getMonth() + 1).padStart(2, '0'),
      String(value.getDate()).padStart(2, '0')
    ].join('-');
  }

  function formatDate(timestamp) {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(timestamp));
  }

  function formatWeekday(date) {
    return ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][new Date(date).getDay()];
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.round(seconds));
    return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
  }

  function formatDue(timestamp) {
    const diff = Number(timestamp) - Date.now();
    if (diff <= 0) return 'bây giờ';
    const minutes = Math.round(diff / 60000);
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} giờ`;
    return `${Math.round(hours / 24)} ngày`;
  }

  function newCard() {
    return {
      ease: 2.5,
      interval: 0,
      repetition: 0,
      dueAt: Date.now(),
      lapses: 0,
      lastReviewedAt: null
    };
  }

  function newPortfolioState() {
    return {
      artifacts: Object.fromEntries(PORTFOLIO_ARTIFACTS.map((artifact) => [
        artifact.id,
        { status: 'todo', link: '', notes: '', updatedAt: null }
      ]))
    };
  }

  function defaultCfaState() {
    return {
      targetDate: null,
      weeklyHours: Number(CFA_PLAN.defaultWeeklyHours) || 6,
      startedAt: null,
      diagnostic: {
        status: 'todo',
        score: null,
        route: null,
        completedAt: null,
        answers: {},
        byTopic: {}
      },
      practice: {
        attempts: [],
        active: null
      },
      errorLog: [],
      formulas: {}
    };
  }

  function defaultState() {
    return {
      version: 3,
      settings: {
        weeklyMinutes: 210,
        studyDays: [1, 2, 3, 4, 5],
        activeTrackId: TRACK_BY_ID.ba ? 'ba' : TRACKS[0].id,
        examProfile: 'ECBA',
        theme: 'auto',
        manualUnlock: Object.fromEntries(TRACKS.map((track) => [track.id, false]))
      },
      progress: {},
      cards: {},
      sessions: [],
      exams: {},
      cfa: defaultCfaState(),
      portfolio: newPortfolioState(),
      meta: {
        createdAt: new Date().toISOString(),
        lastOpenedAt: new Date().toISOString()
      }
    };
  }

  function normalizePortfolio(raw) {
    const base = newPortfolioState();
    if (!raw || typeof raw !== 'object') return base;
    const rawArtifacts = raw.artifacts && typeof raw.artifacts === 'object' ? raw.artifacts : {};

    Object.keys(base.artifacts).forEach((id) => {
      const item = rawArtifacts[id];
      if (!item || typeof item !== 'object') return;
      base.artifacts[id] = {
        status: ['todo', 'doing', 'done'].includes(item.status) ? item.status : 'todo',
        link: item.link ? String(item.link) : '',
        notes: item.notes ? String(item.notes) : '',
        updatedAt: Number.isFinite(Number(item.updatedAt)) ? Number(item.updatedAt) : null
      };
    });

    return base;
  }

  function normalizeAnswerMap(raw) {
    const result = {};
    if (!raw || typeof raw !== 'object') return result;
    Object.entries(raw).forEach(([key, value]) => {
      const answer = Number(value);
      if (Number.isInteger(answer) && answer >= 0) result[String(key)] = answer;
    });
    return result;
  }

  function normalizeBoolMap(raw) {
    const result = {};
    if (!raw || typeof raw !== 'object') return result;
    Object.entries(raw).forEach(([key, value]) => {
      if (value) result[String(key)] = true;
    });
    return result;
  }

  function normalizeTextMap(raw) {
    const result = {};
    if (!raw || typeof raw !== 'object') return result;
    Object.entries(raw).forEach(([key, value]) => {
      if (value == null) return;
      result[String(key)] = String(value).slice(0, 50000);
    });
    return result;
  }

  function normalizeRubricMap(raw) {
    const result = {};
    if (!raw || typeof raw !== 'object') return result;
    Object.entries(raw).forEach(([key, value]) => {
      const score = Number(value);
      if (Number.isInteger(score) && score >= 1 && score <= 9) result[String(key)] = score;
    });
    return result;
  }

  function countWords(value) {
    const text = String(value || '').trim();
    return text ? text.split(/\s+/).length : 0;
  }

  function normalizeSectionResults(raw) {
    const result = {};
    if (!raw || typeof raw !== 'object') return result;
    Object.entries(raw).forEach(([key, value]) => {
      if (!value || typeof value !== 'object') return;
      result[String(key)] = {
        correct: Math.max(0, Number(value.correct) || 0),
        total: Math.max(0, Number(value.total) || 0),
        submittedAt: Number(value.submittedAt) || null
      };
    });
    return result;
  }

  function normalizeCfaPractice(raw) {
    const base = { attempts: [], active: null };
    if (!raw || typeof raw !== 'object') return base;

    const attempts = Array.isArray(raw.attempts)
      ? raw.attempts
        .filter((attempt) => attempt && typeof attempt === 'object' && CFA_PRACTICE_BY_ID.has(String(attempt.questionId || '')))
        .map((attempt) => {
          const question = CFA_PRACTICE_BY_ID.get(String(attempt.questionId));
          const selected = clampNumber(attempt.selected, 0, question.options.length - 1, 0);
          return {
            id: String(attempt.id || `cfa-attempt-${attempt.at || Date.now()}`),
            sessionId: String(attempt.sessionId || ''),
            questionId: question.id,
            topicId: question.topicId,
            selected,
            correct: selected === question.answer,
            at: Number(attempt.at) || Date.now(),
            mode: attempt.mode === 'retry' ? 'retry' : 'topic'
          };
        })
        .slice(-CFA_PRACTICE_ATTEMPT_LIMIT)
      : [];

    let active = null;
    if (raw.active && typeof raw.active === 'object') {
      const topicId = String(raw.active.topicId || '');
      const topicValid = topicId === 'mixed' || CFA_PRACTICE_TOPICS.some((topic) => topic.id === topicId);
      const questionIds = Array.isArray(raw.active.questionIds)
        ? raw.active.questionIds.map(String).filter((id) => CFA_PRACTICE_BY_ID.has(id))
        : [];
      if (topicValid && questionIds.length) {
        active = {
          id: String(raw.active.id || `cfa-practice-${raw.active.startedAt || Date.now()}`),
          topicId,
          questionIds,
          index: clampNumber(raw.active.index, 0, questionIds.length - 1, 0),
          answers: normalizeAnswerMap(raw.active.answers),
          result: null,
          startedAt: Number(raw.active.startedAt) || Date.now(),
          mode: raw.active.mode === 'retry' ? 'retry' : 'topic',
          finished: Boolean(raw.active.finished)
        };

        if (raw.active.result && typeof raw.active.result === 'object') {
          const resultQuestionId = String(raw.active.result.questionId || '');
          const question = CFA_PRACTICE_BY_ID.get(resultQuestionId);
          if (question) {
            const selected = clampNumber(raw.active.result.selected, 0, question.options.length - 1, 0);
            active.result = {
              questionId: question.id,
              selected,
              correct: selected === question.answer,
              answeredAt: Number(raw.active.result.answeredAt) || null
            };
          }
        }
      }
    }

    return { attempts, active };
  }

  function normalizeCfaErrorLog(raw) {
    if (!Array.isArray(raw)) return [];
    const entries = raw
      .filter((entry) => entry && typeof entry === 'object' && CFA_PRACTICE_BY_ID.has(String(entry.questionId || '')))
      .map((entry) => {
        const question = CFA_PRACTICE_BY_ID.get(String(entry.questionId));
        const selected = clampNumber(entry.selected, 0, question.options.length - 1, 0);
        const resolved = Boolean(entry.resolved);
        return {
          id: String(entry.id || `cfa-error-${question.id}`),
          questionId: question.id,
          topicId: question.topicId,
          selected,
          attempts: Math.max(1, Number(entry.attempts) || 1),
          firstAt: Number(entry.firstAt) || Date.now(),
          lastAt: Number(entry.lastAt) || Date.now(),
          resolved,
          resolvedAt: resolved ? (Number(entry.resolvedAt) || Date.now()) : null
        };
      })
      .sort((a, b) => a.lastAt - b.lastAt)
      .slice(-CFA_ERROR_LIMIT);

    const byQuestion = new Map();
    entries.forEach((entry) => byQuestion.set(entry.questionId, entry));
    return [...byQuestion.values()];
  }

  function normalizeCfaFormulas(raw) {
    const result = {};
    if (!raw || typeof raw !== 'object') return result;
    Object.entries(raw).forEach(([formulaId, value]) => {
      if (!CFA_FORMULA_BY_ID.has(formulaId) || !value || typeof value !== 'object') return;
      const confidence = clampNumber(value.confidence, 0, 3, 0);
      if (!confidence) return;
      result[formulaId] = {
        confidence,
        updatedAt: Number(value.updatedAt) || null
      };
    });
    return result;
  }

  function normalizeCfa(raw) {
    const base = defaultCfaState();
    if (!raw || typeof raw !== 'object') return base;

    const rawDiagnostic = raw.diagnostic && typeof raw.diagnostic === 'object'
      ? raw.diagnostic
      : {};
    const byTopic = {};
    if (rawDiagnostic.byTopic && typeof rawDiagnostic.byTopic === 'object') {
      Object.entries(rawDiagnostic.byTopic).forEach(([key, value]) => {
        if (!value || typeof value !== 'object') return;
        const correct = Math.max(0, Number(value.correct) || 0);
        const total = Math.max(0, Number(value.total) || 0);
        byTopic[String(key)] = { correct: Math.min(correct, total), total };
      });
    }

    const score = Number(rawDiagnostic.score);
    const completedAt = Number(rawDiagnostic.completedAt);
    const startedAt = Number(raw.startedAt);

    return {
      targetDate: /^\d{4}-\d{2}-\d{2}$/.test(String(raw.targetDate || ''))
        ? String(raw.targetDate)
        : null,
      weeklyHours: clampNumber(
        raw.weeklyHours,
        CFA_PLAN.minWeeklyHours || 3,
        CFA_PLAN.maxWeeklyHours || 20,
        base.weeklyHours
      ),
      startedAt: Number.isFinite(startedAt) ? startedAt : null,
      diagnostic: {
        status: ['todo', 'done'].includes(rawDiagnostic.status) ? rawDiagnostic.status : 'todo',
        score: Number.isFinite(score) ? clampNumber(score, 0, 100, 0) : null,
        route: CFA_ROUTES[rawDiagnostic.route] ? rawDiagnostic.route : null,
        completedAt: Number.isFinite(completedAt) ? completedAt : null,
        answers: normalizeAnswerMap(rawDiagnostic.answers),
        byTopic
      },
      practice: normalizeCfaPractice(raw.practice),
      errorLog: normalizeCfaErrorLog(raw.errorLog),
      formulas: normalizeCfaFormulas(raw.formulas)
    };
  }

  function normalizeExams(raw) {
    const result = {};
    if (!raw || typeof raw !== 'object') return result;

    Object.entries(raw).forEach(([examId, record]) => {
      if (!record || typeof record !== 'object') return;
      const attempts = Array.isArray(record.attempts)
        ? record.attempts
          .filter((attempt) => attempt && typeof attempt === 'object')
          .map((attempt) => ({
            id: String(attempt.id || `attempt-${attempt.at || Date.now()}`),
            at: Number(attempt.at) || Date.now(),
            totalCorrect: Math.max(0, Number(attempt.totalCorrect) || 0),
            totalQuestions: Math.max(0, Number(attempt.totalQuestions) || 0),
            percent: Math.max(0, Math.min(100, Number(attempt.percent) || 0)),
            sections: Array.isArray(attempt.sections)
              ? attempt.sections.map((section) => ({
                id: String(section.id || ''),
                title: String(section.title || ''),
                correct: Math.max(0, Number(section.correct) || 0),
                total: Math.max(0, Number(section.total) || 0)
              }))
              : [],
            topics: Array.isArray(attempt.topics)
              ? attempt.topics.map((topic) => ({
                id: String(topic.id || ''),
                title: String(topic.title || ''),
                correct: Math.max(0, Number(topic.correct) || 0),
                total: Math.max(0, Number(topic.total) || 0)
              }))
              : [],
            answers: normalizeAnswerMap(attempt.answers),
            responses: normalizeTextMap(attempt.responses),
            rubric: normalizeRubricMap(attempt.rubric),
            selfAssessed: Boolean(attempt.selfAssessed)
          }))
        : [];

      let active = null;
      if (record.active && typeof record.active === 'object') {
        active = {
          startedAt: Number(record.active.startedAt) || Date.now(),
          currentSectionIndex: clampNumber(record.active.currentSectionIndex, 0, 10, 0),
          currentQuestionIndex: clampNumber(record.active.currentQuestionIndex, 0, 1000, 0),
          remainingSeconds: Math.max(0, Number(record.active.remainingSeconds) || 0),
          answers: normalizeAnswerMap(record.active.answers),
          responses: normalizeTextMap(record.active.responses),
          rubric: normalizeRubricMap(record.active.rubric),
          flagged: normalizeBoolMap(record.active.flagged),
          submittedSections: normalizeBoolMap(record.active.submittedSections),
          sectionResults: normalizeSectionResults(record.active.sectionResults),
          breakStartedAt: Number(record.active.breakStartedAt) || null,
          awaitingBreak: Boolean(record.active.awaitingBreak)
        };
      }

      if (attempts.length || active) {
        result[String(examId)] = { attempts, active };
      }
    });

    return result;
  }

  function normalizeState(raw) {
    const base = defaultState();
    if (!raw || typeof raw !== 'object') return base;

    const rawSettings = raw.settings && typeof raw.settings === 'object' ? raw.settings : {};
    const rawUnlock = rawSettings.manualUnlock && typeof rawSettings.manualUnlock === 'object'
      ? rawSettings.manualUnlock
      : {};

    const studyDays = Array.isArray(rawSettings.studyDays)
      ? [...new Set(rawSettings.studyDays.map(Number).filter((day) => day >= 0 && day <= 6))]
      : base.settings.studyDays;

    const sessions = Array.isArray(raw.sessions)
      ? raw.sessions
        .filter((session) => session && typeof session === 'object' && Number.isFinite(Number(session.at)))
        .map((session) => ({
          id: String(session.id || `s-${session.at}`),
          type: String(session.type || 'study'),
          minutes: Math.max(0, Number(session.minutes) || 0),
          lessonId: session.lessonId ? String(session.lessonId) : null,
          at: Number(session.at)
        }))
      : [];

    return {
      version: 3,
      settings: {
        weeklyMinutes: clampNumber(rawSettings.weeklyMinutes, 30, 3000, base.settings.weeklyMinutes),
        studyDays: studyDays.length ? studyDays : base.settings.studyDays,
        activeTrackId: TRACK_BY_ID[rawSettings.activeTrackId] ? rawSettings.activeTrackId : base.settings.activeTrackId,
        examProfile: ['ECBA', 'CCBA', 'CBAP'].includes(rawSettings.examProfile)
          ? rawSettings.examProfile
          : base.settings.examProfile,
        theme: ['auto', 'light', 'dark'].includes(rawSettings.theme) ? rawSettings.theme : base.settings.theme,
        manualUnlock: {
          ...base.settings.manualUnlock,
          ...Object.fromEntries(
            Object.entries(rawUnlock).map(([key, value]) => [key, Boolean(value)])
          )
        }
      },
      progress: raw.progress && typeof raw.progress === 'object' ? raw.progress : {},
      cards: raw.cards && typeof raw.cards === 'object' ? raw.cards : {},
      sessions,
      exams: normalizeExams(raw.exams),
      cfa: normalizeCfa(raw.cfa),
      portfolio: normalizePortfolio(raw.portfolio),
      meta: {
        ...base.meta,
        ...(raw.meta && typeof raw.meta === 'object' ? raw.meta : {})
      }
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return normalizeState(JSON.parse(raw));
      for (const legacyKey of LEGACY_STORAGE_KEYS) {
        const legacy = localStorage.getItem(legacyKey);
        if (!legacy) continue;
        const parsed = JSON.parse(legacy);
        localStorage.setItem(STORAGE_KEY, legacy);
        localStorage.removeItem(legacyKey);
        return normalizeState(parsed);
      }
      return defaultState();
    } catch (error) {
      console.warn('NeZha: cannot load saved data.', error);
      return defaultState();
    }
  }

  let state = loadState();
  let saveTimer = null;

  function saveState() {
    try {
      state.meta.lastOpenedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('NeZha: cannot save data.', error);
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 300);
  }

  function ensureCards() {
    let changed = false;
    ALL_CARDS.forEach(({ flashcard }) => {
      const current = state.cards[flashcard.id];
      if (!current || typeof current !== 'object') {
        state.cards[flashcard.id] = newCard();
        changed = true;
        return;
      }
      if (!Number.isFinite(Number(current.ease))) {
        current.ease = 2.5;
        changed = true;
      }
      if (!Number.isFinite(Number(current.interval))) {
        current.interval = 0;
        changed = true;
      }
      if (!Number.isFinite(Number(current.repetition))) {
        current.repetition = 0;
        changed = true;
      }
      if (!Number.isFinite(Number(current.dueAt))) {
        current.dueAt = Date.now();
        changed = true;
      }
    });
    if (changed) saveState();
  }

  function getProgress(lessonId) {
    const progress = state.progress[lessonId];
    if (!progress || typeof progress !== 'object') {
      return {
        completed: false,
        completedAt: null,
        confidence: 0,
        notes: '',
        feynman: '',
        quizCorrect: 0,
        quizTotal: 0,
        lastQuizAt: null,
        lastViewedAt: null
      };
    }
    return progress;
  }

  function ensureProgress(lessonId) {
    if (!state.progress[lessonId] || typeof state.progress[lessonId] !== 'object') {
      state.progress[lessonId] = {
        completed: false,
        completedAt: null,
        confidence: 0,
        notes: '',
        feynman: '',
        quizCorrect: 0,
        quizTotal: 0,
        lastQuizAt: null,
        lastViewedAt: null
      };
    }
    return state.progress[lessonId];
  }

  function ensureExamRecord(examId) {
    if (!state.exams || typeof state.exams !== 'object') state.exams = {};
    if (!state.exams[examId] || typeof state.exams[examId] !== 'object') {
      state.exams[examId] = { attempts: [], active: null };
    }
    const record = state.exams[examId];
    if (!Array.isArray(record.attempts)) record.attempts = [];
    if (record.active && typeof record.active !== 'object') record.active = null;
    return record;
  }

  function getExamRecord(examId) {
    const record = state.exams && state.exams[examId];
    return record && typeof record === 'object'
      ? record
      : { attempts: [], active: null };
  }

  function getActiveExam(examId) {
    const record = getExamRecord(examId);
    return record.active && typeof record.active === 'object' ? record.active : null;
  }

  function examSectionQuestions(exam, sectionId) {
    return exam.questions.filter((question) => question.sectionId === sectionId);
  }

  function examSectionById(exam, sectionId) {
    return exam.sections.find((section) => section.id === sectionId) || null;
  }

  function examSectionTotal(exam, section) {
    if (section && Array.isArray(section.tasks) && section.tasks.length) return section.tasks.length;
    return examSectionQuestions(exam, section ? section.id : '').length;
  }

  function examSectionAnswered(exam, active, sectionId) {
    const section = examSectionById(exam, sectionId);
    if (section && Array.isArray(section.tasks) && section.tasks.length) {
      const responses = active.responses || {};
      return section.tasks.filter((task) => String(responses[task.id] || '').trim()).length;
    }
    const questions = examSectionQuestions(exam, sectionId);
    return questions.filter((question) => active.answers[question.id] != null).length;
  }

  function examSectionScore(exam, active, sectionId) {
    const questions = examSectionQuestions(exam, sectionId);
    return questions.reduce((score, question) => {
      return score + (active.answers[question.id] === question.answer ? 1 : 0);
    }, 0);
  }

  function formatExamMinutes(minutes) {
    const value = Math.max(0, Math.round(Number(minutes) || 0));
    if (value < 60) return `${value} phút`;
    const hours = Math.floor(value / 60);
    const remainder = value % 60;
    return remainder ? `${hours} giờ ${remainder} phút` : `${hours} giờ`;
  }

  function startExam(examId, force) {
    const exam = EXAM_BY_ID.get(examId);
    if (!exam) return;
    const record = ensureExamRecord(examId);
    if (record.active && !force) {
      showToast('Bài thi đang dở. Tiếp tục làm bài.');
      render();
      return;
    }
    const firstSection = exam.sections[0];
    record.active = {
      startedAt: Date.now(),
      currentSectionIndex: 0,
      currentQuestionIndex: 0,
      remainingSeconds: Math.max(1, Number(firstSection.minutes) || 1) * 60,
      answers: {},
      responses: {},
      rubric: {},
      flagged: {},
      submittedSections: {},
      sectionResults: {},
      breakStartedAt: null,
      awaitingBreak: false
    };
    saveState();
    render();
    showToast(`Bắt đầu ${exam.title}.`);
  }

  function submitExamSection(examId, automatic) {
    const exam = EXAM_BY_ID.get(examId);
    const record = ensureExamRecord(examId);
    const active = record.active;
    if (!exam || !active) return;

    const section = exam.sections[active.currentSectionIndex];
    if (!section || active.submittedSections[section.id]) return;
    const questions = examSectionQuestions(exam, section.id);
    const answered = examSectionAnswered(exam, active, section.id);

    if (Array.isArray(section.tasks) && section.tasks.length) {
      if (!automatic && !window.confirm('Nộp bài? Bạn vẫn có thể xem lại và tự chấm sau khi nộp.')) return;
      active.sectionResults[section.id] = {
        correct: 0,
        total: 0,
        submittedAt: Date.now()
      };
      active.submittedSections[section.id] = true;
      finalizeExam(examId, active);
      return;
    }

    if (!automatic && answered < questions.length) {
      if (!window.confirm(`Còn ${questions.length - answered} câu chưa trả lời. Nộp phần này?`)) return;
    }

    const correct = examSectionScore(exam, active, section.id);
    active.sectionResults[section.id] = {
      correct,
      total: questions.length,
      submittedAt: Date.now()
    };
    active.submittedSections[section.id] = true;

    if (active.currentSectionIndex < exam.sections.length - 1) {
      active.awaitingBreak = true;
      active.breakStartedAt = Date.now();
      saveState();
      render();
      showToast(`Đã nộp ${section.title}: ${correct}/${questions.length}.`, 'success');
      return;
    }

    finalizeExam(examId, active);
  }

  function finalizeExam(examId, active) {
    const exam = EXAM_BY_ID.get(examId);
    if (!exam || !active) return;

    const isTaskExam = exam.questions.length === 0
      && exam.sections.some((section) => Array.isArray(section.tasks) && section.tasks.length);
    if (isTaskExam) {
      const rubricScores = Object.values(active.rubric || {})
        .map(Number)
        .filter((score) => Number.isInteger(score) && score >= 1 && score <= 9);
      const percent = rubricScores.length
        ? Math.round((rubricScores.reduce((sum, score) => sum + score, 0) / rubricScores.length / 9) * 100)
        : 0;
      const attempt = {
        id: `attempt-${Date.now()}`,
        at: Date.now(),
        totalCorrect: 0,
        totalQuestions: 0,
        percent,
        sections: exam.sections.map((section) => ({
          id: section.id,
          title: section.title,
          correct: 0,
          total: 0
        })),
        topics: [],
        answers: {},
        responses: { ...(active.responses || {}) },
        rubric: { ...(active.rubric || {}) },
        selfAssessed: rubricScores.length > 0
      };
      const record = ensureExamRecord(examId);
      record.attempts.unshift(attempt);
      record.active = null;
      const progress = ensureProgress(examId);
      progress.completed = true;
      progress.completedAt = Date.now();
      progress.lastViewedAt = Date.now();
      const studiedMinutes = Math.max(1, Math.round((Date.now() - active.startedAt) / 60000));
      addSession({ type: 'exam', minutes: studiedMinutes, lessonId: examId });
      saveState();
      render();
      showToast(`Đã lưu ${exam.title}. Tự chấm rubric trong phần xem lại.`, 'success');
      return;
    }

    const sections = exam.sections.map((section) => {
      const questions = examSectionQuestions(exam, section.id);
      return {
        id: section.id,
        title: section.title,
        correct: examSectionScore(exam, active, section.id),
        total: questions.length
      };
    });

    const topicMap = new Map();
    exam.questions.forEach((question) => {
      const key = question.topicId || 'other';
      const current = topicMap.get(key) || {
        id: key,
        title: question.topicTitle || 'Other',
        correct: 0,
        total: 0
      };
      current.total += 1;
      if (active.answers[question.id] === question.answer) current.correct += 1;
      topicMap.set(key, current);
    });

    const totalCorrect = exam.questions.reduce((score, question) => {
      return score + (active.answers[question.id] === question.answer ? 1 : 0);
    }, 0);
    const totalQuestions = exam.questions.length;
    const percent = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const attempt = {
      id: `attempt-${Date.now()}`,
      at: Date.now(),
      totalCorrect,
      totalQuestions,
      percent,
      sections,
      topics: [...topicMap.values()],
      answers: { ...active.answers }
    };

    const record = ensureExamRecord(examId);
    record.attempts.unshift(attempt);
    record.active = null;

    const progress = ensureProgress(examId);
    progress.completed = true;
    progress.completedAt = Date.now();
    progress.quizCorrect = totalCorrect;
    progress.quizTotal = totalQuestions;
    progress.lastQuizAt = Date.now();

    const studiedMinutes = Math.max(1, Math.round((Date.now() - active.startedAt) / 60000));
    addSession({ type: 'exam', minutes: studiedMinutes, lessonId: examId });
    saveState();
    render();
    showToast(
      `Kết quả ${exam.title}: ${percent}% (${totalCorrect}/${totalQuestions}).`,
      percent >= exam.targetPercent ? 'success' : 'error'
    );
  }

  function tickExam() {
    const route = parseRoute();
    if (route.name !== 'lesson') return;
    const exam = EXAM_BY_LESSON.get(route.id);
    if (!exam) return;
    const active = getActiveExam(exam.id);
    if (!active || active.awaitingBreak) return;
    const section = exam.sections[active.currentSectionIndex];
    if (!section || active.submittedSections[section.id]) return;

    active.remainingSeconds = Math.max(0, Number(active.remainingSeconds) - 1);
    updateExamTimerDisplay(exam.id);
    if (active.remainingSeconds <= 0) {
      submitExamSection(exam.id, true);
      return;
    }
    if (active.remainingSeconds % 5 === 0) saveState();
  }

  function updateExamTimerDisplay(examId) {
    const exam = EXAM_BY_ID.get(examId);
    const active = exam ? getActiveExam(examId) : null;
    if (!exam || !active) return;
    const section = exam.sections[active.currentSectionIndex];
    if (!section) return;
    const remaining = Math.max(0, Number(active.remainingSeconds) || 0);
    document.querySelectorAll(`[data-exam-timer="${examId}"]`).forEach((element) => {
      element.textContent = formatTime(remaining);
      element.classList.toggle('warning', remaining <= 5 * 60);
      element.classList.toggle('danger', remaining <= 60);
    });
    document.querySelectorAll(`[data-exam-answered="${examId}"]`).forEach((element) => {
      element.textContent = `${examSectionAnswered(exam, active, section.id)}/${examSectionTotal(exam, section)}`;
    });
  }

  function lessonMastery(lessonId) {
    const progress = getProgress(lessonId);
    const completion = progress.completed ? 1 : 0;
    const quizAccuracy = Number(progress.quizTotal) > 0
      ? Number(progress.quizCorrect) / Number(progress.quizTotal)
      : 0;
    const confidence = clamp(progress.confidence, 0, 3) / 3;
    return Math.round((completion * 0.4 + quizAccuracy * 0.4 + confidence * 0.2) * 100);
  }

  function getTrackStats(track) {
    let lessons = 0;
    let completed = 0;
    let quizTotal = 0;
    let quizCorrect = 0;
    let coreMasterySum = 0;
    let cards = 0;
    let reviewed = 0;
    let coreLessons = 0;
    let coreCompleted = 0;
    let coreQuizTotal = 0;
    let coreQuizCorrect = 0;
    let coreCards = 0;
    let coreReviewed = 0;

    track.modules.forEach((module) => {
      const isOptional = Boolean(module.optional);
      module.lessons.forEach((lesson) => {
        lessons += 1;
        const progress = getProgress(lesson.id);
        if (progress.completed) completed += 1;
        quizTotal += Number(progress.quizTotal) || 0;
        quizCorrect += Number(progress.quizCorrect) || 0;

        if (!isOptional) {
          coreLessons += 1;
          if (progress.completed) coreCompleted += 1;
          coreQuizTotal += Number(progress.quizTotal) || 0;
          coreQuizCorrect += Number(progress.quizCorrect) || 0;
          coreMasterySum += lessonMastery(lesson.id);
        }

        lesson.flashcards.forEach((flashcard) => {
          cards += 1;
          const card = state.cards[flashcard.id];
          if (card && card.lastReviewedAt) {
            reviewed += 1;
            if (!isOptional) coreReviewed += 1;
          }
          if (!isOptional) coreCards += 1;
        });
      });
    });

    const mastery = coreLessons ? Math.round(coreMasterySum / coreLessons) : 0;
    const quizAccuracy = quizTotal ? quizCorrect / quizTotal : 0;
    const completion = lessons ? completed / lessons : 0;
    const coverage = cards ? reviewed / cards : 0;
    const coreQuizAccuracy = coreQuizTotal ? coreQuizCorrect / coreQuizTotal : 0;
    const coreCompletion = coreLessons ? coreCompleted / coreLessons : 0;
    const coreCoverage = coreCards ? coreReviewed / coreCards : 0;
    const readiness = coreLessons
      ? Math.round((coreQuizAccuracy * 0.5 + coreCompletion * 0.3 + coreCoverage * 0.2) * 100)
      : 0;

    return {
      lessons,
      completed,
      quizTotal,
      quizCorrect,
      quizAccuracy,
      completion,
      cards,
      reviewed,
      coverage,
      mastery,
      readiness,
      coreLessons,
      coreCompleted,
      coreQuizTotal,
      coreQuizCorrect,
      coreQuizAccuracy,
      coreCompletion,
      coreCards,
      coreReviewed,
      coreCoverage
    };
  }

  function getExamPrepStats(track) {
    const stats = getTrackStats(track);
    const exams = EXAM_SETS.filter((exam) => exam.trackId === track.id);
    const fullMocks = exams.filter((exam) => exam.examKind !== 'scenario');
    const scenarioDrills = exams.filter((exam) => exam.examKind === 'scenario');
    const latestAttempt = (examId) => {
      const record = getExamRecord(examId);
      return record.attempts.length ? record.attempts[0] : null;
    };
    const mockAttempts = fullMocks
      .map((exam) => ({ exam, attempt: latestAttempt(exam.id) }))
      .filter((item) => item.attempt);
    const mockAverage = mockAttempts.length
      ? Math.round(mockAttempts.reduce((sum, item) => sum + (Number(item.attempt.percent) || 0), 0) / mockAttempts.length)
      : 0;
    const scenarioAttempts = scenarioDrills
      .map((exam) => {
        const attempt = latestAttempt(exam.id);
        return attempt ? { exam, attempt, at: Number(attempt.at) || 0 } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.at - a.at);
    const scenarioLatest = scenarioAttempts.length ? scenarioAttempts[0].attempt : null;
    return { stats, fullMocks, scenarioDrills, mockAttempts, mockAverage, scenarioLatest };
  }

  function getExamPrepReadiness(track) {
    const prep = track.examPrep || {};
    const data = getExamPrepStats(track);
    const targetPercent = Number(prep.targetPercent) || 70;
    const readinessTarget = Number(prep.readinessTarget) || targetPercent;
    const scenarioTarget = Number(prep.scenarioTarget) || targetPercent;
    const checks = [
      {
        label: 'Bài core',
        value: `${data.stats.coreCompleted}/${data.stats.coreLessons}`,
        pass: data.stats.coreLessons > 0 && data.stats.coreCompleted === data.stats.coreLessons
      },
      {
        label: 'Quiz chính xác',
        value: `${Math.round(data.stats.coreQuizAccuracy * 100)}%`,
        pass: data.stats.coreQuizTotal > 0 && data.stats.coreQuizAccuracy * 100 >= readinessTarget
      },
      {
        label: 'Thẻ ghi nhớ',
        value: `${data.stats.coreReviewed}/${data.stats.coreCards} · ${Math.round(data.stats.coreCoverage * 100)}%`,
        pass: data.stats.coreCards > 0 && data.stats.coreCoverage * 100 >= 80
      },
      {
        label: 'Full mocks',
        value: `${data.mockAttempts.length}/${data.fullMocks.length} · TB ${data.mockAverage}%`,
        pass: data.fullMocks.length > 0
          && data.mockAttempts.length >= data.fullMocks.length
          && data.mockAverage >= readinessTarget
      }
    ];

    if (data.scenarioDrills.length) {
      checks.push({
        label: 'Scenario drill',
        value: data.scenarioLatest ? `${data.scenarioLatest.percent}%` : 'Chưa làm',
        pass: Boolean(data.scenarioLatest && Number(data.scenarioLatest.percent) >= scenarioTarget)
      });
    }

    return {
      prep,
      data,
      checks,
      ready: checks.every((check) => check.pass),
      targetPercent,
      readinessTarget,
      scenarioTarget
    };
  }

  function renderExamPrepCard(track) {
    const readiness = getExamPrepReadiness(track);
    const prep = readiness.prep;
    const rows = readiness.checks.map((check) => `<div class="split-row">
      <div class="split-row-copy"><strong>${escapeHtml(check.label)}</strong><span>${escapeHtml(check.value)}</span></div>
      <span class="badge ${check.pass ? 'success' : 'warning'}">${check.pass ? 'Đạt' : 'Cần ôn'}</span>
    </div>`).join('');

    return `<div class="card card-pad mt-16">
      <div class="card-header">
        <div><h3>Exam readiness · ${escapeHtml(prep.examName || track.shortTitle)}</h3><p>${escapeHtml(prep.format || '')}${prep.passMark ? ` · pass ${escapeHtml(prep.passMark)}` : ''} · mục tiêu luyện ${readiness.targetPercent}% · ngưỡng readiness ${readiness.readinessTarget}%</p></div>
        <span class="badge ${readiness.ready ? 'success' : 'primary'}">${readiness.ready ? 'Sẵn sàng' : 'Chưa sẵn sàng'}</span>
      </div>
      <div class="split-list">${rows}</div>
      <p class="faint small mt-12">${escapeHtml(prep.disclaimer || 'Đây là chỉ báo luyện tập, không phải cam kết đỗ.')}</p>
    </div>`;
  }

  function getOverallStats() {
    let lessons = 0;
    let completed = 0;
    let quizTotal = 0;
    let quizCorrect = 0;
    let cards = 0;
    let reviewed = 0;
    let masterySum = 0;
    let readinessSum = 0;
    const includedTracks = TRACKS.filter((track) => track.affectsOverall !== false);

    includedTracks.forEach((track) => {
      const stats = getTrackStats(track);
      lessons += stats.coreLessons;
      completed += stats.coreCompleted;
      quizTotal += stats.coreQuizTotal;
      quizCorrect += stats.coreQuizCorrect;
      cards += stats.coreCards;
      reviewed += stats.coreReviewed;
      masterySum += stats.mastery;
      readinessSum += stats.readiness;
    });

    return {
      trackCount: includedTracks.length,
      lessons,
      completed,
      quizTotal,
      quizCorrect,
      cards,
      reviewed,
      quizAccuracy: quizTotal ? quizCorrect / quizTotal : 0,
      mastery: includedTracks.length ? Math.round(masterySum / includedTracks.length) : 0,
      readiness: includedTracks.length ? Math.round(readinessSum / includedTracks.length) : 0
    };
  }

  function activeTrack() {
    return TRACK_BY_ID[state.settings.activeTrackId] || TRACKS[0];
  }

  function isTrackUnlocked(trackId) {
    const track = TRACK_BY_ID[trackId];
    if (!track) return false;
    if (track.optional) return true;
    if (state.settings.manualUnlock[trackId]) return true;
    if (!track.prerequisiteId) return true;

    const prerequisite = TRACK_BY_ID[track.prerequisiteId];
    return prerequisite ? getTrackStats(prerequisite).mastery >= 80 : true;
  }

  function getNextLesson(track) {
    for (const module of track.modules) {
      if (module.optional) continue;
      for (const lesson of module.lessons) {
        if (!getProgress(lesson.id).completed) return { track, module, lesson };
      }
    }
    return null;
  }

  function getWeakLesson(track) {
    const candidates = [];
    track.modules.forEach((module) => {
      if (module.optional) return;
      module.lessons.forEach((lesson) => {
        const progress = getProgress(lesson.id);
        if (Number(progress.quizTotal) > 0) {
          const accuracy = Number(progress.quizCorrect) / Number(progress.quizTotal);
          if (accuracy < 0.7) candidates.push({ track, module, lesson, accuracy });
        }
      });
    });
    candidates.sort((a, b) => a.accuracy - b.accuracy);
    return candidates[0] || null;
  }

  function getWeakLessons(limit) {
    return ALL_LESSONS
      .map(({ track, module, lesson }) => {
        const progress = getProgress(lesson.id);
        const accuracy = Number(progress.quizTotal) > 0
          ? Number(progress.quizCorrect) / Number(progress.quizTotal)
          : null;
        return {
          track,
          module,
          lesson,
          accuracy,
          confidence: clamp(progress.confidence, 0, 3),
          completed: Boolean(progress.completed)
        };
      })
      .filter((item) => {
        if (item.accuracy != null) return item.accuracy < 0.75;
        return item.completed && item.confidence < 2;
      })
      .sort((a, b) => {
        const aScore = a.accuracy == null ? 1 : a.accuracy;
        const bScore = b.accuracy == null ? 1 : b.accuracy;
        return aScore - bScore || a.confidence - b.confidence;
      })
      .slice(0, limit || 5);
  }

  function getDailyBudget() {
    const days = state.settings.studyDays.length || 5;
    return Math.max(15, Math.round(state.settings.weeklyMinutes / days));
  }

  function isStudyDayToday() {
    return state.settings.studyDays.includes(new Date().getDay());
  }

  function getDailyPlan() {
    const track = activeTrack();
    const plan = [];
    const due = getDueCards();

    if (due.length) {
      plan.push({
        type: 'review',
        title: `Ôn ${Math.min(due.length, 20)} thẻ đến hạn`,
        subtitle: 'Ôn trước để kiến thức cũ không rơi rụng.',
        minutes: Math.min(20, Math.max(5, due.length * 2)),
        href: '#/review',
        cta: 'Ôn ngay'
      });
    }

    const next = getNextLesson(track);
    if (next) {
      plan.push({
        type: 'lesson',
        title: next.lesson.title,
        subtitle: next.lesson.isExam ? `${next.track.shortTitle} · Full mock` : `${next.track.shortTitle} · ${next.module.title}`,
        minutes: next.lesson.estimatedMinutes,
        href: `#/lesson/${next.lesson.id}`,
        cta: next.lesson.isExam ? 'Thi' : 'Học'
      });
    }

    const weak = getWeakLesson(track);
    if (weak && (!next || weak.lesson.id !== next.lesson.id)) {
      plan.push({
        type: 'practice',
        title: `Luyện lại: ${weak.lesson.title}`,
        subtitle: `Quiz hiện tại ${Math.round(weak.accuracy * 100)}%`,
        minutes: 10,
        href: `#/lesson/${weak.lesson.id}`,
        cta: 'Luyện'
      });
    }

    const budget = getDailyBudget();
    const trimmed = [];
    let used = 0;

    plan.forEach((item) => {
      if (used >= budget) return;
      const minutes = Math.min(item.minutes, Math.max(5, budget - used));
      trimmed.push({ ...item, minutes });
      used += minutes;
    });

    return trimmed;
  }

  function getDueCards() {
    return ALL_CARDS
      .filter((entry) => {
        const card = state.cards[entry.flashcard.id];
        return card && Number(card.dueAt) <= Date.now();
      })
      .sort((a, b) => Number(state.cards[a.flashcard.id].dueAt) - Number(state.cards[b.flashcard.id].dueAt));
  }

  function getWeekStart(date) {
    const value = new Date(date || Date.now());
    value.setHours(0, 0, 0, 0);
    const offset = (value.getDay() + 6) % 7;
    value.setDate(value.getDate() - offset);
    return value;
  }

  function getWeekMinutes() {
    const start = getWeekStart().getTime();
    return state.sessions
      .filter((session) => session.at >= start)
      .reduce((sum, session) => sum + Number(session.minutes || 0), 0);
  }

  function getActivityDates() {
    const dates = new Set();
    state.sessions.forEach((session) => dates.add(dateKey(session.at)));
    Object.values(state.progress).forEach((progress) => {
      if (progress && progress.completedAt) dates.add(dateKey(progress.completedAt));
      if (progress && progress.lastQuizAt) dates.add(dateKey(progress.lastQuizAt));
    });
    return dates;
  }

  function getStreak() {
    const dates = getActivityDates();
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    if (!dates.has(dateKey(cursor))) cursor.setDate(cursor.getDate() - 1);

    let streak = 0;
    while (dates.has(dateKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function getRecentActivity(limit) {
    return state.sessions
      .slice()
      .sort((a, b) => b.at - a.at)
      .slice(0, limit || 6);
  }

  function getLast7Days() {
    const days = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    for (let index = 6; index >= 0; index -= 1) {
      const date = new Date(cursor);
      date.setDate(date.getDate() - index);
      const key = dateKey(date);
      const minutes = state.sessions
        .filter((session) => dateKey(session.at) === key)
        .reduce((sum, session) => sum + Number(session.minutes || 0), 0);
      days.push({ key, label: formatWeekday(date), minutes });
    }
    return days;
  }

  function getReviewForecast() {
    const now = Date.now();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const nextWeek = now + 7 * 24 * 60 * 60 * 1000;
    let dueNow = 0;
    let dueToday = 0;
    let upcoming = 0;

    ALL_CARDS.forEach(({ flashcard }) => {
      const card = state.cards[flashcard.id];
      if (!card) return;
      if (card.dueAt <= now) dueNow += 1;
      if (card.dueAt <= endOfDay.getTime()) dueToday += 1;
      if (card.dueAt > now && card.dueAt <= nextWeek) upcoming += 1;
    });

    return { dueNow, dueToday, upcoming };
  }

  function addSession(session) {
    state.sessions.push({
      id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: session.type || 'study',
      minutes: Math.max(0, Number(session.minutes) || 0),
      lessonId: session.lessonId || null,
      at: Date.now()
    });
    if (state.sessions.length > 700) state.sessions = state.sessions.slice(-700);
    saveState();
  }

  function maybeLogLessonSession(lesson) {
    const today = dateKey(new Date());
    const exists = state.sessions.some((session) => {
      return session.type === 'lesson'
        && session.lessonId === lesson.id
        && dateKey(session.at) === today;
    });
    if (!exists) addSession({ type: 'lesson', minutes: lesson.estimatedMinutes, lessonId: lesson.id });
  }

  function showToast(message, tone) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.className = `toast ${tone || ''}`.trim();
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toastEl.className = 'toast hidden';
    }, 3200);
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.settings.theme);
  }

  function updateChrome(route) {
    const context = route.name === 'lesson'
      ? LESSON_CONTEXT.get(route.id)
      : route.name === 'track'
        ? TRACK_BY_ID[route.id]
        : null;

    let title = ROUTE_TITLES[route.name] || 'NeZha';
    if (route.name === 'lesson' && context) title = context.lesson.title;
    if (route.name === 'track' && context) title = `${context.shortTitle} · Lộ trình`;

    if (pageTitle) pageTitle.textContent = title;
    document.title = `${title} · NeZha`;

    const navKey = route.name === 'track'
      || route.name === 'lesson'
      || route.name === 'cfa'
      || route.name === 'cfa-diagnostic'
      || route.name === 'cfa-practice'
      || route.name === 'cfa-formulas'
      || route.name === 'cfa-errors'
      ? 'tracks'
      : route.name;
    document.querySelectorAll('[data-nav]').forEach((link) => {
      if (link.dataset.nav === navKey) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (topWeekMinutes) topWeekMinutes.textContent = `${getWeekMinutes()} phút`;
    if (topStreak) topStreak.textContent = String(getStreak());
    if (topDueCards) topDueCards.textContent = String(getDueCards().length);
  }

  function progressBar(value, tone) {
    const width = clamp(value, 0, 100);
    return `<div class="progress ${tone || ''}"><span style="width:${width}%"></span></div>`;
  }

  function emptyState(title, text, actionHtml) {
    return `<div class="card empty-state"><div><div class="empty-state-mark">S</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p>${actionHtml || ''}</div></div>`;
  }

  function renderPlanItem(item) {
    return `<div class="plan-item">
      <div class="plan-item-copy">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.subtitle)}</span>
      </div>
      <div class="button-row">
        <span class="plan-item-time">${escapeHtml(item.minutes)} phút</span>
        <a class="button small" href="${item.href}">${escapeHtml(item.cta)}</a>
      </div>
    </div>`;
  }

  function renderActivityItem(session) {
    const context = session.lessonId ? LESSON_CONTEXT.get(session.lessonId) : null;
    const title = session.type === 'focus'
      ? `Focus ${session.minutes} phút`
      : session.type === 'exam' && context
        ? `Thi: ${context.lesson.title}`
        : context
          ? `Học: ${context.lesson.title}`
          : 'Hoạt động học';
    const badge = session.type === 'focus' ? 'Focus' : session.type === 'exam' ? 'Full mock' : 'Bài học';
    return `<div class="split-row">
      <div class="split-row-copy">
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(formatDate(session.at))}${session.minutes ? ` · ${session.minutes} phút` : ''}</span>
      </div>
      <span class="badge">${badge}</span>
    </div>`;
  }

  function renderTrackCard(track, index) {
    const stats = getTrackStats(track);
    const unlocked = isTrackUnlocked(track.id);
    const active = state.settings.activeTrackId === track.id;
    const lessonCount = track.examPrep ? stats.coreLessons : stats.lessons;
    const lessonDone = track.examPrep ? stats.coreCompleted : stats.completed;
    const completed = lessonCount > 0 && lessonDone === lessonCount;
    const role = track.optional ? 'Bổ trợ' : 'Chính';
    const badge = !unlocked
      ? '<span class="badge warning">Khoá</span>'
      : active
        ? `<span class="badge primary">Đang học · ${role}</span>`
        : completed
          ? `<span class="badge success">Hoàn thành · ${role}</span>`
          : `<span class="badge">${role}</span>`;

    return `<article class="card track-card ${unlocked ? '' : 'locked'}">
      <div class="track-top">
        <div class="track-index">${String(index + 1).padStart(2, '0')}</div>
        ${badge}
      </div>
      <div>
        <h3>${escapeHtml(track.title)}</h3>
        <p>${escapeHtml(track.description)}</p>
      </div>
      <div class="progress-wrap">
        <div class="meta-row"><span>Mastery</span><strong>${stats.mastery}%</strong></div>
        ${progressBar(stats.mastery, stats.mastery >= 80 ? 'success' : '')}
        <div class="meta-row"><span>${lessonDone}/${lessonCount} bài</span><span>${stats.readiness}% sẵn sàng</span></div>
      </div>
      <div class="button-row">
        ${unlocked
          ? `<a class="button primary small" href="#/track/${track.id}">Xem lộ trình</a>`
          : `<button class="button small" type="button" data-action="unlock-track" data-track="${track.id}">Mở khoá</button>`}
        ${!active && unlocked
          ? `<button class="button small" type="button" data-action="set-active" data-track="${track.id}">Chọn</button>`
          : ''}
      </div>
    </article>`;
  }

  function renderFocusCard() {
    const status = focusTimer.running ? 'Đang chạy' : focusTimer.paused ? 'Tạm dừng' : 'Sẵn sàng';
    return `<div class="card card-pad">
      <div class="card-header">
        <div>
          <h3>Focus timer</h3>
          <p>Hết giờ sẽ tự ghi số phút vào tuần này.</p>
        </div>
        <span class="badge ${focusTimer.running ? 'success' : 'primary'}" data-timer-status>${status}</span>
      </div>
      <p class="stat-label">Còn lại</p>
      <p class="stat-value mono" data-timer-display>${formatTime(focusTimer.remaining)}</p>
      <div class="button-row mt-12">
        <button class="button small" type="button" data-action="focus-start" data-minutes="15">15 phút</button>
        <button class="button small primary" type="button" data-action="focus-start" data-minutes="25">25 phút</button>
        <button class="button small" type="button" data-action="focus-start" data-minutes="50">50 phút</button>
        <button class="button small ghost" type="button" data-action="focus-pause">Tạm dừng</button>
        <button class="button small ghost" type="button" data-action="focus-reset">Đặt lại</button>
      </div>
    </div>`;
  }

  function renderDashboard() {
    const track = activeTrack();
    const stats = getTrackStats(track);
    const next = getNextLesson(track);
    const overall = getOverallStats();
    const due = getDueCards();
    const plan = getDailyPlan();
    const recent = getRecentActivity(5);
    const heroLessonCount = track.examPrep ? stats.coreLessons : stats.lessons;
    const heroLessonDone = track.examPrep ? stats.coreCompleted : stats.completed;
    const examStart = track.examPrep
      ? EXAM_SETS.find((exam) => exam.trackId === track.id && exam.examKind !== 'scenario')
      : null;

    const heroAction = next
      ? `<a class="button" href="#/lesson/${next.lesson.id}">Tiếp tục: ${escapeHtml(next.lesson.title)}</a>`
      : examStart
        ? `<a class="button" href="#/lesson/${escapeHtml(examStart.lessonId)}">Làm ${escapeHtml(examStart.title)}</a>`
        : '<a class="button" href="#/tracks">Chọn lộ trình mới</a>';

    return `<div class="page-head">
      <div>
        <h2>Hôm nay học gì?</h2>
        <p>Một hệ thống nhỏ, đều đặn, tập trung vào việc hiểu thật.</p>
      </div>
      <a class="button small" href="#/today">Kế hoạch hôm nay</a>
    </div>

    <section class="dashboard-hero">
      <div class="card hero-card">
        <p class="eyebrow">Lộ trình đang học</p>
        <h2>${escapeHtml(track.title)}</h2>
        <p>${escapeHtml(track.description)}</p>
        <div class="hero-progress">
          <div class="meta-row"><span>Mastery lộ trình</span><strong>${stats.mastery}%</strong></div>
          ${progressBar(stats.mastery, stats.mastery >= 80 ? 'success' : '')}
          <div class="meta-row"><span>${heroLessonDone}/${heroLessonCount} bài đã xong</span><span>${stats.readiness}% sẵn sàng</span></div>
        </div>
        <div class="button-row mt-16">
          ${heroAction}
          <a class="button ghost" href="#/tracks">Xem lộ trình</a>
        </div>
      </div>
      <div class="hero-side">
        <div class="card mini-stat">
          <p class="stat-label">Bài đã hoàn thành</p>
          <p class="stat-value">${overall.completed}/${overall.lessons}</p>
          <p class="stat-note">Trên ${overall.trackCount} lộ trình chính</p>
        </div>
        <div class="card mini-stat">
          <p class="stat-label">Thẻ đến hạn</p>
          <p class="stat-value">${due.length}</p>
          <p class="stat-note">${overall.reviewed}/${overall.cards} thẻ đã ôn</p>
        </div>
        <div class="card mini-stat">
          <p class="stat-label">Chuỗi ngày</p>
          <p class="stat-value">${getStreak()}</p>
          <p class="stat-note">${getWeekMinutes()} phút trong tuần</p>
        </div>
      </div>
    </section>

    <div class="grid grid-4 mt-16">
      <div class="card stat-card">
        <p class="stat-label">Quiz chính xác</p>
        <p class="stat-value">${Math.round(overall.quizAccuracy * 100)}%</p>
        <p class="stat-note">${overall.quizCorrect}/${overall.quizTotal} câu đúng</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Mastery tổng</p>
        <p class="stat-value">${overall.mastery}%</p>
        <p class="stat-note">Trung bình ${overall.trackCount} lộ trình chính</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Độ sẵn sàng</p>
        <p class="stat-value">${overall.readiness}%</p>
        <p class="stat-note">Quiz + hoàn thành + ôn tập</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Tuần này</p>
        <p class="stat-value">${getWeekMinutes()}</p>
        <p class="stat-note">phút học đã ghi nhận</p>
      </div>
    </div>

    <div class="section-head">
      <div><h3>Kế hoạch hôm nay</h3><p>Ước tính ${getDailyBudget()} phút theo mục tiêu tuần.</p></div>
      <a class="small" href="#/today">Chi tiết</a>
    </div>
    <div class="plan-list">
      ${plan.length ? plan.map(renderPlanItem).join('') : '<p class="muted small">Không còn việc bắt buộc. Có thể ôn thêm hoặc nghỉ ngơi.</p>'}
    </div>

    <div class="section-head"><div><h3>${TRACKS.length} lộ trình</h3><p>ECBA là lộ trình chính; Securities Theory, ISTQB, CFA, IELTS, Fintech là bổ trợ.</p></div></div>
    <div class="track-grid">${TRACKS.map(renderTrackCard).join('')}</div>

    <div class="section-head"><div><h3>Hoạt động gần đây</h3><p>Những gì đã được ghi nhận trên máy này.</p></div></div>
    <div class="card card-pad">
      <div class="split-list">
        ${recent.length ? recent.map(renderActivityItem).join('') : '<p class="muted small">Chưa có hoạt động. Bắt đầu bằng một bài học hoặc phiên focus.</p>'}
      </div>
    </div>`;
  }

  function renderToday() {
    const due = getDueCards();
    const plan = getDailyPlan();
    const studyDay = isStudyDayToday();
    const duePreview = due.slice(0, 6).map((entry) => {
      return `<div class="split-row">
        <div class="split-row-copy">
          <strong>${escapeHtml(entry.flashcard.front)}</strong>
          <span>${escapeHtml(entry.track.shortTitle)} · ${escapeHtml(entry.lesson.title)}</span>
        </div>
        <span class="badge warning">Đến hạn</span>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <p class="eyebrow">${escapeHtml(formatDate(Date.now()))}</p>
        <h2>Hôm nay</h2>
        <p>${studyDay ? 'Ngày học đã chọn. Giữ nhịp, đừng cố quá.' : 'Hôm nay không nằm trong ngày học đã chọn — vẫn có thể học nhẹ.'}</p>
      </div>
      <span class="badge primary">${getDailyBudget()} phút</span>
    </div>

    <div class="grid grid-2">
      <div class="card card-pad">
        <div class="card-header">
          <div><h3>Việc cần làm</h3><p>Thứ tự gợi ý: ôn → học mới → luyện điểm yếu.</p></div>
          <span class="badge">${plan.length} việc</span>
        </div>
        <div class="plan-list">
          ${plan.length ? plan.map(renderPlanItem).join('') : '<p class="muted small">Không có việc nào. Có thể nghỉ hoặc ôn tự do.</p>'}
        </div>
      </div>
      ${renderFocusCard()}
    </div>

    <div class="section-head">
      <div><h3>Thẻ đến hạn</h3><p>${due.length} thẻ đang chờ ôn.</p></div>
      <a class="small" href="#/review">Ôn tất cả</a>
    </div>
    <div class="card card-pad">
      <div class="split-list">
        ${duePreview || '<p class="muted small">Không có thẻ đến hạn. Tốt lắm.</p>'}
      </div>
    </div>`;
  }

  function renderTracks() {
    return `<div class="page-head">
      <div>
        <h2>Lộ trình</h2>
        <p>ECBA là lộ trình chính với exam-ready coverage, applied BA labs, scenario drill và wealth specialization tùy chọn; Securities Theory, ISTQB, CFA, IELTS, Fintech là bổ trợ, không bắt buộc.</p>
      </div>
      <span class="badge primary">${TRACKS.length} lộ trình</span>
    </div>
    <div class="track-grid">${TRACKS.map(renderTrackCard).join('')}</div>
    <p class="faint small mt-16">ECBA luôn mở. Các lộ trình bổ trợ có thể học trước, học song song, hoặc bỏ qua.</p>`;
  }

  function cfaDiagnosticQuestions() {
    return CFA_DIAGNOSTIC.sections.flatMap((section) => {
      return section.questions.map((question) => ({
        ...question,
        sectionId: section.id,
        sectionTitle: section.title
      }));
    });
  }

  function getCfaPlanSummary() {
    const totalHours = Number(CFA_PLAN.totalHours) || 300;
    const weeklyHours = Number(state.cfa.weeklyHours) || Number(CFA_PLAN.defaultWeeklyHours) || 6;
    const weeksNeeded = Math.max(1, Math.ceil(totalHours / Math.max(1, weeklyHours)));
    const now = new Date();
    const projected = new Date(now.getTime() + weeksNeeded * 7 * 24 * 60 * 60 * 1000);
    let targetDate = null;
    let weeksAvailable = null;
    let requiredWeeklyHours = null;
    let onTrack = null;

    if (state.cfa.targetDate) {
      const parsed = new Date(`${state.cfa.targetDate}T00:00:00`);
      if (!Number.isNaN(parsed.getTime())) {
        targetDate = parsed;
        weeksAvailable = Math.max(0, Math.ceil((parsed.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000)));
        requiredWeeklyHours = weeksAvailable > 0 ? totalHours / weeksAvailable : null;
        onTrack = requiredWeeklyHours == null ? false : weeklyHours >= requiredWeeklyHours;
      }
    }

    return {
      totalHours,
      weeklyHours,
      weeksNeeded,
      projected,
      targetDate,
      weeksAvailable,
      requiredWeeklyHours,
      onTrack
    };
  }

  function getCfaPhase1Modules() {
    const cfa = TRACK_BY_ID.cfa;
    if (!cfa) return [];
    return cfa.modules.filter((module) => module.id.indexOf('cfa-phase1-') === 0);
  }

  function getCfaPhase1Lessons() {
    return getCfaPhase1Modules().flatMap((module) => {
      return module.lessons.map((lesson) => ({ module, lesson }));
    });
  }

  function shuffleArray(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const temp = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = temp;
    }
    return copy;
  }

  function getCfaPracticeQuestion(questionId) {
    return CFA_PRACTICE_BY_ID.get(questionId) || null;
  }

  function getCfaPracticeStats() {
    const attempts = state.cfa.practice.attempts;
    const total = attempts.length;
    const correct = attempts.filter((attempt) => attempt.correct).length;
    const byTopic = {};
    CFA_PRACTICE_TOPICS.forEach((topic) => {
      const topicAttempts = attempts.filter((attempt) => attempt.topicId === topic.id);
      const topicCorrect = topicAttempts.filter((attempt) => attempt.correct).length;
      byTopic[topic.id] = {
        total: topicAttempts.length,
        correct: topicCorrect,
        accuracy: topicAttempts.length ? topicCorrect / topicAttempts.length : 0
      };
    });

    return {
      total,
      correct,
      accuracy: total ? correct / total : 0,
      byTopic
    };
  }

  function getCfaErrorStats() {
    const entries = state.cfa.errorLog;
    const resolved = entries.filter((entry) => entry.resolved).length;
    const unresolved = entries.length - resolved;
    return {
      total: entries.length,
      resolved,
      unresolved,
      resolutionRate: entries.length ? resolved / entries.length : 0
    };
  }

  function getCfaFormulaStats() {
    const total = CFA_FORMULA_LIST.length;
    const entries = Object.entries(state.cfa.formulas).filter(([formulaId]) => CFA_FORMULA_BY_ID.has(formulaId));
    const rated = entries.length;
    const average = rated
      ? entries.reduce((sum, [, value]) => sum + (Number(value.confidence) || 0), 0) / rated
      : 0;
    const coverage = total ? rated / total : 0;
    const score = total ? (average / 3) * coverage : 0;

    return {
      total,
      rated,
      average,
      coverage,
      score
    };
  }

  function getCfaReadiness() {
    const diagnostic = state.cfa.diagnostic;
    const diagnosticScore = diagnostic.status === 'done' ? Number(diagnostic.score) || 0 : 0;
    const practice = getCfaPracticeStats();
    const errors = getCfaErrorStats();
    const formulas = getCfaFormulaStats();
    const practiceScore = practice.total ? practice.accuracy * 100 : 0;
    const resolutionScore = practice.total
      ? (errors.total ? errors.resolutionRate * 100 : 100)
      : 0;
    const formulaScore = formulas.score * 100;
    const overall = Math.round(
      diagnosticScore * 0.25
      + practiceScore * 0.45
      + resolutionScore * 0.15
      + formulaScore * 0.15
    );

    return {
      overall,
      diagnosticScore,
      practiceScore,
      resolutionScore,
      formulaScore,
      practice,
      errors,
      formulas
    };
  }

  function getCfaPracticeSessionSummary(active) {
    const total = active.questionIds.length;
    const answered = active.questionIds.filter((questionId) => active.answers[questionId] != null).length;
    const correct = active.questionIds.reduce((sum, questionId) => {
      const question = getCfaPracticeQuestion(questionId);
      return sum + (question && active.answers[questionId] === question.answer ? 1 : 0);
    }, 0);
    return {
      total,
      answered,
      correct,
      percent: total ? Math.round((correct / total) * 100) : 0
    };
  }

  function renderCfaEntryCard() {
    if (!CFA_PHASE0) return '';
    const diagnostic = state.cfa.diagnostic;
    const route = diagnostic.route ? CFA_ROUTES[diagnostic.route] : null;
    const plan = getCfaPlanSummary();
    const readiness = getCfaReadiness();
    const practice = getCfaPracticeStats();
    const statusLabel = diagnostic.status === 'done'
      ? `${diagnostic.score}% · ${route ? route.label : 'Đã chẩn đoán'}`
      : 'Chưa chẩn đoán';

    return `<div class="card card-pad cfa-entry-card mt-16">
      <div class="card-header">
        <div><h3>CFA Readiness — Phase 0 + 1A</h3><p>Chẩn đoán, kế hoạch 300 giờ, 12 bài Foundations và practice 100 câu.</p></div>
        <span class="badge ${diagnostic.status === 'done' ? 'success' : 'warning'}">${statusLabel}</span>
      </div>
      <div class="cfa-entry-grid">
        <div>
          <span class="stat-label">Nhịp học</span>
          <strong>${plan.weeklyHours} giờ/tuần</strong>
          <span class="faint small">${plan.totalHours} giờ · khoảng ${plan.weeksNeeded} tuần</span>
        </div>
        <div>
          <span class="stat-label">Dự kiến hoàn thành</span>
          <strong>${formatDate(plan.projected.getTime())}</strong>
          <span class="faint small">Nếu giữ nhịp hiện tại</span>
        </div>
        <div>
          <span class="stat-label">Bước tiếp theo</span>
          <strong>${diagnostic.status === 'done' ? 'Practice Phase 1A' : 'Làm diagnostic'}</strong>
          <span class="faint small">${diagnostic.status === 'done' ? `${practice.total} câu đã làm · ${Math.round(practice.accuracy * 100)}% đúng` : `${CFA_DIAGNOSTIC.totalQuestions} câu · ~${CFA_DIAGNOSTIC.estimatedMinutes} phút`}</span>
        </div>
      </div>
      <div class="button-row mt-16">
        <a class="button primary small" href="#/cfa">${diagnostic.status === 'done' ? `Mở CFA Readiness · ${readiness.overall}%` : 'Bắt đầu Phase 0'}</a>
        ${diagnostic.status === 'done' ? '<a class="button small" href="#/cfa/practice">Practice 100 câu</a>' : ''}
        ${diagnostic.status === 'done' ? '<a class="button small" href="#/cfa/diagnostic">Xem / làm lại diagnostic</a>' : ''}
      </div>
    </div>`;
  }

  function renderCfaHub() {
    if (!CFA_PHASE0) {
      return emptyState('CFA Phase 0 chưa tải', 'Không tìm thấy cfa-blueprint.js.', '<a class="button primary" href="#/track/cfa">Về CFA track</a>');
    }

    const diagnostic = state.cfa.diagnostic;
    const route = diagnostic.route ? CFA_ROUTES[diagnostic.route] : null;
    const plan = getCfaPlanSummary();
    const readiness = getCfaReadiness();
    const practiceStats = getCfaPracticeStats();
    const errorStats = getCfaErrorStats();
    const formulaStats = getCfaFormulaStats();
    const phase1Modules = getCfaPhase1Modules();
    const phase1Lessons = getCfaPhase1Lessons();
    const topicResults = diagnostic.status === 'done' ? diagnostic.byTopic : {};

    const topicRows = CFA_TOPICS.map((topic) => {
      const result = topicResults[topic.id] || { correct: 0, total: 0 };
      const percent = result.total ? Math.round((result.correct / result.total) * 100) : null;
      return `<div class="cfa-topic-row">
        <div class="cfa-topic-copy">
          <strong>${escapeHtml(topic.title)}</strong>
          <span>${escapeHtml(topic.weight)} · ${escapeHtml(topic.note)}</span>
        </div>
        ${percent == null
          ? '<span class="badge">Chưa đo</span>'
          : `<span class="badge ${percent >= 70 ? 'success' : percent >= 50 ? 'warning' : 'danger'}">${percent}%</span>`}
      </div>`;
    }).join('');

    const routeCard = diagnostic.status === 'done' && route
      ? `<div class="card card-pad cfa-route-card">
          <div class="card-header">
            <div><h3>Kết quả chẩn đoán</h3><p>${escapeHtml(formatDate(diagnostic.completedAt || Date.now()))}</p></div>
            <span class="badge primary">${escapeHtml(route.label)}</span>
          </div>
          <p class="stat-value">${diagnostic.score}%</p>
          <p class="muted small mt-12">${escapeHtml(route.summary)}</p>
          <div class="button-row mt-16">
            <a class="button small" href="#/cfa/diagnostic">Xem chi tiết / làm lại</a>
            <a class="button small ghost" href="#/track/cfa">CFA track hiện tại</a>
          </div>
        </div>`
      : `<div class="card card-pad cfa-route-card">
          <div class="card-header">
            <div><h3>Chẩn đoán đầu vào</h3><p>${CFA_DIAGNOSTIC.totalQuestions} câu · khoảng ${CFA_DIAGNOSTIC.estimatedMinutes} phút</p></div>
            <span class="badge warning">Chưa làm</span>
          </div>
          <p class="muted small">Kết quả dùng để chọn Foundations, Fast-track hoặc Core-ready. Đây không phải điểm pass CFA.</p>
          <a class="button primary small mt-16" href="#/cfa/diagnostic">Bắt đầu diagnostic</a>
        </div>`;

    const requiredText = plan.requiredWeeklyHours == null
      ? 'Chưa đặt ngày thi mục tiêu.'
      : `Cần khoảng <strong>${Math.ceil(plan.requiredWeeklyHours)} giờ/tuần</strong> để kịp ngày ${formatDate(plan.targetDate.getTime())}.`;
    const trackText = plan.onTrack == null
      ? 'Đặt ngày thi để kiểm tra mức phù hợp.'
      : plan.onTrack
        ? 'Nhịp hiện tại phù hợp với ngày thi mục tiêu.'
        : 'Nhịp hiện tại chưa đủ cho ngày thi mục tiêu.';

    const readinessRows = [
      ['Diagnostic', readiness.diagnosticScore, '25%'],
      ['Practice accuracy', readiness.practiceScore, '45%'],
      ['Error resolution', readiness.resolutionScore, '15%'],
      ['Formula confidence', readiness.formulaScore, '15%']
    ].map(([label, value, weight]) => {
      const tone = value >= 70 ? 'success' : value >= 50 ? 'warning' : '';
      return `<div class="cfa-readiness-row">
        <div class="cfa-topic-copy"><strong>${escapeHtml(label)}</strong><span>Trọng số ${weight}</span></div>
        <div class="cfa-result-meter">${progressBar(value, tone)}<span>${Math.round(value)}%</span></div>
      </div>`;
    }).join('');

    const phase1Cards = phase1Modules.map((module) => {
      const moduleDone = module.lessons.filter((lesson) => getProgress(lesson.id).completed).length;
      return `<div class="card card-pad">
        <div class="card-header">
          <div><h3>${escapeHtml(module.title)}</h3><p>${escapeHtml(module.description)}</p></div>
          <span class="badge ${moduleDone === module.lessons.length && module.lessons.length ? 'success' : ''}">${moduleDone}/${module.lessons.length}</span>
        </div>
        <div class="button-row mt-16">
          <a class="button primary small" href="#/lesson/${module.lessons[0].id}">Mở module</a>
          <a class="button small ghost" href="#/track/cfa">Xem trong CFA track</a>
        </div>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/track/cfa">← CFA track</a>
        <h2>CFA Readiness</h2>
        <p>Phase 0 và 1A: chẩn đoán, kế hoạch 300 giờ, 12 bài Foundations, practice 100 câu và formula sheet.</p>
        <span class="badge primary">Phase 0 + 1A</span>
      </div>
      <div class="button-row">
        <a class="button small" href="#/cfa/practice">Practice</a>
        <a class="button small ghost" href="#/cfa/diagnostic">${diagnostic.status === 'done' ? 'Làm lại diagnostic' : 'Làm diagnostic'}</a>
      </div>
    </div>

    <div class="cfa-disclaimer">${escapeHtml(CFA_DISCLAIMER)}</div>

    <div class="grid grid-4 mt-16">
      <div class="card stat-card">
        <p class="stat-label">Chẩn đoán</p>
        <p class="stat-value">${diagnostic.status === 'done' ? `${diagnostic.score}%` : '—'}</p>
        <p class="stat-note">${route ? route.label : 'Chưa làm'}</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Mục tiêu</p>
        <p class="stat-value">${plan.weeklyHours}h</p>
        <p class="stat-note">mỗi tuần · ${plan.totalHours} giờ tổng</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Cần</p>
        <p class="stat-value">${plan.requiredWeeklyHours == null ? '—' : `${Math.ceil(plan.requiredWeeklyHours)}h`}</p>
        <p class="stat-note">${plan.weeksAvailable == null ? 'Chưa có ngày thi' : `${plan.weeksAvailable} tuần còn lại`}</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Dự kiến xong</p>
        <p class="stat-value cfa-date-value">${formatDate(plan.projected.getTime())}</p>
        <p class="stat-note">${plan.weeksNeeded} tuần theo nhịp hiện tại</p>
      </div>
    </div>

    <div class="grid grid-2 mt-16">
      ${routeCard}
      <div class="card card-pad">
        <div class="card-header"><div><h3>Kế hoạch học</h3><p>Mục tiêu 9–12 tháng, 6–8 giờ/tuần.</p></div><span class="badge">300 giờ</span></div>
        <div class="cfa-plan-grid">
          <div class="field">
            <label for="cfaTargetDate">Ngày thi mục tiêu</label>
            <input class="input" id="cfaTargetDate" type="date" data-cfa-field="targetDate" value="${state.cfa.targetDate || ''}">
          </div>
          <div class="field">
            <label for="cfaWeeklyHours">Giờ học mỗi tuần</label>
            <input class="input" id="cfaWeeklyHours" type="number" min="${CFA_PLAN.minWeeklyHours || 3}" max="${CFA_PLAN.maxWeeklyHours || 20}" step="1" data-cfa-field="weeklyHours" value="${plan.weeklyHours}">
          </div>
        </div>
        <div class="cfa-plan-note">
          <p>${requiredText}</p>
          <p class="${plan.onTrack === false ? 'danger-text' : ''}">${trackText}</p>
        </div>
        <p class="faint small mt-12">Ngày thi chỉ dùng để tính nhịp học. Hãy xác nhận ngày thi thật trên CFA Institute trước khi đặt mục tiêu.</p>
      </div>
    </div>

    <div class="section-head">
      <div><h3>Phase 1A · Foundations</h3><p>12 bài Finance math + Quant TVM, 100 câu practice, error log và formula sheet.</p></div>
      <span class="badge ${readiness.overall >= 70 ? 'success' : 'primary'}">Readiness ${readiness.overall}%</span>
    </div>
    <div class="grid grid-4">
      <div class="card stat-card">
        <p class="stat-label">Practice</p>
        <p class="stat-value">${Math.round(practiceStats.accuracy * 100)}%</p>
        <p class="stat-note">${practiceStats.correct}/${practiceStats.total} câu đúng</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Error log</p>
        <p class="stat-value">${errorStats.unresolved}</p>
        <p class="stat-note">${errorStats.resolved}/${errorStats.total} đã xử lý</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Formula sheet</p>
        <p class="stat-value">${formulaStats.rated}/${formulaStats.total}</p>
        <p class="stat-note">công thức đã tự đánh giá</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Bài Phase 1A</p>
        <p class="stat-value">${phase1Lessons.filter(({ lesson }) => getProgress(lesson.id).completed).length}/${phase1Lessons.length}</p>
        <p class="stat-note">${phase1Modules.length} module Foundations</p>
      </div>
    </div>

    <div class="grid grid-2 mt-16">
      <div class="card card-pad cfa-readiness-card">
        <div class="card-header">
          <div><h3>Readiness v1</h3><p>Chỉ số nội bộ, không phải điểm pass CFA hay dự báo kết quả thi.</p></div>
          <span class="badge ${readiness.overall >= 70 ? 'success' : readiness.overall >= 40 ? 'warning' : ''}">${readiness.overall}%</span>
        </div>
        <div class="cfa-readiness-list">${readinessRows}</div>
        <p class="faint small mt-12">Điểm cao hơn khi practice chính xác, lỗi được xử lý và bạn tự tin với công thức. Không có phần thưởng cho việc đoán.</p>
      </div>
      <div class="card card-pad">
        <div class="card-header"><div><h3>Bắt đầu học Phase 1A</h3><p>Thứ tự gợi ý: đọc bài, làm quiz, practice, xử lý lỗi.</p></div></div>
        <div class="split-list">
          <div class="split-row"><div class="split-row-copy"><strong>Practice theo topic</strong><span>10 câu mỗi session, feedback ngay sau mỗi câu.</span></div><a class="button small primary" href="#/cfa/practice">Mở</a></div>
          <div class="split-row"><div class="split-row-copy"><strong>Formula sheet</strong><span>Tìm công thức, xem biến và bẫy thường gặp.</span></div><a class="button small" href="#/cfa/formulas">Mở</a></div>
          <div class="split-row"><div class="split-row-copy"><strong>Error log</strong><span>Reattempt các câu sai và đánh dấu đã hiểu.</span></div><a class="button small" href="#/cfa/errors">Mở</a></div>
        </div>
        ${phase1Lessons.length ? `<a class="button primary small mt-16" href="#/lesson/${phase1Lessons[0].lesson.id}">Mở bài đầu tiên</a>` : ''}
      </div>
    </div>

    <div class="grid grid-2 mt-16">${phase1Cards || '<div class="card card-pad"><p class="muted small">Chưa tải được module Phase 1A.</p></div>'}</div>

    <div class="section-head"><div><h3>10 topic CFA Level I</h3><p>Trọng số tham khảo 2027; diagnostic chỉ là tín hiệu định hướng.</p></div></div>
    <div class="card card-pad"><div class="cfa-topic-list">${topicRows}</div></div>

    <div class="section-head"><div><h3>Phase 0 + 1A đã có gì</h3><p>Các module CFA cũ vẫn được giữ nguyên.</p></div></div>
    <div class="grid grid-3">
      <div class="card card-pad"><h3>Phase 0</h3><p class="muted small">Diagnostic 40 câu, route Foundations/Fast-track/Core, planner 300 giờ, disclaimer và lối vào từ CFA track.</p></div>
      <div class="card card-pad"><h3>Phase 1A</h3><p class="muted small">12 bài Finance math + Quant TVM, 100 câu curated, practice feedback ngay, error log, formula sheet và readiness v1.</p></div>
      <div class="card card-pad"><h3>Chưa làm</h3><p class="muted small">Chưa mở Phase 1B hoặc core chuyên sâu. Không thay thế CFAI curriculum; không đảm bảo pass.</p></div>
    </div>`;
  }

  function renderCfaDiagnosticResult() {
    const diagnostic = state.cfa.diagnostic;
    const route = CFA_ROUTES[diagnostic.route] || CFA_ROUTES.foundations;
    const rows = CFA_DIAGNOSTIC.sections.map((section) => {
      const result = diagnostic.byTopic[section.id] || { correct: 0, total: section.questions.length };
      const percent = result.total ? Math.round((result.correct / result.total) * 100) : 0;
      return `<div class="cfa-result-row">
        <div class="cfa-topic-copy">
          <strong>${escapeHtml(section.title)}</strong>
          <span>${result.correct}/${result.total} câu đúng</span>
        </div>
        <div class="cfa-result-meter">${progressBar(percent, percent >= 70 ? 'success' : percent >= 50 ? 'warning' : '')}<span>${percent}%</span></div>
      </div>`;
    }).join('');

    const weak = CFA_DIAGNOSTIC.sections
      .map((section) => {
        const result = diagnostic.byTopic[section.id] || { correct: 0, total: section.questions.length };
        const percent = result.total ? Math.round((result.correct / result.total) * 100) : 0;
        return { title: section.title, percent };
      })
      .filter((item) => item.percent < 60)
      .slice(0, 3);

    return `<div class="page-head">
      <div>
        <a class="small" href="#/cfa">← CFA Readiness</a>
        <h2>Kết quả diagnostic</h2>
        <p>${escapeHtml(formatDate(diagnostic.completedAt || Date.now()))} · ${CFA_DIAGNOSTIC.totalQuestions} câu</p>
      </div>
      <span class="badge primary">${escapeHtml(route.label)}</span>
    </div>

    <div class="grid grid-2">
      <div class="card card-pad cfa-score-card">
        <p class="stat-label">Điểm diagnostic</p>
        <p class="stat-value">${diagnostic.score}%</p>
        <p class="muted small">${escapeHtml(route.summary)}</p>
        <div class="button-row mt-16">
          <a class="button primary small" href="#/cfa">Mở kế hoạch</a>
          <button class="button small" type="button" data-action="cfa-diagnostic-retake">Làm lại</button>
        </div>
      </div>
      <div class="card card-pad">
        <div class="card-header"><div><h3>Topic cần ưu tiên</h3><p>Các topic dưới 60% trong diagnostic.</p></div></div>
        <div class="split-list">
          ${weak.length
            ? weak.map((item) => `<div class="split-row"><div class="split-row-copy"><strong>${escapeHtml(item.title)}</strong><span>Diagnostic ${item.percent}%</span></div><span class="badge warning">Cần ôn</span></div>`).join('')
            : '<p class="muted small">Không có topic nào dưới 60%. Vẫn nên kiểm tra lại Foundations trước khi vào core.</p>'}
        </div>
      </div>
    </div>

    <div class="section-head"><div><h3>Breakdown theo phần</h3><p>Foundations và 10 topic CFA.</p></div></div>
    <div class="card card-pad"><div class="cfa-result-list">${rows}</div></div>

    <div class="cfa-disclaimer mt-16">${escapeHtml(CFA_DISCLAIMER)}</div>`;
  }

  function renderCfaDiagnostic() {
    if (!CFA_PHASE0) {
      return emptyState('CFA Phase 0 chưa tải', 'Không tìm thấy cfa-blueprint.js.', '<a class="button primary" href="#/track/cfa">Về CFA track</a>');
    }
    if (state.cfa.diagnostic.status === 'done') {
      return renderCfaDiagnosticResult();
    }

    const sections = CFA_DIAGNOSTIC.sections.map((section, sectionIndex) => {
      const questions = section.questions.map((question, questionIndex) => {
        const options = question.options.map((option, optionIndex) => {
          return `<label class="quiz-option">
            <input type="radio" name="${escapeHtml(question.id)}" value="${optionIndex}" required>
            <span>${escapeHtml(option)}</span>
          </label>`;
        }).join('');
        return `<div class="cfa-diag-question">
          <div class="cfa-diag-meta"><span class="badge">${escapeHtml(section.title)}</span><span class="faint small">Câu ${questionIndex + 1}/${section.questions.length}</span></div>
          <h4>${questionIndex + 1}. ${escapeHtml(question.question)}</h4>
          <div class="quiz-options">${options}</div>
        </div>`;
      }).join('');
      return `<div class="cfa-diag-section">
        <div class="card-header">
          <div><h3>${sectionIndex + 1}. ${escapeHtml(section.title)}</h3><p>${escapeHtml(section.description)}</p></div>
          <span class="badge">${section.questions.length} câu</span>
        </div>
        <div class="cfa-diag-list">${questions}</div>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/cfa">← CFA Readiness</a>
        <h2>Diagnostic đầu vào</h2>
        <p>${CFA_DIAGNOSTIC.totalQuestions} câu · khoảng ${CFA_DIAGNOSTIC.estimatedMinutes} phút · không tính giờ.</p>
        <span class="badge warning">Chưa chấm điểm</span>
      </div>
      <a class="button small" href="#/track/cfa">CFA track</a>
    </div>

    <div class="cfa-disclaimer">Kết quả chỉ để chọn hướng Foundations, Fast-track hoặc Core-ready. Không phải điểm pass và không phải đề thi chính thức.</div>

    <form class="cfa-diagnostic-form mt-16" data-form="cfa-diagnostic">
      ${sections}
      <div class="card card-pad cfa-submit-card">
        <div>
          <strong>Sẵn sàng chấm điểm?</strong>
          <p class="muted small">Cần trả lời đủ ${CFA_DIAGNOSTIC.totalQuestions} câu. Có thể làm lại bất cứ lúc nào.</p>
        </div>
        <button class="button primary" type="submit">Chấm điểm diagnostic</button>
      </div>
    </form>`;
  }

  function submitCfaDiagnostic(form) {
    const questions = cfaDiagnosticQuestions();
    const formData = new FormData(form);
    const answers = {};
    const unanswered = [];

    questions.forEach((question) => {
      const raw = formData.get(question.id);
      if (raw == null || raw === '') {
        unanswered.push(question.id);
        return;
      }
      const value = Number(raw);
      if (Number.isInteger(value) && value >= 0 && value < question.options.length) {
        answers[question.id] = value;
      } else {
        unanswered.push(question.id);
      }
    });

    if (unanswered.length) {
      showToast(`Còn ${unanswered.length} câu chưa trả lời.`, 'error');
      return;
    }

    const byTopic = {};
    let totalCorrect = 0;
    let totalQuestions = 0;
    CFA_DIAGNOSTIC.sections.forEach((section) => {
      let correct = 0;
      section.questions.forEach((question) => {
        if (answers[question.id] === question.answer) correct += 1;
      });
      byTopic[section.id] = { correct, total: section.questions.length };
      totalCorrect += correct;
      totalQuestions += section.questions.length;
    });

    const score = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const route = score < 50 ? 'foundations' : score <= 70 ? 'fast-track' : 'core';
    state.cfa.diagnostic = {
      status: 'done',
      score,
      route,
      completedAt: Date.now(),
      answers,
      byTopic
    };
    state.cfa.startedAt = state.cfa.startedAt || Date.now();
    saveState();
    render();
    showToast(`Diagnostic: ${score}% · ${CFA_ROUTES[route].label}.`, 'success');
  }

  function resetCfaDiagnostic() {
    state.cfa.diagnostic = defaultCfaState().diagnostic;
    saveState();
    render();
    showToast('Đã xoá kết quả diagnostic. Có thể làm lại.');
  }

  function cfaPracticeHash(topicId) {
    return topicId === 'mixed' ? '#/cfa/practice' : `#/cfa/practice/${topicId}`;
  }

  function startCfaPractice(topicId, questionIds, mode) {
    if (!CFA_PRACTICE) {
      showToast('Chưa tải được practice bank.', 'error');
      return;
    }

    const validTopic = topicId === 'mixed' || CFA_PRACTICE_TOPICS.some((topic) => topic.id === topicId);
    if (!validTopic) {
      showToast('Topic practice không hợp lệ.', 'error');
      return;
    }

    let pool;
    if (Array.isArray(questionIds) && questionIds.length) {
      pool = questionIds.map((questionId) => getCfaPracticeQuestion(questionId)).filter(Boolean);
    } else {
      const source = topicId === 'mixed'
        ? CFA_PRACTICE_QUESTIONS
        : (CFA_PRACTICE_BY_TOPIC[topicId] || []);
      const size = Math.min(Number(CFA_PRACTICE.sessionSize) || 10, source.length);
      pool = shuffleArray(source).slice(0, size);
    }

    if (!pool.length) {
      showToast('Chưa có câu hỏi cho topic này.', 'error');
      return;
    }

    state.cfa.practice.active = {
      id: `cfa-practice-${Date.now()}`,
      topicId,
      questionIds: pool.map((question) => question.id),
      index: 0,
      answers: {},
      result: null,
      startedAt: Date.now(),
      mode: mode === 'retry' ? 'retry' : 'topic',
      finished: false
    };
    state.cfa.startedAt = state.cfa.startedAt || Date.now();
    saveState();

    const hash = cfaPracticeHash(topicId);
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  function submitCfaPractice(form) {
    const active = state.cfa.practice.active;
    if (!active || active.finished) return;

    const questionId = active.questionIds[active.index];
    const question = getCfaPracticeQuestion(questionId);
    if (!question) {
      showToast('Không tìm thấy câu hỏi.', 'error');
      return;
    }

    const raw = new FormData(form).get('cfa-practice-answer');
    if (raw == null || raw === '') {
      showToast('Chọn một đáp án trước khi kiểm tra.', 'error');
      return;
    }

    const selected = Number(raw);
    if (!Number.isInteger(selected) || selected < 0 || selected >= question.options.length) {
      showToast('Đáp án không hợp lệ.', 'error');
      return;
    }

    const correct = selected === question.answer;
    active.answers[questionId] = selected;
    active.result = {
      questionId,
      selected,
      correct,
      answeredAt: Date.now()
    };

    state.cfa.practice.attempts.push({
      id: `cfa-attempt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sessionId: active.id,
      questionId,
      topicId: question.topicId,
      selected,
      correct,
      at: Date.now(),
      mode: active.mode
    });
    if (state.cfa.practice.attempts.length > CFA_PRACTICE_ATTEMPT_LIMIT) {
      state.cfa.practice.attempts = state.cfa.practice.attempts.slice(-CFA_PRACTICE_ATTEMPT_LIMIT);
    }

    const existingError = state.cfa.errorLog.find((entry) => entry.questionId === questionId);
    if (correct) {
      if (existingError && !existingError.resolved) {
        existingError.resolved = true;
        existingError.resolvedAt = Date.now();
      }
    } else if (existingError) {
      existingError.selected = selected;
      existingError.attempts = Math.max(1, Number(existingError.attempts) || 1) + 1;
      existingError.lastAt = Date.now();
      existingError.resolved = false;
      existingError.resolvedAt = null;
    } else {
      state.cfa.errorLog.push({
        id: `cfa-error-${questionId}`,
        questionId,
        topicId: question.topicId,
        selected,
        attempts: 1,
        firstAt: Date.now(),
        lastAt: Date.now(),
        resolved: false,
        resolvedAt: null
      });
      if (state.cfa.errorLog.length > CFA_ERROR_LIMIT) {
        state.cfa.errorLog = state.cfa.errorLog.slice(-CFA_ERROR_LIMIT);
      }
    }

    saveState();
    render();
  }

  function nextCfaPractice() {
    const active = state.cfa.practice.active;
    if (!active || !active.result) return;

    if (active.index < active.questionIds.length - 1) {
      active.index += 1;
      active.result = null;
      saveState();
      render();
      return;
    }

    active.finished = true;
    saveState();
    render();
  }

  function endCfaPractice() {
    if (!state.cfa.practice.active) return;
    state.cfa.practice.active = null;
    saveState();
    render();
    showToast('Đã kết thúc session practice.');
  }

  function retryCfaError(questionId) {
    const question = getCfaPracticeQuestion(questionId);
    if (!question) {
      showToast('Không tìm thấy câu hỏi.', 'error');
      return;
    }
    startCfaPractice(question.topicId, [question.id], 'retry');
  }

  function resolveCfaError(questionId) {
    const entry = state.cfa.errorLog.find((item) => item.questionId === questionId);
    if (!entry) return;
    entry.resolved = true;
    entry.resolvedAt = Date.now();
    saveState();
    render();
    showToast('Đã đánh dấu lỗi này là đã hiểu.');
  }

  function setCfaFormulaConfidence(formulaId, value) {
    if (!CFA_FORMULA_BY_ID.has(formulaId)) return;
    const confidence = clampNumber(value, 1, 3, 0);
    if (!confidence) return;
    state.cfa.formulas[formulaId] = {
      confidence,
      updatedAt: Date.now()
    };
    saveState();
    const scrollY = window.scrollY;
    render();
    window.scrollTo(0, scrollY);
    showToast('Đã lưu mức tự tin cho công thức.');
  }

  function applyCfaFormulaFilter() {
    const cards = document.querySelectorAll('[data-formula-card]');
    if (!cards.length) return;

    const query = String(cfaFormulaView.query || '').trim().toLowerCase();
    const category = cfaFormulaView.category || 'all';
    let visible = 0;

    cards.forEach((card) => {
      const matchesQuery = !query || String(card.dataset.search || '').includes(query);
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const show = matchesQuery && matchesCategory;
      card.classList.toggle('hidden', !show);
      if (show) visible += 1;
    });

    const count = document.querySelector('[data-formula-count]');
    if (count) count.textContent = `${visible} công thức`;
    const empty = document.querySelector('[data-formula-empty]');
    if (empty) empty.classList.toggle('hidden', visible > 0);
  }

  function renderCfaPracticeHub() {
    if (!CFA_PRACTICE) {
      return emptyState('CFA Practice chưa tải', 'Không tìm thấy cfa-practice.js.', '<a class="button primary" href="#/cfa">Về CFA Readiness</a>');
    }

    const stats = getCfaPracticeStats();
    const errors = getCfaErrorStats();
    const counts = CFA_PRACTICE.counts || {};
    const topicCards = CFA_PRACTICE_TOPICS.map((topic) => {
      const topicStats = stats.byTopic[topic.id] || { total: 0, correct: 0, accuracy: 0 };
      const questionCount = (CFA_PRACTICE_BY_TOPIC[topic.id] || []).length;
      return `<div class="card card-pad cfa-practice-topic-card">
        <div class="card-header">
          <div><h3>${escapeHtml(topic.title)}</h3><p>${escapeHtml(topic.description)}</p></div>
          <span class="badge">${questionCount} câu</span>
        </div>
        <div class="cfa-practice-topic-stats">
          <span>${topicStats.total} lượt làm</span>
          <span>${Math.round(topicStats.accuracy * 100)}% đúng</span>
        </div>
        <div class="button-row mt-16">
          <button class="button primary small" type="button" data-action="cfa-practice-start" data-topic="${escapeHtml(topic.id)}">Bắt đầu 10 câu</button>
          <a class="button small ghost" href="#/lesson/${escapeHtml(topic.lessonIds[0])}">Học lý thuyết</a>
        </div>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/cfa">← CFA Readiness</a>
        <h2>CFA Practice</h2>
        <p>100 câu curated Phase 1A: ${counts.calculation || 0} calculation, ${counts.application || 0} application, ${counts.conceptual || 0} conceptual.</p>
      </div>
      <div class="button-row">
        <a class="button small" href="#/cfa/formulas">Formula sheet</a>
        <a class="button small ghost" href="#/cfa/errors">Error log</a>
      </div>
    </div>

    <div class="cfa-disclaimer">Practice có feedback ngay và ghi lỗi sai vào error log. Đây là học liệu gốc của NeZha, không phải đề thi CFA chính thức.</div>

    <div class="grid grid-4 mt-16">
      <div class="card stat-card"><p class="stat-label">Đã làm</p><p class="stat-value">${stats.total}</p><p class="stat-note">${stats.correct} câu đúng</p></div>
      <div class="card stat-card"><p class="stat-label">Accuracy</p><p class="stat-value">${Math.round(stats.accuracy * 100)}%</p><p class="stat-note">trên toàn bộ attempts</p></div>
      <div class="card stat-card"><p class="stat-label">Lỗi chưa xử lý</p><p class="stat-value">${errors.unresolved}</p><p class="stat-note">${errors.resolved}/${errors.total} đã xử lý</p></div>
      <div class="card stat-card"><p class="stat-label">Session</p><p class="stat-value">${Number(CFA_PRACTICE.sessionSize) || 10}</p><p class="stat-note">câu mỗi lượt practice</p></div>
    </div>

    <div class="section-head"><div><h3>Practice theo topic</h3><p>Chọn một topic hoặc làm mixed drill từ toàn bộ bank.</p></div></div>
    <div class="grid grid-2">${topicCards}</div>

    <div class="card card-pad mt-16 cfa-practice-mixed">
      <div class="card-header">
        <div><h3>Mixed drill</h3><p>Trộn câu từ Finance Math và Quant TVM để kiểm tra khả năng nhận diện dạng bài.</p></div>
        <span class="badge primary">${CFA_PRACTICE_QUESTIONS.length} câu</span>
      </div>
      <button class="button primary mt-16" type="button" data-action="cfa-practice-start" data-topic="mixed">Bắt đầu mixed drill</button>
    </div>`;
  }

  function renderCfaPracticeSession() {
    const active = state.cfa.practice.active;
    if (!active) return renderCfaPracticeHub();

    const question = getCfaPracticeQuestion(active.questionIds[active.index]);
    if (!question) {
      return emptyState('Không tìm thấy câu hỏi', 'Session practice đang trỏ tới câu hỏi không tồn tại.', '<button class="button primary" type="button" data-action="cfa-practice-end">Kết thúc session</button>');
    }

    const topic = CFA_PRACTICE_TOPICS.find((item) => item.id === active.topicId);
    const topicTitle = topic ? topic.title : 'Mixed drill';
    const result = active.result && active.result.questionId === question.id ? active.result : null;
    const number = active.index + 1;
    const total = active.questionIds.length;
    const typeLabels = { calculation: 'Calculation', application: 'Application', conceptual: 'Conceptual' };
    const difficultyLabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
    const options = question.options.map((option, optionIndex) => {
      let className = 'quiz-option';
      if (result) {
        if (optionIndex === question.answer) className += ' correct';
        else if (optionIndex === result.selected) className += ' wrong';
      }
      return `<label class="${className}">
        <input type="radio" name="cfa-practice-answer" value="${optionIndex}" ${result && result.selected === optionIndex ? 'checked' : ''} ${result ? 'disabled' : ''}>
        <span>${escapeHtml(option)}</span>
      </label>`;
    }).join('');

    const steps = result && Array.isArray(question.steps) && question.steps.length
      ? `<div class="cfa-steps"><strong>Các bước</strong><ol>${question.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol></div>`
      : '';

    const feedback = result
      ? `<div class="cfa-practice-feedback ${result.correct ? 'success' : 'danger'}">
          <strong>${result.correct ? 'Chính xác' : 'Chưa đúng'}</strong>
          <p>Đáp án đúng: <strong>${escapeHtml(question.options[question.answer])}</strong></p>
          <p>${escapeHtml(question.explanation)}</p>
          ${steps}
        </div>
        <div class="button-row mt-16">
          <button class="button primary" type="button" data-action="cfa-practice-next">${active.index < total - 1 ? 'Câu tiếp theo' : 'Xem kết quả session'}</button>
          <button class="button small ghost" type="button" data-action="cfa-practice-end">Thoát session</button>
        </div>`
      : `<form data-form="cfa-practice">
          <div class="quiz-options mt-16">${options}</div>
          <div class="button-row mt-16">
            <button class="button primary" type="submit">Kiểm tra đáp án</button>
            <button class="button small ghost" type="button" data-action="cfa-practice-end">Thoát session</button>
          </div>
        </form>`;

    return `<div class="page-head">
      <div>
        <a class="small" href="#/cfa/practice">← CFA Practice</a>
        <h2>${escapeHtml(topicTitle)}</h2>
        <p>Câu ${number}/${total} · ${active.mode === 'retry' ? 'Reattempt từ error log' : 'Practice session'} · feedback ngay sau khi trả lời.</p>
      </div>
      <span class="badge primary">${number}/${total}</span>
    </div>

    <div class="card card-pad cfa-practice-card">
      <div class="card-header">
        <div>
          <div class="cfa-practice-tags">
            <span class="badge">${escapeHtml(typeLabels[question.type] || question.type)}</span>
            <span class="badge">${escapeHtml(difficultyLabels[question.difficulty] || question.difficulty)}</span>
            <span class="badge">${escapeHtml(question.los)}</span>
          </div>
          <h3 class="mt-12">Câu ${number}</h3>
        </div>
        <span class="badge ${active.mode === 'retry' ? 'warning' : 'primary'}">${active.mode === 'retry' ? 'Reattempt' : 'Practice'}</span>
      </div>
      ${progressBar(Math.round((number / total) * 100), 'primary')}
      <p class="cfa-practice-question">${escapeHtml(question.question)}</p>
      ${feedback}
    </div>`;
  }

  function renderCfaPracticeSummary() {
    const active = state.cfa.practice.active;
    if (!active) return renderCfaPracticeHub();
    const summary = getCfaPracticeSessionSummary(active);
    const topic = CFA_PRACTICE_TOPICS.find((item) => item.id === active.topicId);
    const topicTitle = topic ? topic.title : 'Mixed drill';
    const wrong = summary.total - summary.correct;
    const tone = summary.percent >= 70 ? 'success' : summary.percent >= 50 ? 'warning' : 'danger';

    return `<div class="page-head">
      <div>
        <a class="small" href="#/cfa/practice">← CFA Practice</a>
        <h2>Kết quả session</h2>
        <p>${escapeHtml(topicTitle)} · ${active.mode === 'retry' ? 'Reattempt' : 'Practice'} · ${summary.answered}/${summary.total} câu đã trả lời.</p>
      </div>
      <span class="badge ${tone}">${summary.percent}%</span>
    </div>

    <div class="grid grid-2">
      <div class="card card-pad cfa-score-card">
        <p class="stat-label">Điểm session</p>
        <p class="stat-value">${summary.percent}%</p>
        <p class="muted small">${summary.correct}/${summary.total} câu đúng · ${wrong} câu sai.</p>
        ${progressBar(summary.percent, tone)}
        <div class="button-row mt-16">
          <button class="button primary small" type="button" data-action="cfa-practice-restart" data-topic="${escapeHtml(active.topicId)}">Làm session mới</button>
          <button class="button small" type="button" data-action="cfa-practice-end">Về practice hub</button>
        </div>
      </div>
      <div class="card card-pad">
        <div class="card-header"><div><h3>Bước tiếp theo</h3><p>Sai là dữ liệu, không phải bản án.</p></div></div>
        <div class="split-list">
          <div class="split-row"><div class="split-row-copy"><strong>Error log</strong><span>${wrong ? `${wrong} câu sai trong session này có thể đã được ghi lại.` : 'Không có câu sai trong session này.'}</span></div><a class="button small" href="#/cfa/errors">Mở</a></div>
          <div class="split-row"><div class="split-row-copy"><strong>Formula sheet</strong><span>Xem lại công thức trước khi làm session tiếp theo.</span></div><a class="button small" href="#/cfa/formulas">Mở</a></div>
          <div class="split-row"><div class="split-row-copy"><strong>Readiness</strong><span>Xem tác động của session lên readiness v1.</span></div><a class="button small" href="#/cfa">Mở</a></div>
        </div>
      </div>
    </div>`;
  }

  function renderCfaPractice() {
    if (!CFA_PRACTICE) {
      return emptyState('CFA Practice chưa tải', 'Không tìm thấy cfa-practice.js.', '<a class="button primary" href="#/cfa">Về CFA Readiness</a>');
    }
    const active = state.cfa.practice.active;
    if (!active) return renderCfaPracticeHub();
    if (active.finished) return renderCfaPracticeSummary();
    return renderCfaPracticeSession();
  }

  function renderCfaFormulas() {
    if (!CFA_FORMULAS) {
      return emptyState('Formula sheet chưa tải', 'Không tìm thấy cfa-formulas.js.', '<a class="button primary" href="#/cfa">Về CFA Readiness</a>');
    }

    const stats = getCfaFormulaStats();
    const categoryOptions = ['all'].concat(CFA_FORMULA_CATEGORIES).map((category) => {
      const label = category === 'all' ? 'Tất cả nhóm' : category;
      return `<option value="${escapeHtml(category)}" ${cfaFormulaView.category === category ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');

    const cards = CFA_FORMULA_LIST.map((formula) => {
      const saved = state.cfa.formulas[formula.id];
      const confidence = saved ? Number(saved.confidence) || 0 : 0;
      const searchText = [
        formula.name,
        formula.formula,
        formula.variables,
        formula.when,
        formula.trap,
        formula.category
      ].join(' ').toLowerCase();
      const confidenceButtons = [
        [1, 'Mới'],
        [2, 'Hiểu'],
        [3, 'Vững']
      ].map(([value, label]) => {
        return `<button class="confidence-btn ${confidence === value ? 'active' : ''}" type="button" data-action="cfa-formula-confidence" data-formula="${escapeHtml(formula.id)}" data-value="${value}">${label}</button>`;
      }).join('');

      return `<div class="card card-pad cfa-formula-card" data-formula-card data-category="${escapeHtml(formula.category)}" data-search="${escapeHtml(searchText)}">
        <div class="card-header">
          <div><span class="badge">${escapeHtml(formula.category)}</span><h3 class="mt-8">${escapeHtml(formula.name)}</h3></div>
          <span class="badge ${confidence === 3 ? 'success' : confidence === 2 ? 'primary' : confidence === 1 ? 'warning' : ''}">${confidence ? ['', 'Mới', 'Hiểu', 'Vững'][confidence] : 'Chưa đánh giá'}</span>
        </div>
        <p class="cfa-formula">${escapeHtml(formula.formula)}</p>
        <p class="muted small"><strong>Biến:</strong> ${escapeHtml(formula.variables)}</p>
        <p class="muted small"><strong>Khi dùng:</strong> ${escapeHtml(formula.when)}</p>
        <p class="muted small"><strong>Bẫy:</strong> ${escapeHtml(formula.trap)}</p>
        <div class="confidence-row mt-12">${confidenceButtons}</div>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/cfa">← CFA Readiness</a>
        <h2>Formula sheet</h2>
        <p>${CFA_FORMULA_LIST.length} công thức TVM, annuity, NPV/IRR, loan và BA II Plus.</p>
      </div>
      <div class="button-row">
        <a class="button small" href="#/cfa/practice">Practice</a>
        <a class="button small ghost" href="#/cfa/errors">Error log</a>
      </div>
    </div>

    <div class="grid grid-4">
      <div class="card stat-card"><p class="stat-label">Công thức</p><p class="stat-value">${stats.total}</p><p class="stat-note">${stats.rated} đã tự đánh giá</p></div>
      <div class="card stat-card"><p class="stat-label">Độ phủ</p><p class="stat-value">${Math.round(stats.coverage * 100)}%</p><p class="stat-note">tỷ lệ công thức đã chấm</p></div>
      <div class="card stat-card"><p class="stat-label">Tự tin TB</p><p class="stat-value">${stats.average ? stats.average.toFixed(1) : '—'}</p><p class="stat-note">thang 1–3</p></div>
      <div class="card stat-card"><p class="stat-label">Điểm formula</p><p class="stat-value">${Math.round(stats.score * 100)}%</p><p class="stat-note">dùng trong readiness</p></div>
    </div>

    <div class="card card-pad mt-16 cfa-formula-toolbar">
      <div class="cfa-plan-grid">
        <div class="field">
          <label for="cfaFormulaSearch">Tìm công thức</label>
          <input class="input" id="cfaFormulaSearch" type="search" placeholder="Ví dụ: EAR, NPV, annuity..." data-cfa-formula-search value="${escapeHtml(cfaFormulaView.query)}">
        </div>
        <div class="field">
          <label for="cfaFormulaCategory">Nhóm</label>
          <select class="select" id="cfaFormulaCategory" data-cfa-formula-category>${categoryOptions}</select>
        </div>
      </div>
      <p class="faint small mt-12" data-formula-count>${CFA_FORMULA_LIST.length} công thức</p>
    </div>

    <div class="grid grid-2 mt-16">${cards}</div>
    <div class="card card-pad mt-16 ${CFA_FORMULA_LIST.length ? 'hidden' : ''}" data-formula-empty>
      <p class="muted">Không có công thức khớp bộ lọc. Thử từ khoá khác hoặc chọn “Tất cả nhóm”.</p>
    </div>`;
  }

  function renderCfaErrors() {
    if (!CFA_PRACTICE) {
      return emptyState('Error log chưa tải', 'Không tìm thấy cfa-practice.js.', '<a class="button primary" href="#/cfa">Về CFA Readiness</a>');
    }

    const stats = getCfaErrorStats();
    const status = cfaErrorView.status;
    const entries = state.cfa.errorLog
      .filter((entry) => {
        if (status === 'open') return !entry.resolved;
        if (status === 'resolved') return entry.resolved;
        return true;
      })
      .slice()
      .sort((a, b) => {
        if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
        return b.lastAt - a.lastAt;
      });

    const rows = entries.map((entry) => {
      const question = getCfaPracticeQuestion(entry.questionId);
      if (!question) return '';
      const topic = CFA_PRACTICE_TOPICS.find((item) => item.id === entry.topicId);
      const steps = Array.isArray(question.steps) && question.steps.length
        ? `<details class="cfa-error-details"><summary>Các bước giải</summary><ol>${question.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol></details>`
        : '';
      return `<div class="card card-pad cfa-error-card">
        <div class="card-header">
          <div>
            <div class="cfa-practice-tags">
              <span class="badge">${escapeHtml(topic ? topic.title : entry.topicId)}</span>
              <span class="badge">${escapeHtml(question.type)}</span>
              <span class="badge">${escapeHtml(question.los)}</span>
            </div>
            <h3 class="mt-12">${escapeHtml(question.question)}</h3>
          </div>
          <span class="badge ${entry.resolved ? 'success' : 'danger'}">${entry.resolved ? 'Đã hiểu' : 'Chưa xử lý'}</span>
        </div>
        <p class="muted small">Bạn chọn: <strong>${escapeHtml(question.options[entry.selected])}</strong> · Đáp án đúng: <strong>${escapeHtml(question.options[question.answer])}</strong> · ${entry.attempts} lần sai</p>
        <p class="muted small">${escapeHtml(question.explanation)}</p>
        ${steps}
        <div class="button-row mt-16">
          <button class="button small primary" type="button" data-action="cfa-error-retry" data-question="${escapeHtml(entry.questionId)}">Làm lại câu này</button>
          ${entry.resolved
            ? '<span class="badge success">Đã xử lý</span>'
            : `<button class="button small" type="button" data-action="cfa-error-resolve" data-question="${escapeHtml(entry.questionId)}">Đã hiểu</button>`}
        </div>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/cfa">← CFA Readiness</a>
        <h2>Error log</h2>
        <p>Ôn lại câu sai, làm lại và đánh dấu đã hiểu.</p>
      </div>
      <div class="button-row">
        <a class="button small" href="#/cfa/practice">Practice</a>
        <a class="button small ghost" href="#/cfa/formulas">Formula sheet</a>
      </div>
    </div>

    <div class="grid grid-3">
      <div class="card stat-card"><p class="stat-label">Tổng lỗi</p><p class="stat-value">${stats.total}</p><p class="stat-note">từ các câu practice sai</p></div>
      <div class="card stat-card"><p class="stat-label">Chưa xử lý</p><p class="stat-value">${stats.unresolved}</p><p class="stat-note">ưu tiên làm lại</p></div>
      <div class="card stat-card"><p class="stat-label">Đã xử lý</p><p class="stat-value">${stats.resolved}</p><p class="stat-note">${Math.round(stats.resolutionRate * 100)}% resolution</p></div>
    </div>

    <div class="card card-pad mt-16">
      <div class="cfa-plan-grid">
        <div class="field">
          <label for="cfaErrorFilter">Bộ lọc</label>
          <select class="select" id="cfaErrorFilter" data-cfa-error-filter>
            <option value="open" ${status === 'open' ? 'selected' : ''}>Chưa xử lý</option>
            <option value="resolved" ${status === 'resolved' ? 'selected' : ''}>Đã hiểu</option>
            <option value="all" ${status === 'all' ? 'selected' : ''}>Tất cả</option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-2 mt-16">
      ${rows || `<div class="card card-pad"><p class="muted">Không có lỗi nào trong bộ lọc này.</p><a class="button primary small mt-16" href="#/cfa/practice">Làm practice</a></div>`}
    </div>`;
  }

  function renderTrack(trackId) {
    const track = TRACK_BY_ID[trackId];
    if (!track) {
      return emptyState('Không tìm thấy lộ trình', 'Lộ trình này không tồn tại hoặc đã bị xoá.', '<a class="button primary" href="#/tracks">Về danh sách lộ trình</a>');
    }

    const stats = getTrackStats(track);
    const unlocked = isTrackUnlocked(track.id);
    const active = state.settings.activeTrackId === track.id;

    const modules = track.modules.map((module, moduleIndex) => {
      const rows = module.lessons.map((lesson, lessonIndex) => {
        const progress = getProgress(lesson.id);
        const mastery = lessonMastery(lesson.id);
        const isExam = Boolean(lesson.examId);
        const meta = isExam
          ? `${lesson.examQuestionCount} câu · ${lesson.estimatedMinutes} phút`
          : `${lesson.estimatedMinutes} phút · ${mastery}% mastery`;
        const badge = isExam
          ? (progress.completed ? 'Đã thi' : 'Full mock')
          : (progress.completed ? 'Xong' : mastery ? `${mastery}%` : 'Mới');
        const copy = `<span class="lesson-num">${String(lessonIndex + 1).padStart(2, '0')}</span>
          <span class="lesson-row-copy">
            <strong>${escapeHtml(lesson.title)}</strong>
            <span>${meta}</span>
          </span>
          <span class="badge ${progress.completed ? 'success' : ''}">${badge}</span>`;

        if (!unlocked && !progress.completed) {
          return `<div class="lesson-row" aria-disabled="true">${copy}</div>`;
        }
        return `<a class="lesson-row ${progress.completed ? 'done' : ''}" href="#/lesson/${lesson.id}">${copy}</a>`;
      }).join('');

      const done = module.lessons.filter((lesson) => getProgress(lesson.id).completed).length;
      const moduleComplete = module.lessons.length > 0 && done === module.lessons.length;

      return `<div class="card module-card">
        <div class="module-head">
          <div><h4>Module ${moduleIndex + 1}: ${escapeHtml(module.title)}</h4><p>${escapeHtml(module.description)}</p></div>
          <div class="button-row">
            <span class="badge ${moduleComplete ? 'success' : ''}">${done}/${module.lessons.length}</span>
            ${module.optional ? '<span class="badge">Bổ trợ</span>' : ''}
          </div>
        </div>
        <div class="lesson-list">${rows}</div>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/tracks">← Tất cả lộ trình</a>
        <h2>${escapeHtml(track.title)}</h2>
        <p>${escapeHtml(track.description)}</p>
        <span class="badge ${track.optional ? '' : 'primary'}">${track.optional ? 'Bổ trợ' : 'Chính'}</span>
      </div>
      <div class="button-row">
        ${active
          ? '<span class="badge primary">Đang học</span>'
          : `<button class="button small" type="button" data-action="set-active" data-track="${track.id}">Đặt làm lộ trình hiện tại</button>`}
        <a class="button small" href="#/stats">Thống kê</a>
      </div>
    </div>

    ${track.id === 'cfa' ? renderCfaEntryCard() : ''}

    <div class="grid grid-3">
      <div class="card stat-card">
        <p class="stat-label">${track.examPrep ? 'Hoàn thành core' : 'Hoàn thành'}</p>
        <p class="stat-value">${track.examPrep ? `${stats.coreCompleted}/${stats.coreLessons}` : `${stats.completed}/${stats.lessons}`}</p>
        <p class="stat-note">${Math.round((track.examPrep ? stats.coreCompletion : stats.completion) * 100)}% bài học</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Mastery</p>
        <p class="stat-value">${stats.mastery}%</p>
        <p class="stat-note">${track.examPrep ? 'Core only · ' : ''}40% hoàn thành · 40% quiz · 20% tự tin</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Sẵn sàng</p>
        <p class="stat-value">${stats.readiness}%</p>
        <p class="stat-note">${track.examPrep ? `${stats.coreCompleted}/${stats.coreLessons} bài core · ${stats.coreReviewed}/${stats.coreCards} thẻ` : `${stats.reviewed}/${stats.cards} thẻ đã ôn`}</p>
      </div>
    </div>

    ${track.examPrep ? renderExamPrepCard(track) : ''}

    ${!unlocked ? '<p class="badge warning mt-16">Lộ trình đang khoá. Mở thủ công nếu bạn muốn học trước.</p>' : ''}
    <div class="module-list mt-16">${modules}</div>`;
  }

  function renderQuiz(lesson) {
    const submittedState = quizState[lesson.id];
    const submitted = Boolean(submittedState && submittedState.submitted);
    const progress = getProgress(lesson.id);
    const doneCount = submitted ? submittedState.correct : Number(progress.quizTotal) || 0;

    const questions = lesson.quiz.map((question, questionIndex) => {
      const selected = submitted ? submittedState.answers[question.id] : null;
      const options = question.options.map((option, optionIndex) => {
        let className = 'quiz-option';
        if (submitted) {
          if (optionIndex === question.answer) className += ' correct';
          else if (selected === optionIndex) className += ' wrong';
        }
        return `<label class="${className}">
          <input type="radio" name="q-${escapeHtml(question.id)}" value="${optionIndex}" ${selected === optionIndex ? 'checked' : ''} ${submitted ? 'disabled' : ''}>
          <span>${escapeHtml(option)}</span>
        </label>`;
      }).join('');

      const explanation = submitted
        ? `<p class="quiz-explanation">${escapeHtml(question.explanation)}</p>`
        : '';

      return `<div class="quiz-question">
        <h4>${questionIndex + 1}. ${escapeHtml(question.question)}</h4>
        <div class="quiz-options">${options}</div>
        ${explanation}
      </div>`;
    }).join('');

    const result = submitted
      ? `<div class="quiz-result">
          <div>
            <strong>${submittedState.correct}/${submittedState.total} câu đúng</strong>
            <span>${submittedState.correct === submittedState.total ? 'Xuất sắc, nắm rất chắc.' : submittedState.correct >= submittedState.total * 0.7 ? 'Khá tốt, xem lại các câu sai.' : 'Nên đọc lại bài và làm lại quiz.'}</span>
          </div>
          <button class="button small" type="button" data-action="retake-quiz" data-lesson="${escapeHtml(lesson.id)}">Làm lại</button>
        </div>`
      : `<div class="quiz-result">
          <div>
            <strong>Kiểm tra nhanh</strong>
            <span>${lesson.quiz.length} câu · trả lời rồi xem giải thích.</span>
          </div>
          <button class="button primary small" type="submit">Nộp bài</button>
        </div>`;

    return `<div class="card card-pad mt-16">
      <div class="card-header">
        <div><h3>Quiz</h3><p>Kiểm tra mức hiểu, không phải học thuộc.</p></div>
        <span class="badge ${submitted ? 'success' : 'primary'}">${submitted ? `${doneCount}/${lesson.quiz.length}` : progress.quizTotal ? `${progress.quizCorrect}/${progress.quizTotal}` : 'Chưa làm'}</span>
      </div>
      <form class="quiz-wrap" data-form="quiz" data-lesson="${escapeHtml(lesson.id)}">
        ${questions}
        ${result}
      </form>
    </div>`;
  }

  function renderLessonSide(context) {
    const { track, module, lesson } = context;
    const progress = getProgress(lesson.id);
    const confidence = clamp(progress.confidence, 0, 3);
    const moduleIndex = track.modules.findIndex((item) => item.id === module.id);
    const nextModule = moduleIndex >= 0 ? track.modules[moduleIndex + 1] : null;
    const moduleComplete = module.lessons.length > 0
      && module.lessons.every((item) => getProgress(item.id).completed);
    const nextModuleButton = nextModule && nextModule.lessons.length
      ? (moduleComplete
        ? `<a class="button small primary" href="#/lesson/${nextModule.lessons[0].id}">Module tiếp theo →</a>`
        : '<button class="button small" type="button" disabled title="Hoàn thành tất cả bài trong module để mở">Module tiếp theo →</button>')
      : '';
    const confidenceButtons = [
      [1, 'Mới'],
      [2, 'Hiểu'],
      [3, 'Vững']
    ].map(([value, label]) => {
      return `<button class="confidence-btn ${confidence === value ? 'active' : ''}" type="button" data-action="confidence" data-value="${value}" data-lesson="${escapeHtml(lesson.id)}">${label}</button>`;
    }).join('');

    const keyTerms = lesson.keyTerms.map((term) => {
      return `<div class="key-term"><strong>${escapeHtml(term.term)}</strong><span>${escapeHtml(term.definition)}</span></div>`;
    }).join('');

    const flashcards = lesson.flashcards.map((card) => {
      return `<details class="key-term">
        <summary><strong>${escapeHtml(card.front)}</strong></summary>
        <span>${escapeHtml(card.back)}</span>
      </details>`;
    }).join('');

    return `<div class="card card-pad">
      <div class="card-header">
        <div><h3>Tiến độ bài học</h3><p>Lưu tự động trên máy này.</p></div>
        <span class="badge ${progress.completed ? 'success' : 'primary'}">${progress.completed ? 'Đã xong' : 'Đang học'}</span>
      </div>
      <div class="button-row lesson-progress-actions">
        <button class="button ${progress.completed ? 'success' : 'primary'}" type="button" data-action="mark-complete" data-lesson="${escapeHtml(lesson.id)}">
          ${progress.completed ? 'Bỏ đánh dấu hoàn thành' : 'Đánh dấu hoàn thành'}
        </button>
        ${nextModuleButton}
      </div>
      <div class="field mt-16">
        <span class="field-label">Mức tự tin</span>
        <div class="confidence-row">${confidenceButtons}</div>
      </div>
      <div class="field mt-16">
        <label for="notes-${escapeHtml(lesson.id)}">Ghi chú</label>
        <textarea class="textarea" id="notes-${escapeHtml(lesson.id)}" data-note="notes" data-lesson="${escapeHtml(lesson.id)}" placeholder="Ý chính, ví dụ, câu hỏi còn thắc mắc...">${escapeHtml(progress.notes || '')}</textarea>
      </div>
      <div class="field mt-12">
        <label for="feynman-${escapeHtml(lesson.id)}">Giải thích bằng lời của bạn</label>
        <textarea class="textarea" id="feynman-${escapeHtml(lesson.id)}" data-note="feynman" data-lesson="${escapeHtml(lesson.id)}" placeholder="Nếu phải dạy lại cho người khác, bạn sẽ nói gì?">${escapeHtml(progress.feynman || '')}</textarea>
      </div>
    </div>

    <div class="card card-pad">
      <div class="card-header"><div><h3>Thuật ngữ chính</h3><p>Nắm chắc trước khi làm quiz.</p></div></div>
      <div class="key-term-grid">${keyTerms}</div>
    </div>

    <div class="card card-pad">
      <div class="card-header"><div><h3>Thẻ ghi nhớ</h3><p>Bấm để xem đáp án.</p></div><span class="badge">${lesson.flashcards.length}</span></div>
      <div class="split-list">${flashcards}</div>
    </div>`;
  }

  function renderExamHistory(exam, record) {
    if (!record.attempts.length) {
      return '<p class="muted small">Chưa có lần làm bài nào. Làm full mock đầu tiên để có điểm theo topic.</p>';
    }
    const isTaskExam = exam.questions.length === 0;
    return record.attempts.map((attempt) => {
      const passed = attempt.percent >= exam.targetPercent && (!isTaskExam || attempt.selfAssessed);
      const summary = isTaskExam
        ? (attempt.selfAssessed
          ? `Tự đánh giá ${attempt.percent}% · mục tiêu luyện ${exam.targetPercent}%`
          : 'Chưa tự chấm rubric')
        : `${attempt.totalCorrect}/${attempt.totalQuestions} câu · mục tiêu luyện ${exam.targetPercent}%`;
      return `<div class="split-row">
        <div class="split-row-copy">
          <strong>${escapeHtml(formatDate(attempt.at))} · ${isTaskExam && !attempt.selfAssessed ? 'Chưa chấm' : `${attempt.percent}%`}</strong>
          <span>${escapeHtml(summary)}</span>
        </div>
        <div class="button-row">
          <span class="badge ${passed ? 'success' : 'warning'}">${isTaskExam ? (attempt.selfAssessed ? (passed ? 'Đạt mục tiêu' : 'Cần ôn') : 'Chờ tự chấm') : (passed ? 'Đạt mục tiêu' : 'Cần ôn')}</span>
          <button class="button small" type="button" data-action="exam-review" data-exam_id="${escapeHtml(exam.id)}" data-attempt_id="${escapeHtml(attempt.id)}">Xem lại</button>
        </div>
      </div>`;
    }).join('');
  }

  function renderExamIntro(exam) {
    const track = TRACK_BY_ID[exam.trackId];
    const record = getExamRecord(exam.id);
    const taskCount = exam.sections.reduce((sum, section) => {
      return sum + (Array.isArray(section.tasks) ? section.tasks.length : 0);
    }, 0);
    const isTaskExam = taskCount > 0;
    const sections = exam.sections.map((section) => {
      const questions = examSectionQuestions(exam, section.id);
      const sectionTasks = Array.isArray(section.tasks) ? section.tasks.length : 0;
      const itemLabel = sectionTasks ? `${sectionTasks} task` : `${questions.length} câu`;
      return `<div class="split-row">
        <div class="split-row-copy"><strong>${escapeHtml(section.title)}</strong><span>${itemLabel} · ${section.minutes} phút</span></div>
        <span class="badge">${section.minutes} phút</span>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/track/${exam.trackId}">← ${escapeHtml(track ? track.shortTitle : exam.trackId)} · ${escapeHtml(track && track.examModuleTitle ? track.examModuleTitle : 'Full Mock Exams')}</a>
        <h2>${escapeHtml(exam.title)}</h2>
        <p>${isTaskExam ? `${taskCount} task` : `${exam.questions.length} câu`} · ${formatExamMinutes(exam.durationMinutes)} · mục tiêu luyện ${exam.targetPercent}%</p>
      </div>
      <span class="badge primary">${exam.year || 'Full mock'}</span>
    </div>

    <div class="grid grid-4">
      <div class="card stat-card"><p class="stat-label">${isTaskExam ? 'Task' : 'Câu hỏi'}</p><p class="stat-value">${isTaskExam ? taskCount : exam.questions.length}</p><p class="stat-note">${isTaskExam ? 'Bài tự luận / nói' : 'Unique trong đề này'}</p></div>
      <div class="card stat-card"><p class="stat-label">Thời gian</p><p class="stat-value">${formatExamMinutes(exam.durationMinutes)}</p><p class="stat-note">${exam.sections.length} phần thi</p></div>
      <div class="card stat-card"><p class="stat-label">Mục tiêu luyện</p><p class="stat-value">${exam.targetPercent}%</p><p class="stat-note">Không phải điểm pass chính thức</p></div>
      <div class="card stat-card"><p class="stat-label">Đã làm</p><p class="stat-value">${record.attempts.length}</p><p class="stat-note">Số lần nộp bài</p></div>
    </div>

    <div class="grid grid-2 mt-16">
      <div class="card card-pad">
        <div class="card-header"><div><h3>Cấu trúc đề</h3><p>Đồng hồ chạy theo từng phần thi.</p></div></div>
        <div class="split-list">${sections}</div>
        <p class="faint small mt-12">${escapeHtml(exam.passNote)}</p>
        <div class="button-row mt-16">
          <button class="button primary" type="button" data-action="start-exam" data-exam_id="${escapeHtml(exam.id)}">Bắt đầu làm bài</button>
          ${record.attempts.length ? `<button class="button small" type="button" data-action="retake-exam" data-exam_id="${escapeHtml(exam.id)}">Làm đề mới</button>` : ''}
        </div>
      </div>
      <div class="card card-pad">
        <div class="card-header"><div><h3>Lịch sử làm bài</h3><p>${isTaskExam ? 'Bài đã lưu và điểm tự chấm.' : 'Điểm và breakdown theo topic.'}</p></div><span class="badge">${record.attempts.length}</span></div>
        <div class="split-list">${renderExamHistory(exam, record)}</div>
        <p class="faint small mt-12">${isTaskExam ? 'Writing/Speaking chỉ tự chấm theo rubric; không phải điểm IELTS chính thức.' : 'Câu hỏi là bản gốc bám blueprint, không phải đề thi chính thức. Dùng điểm theo topic để chọn bài ôn tiếp theo.'}</p>
      </div>
    </div>`;
  }

  function renderExamBreak(exam, active) {
    const completed = exam.sections
      .slice(0, active.currentSectionIndex + 1)
      .map((section) => {
        const result = active.sectionResults[section.id] || { correct: 0, total: 0 };
        return `<div class="split-row">
          <div class="split-row-copy"><strong>${escapeHtml(section.title)}</strong><span>Đã nộp bài</span></div>
          <span class="badge success">${result.correct}/${result.total}</span>
        </div>`;
      }).join('');
    const nextSection = exam.sections[active.currentSectionIndex + 1];
    return `<div class="page-head">
      <div>
        <a class="small" href="#/track/${exam.trackId}">← ${escapeHtml(exam.title)}</a>
        <h2>Nghỉ giữa phiên</h2>
        <p>Bạn đã hoàn thành ${exam.sections[active.currentSectionIndex].title}. Sẵn sàng cho phần tiếp theo?</p>
      </div>
      <span class="badge success">Đã nộp</span>
    </div>
    <div class="card card-pad exam-break-card">
      <div class="exam-break-mark">Break</div>
      <h3>${escapeHtml(nextSection ? nextSection.title : 'Phiên tiếp theo')}</h3>
      <p>${nextSection ? `${Array.isArray(nextSection.tasks) && nextSection.tasks.length ? `${nextSection.tasks.length} task` : `${examSectionQuestions(exam, nextSection.id).length} câu`} · ${nextSection.minutes} phút` : 'Hoàn tất bài thi.'}</p>
      <div class="split-list mt-16">${completed}</div>
      <div class="button-row mt-16">
        <button class="button primary" type="button" data-action="exam-next-section" data-exam_id="${escapeHtml(exam.id)}">Bắt đầu ${escapeHtml(nextSection ? nextSection.title : 'phần tiếp theo')}</button>
        <a class="button small" href="#/track/${exam.trackId}">Lưu & thoát</a>
      </div>
    </div>`;
  }

  function renderExamActive(exam, active) {
    if (active.awaitingBreak) return renderExamBreak(exam, active);
    const section = exam.sections[active.currentSectionIndex];
    if (section && section.type === 'writing') return renderWritingExamActive(exam, active, section);
    if (section && section.type === 'speaking') return renderSpeakingExamActive(exam, active, section);
    const questions = examSectionQuestions(exam, section.id);
    const currentIndex = Math.min(Math.max(0, Number(active.currentQuestionIndex) || 0), Math.max(0, questions.length - 1));
    const question = questions[currentIndex];
    if (!question) {
      return emptyState('Không có câu hỏi', 'Đề thi này chưa có câu hỏi cho phần đang làm.', `<a class="button primary" href="#/track/${exam.trackId}">Về lộ trình</a>`);
    }
    const selected = active.answers[question.id];
    const flagged = Boolean(active.flagged[question.id]);
    const answered = examSectionAnswered(exam, active, section.id);
    const resources = renderExamSectionResources(section);

    const options = question.options.map((option, optionIndex) => {
      return `<label class="exam-option ${selected === optionIndex ? 'selected' : ''}">
        <input type="radio" name="exam-${escapeHtml(exam.id)}-${escapeHtml(question.id)}" value="${optionIndex}" data-exam-option="${escapeHtml(exam.id)}" data-question="${escapeHtml(question.id)}" ${selected === optionIndex ? 'checked' : ''}>
        <span>${escapeHtml(option)}</span>
      </label>`;
    }).join('');

    const palette = questions.map((item, index) => {
      const classes = ['exam-palette-item'];
      if (active.answers[item.id] != null) classes.push('answered');
      if (index === currentIndex) classes.push('current');
      if (active.flagged[item.id]) classes.push('flagged');
      return `<button class="${classes.join(' ')}" type="button" data-action="exam-goto" data-exam_id="${escapeHtml(exam.id)}" data-index="${index}" aria-label="Câu ${index + 1}">${index + 1}</button>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/track/${exam.trackId}">← ${escapeHtml(exam.title)}</a>
        <h2>${escapeHtml(section.title)}</h2>
        <p>Câu ${currentIndex + 1}/${questions.length} · đã trả lời <span data-exam-answered="${escapeHtml(exam.id)}">${answered}/${questions.length}</span></p>
      </div>
      <div class="exam-clock" data-exam-timer="${escapeHtml(exam.id)}">${formatTime(active.remainingSeconds)}</div>
    </div>

    ${resources}

    <div class="exam-layout">
      <div class="exam-main">
        <div class="card card-pad exam-question-card">
          <div class="exam-question-meta">
            <span class="badge primary">${escapeHtml(question.topicTitle)}</span>
            <button class="button small ghost ${flagged ? 'warning' : ''}" type="button" data-action="exam-flag" data-exam_id="${escapeHtml(exam.id)}" data-question="${escapeHtml(question.id)}">${flagged ? 'Bỏ đánh dấu' : 'Đánh dấu xem lại'}</button>
          </div>
          <h3>${currentIndex + 1}. ${escapeHtml(question.question)}</h3>
          <div class="exam-options">${options}</div>
          <div class="button-row mt-16">
            <button class="button small" type="button" data-action="exam-prev" data-exam_id="${escapeHtml(exam.id)}" ${currentIndex === 0 ? 'disabled' : ''}>← Câu trước</button>
            <button class="button small" type="button" data-action="exam-next" data-exam_id="${escapeHtml(exam.id)}" ${currentIndex === questions.length - 1 ? 'disabled' : ''}>Câu tiếp →</button>
            <button class="button small primary" type="button" data-action="submit-exam-section" data-exam_id="${escapeHtml(exam.id)}">Nộp ${escapeHtml(section.title)}</button>
          </div>
        </div>
      </div>
      <aside class="exam-side">
        <div class="card card-pad">
          <div class="card-header"><div><h3>Bảng câu hỏi</h3><p>Xanh: đã làm · Vàng: đánh dấu.</p></div><span class="badge">${questions.length}</span></div>
          <div class="exam-palette">${palette}</div>
          <div class="exam-legend">
            <span><i class="legend-dot answered"></i>Đã làm</span>
            <span><i class="legend-dot current"></i>Đang xem</span>
            <span><i class="legend-dot flagged"></i>Đánh dấu</span>
          </div>
        </div>
        <div class="card card-pad mt-16">
          <div class="card-header"><div><h3>Tiến độ phần thi</h3><p>Tự lưu trên máy này.</p></div></div>
          <div class="meta-row"><span>Đã trả lời</span><strong>${answered}/${questions.length}</strong></div>
          ${progressBar(questions.length ? (answered / questions.length) * 100 : 0, answered === questions.length ? 'success' : '')}
          <p class="faint small mt-12">Hết giờ hệ thống tự nộp phần đang làm. Bạn có thể quay lại câu trước bằng bảng câu hỏi.</p>
        </div>
      </aside>
    </div>`;
  }

  function renderExamSectionResources(section, review) {
    if (!section) return '';
    const blocks = [];
    if (section.instructions) {
      blocks.push(`<p class="faint small exam-resource-note">${escapeHtml(section.instructions)}</p>`);
    }
    if (section.audioSrc) {
      blocks.push(`<div class="exam-audio-wrap">
        <audio class="exam-audio" controls preload="metadata" src="${escapeHtml(section.audioSrc)}"></audio>
        <p class="faint small">Audio TTS · bản gốc luyện tập, không phải đề thi chính thức.</p>
      </div>`);
    }
    if (section.passageHtml) {
      blocks.push(`<details class="exam-resource" open>
        <summary>Passage</summary>
        <div class="exam-prose">${section.passageHtml}</div>
      </details>`);
    }
    if (section.transcriptHtml) {
      blocks.push(review
        ? `<details class="exam-resource" open>
          <summary>Transcript</summary>
          <div class="exam-prose">${section.transcriptHtml}</div>
        </details>`
        : '<p class="faint small">Transcript sẽ hiện sau khi nộp phần này.</p>');
    }
    if (!blocks.length) return '';
    return `<div class="card card-pad exam-resource-card mt-16">${blocks.join('')}</div>`;
  }

  function renderWritingExamActive(exam, active, section) {
    const tasks = Array.isArray(section.tasks) ? section.tasks : [];
    const responses = active.responses || {};
    const answered = tasks.filter((task) => String(responses[task.id] || '').trim()).length;
    const cards = tasks.map((task, index) => {
      const value = String(responses[task.id] || '');
      return `<div class="card card-pad exam-task-card mt-16">
        <div class="card-header">
          <div><h3>Task ${index + 1} · ${escapeHtml(task.title)}</h3><p>${task.minWords ? `Tối thiểu ${task.minWords} từ` : 'Không giới hạn từ'} · gợi ý ${task.recommendedMinutes} phút</p></div>
          <span class="badge" data-ielts-wordcount="${escapeHtml(task.id)}">${countWords(value)} từ</span>
        </div>
        <div class="exam-prompt">${task.promptHtml || escapeHtml(task.prompt || '')}</div>
        <textarea class="textarea exam-writing-area" data-ielts-response="${escapeHtml(task.id)}" data-exam-id="${escapeHtml(exam.id)}" placeholder="Viết câu trả lời ở đây...">${escapeHtml(value)}</textarea>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/track/${exam.trackId}">← ${escapeHtml(exam.title)}</a>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${answered}/${tasks.length} task đã có nội dung · ${section.minutes} phút</p>
      </div>
      <div class="exam-clock" data-exam-timer="${escapeHtml(exam.id)}">${formatTime(active.remainingSeconds)}</div>
    </div>

    <div class="card card-pad exam-task-intro">
      <p><strong>Đề tự luyện gốc.</strong> ${escapeHtml(section.instructions || 'Viết câu trả lời cho từng task. Bài làm được lưu trên máy này.')}</p>
      <p class="faint small">Hết giờ hệ thống tự nộp. Sau khi nộp, bạn tự chấm 4 tiêu chí; đây không phải điểm IELTS chính thức.</p>
    </div>
    ${cards}
    <div class="button-row mt-16">
      <button class="button primary" type="button" data-action="submit-exam-section" data-exam_id="${escapeHtml(exam.id)}">Nộp bài Writing</button>
      <a class="button small" href="#/track/${exam.trackId}">Lưu & thoát</a>
    </div>`;
  }

  function renderSpeakingExamActive(exam, active, section) {
    const tasks = Array.isArray(section.tasks) ? section.tasks : [];
    const responses = active.responses || {};
    const answered = tasks.filter((task) => String(responses[task.id] || '').trim()).length;
    const cards = tasks.map((task, index) => {
      const value = String(responses[task.id] || '');
      return `<div class="card card-pad exam-task-card mt-16">
        <div class="card-header">
          <div><h3>Part ${index + 1} · ${escapeHtml(task.title)}</h3><p>${task.recommendedMinutes} phút</p></div>
          <span class="badge">Speaking</span>
        </div>
        <div class="exam-prompt">${task.promptHtml || escapeHtml(task.prompt || '')}</div>
        ${task.cueCardHtml ? `<div class="exam-cue-card">${task.cueCardHtml}</div>` : ''}
        <label class="field-label" for="speaking-notes-${escapeHtml(task.id)}">Ghi chú / dàn ý</label>
        <textarea class="textarea exam-notes-area" id="speaking-notes-${escapeHtml(task.id)}" data-ielts-response="${escapeHtml(task.id)}" data-exam-id="${escapeHtml(exam.id)}" placeholder="Ghi keywords, ví dụ, hướng triển khai...">${escapeHtml(value)}</textarea>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/track/${exam.trackId}">← ${escapeHtml(exam.title)}</a>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${answered}/${tasks.length} part đã có ghi chú · ${section.minutes} phút</p>
      </div>
      <div class="exam-clock" data-exam-timer="${escapeHtml(exam.id)}">${formatTime(active.remainingSeconds)}</div>
    </div>

    <div class="card card-pad exam-task-intro">
      <p><strong>Đề tự luyện gốc.</strong> ${escapeHtml(section.instructions || 'Ghi âm câu trả lời bằng điện thoại, sau đó tự chấm 4 tiêu chí Speaking.')}</p>
      <p class="faint small">Hết giờ hệ thống tự nộp. Phần ghi chú được lưu trên máy này; không có chấm điểm tự động.</p>
    </div>
    ${cards}
    <div class="button-row mt-16">
      <button class="button primary" type="button" data-action="submit-exam-section" data-exam_id="${escapeHtml(exam.id)}">Nộp bài Speaking</button>
      <a class="button small" href="#/track/${exam.trackId}">Lưu & thoát</a>
    </div>`;
  }

  function renderTaskExamReview(exam, attempt) {
    const isWriting = exam.examType === 'IELTS_WRITING'
      || exam.sections.some((section) => section.type === 'writing');
    const criteria = isWriting
      ? ['Task Response', 'Coherence and Cohesion', 'Lexical Resource', 'Grammatical Range and Accuracy']
      : ['Fluency and Coherence', 'Lexical Resource', 'Grammatical Range and Accuracy', 'Pronunciation'];
    const tasks = exam.sections.flatMap((section) => (Array.isArray(section.tasks) ? section.tasks : []));
    const responses = attempt.responses || {};
    const cards = tasks.map((task, index) => {
      const value = String(responses[task.id] || '');
      const label = isWriting ? `Task ${index + 1}` : `Part ${index + 1}`;
      return `<div class="card card-pad mt-16 exam-review-task">
        <div class="card-header"><div><h3>${label} · ${escapeHtml(task.title)}</h3><p>${isWriting ? `${countWords(value)} từ` : 'Ghi chú / dàn ý'}</p></div><span class="badge">${isWriting ? (task.minWords ? (countWords(value) >= task.minWords ? 'Đủ từ' : 'Chưa đủ từ') : `${countWords(value)} từ`) : 'Speaking'}</span></div>
        <div class="exam-response">${value ? escapeHtml(value).replace(/\n/g, '<br>') : '<span class="muted">Chưa có câu trả lời.</span>'}</div>
      </div>`;
    }).join('');
    const scores = criteria
      .map((criterion) => Number(attempt.rubric && attempt.rubric[criterion]))
      .filter((score) => Number.isInteger(score) && score >= 1 && score <= 9);
    const average = scores.length
      ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1)
      : '—';
    const rubricRows = criteria.map((criterion) => {
      const selected = attempt.rubric && attempt.rubric[criterion] ? Number(attempt.rubric[criterion]) : '';
      const options = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((score) => `<option value="${score}" ${selected === score ? 'selected' : ''}>${score}</option>`)
        .join('');
      return `<label class="exam-rubric-row">
        <span>${escapeHtml(criterion)}</span>
        <select data-ielts-rubric data-exam_id="${escapeHtml(exam.id)}" data-attempt_id="${escapeHtml(attempt.id)}" data-criterion="${escapeHtml(criterion)}">
          <option value="">Chưa chấm</option>
          ${options}
        </select>
      </label>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <button class="small button ghost" type="button" data-action="exam-review-back" data-exam_id="${escapeHtml(exam.id)}">← Quay lại đề</button>
        <h2>Xem lại ${escapeHtml(exam.title)}</h2>
        <p>${escapeHtml(formatDate(attempt.at))} · ${isWriting ? 'Writing' : 'Speaking'} · tự chấm ${average}/9</p>
      </div>
      <span class="badge ${scores.length ? 'primary' : 'warning'}">${scores.length ? 'Đã tự chấm' : 'Chưa tự chấm'}</span>
    </div>
    ${cards}
    <div class="card card-pad mt-16">
      <div class="card-header"><div><h3>Tự chấm rubric</h3><p>Chọn 1–9 cho từng tiêu chí. Đây là tự đánh giá, không phải điểm IELTS chính thức.</p></div><span class="badge">${average}/9</span></div>
      <div class="exam-rubric-grid">${rubricRows}</div>
    </div>`;
  }

  function renderExamReview(exam, attempt) {
    if (exam.questions.length === 0) return renderTaskExamReview(exam, attempt);
    const sections = exam.sections.map((section) => {
      const questions = examSectionQuestions(exam, section.id);
      const rows = questions.map((question, index) => {
        const selected = attempt.answers[question.id];
        const correct = selected === question.answer;
        const options = question.options.map((option, optionIndex) => {
          const classes = ['exam-review-option'];
          if (optionIndex === question.answer) classes.push('correct');
          if (optionIndex === selected && !correct) classes.push('wrong');
          return `<div class="${classes.join(' ')}">${escapeHtml(option)}</div>`;
        }).join('');
        return `<details class="exam-review-item ${correct ? 'correct' : 'wrong'}">
          <summary><span>Câu ${index + 1} · ${escapeHtml(question.topicTitle)}</span><strong>${correct ? 'Đúng' : 'Sai'}</strong></summary>
          <p class="exam-review-question">${escapeHtml(question.question)}</p>
          <div class="exam-review-options">${options}</div>
          <p class="quiz-explanation">${escapeHtml(question.explanation)}</p>
          ${question.lessonRef && LESSON_CONTEXT.has(question.lessonRef) ? `<a class="small" href="#/lesson/${question.lessonRef}">Học lại: ${escapeHtml(LESSON_CONTEXT.get(question.lessonRef).lesson.title)}</a>` : ''}
        </details>`;
      }).join('');
      const result = attempt.sections.find((item) => item.id === section.id) || { correct: 0, total: questions.length };
      return `<div class="card card-pad mt-16">
        <div class="card-header"><div><h3>${escapeHtml(section.title)}</h3><p>${result.correct}/${result.total} câu đúng</p></div><span class="badge ${result.correct === result.total ? 'success' : 'primary'}">${result.total ? Math.round((result.correct / result.total) * 100) : 0}%</span></div>
        ${renderExamSectionResources(section, true)}
        <div class="exam-review-list">${rows}</div>
      </div>`;
    }).join('');

    const topics = attempt.topics.map((topic) => {
      const percent = topic.total ? Math.round((topic.correct / topic.total) * 100) : 0;
      return `<div class="split-row">
        <div class="split-row-copy"><strong>${escapeHtml(topic.title)}</strong><span>${topic.correct}/${topic.total} câu đúng</span></div>
        <span class="badge ${percent >= exam.targetPercent ? 'success' : 'warning'}">${percent}%</span>
      </div>`;
    }).join('');

    return `<div class="page-head">
      <div>
        <button class="small button ghost" type="button" data-action="exam-review-back" data-exam_id="${escapeHtml(exam.id)}">← Quay lại đề</button>
        <h2>Xem lại ${escapeHtml(exam.title)}</h2>
        <p>${escapeHtml(formatDate(attempt.at))} · ${attempt.percent}% · ${attempt.totalCorrect}/${attempt.totalQuestions} câu đúng</p>
      </div>
      <span class="badge ${attempt.percent >= exam.targetPercent ? 'success' : 'warning'}">${attempt.percent >= exam.targetPercent ? 'Đạt mục tiêu luyện' : 'Cần ôn thêm'}</span>
    </div>
    <div class="card card-pad">
      <div class="card-header"><div><h3>Breakdown theo topic</h3><p>Dùng cột này để chọn bài ôn tiếp theo.</p></div></div>
      <div class="split-list">${topics}</div>
    </div>
    ${sections}`;
  }

  function renderExam(examId) {
    const exam = EXAM_BY_ID.get(examId);
    if (!exam) {
      return emptyState('Không tìm thấy đề thi', 'Đề này không tồn tại hoặc chưa được tải.', '<a class="button primary" href="#/tracks">Về lộ trình</a>');
    }
    const record = getExamRecord(exam.id);
    if (examReviewState[exam.id]) {
      const attempt = record.attempts.find((item) => item.id === examReviewState[exam.id]);
      if (attempt) return renderExamReview(exam, attempt);
      delete examReviewState[exam.id];
    }
    if (record.active) return renderExamActive(exam, record.active);
    return renderExamIntro(exam);
  }

  function renderLesson(lessonId) {
    const context = LESSON_CONTEXT.get(lessonId);
    if (!context) {
      return emptyState('Không tìm thấy bài học', 'Bài học này không tồn tại hoặc đã bị xoá.', '<a class="button primary" href="#/tracks">Về lộ trình</a>');
    }

    const { track, module, lesson } = context;
    if (lesson.examId) return renderExam(lesson.examId);
    const progress = getProgress(lesson.id);
    const lessonIndex = module.lessons.findIndex((item) => item.id === lesson.id);
    const previous = module.lessons[lessonIndex - 1];
    const next = module.lessons[lessonIndex + 1];
    const objectives = lesson.objectives.map((objective) => `<li>${escapeHtml(objective)}</li>`).join('');

    return `<div class="page-head">
      <div>
        <a class="small" href="#/track/${track.id}">← ${escapeHtml(track.shortTitle)} · ${escapeHtml(module.title)}</a>
        <h2>${escapeHtml(lesson.title)}</h2>
        <p>${lesson.estimatedMinutes} phút · ${progress.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'} · ${lessonMastery(lesson.id)}% mastery</p>
      </div>
      <div class="button-row">
        <a class="button small" href="#/review">Ôn thẻ</a>
        <a class="button small" href="#/stats">Thống kê</a>
      </div>
    </div>

    <div class="lesson-layout">
      <div class="lesson-main">
        <div class="card lesson-title-block">
          <span class="badge primary">${escapeHtml(track.shortTitle)}</span>
          <h2>${escapeHtml(lesson.title)}</h2>
          <p>Mục tiêu của bài này:</p>
          <ul class="objectives mt-8">${objectives}</ul>
        </div>

        <div class="card lesson-content mt-16">
          ${lesson.contentHtml}
        </div>

        ${renderQuiz(lesson)}

        <div class="button-row mt-16">
          ${previous ? `<a class="button small" href="#/lesson/${previous.id}">← Bài trước</a>` : ''}
          ${next ? `<a class="button small primary" href="#/lesson/${next.id}">Bài tiếp theo →</a>` : ''}
        </div>
      </div>

      <aside class="lesson-side">
        ${renderLessonSide(context)}
      </aside>
    </div>`;
  }

  function ensureReviewCurrent(due) {
    if (!due.length) {
      reviewState.currentId = null;
      reviewState.revealed = false;
      return null;
    }
    const exists = due.some((entry) => entry.flashcard.id === reviewState.currentId);
    if (!exists) {
      reviewState.currentId = due[0].flashcard.id;
      reviewState.revealed = false;
    }
    return due.find((entry) => entry.flashcard.id === reviewState.currentId) || due[0];
  }

  function describeInterval(card, quality) {
    if (quality < 3) return 'sau 10 phút';
    return card.interval <= 1 ? 'sau 1 ngày' : `sau ${card.interval} ngày`;
  }

  function rateCard(cardId, rating) {
    const context = CARD_CONTEXT.get(cardId);
    if (!context) return;

    const card = state.cards[cardId] || newCard();
    const quality = clampNumber(rating, 1, 5, 3);
    const now = Date.now();

    if (quality < 3) {
      card.repetition = 0;
      card.interval = 0;
      card.lapses = (Number(card.lapses) || 0) + 1;
      card.dueAt = now + 10 * 60 * 1000;
    } else {
      card.repetition = (Number(card.repetition) || 0) + 1;
      card.ease = Math.max(1.3, (Number(card.ease) || 2.5) + (0.1 - (5 - quality) * 0.08));
      if (card.repetition === 1) card.interval = 1;
      else if (card.repetition === 2) card.interval = 3;
      else card.interval = Math.max(1, Math.round((Number(card.interval) || 1) * card.ease));
      card.dueAt = now + card.interval * 24 * 60 * 60 * 1000;
    }

    card.lastReviewedAt = now;
    state.cards[cardId] = card;
    saveState();
    reviewState.revealed = false;
    showToast(`Đã lên lịch ôn lại ${describeInterval(card, quality)}.`, 'success');
    render();
  }

  function renderReview() {
    const due = getDueCards();
    const current = ensureReviewCurrent(due);

    if (!current) {
      const nextDueAt = ALL_CARDS
        .map((entry) => Number(state.cards[entry.flashcard.id] && state.cards[entry.flashcard.id].dueAt))
        .filter((value) => Number.isFinite(value) && value > Date.now())
        .sort((a, b) => a - b)[0];

      return `<div class="page-head">
        <div><h2>Ôn tập</h2><p>Không có thẻ đến hạn lúc này.</p></div>
        <span class="badge success">Đã sạch hàng đợi</span>
      </div>
      ${emptyState(
        'Không có thẻ đến hạn',
        nextDueAt ? `Thẻ gần nhất sẽ đến hạn ${formatDue(nextDueAt)}.` : 'Bạn đã hoàn thành toàn bộ thẻ. Có thể học bài mới.',
        '<a class="button primary" href="#/dashboard">Về Dashboard</a>'
      )}`;
    }

    const card = current.flashcard;
    const cardState = state.cards[card.id] || newCard();
    const context = CARD_CONTEXT.get(card.id);

    const answer = reviewState.revealed
      ? `<div class="flashcard-back">${escapeHtml(card.back)}</div>
        <div class="rating-row">
          <button class="button rating-again" type="button" data-action="rate-card" data-card="${card.id}" data-rating="1">Again<br><small>10 phút</small></button>
          <button class="button rating-hard" type="button" data-action="rate-card" data-card="${card.id}" data-rating="3">Hard<br><small>1 ngày</small></button>
          <button class="button rating-good" type="button" data-action="rate-card" data-card="${card.id}" data-rating="4">Good<br><small>3 ngày</small></button>
          <button class="button rating-easy" type="button" data-action="rate-card" data-card="${card.id}" data-rating="5">Easy<br><small>Lâu hơn</small></button>
        </div>`
      : `<div class="button-row mt-16">
          <button class="button primary" type="button" data-action="review-reveal">Hiện đáp án</button>
        </div>`;

    return `<div class="page-head">
      <div><h2>Ôn tập</h2><p>${due.length} thẻ đến hạn · lặp lại ngắt quãng (SM-2).</p></div>
      <span class="badge primary">${due.length} còn lại</span>
    </div>

    <div class="card flashcard">
      <div class="flashcard-kicker">${escapeHtml(context.track.shortTitle)} · ${escapeHtml(context.lesson.title)}</div>
      <p class="flashcard-front">${escapeHtml(card.front)}</p>
      ${answer}
      <div class="meta-row mt-12">
        <span>Đã ôn ${Number(cardState.repetition) || 0} lần</span>
        <span>Ease ${(Number(cardState.ease) || 2.5).toFixed(2)}</span>
      </div>
    </div>

    <div class="card card-pad mt-16">
      <div class="card-header"><div><h3>Cách chấm điểm</h3><p>Chọn theo độ khó thực tế, đừng chọn cho đẹp.</p></div></div>
      <div class="split-list">
        <div class="split-row"><div class="split-row-copy"><strong>Again</strong><span>Quên hoặc sai. Ôn lại sau 10 phút.</span></div><span class="badge danger">1</span></div>
        <div class="split-row"><div class="split-row-copy"><strong>Hard</strong><span>Nhớ được nhưng chật vật. Khoảng cách ngắn.</span></div><span class="badge warning">3</span></div>
        <div class="split-row"><div class="split-row-copy"><strong>Good</strong><span>Nhớ đúng, bình thường.</span></div><span class="badge primary">4</span></div>
        <div class="split-row"><div class="split-row-copy"><strong>Easy</strong><span>Quá dễ. Đẩy lịch xa hơn.</span></div><span class="badge success">5</span></div>
      </div>
    </div>`;
  }

  function renderStats() {
    const overall = getOverallStats();
    const week = getLast7Days();
    const maxMinutes = Math.max(1, ...week.map((day) => day.minutes));
    const bars = week.map((day) => {
      const height = Math.round((day.minutes / maxMinutes) * 100);
      return `<div class="bar-col">
        <span class="bar-value">${day.minutes || ''}</span>
        <div class="bar-track"><span class="bar-fill" style="height:${Math.max(day.minutes ? 4 : 0, height)}%"></span></div>
        <span class="bar-label">${day.label}</span>
      </div>`;
    }).join('');

    const trackRows = TRACKS.map((track) => {
      const stats = getTrackStats(track);
      return `<div class="split-row">
        <div class="split-row-copy">
          <strong>${escapeHtml(track.title)}</strong>
          <span>${stats.completed}/${stats.lessons} bài · ${Math.round(stats.quizAccuracy * 100)}% quiz · ${stats.readiness}% sẵn sàng</span>
        </div>
        <span class="badge ${stats.mastery >= 80 ? 'success' : 'primary'}">${stats.mastery}%</span>
      </div>`;
    }).join('');

    const weak = getWeakLessons(5);
    const weakRows = weak.length
      ? weak.map((item) => {
        const score = item.accuracy == null
          ? `Tự tin ${item.confidence}/3`
          : `Quiz ${Math.round(item.accuracy * 100)}%`;
        return `<div class="split-row">
          <div class="split-row-copy"><strong>${escapeHtml(item.lesson.title)}</strong><span>${escapeHtml(item.track.shortTitle)} · ${score}</span></div>
          <a class="button small" href="#/lesson/${item.lesson.id}">Ôn</a>
        </div>`;
      }).join('')
      : '<p class="muted small">Chưa có điểm yếu rõ ràng. Hãy làm thêm quiz để hệ thống gợi ý.</p>';

    const forecast = getReviewForecast();

    return `<div class="page-head">
      <div><h2>Thống kê</h2><p>Nhìn vào xu hướng, không chỉ điểm số.</p></div>
      <a class="button small" href="#/review">Ôn thẻ</a>
    </div>

    <div class="grid grid-4">
      <div class="card stat-card">
        <p class="stat-label">Bài đã xong</p>
        <p class="stat-value">${overall.completed}/${overall.lessons}</p>
        <p class="stat-note">${Math.round((overall.completed / Math.max(1, overall.lessons)) * 100)}% toàn bộ</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Quiz chính xác</p>
        <p class="stat-value">${Math.round(overall.quizAccuracy * 100)}%</p>
        <p class="stat-note">${overall.quizCorrect}/${overall.quizTotal} câu</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Mastery</p>
        <p class="stat-value">${overall.mastery}%</p>
        <p class="stat-note">Mức hiểu trung bình</p>
      </div>
      <div class="card stat-card">
        <p class="stat-label">Thẻ đã ôn</p>
        <p class="stat-value">${overall.reviewed}/${overall.cards}</p>
        <p class="stat-note">${Math.round((overall.reviewed / Math.max(1, overall.cards)) * 100)}% độ phủ</p>
      </div>
    </div>

    <div class="grid grid-2 mt-16">
      <div class="card card-pad">
        <div class="card-header"><div><h3>7 ngày gần nhất</h3><p>Số phút học đã ghi nhận.</p></div><span class="badge">${getWeekMinutes()} phút tuần này</span></div>
        <div class="bar-chart">${bars}</div>
      </div>
      <div class="card card-pad">
        <div class="card-header"><div><h3>Theo lộ trình</h3><p>Mastery và độ sẵn sàng.</p></div></div>
        <div class="split-list">${trackRows}</div>
      </div>
    </div>

    <div class="grid grid-2 mt-16">
      <div class="card card-pad">
        <div class="card-header"><div><h3>Điểm yếu nên ôn</h3><p>Dựa trên quiz và mức tự tin.</p></div></div>
        <div class="split-list">${weakRows}</div>
      </div>
      <div class="card card-pad">
        <div class="card-header"><div><h3>Dự báo ôn tập</h3><p>Hàng đợi thẻ ghi nhớ.</p></div></div>
        <div class="split-list">
          <div class="split-row"><div class="split-row-copy"><strong>Đến hạn ngay</strong><span>Cần ôn trước.</span></div><span class="badge warning">${forecast.dueNow}</span></div>
          <div class="split-row"><div class="split-row-copy"><strong>Trong hôm nay</strong><span>Tính đến cuối ngày.</span></div><span class="badge primary">${forecast.dueToday}</span></div>
          <div class="split-row"><div class="split-row-copy"><strong>7 ngày tới</strong><span>Sắp đến hạn.</span></div><span class="badge">${forecast.upcoming}</span></div>
        </div>
      </div>
    </div>`;
  }

  function renderPortfolio() {
    if (!PORTFOLIO_ARTIFACTS.length) {
      return emptyState('Chưa có hồ sơ', 'Thêm portfolioArtifacts vào curriculum.js để bắt đầu.');
    }

    const items = PORTFOLIO_ARTIFACTS.map((artifact) => {
      const item = state.portfolio.artifacts[artifact.id] || {
        status: 'todo',
        link: '',
        notes: ''
      };
      const statusLabel = item.status === 'done'
        ? 'Đã xong'
        : item.status === 'doing'
          ? 'Đang làm'
          : 'Chưa làm';
      const statusClass = item.status === 'done'
        ? 'success'
        : item.status === 'doing'
          ? 'warning'
          : '';

      return `<article class="card card-pad artifact-card">
        <div class="card-header">
          <div>
            <h3>${escapeHtml(artifact.title)}</h3>
            <p>${escapeHtml(artifact.description)}</p>
          </div>
          <span class="badge ${statusClass}">${statusLabel}</span>
        </div>
        <div class="field">
          <label for="artifact-status-${artifact.id}">Trạng thái</label>
          <select class="select" id="artifact-status-${artifact.id}" data-artifact-status="${artifact.id}">
            <option value="todo" ${item.status === 'todo' ? 'selected' : ''}>Chưa làm</option>
            <option value="doing" ${item.status === 'doing' ? 'selected' : ''}>Đang làm</option>
            <option value="done" ${item.status === 'done' ? 'selected' : ''}>Đã xong</option>
          </select>
        </div>
        <div class="field">
          <label for="artifact-link-${artifact.id}">Link / file</label>
          <input class="input" id="artifact-link-${artifact.id}" type="text" data-artifact-field="link" data-artifact="${artifact.id}" value="${escapeHtml(item.link)}" placeholder="https://...">
        </div>
        <div class="field">
          <label for="artifact-notes-${artifact.id}">Ghi chú</label>
          <textarea class="textarea" id="artifact-notes-${artifact.id}" rows="3" data-artifact-field="notes" data-artifact="${artifact.id}" placeholder="${escapeHtml(artifact.prompt)}">${escapeHtml(item.notes)}</textarea>
        </div>
      </article>`;
    }).join('');

    const counts = PORTFOLIO_ARTIFACTS.reduce((result, artifact) => {
      const status = state.portfolio.artifacts[artifact.id]?.status || 'todo';
      result[status] += 1;
      return result;
    }, { todo: 0, doing: 0, done: 0 });

    const questions = INTERVIEW_QUESTIONS.length
      ? `<div class="card card-pad mt-16">
          <div class="card-header"><div><h3>Interview prep</h3><p>Trả lời thành tiếng, mỗi câu 1–2 phút.</p></div><span class="badge primary">${INTERVIEW_QUESTIONS.length} câu</span></div>
          <ol class="interview-list">${INTERVIEW_QUESTIONS.map((question) => `<li>${escapeHtml(question)}</li>`).join('')}</ol>
        </div>`
      : '';

    return `<div class="page-head">
      <div><h2>Hồ sơ BA</h2><p>Bằng chứng năng lực cho front-office/product BA chứng khoán.</p></div>
      <span class="badge primary">${counts.done}/${PORTFOLIO_ARTIFACTS.length} đã xong</span>
    </div>

    <div class="grid grid-3">
      <div class="card stat-card"><p class="stat-label">Đã xong</p><p class="stat-value">${counts.done}</p><p class="stat-note">Artifact hoàn chỉnh</p></div>
      <div class="card stat-card"><p class="stat-label">Đang làm</p><p class="stat-value">${counts.doing}</p><p class="stat-note">Cần hoàn thiện</p></div>
      <div class="card stat-card"><p class="stat-label">Chưa làm</p><p class="stat-value">${counts.todo}</p><p class="stat-note">Bắt đầu từ problem statement</p></div>
    </div>

    <div class="grid grid-2 mt-16">${items}</div>
    ${questions}`;
  }

  function renderSettings() {
    const dayOptions = [
      [1, 'T2'], [2, 'T3'], [3, 'T4'], [4, 'T5'], [5, 'T6'], [6, 'T7'], [0, 'CN']
    ].map(([value, label]) => {
      return `<label class="check-chip"><input type="checkbox" data-study-day="${value}" ${state.settings.studyDays.includes(value) ? 'checked' : ''}>${label}</label>`;
    }).join('');

    const trackOptions = TRACKS.map((track) => {
      return `<option value="${track.id}" ${state.settings.activeTrackId === track.id ? 'selected' : ''}>${escapeHtml(track.title)}</option>`;
    }).join('');

    const unlockOptions = TRACKS
      .filter((track) => track.prerequisiteId && !track.optional)
      .map((track) => {
        return `<label class="check-chip"><input type="checkbox" data-unlock="${track.id}" ${state.settings.manualUnlock[track.id] ? 'checked' : ''}>Mở khoá ${escapeHtml(track.shortTitle)}</label>`;
      }).join('');
    const unlockField = unlockOptions
      ? `<div class="field">
          <span class="field-label">Mở khoá thủ công</span>
          <div class="day-grid">${unlockOptions}</div>
        </div>`
      : '';
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;

    return `<div class="page-head">
      <div><h2>Cài đặt</h2><p>Dữ liệu nằm trên máy bạn. Không có tài khoản hay máy chủ.</p></div>
      <span class="badge primary">Local-first</span>
    </div>

    <div class="settings-grid">
      <div class="card card-pad">
        <div class="card-header"><div><h3>Mục tiêu học</h3><p>Dùng để tính kế hoạch mỗi ngày.</p></div></div>
        <div class="field">
          <label for="weeklyMinutes">Số phút mỗi tuần</label>
          <input class="input" id="weeklyMinutes" type="number" min="30" max="3000" step="15" data-setting="weeklyMinutes" value="${state.settings.weeklyMinutes}">
          <span class="faint small">Hiện tại: khoảng ${getDailyBudget()} phút/ngày.</span>
        </div>
        <div class="field">
          <span class="field-label">Ngày học</span>
          <div class="day-grid">${dayOptions}</div>
        </div>
      </div>

      <div class="card card-pad">
        <div class="card-header"><div><h3>Lộ trình & chứng chỉ</h3><p>Chọn trọng tâm hiện tại.</p></div></div>
        <div class="field">
          <label for="activeTrackId">Lộ trình đang học</label>
          <select class="select" id="activeTrackId" data-setting="activeTrackId">${trackOptions}</select>
        </div>
        <div class="field">
          <label for="examProfile">Mục tiêu BA</label>
          <select class="select" id="examProfile" data-setting="examProfile">
            <option value="ECBA" ${state.settings.examProfile === 'ECBA' ? 'selected' : ''}>ECBA (entry)</option>
            <option value="CCBA" ${state.settings.examProfile === 'CCBA' ? 'selected' : ''}>CCBA</option>
            <option value="CBAP" ${state.settings.examProfile === 'CBAP' ? 'selected' : ''}>CBAP</option>
          </select>
        </div>
        ${unlockField}
      </div>

      <div class="card card-pad">
        <div class="card-header"><div><h3>Giao diện</h3><p>Áp dụng ngay khi đổi.</p></div></div>
        <div class="field">
          <label for="theme">Theme</label>
          <select class="select" id="theme" data-setting="theme">
            <option value="auto" ${state.settings.theme === 'auto' ? 'selected' : ''}>Theo hệ thống</option>
            <option value="light" ${state.settings.theme === 'light' ? 'selected' : ''}>Sáng</option>
            <option value="dark" ${state.settings.theme === 'dark' ? 'selected' : ''}>Tối</option>
          </select>
        </div>
        <div class="field">
          <span class="field-label">Dữ liệu</span>
          <div class="button-row">
            <button class="button small" type="button" data-action="export">Xuất JSON</button>
            <button class="button small" type="button" data-action="import">Nhập JSON</button>
            <input class="hidden" id="importFile" type="file" accept="application/json,.json">
          </div>
          <span class="faint small">Sao lưu định kỳ để không mất tiến độ.</span>
        </div>
      </div>

      <div class="card card-pad">
        <div class="card-header"><div><h3>Cài NeZha lên iPhone</h3><p>Dùng như app, không cần App Store.</p></div></div>
        ${isStandalone
          ? `<div class="field">
              <span class="field-label">Đã cài trên thiết bị</span>
              <p class="faint small">NeZha đang chạy dạng ứng dụng. Dữ liệu vẫn lưu trên máy; nhớ Xuất JSON để backup.</p>
            </div>`
          : `<div class="field">
              <span class="field-label">Safari</span>
              <p class="small">Mở trang này bằng Safari → nhấn nút Chia sẻ → <strong>Thêm vào Màn hình chính</strong>.</p>
              <p class="faint small">PWA không cần App Store. Dữ liệu lưu trên máy; nhớ Xuất JSON để backup.</p>
            </div>`}
      </div>

      <div class="card card-pad danger-zone">
        <div class="card-header"><div><h3>Vùng nguy hiểm</h3><p>Không thể hoàn tác.</p></div></div>
        <div class="button-row">
          <button class="button danger small" type="button" data-action="reset-progress">Xoá tiến độ học</button>
          <button class="button danger small" type="button" data-action="reset-all">Xoá toàn bộ dữ liệu</button>
        </div>
        <p class="faint small">Xoá tiến độ giữ lại cài đặt. Xoá toàn bộ đưa app về trạng thái ban đầu.</p>
      </div>
    </div>`;
  }

  function updateTimerDisplays() {
    const label = focusTimer.running ? 'Đang chạy' : focusTimer.paused ? 'Tạm dừng' : 'Sẵn sàng';

    document.querySelectorAll('[data-timer-display]').forEach((element) => {
      element.textContent = formatTime(focusTimer.remaining);
    });
    document.querySelectorAll('[data-timer-status]').forEach((element) => {
      element.textContent = label;
      element.className = `badge ${focusTimer.running ? 'success' : focusTimer.paused ? 'warning' : 'primary'}`;
    });
  }

  function startFocus(minutes) {
    const safeMinutes = clampNumber(minutes, 1, 180, 25);
    clearInterval(focusTimer.intervalId);
    focusTimer.duration = safeMinutes * 60;
    focusTimer.remaining = safeMinutes * 60;
    focusTimer.running = true;
    focusTimer.paused = false;
    focusTimer.intervalId = setInterval(tickFocus, 1000);
    render();
    showToast(`Bắt đầu ${safeMinutes} phút tập trung.`, 'success');
  }

  function pauseFocus() {
    if (!focusTimer.running) {
      showToast('Timer đang không chạy.', 'error');
      return;
    }
    clearInterval(focusTimer.intervalId);
    focusTimer.intervalId = null;
    focusTimer.running = false;
    focusTimer.paused = true;
    updateTimerDisplays();
    showToast('Đã tạm dừng timer.');
  }

  function resetFocus() {
    clearInterval(focusTimer.intervalId);
    focusTimer.intervalId = null;
    focusTimer.running = false;
    focusTimer.paused = false;
    focusTimer.remaining = focusTimer.duration;
    updateTimerDisplays();
    showToast('Đã đặt lại timer.');
  }

  function tickFocus() {
    if (!focusTimer.running) return;
    focusTimer.remaining -= 1;

    if (focusTimer.remaining <= 0) {
      const minutes = Math.max(1, Math.round(focusTimer.duration / 60));
      clearInterval(focusTimer.intervalId);
      focusTimer.intervalId = null;
      focusTimer.running = false;
      focusTimer.paused = false;
      focusTimer.remaining = 0;
      addSession({ type: 'focus', minutes });
      render();
      showToast(`Hoàn thành ${minutes} phút tập trung.`, 'success');
      return;
    }

    updateTimerDisplays();
  }

  function parseRoute() {
    const parts = (location.hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!parts.length) return { name: 'dashboard' };
    if (parts[0] === 'track') return { name: 'track', id: parts[1] || '' };
    if (parts[0] === 'lesson') return { name: 'lesson', id: parts[1] || '' };
    if (parts[0] === 'cfa') {
      if (parts[1] === 'diagnostic') return { name: 'cfa-diagnostic' };
      if (parts[1] === 'practice') return { name: 'cfa-practice', topic: parts[2] || '' };
      if (parts[1] === 'formulas') return { name: 'cfa-formulas' };
      if (parts[1] === 'errors') return { name: 'cfa-errors' };
      return { name: 'cfa' };
    }
    const allowed = ['dashboard', 'today', 'tracks', 'review', 'stats', 'portfolio', 'settings'];
    return { name: allowed.includes(parts[0]) ? parts[0] : 'dashboard' };
  }

  function render() {
    const route = parseRoute();
    updateChrome(route);

    let html = '';
    if (route.name === 'today') html = renderToday();
    else if (route.name === 'tracks') html = renderTracks();
    else if (route.name === 'track') html = renderTrack(route.id);
    else if (route.name === 'lesson') html = renderLesson(route.id);
    else if (route.name === 'review') html = renderReview();
    else if (route.name === 'stats') html = renderStats();
    else if (route.name === 'portfolio') html = renderPortfolio();
    else if (route.name === 'settings') html = renderSettings();
    else if (route.name === 'cfa') html = renderCfaHub();
    else if (route.name === 'cfa-diagnostic') html = renderCfaDiagnostic();
    else if (route.name === 'cfa-practice') html = renderCfaPractice(route.topic);
    else if (route.name === 'cfa-formulas') html = renderCfaFormulas();
    else if (route.name === 'cfa-errors') html = renderCfaErrors();
    else html = renderDashboard();

    if (app) app.innerHTML = html;
    if (route.name === 'cfa-formulas') applyCfaFormulaFilter();
    updateTimerDisplays();
  }

  function toggleLessonComplete(lessonId) {
    const context = LESSON_CONTEXT.get(lessonId);
    if (!context) return;

    const progress = ensureProgress(lessonId);
    if (progress.completed) {
      progress.completed = false;
      progress.completedAt = null;
      showToast('Đã bỏ đánh dấu hoàn thành.');
    } else {
      progress.completed = true;
      progress.completedAt = Date.now();
      maybeLogLessonSession(context.lesson);
      showToast('Đã hoàn thành bài học.', 'success');
    }
    saveState();
    render();
  }

  function submitQuiz(form) {
    const lessonId = form.dataset.lesson;
    const context = LESSON_CONTEXT.get(lessonId);
    if (!context) return;

    const selected = {};
    form.querySelectorAll('input[type="radio"]:checked').forEach((input) => {
      selected[input.name] = Number(input.value);
    });

    const answers = {};
    const correct = context.lesson.quiz.reduce((score, question) => {
      const answer = selected[`q-${question.id}`];
      answers[question.id] = answer == null ? null : answer;
      return score + (answer === question.answer ? 1 : 0);
    }, 0);

    const progress = ensureProgress(lessonId);
    progress.quizCorrect = correct;
    progress.quizTotal = context.lesson.quiz.length;
    progress.lastQuizAt = Date.now();
    quizState[lessonId] = {
      answers,
      submitted: true,
      correct,
      total: context.lesson.quiz.length
    };

    saveState();
    render();
    showToast(
      `Kết quả: ${correct}/${context.lesson.quiz.length} câu đúng.`,
      correct >= context.lesson.quiz.length * 0.7 ? 'success' : 'error'
    );
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `nezha-backup-${dateKey(new Date())}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Đã xuất dữ liệu JSON.', 'success');
  }

  function triggerImport() {
    const input = document.getElementById('importFile');
    if (input) input.click();
  }

  function importFile(input) {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ''));
        state = normalizeState(parsed);
        ensureCards();
        applyTheme();
        saveState();
        render();
        showToast('Đã nhập dữ liệu thành công.', 'success');
      } catch (error) {
        console.warn('NeZha: invalid import file.', error);
        showToast('File JSON không hợp lệ.', 'error');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  function resetProgress() {
    if (!window.confirm('Xoá toàn bộ tiến độ học, quiz, ghi chú và lịch sử? Cài đặt sẽ được giữ lại.')) return;
    state.progress = {};
    state.sessions = [];
    state.exams = {};
    state.cfa = {
      ...defaultCfaState(),
      targetDate: state.cfa.targetDate,
      weeklyHours: state.cfa.weeklyHours
    };
    ALL_CARDS.forEach(({ flashcard }) => {
      state.cards[flashcard.id] = newCard();
    });
    Object.keys(quizState).forEach((key) => delete quizState[key]);
    Object.keys(examReviewState).forEach((key) => delete examReviewState[key]);
    reviewState.currentId = null;
    reviewState.revealed = false;
    saveState();
    render();
    showToast('Đã xoá tiến độ học.');
  }

  function resetAll() {
    if (!window.confirm('Xoá toàn bộ dữ liệu NeZha và đưa app về trạng thái ban đầu?')) return;
    state = defaultState();
    ensureCards();
    Object.keys(quizState).forEach((key) => delete quizState[key]);
    Object.keys(examReviewState).forEach((key) => delete examReviewState[key]);
    reviewState.currentId = null;
    reviewState.revealed = false;
    saveState();
    applyTheme();
    render();
    showToast('Đã đặt lại toàn bộ dữ liệu.');
  }

  function handleClick(event) {
    const actionElement = event.target.closest('[data-action]');
    if (!actionElement) return;

    const action = actionElement.dataset.action;
    if (!action) return;
    event.preventDefault();

    switch (action) {
      case 'focus-start':
        startFocus(Number(actionElement.dataset.minutes));
        break;
      case 'focus-pause':
        pauseFocus();
        break;
      case 'focus-reset':
        resetFocus();
        break;
      case 'mark-complete':
        toggleLessonComplete(actionElement.dataset.lesson);
        break;
      case 'confidence': {
        const lessonId = actionElement.dataset.lesson;
        if (!LESSON_CONTEXT.has(lessonId)) break;
        const progress = ensureProgress(lessonId);
        progress.confidence = clampNumber(actionElement.dataset.value, 1, 3, 1);
        saveState();
        const row = actionElement.closest('.confidence-row');
        if (row) {
          row.querySelectorAll('.confidence-btn').forEach((button) => {
            button.classList.toggle('active', button === actionElement);
          });
        }
        updateChrome(parseRoute());
        showToast('Đã lưu mức tự tin.');
        break;
      }
      case 'cfa-diagnostic-retake':
        resetCfaDiagnostic();
        break;
      case 'cfa-practice-start':
        startCfaPractice(actionElement.dataset.topic);
        break;
      case 'cfa-practice-next':
        nextCfaPractice();
        break;
      case 'cfa-practice-end':
        endCfaPractice();
        break;
      case 'cfa-practice-restart':
        startCfaPractice(actionElement.dataset.topic);
        break;
      case 'cfa-error-retry':
        retryCfaError(actionElement.dataset.question);
        break;
      case 'cfa-error-resolve':
        resolveCfaError(actionElement.dataset.question);
        break;
      case 'cfa-formula-confidence':
        setCfaFormulaConfidence(actionElement.dataset.formula, actionElement.dataset.value);
        break;
      case 'retake-quiz': {
        const lessonId = actionElement.dataset.lesson;
        delete quizState[lessonId];
        render();
        break;
      }
      case 'start-exam':
        startExam(actionElement.dataset.exam_id, false);
        break;
      case 'retake-exam': {
        const examId = actionElement.dataset.exam_id;
        if (!EXAM_BY_ID.has(examId)) break;
        if (window.confirm('Bắt đầu một lượt làm mới? Lịch sử các lần trước vẫn được giữ.')) {
          startExam(examId, true);
        }
        break;
      }
      case 'exam-next':
      case 'exam-prev': {
        const examId = actionElement.dataset.exam_id;
        const active = getActiveExam(examId);
        const exam = EXAM_BY_ID.get(examId);
        if (!active || !exam) break;
        const section = exam.sections[active.currentSectionIndex];
        const total = section ? examSectionQuestions(exam, section.id).length : 0;
        const delta = action === 'exam-next' ? 1 : -1;
        active.currentQuestionIndex = Math.min(total - 1, Math.max(0, Number(active.currentQuestionIndex) + delta));
        saveState();
        render();
        break;
      }
      case 'exam-goto': {
        const examId = actionElement.dataset.exam_id;
        const active = getActiveExam(examId);
        if (!active) break;
        active.currentQuestionIndex = Math.max(0, Number(actionElement.dataset.index) || 0);
        saveState();
        render();
        break;
      }
      case 'exam-flag': {
        const examId = actionElement.dataset.exam_id;
        const questionId = actionElement.dataset.question;
        const active = getActiveExam(examId);
        if (!active || !questionId) break;
        if (active.flagged[questionId]) delete active.flagged[questionId];
        else active.flagged[questionId] = true;
        saveState();
        render();
        break;
      }
      case 'submit-exam-section':
        submitExamSection(actionElement.dataset.exam_id, false);
        break;
      case 'exam-next-section': {
        const examId = actionElement.dataset.exam_id;
        const exam = EXAM_BY_ID.get(examId);
        const active = getActiveExam(examId);
        if (!exam || !active || !active.awaitingBreak) break;
        const nextIndex = active.currentSectionIndex + 1;
        const nextSection = exam.sections[nextIndex];
        if (!nextSection) break;
        active.currentSectionIndex = nextIndex;
        active.currentQuestionIndex = 0;
        active.remainingSeconds = Math.max(1, Number(nextSection.minutes) || 1) * 60;
        active.awaitingBreak = false;
        active.breakStartedAt = null;
        saveState();
        render();
        showToast(`Bắt đầu ${nextSection.title}.`);
        break;
      }
      case 'exam-review': {
        const examId = actionElement.dataset.exam_id;
        const attemptId = actionElement.dataset.attempt_id;
        if (!EXAM_BY_ID.has(examId) || !attemptId) break;
        examReviewState[examId] = attemptId;
        render();
        break;
      }
      case 'exam-review-back': {
        const examId = actionElement.dataset.exam_id;
        delete examReviewState[examId];
        render();
        break;
      }
      case 'review-reveal':
        reviewState.revealed = true;
        render();
        break;
      case 'rate-card':
        rateCard(actionElement.dataset.card, Number(actionElement.dataset.rating));
        break;
      case 'unlock-track': {
        const trackId = actionElement.dataset.track;
        if (!TRACK_BY_ID[trackId]) break;
        state.settings.manualUnlock[trackId] = true;
        saveState();
        render();
        showToast(`Đã mở khoá ${TRACK_BY_ID[trackId].shortTitle}.`, 'success');
        break;
      }
      case 'set-active': {
        const trackId = actionElement.dataset.track;
        if (!TRACK_BY_ID[trackId]) break;
        state.settings.activeTrackId = trackId;
        saveState();
        render();
        showToast(`Đang học ${TRACK_BY_ID[trackId].shortTitle}.`, 'success');
        break;
      }
      case 'export':
        exportData();
        break;
      case 'import':
        triggerImport();
        break;
      case 'reset-progress':
        resetProgress();
        break;
      case 'reset-all':
        resetAll();
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    const cfaForm = event.target.closest('[data-form="cfa-diagnostic"]');
    if (cfaForm) {
      event.preventDefault();
      submitCfaDiagnostic(cfaForm);
      return;
    }

    const cfaPracticeForm = event.target.closest('[data-form="cfa-practice"]');
    if (cfaPracticeForm) {
      event.preventDefault();
      submitCfaPractice(cfaPracticeForm);
      return;
    }

    const form = event.target.closest('[data-form="quiz"]');
    if (!form) return;
    event.preventDefault();
    submitQuiz(form);
  }

  function handleInput(event) {
    const responseField = event.target.closest('[data-ielts-response]');
    if (responseField) {
      const examId = responseField.dataset.examId;
      const taskId = responseField.dataset.ieltsResponse;
      const active = getActiveExam(examId);
      if (!active || !taskId) return;
      active.responses = active.responses || {};
      active.responses[taskId] = responseField.value;
      const counter = document.querySelector(`[data-ielts-wordcount="${taskId}"]`);
      if (counter) counter.textContent = `${countWords(responseField.value)} từ`;
      scheduleSave();
      return;
    }

    const formulaSearch = event.target.closest('[data-cfa-formula-search]');
    if (formulaSearch) {
      cfaFormulaView.query = formulaSearch.value;
      applyCfaFormulaFilter();
      return;
    }

    const artifactField = event.target.closest('[data-artifact-field]');
    if (artifactField) {
      const artifactId = artifactField.dataset.artifact;
      const key = artifactField.dataset.artifactField;
      const artifact = state.portfolio.artifacts[artifactId];
      if (!artifact || (key !== 'link' && key !== 'notes')) return;
      artifact[key] = artifactField.value;
      artifact.updatedAt = Date.now();
      scheduleSave();
      return;
    }

    const field = event.target.closest('[data-note]');
    if (!field) return;

    const lessonId = field.dataset.lesson;
    const key = field.dataset.note;
    if (!lessonId || !LESSON_CONTEXT.has(lessonId)) return;
    if (key !== 'notes' && key !== 'feynman') return;

    const progress = ensureProgress(lessonId);
    progress[key] = field.value;
    scheduleSave();
  }

  function handleChange(event) {
    const target = event.target;

    if (target.matches('[data-cfa-formula-category]')) {
      cfaFormulaView.category = target.value || 'all';
      applyCfaFormulaFilter();
      return;
    }

    if (target.matches('[data-cfa-error-filter]')) {
      cfaErrorView.status = ['open', 'resolved', 'all'].includes(target.value) ? target.value : 'open';
      render();
      return;
    }

    if (target.matches('[data-ielts-rubric]')) {
      const examId = target.dataset.exam_id;
      const attemptId = target.dataset.attempt_id;
      const criterion = target.dataset.criterion;
      const record = ensureExamRecord(examId);
      const attempt = record.attempts.find((item) => item.id === attemptId);
      if (!attempt || !criterion) return;
      const score = Number(target.value);
      attempt.rubric = attempt.rubric || {};
      if (Number.isInteger(score) && score >= 1 && score <= 9) {
        attempt.rubric[criterion] = score;
      } else {
        delete attempt.rubric[criterion];
      }
      const scores = Object.values(attempt.rubric)
        .map(Number)
        .filter((value) => Number.isInteger(value) && value >= 1 && value <= 9);
      attempt.percent = scores.length
        ? Math.round((scores.reduce((sum, value) => sum + value, 0) / scores.length / 9) * 100)
        : 0;
      attempt.selfAssessed = scores.length > 0;
      saveState();
      render();
      return;
    }

    if (target.matches('[data-exam-option]')) {
      const examId = target.dataset.examOption;
      const questionId = target.dataset.question;
      const active = getActiveExam(examId);
      const exam = EXAM_BY_ID.get(examId);
      if (!active || !exam || !questionId) return;
      active.answers[questionId] = Number(target.value);
      saveState();

      const labels = target.closest('.exam-options');
      if (labels) {
        labels.querySelectorAll('.exam-option').forEach((label) => {
          label.classList.toggle('selected', label.contains(target));
        });
      }

      const section = exam.sections[active.currentSectionIndex];
      const questions = section ? examSectionQuestions(exam, section.id) : [];
      const questionIndex = questions.findIndex((question) => question.id === questionId);
      document.querySelectorAll(`[data-action="exam-goto"][data-exam_id="${examId}"]`).forEach((button, index) => {
        if (index === questionIndex) button.classList.add('answered');
      });
      updateExamTimerDisplay(examId);
      return;
    }

    if (target.matches('[data-cfa-field]')) {
      const key = target.dataset.cfaField;

      if (key === 'targetDate') {
        const value = String(target.value || '').trim();
        if (!value) {
          state.cfa.targetDate = null;
        } else {
          const parsed = new Date(`${value}T00:00:00`);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (Number.isNaN(parsed.getTime()) || parsed.getTime() < today.getTime()) {
            target.value = state.cfa.targetDate || '';
            showToast('Ngày thi phải là một ngày trong tương lai.', 'error');
            return;
          }
          state.cfa.targetDate = value;
        }
      } else if (key === 'weeklyHours') {
        state.cfa.weeklyHours = clampNumber(
          target.value,
          CFA_PLAN.minWeeklyHours || 3,
          CFA_PLAN.maxWeeklyHours || 20,
          state.cfa.weeklyHours
        );
        target.value = state.cfa.weeklyHours;
      }

      saveState();
      updateChrome(parseRoute());
      render();
      showToast('Đã lưu kế hoạch CFA.');
      return;
    }

    if (target.matches('[data-setting]')) {
      const key = target.dataset.setting;

      if (key === 'weeklyMinutes') {
        state.settings.weeklyMinutes = clampNumber(target.value, 30, 3000, state.settings.weeklyMinutes);
        target.value = state.settings.weeklyMinutes;
      } else if (key === 'activeTrackId' && TRACK_BY_ID[target.value]) {
        state.settings.activeTrackId = target.value;
      } else if (key === 'examProfile' && ['ECBA', 'CCBA', 'CBAP'].includes(target.value)) {
        state.settings.examProfile = target.value;
      } else if (key === 'theme' && ['auto', 'light', 'dark'].includes(target.value)) {
        state.settings.theme = target.value;
      }

      saveState();
      applyTheme();
      updateChrome(parseRoute());
      return;
    }

    if (target.matches('[data-study-day]')) {
      const day = Number(target.dataset.studyDay);
      let days = state.settings.studyDays.slice();
      if (target.checked && !days.includes(day)) days.push(day);
      if (!target.checked) days = days.filter((item) => item !== day);

      if (!days.length) {
        target.checked = true;
        showToast('Cần ít nhất một ngày học.', 'error');
        return;
      }

      state.settings.studyDays = days.sort((a, b) => a - b);
      saveState();
      updateChrome(parseRoute());
      return;
    }

    if (target.matches('[data-unlock]')) {
      const trackId = target.dataset.unlock;
      if (!TRACK_BY_ID[trackId]) return;
      state.settings.manualUnlock[trackId] = target.checked;
      saveState();
      updateChrome(parseRoute());
      return;
    }

    if (target.matches('[data-artifact-status]')) {
      const artifactId = target.dataset.artifactStatus;
      const artifact = state.portfolio.artifacts[artifactId];
      if (!artifact || !['todo', 'doing', 'done'].includes(target.value)) return;
      artifact.status = target.value;
      artifact.updatedAt = Date.now();
      saveState();
      render();
      showToast('Đã cập nhật hồ sơ.');
      return;
    }

    if (target.id === 'importFile') {
      importFile(target);
    }
  }

  ensureCards();
  applyTheme();

  if (!location.hash) location.hash = '#/dashboard';

  window.addEventListener('hashchange', render);
  window.addEventListener('beforeunload', () => {
    if (saveTimer) saveState();
  });

  if (app) app.addEventListener('click', handleClick);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('input', handleInput);
  document.addEventListener('change', handleChange);
  setInterval(tickExam, 1000);

  render();
})();
