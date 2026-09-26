import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class AttributeNameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AttributeNameVO {
    const trimmed = raw.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      throw new InvalidValueError('attribute_name', 'Attribute name must be 1-100 characters');
    }
    return new AttributeNameVO(trimmed);
  }
}
