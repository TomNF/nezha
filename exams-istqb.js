(function () {
  if (!window.NEZHA_EXAMS || !window.NEZHA_CONTENT || !window.NEZHA_CONTENT.istqb) return;
  const forms = window.NEZHA_EXAMS.buildFactExamSets(window.NEZHA_CONTENT.istqb, {
    forms: 3,
    optionsPerQuestion: 4
  });
  window.NEZHA_EXAMS.registerMany(forms, { source: 'istqb' });
})();
