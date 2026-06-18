import { CalculatorConfig } from '@/types/calculator';

export const ppfCalculator: CalculatorConfig = {
  id: 'ppf-calculator',
  slug: 'ppf-calculator',
  name: 'PPF (Public Provident Fund) Calculator',
  shortName: 'PPF Calculator',
  category: 'Investments',
  tagline: 'Calculate interest and maturity of your Public Provident Fund deposits.',
  seo: {
    title: 'PPF Calculator Online: Calculate PPF Maturity & Interest 2026',
    description: 'Calculate your Public Provident Fund (PPF) maturity amount and interest earned online. Free interactive tool with Section 80C tax deduction details.',
    keywords: ['PPF Calculator', 'Public Provident Fund Calculator', 'Calculate PPF online', 'PPF Interest Rate 2026', 'SBI PPF Calculator'],
  },
  inputs: [
    {
      id: 'yearlyInvestment',
      label: 'Yearly Investment (₹) (Max ₹1.5L)',
      type: 'range',
      min: 500,
      max: 150000,
      step: 500,
      defaultValue: 150000,
      unit: '₹',
    },
    {
      id: 'expectedRate',
      label: 'PPF Interest Rate (p.a. %)',
      type: 'range',
      min: 5,
      max: 10,
      step: 0.1,
      defaultValue: 7.1,
      unit: '%',
    },
    {
      id: 'timePeriod',
      label: 'Tenure (Years) (Min 15)',
      type: 'range',
      min: 15,
      max: 50,
      step: 5,
      defaultValue: 15,
      unit: 'Yr',
    },
  ],
  outputs: [
    { id: 'investedAmount', label: 'Total Invested Amount', type: 'currency' },
    { id: 'interestEarned', label: 'Interest Gained', type: 'currency' },
    { id: 'totalAmount', label: 'Maturity Amount', type: 'currency' },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.yearlyInvestment);
    const R = Number(inputs.expectedRate);
    const t = Number(inputs.timePeriod);

    const r = R / 100;
    
    // PPF interest is compounded annually.
    // Assuming deposit is made at the start of each year:
    // A = P * [((1 + r)^t - 1) / r] * (1 + r)
    const totalAmount = P * (((Math.pow(1 + r, t) - 1) / r) * (1 + r));
    const investedAmount = P * t;
    const interestEarned = Math.max(0, totalAmount - investedAmount);

    return {
      investedAmount,
      interestEarned: Math.round(interestEarned),
      totalAmount: Math.round(totalAmount),
      chartData: [
        { label: 'Invested Amount', value: investedAmount, color: '#3b82f6' },
        { label: 'Interest Gained', value: Math.round(interestEarned), color: '#10b981' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is a Public Provident Fund (PPF)?',
      answer: 'Public Provident Fund (PPF) is a popular long-term savings-cum-investment product in India, backed by the Central Government. It offers attractive interest rates, tax benefits, and safety of principal. The investment is subject to a 15-year lock-in.',
    },
    {
      question: 'What is the EEE tax status of PPF?',
      answer: 'PPF enjoys Exempt-Exempt-Exempt (EEE) status. This means: 1. The investment is exempt from tax under Section 80C (up to ₹1.5 Lakhs). 2. The interest earned is tax-exempt. 3. The maturity amount received at the end of 15 years is fully tax-exempt.',
    },
    {
      question: 'What are the limits on PPF contributions?',
      answer: 'An investor must deposit a minimum of ₹500 and can deposit a maximum of ₹1,50,000 per financial year in their PPF account. Contributions can be made in a lump sum or in up to 12 installments in a year.',
    },
    {
      question: 'Can I extend my PPF account after 15 years?',
      answer: 'Yes, after the initial 15-year maturity, you can extend your PPF account for blocks of 5 years at a time, with or without making fresh contributions. This extension can be done indefinitely.',
    },
  ],
  formulaDescription: 'PPF calculations assume contributions are made at the beginning of each fiscal year. The formula is:\n\n**A = P × [ ( (1 + r)ᵗ - 1 ) / r ] × (1 + r)**\n\nWhere:\n- **A** is the final maturity amount\n- **P** is the annual investment amount\n- **r** is the annual interest rate (e.g., 7.1% = 0.071)\n- **t** is the tenure in years (minimum 15 years)',
  relatedSlugs: ['nps-calculator', 'pf-calculator', 'fd-calculator'],
  affiliateCategory: 'investments',
};
