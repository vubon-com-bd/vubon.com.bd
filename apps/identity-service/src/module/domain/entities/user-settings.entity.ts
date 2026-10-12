/**
 * UserSettingsEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export interface UserSettingsEntityProps {
  readonly userId: UserIdVO;
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  loginAlerts: boolean;
  twoFactorRequired: boolean;
  sessionTimeout: number;
}

export class UserSettingsEntity extends BaseEntity<string> {
  private props: UserSettingsEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: UserSettingsEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get userId(): UserIdVO { return this.props.userId; }
  get language(): string { return this.props.language; }
  get timezone(): string { return this.props.timezone; }
  get currency(): string { return this.props.currency; }
  get dateFormat(): string { return this.props.dateFormat; }
  get timeFormat(): string { return this.props.timeFormat; }
  get theme(): string { return this.props.theme; }
  get notificationsEnabled(): boolean { return this.props.notificationsEnabled; }
  get marketingEmails(): boolean { return this.props.marketingEmails; }
  get securityAlerts(): boolean { return this.props.securityAlerts; }
  get loginAlerts(): boolean { return this.props.loginAlerts; }
  get twoFactorRequired(): boolean { return this.props.twoFactorRequired; }
  get sessionTimeout(): number { return this.props.sessionTimeout; }

  update(patch: Partial<Omit<UserSettingsEntityProps, 'userId'>>, now: string = new Date().toISOString()): void {
    this.props = { ...this.props, ...patch };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: { id: string; userId: UserIdVO; now: string }): UserSettingsEntity {
    return new UserSettingsEntity(params.id, params.now, params.now, {
      userId: params.userId,
      language: 'en',
      timezone: 'Asia/Dhaka',
      currency: 'BDT',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '12h',
      theme: 'system',
      notificationsEnabled: true,
      marketingEmails: false,
      securityAlerts: true,
      loginAlerts: true,
      twoFactorRequired: false,
      sessionTimeout: 86400,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserSettingsEntityProps;
  }): UserSettingsEntity {
    return new UserSettingsEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
