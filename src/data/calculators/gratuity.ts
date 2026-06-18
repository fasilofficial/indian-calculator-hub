import { CalculatorConfig } from '@/types/calculator';

export const gratuityCalculator: CalculatorConfig = {
  id: 'gratuity-calculator',
  slug: 'gratuity-calculator',
  name: 'Gratuity Calculator',
  shortName: 'Gratuity Calculator',
  category: 'Salary',
  tagline: 'Calculate the gratuity amount payable to you by your employer upon resignation or retirement.',
  seo: {
    title: 'Gratuity Calculator: Calculate Gratuity Online (Payment of Gratuity Act) 2026',
    description: 'Calculate your gratuity online instantly. Learn about eligibility criteria, tax exemptions, and formulas defined by the Payment of Gratuity Act, 1972.',
    keywords: ['Gratuity Calculator', 'Calculate Gratuity Online', 'Gratuity Formula', 'Payment of Gratuity Act', 'Gratuity Tax Exemption'],
  },
  inputs: [
    {
      id: 'monthlySalary',
      label: 'Last Drawn Salary (Basic + DA) (₹)',
      type: 'number',
      defaultValue: 80000,
      unit: '₹',
    },
    {
      id: 'yearsOfService',
      label: 'Years of Service (Min 5 Years)',
      type: 'range',
      min: 5,
      max: 50,
      step: 1,
      defaultValue: 7,
      unit: 'Yr',
    },
  ],
  outputs: [
    { id: 'salaryVal', label: 'Last Drawn Basic Salary + DA (Monthly)', type: 'currency' },
    { id: 'yearsOfServiceVal', label: 'Total Years of Service', type: 'years' },
    { id: 'gratuityAmount', label: 'Total Gratuity Amount Payable', type: 'currency' },
  ],
  calculate: (inputs) => {
    const salary = Number(inputs.monthlySalary);
    const years = Number(inputs.yearsOfService);

    // Gratuity Formula: (15 / 26) * Last Drawn Salary * Years of Service
    // Gratuity is capped at ₹20,00,000 under current laws.
    const gratuity = (15 / 26) * salary * years;
    const cappedGratuity = Math.min(2000000, gratuity);

    return {
      salaryVal: salary,
      yearsOfServiceVal: `${years} Years`,
      gratuityAmount: Math.round(cappedGratuity),
      chartData: [
        { label: 'Gratuity Amount', value: Math.round(cappedGratuity), color: '#3b82f6' },
      ],
    };
  },
  chartType: 'none',
  faqs: [
    {
      question: 'What is gratuity?',
      answer: 'Gratuity is a monetary reward given by an employer to an employee for services rendered to the company. It is usually paid at the time of retirement, resignation, or termination, provided the employee has completed at least 5 years of continuous service.',
    },
    {
      question: 'What is the eligibility for gratuity?',
      answer: 'Under the Payment of Gratuity Act, 1972, an employee is eligible to receive gratuity if they have completed a minimum of 5 years of continuous service with the same employer. However, this 5-year rule is waived in case of the employee\'s death or disablement due to an accident or disease.',
    },
    {
      question: 'How is gratuity taxed in India?',
      answer: 'For government employees, gratuity is fully exempt from tax. For private-sector employees covered under the Gratuity Act, tax exemption is limited to the minimum of: 1. Actual gratuity received. 2. Eligible gratuity according to the formula. 3. Statutory cap of ₹20 Lakhs.',
    },
  ],
  formulaDescription: 'For employees covered under the Payment of Gratuity Act, 1972, the formula is:\n\n**Gratuity = (15 / 26) × Last Drawn monthly salary × Years of service**\n\nWhere:\n- **Last Drawn salary** includes Basic Salary + Dearness Allowance (DA).\n- **15/26** represents 15 days out of 26 working days in a month.\n- The maximum gratuity tax exemption is capped at **₹20 Lakhs**.',
  relatedSlugs: ['salary-calculator', 'pf-calculator', 'nps-calculator'],
  affiliateCategory: 'salary',
};
