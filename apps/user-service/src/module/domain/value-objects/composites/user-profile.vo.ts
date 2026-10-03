/**
 * UserProfileVO — Composite VO
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { UserAvatarVO } from '../primitives/user-avatar.vo.js';
import { UserBioVO } from '../primitives/user-bio.vo.js';
import { ProfileVisibilityVO } from '../primitives/profile-visibility.vo.js';

export interface UserProfileVOProps {
  readonly userId: UserIdVO;
  readonly avatar: UserAvatarVO;
  readonly bio: UserBioVO;
  readonly visibility: ProfileVisibilityVO;
}

export class UserProfileVO extends BaseVO<UserProfileVOProps> {
  private constructor(props: UserProfileVOProps) {
    super(props);
  }

  static create(props: UserProfileVOProps): UserProfileVO {
    if (!props.userId) throw new Error('UserProfileVO: userId required');
    return new UserProfileVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get avatar(): UserAvatarVO { return this.value.avatar; }
  get bio(): UserBioVO { return this.value.bio; }
  get visibility(): ProfileVisibilityVO { return this.value.visibility; }

  hasAvatar(): boolean {
    return !this.value.avatar.isEmpty();
  }

  hasBio(): boolean {
    return !this.value.bio.isEmpty();
  }

  isPublic(): boolean {
    return this.value.visibility.isPublic();
  }

  isComplete(): boolean {
    return this.hasAvatar() && this.hasBio();
  }

  completionScore(): number {
    let score = 0;
    if (this.hasAvatar()) score += 50;
    if (this.hasBio()) score += 50;
    return score;
  }
}
