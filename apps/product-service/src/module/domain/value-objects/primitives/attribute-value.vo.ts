/**
 * AttributeValue Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Attribute মান scalar বা array হতে পারে।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ATTRIBUTE } from '@vubon/shared-constants/business';

export type AttributeValueType = string | number | boolean | readonly string[];

export class AttributeValueVO extends BaseVO<AttributeValueType> {
  private constructor(value: AttributeValueType) { super(value); }

  static create(raw: AttributeValueType): AttributeValueVO {
    if (raw === null || raw === undefined) {
      throw new ValidationError('AttributeValue cannot be null/undefined', 'value');
    }
    if (Array.isArray(raw)) {
      if (raw.length === 0) {
        throw new ValidationError('AttributeValue array cannot be empty', 'value');
      }
      for (const v of raw) {
        if (typeof v !== 'string' || v.length > ATTRIBUTE.VALUE_MAX_LENGTH) {
          throw new ValidationError('AttributeValue array contains invalid value', 'value');
        }
      }
      return new AttributeValueVO(Object.freeze([...raw]));
    }
    if (typeof raw === 'string') {
      const trimmed = raw.trim();
      if (trimmed.length === 0 || trimmed.length > ATTRIBUTE.VALUE_MAX_LENGTH) {
        throw new ValidationError(
          `AttributeValue string must be 1-${ATTRIBUTE.VALUE_MAX_LENGTH} chars`,
          'value',
        );
      }
      return new AttributeValueVO(trimmed);
    }
    if (typeof raw === 'number') {
      if (!Number.isFinite(raw)) {
        throw new ValidationError('AttributeValue number must be finite', 'value');
      }
      return new AttributeValueVO(raw);
    }
    if (typeof raw === 'boolean') {
      return new AttributeValueVO(raw);
    }
    throw new ValidationError('AttributeValue type not supported', 'value');
  }

  static reconstitute(raw: AttributeValueType): AttributeValueVO {
    return new AttributeValueVO(raw);
  }

  isScalar(): boolean { return !Array.isArray(this.value); }
  isMulti(): boolean { return Array.isArray(this.value); }

  asString(): string { return String(this.value); }
  asNumber(): number { return typeof this.value === 'number' ? this.value : Number(this.value); }
  asArray(): readonly string[] { return Array.isArray(this.value) ? this.value : [String(this.value)]; }
}
