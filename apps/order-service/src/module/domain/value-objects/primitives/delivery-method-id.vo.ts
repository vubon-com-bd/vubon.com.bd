import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class DeliveryMethodIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryMethodIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('DeliveryMethodId', 'cannot be empty');
    }
    return new DeliveryMethodIdVO(raw);
  }
}
