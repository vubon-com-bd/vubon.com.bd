/**
 * ক্যাম্পেইনের বাজেট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * সমর্থিত মুদ্রাসমূহ
 */
export const BUDGET_CURRENCIES = ['USD', 'BDT', 'EUR', 'GBP'] as const;

/**
 * ডিফল্ট মুদ্রা
 */
export const DEFAULT_CURRENCY = 'BDT' as const;

/**
 * ক্যাম্পেইনের সর্বনিম্ন বাজেট
 */
export const MIN_CAMPAIGN_BUDGET = 100;

/**
 * ক্যাম্পেইনের সর্বোচ্চ বাজেট
 */
export const MAX_CAMPAIGN_BUDGET = 10000000;

/**
 * মুদ্রা টাইপ
 */
export type Currency = (typeof BUDGET_CURRENCIES)[number];

/**
 * মুদ্রার প্রতীক
 */
export const CURRENCY_SYMBOLS = {
  USD: '$',
  BDT: '৳',
  EUR: '€',
  GBP: '£',
} as const satisfies Record<Currency, string>;

/**
 * মুদ্রার নাম (বাংলা এবং ইংরেজি)
 */
export const CURRENCY_NAMES = {
  USD: {
    en: 'US Dollar',
    bn: 'ইউএস ডলার',
  },
  BDT: {
    en: 'Bangladeshi Taka',
    bn: 'বাংলাদেশী টাকা',
  },
  EUR: {
    en: 'Euro',
    bn: 'ইউরো',
  },
  GBP: {
    en: 'British Pound',
    bn: 'ব্রিটিশ পাউন্ড',
  },
} as const satisfies Record<Currency, { en: string; bn: string }>;

/**
 * মুদ্রার এক্সচেঞ্জ রেট (বেস: USD)
 */
export const EXCHANGE_RATES = {
  USD: 1,
  BDT: 110.5,
  EUR: 0.92,
  GBP: 0.79,
} as const satisfies Record<Currency, number>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * বাজেট ব্যবস্থাপনা ইন্টারফেস
 */
export interface BudgetManagement {
  currency: Currency;
  amount: number;
  spent: number;
  remaining: number;
  percentageSpent: number;
}

/**
 * বাজেটের অবস্থা টাইপ
 */
export type BudgetStatus = 'healthy' | 'moderate' | 'critical' | 'exhausted';

/**
 * মুদ্রা বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCurrency(currency: string): currency is Currency {
  return BUDGET_CURRENCIES.includes(currency as Currency);
}

/**
 * মুদ্রার প্রতীক পাওয়ার ফাংশন
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency];
}

/**
 * মুদ্রার নাম পাওয়ার ফাংশন
 */
export function getCurrencyName(currency: Currency, lang: Language = 'en'): string {
  return CURRENCY_NAMES[currency][lang];
}

/**
 * সব মুদ্রার তালিকা পাওয়ার ফাংশন
 */
export function getAllCurrencies(): readonly Currency[] {
  return BUDGET_CURRENCIES;
}

/**
 * ডিফল্ট মুদ্রা পাওয়ার ফাংশন
 */
export function getDefaultCurrency(): Currency {
  return DEFAULT_CURRENCY;
}

/**
 * বাজেট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBudget(amount: number): boolean {
  return (
    typeof amount === 'number' && amount >= MIN_CAMPAIGN_BUDGET && amount <= MAX_CAMPAIGN_BUDGET
  );
}

/**
 * মুদ্রা কনভার্ট করার ফাংশন
 */
export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  const usdAmount = amount / EXCHANGE_RATES[from];
  return Math.round(usdAmount * EXCHANGE_RATES[to] * 100) / 100;
}

/**
 * বাজেট ব্যবস্থাপনা তৈরি করার ফাংশন
 */
export function createBudgetManagement(
  amount: number,
  spent: number = 0,
  currency: Currency = DEFAULT_CURRENCY
): BudgetManagement {
  const remaining = Math.max(0, amount - spent);
  const percentageSpent = amount > 0 ? (spent / amount) * 100 : 0;

  return {
    currency,
    amount,
    spent,
    remaining,
    percentageSpent: Math.min(100, percentageSpent),
  };
}

/**
 * বাজেটের অবস্থা চেক করার ফাংশন
 */
export function getBudgetStatus(budget: BudgetManagement): BudgetStatus {
  if (budget.percentageSpent >= 100) {
    return 'exhausted';
  }
  if (budget.percentageSpent >= 80) {
    return 'critical';
  }
  if (budget.percentageSpent >= 50) {
    return 'moderate';
  }
  return 'healthy';
}

/**
 * বাজেট ফরম্যাট করার ফাংশন
 */
export function formatBudget(amount: number, currency: Currency = DEFAULT_CURRENCY): string {
  const symbol = getCurrencySymbol(currency);
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

/**
 * বাজেটের রঙ পাওয়ার ফাংশন
 */
export function getBudgetColor(budget: BudgetManagement): string {
  const status = getBudgetStatus(budget);
  const colors: Record<BudgetStatus, string> = {
    healthy: 'green',
    moderate: 'blue',
    critical: 'orange',
    exhausted: 'red',
  };
  return colors[status];
}
