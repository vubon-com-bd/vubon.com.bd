import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives';
import type { Email } from '@vubon/shared-types/common';

export class EmailAddressVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static create(raw: string): EmailAddressVO {
    BaseEmailVO.validate(raw);
    return new EmailAddressVO(BaseEmailVO.normalize(raw));
  }
}
