import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface UserSettingsProps {
  readonly userId: UserIdVO;
  readonly language: string;
  readonly timezone: string;
  readonly currency: string;
  readonly theme: 'light' | 'dark' | 'system';
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
}

export class UserSettingsVO extends BaseVO<UserSettingsProps> {
  private constructor(props: UserSettingsProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserSettingsProps): UserSettingsVO {
    return new UserSettingsVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get language(): string { return this.value.language; }
  get timezone(): string { return this.value.timezone; }
  get currency(): string { return this.value.currency; }
  get theme(): 'light' | 'dark' | 'system' { return this.value.theme; }
  get emailNotifications(): boolean { return this.value.emailNotifications; }
  get smsNotifications(): boolean { return this.value.smsNotifications; }
  get pushNotifications(): boolean { return this.value.pushNotifications; }
}
