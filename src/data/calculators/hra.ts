import { CalculatorConfig } from '@/types/calculator';

export const hraCalculator: CalculatorConfig = {
  id: 'hra-calculator',
  slug: 'hra-calculator',
  name: 'HRA (House Rent Allowance) Tax Calculator',
  shortName: 'HRA Calculator',
  category: 'Taxation',
  tagline: 'Calculate your tax-exempt and taxable House Rent Allowance (HRA) in minutes.',
  seo: {
    title: 'HRA Calculator: Calculate House Rent Allowance Tax Exemption 2026',
    description: 'Calculate your HRA tax exemption online instantly. Compare rent paid, basic salary, city location, and find out exactly how much tax you can save.',
    keywords: ['HRA Calculator', 'House Rent Allowance Exemption', 'Calculate HRA Tax Exemption', 'Rent Tax Exemption Formula', 'Section 10(13A) Exemption'],
  },
  inputs: [
    {
      id: 'basicSalary',
      label: 'Monthly Basic Salary (₹)',
      type: 'range',
      min: 5000,
      max: 500000,
      step: 1000,
      defaultValue: 50000,
      unit: '₹',
    },
    {
      id: 'da',
      label: 'Monthly Dearness Allowance (DA) (₹)',
      type: 'range',
      min: 0,
      max: 200000,
      step: 1000,
      defaultValue: 0,
      unit: '₹',
    },
    {
      id: 'hraReceived',
      label: 'Monthly HRA Received (₹)',
      type: 'range',
      min: 2000,
      max: 200000,
      step: 500,
      defaultValue: 20000,
      unit: '₹',
    },
    {
      id: 'rentPaid',
      label: 'Monthly Rent Paid (₹)',
      type: 'range',
      min: 2000,
      max: 200000,
      step: 500,
      defaultValue: 15000,
      unit: '₹',
    },
    {
      id: 'metroCity',
      label: 'Residing in a Metro City (Delhi, Mumbai, Kolkata, Chennai)?',
      type: 'select',
      defaultValue: 'yes',
      options: [
        { label: 'Yes (50% Basic Salary limit)', value: 'yes' },
        { label: 'No (40% Basic Salary limit)', value: 'no' },
      ],
    },
  ],
  outputs: [
    { id: 'totalHraReceived', label: 'Annual HRA Received', type: 'currency' },
    { id: 'exemptHra', label: 'Annual Tax-Exempt HRA', type: 'currency' },
    { id: 'taxableHra', label: 'Annual Taxable HRA', type: 'currency' },
  ],
  calculate: (inputs) => {
    const basic = Number(inputs.basicSalary);
    const da = Number(inputs.da);
    const hraReceived = Number(inputs.hraReceived);
    const rentPaid = Number(inputs.rentPaid);
    const isMetro = inputs.metroCity === 'yes';

    const salary = basic + da; // For HRA purposes, salary = Basic + DA

    // Annual figures
    const annualHraReceived = hraReceived * 12;
    const annualRentPaid = rentPaid * 12;
    const annualSalary = salary * 12;

    // Standard 3 conditions under Section 10(13A):
    // 1. Actual HRA received
    const cond1 = annualHraReceived;
    // 2. Rent paid minus 10% of salary
    const cond2 = Math.max(0, annualRentPaid - (0.10 * annualSalary));
    // 3. 50% of salary for metro, else 40%
    const cond3 = isMetro ? (0.50 * annualSalary) : (0.40 * annualSalary);

    // Exempt amount is the minimum of the three
    const exemptHra = Math.min(cond1, cond2, cond3);
    const taxableHra = Math.max(0, annualHraReceived - exemptHra);

    return {
      totalHraReceived: annualHraReceived,
      exemptHra: Math.round(exemptHra),
      taxableHra: Math.round(taxableHra),
      chartData: [
        { label: 'Tax-Exempt HRA', value: Math.round(exemptHra), color: '#10b981' },
        { label: 'Taxable HRA', value: Math.round(taxableHra), color: '#ef4444' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is HRA Tax Exemption?',
      answer: 'House Rent Allowance (HRA) is paid by employers to help salaried individuals cover their rental accommodation expenses. Under Section 10(13A) of the Income Tax Act, a portion of the HRA you receive can be claimed as a tax exemption if you live in rented housing.',
    },
    {
      question: 'What documents are required to claim HRA?',
      answer: 'To claim HRA tax exemption, you must submit rent receipts or a rent agreement to your employer. If the total rent paid exceeds ₹1,00,000 annually, you must also provide the PAN of your landlord.',
    },
    {
      question: 'Can I claim HRA if I live in my own house?',
      answer: 'No, HRA tax exemption is only available if you reside in a rented house and pay rent. If you live in your own house, the entire HRA amount received from your employer is fully taxable.',
    },
  ],
  formulaDescription: 'HRA Tax Exemption is calculated as the **minimum** of three amounts:\n\n1. **Actual HRA** received from employer\n2. **Rent Paid** minus 10% of Salary (Basic + DA)\n3. **50% of Salary** (if residing in a metro city) or **40%** (non-metro)\n\n*Note: Salary for HRA calculation consists of Basic Salary + Dearness Allowance (DA).*',
  relatedSlugs: ['income-tax-calculator', 'salary-calculator', 'gst-calculator'],
  affiliateCategory: 'tax',
};
