import { BasePhoneVO } from '@vubon/shared-kernel/domain/primitives';
import type { Phone } from '@vubon/shared-types/common';

export class PhoneNumberVO extends BasePhoneVO {
  private constructor(value: Phone) {
    super(value);
  }

  static create(raw: string): PhoneNumberVO {
    BasePhoneVO.validate(raw);
    return new PhoneNumberVO(BasePhoneVO.normalize(raw));
  }
}
