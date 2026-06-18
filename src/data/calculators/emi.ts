import { CalculatorConfig } from '@/types/calculator';

export const emiCalculator: CalculatorConfig = {
  id: 'emi-calculator',
  slug: 'emi-calculator',
  name: 'EMI (Equated Monthly Installment) Calculator',
  shortName: 'EMI Calculator',
  category: 'Loans',
  tagline: 'Calculate your monthly loan payments, total interest, and total amount payable.',
  seo: {
    title: 'EMI Calculator: Calculate Loan EMI Online (Home, Car, Personal) 2026',
    description: 'Calculate Equated Monthly Installments (EMI) for any loan instantly. Break down principal vs interest payments, view interactive amortization schedules, and plan your loan repayment.',
    keywords: ['EMI Calculator', 'Loan EMI Calculator', 'Personal Loan EMI Calculator', 'Amortization Calculator India', 'Calculate EMI Online'],
  },
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount (₹)',
      type: 'range',
      min: 10000,
      max: 100000000,
      step: 10000,
      defaultValue: 2000000,
      unit: '₹',
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (p.a. %)',
      type: 'range',
      min: 5,
      max: 25,
      step: 0.1,
      defaultValue: 9,
      unit: '%',
    },
    {
      id: 'tenure',
      label: 'Loan Tenure (Years)',
      type: 'range',
      min: 1,
      max: 30,
      step: 1,
      defaultValue: 15,
      unit: 'Yr',
    },
  ],
  outputs: [
    { id: 'monthlyEmi', label: 'Monthly EMI', type: 'currency' },
    { id: 'principalAmount', label: 'Principal Loan Amount', type: 'currency' },
    { id: 'totalInterest', label: 'Total Interest Payable', type: 'currency' },
    { id: 'totalPayment', label: 'Total Amount (Principal + Int)', type: 'currency' },
  ],
  calculate: (inputs) => {
    const P = Number(inputs.loanAmount);
    const R = Number(inputs.interestRate);
    const N = Number(inputs.tenure) * 12;

    const r = R / 12 / 100;
    
    // EMI Formula: E = P * r * (1 + r)^n / [ (1 + r)^n - 1 ]
    let emi = 0;
    if (r > 0) {
      emi = P * r * (Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1));
    } else {
      emi = P / N;
    }

    const totalPayment = emi * N;
    const totalInterest = Math.max(0, totalPayment - P);

    // Amortization Schedule (Yearly breakdown)
    const amortizationSchedule = [];
    let balance = P;
    let accumulatedInterest = 0;
    let accumulatedPrincipal = 0;

    for (let month = 1; month <= N; month++) {
      const interestPaid = balance * r;
      const principalPaid = emi - interestPaid;
      balance = Math.max(0, balance - principalPaid);

      accumulatedInterest += interestPaid;
      accumulatedPrincipal += principalPaid;

      // Group by year
      if (month % 12 === 0 || month === N) {
        const yearNum = Math.ceil(month / 12);
        amortizationSchedule.push({
          year: yearNum,
          principalPaid: Math.round(accumulatedPrincipal),
          interestPaid: Math.round(accumulatedInterest),
          balance: Math.round(balance),
        });
        accumulatedInterest = 0;
        accumulatedPrincipal = 0;
      }
    }

    return {
      monthlyEmi: Math.round(emi),
      principalAmount: P,
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      chartData: [
        { label: 'Principal Amount', value: P, color: '#3b82f6' },
        { label: 'Total Interest', value: Math.round(totalInterest), color: '#ef4444' },
      ],
      amortizationSchedule,
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is EMI?',
      answer: 'Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is paid off in full.',
    },
    {
      question: 'How does interest rate affect EMI?',
      answer: 'A higher interest rate increases your monthly EMI and the total interest payable over the tenure of the loan. A lower interest rate reduces both your monthly installment and the total interest cost.',
    },
    {
      question: 'Can I pay off my loan early?',
      answer: 'Yes, most banks and NBFCs in India allow loan prepayment. For floating rate home loans, there are typically no prepayment penalties, whereas fixed-rate loans or personal/car loans might have a pre-closure fee.',
    },
  ],
  formulaDescription: 'The loan EMI formula is:\n\n**EMI = P × r × (1 + r)ⁿ / [ (1 + r)ⁿ - 1 ]**\n\nWhere:\n- **P** is the Principal loan amount\n- **r** is the monthly interest rate (Annual Rate / 12 / 100)\n- **n** is the loan tenure in months (Tenure in years × 12)',
  relatedSlugs: ['home-loan-emi-calculator', 'car-loan-emi-calculator', 'bike-loan-emi-calculator'],
  affiliateCategory: 'loans',
};
