import { CalculatorConfig } from '@/types/calculator';

export const fdCalculator: CalculatorConfig = {
  id: 'fd-calculator',
  slug: 'fd-calculator',
  name: 'Fixed Deposit (FD) Calculator',
  shortName: 'FD Calculator',
  category: 'Savings',
  tagline: 'Calculate interest earned and maturity value of your Fixed Deposits.',
  seo: {
    title: 'FD Calculator: Calculate Fixed Deposit Maturity Amount Online 2026',
    description: 'Calculate your Fixed Deposit (FD) returns online instantly. Supports quarterly compounding, the standard method used by major Indian banks like SBI, HDFC, and ICICI.',
    keywords: ['FD Calculator', 'Fixed Deposit Calculator', 'Calculate FD Interest', 'FD Maturity Calculator', 'SBI FD Interest Calculator'],
  },
  inputs: [
    {
      id: 'principal',
      label: 'Deposit Amount (₹)',
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
      min: 2,
      max: 15,
      step: 0.1,
      defaultValue: 7,
      unit: '%',
    },
    {
      id: 'timePeriod',
      label: 'Tenure (Years)',
      type: 'range',
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 5,
      unit: 'Yr',
    },
  ],
  outputs: [
    { id: 'investedAmount', label: 'Invested Amount', type: 'currency' },
    { id: 'interestEarned', label: 'Interest Gained', type: 'currency' },
    { id: 'totalAmount', label: 'Maturity Amount', type: 'currency' },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.principal);
    const R = Number(inputs.rate);
    const t = Number(inputs.timePeriod);

    // In India, FD interest is typically compounded quarterly: n = 4
    const n = 4;
    const r = R / 100;
    const totalAmount = P * Math.pow(1 + r / n, n * t);
    const interestEarned = Math.max(0, totalAmount - P);

    return {
      investedAmount: P,
      interestEarned: Math.round(interestEarned),
      totalAmount: Math.round(totalAmount),
      chartData: [
        { label: 'Invested Amount', value: P, color: '#3b82f6' },
        { label: 'Interest Gained', value: Math.round(interestEarned), color: '#10b981' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'How is FD interest calculated in India?',
      answer: 'Fixed Deposit (FD) interest in India is typically compounded on a quarterly basis. The formula is: A = P * (1 + R/400)^(4 * t), where P is the principal, R is the annual interest rate, and t is the tenure in years.',
    },
    {
      question: 'Is Fixed Deposit interest taxable?',
      answer: 'Yes, interest earned on Fixed Deposits is taxable. If the interest earned exceeds ₹40,000 in a financial year (₹50,000 for senior citizens), the bank will deduct Tax Deducted at Source (TDS) at 10% (or 20% if PAN is not provided). The interest is added to your total income and taxed at your applicable slab rate.',
    },
    {
      question: 'What is a tax-saving FD?',
      answer: 'A Tax-Saving Fixed Deposit is a special type of FD with a lock-in period of 5 years. Investments in tax-saving FDs are eligible for deduction under Section 80C (up to ₹1.5 Lakhs per year). However, the interest earned remains taxable.',
    },
  ],
  formulaDescription: 'Fixed Deposits in India compound quarterly using the formula:\n\n**A = P × (1 + r / 4)⁴ᵗ**\n\nWhere:\n- **A** is the final maturity amount\n- **P** is the principal deposit amount\n- **r** is the annual interest rate (as a decimal)\n- **t** is the tenure in years',
  relatedSlugs: ['rd-calculator', 'compound-interest-calculator', 'ppf-calculator'],
  affiliateCategory: 'investments',
};
