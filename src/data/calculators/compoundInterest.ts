import { CalculatorConfig } from '@/types/calculator';

export const compoundInterestCalculator: CalculatorConfig = {
  id: 'compound-interest-calculator',
  slug: 'compound-interest-calculator',
  name: 'Compound Interest Calculator',
  shortName: 'Compound Interest',
  category: 'Investments',
  tagline: 'Calculate compounding growth of your investments over time.',
  seo: {
    title: 'Compound Interest Calculator: Compound Interest Online 2026',
    description: 'Calculate compound interest online with our free interactive tool. Choose compounding frequencies (monthly, quarterly, half-yearly, annually) and plan your investments.',
    keywords: ['Compound Interest Calculator', 'Calculate Compound Interest', 'Compounding Calculator India', 'Compound Interest Formula', 'Wealth Compounder'],
  },
  inputs: [
    {
      id: 'principal',
      label: 'Initial Principal (₹)',
      type: 'range',
      min: 1000,
      max: 10000000,
      step: 5000,
      defaultValue: 100000,
      unit: '₹',
    },
    {
      id: 'rate',
      label: 'Rate of Interest (p.a. %)',
      type: 'range',
      min: 1,
      max: 30,
      step: 0.1,
      defaultValue: 10,
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
    {
      id: 'frequency',
      label: 'Compounding Frequency',
      type: 'select',
      defaultValue: 1,
      options: [
        { label: 'Annually', value: 1 },
        { label: 'Half-Yearly', value: 2 },
        { label: 'Quarterly', value: 4 },
        { label: 'Monthly', value: 12 },
      ],
    },
  ],
  outputs: [
    { id: 'principalAmount', label: 'Principal Amount', type: 'currency' },
    { id: 'interestEarned', label: 'Interest Earned', type: 'currency' },
    { id: 'totalAmount', label: 'Total Value', type: 'currency' },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.principal);
    const R = Number(inputs.rate);
    const t = Number(inputs.timePeriod);
    const n = Number(inputs.frequency);

    const r = R / 100;
    
    // Compound Interest Formula: A = P * (1 + r/n)^(n*t)
    const totalAmount = P * Math.pow(1 + r / n, n * t);
    const interestEarned = Math.max(0, totalAmount - P);

    return {
      principalAmount: P,
      interestEarned: Math.round(interestEarned),
      totalAmount: Math.round(totalAmount),
      chartData: [
        { label: 'Principal Amount', value: P, color: '#3b82f6' },
        { label: 'Interest Earned', value: Math.round(interestEarned), color: '#10b981' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is compound interest?',
      answer: 'Compound interest is the interest calculated on the initial principal and also on the accumulated interest of previous periods. It is essentially "interest on interest" and causes investments to grow exponentially faster over time compared to simple interest.',
    },
    {
      question: 'How does compounding frequency impact returns?',
      answer: 'The more frequently interest is compounded, the higher the returns will be. For example, compounding monthly will yield a slightly higher return than compounding quarterly, which in turn yields more than compounding annually, for the same interest rate and period.',
    },
    {
      question: 'What is the Rule of 72?',
      answer: 'The Rule of 72 is a quick formula to estimate how long it will take to double an investment with compound interest. Divide 72 by the annual interest rate. For example, at an 8% interest rate, it takes approximately 72 / 8 = 9 years to double your money.',
    },
  ],
  formulaDescription: 'The compound interest formula is:\n\n**A = P × (1 + r / n)ⁿᵗ**\n\nWhere:\n- **A** is the final maturity amount\n- **P** is the initial principal investment\n- **r** is the annual nominal interest rate (as a decimal)\n- **n** is the compounding frequency (times interest is compounded per year)\n- **t** is the total time period in years',
  relatedSlugs: ['sip-calculator', 'fd-calculator', 'rd-calculator'],
  affiliateCategory: 'investments',
};
