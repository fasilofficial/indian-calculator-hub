import { CalculatorConfig } from '@/types/calculator';

export const salaryCalculator: CalculatorConfig = {
  id: 'salary-calculator',
  slug: 'salary-calculator',
  name: 'Salary Calculator (In-Hand/Take-Home Salary)',
  shortName: 'Salary Calculator',
  category: 'Salary',
  tagline: 'Calculate your monthly take-home salary, EPF, and tax deductions from your annual CTC.',
  seo: {
    title: 'Salary Calculator India: Calculate In-Hand/Take-Home Salary 2026',
    description: 'Calculate your monthly in-hand/take-home salary from your annual CTC. See complete breakdowns of Basic Salary, HRA, EPF contribution, Professional Tax, and Income Tax.',
    keywords: ['Salary Calculator India', 'Take Home Salary Calculator', 'CTC to In Hand Salary', 'Calculate Monthly Salary', 'Salary Slip Breakdown'],
  },
  inputs: [
    {
      id: 'ctc',
      label: 'Annual Cost to Company (CTC) (₹)',
      type: 'number',
      defaultValue: 1200000,
      unit: '₹',
    },
    {
      id: 'epfOptIn',
      label: 'Deduct Employee EPF (12% of Basic)',
      type: 'select',
      defaultValue: 'yes',
      options: [
        { label: 'Yes (Standard EPF)', value: 'yes' },
        { label: 'No (Opt Out)', value: 'no' },
      ],
    },
    {
      id: 'professionalTax',
      label: 'Monthly Professional Tax (₹)',
      type: 'range',
      min: 0,
      max: 300,
      step: 50,
      defaultValue: 200,
      unit: '₹',
    },
  ],
  outputs: [
    { id: 'monthlyGross', label: 'Monthly Gross Salary', type: 'currency' },
    { id: 'employeeEpf', label: 'EPF Deduction (Employee)', type: 'currency' },
    { id: 'monthlyTax', label: 'Income Tax Deduction (New Regime)', type: 'currency' },
    { id: 'takeHomeMonthly', label: 'Monthly In-Hand / Take-Home', type: 'currency' },
  ],
  calculate: (inputs) => {
    const ctc = Number(inputs.ctc);
    const epfOptIn = inputs.epfOptIn === 'yes';
    const profTax = Number(inputs.professionalTax);

    // Salaried assumptions in India:
    // Basic is usually 50% of CTC
    const monthlyGross = ctc / 12;
    const monthlyBasic = monthlyGross * 0.5;
    
    // Deductions
    const employeeEpf = epfOptIn ? (monthlyBasic * 0.12) : 0;

    // Calculate annual tax under New Regime to get monthly tax
    // Standard deduction under new regime is ₹75,000
    const stdDeductionNew = 75000;
    const taxableIncomeNew = Math.max(0, ctc - stdDeductionNew);

    let annualTax = 0;
    if (taxableIncomeNew > 700000) {
      let tempIncome = taxableIncomeNew;
      if (tempIncome > 1500000) {
        annualTax += (tempIncome - 1500000) * 0.3;
        tempIncome = 1500000;
      }
      if (tempIncome > 1200001) {
        annualTax += (tempIncome - 1200000) * 0.2;
        tempIncome = 1200000;
      }
      if (tempIncome > 1000001) {
        annualTax += (tempIncome - 1000000) * 0.15;
        tempIncome = 1000000;
      }
      if (tempIncome > 700001) {
        annualTax += (tempIncome - 700000) * 0.1;
        tempIncome = 700000;
      }
      if (tempIncome > 300001) {
        annualTax += (tempIncome - 300000) * 0.05;
      }
    } else {
      annualTax = 0;
    }
    const annualCess = annualTax * 0.04;
    const totalAnnualTax = annualTax + annualCess;
    const monthlyTax = totalAnnualTax / 12;

    const takeHomeMonthly = monthlyGross - employeeEpf - profTax - monthlyTax;

    return {
      monthlyGross: Math.round(monthlyGross),
      employeeEpf: Math.round(employeeEpf),
      monthlyTax: Math.round(monthlyTax),
      takeHomeMonthly: Math.round(takeHomeMonthly),
      chartData: [
        { label: 'Take-Home Salary', value: Math.round(takeHomeMonthly), color: '#10b981' },
        { label: 'EPF Deduction', value: Math.round(employeeEpf), color: '#3b82f6' },
        { label: 'Income Tax', value: Math.round(monthlyTax), color: '#ef4444' },
        { label: 'Professional Tax', value: profTax, color: '#6b7280' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is Cost to Company (CTC)?',
      answer: 'CTC is the total salary package offered by an employer to an employee. It includes basic salary, allowances (HRA, travel, medical), employer contributions to EPF and Gratuity, and any variable components or bonuses. It is the total expense a company incurs on an employee.',
    },
    {
      question: 'Why is my take-home salary less than my CTC?',
      answer: 'Take-home salary is lower because of various statutory and tax deductions. These include employee provident fund contributions (EPF), professional tax (PT), and income tax (TDS). Additionally, employer shares in EPF/Gratuity are listed in CTC but not paid directly in cash.',
    },
    {
      question: 'Is EPF deduction mandatory?',
      answer: 'For employees earning a basic salary of up to ₹15,000 per month in a registered organization, EPF is mandatory. For basic salaries above ₹15,000, employees can choose to opt out of the EPF scheme at the start of their employment (subject to company policies).',
    },
  ],
  formulaDescription: 'The take-home salary is calculated using the following breakdown:\n\n- **Monthly Gross Salary** = Annual CTC / 12\n- **Monthly Basic Salary** = 50% of Monthly Gross Salary\n- **Employee EPF Deduction** = 12% of Monthly Basic Salary\n- **Monthly Take-Home** = Monthly Gross - EPF - Professional Tax - Monthly Income Tax (TDS)',
  relatedSlugs: ['income-tax-calculator', 'hra-calculator', 'pf-calculator', 'gratuity-calculator'],
  affiliateCategory: 'salary',
};
