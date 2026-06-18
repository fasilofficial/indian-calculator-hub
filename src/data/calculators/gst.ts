import { CalculatorConfig } from '@/types/calculator';

export const gstCalculator: CalculatorConfig = {
  id: 'gst-calculator',
  slug: 'gst-calculator',
  name: 'GST (Goods and Services Tax) Calculator',
  shortName: 'GST Calculator',
  category: 'Taxation',
  tagline: 'Calculate Central GST (CGST), State GST (SGST), and total cost of goods/services.',
  seo: {
    title: 'GST Calculator Online: Calculate CGST & SGST India 2026',
    description: 'Use our free Indian GST calculator online to quickly calculate net price, gross price, and CGST/SGST breakdowns. Supports tax rates: 5%, 12%, 18%, and 28%.',
    keywords: ['GST Calculator', 'Indian GST Calculator', 'CGST SGST Calculator', 'Tax Calculator India', 'Calculate GST online'],
  },
  inputs: [
    {
      id: 'amount',
      label: 'Initial Amount (₹)',
      type: 'number',
      defaultValue: 10000,
      unit: '₹',
    },
    {
      id: 'rate',
      label: 'GST Rate (%)',
      type: 'select',
      defaultValue: 18,
      options: [
        { label: '5% (Standard)', value: 5 },
        { label: '12% (Standard)', value: 12 },
        { label: '18% (Standard)', value: 18 },
        { label: '28% (Luxury/Demerit)', value: 28 },
      ],
    },
    {
      id: 'type',
      label: 'Calculation Type',
      type: 'select',
      defaultValue: 'add',
      options: [
        { label: 'Add GST (Inclusive of Tax)', value: 'add' },
        { label: 'Remove GST (Exclusive of Tax)', value: 'remove' },
      ],
    },
  ],
  outputs: [
    { id: 'originalAmount', label: 'Base Amount (Excl. Tax)', type: 'currency' },
    { id: 'cgst', label: 'Central GST (CGST)', type: 'currency' },
    { id: 'sgst', label: 'State GST (SGST)', type: 'currency' },
    { id: 'totalGst', label: 'Total GST (CGST + SGST)', type: 'currency' },
    { id: 'totalAmount', label: 'Total Amount (Incl. Tax)', type: 'currency' },
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount);
    const rate = Number(inputs.rate);
    const isAdd = inputs.type === 'add';

    let originalAmount = 0;
    let totalGst = 0;
    let totalAmount = 0;

    if (isAdd) {
      originalAmount = amount;
      totalGst = amount * (rate / 100);
      totalAmount = amount + totalGst;
    } else {
      totalAmount = amount;
      originalAmount = amount / (1 + rate / 100);
      totalGst = amount - originalAmount;
    }

    const cgst = totalGst / 2;
    const sgst = totalGst / 2;

    return {
      originalAmount: Math.round(originalAmount),
      cgst: Math.round(cgst),
      sgst: Math.round(sgst),
      totalGst: Math.round(totalGst),
      totalAmount: Math.round(totalAmount),
      chartData: [
        { label: 'Base Amount', value: Math.round(originalAmount), color: '#3b82f6' },
        { label: 'CGST', value: Math.round(cgst), color: '#fbbf24' },
        { label: 'SGST', value: Math.round(sgst), color: '#f59e0b' },
      ],
    };
  },
  chartType: 'donut',
  faqs: [
    {
      question: 'What is GST in India?',
      answer: 'Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. It is a comprehensive, multi-stage, destination-based tax that replaced many indirect taxes like VAT, Service Tax, and Excise Duty.',
    },
    {
      question: 'What is the difference between CGST and SGST?',
      answer: 'For intra-state transactions (sales within the same state), GST is split equally into two parts: Central GST (CGST), which goes to the Central Government, and State GST (SGST), which goes to the State Government. If it is an inter-state sale, Integrated GST (IGST) is charged instead.',
    },
    {
      question: 'How do I add and remove GST using the formula?',
      answer: 'To add GST: Total = Cost * (1 + GST%/100). To remove GST: Original Cost = Total / (1 + GST%/100). GST Amount = Total - Original Cost.',
    },
  ],
  formulaDescription: 'The GST formulas are:\n\n**To Add GST (Inclusive of Tax):**\n- **GST Amount** = Base Price × (GST% / 100)\n- **Total Price** = Base Price + GST Amount\n\n**To Remove GST (Exclusive of Tax):**\n- **Base Price** = Total Price / (1 + GST% / 100)\n- **GST Amount** = Total Price - Base Price\n\n*Note: CGST and SGST are exactly 50% each of the Total GST Amount for transactions within a State.*',
  relatedSlugs: ['income-tax-calculator', 'salary-calculator', 'hra-calculator'],
  affiliateCategory: 'tax',
};
