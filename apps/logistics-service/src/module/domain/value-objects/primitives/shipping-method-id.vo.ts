/**
 * ShippingMethodId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class ShippingMethodIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShippingMethodIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ShippingMethodId cannot be empty', 'shippingMethodId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ShippingMethodId must be a valid UUID', 'shippingMethodId');
    }
    return new ShippingMethodIdVO(trimmed);
  }

  static reconstitute(raw: string): ShippingMethodIdVO { return new ShippingMethodIdVO(raw); }
}
