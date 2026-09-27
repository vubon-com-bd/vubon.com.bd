/**
 * UserBio Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export class UserBioVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = USER_PROFILE.BIO_MAX_LENGTH;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserBioVO {
    if (typeof raw !== 'string') {
      throw new Error('Bio must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length > UserBioVO.MAX_LENGTH) {
      throw new Error(`Bio too long (max ${UserBioVO.MAX_LENGTH})`);
    }
    return new UserBioVO(trimmed);
  }

  static empty(): UserBioVO {
    return new UserBioVO('');
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }

  get wordCount(): number {
    if (this.isEmpty()) return 0;
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  hasMoreThanWords(limit: number): boolean {
    return this.wordCount > limit;
  }

  truncate(maxLength: number): string {
    if (this.value.length <= maxLength) return this.value;
    return this.value.slice(0, maxLength - 3) + '...';
  }

  static maxLength(): number {
    return UserBioVO.MAX_LENGTH;
  }
}
