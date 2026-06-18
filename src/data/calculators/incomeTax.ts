import { CalculatorConfig } from '@/types/calculator';

export const incomeTaxCalculator: CalculatorConfig = {
  id: 'income-tax-calculator',
  slug: 'income-tax-calculator',
  name: 'Income Tax Calculator',
  shortName: 'Income Tax',
  category: 'Taxation',
  tagline: 'Compare Old vs. New Tax Regime slabs and find your optimal tax saving options.',
  seo: {
    title: 'Income Tax Calculator India FY 2026-27: Compare New vs Old Slabs',
    description: 'Calculate your income tax online for Financial Year 2026-27 (Assessment Year 2027-28). Compare Old vs. New Tax Regime slabs and maximize your savings.',
    keywords: ['Income Tax Calculator', 'New Tax Regime vs Old', 'Tax Slab FY 2026-27', 'Income Tax Calculator India', 'Calculate Income Tax online'],
  },
  inputs: [
    {
      id: 'annualIncome',
      label: 'Gross Annual Salary (₹)',
      type: 'number',
      defaultValue: 1200000,
      unit: '₹',
    },
    {
      id: 'deductions80C',
      label: 'Section 80C Deductions (PPF, ELSS, EPF, etc.) - Old Regime (₹)',
      type: 'range',
      min: 0,
      max: 150000,
      step: 5000,
      defaultValue: 150000,
      unit: '₹',
    },
    {
      id: 'deductionsOther',
      label: 'Other Deductions (80D, 80G, NPS, etc.) - Old Regime (₹)',
      type: 'range',
      min: 0,
      max: 300000,
      step: 5000,
      defaultValue: 50000,
      unit: '₹',
    },
    {
      id: 'hraExemption',
      label: 'HRA Exemption - Old Regime (₹)',
      type: 'range',
      min: 0,
      max: 500000,
      step: 5000,
      defaultValue: 0,
      unit: '₹',
    },
  ],
  outputs: [
    { id: 'taxableIncomeNew', label: 'Taxable Income (New Regime)', type: 'currency' },
    { id: 'totalTaxNew', label: 'Total Tax (New Regime)', type: 'currency' },
    { id: 'taxableIncomeOld', label: 'Taxable Income (Old Regime)', type: 'currency' },
    { id: 'totalTaxOld', label: 'Total Tax (Old Regime)', type: 'currency' },
    { id: 'recommendedRegime', label: 'Recommended Regime', type: 'number' }, // treated as custom text/metric
  ],
  calculate: (inputs) => {
    const annualIncome = Number(inputs.annualIncome);
    const deductions80C = Number(inputs.deductions80C);
    const deductionsOther = Number(inputs.deductionsOther);
    const hraExemption = Number(inputs.hraExemption);

    // 1. NEW REGIME CALCULATION (FY 2026-27)
    // Standard Deduction: ₹75,000
    const stdDeductionNew = 75000;
    const taxableIncomeNew = Math.max(0, annualIncome - stdDeductionNew);
    
    let taxNew = 0;
    if (taxableIncomeNew > 700000) { // Section 87A rebate up to 7L taxable income
      let tempIncome = taxableIncomeNew;
      // Slabs:
      // Up to 3,00,000: 0%
      // 3L - 7L: 5% (max 20k)
      // 7L - 10L: 10% (max 30k)
      // 10L - 12L: 15% (max 30k)
      // 12L - 15L: 20% (max 60k)
      // Above 15L: 30%
      
      if (tempIncome > 1500000) {
        taxNew += (tempIncome - 1500000) * 0.3;
        tempIncome = 1500000;
      }
      if (tempIncome > 1200001) {
        taxNew += (tempIncome - 1200000) * 0.2;
        tempIncome = 1200000;
      }
      if (tempIncome > 1000001) {
        taxNew += (tempIncome - 1000000) * 0.15;
        tempIncome = 1000000;
      }
      if (tempIncome > 700001) {
        taxNew += (tempIncome - 700000) * 0.1;
        tempIncome = 700000;
      }
      if (tempIncome > 300001) {
        taxNew += (tempIncome - 300000) * 0.05;
      }
    } else {
      // Under rebate limit
      taxNew = 0;
    }
    const cessNew = taxNew * 0.04;
    const totalTaxNew = taxNew + cessNew;

    // 2. OLD REGIME CALCULATION
    // Standard Deduction: ₹50,000
    const stdDeductionOld = 50000;
    const totalDeductionsOld = deductions80C + deductionsOther + hraExemption;
    const taxableIncomeOld = Math.max(0, annualIncome - stdDeductionOld - totalDeductionsOld);

    let taxOld = 0;
    if (taxableIncomeOld > 500000) { // Section 87A rebate up to 5L taxable income
      let tempIncome = taxableIncomeOld;
      // Slabs:
      // Up to 2.5L: 0%
      // 2.5L - 5L: 5% (max 12.5k)
      // 5L - 10L: 20% (max 100k)
      // Above 10L: 30%
      
      if (tempIncome > 1000000) {
        taxOld += (tempIncome - 1000000) * 0.3;
        tempIncome = 1000000;
      }
      if (tempIncome > 500001) {
        taxOld += (tempIncome - 500000) * 0.2;
        tempIncome = 500000;
      }
      if (tempIncome > 250001) {
        taxOld += (tempIncome - 250000) * 0.05;
      }
    } else {
      // Under rebate limit
      taxOld = 0;
    }
    const cessOld = taxOld * 0.04;
    const totalTaxOld = taxOld + cessOld;

    const recommendedRegime = totalTaxNew <= totalTaxOld ? 'New Tax Regime' : 'Old Tax Regime';
    const taxDifference = Math.abs(totalTaxNew - totalTaxOld);

    return {
      taxableIncomeNew: Math.round(taxableIncomeNew),
      totalTaxNew: Math.round(totalTaxNew),
      taxableIncomeOld: Math.round(taxableIncomeOld),
      totalTaxOld: Math.round(totalTaxOld),
      recommendedRegime: recommendedRegime + ` (Save ₹${taxDifference.toLocaleString('en-IN')})`,
      chartData: [
        { label: 'New Regime Tax', value: Math.round(totalTaxNew), color: '#10b981' },
        { label: 'Old Regime Tax', value: Math.round(totalTaxOld), color: '#ef4444' },
      ],
    };
  },
  chartType: 'bar',
  faqs: [
    {
      question: 'Which tax regime is better: New or Old?',
      answer: 'It depends on your salary level and deductions. The New Regime offers lower tax rates but no deductions (except standard deduction of ₹75,000). The Old Regime has higher rates but allows exemptions like 80C, 80D, HRA, and home loan interest. If you have deductions exceeding ₹3.75 Lakhs, the Old Regime might be better; otherwise, the New Regime is typically preferred.',
    },
    {
      question: 'What is the standard deduction in India?',
      answer: 'For FY 2026-27, the standard deduction for salaried individuals is ₹75,000 under the New Tax Regime, and ₹50,000 under the Old Tax Regime. This is deducted directly from gross salary before tax is computed.',
    },
    {
      question: 'What is the Section 87A rebate?',
      answer: 'Section 87A provides a rebate that makes individuals with taxable incomes below a certain threshold exempt from paying income tax. Under the New Regime, if your taxable income is ₹7 Lakhs or less, you get a full rebate up to ₹20,000. Under the Old Regime, the rebate applies to taxable incomes up to ₹5 Lakhs (maximum rebate ₹12,500).',
    },
  ],
  formulaDescription: 'Tax is computed progressively according to standard slabs after subtracting applicable deductions:\n\n**Taxable Income = Gross Income - Standard Deduction - Deductions**\n\n**New Regime Slabs (FY 2026-27):**\n- Up to ₹3 Lakhs: Nil\n- ₹3L to ₹7L: 5%\n- ₹7L to ₹10L: 10%\n- ₹10L to ₹12L: 15%\n- ₹12L to ₹15L: 20%\n- Above ₹15 Lakhs: 30%\n\n**Old Regime Slabs:**\n- Up to ₹2.5 Lakhs: Nil\n- ₹2.5L to ₹5L: 5%\n- ₹5L to ₹10L: 20%\n- Above ₹10 Lakhs: 30%\n\n*A 4% Health and Education Cess is added to the computed tax under both regimes.*',
  relatedSlugs: ['salary-calculator', 'hra-calculator', 'gst-calculator', 'gratuity-calculator'],
  affiliateCategory: 'tax',
};
