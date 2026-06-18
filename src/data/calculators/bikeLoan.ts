import { CalculatorConfig } from '@/types/calculator';
import { emiCalculator } from './emi';

export const bikeLoanCalculator: CalculatorConfig = {
  ...emiCalculator,
  id: 'bike-loan-emi-calculator',
  slug: 'bike-loan-emi-calculator',
  name: 'Bike/Two-Wheeler Loan EMI Calculator',
  shortName: 'Bike Loan EMI',
  tagline: 'Calculate Equated Monthly Installments for your two-wheeler or sports bike purchase.',
  seo: {
    title: 'Two-Wheeler / Bike Loan EMI Calculator Online 2026',
    description: 'Calculate your two-wheeler and bike loan EMIs online instantly. Optimize interest rates, tenure, down payment, and select the best financing option.',
    keywords: ['Bike Loan EMI Calculator', 'Two Wheeler Loan Calculator', 'Calculate Bike EMI', 'Bike Finance Calculator India', 'Second Hand Bike Loan'],
  },
  inputs: [
    {
      id: 'loanAmount',
      label: 'Bike Loan Amount (₹)',
      type: 'range',
      min: 20000,
      max: 1000000,
      step: 5000,
      defaultValue: 100000,
      unit: '₹',
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (p.a. %)',
      type: 'range',
      min: 6,
      max: 24,
      step: 0.1,
      defaultValue: 12,
      unit: '%',
    },
    {
      id: 'tenure',
      label: 'Loan Tenure (Years)',
      type: 'range',
      min: 1,
      max: 5,
      step: 1,
      defaultValue: 3,
      unit: 'Yr',
    },
  ],
  relatedSlugs: ['emi-calculator', 'car-loan-emi-calculator', 'home-loan-emi-calculator'],
  affiliateCategory: 'loans',
};
