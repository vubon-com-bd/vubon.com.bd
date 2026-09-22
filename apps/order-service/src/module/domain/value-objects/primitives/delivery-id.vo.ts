import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class DeliveryIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('DeliveryId', 'cannot be empty');
    }
    return new DeliveryIdVO(raw);
  }
}
