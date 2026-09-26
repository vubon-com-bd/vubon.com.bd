import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserAvatarVO } from '../primitives/user-avatar.vo';
import { UserBioVO } from '../primitives/user-bio.vo';
import { ProfileVisibilityVO } from '../primitives/profile-visibility.vo';

export interface UserProfileProps {
  readonly userId: UserIdVO;
  readonly avatar: UserAvatarVO | null;
  readonly bio: UserBioVO | null;
  readonly visibility: ProfileVisibilityVO;
}

export class UserProfileVO extends BaseVO<UserProfileProps> {
  private constructor(props: UserProfileProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserProfileProps): UserProfileVO {
    return new UserProfileVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get avatar(): UserAvatarVO | null { return this.value.avatar; }
  get bio(): UserBioVO | null { return this.value.bio; }
  get visibility(): ProfileVisibilityVO { return this.value.visibility; }
}
