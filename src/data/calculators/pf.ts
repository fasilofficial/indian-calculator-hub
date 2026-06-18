import { CalculatorConfig } from '@/types/calculator';

export const pfCalculator: CalculatorConfig = {
  id: 'pf-calculator',
  slug: 'pf-calculator',
  name: 'EPF (Employees Provident Fund) Calculator',
  shortName: 'PF Calculator',
  category: 'Retirement',
  tagline: 'Estimate your accumulated EPF corpus at retirement based on your salary and interest.',
  seo: {
    title: 'EPF Calculator: Calculate Employee Provident Fund Online 2026',
    description: 'Calculate your Employees Provident Fund (EPF) corpus at retirement. Enter your basic salary, monthly contribution, and annual increment to see your total PF accumulation.',
    keywords: ['EPF Calculator', 'PF Calculator', 'Employee Provident Fund', 'EPF Interest Rate 2026', 'Retirement Savings India'],
  },
  inputs: [
    {
      id: 'basicSalary',
      label: 'Monthly Basic Salary + DA (₹)',
      type: 'range',
      min: 10000,
      max: 500000,
      step: 2000,
      defaultValue: 40000,
      unit: '₹',
    },
    {
      id: 'epfContribution',
      label: 'Employee EPF Share (%)',
      type: 'range',
      min: 12,
      max: 30,
      step: 1,
      defaultValue: 12,
      unit: '%',
    },
    {
      id: 'interestRate',
      label: 'EPF Interest Rate (p.a. %)',
      type: 'range',
      min: 5,
      max: 12,
      step: 0.05,
      defaultValue: 8.25,
      unit: '%',
    },
    {
      id: 'tenure',
      label: 'Working Years Remaining',
      type: 'range',
      min: 1,
      max: 40,
      step: 1,
      defaultValue: 25,
      unit: 'Yr',
    },
    {
      id: 'salaryIncrement',
      label: 'Expected Annual Increment (%)',
      type: 'range',
      min: 0,
      max: 20,
      step: 0.5,
      defaultValue: 6,
      unit: '%',
    },
  ],
  outputs: [
    { id: 'employeeAccumulation', label: 'Employee Contributions', type: 'currency' },
    { id: 'employerAccumulation', label: 'Employer EPF Share', type: 'currency' },
    { id: 'totalInterestEarned', label: 'Total Interest Earned', type: 'currency' },
    { id: 'totalMaturity', label: 'Total EPF Corpus', type: 'currency' },
  ],
  calculate: (inputs) => {
    let monthlyBasic = Number(inputs.basicSalary);
    const employeePct = Number(inputs.epfContribution) / 100;
    const interestRate = Number(inputs.interestRate) / 100;
    const tenure = Number(inputs.tenure);
    const increment = Number(inputs.salaryIncrement) / 100;

    let balance = 0;
    let totalEmployeeContrib = 0;
    let totalEmployerContrib = 0;
    let accumulatedInterest = 0;

    const monthlyInterestRate = interestRate / 12;

    for (let year = 1; year <= tenure; year++) {
      for (let month = 1; month <= 12; month++) {
        // Employee EPF share
        const employeeShare = monthlyBasic * employeePct;
        
        // Employer EPF share: Employer contributes 12% total.
        // EPS pension portion is 8.33% of basic capped at basic of 15,000 (i.e. capped at 1,250).
        // Rest goes to EPF (12% of basic - EPS portion).
        const epsContribution = Math.min(monthlyBasic, 15000) * 0.0833;
        const employerShare = (monthlyBasic * 0.12) - epsContribution;

        totalEmployeeContrib += employeeShare;
        totalEmployerContrib += employerShare;

        const monthlyContribution = employeeShare + employerShare;
        balance += monthlyContribution;

        // Interest is calculated monthly on the closing balance but credited at the end of the year.
        const interestForMonth = balance * monthlyInterestRate;
        accumulatedInterest += interestForMonth;
        balance += interestForMonth;
      }
      // Apply annual salary increment
      monthlyBasic = monthlyBasic * (1 + increment);
    }

    return {
      employeeAccumulation: Math.round(totalEmployeeContrib),
      employerAccumulation: Math.round(totalEmployerContrib),
      totalInterestEarned: Math.round(accumulatedInterest),
      totalMaturity: Math.round(balance),
      chartData: [
        { label: 'Employee Share', value: Math.round(totalEmployeeContrib), color: '#3b82f6' },
        { label: 'Employer Share', value: Math.round(totalEmployerContrib), color: '#10b981' },
        { label: 'Interest Gained', value: Math.round(accumulatedInterest), color: '#fbbf24' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is EPF?',
      answer: 'Employees Provident Fund (EPF) is a government-backed retirement saving scheme in India. It is mandatory for salaried employees working in organizations with 20 or more employees. Both the employee and employer contribute 12% of the basic salary plus dearness allowance monthly.',
    },
    {
      question: 'How is the employer contribution split in EPF?',
      answer: "The employer contributes 12% of basic salary. This is split into two parts: 8.33% goes to the Employees' Pension Scheme (EPS) which is capped at a basic salary of ₹15,000 (i.e. maximum ₹1,250 per month). The remaining 3.67% (plus any excess basic share) goes to the EPF account.",
    },
    {
      question: 'Is EPF interest tax-free?',
      answer: 'Yes, interest earned on EPF is tax-free as long as the total annual employee contribution does not exceed ₹2.5 Lakhs. If it exceeds ₹2.5 Lakhs, interest earned on the excess contribution is taxable as per your tax slab.',
    },
  ],
  formulaDescription: 'EPF calculations compound monthly based on the interest rate declared by the EPFO annually:\n\n- **Employee Contribution** = 12% of (Basic + DA)\n- **Employer Contribution (to EPF)** = 12% of (Basic + DA) - EPS Pension share\n- **EPS Pension share** = 8.33% of Basic (capped at ₹1,250/month)\n- **Interest Credited** = Compounded monthly at the annual interest rate (e.g., 8.25%).',
  relatedSlugs: ['salary-calculator', 'nps-calculator', 'ppf-calculator', 'gratuity-calculator'],
  affiliateCategory: 'investments',
};
