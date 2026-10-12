/**
 * UserTimezone Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class UserTimezoneVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserTimezoneVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserTimezone cannot be empty', 'timezone');
    }
    const normalized = raw.trim();
    if (!/^[A-Za-z]+\/[A-Za-z_]+$/.test(normalized) && normalized !== 'UTC') {
      throw new ValidationError(
        'UserTimezone must be IANA format (e.g., "Asia/Dhaka", "UTC")',
        'timezone',
      );
    }
    return new UserTimezoneVO(normalized);
  }

  static dhaka(): UserTimezoneVO { return new UserTimezoneVO('Asia/Dhaka'); }
  static utc(): UserTimezoneVO { return new UserTimezoneVO('UTC'); }

  static reconstitute(raw: string): UserTimezoneVO {
    return new UserTimezoneVO(raw);
  }

  get isDhaka(): boolean { return this.value === 'Asia/Dhaka'; }
  get isUtc(): boolean { return this.value === 'UTC'; }
  get region(): string { return this.value.split('/')[0] ?? ''; }
}
