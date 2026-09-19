import { REGEX, VALIDATION } from '@vubon/shared-constants/common';
import type { Phone } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

export abstract class BasePhoneVO extends BaseVO<Phone> {
  protected constructor(value: Phone) {
    super(value);
  }

  protected static normalize(raw: string): Phone {
    return raw.replace(/\s+/g, '') as Phone;
  }

  protected static validate(raw: string): void {
    const normalized = raw.replace(/\s+/g, '');
    if (!REGEX.PHONE_BD.test(normalized) && !REGEX.PHONE_INTL.test(normalized)) {
      throw new Error(`Invalid phone: ${normalized}`);
    }
    if (normalized.length > VALIDATION.PHONE_MAX_LENGTH) {
      throw new Error(`Phone too long (max ${VALIDATION.PHONE_MAX_LENGTH})`);
    }
  }
}

export class PhoneVO extends BasePhoneVO {
  private constructor(value: Phone) {
    super(value);
  }

  static of(raw: string): PhoneVO {
    BasePhoneVO.validate(raw);
    return new PhoneVO(BasePhoneVO.normalize(raw));
  }
}
