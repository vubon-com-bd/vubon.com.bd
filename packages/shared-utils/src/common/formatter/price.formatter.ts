import { CURRENCY, CURRENCY_DETAILS } from '@vubon/shared-constants';

/**
 * Format Price
 * মূল্য ফরম্যাট করা
 */
export const formatPrice = (amount: number, currency: keyof typeof CURRENCY = 'BDT'): string => {
  const currencyDetails = CURRENCY_DETAILS[currency];

  const formatted = new Intl.NumberFormat(currency === 'BDT' ? 'bn-BD' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currencyDetails.decimalPlaces,
    maximumFractionDigits: currencyDetails.decimalPlaces,
  }).format(amount);

  return formatted;
};

/**
 * Format Price with Discount
 * ডিসকাউন্ট সহ মূল্য ফরম্যাট করা
 */
export const formatPriceWithDiscount = (
  originalPrice: number,
  discountedPrice: number,
  currency: keyof typeof CURRENCY = 'BDT'
): string => {
  const discounted = formatPrice(discountedPrice, currency);
  const savings = originalPrice - discountedPrice;
  const savingsPercent = ((savings / originalPrice) * 100).toFixed(0);

  return `${discounted} (Save ${formatPrice(savings, currency)} / ${savingsPercent}%)`;
};

/**
 * Format Price Range
 * মূল্য রেঞ্জ ফরম্যাট করা
 */
export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  currency: keyof typeof CURRENCY = 'BDT'
): string => {
  const min = formatPrice(minPrice, currency);
  const max = formatPrice(maxPrice, currency);

  if (minPrice === maxPrice) {
    return min;
  }

  return `${min} - ${max}`;
};

/**
 * Format Unit Price
 * ইউনিট মূল্য ফরম্যাট করা
 */
export const formatUnitPrice = (
  price: number,
  unit: string,
  currency: keyof typeof CURRENCY = 'BDT'
): string => {
  const formattedPrice = formatPrice(price, currency);
  return `${formattedPrice} / ${unit}`;
};
