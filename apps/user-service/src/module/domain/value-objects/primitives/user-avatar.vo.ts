/**
 * UserAvatar Value Object
 * @module user-service/domain/value-objects/primitives
 *
 * Avatar URL validation with REGEX.URL.
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export class UserAvatarVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 2048;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserAvatarVO {
    if (typeof raw !== 'string') {
      throw new Error('Avatar must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('Avatar URL cannot be empty');
    }
    if (trimmed.length > UserAvatarVO.MAX_LENGTH) {
      throw new Error(`Avatar URL too long (max ${UserAvatarVO.MAX_LENGTH})`);
    }
    if (!REGEX.URL.test(trimmed)) {
      throw new Error(`Invalid avatar URL: ${trimmed}`);
    }
    return new UserAvatarVO(trimmed);
  }

  static empty(): UserAvatarVO {
    return new UserAvatarVO('');
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }

  isHttps(): boolean {
    return this.value.startsWith('https://');
  }

  getFileExtension(): string {
    if (this.isEmpty()) return '';
    const lastDot = this.value.lastIndexOf('.');
    if (lastDot === -1) return '';
    return this.value.slice(lastDot + 1).toLowerCase();
  }

  isImageFormat(): boolean {
    const ext = this.getFileExtension();
    return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext);
  }

  static maxSizeMB(): number {
    return USER_PROFILE.AVATAR_MAX_SIZE_MB;
  }
}
