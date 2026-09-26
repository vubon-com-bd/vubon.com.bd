import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'standard',
  'express',
  'same_day',
  'next_day',
  'scheduled',
  'pickup',
]);

export class DeliveryTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryTypeVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('DeliveryType', `invalid: ${raw}`);
    }
    return new DeliveryTypeVO(raw);
  }
}
