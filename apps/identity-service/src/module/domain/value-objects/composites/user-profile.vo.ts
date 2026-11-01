/**
 * UserProfileVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { UserIdVO } from '../primitives/user-id.vo.js';
import { UserNameVO } from '../primitives/user-name.vo.js';

export interface UserProfileVOProps {
  readonly userId: UserIdVO;
  readonly firstName?: UserNameVO;
  readonly lastName?: UserNameVO;
  readonly displayName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly coverUrl?: string;
  readonly dateOfBirth?: string;
  readonly gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  readonly website?: string;
  readonly language?: string;
  readonly locale?: string;
  readonly timezone?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserProfileVO extends BaseVO<UserProfileVOProps> {
  private constructor(props: UserProfileVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserProfileVOProps): UserProfileVO {
    const vo = new UserProfileVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: UserProfileVOProps): UserProfileVO {
    return new UserProfileVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.bio && v.bio.length > 500) {
      throw new ValidationError('Bio cannot exceed 500 chars', 'bio');
    }
    if (v.avatarUrl && !v.avatarUrl.startsWith('http')) {
      throw new ValidationError('Avatar URL must start with http', 'avatarUrl');
    }
  }

  get userId(): UserIdVO { return this.value.userId; }
  get firstName(): UserNameVO | undefined { return this.value.firstName; }
  get lastName(): UserNameVO | undefined { return this.value.lastName; }
  get displayName(): string | undefined { return this.value.displayName; }
  get bio(): string | undefined { return this.value.bio; }
  get avatarUrl(): string | undefined { return this.value.avatarUrl; }
  get coverUrl(): string | undefined { return this.value.coverUrl; }
  get dateOfBirth(): string | undefined { return this.value.dateOfBirth; }
  get gender(): string | undefined { return this.value.gender; }
  get website(): string | undefined { return this.value.website; }
  get language(): string | undefined { return this.value.language; }
  get locale(): string | undefined { return this.value.locale; }
  get timezone(): string | undefined { return this.value.timezone; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  get fullName(): string {
    if (this.value.firstName && this.value.lastName) {
      return `${this.value.firstName.value} ${this.value.lastName.value}`;
    }
    return this.value.displayName ?? this.value.firstName?.value ?? '';
  }

  hasAvatar(): boolean { return !!this.value.avatarUrl; }
  isComplete(): boolean {
    return !!(this.value.firstName && this.value.lastName && this.value.avatarUrl);
  }
}
