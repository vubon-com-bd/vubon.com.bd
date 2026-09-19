import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { REGEX } from '@vubon/shared-constants/common';

export class LoginAttemptIpVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LoginAttemptIpVO {
    BaseCodeVO.validateNonEmpty(raw, 'LoginAttemptIp');
    if (!REGEX.IPV4.test(raw) && !REGEX.IPV6.test(raw)) {
      throw new Error(`Invalid IP address: ${raw}`);
    }
    return new LoginAttemptIpVO(raw);
  }
}
