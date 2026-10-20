/**
 * ShippingAddressLine Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * Snapshot of address line 1 at time of order.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 255;

export class ShippingAddressLineVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShippingAddressLineVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShippingAddressLine must be a string', 'addressLine');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ShippingAddressLine must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'addressLine',
      );
    }
    return new ShippingAddressLineVO(trimmed);
  }

  static reconstitute(raw: string): ShippingAddressLineVO {
    return new ShippingAddressLineVO(raw);
  }
}
