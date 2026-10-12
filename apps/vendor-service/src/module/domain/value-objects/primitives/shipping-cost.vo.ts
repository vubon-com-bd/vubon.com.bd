/**
 * ShippingCost Value Object — cost within VENDOR_SHIPPING constraints
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SHIPPING } from '@vubon/shared-constants/business';

const MAX_COST = VENDOR_SHIPPING.MAX_SHIPPING_COST;
const FREE_MIN_AMOUNT = VENDOR_SHIPPING.FREE_SHIPPING_MIN_AMOUNT;

export interface ShippingCostValue {
  readonly amount: number;
  readonly currency: string;
  readonly freeAbove?: number;
}

export class ShippingCostVO extends BaseVO<ShippingCostValue> {
  private constructor(value: ShippingCostValue) {
    super(value);
  }

  static create(amount: number, currency: string, freeAbove?: number): ShippingCostVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Shipping cost must be a finite number', 'shippingCost');
    }
    if (amount < 0) {
      throw new ValidationError('Shipping cost cannot be negative', 'shippingCost');
    }
    if (amount > MAX_COST) {
      throw new ValidationError(`Shipping cost cannot exceed ${MAX_COST}`, 'shippingCost');
    }
    if (typeof currency !== 'string' || currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    if (freeAbove !== undefined) {
      if (!Number.isFinite(freeAbove) || freeAbove <= 0) {
        throw new ValidationError('Free-above amount must be positive', 'freeAbove');
      }
    }
    const rounded = Math.round(amount * 100) / 100;
    return new ShippingCostVO({
      amount: rounded,
      currency: currency.toUpperCase(),
      freeAbove,
    });
  }

  static reconstitute(value: ShippingCostValue): ShippingCostVO {
    return new ShippingCostVO(value);
  }

  static free(currency: string): ShippingCostVO {
    return new ShippingCostVO({ amount: 0, currency: currency.toUpperCase() });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): string {
    return this.value.currency;
  }

  isFree(): boolean {
    return this.amount === 0;
  }

  /** Returns 0 if cart total >= freeAbove, else cost. */
  calculateForOrder(orderTotal: number): number {
    if (!Number.isFinite(orderTotal) || orderTotal < 0) {
      throw new ValidationError('Order total must be non-negative', 'orderTotal');
    }
    if (this.value.freeAbove !== undefined && orderTotal >= this.value.freeAbove) {
      return 0;
    }
    if (orderTotal >= FREE_MIN_AMOUNT && this.value.freeAbove === undefined) {
      // Default policy: free above FREE_SHIPPING_MIN_AMOUNT
      return 0;
    }
    return this.amount;
  }
}
