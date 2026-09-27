/**
 * ActivityType Value Object
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { USER_ACTIVITY } from '@vubon/shared-constants/user';

export type ActivityTypeType = (typeof USER_ACTIVITY)[keyof typeof USER_ACTIVITY];

const ACTIVITY_TYPE_VALUES: ReadonlySet<string> = new Set(Object.values(USER_ACTIVITY));

export class ActivityTypeVO extends BaseTypeVO<ActivityTypeType> {
  private constructor(value: ActivityTypeType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return ACTIVITY_TYPE_VALUES;
  }

  static create(raw: string): ActivityTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('ActivityType must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!ACTIVITY_TYPE_VALUES.has(normalized)) {
      throw new Error(
        `Invalid activity type: "${raw}". Allowed: ${[...ACTIVITY_TYPE_VALUES].join(', ')}`
      );
    }
    return new ActivityTypeVO(normalized as ActivityTypeType);
  }

  isAuthActivity(): boolean {
    return (
      this.value === USER_ACTIVITY.LOGIN ||
      this.value === USER_ACTIVITY.LOGOUT ||
      this.value === USER_ACTIVITY.REGISTER
    );
  }
}
