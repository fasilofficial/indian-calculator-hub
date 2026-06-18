import { CalculatorConfig } from '@/types/calculator';
import { emiCalculator } from './emi';

export const carLoanCalculator: CalculatorConfig = {
  ...emiCalculator,
  id: 'car-loan-emi-calculator',
  slug: 'car-loan-emi-calculator',
  name: 'Car Loan EMI Calculator',
  shortName: 'Car Loan EMI',
  tagline: 'Calculate your car loan monthly payments, down payment adjustments, and total interest.',
  seo: {
    title: 'Car Loan EMI Calculator: Calculate Auto Loan EMIs Online 2026',
    description: 'Use our free interactive Car Loan EMI calculator to check your monthly EMI, total interest, and plan your vehicle purchase budget.',
    keywords: ['Car Loan EMI Calculator', 'Auto Loan Calculator India', 'Calculate Vehicle Loan EMI', 'SBI Car Loan EMI', 'New Car Loan Calculator'],
  },
  inputs: [
    {
      id: 'loanAmount',
      label: 'Car Loan Amount (₹)',
      type: 'range',
      min: 100000,
      max: 15000000,
      step: 50000,
      defaultValue: 800000,
      unit: '₹',
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (p.a. %)',
      type: 'range',
      min: 5,
      max: 20,
      step: 0.1,
      defaultValue: 9.5,
      unit: '%',
    },
    {
      id: 'tenure',
      label: 'Loan Tenure (Years)',
      type: 'range',
      min: 1,
      max: 7,
      step: 1,
      defaultValue: 5,
      unit: 'Yr',
    },
  ],
  relatedSlugs: ['emi-calculator', 'bike-loan-emi-calculator', 'home-loan-emi-calculator'],
  affiliateCategory: 'loans',
};
