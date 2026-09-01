/**
 * Calculate Discount
 * ডিসকাউন্ট ক্যালকুলেট করা
 */
export const calculateDiscount = (price: number, discountPercent: number): number => {
  const discountAmount = (price * discountPercent) / 100;
  return price - discountAmount;
};

/**
 * Calculate Discount Amount
 * ডিসকাউন্টের পরিমাণ ক্যালকুলেট করা
 */
export const calculateDiscountAmount = (price: number, discountPercent: number): number => {
  return (price * discountPercent) / 100;
};

/**
 * Calculate Tax
 * ট্যাক্স ক্যালকুলেট করা
 */
export const calculateTax = (amount: number, taxRate: number): number => {
  return (amount * taxRate) / 100;
};

/**
 * Calculate VAT (Value Added Tax)
 * ভ্যাট ক্যালকুলেট করা
 */
export const calculateVAT = (amount: number, vatRate: number = 15): number => {
  return (amount * vatRate) / 100;
};

/**
 * Calculate Shipping
 * শিপিং খরচ ক্যালকুলেট করা
 */
export const calculateShipping = (weight: number, country: string = 'BD'): number => {
  // Base shipping rates (in BDT)
  const rates: Record<string, number> = {
    BD: 120,
    IN: 500,
    US: 2000,
    UK: 1800,
    AE: 1500,
  };

  const baseRate = rates[country] || 1000;
  const weightCharge = weight * 50; // 50 BDT per kg

  return baseRate + weightCharge;
};

/**
 * Calculate Profit Margin
 * লাভের মার্জিন ক্যালকুলেট করা
 */
export const calculateProfitMargin = (costPrice: number, sellingPrice: number): number => {
  if (costPrice === 0) return 0;
  return ((sellingPrice - costPrice) / costPrice) * 100;
};

/**
 * Calculate Markup
 * মার্কআপ ক্যালকুলেট করা
 */
export const calculateMarkup = (costPrice: number, markupPercent: number): number => {
  return costPrice * (1 + markupPercent / 100);
};

/**
 * Calculate Installment
 * কিস্তি ক্যালকুলেট করা
 */
export const calculateInstallment = (
  totalAmount: number,
  months: number,
  interestRate: number = 0
): number => {
  if (months === 0) return totalAmount;
  const interest = (totalAmount * interestRate * months) / 100;
  const totalWithInterest = totalAmount + interest;
  return totalWithInterest / months;
};

/**
 * Calculate Percentage
 * শতাংশ ক্যালকুলেট করা
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Calculate Average
 * গড় ক্যালকুলেট করা
 */
export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

/**
 * Calculate Commission
 * কমিশন ক্যালকুলেট করা
 */
export const calculateCommission = (amount: number, commissionRate: number): number => {
  return (amount * commissionRate) / 100;
};

/**
 * Calculate Net Price
 * নেট মূল্য ক্যালকুলেট করা
 */
export const calculateNetPrice = (
  price: number,
  discountPercent: number,
  taxPercent: number
): number => {
  const afterDiscount = calculateDiscount(price, discountPercent);
  const tax = calculateTax(afterDiscount, taxPercent);
  return afterDiscount + tax;
};

/**
 * Calculate EMI (Equated Monthly Installment)
 * ইএমআই ক্যালকুলেট করা
 */
export const calculateEMI = (principal: number, rate: number, months: number): number => {
  if (months === 0) return principal;
  const monthlyRate = rate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return parseFloat(emi.toFixed(2));
};
