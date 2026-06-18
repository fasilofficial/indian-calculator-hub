import { CalculatorConfig } from '@/types/calculator';
import { getCurrentYear, getCurrentFinancialYear, getAssessmentYear } from '@/utils/date';
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

// Helper to make year/date details dynamic across config files
function makeConfigDynamic(config: CalculatorConfig): CalculatorConfig {
  const currentYear = getCurrentYear();
  const nextYear = currentYear + 1;
  const fyString = getCurrentFinancialYear();
  const ayString = getAssessmentYear();

  const replacePlaceholder = (text: string): string => {
    if (!text) return text;
    return text
      .replace(/2026-27/g, fyString)
      .replace(/2027-28/g, ayString)
      .replace(/2026/g, currentYear.toString())
      .replace(/2027/g, nextYear.toString());
  };

  return {
    ...config,
    seo: {
      title: replacePlaceholder(config.seo.title),
      description: replacePlaceholder(config.seo.description),
      keywords: config.seo.keywords.map(replacePlaceholder),
    },
    tagline: replacePlaceholder(config.tagline),
    formulaDescription: replacePlaceholder(config.formulaDescription),
    faqs: config.faqs.map((faq) => ({
      question: replacePlaceholder(faq.question),
      answer: replacePlaceholder(faq.answer),
    })),
  };
}

export const CALCULATORS: Record<string, CalculatorConfig> = {
  'sip-calculator': makeConfigDynamic(sipCalculator),
  'emi-calculator': makeConfigDynamic(emiCalculator),
  'gst-calculator': makeConfigDynamic(gstCalculator),
  'income-tax-calculator': makeConfigDynamic(incomeTaxCalculator),
  'pf-calculator': makeConfigDynamic(pfCalculator),
  'home-loan-emi-calculator': makeConfigDynamic(homeLoanCalculator),
  'car-loan-emi-calculator': makeConfigDynamic(carLoanCalculator),
  'bike-loan-emi-calculator': makeConfigDynamic(bikeLoanCalculator),
  'salary-calculator': makeConfigDynamic(salaryCalculator),
  'compound-interest-calculator': makeConfigDynamic(compoundInterestCalculator),
  'fd-calculator': makeConfigDynamic(fdCalculator),
  'rd-calculator': makeConfigDynamic(rdCalculator),
  'ppf-calculator': makeConfigDynamic(ppfCalculator),
  'nps-calculator': makeConfigDynamic(npsCalculator),
  'gratuity-calculator': makeConfigDynamic(gratuityCalculator),
  'hra-calculator': makeConfigDynamic(hraCalculator),
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
