/**
 * CheckoutStep Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import {
  CHECKOUT_STEP,
  CHECKOUT_STEP_ORDER,
} from '@vubon/shared-constants/business/checkout';
import { InvalidCheckoutStepError } from '../../errors/checkout.errors.js';

const ALLOWED = Object.values(CHECKOUT_STEP) as readonly string[];

export class CheckoutStepVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): CheckoutStepVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidCheckoutStepError(raw, ALLOWED);
    }
    return new CheckoutStepVO(raw);
  }

  static reconstitute(raw: string): CheckoutStepVO { return new CheckoutStepVO(raw); }

  /** Numeric order of the step (1-based). */
  get order(): number {
    return CHECKOUT_STEP_ORDER[this.value as keyof typeof CHECKOUT_STEP_ORDER] ?? 0;
  }

  /** True if this step comes after `other`. */
  isAfter(other: CheckoutStepVO): boolean {
    return this.order > other.order;
  }

  /** True if this step comes before `other`. */
  isBefore(other: CheckoutStepVO): boolean {
    return this.order < other.order;
  }

  isFirst(): boolean { return this.value === CHECKOUT_STEP.CART_REVIEW; }
  isLast(): boolean { return this.value === CHECKOUT_STEP.CONFIRMATION; }

  /** Next step in sequence, or null if last. */
  next(): CheckoutStepVO | null {
    const ordered = Object.entries(CHECKOUT_STEP_ORDER)
      .sort(([, a], [, b]) => a - b)
      .map(([k]) => k);
    const idx = ordered.indexOf(this.value);
    if (idx < 0 || idx === ordered.length - 1) return null;
    return new CheckoutStepVO(ordered[idx + 1]);
  }
}
