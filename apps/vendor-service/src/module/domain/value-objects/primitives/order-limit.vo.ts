/**
 * OrderLimit Value Object — min/max order amount + count constraints
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_LIMIT } from '@vubon/shared-constants/business';

const MIN_AMOUNT = VENDOR_LIMIT.MIN_ORDER_AMOUNT;
const MAX_AMOUNT = VENDOR_LIMIT.MAX_ORDER_AMOUNT;
const PENDING_EXPIRY_HOURS = VENDOR_LIMIT.PENDING_ORDER_EXPIRY_HOURS;

export interface OrderLimitValue {
  readonly minAmount: number;
  readonly maxAmount: number;
  readonly currency: string;
  readonly pendingExpiryHours: number;
}

export class OrderLimitVO extends BaseVO<OrderLimitValue> {
  private constructor(value: OrderLimitValue) {
    super(value);
  }

  static create(
    minAmount: number,
    maxAmount: number,
    currency: string,
    pendingExpiryHours: number = PENDING_EXPIRY_HOURS,
  ): OrderLimitVO {
    if (!Number.isFinite(minAmount) || !Number.isFinite(maxAmount)) {
      throw new ValidationError('Order limits must be finite numbers', 'orderLimit');
    }
    if (minAmount < MIN_AMOUNT) {
      throw new ValidationError(`Min order amount must be at least ${MIN_AMOUNT}`, 'orderLimit.min');
    }
    if (maxAmount > MAX_AMOUNT) {
      throw new ValidationError(`Max order amount cannot exceed ${MAX_AMOUNT}`, 'orderLimit.max');
    }
    if (minAmount > maxAmount) {
      throw new ValidationError('Min order amount cannot exceed max', 'orderLimit');
    }
    if (typeof currency !== 'string' || currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    if (!Number.isInteger(pendingExpiryHours) || pendingExpiryHours <= 0) {
      throw new ValidationError('Pending expiry hours must be a positive integer', 'pendingExpiryHours');
    }
    return new OrderLimitVO({
      minAmount: Math.round(minAmount * 100) / 100,
      maxAmount: Math.round(maxAmount * 100) / 100,
      currency: currency.toUpperCase(),
      pendingExpiryHours,
    });
  }

  static reconstitute(value: OrderLimitValue): OrderLimitVO {
    return new OrderLimitVO(value);
  }

  static defaults(currency: string): OrderLimitVO {
    return OrderLimitVO.create(MIN_AMOUNT, MAX_AMOUNT, currency);
  }

  get minAmount(): number {
    return this.value.minAmount;
  }

  get maxAmount(): number {
    return this.value.maxAmount;
  }

  get currency(): string {
    return this.value.currency;
  }

  get pendingExpiryHours(): number {
    return this.value.pendingExpiryHours;
  }

  isWithinLimits(amount: number): boolean {
    if (!Number.isFinite(amount)) return false;
    return amount >= this.minAmount && amount <= this.maxAmount;
  }

  isBelowMinimum(amount: number): boolean {
    return amount < this.minAmount;
  }

  isAboveMaximum(amount: number): boolean {
    return amount > this.maxAmount;
  }

  rangeDescription(): string {
    return `${this.currency} ${this.minAmount} - ${this.maxAmount}`;
  }
}
