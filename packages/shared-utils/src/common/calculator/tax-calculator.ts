/**
 * Calculate Tax
 * ট্যাক্স ক্যালকুলেট করা
 */
export const calculateTax = {
  /**
   * Calculate VAT (Value Added Tax)
   * ভ্যাট ক্যালকুলেট করা
   */
  vat: (amount: number, vatRate: number = 15): { vat: number; total: number } => {
    const vat = (amount * vatRate) / 100;
    return {
      vat: Math.round(vat * 100) / 100,
      total: Math.round((amount + vat) * 100) / 100,
    };
  },

  /**
   * Calculate tax from total
   * মোট থেকে ট্যাক্স ক্যালকুলেট করা
   */
  taxFromTotal: (totalWithTax: number, taxRate: number): { tax: number; base: number } => {
    const base = totalWithTax / (1 + taxRate / 100);
    const tax = totalWithTax - base;
    return {
      tax: Math.round(tax * 100) / 100,
      base: Math.round(base * 100) / 100,
    };
  },

  /**
   * Calculate income tax
   * আয়কর ক্যালকুলেট করা
   */
  incomeTax: (
    income: number,
    taxBrackets: { min: number; max: number | null; rate: number }[]
  ): { tax: number; effectiveRate: number } => {
    let totalTax = 0;
    let remainingIncome = income;

    for (const bracket of taxBrackets) {
      if (remainingIncome <= 0) break;

      const taxableAmount =
        bracket.max !== null
          ? Math.min(remainingIncome, bracket.max - bracket.min)
          : remainingIncome;

      if (taxableAmount > 0) {
        totalTax += (taxableAmount * bracket.rate) / 100;
        remainingIncome -= taxableAmount;
      }
    }

    const effectiveRate = income === 0 ? 0 : (totalTax / income) * 100;

    return {
      tax: Math.round(totalTax * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    };
  },

  /**
   * Calculate corporate tax
   * কর্পোরেট ট্যাক্স ক্যালকুলেট করা
   */
  corporateTax: (
    revenue: number,
    expenses: number,
    taxRate: number = 25
  ): { profit: number; tax: number; netProfit: number } => {
    const profit = revenue - expenses;
    const tax = (profit * taxRate) / 100;
    const netProfit = profit - tax;

    return {
      profit: Math.round(profit * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
    };
  },

  /**
   * Calculate withholding tax
   * উইথহোল্ডিং ট্যাক্স ক্যালকুলেট করা
   */
  withholdingTax: (amount: number, taxRate: number = 10): { tax: number; netAmount: number } => {
    const tax = (amount * taxRate) / 100;
    return {
      tax: Math.round(tax * 100) / 100,
      netAmount: Math.round((amount - tax) * 100) / 100,
    };
  },

  /**
   * Calculate custom duty
   * কাস্টম ডিউটি ক্যালকুলেট করা
   */
  customDuty: (
    productValue: number,
    dutyRate: number = 15,
    vatRate: number = 15,
    advanceTax: number = 5
  ): { duty: number; vat: number; total: number } => {
    const duty = (productValue * dutyRate) / 100;
    const vat = ((productValue + duty) * vatRate) / 100;
    const tax = ((productValue + duty + vat) * advanceTax) / 100;
    const total = productValue + duty + vat + tax;

    return {
      duty: Math.round(duty * 100) / 100,
      vat: Math.round(vat * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  },
};
