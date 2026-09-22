import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class FulfillmentIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FulfillmentIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('FulfillmentId', 'cannot be empty');
    }
    return new FulfillmentIdVO(raw);
  }
}
