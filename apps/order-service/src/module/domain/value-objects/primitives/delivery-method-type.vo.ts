import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'courier',
  'postal',
  'own_fleet',
  'third_party',
  'locker',
  'pickup_point',
]);

export class DeliveryMethodTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryMethodTypeVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('DeliveryMethodType', `invalid: ${raw}`);
    }
    return new DeliveryMethodTypeVO(raw);
  }
}
