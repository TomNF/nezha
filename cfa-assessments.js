(function () {
  'use strict';

  const banks = new Map();

  function register(bank) {
    if (!bank || typeof bank !== 'object' || !bank.id) {
      throw new Error('CFA assessment bank must have an id.');
    }
    if (banks.has(bank.id)) {
      throw new Error(`Duplicate CFA assessment bank id: ${bank.id}`);
    }
    banks.set(bank.id, bank);
    return bank;
  }

  function registerMany(items) {
    if (!Array.isArray(items)) return [];
    return items.map(register);
  }

  function get(id) {
    return banks.get(id) || null;
  }

  function list() {
    return Array.from(banks.values());
  }

  function byPhase(phase) {
    return list().filter((bank) => String(bank.phase) === String(phase));
  }

  function byKind(kind) {
    return list().filter((bank) => bank.kind === kind);
  }

  function lessonQuizFor(lessonId) {
    for (const bank of banks.values()) {
      if (bank.lessonQuizzes && Object.prototype.hasOwnProperty.call(bank.lessonQuizzes, lessonId)) {
        return bank.lessonQuizzes[lessonId];
      }
    }
    return null;
  }

  window.NEZHA_CFA_ASSESSMENTS = {
    register,
    registerMany,
    get,
    list,
    byPhase,
    byKind,
    lessonQuizFor
  };
})();
