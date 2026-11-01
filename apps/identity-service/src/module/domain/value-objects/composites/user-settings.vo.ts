/**
 * UserSettingsVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { UserIdVO } from '../primitives/user-id.vo.js';

export interface UserSettingsVOProps {
  readonly userId: UserIdVO;
  readonly language: string;
  readonly timezone: string;
  readonly currency: string;
  readonly dateFormat: string;
  readonly timeFormat: '12h' | '24h';
  readonly theme: 'light' | 'dark' | 'system';
  readonly notificationsEnabled: boolean;
  readonly marketingEmails: boolean;
  readonly securityAlerts: boolean;
  readonly loginAlerts: boolean;
  readonly twoFactorRequired: boolean;
  readonly sessionTimeout: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserSettingsVO extends BaseVO<UserSettingsVOProps> {
  private constructor(props: UserSettingsVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserSettingsVOProps): UserSettingsVO {
    const vo = new UserSettingsVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: UserSettingsVOProps): UserSettingsVO {
    return new UserSettingsVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.sessionTimeout < 60 || v.sessionTimeout > 86400 * 30) {
      throw new Error('sessionTimeout must be between 60s and 30 days');
    }
  }

  get userId(): UserIdVO { return this.value.userId; }
  get language(): string { return this.value.language; }
  get timezone(): string { return this.value.timezone; }
  get currency(): string { return this.value.currency; }
  get dateFormat(): string { return this.value.dateFormat; }
  get timeFormat(): string { return this.value.timeFormat; }
  get theme(): string { return this.value.theme; }
  get notificationsEnabled(): boolean { return this.value.notificationsEnabled; }
  get marketingEmails(): boolean { return this.value.marketingEmails; }
  get securityAlerts(): boolean { return this.value.securityAlerts; }
  get loginAlerts(): boolean { return this.value.loginAlerts; }
  get twoFactorRequired(): boolean { return this.value.twoFactorRequired; }
  get sessionTimeout(): number { return this.value.sessionTimeout; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isDarkMode(): boolean { return this.value.theme === 'dark'; }
  hasSecurityAlerts(): boolean { return this.value.securityAlerts; }
}
