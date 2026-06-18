import { CalculatorConfig } from '@/types/calculator';

export const sipCalculator: CalculatorConfig = {
  id: 'sip-calculator',
  slug: 'sip-calculator',
  name: 'SIP (Systematic Investment Plan) Calculator',
  shortName: 'SIP Calculator',
  category: 'Investments',
  tagline: 'Calculate estimated returns of your mutual fund investments via SIP.',
  seo: {
    title: 'SIP Calculator: Calculate Mutual Fund SIP Returns Online 2026',
    description: 'Calculate your Mutual Fund Systematic Investment Plan (SIP) returns online instantly. Use our free, interactive SIP calculator to estimate wealth gains, total investment value, and get detailed graphical reports.',
    keywords: ['SIP Calculator', 'Mutual Fund SIP Calculator', 'SIP Returns Calculator', 'SIP Interest Calculator', 'Indian Mutual Fund SIP'],
  },
  inputs: [
    {
      id: 'monthlyInvestment',
      label: 'Monthly Investment (₹)',
      type: 'range',
      min: 500,
      max: 1000000,
      step: 500,
      defaultValue: 25000,
      unit: '₹',
    },
    {
      id: 'expectedRate',
      label: 'Expected Return Rate (p.a. %)',
      type: 'range',
      min: 1,
      max: 30,
      step: 0.5,
      defaultValue: 12,
      unit: '%',
    },
    {
      id: 'timePeriod',
      label: 'Time Period (Years)',
      type: 'range',
      min: 1,
      max: 40,
      step: 1,
      defaultValue: 10,
      unit: 'Yr',
    },
  ],
  outputs: [
    { id: 'totalInvestment', label: 'Invested Amount', type: 'currency' },
    { id: 'estReturns', label: 'Est. Returns', type: 'currency' },
    { id: 'totalValue', label: 'Total Value', type: 'currency' },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.monthlyInvestment);
    const expectedRate = Number(inputs.expectedRate);
    const n = Number(inputs.timePeriod) * 12;
    const i = expectedRate / 12 / 100;

    // SIP Formula: M = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
    const totalValue = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const totalInvestment = P * n;
    const estReturns = Math.max(0, totalValue - totalInvestment);

    return {
      totalInvestment: Math.round(totalInvestment),
      estReturns: Math.round(estReturns),
      totalValue: Math.round(totalValue),
      chartData: [
        { label: 'Invested Amount', value: Math.round(totalInvestment), color: '#3b82f6' },
        { label: 'Est. Returns', value: Math.round(estReturns), color: '#10b981' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is a Systematic Investment Plan (SIP)?',
      answer: 'A Systematic Investment Plan (SIP) is a method of investing in mutual funds where an investor makes regular, equal payments (monthly, quarterly, etc.) into a selected mutual fund scheme, rather than making a one-time lump sum investment.',
    },
    {
      question: 'How is SIP return calculated?',
      answer: 'SIP returns are calculated using compound interest, specifically the future value of an annuity due formula: M = P * [((1 + i)^n - 1) / i] * (1 + i), where P is the monthly investment amount, i is the monthly interest rate, and n is the total number of payments.',
    },
    {
      question: 'What is a good return rate on SIP in India?',
      answer: 'Typically, equity mutual funds in India tend to deliver around 12% to 15% long-term compounded returns over a 7-10 year horizon, while debt mutual funds hover around 6% to 8%. Historical returns are not guarantees of future performance.',
    },
    {
      question: 'Can I change my SIP amount during the tenure?',
      answer: 'Yes, most mutual funds allow you to increase or decrease your SIP investment amount through top-up SIP options or by stopping the current SIP and starting a new one.',
    },
  ],
  formulaDescription: 'The formula used to estimate the future value of a Systematic Investment Plan is:\n\n**M = P × [ ( (1 + i)ⁿ - 1 ) / i ] × (1 + i)**\n\nWhere:\n- **M** is the maturity amount (Total Value of investment)\n- **P** is the monthly SIP contribution\n- **i** is the monthly interest rate (Annual Rate / 12 / 100)\n- **n** is the total number of monthly installments (Tenure in years × 12)',
  relatedSlugs: ['compound-interest-calculator', 'fd-calculator', 'ppf-calculator', 'nps-calculator'],
  affiliateCategory: 'investments',
};
