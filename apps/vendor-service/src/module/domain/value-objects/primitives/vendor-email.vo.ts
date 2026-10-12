/**
 * VendorEmail Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives/email.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { Email } from '@vubon/shared-types/common';

export class VendorEmailVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static create(raw: string): VendorEmailVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor email must be a string', 'email');
    }
    try {
      BaseEmailVO.validate(raw);
    } catch (err) {
      throw new ValidationError(
        err instanceof Error ? err.message : 'Invalid vendor email',
        'email',
      );
    }
    return new VendorEmailVO(BaseEmailVO.normalize(raw));
  }

  static reconstitute(raw: string): VendorEmailVO {
    return new VendorEmailVO(raw as Email);
  }

  isBusinessDomain(): boolean {
    const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com'];
    return !freeProviders.includes(this.domain);
  }
}
