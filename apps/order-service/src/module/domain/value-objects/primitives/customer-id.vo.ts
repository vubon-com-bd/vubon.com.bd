/**
 * CustomerId Value Object (cross-service reference → user-service)
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CustomerIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CustomerIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CustomerId cannot be empty', 'customerId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CustomerId must be a valid UUID', 'customerId');
    }
    return new CustomerIdVO(trimmed);
  }

  static reconstitute(raw: string): CustomerIdVO {
    return new CustomerIdVO(raw);
  }
}
