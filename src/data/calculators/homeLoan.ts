import { CalculatorConfig } from '@/types/calculator';
import { emiCalculator } from './emi';

export const homeLoanCalculator: CalculatorConfig = {
  ...emiCalculator,
  id: 'home-loan-emi-calculator',
  slug: 'home-loan-emi-calculator',
  name: 'Home Loan EMI Calculator',
  shortName: 'Home Loan EMI',
  tagline: 'Estimate your home loan monthly installments, total interest, and property purchase feasibility.',
  seo: {
    title: 'Home Loan EMI Calculator: Estimate Home Loan Monthly Installments 2026',
    description: 'Calculate your Home Loan EMI online instantly. Adjust interest rates and tenure, check the year-by-year amortization schedule, and apply for the best bank rates.',
    keywords: ['Home Loan EMI Calculator', 'Housing Loan EMI Calculator', 'Calculate Home Loan EMI', 'Home Loan Amortization Schedule', 'SBI Home Loan EMI'],
  },
  inputs: [
    {
      id: 'loanAmount',
      label: 'Home Loan Amount (₹)',
      type: 'range',
      min: 500000,
      max: 100000000,
      step: 100000,
      defaultValue: 5000000,
      unit: '₹',
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (p.a. %)',
      type: 'range',
      min: 5,
      max: 15,
      step: 0.05,
      defaultValue: 8.5,
      unit: '%',
    },
    {
      id: 'tenure',
      label: 'Loan Tenure (Years)',
      type: 'range',
      min: 1,
      max: 30,
      step: 1,
      defaultValue: 20,
      unit: 'Yr',
    },
  ],
  relatedSlugs: ['emi-calculator', 'car-loan-emi-calculator', 'hra-calculator'],
  affiliateCategory: 'loans',
};
