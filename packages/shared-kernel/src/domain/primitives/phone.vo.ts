/**
 * Phone Value Object (BD + international)
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { REGEX } from '@vubon/shared-constants/common';
import { VALIDATION } from '@vubon/shared-constants/common';
import type { Phone } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

export class PhoneVO extends BaseVO<Phone> {
  private constructor(value: Phone) {
    super(value);
  }

  static ofBd(raw: string): PhoneVO {
    if (typeof raw !== 'string') {
      throw new Error('Phone must be a string');
    }
    const cleaned = raw.replace(/[\s-]/g, '');
    if (!REGEX.PHONE_BD.test(cleaned)) {
      throw new Error(`Invalid BD phone number: ${raw}`);
    }
    return new PhoneVO(cleaned as Phone);
  }

  static ofInternational(raw: string): PhoneVO {
    if (typeof raw !== 'string') {
      throw new Error('Phone must be a string');
    }
    const cleaned = raw.replace(/[\s-]/g, '');
    if (
      cleaned.length < VALIDATION.PHONE_MIN_LENGTH ||
      cleaned.length > VALIDATION.PHONE_MAX_LENGTH
    ) {
      throw new Error(
        `Phone length must be between ${VALIDATION.PHONE_MIN_LENGTH} and ${VALIDATION.PHONE_MAX_LENGTH}`
      );
    }
    if (!REGEX.PHONE_INTL.test(cleaned)) {
      throw new Error(`Invalid international phone: ${raw}`);
    }
    return new PhoneVO(cleaned as Phone);
  }
}
