import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'direct',
  'marketplace',
  'social',
  'referral',
  'campaign',
]);

export class OrderSourceVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderSourceVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('OrderSource', `invalid: ${raw}`);
    }
    return new OrderSourceVO(raw);
  }
}
