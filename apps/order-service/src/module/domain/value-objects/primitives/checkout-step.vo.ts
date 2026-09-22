import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>(['address', 'shipping', 'payment', 'review', 'confirm']);

export class CheckoutStepVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CheckoutStepVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('CheckoutStep', `invalid: ${raw}`);
    }
    return new CheckoutStepVO(raw);
  }

  isFinal(): boolean {
    return this.value === 'confirm';
  }
}
