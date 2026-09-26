/**
 * UserSettingsVO — Account-level settings toggles
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface UserSettingsVOProps {
  readonly userId: UserIdVO;
  readonly twoFactorEnabled: boolean;
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly marketingEmails: boolean;
  readonly language: string;
  readonly timezone: string;
}

export class UserSettingsVO extends BaseVO<UserSettingsVOProps> {
  private constructor(props: UserSettingsVOProps) {
    super(props);
  }

  static of(props: UserSettingsVOProps): UserSettingsVO {
    if (!props.language || props.language.length < 2) {
      throw new Error('Language is required');
    }
    if (!props.timezone) {
      throw new Error('Timezone is required');
    }
    return new UserSettingsVO(props);
  }

  static defaults(userId: UserIdVO): UserSettingsVO {
    return new UserSettingsVO({
      userId,
      twoFactorEnabled: false,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      language: 'bn',
      timezone: 'Asia/Dhaka',
    });
  }

  get userId(): UserIdVO { return this.value.userId; }
  get twoFactorEnabled(): boolean { return this.value.twoFactorEnabled; }

  /** Internal helper — returns a new VO with 2FA flipped */
  withTwoFactor(enabled: boolean): UserSettingsVO {
    return new UserSettingsVO({ ...this.value, twoFactorEnabled: enabled });
  }

  wantsEmail(): boolean { return this.value.emailNotifications; }
  wantsSms(): boolean { return this.value.smsNotifications; }
  wantsPush(): boolean { return this.value.pushNotifications; }
  wantsMarketing(): boolean { return this.value.marketingEmails; }
}
