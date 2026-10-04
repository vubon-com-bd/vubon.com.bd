/**
 * ProfileVisibility Value Object
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { USER_PROFILE_VISIBILITY } from '@vubon/shared-constants/user';

export type ProfileVisibilityType =
  (typeof USER_PROFILE_VISIBILITY)[keyof typeof USER_PROFILE_VISIBILITY];

const VISIBILITY_VALUES: ReadonlySet<string> = new Set(
  Object.values(USER_PROFILE_VISIBILITY)
);

export class ProfileVisibilityVO extends BaseTypeVO<ProfileVisibilityType> {
  private constructor(value: ProfileVisibilityType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return VISIBILITY_VALUES;
  }

  static create(raw: string): ProfileVisibilityVO {
    if (typeof raw !== 'string') {
      throw new Error('ProfileVisibility must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VISIBILITY_VALUES.has(normalized)) {
      throw new Error(
        `Invalid visibility: "${raw}". Allowed: ${[...VISIBILITY_VALUES].join(', ')}`
      );
    }
    return new ProfileVisibilityVO(normalized as ProfileVisibilityType);
  }

  isPublic(): boolean {
    return this.value === USER_PROFILE_VISIBILITY.PUBLIC;
  }

  isPrivate(): boolean {
    return this.value === USER_PROFILE_VISIBILITY.PRIVATE;
  }
}
