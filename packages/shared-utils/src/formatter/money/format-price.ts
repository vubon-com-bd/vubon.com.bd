/**
 * Format price with optional discount badge
 * @module shared-utils/formatter/money
 */
import { formatCurrency } from './format-currency';

export interface FormatPriceOptions {
  readonly currency?: string;
  readonly locale?: string;
  readonly compareAtPrice?: number;
  readonly showDiscount?: boolean;
}

export interface FormattedPrice {
  readonly price: string;
  readonly compareAt?: string;
  readonly discountPercent?: number;
}

export function formatPrice(amount: number, options: FormatPriceOptions = {}): FormattedPrice {
  const price = formatCurrency(amount, {
    currency: options.currency,
    locale: options.locale,
  });

  if (options.compareAtPrice === undefined || options.compareAtPrice <= amount || amount <= 0) {
    return { price };
  }

  const compareAt = formatCurrency(options.compareAtPrice, {
    currency: options.currency,
    locale: options.locale,
  });

  const discountPercent = options.showDiscount
    ? Math.round(((options.compareAtPrice - amount) / options.compareAtPrice) * 100)
    : undefined;

  return { price, compareAt, discountPercent };
}
