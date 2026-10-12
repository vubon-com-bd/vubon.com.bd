/**
 * VendorPhone Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BasePhoneVO } from '@vubon/shared-kernel/domain/primitives/phone.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { Phone } from '@vubon/shared-types/common';

export class VendorPhoneVO extends BasePhoneVO {
  private constructor(value: Phone) {
    super(value);
  }

  static create(raw: string): VendorPhoneVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor phone must be a string', 'phone');
    }
    try {
      BasePhoneVO.validate(raw);
    } catch (err) {
      throw new ValidationError(
        err instanceof Error ? err.message : 'Invalid vendor phone',
        'phone',
      );
    }
    return new VendorPhoneVO(BasePhoneVO.normalize(raw));
  }

  static reconstitute(raw: string): VendorPhoneVO {
    return new VendorPhoneVO(raw as Phone);
  }

  isBangladeshi(): boolean {
    return this.value.startsWith('+880') || /^01[3-9]\d{8}$/.test(this.value);
  }

  getDigits(): string {
    return this.value.replace(/\D+/g, '');
  }
}
