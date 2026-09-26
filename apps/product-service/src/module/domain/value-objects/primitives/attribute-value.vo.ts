import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class AttributeValueVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AttributeValueVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > 255) {
      throw new InvalidValueError('attribute_value', 'Attribute value must be 1-255 characters');
    }
    return new AttributeValueVO(trimmed);
  }
}
