import { CalculatorConfig } from '@/types/calculator';

export const npsCalculator: CalculatorConfig = {
  id: 'nps-calculator',
  slug: 'nps-calculator',
  name: 'NPS (National Pension System) Calculator',
  shortName: 'NPS Calculator',
  category: 'Retirement',
  tagline: 'Calculate your accumulated NPS wealth, lump sum cashout, and monthly pension payouts.',
  seo: {
    title: 'NPS Calculator Online: Calculate Pension & Lump Sum Amount 2026',
    description: 'Calculate your National Pension System (NPS) maturity corpus and monthly pension online instantly. Optimize annuity percentages and estimated returns.',
    keywords: ['NPS Calculator', 'National Pension System Calculator', 'Calculate NPS online', 'NPS Pension Calculator', 'NPS Scheme Returns'],
  },
  inputs: [
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution (₹)',
      type: 'range',
      min: 500,
      max: 100000,
      step: 500,
      defaultValue: 10000,
      unit: '₹',
    },
    {
      id: 'expectedRate',
      label: 'Expected Return Rate (p.a. %)',
      type: 'range',
      min: 5,
      max: 15,
      step: 0.5,
      defaultValue: 10,
      unit: '%',
    },
    {
      id: 'currentAge',
      label: 'Current Age (Years)',
      type: 'range',
      min: 18,
      max: 60,
      step: 1,
      defaultValue: 30,
      unit: 'Yr',
    },
    {
      id: 'annuityPct',
      label: 'Annuity Reinvestment Share (Min 40%) (%)',
      type: 'range',
      min: 40,
      max: 100,
      step: 5,
      defaultValue: 40,
      unit: '%',
    },
    {
      id: 'annuityRate',
      label: 'Expected Annuity Rate (Pension Rate) (%)',
      type: 'range',
      min: 4,
      max: 10,
      step: 0.1,
      defaultValue: 6,
      unit: '%',
    },
  ],
  outputs: [
    { id: 'totalInvestment', label: 'Total Invested Principal', type: 'currency' },
    { id: 'totalWealth', label: 'Total Wealth Corpus', type: 'currency' },
    { id: 'lumpSumAmount', label: 'Lump Sum Cashout (60% Max)', type: 'currency' },
    { id: 'monthlyPension', label: 'Estimated Monthly Pension', type: 'currency' },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.monthlyContribution);
    const expectedRate = Number(inputs.expectedRate);
    const currentAge = Number(inputs.currentAge);
    const retirementAge = 60; // Standard retirement age in NPS is 60.
    const annuityPct = Number(inputs.annuityPct) / 100;
    const annuityRate = Number(inputs.annuityRate) / 100;

    const yearsOfInvesting = Math.max(1, retirementAge - currentAge);
    const n = yearsOfInvesting * 12;
    const i = expectedRate / 12 / 100;

    // Compounded future value of monthly annuity due:
    // A = P * [((1 + i)^n - 1) / i] * (1 + i)
    const totalWealth = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const totalInvestment = P * n;

    // Splits
    const annuityAmount = totalWealth * annuityPct;
    const lumpSumAmount = totalWealth * (1 - annuityPct);

    // Monthly pension = (Annuity Amount * Annuity Rate) / 12
    const monthlyPension = (annuityAmount * annuityRate) / 12;

    return {
      totalInvestment: Math.round(totalInvestment),
      totalWealth: Math.round(totalWealth),
      lumpSumAmount: Math.round(lumpSumAmount),
      monthlyPension: Math.round(monthlyPension),
      chartData: [
        { label: 'Lump Sum Cashout', value: Math.round(lumpSumAmount), color: '#10b981' },
        { label: 'Annuity Reinvestment', value: Math.round(annuityAmount), color: '#3b82f6' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is the National Pension System (NPS)?',
      answer: 'The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable systematic savings. It is regulated by the PFRDA and is open to all Indian citizens between the ages of 18 and 70. NPS investments are managed by professional pension fund managers.',
    },
    {
      question: 'How much can I withdraw from NPS at maturity?',
      answer: 'Upon reaching the age of 60, you can withdraw up to a maximum of 60% of the accumulated corpus tax-free as a lump sum. The remaining 40% (minimum) must be compulsorily reinvested in purchasing a life annuity scheme, which provides you with a monthly pension.',
    },
    {
      question: 'What are the tax benefits of NPS?',
      answer: 'NPS offers three-fold tax benefits: 1. Deductions up to ₹1.5 Lakhs under Section 80C. 2. Additional deduction of ₹50,000 under Section 80CCD(1B). 3. Tax-free lump sum withdrawal at age 60 (up to 60% of total corpus).',
    },
  ],
  formulaDescription: 'NPS corpus accumulates through monthly SIP-like contributions compounding monthly:\n\n**Maturity Wealth = P × [ ( (1 + i)ⁿ - 1 ) / i ] × (1 + i)**\n\nWhere:\n- **P** is the monthly contribution\n- **i** is the monthly rate of return (Expected Annual Rate / 12 / 100)\n- **n** is the total months of investment ( (60 - Current Age) × 12 )\n\n**Pension Calculation:**\n- **Annuity Principal** = Maturity Wealth × Reinvestment Share%\n- **Monthly Pension** = (Annuity Principal × Annual Pension Rate%) / 12',
  relatedSlugs: ['ppf-calculator', 'pf-calculator', 'sip-calculator', 'gratuity-calculator'],
  affiliateCategory: 'investments',
};
