(function () {
  if (!window.NEZHA_EXAMS || !window.NEZHA_CONTENT || !window.NEZHA_CONTENT.ecba) return;
  const forms = window.NEZHA_EXAMS.buildFactExamSets(window.NEZHA_CONTENT.ecba, {
    forms: 3,
    optionsPerQuestion: 4
  });
  window.NEZHA_EXAMS.registerMany(forms, { source: 'ecba' });
})();
