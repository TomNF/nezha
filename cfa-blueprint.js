(function () {
  'use strict';

  const topics = [
    { id: 'ethics', title: 'Ethics', weight: '10–15%', note: 'Code and Standards, professionalism, integrity of capital markets.' },
    { id: 'quant', title: 'Quantitative Methods', weight: '11–14%', note: 'TVM, statistics, probability, and return concepts.' },
    { id: 'economics', title: 'Economics', weight: '6–9%', note: 'Microeconomics, macroeconomics, and market structures.' },
    { id: 'fsa', title: 'Financial Statement Analysis', weight: '11–14%', note: 'Statements, ratios, accruals, and quality of earnings.' },
    { id: 'corporate', title: 'Corporate Issuers', weight: '6–9%', note: 'Capital structure, cost of capital, and governance.' },
    { id: 'equity', title: 'Equity Investments', weight: '11–14%', note: 'Valuation, market structure, and industry analysis.' },
    { id: 'fixed-income', title: 'Fixed Income', weight: '11–14%', note: 'Bond pricing, yield, duration, and credit risk.' },
    { id: 'derivatives', title: 'Derivatives', weight: '6–9%', note: 'Forwards, futures, options, and swaps.' },
    { id: 'alternatives', title: 'Alternative Investments', weight: '6–9%', note: 'Hedge funds, private equity, real estate, and commodities.' },
    { id: 'portfolio', title: 'Portfolio Management', weight: '8–12%', note: 'Risk, return, diversification, and portfolio construction.' }
  ];

  const assessments = window.NEZHA_CFA_ASSESSMENTS;
  const diagnostic = assessments && assessments.get('cfa-phase0-diagnostic')
    ? assessments.get('cfa-phase0-diagnostic')
    : { totalQuestions: 0, estimatedMinutes: 0, sections: [] };

  window.NEZHA_CFA_PHASE0 = {
    version: '2027.phase0',
    topics,
    diagnostic,
    plan: {
      totalHours: 300,
      defaultWeeklyHours: 6,
      minWeeklyHours: 3,
      maxWeeklyHours: 20,
      recommendedMonths: '9–12'
    },
    routes: {
      foundations: {
        id: 'foundations',
        label: 'Foundations',
        summary: 'Bắt đầu với finance math, accounting, statistics, economics và calculator trước khi vào core CFA.'
      },
      'fast-track': {
        id: 'fast-track',
        label: 'Fast-track',
        summary: 'Có nền tảng tương đối. Làm Foundations nhanh, tập trung vá topic yếu rồi vào core.'
      },
      core: {
        id: 'core',
        label: 'Core-ready',
        summary: 'Có thể bắt đầu core CFA sớm, nhưng vẫn nên ôn lại các topic có điểm thấp.'
      }
    },
    disclaimer: 'Đây là chẩn đoán định hướng, không phải điểm pass CFA và không phải đề thi chính thức. Không có hệ thống nào đảm bảo đỗ CFA; mục tiêu là xây readiness có căn cứ.'
  };
})();
