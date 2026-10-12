/**
 * IpAddress Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class IpAddressVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): IpAddressVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('IpAddress cannot be empty', 'ipAddress');
    }
    const normalized = raw.trim();
    if (!REGEX.IPV4.test(normalized) && !REGEX.IPV6.test(normalized)) {
      throw new ValidationError('Invalid IP address format', 'ipAddress');
    }
    return new IpAddressVO(normalized);
  }

  static reconstitute(raw: string): IpAddressVO {
    return new IpAddressVO(raw);
  }

  get isIpv4(): boolean { return REGEX.IPV4.test(this.value); }
  get isIpv6(): boolean { return REGEX.IPV6.test(this.value); }
}
