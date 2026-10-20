/**
 * CheckoutStep Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * Sequential checkout flow steps.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CheckoutStepValue =
  | 'cart'
  | 'shipping_address'
  | 'shipping_method'
  | 'payment_method'
  | 'review'
  | 'confirmation';

const STEPS: readonly CheckoutStepValue[] = [
  'cart',
  'shipping_address',
  'shipping_method',
  'payment_method',
  'review',
  'confirmation',
];

const STEP_INDEX: Readonly<Record<CheckoutStepValue, number>> = {
  cart: 0,
  shipping_address: 1,
  shipping_method: 2,
  payment_method: 3,
  review: 4,
  confirmation: 5,
} as Readonly<Record<CheckoutStepValue, number>>;

export class CheckoutStepVO extends BaseVO<CheckoutStepValue> {
  private constructor(value: CheckoutStepValue) {
    super(value);
  }

  static create(raw: string): CheckoutStepVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CheckoutStep must be a string', 'step');
    }
    const normalized = raw.trim().toLowerCase();
    if (!STEPS.includes(normalized as CheckoutStepValue)) {
      throw new ValidationError(
        `Invalid CheckoutStep: "${normalized}". Allowed: ${STEPS.join(', ')}`,
        'step',
      );
    }
    return new CheckoutStepVO(normalized as CheckoutStepValue);
  }

  static reconstitute(raw: string): CheckoutStepVO {
    return new CheckoutStepVO(raw as CheckoutStepValue);
  }

  static cart(): CheckoutStepVO { return new CheckoutStepVO('cart'); }
  static confirmation(): CheckoutStepVO { return new CheckoutStepVO('confirmation'); }

  get index(): number {
    return STEP_INDEX[this.value];
  }

  isLast(): boolean {
    return this.value === 'confirmation';
  }

  canAdvanceTo(target: CheckoutStepVO): boolean {
    return target.index === this.index + 1;
  }
}
