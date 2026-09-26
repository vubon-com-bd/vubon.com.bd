import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserVO } from './user.vo';
import { UserProfileVO } from './user-profile.vo';
import { UserPreferencesVO } from './user-preferences.vo';

export interface UserPersonaProps {
  readonly user: UserVO;
  readonly profile: UserProfileVO;
  readonly preferences: UserPreferencesVO;
}

export class UserPersonaVO extends BaseVO<UserPersonaProps> {
  private constructor(props: UserPersonaProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserPersonaProps): UserPersonaVO {
    return new UserPersonaVO(props);
  }

  get user(): UserVO { return this.value.user; }
  get profile(): UserProfileVO { return this.value.profile; }
  get preferences(): UserPreferencesVO { return this.value.preferences; }
}
