/**
 * PriceCalculator Domain Service
 * @module product-service/domain/services
 *
 * Calculates final price combining base price, discount, tax, and tiers.
 * Uses PriceVO from primitives to avoid Money type ambiguity.
 */
import { ProductPricingEntity } from '../entities/product-pricing.entity.js';

export interface PriceQuote {
  readonly unitPrice: number;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly total: number;
  readonly currency: string;
}

/**
 * Tier input — intentionally decoupled from Money.
 * Callers pass plain numbers.
 */
export interface PriceTierInput {
  readonly minQuantity: number;
  readonly maxQuantity?: number;
  readonly unitPrice: number;
  readonly discountPercent?: number;
}

export class PriceCalculatorService {
  /**
   * Compute a price quote for a given quantity.
   */
  quote(
    pricing: ProductPricingEntity,
    quantity: number,
    tiers?: readonly PriceTierInput[],
  ): PriceQuote {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    const currency = pricing.sellingPrice.currency;
    let unitPrice = pricing.sellingPrice.amount;

    // Apply tier pricing if provided
    if (tiers && tiers.length > 0) {
      const matched = [...tiers]
        .sort((a, b) => b.minQuantity - a.minQuantity)
        .find((t) => quantity >= t.minQuantity);
      if (matched) unitPrice = matched.unitPrice;
    }

    const subtotal = this.round(unitPrice * quantity);
    const baseTotal = this.round(pricing.basePrice.amount * quantity);
    const discountAmount = Math.max(0, this.round(baseTotal - subtotal));

    const taxAmount = pricing.taxInclusive
      ? 0
      : this.round(subtotal * pricing.taxRate.value);

    const total = this.round(subtotal + taxAmount);

    return {
      unitPrice,
      subtotal,
      discountAmount,
      taxAmount,
      total,
      currency,
    };
  }

  /**
   * Compute a discount percent from base vs selling prices.
   */
  calculateDiscountPercent(basePrice: number, sellingPrice: number): number {
    if (basePrice <= 0) return 0;
    if (sellingPrice >= basePrice) return 0;
    const diff = basePrice - sellingPrice;
    return Math.round((diff / basePrice) * 100);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
