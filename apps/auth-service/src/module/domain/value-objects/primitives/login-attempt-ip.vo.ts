/**
 * LoginAttemptIpVO — IPv4 / IPv6 address for login attempts
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { REGEX } from '@vubon/shared-constants/common';

export class LoginAttemptIpVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): LoginAttemptIpVO {
    if (typeof raw !== 'string') {
      throw new Error('IP must be a string');
    }
    const trimmed = raw.trim();
    const isV4 = REGEX.IPV4.test(trimmed) && trimmed.split('.').every((p) => {
      const n = Number(p);
      return n >= 0 && n <= 255 && String(n) === p;
    });
    const isV6 = REGEX.IPV6.test(trimmed) || trimmed.includes('::');
    if (!isV4 && !isV6) {
      throw new Error(`Invalid IP address: ${raw}`);
    }
    return new LoginAttemptIpVO(trimmed);
  }

  isPrivate(): boolean {
    const v4 = this.value;
    if (v4.startsWith('10.')) return true;
    if (v4.startsWith('192.168.')) return true;
    if (v4.startsWith('127.')) return true;
    const m = /^172\.(\d+)\./.exec(v4);
    if (m && m[1]) {
      const second = Number(m[1]);
      if (second >= 16 && second <= 31) return true;
    }
    if (v4 === '::1' || v4.startsWith('fe80:')) return true;
    return false;
  }
}
