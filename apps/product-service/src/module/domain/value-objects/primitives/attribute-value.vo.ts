/**
 * AttributeValue Value Object
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ATTRIBUTE } from '@vubon/shared-constants/business/product';

export type AttributeValueType = string | number | boolean | readonly string[];

export class AttributeValueVO extends BaseVO<AttributeValueType> {
  private constructor(value: AttributeValueType) {
    super(value);
  }

  static create(raw: AttributeValueType): AttributeValueVO {
    if (raw === null || raw === undefined) {
      throw new Error('AttributeValue cannot be null or undefined');
    }
    if (typeof raw === 'string' && raw.length > ATTRIBUTE.VALUE_MAX_LENGTH) {
      throw new Error(`AttributeValue string cannot exceed ${ATTRIBUTE.VALUE_MAX_LENGTH} chars`);
    }
    if (typeof raw === 'number' && !Number.isFinite(raw)) {
      throw new Error('AttributeValue number must be finite');
    }
    if (Array.isArray(raw) && raw.length > ATTRIBUTE.MAX_OPTIONS) {
      throw new Error(`AttributeValue array cannot exceed ${ATTRIBUTE.MAX_OPTIONS} items`);
    }
    return new AttributeValueVO(raw);
  }

  static reconstitute(raw: AttributeValueType): AttributeValueVO {
    return new AttributeValueVO(raw);
  }
}
