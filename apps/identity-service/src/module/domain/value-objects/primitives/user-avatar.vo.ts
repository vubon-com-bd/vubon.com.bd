/**
 * UserAvatar Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export class UserAvatarVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserAvatarVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserAvatar URL cannot be empty', 'avatarUrl');
    }
    const normalized = raw.trim();
    if (!/^https?:\/\/.+/.test(normalized)) {
      throw new ValidationError('UserAvatar must be a valid HTTP(S) URL', 'avatarUrl');
    }
    if (normalized.length > 2048) {
      throw new ValidationError('UserAvatar URL exceeds 2048 chars', 'avatarUrl');
    }
    return new UserAvatarVO(normalized);
  }

  static reconstitute(raw: string): UserAvatarVO {
    return new UserAvatarVO(raw);
  }

  get maxSizeMb(): number { return USER_PROFILE.AVATAR_MAX_SIZE_MB; }
  get fileName(): string { return this.value.split('/').pop() ?? ''; }
  get isCdn(): boolean { return this.value.includes('cdn.'); }
}
