/**
 * ProfileVisibility Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { USER_PROFILE_VISIBILITY } from '@vubon/shared-constants/user';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const VALID: readonly string[] = Object.values(USER_PROFILE_VISIBILITY);

export class ProfileVisibilityVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProfileVisibilityVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ProfileVisibility cannot be empty', 'visibility');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid ProfileVisibility "${normalized}". Allowed: ${VALID.join(', ')}`,
        'visibility',
      );
    }
    return new ProfileVisibilityVO(normalized);
  }

  static public(): ProfileVisibilityVO {
    return new ProfileVisibilityVO(USER_PROFILE_VISIBILITY.PUBLIC);
  }
  static private(): ProfileVisibilityVO {
    return new ProfileVisibilityVO(USER_PROFILE_VISIBILITY.PRIVATE);
  }
  static friends(): ProfileVisibilityVO {
    return new ProfileVisibilityVO(USER_PROFILE_VISIBILITY.FRIENDS);
  }
  static followers(): ProfileVisibilityVO {
    return new ProfileVisibilityVO(USER_PROFILE_VISIBILITY.FOLLOWERS);
  }
  static onlyMe(): ProfileVisibilityVO {
    return new ProfileVisibilityVO(USER_PROFILE_VISIBILITY.ONLY_ME);
  }

  static reconstitute(raw: string): ProfileVisibilityVO {
    return new ProfileVisibilityVO(raw);
  }

  isPublic(): boolean { return this.value === USER_PROFILE_VISIBILITY.PUBLIC; }
  isPrivate(): boolean { return this.value === USER_PROFILE_VISIBILITY.PRIVATE; }
  isOnlyMe(): boolean { return this.value === USER_PROFILE_VISIBILITY.ONLY_ME; }
  isDiscoverable(): boolean { return !this.isOnlyMe() && !this.isPrivate(); }
}
