(function () {
  if (!window.NEZHA_EXAMS || !window.NEZHA_CONTENT || !window.NEZHA_CONTENT.cfa) return;
  const forms = window.NEZHA_EXAMS.buildFactExamSets(window.NEZHA_CONTENT.cfa, {
    forms: 3,
    optionsPerQuestion: 3
  });
  window.NEZHA_EXAMS.registerMany(forms, { source: 'cfa' });
})();
