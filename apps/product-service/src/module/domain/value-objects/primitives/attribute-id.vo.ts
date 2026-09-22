import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class AttributeIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AttributeIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('attribute_id', 'AttributeId cannot be empty');
    }
    return new AttributeIdVO(raw);
  }
}
