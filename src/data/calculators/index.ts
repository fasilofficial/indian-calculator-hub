import { CalculatorConfig } from '@/types/calculator';
import { sipCalculator } from './sip';
import { emiCalculator } from './emi';
import { gstCalculator } from './gst';
import { incomeTaxCalculator } from './incomeTax';
import { pfCalculator } from './pf';
import { homeLoanCalculator } from './homeLoan';
import { carLoanCalculator } from './carLoan';
import { bikeLoanCalculator } from './bikeLoan';
import { salaryCalculator } from './salary';
import { compoundInterestCalculator } from './compoundInterest';
import { fdCalculator } from './fd';
import { rdCalculator } from './rd';
import { ppfCalculator } from './ppf';
import { npsCalculator } from './nps';
import { gratuityCalculator } from './gratuity';
import { hraCalculator } from './hra';

export const CALCULATORS: Record<string, CalculatorConfig> = {
  'sip-calculator': sipCalculator,
  'emi-calculator': emiCalculator,
  'gst-calculator': gstCalculator,
  'income-tax-calculator': incomeTaxCalculator,
  'pf-calculator': pfCalculator,
  'home-loan-emi-calculator': homeLoanCalculator,
  'car-loan-emi-calculator': carLoanCalculator,
  'bike-loan-emi-calculator': bikeLoanCalculator,
  'salary-calculator': salaryCalculator,
  'compound-interest-calculator': compoundInterestCalculator,
  'fd-calculator': fdCalculator,
  'rd-calculator': rdCalculator,
  'ppf-calculator': ppfCalculator,
  'nps-calculator': npsCalculator,
  'gratuity-calculator': gratuityCalculator,
  'hra-calculator': hraCalculator,
};

export const CALCULATOR_LIST: CalculatorConfig[] = Object.values(CALCULATORS);

export const CATEGORIES = [
  'All',
  'Investments',
  'Loans',
  'Taxation',
  'Salary',
  'Retirement',
  'Savings',
] as const;

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return CALCULATORS[slug];
}

export function getRelatedCalculators(calculator: CalculatorConfig, limit = 3): CalculatorConfig[] {
  return calculator.relatedSlugs
    .map((slug) => CALCULATORS[slug])
    .filter((calc): calc is CalculatorConfig => !!calc)
    .slice(0, limit);
}
