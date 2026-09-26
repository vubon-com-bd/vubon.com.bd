import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'started',
  'in_progress',
  'awaiting_payment',
  'completed',
  'abandoned',
  'expired',
]);

export class CheckoutStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CheckoutStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('CheckoutStatus', `invalid: ${raw}`);
    }
    return new CheckoutStatusVO(raw);
  }

  isTerminal(): boolean {
    return ['completed', 'abandoned', 'expired'].includes(this.value);
  }

  isActive(): boolean {
    return !this.isTerminal();
  }
}
