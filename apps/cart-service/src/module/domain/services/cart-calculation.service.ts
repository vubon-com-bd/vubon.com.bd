/**
 * CartCalculationService — Cart totals calculation
 * @module cart-service/domain/services
 *
 * Business rules:
 *  - Subtotal = sum(unitPrice × quantity) for purchasable items
 *  - Discount applied on subtotal (via coupon/voucher)
 *  - Tax applied on (subtotal - discount) using BD VAT (default 15%)
 *  - Shipping added, can be free above threshold
 *  - Total = subtotal - discount + tax + shipping
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CartCalculationLineInput {
  readonly unitPrice: number;
  readonly quantity: number;
  readonly isPurchasable: boolean;
}

export interface CartCalculationInput {
  readonly items: readonly CartItemEntity[];
  readonly discountAmount: number;
  readonly taxRate: number; // % (e.g. 15)
  readonly shippingCost: number;
  readonly freeShippingAbove?: number;
  readonly taxInclusive?: boolean;
}

export interface CartCalculationBreakdown {
  readonly subtotal: number;
  readonly discount: number;
  readonly taxableBase: number;
  readonly tax: number;
  readonly shipping: number;
  readonly total: number;
  readonly currency: string;
  readonly itemCount: number;
}

export class CartCalculationService {
  private static readonly MAX_TAX_RATE = 100;
  private static readonly MAX_DISCOUNT_RATIO = 1;

  static calculate(input: CartCalculationInput): CartCalculationBreakdown {
    const { items, taxRate, taxInclusive = false } = input;

    if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > this.MAX_TAX_RATE) {
      throw new ValidationError(
        `Tax rate must be between 0 and ${this.MAX_TAX_RATE}`,
        'taxRate',
      );
    }
    if (!Number.isFinite(input.discountAmount) || input.discountAmount < 0) {
      throw new ValidationError('discountAmount must be non-negative', 'discountAmount');
    }
    if (!Number.isFinite(input.shippingCost) || input.shippingCost < 0) {
      throw new ValidationError('shippingCost must be non-negative', 'shippingCost');
    }
    if (
      input.freeShippingAbove !== undefined &&
      (!Number.isFinite(input.freeShippingAbove) || input.freeShippingAbove < 0)
    ) {
      throw new ValidationError(
        'freeShippingAbove must be non-negative',
        'freeShippingAbove',
      );
    }

    // ── Subtotal ─────────────────────────────
    const subtotal = this.computeSubtotal(items);

    // ── Discount (clamp) ────────────────────
    const discount = Math.min(input.discountAmount, subtotal);

    // ── Taxable base ────────────────────────
    const taxableBase = this.round2(subtotal - discount);

    // ── Tax ─────────────────────────────────
    const tax = taxInclusive
      ? this.extractInclusiveTax(taxableBase, taxRate)
      : this.computeTax(taxableBase, taxRate);

    // ── Shipping ────────────────────────────
    const shipping = this.effectiveShipping(
      subtotal,
      input.shippingCost,
      input.freeShippingAbove,
    );

    // ── Total ───────────────────────────────
    const total = taxInclusive
      ? this.round2(taxableBase + shipping)
      : this.round2(taxableBase + tax + shipping);

    if (total < 0) {
      throw new BusinessRuleError(
        'Calculated total cannot be negative',
        'NEGATIVE_CART_TOTAL',
        { total },
      );
    }

    return {
      subtotal,
      discount,
      taxableBase,
      tax,
      shipping,
      total,
      currency: items[0]?.currency ?? 'BDT',
      itemCount: this.countActiveItems(items),
    };
  }

  // ═══════════════ helpers ═══════════════
  private static computeSubtotal(items: readonly CartItemEntity[]): number {
    let total = 0;
    for (const item of items) {
      if (!item.isPurchasable()) continue;
      total += item.unitPrice * item.quantity.value;
    }
    return this.round2(total);
  }

  private static countActiveItems(items: readonly CartItemEntity[]): number {
    let count = 0;
    for (const item of items) {
      if (item.isPurchasable()) count += 1;
    }
    return count;
  }

  private static computeTax(base: number, ratePercent: number): number {
    if (base <= 0 || ratePercent <= 0) return 0;
    return this.round2((base * ratePercent) / 100);
  }

  private static extractInclusiveTax(gross: number, ratePercent: number): number {
    if (gross <= 0 || ratePercent <= 0) return 0;
    const net = gross / (1 + ratePercent / 100);
    return this.round2(gross - net);
  }

  private static effectiveShipping(
    subtotal: number,
    baseCost: number,
    freeAbove?: number,
  ): number {
    if (freeAbove !== undefined && freeAbove > 0 && subtotal >= freeAbove) return 0;
    return this.round2(baseCost);
  }

  private static round2(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
