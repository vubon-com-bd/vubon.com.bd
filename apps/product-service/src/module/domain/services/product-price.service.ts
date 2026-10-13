/**
 * ProductPriceService — Real business logic
 * @module product-service/domain/services
 *
 * Business rules:
 *  - BD VAT: 15%
 *  - BD AIT (Advance Income Tax): 5% (BCD only)
 *  - Max discount: 90%
 *  - Price rounding: 2 decimal places (BDT)
 *  - Currency-aware (JPY: 0 decimals)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { CURRENCY } from '@vubon/shared-constants/common';
import { PRICING } from '@vubon/shared-constants/business';

const VAT_RATE = 0.15;
const AIT_RATE = 0.05;
const VAT_EXEMPT_CURRENCIES = new Set<string>([CURRENCY.USD, CURRENCY.EUR, CURRENCY.GBP, CURRENCY.JPY]);

export interface DiscountInput {
  readonly basePrice: number;
  readonly discountPercent: number;
  readonly currency: string;
}

export interface DiscountResult {
  readonly basePrice: number;
  readonly discountAmount: number;
  readonly finalPrice: number;
  readonly discountPercent: number;
  readonly currency: string;
}

export interface TaxInput {
  readonly amount: number;
  readonly currency: string;
  readonly taxInclusive: boolean;
  readonly applyAit?: boolean;
}

export interface TaxBreakdown {
  readonly netAmount: number;
  readonly vat: number;
  readonly ait: number;
  readonly grossAmount: number;
  readonly currency: string;
  readonly vatRate: number;
  readonly aitRate: number;
}

export interface MarginInput {
  readonly costPrice: number;
  readonly sellingPrice: number;
}

export interface MarginResult {
  readonly marginAmount: number;
  readonly marginPercent: number;
  readonly markup: number;
  readonly isHealthy: boolean;
}

export class ProductPriceService {
  /**
   * Discount apply করে final price বের করে।
   */
  static applyDiscount(input: DiscountInput): DiscountResult {
    if (!Number.isFinite(input.basePrice) || input.basePrice < 0) {
      throw new BusinessRuleError(
        'Base price must be a non-negative number',
        'PRICE_INVALID_BASE',
        { basePrice: input.basePrice },
      );
    }
    if (input.discountPercent < 0 || input.discountPercent > PRICING.MAX_DISCOUNT_PERCENT) {
      throw new BusinessRuleError(
        `Discount percent must be 0-${PRICING.MAX_DISCOUNT_PERCENT}`,
        'PRICE_INVALID_DISCOUNT',
        { discountPercent: input.discountPercent },
      );
    }

    const decimals = this.decimals(input.currency);
    const discountAmount = this.round(input.basePrice * (input.discountPercent / 100), decimals);
    const finalPrice = this.round(input.basePrice - discountAmount, decimals);

    return {
      basePrice: this.round(input.basePrice, decimals),
      discountAmount,
      finalPrice,
      discountPercent: input.discountPercent,
      currency: input.currency.toUpperCase(),
    };
  }

  /**
   * BD VAT (15%) + optional AIT (5%) calculation.
   */
  static calculateTax(input: TaxInput): TaxBreakdown {
    if (!Number.isFinite(input.amount) || input.amount < 0) {
      throw new BusinessRuleError(
        'Tax amount must be a non-negative number',
        'PRICE_INVALID_TAX_AMOUNT',
        { amount: input.amount },
      );
    }

    const decimals = this.decimals(input.currency);
    const currency = input.currency.toUpperCase();
    const exempt = VAT_EXEMPT_CURRENCIES.has(currency);

    const vatRate = exempt ? 0 : VAT_RATE;
    const aitRate = exempt || !input.applyAit ? 0 : AIT_RATE;

    let netAmount: number;
    let grossAmount: number;
    let vat: number;
    let ait: number;

    if (input.taxInclusive) {
      grossAmount = this.round(input.amount, decimals);
      netAmount = this.round(grossAmount / (1 + vatRate + aitRate), decimals);
      vat = this.round(netAmount * vatRate, decimals);
      ait = this.round(netAmount * aitRate, decimals);
    } else {
      netAmount = this.round(input.amount, decimals);
      vat = this.round(netAmount * vatRate, decimals);
      ait = this.round(netAmount * aitRate, decimals);
      grossAmount = this.round(netAmount + vat + ait, decimals);
    }

    return { netAmount, vat, ait, grossAmount, currency, vatRate, aitRate };
  }

  /**
   * Cost → Selling margin হিসাব।
   */
  static calculateMargin(input: MarginInput): MarginResult {
    if (input.costPrice < 0 || input.sellingPrice < 0) {
      throw new BusinessRuleError(
        'Cost and selling price must be non-negative',
        'PRICE_INVALID_MARGIN_INPUT',
        { costPrice: input.costPrice, sellingPrice: input.sellingPrice },
      );
    }
    if (input.costPrice === 0) {
      return {
        marginAmount: input.sellingPrice,
        marginPercent: input.sellingPrice > 0 ? 100 : 0,
        markup: 0,
        isHealthy: true,
      };
    }

    const marginAmount = this.round(input.sellingPrice - input.costPrice, 2);
    const marginPercent = this.round((marginAmount / input.costPrice) * 100, 2);
    const markup = this.round((marginAmount / input.sellingPrice) * 100, 2);

    return {
      marginAmount,
      marginPercent,
      markup,
      isHealthy: marginPercent >= 10,
    };
  }

  /**
   * Compare-at price থেকে effective discount percent।
   */
  static effectiveDiscountPercent(compareAtPrice: number, sellingPrice: number): number {
    if (compareAtPrice <= 0 || sellingPrice >= compareAtPrice) return 0;
    return this.round(((compareAtPrice - sellingPrice) / compareAtPrice) * 100, 2);
  }

  private static decimals(currency: string): number {
    return currency.toUpperCase() === CURRENCY.JPY ? 0 : 2;
  }

  private static round(value: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
}
