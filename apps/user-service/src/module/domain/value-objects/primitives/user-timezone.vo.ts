/**
 * UserTimezone Value Object
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { TIMEZONE } from '@vubon/shared-constants/common';

export type UserTimezoneType = (typeof TIMEZONE)[keyof typeof TIMEZONE];

const TIMEZONE_VALUES: ReadonlySet<string> = new Set(Object.values(TIMEZONE));

export class UserTimezoneVO extends BaseTypeVO<UserTimezoneType> {
  private constructor(value: UserTimezoneType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TIMEZONE_VALUES;
  }

  static create(raw: string): UserTimezoneVO {
    if (typeof raw !== 'string') {
      throw new Error('UserTimezone must be a string');
    }
    const trimmed = raw.trim();
    if (!TIMEZONE_VALUES.has(trimmed)) {
      throw new Error(
        `Invalid timezone: "${raw}". Allowed: ${[...TIMEZONE_VALUES].join(', ')}`
      );
    }
    return new UserTimezoneVO(trimmed as UserTimezoneType);
  }

  static default(): UserTimezoneVO {
    return new UserTimezoneVO(TIMEZONE.ASIA_DHAKA as UserTimezoneType);
  }
}
