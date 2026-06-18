import { CalculatorConfig } from '@/types/calculator';

export const rdCalculator: CalculatorConfig = {
  id: 'rd-calculator',
  slug: 'rd-calculator',
  name: 'Recurring Deposit (RD) Calculator',
  shortName: 'RD Calculator',
  category: 'Savings',
  tagline: 'Calculate the maturity value and interest earned of your monthly Recurring Deposits.',
  seo: {
    title: 'RD Calculator: Calculate Recurring Deposit Interest Online 2026',
    description: 'Calculate your Recurring Deposit (RD) returns online instantly. Adjust monthly deposits, interest rates, and check the maturity amount with quarterly compounding.',
    keywords: ['RD Calculator', 'Recurring Deposit Calculator', 'Calculate RD Online', 'RD Interest Rate 2026', 'Post Office RD Calculator'],
  },
  inputs: [
    {
      id: 'monthlyDeposit',
      label: 'Monthly Deposit (₹)',
      type: 'range',
      min: 500,
      max: 100000,
      step: 500,
      defaultValue: 5000,
      unit: '₹',
    },
    {
      id: 'rate',
      label: 'Rate of Interest (p.a. %)',
      type: 'range',
      min: 2,
      max: 15,
      step: 0.1,
      defaultValue: 6.8,
      unit: '%',
    },
    {
      id: 'timePeriod',
      label: 'Tenure (Years)',
      type: 'range',
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 3,
      unit: 'Yr',
    },
  ],
  outputs: [
    { id: 'investedAmount', label: 'Total Invested Amount', type: 'currency' },
    { id: 'interestEarned', label: 'Interest Earned', type: 'currency' },
    { id: 'totalAmount', label: 'Maturity Amount', type: 'currency' },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.monthlyDeposit);
    const R = Number(inputs.rate);
    const t = Number(inputs.timePeriod);

    const N = t * 12; // total number of months
    let totalAmount = 0;

    // RD compounding formula: each monthly installment compounds quarterly.
    // The number of compounding periods for installment k is (N - k + 1) / 3 quarters.
    for (let k = 1; k <= N; k++) {
      const quartersRemaining = (N - k + 1) / 3;
      totalAmount += P * Math.pow(1 + R / 400, quartersRemaining);
    }

    const investedAmount = P * N;
    const interestEarned = Math.max(0, totalAmount - investedAmount);

    return {
      investedAmount,
      interestEarned: Math.round(interestEarned),
      totalAmount: Math.round(totalAmount),
      chartData: [
        { label: 'Invested Amount', value: investedAmount, color: '#3b82f6' },
        { label: 'Interest Earned', value: Math.round(interestEarned), color: '#10b981' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is a Recurring Deposit (RD)?',
      answer: 'A Recurring Deposit (RD) is a special term deposit offered by banks and post offices in India, where you deposit a fixed amount every month for a pre-determined tenure. It helps disciplined savers accumulate a lumpsum over time while earning a higher interest rate than standard savings accounts.',
    },
    {
      question: 'How is RD compounding different from FD?',
      answer: 'In both cases, interest is compounded quarterly. However, in an FD, the entire principal is deposited on Day 1. In an RD, you add deposits monthly, meaning each monthly installment earns interest for a progressively shorter duration (the first month installment earns interest for the full tenure, while the last month installment earns interest for just one month).',
    },
    {
      question: 'What is the tax on Recurring Deposit interest?',
      answer: 'Like FDs, RD interest is fully taxable under the head "Income from Other Sources". Banks will deduct 10% TDS (Tax Deducted at Source) if the total interest earned from all FDs and RDs in a bank exceeds ₹40,000 in a financial year (₹50,000 for senior citizens).',
    },
  ],
  formulaDescription: 'Recurring Deposits in India compound quarterly using the standard Indian Banks\' Association formula:\n\n**M = P × [ (1 + i)ⁿ - 1 ] / [ 1 - (1 + i)⁻¹/³ ]**\n\nWhere:\n- **M** is the Maturity Value\n- **P** is the Monthly Installment\n- **i** is the quarterly interest rate (Annual Rate / 4 / 100)\n- **n** is the number of quarters (Tenure in years × 4)',
  relatedSlugs: ['fd-calculator', 'compound-interest-calculator', 'sip-calculator'],
  affiliateCategory: 'investments',
};
