import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface UserSettingsEntityProps {
  readonly userId: UserIdVO;
  readonly language: string;
  readonly timezone: string;
  readonly currency: string;
  readonly theme: 'light' | 'dark' | 'system';
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
}

export class UserSettingsEntity extends BaseEntity<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _language: string;
  private readonly _timezone: string;
  private readonly _currency: string;
  private readonly _theme: 'light' | 'dark' | 'system';
  private readonly _emailNotifications: boolean;
  private readonly _smsNotifications: boolean;
  private readonly _pushNotifications: boolean;

  private constructor(
    id: UserIdVO,
    props: UserSettingsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._language = props.language;
    this._timezone = props.timezone;
    this._currency = props.currency;
    this._theme = props.theme;
    this._emailNotifications = props.emailNotifications;
    this._smsNotifications = props.smsNotifications;
    this._pushNotifications = props.pushNotifications;
  }

  static create(props: UserSettingsEntityProps): UserSettingsEntity {
    const now = new Date().toISOString();
    return new UserSettingsEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: UserSettingsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserSettingsEntity {
    return new UserSettingsEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateTheme(theme: 'light' | 'dark' | 'system'): UserSettingsEntity {
    return new UserSettingsEntity(
      this.id,
      { ...this._toProps(), theme },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  toggleEmailNotifications(enabled: boolean): UserSettingsEntity {
    return new UserSettingsEntity(
      this.id,
      { ...this._toProps(), emailNotifications: enabled },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get language(): string { return this._language; }
  get timezone(): string { return this._timezone; }
  get currency(): string { return this._currency; }
  get theme(): 'light' | 'dark' | 'system' { return this._theme; }
  get emailNotifications(): boolean { return this._emailNotifications; }
  get smsNotifications(): boolean { return this._smsNotifications; }
  get pushNotifications(): boolean { return this._pushNotifications; }

  private _toProps(): UserSettingsEntityProps {
    return {
      userId: this._userId,
      language: this._language,
      timezone: this._timezone,
      currency: this._currency,
      theme: this._theme,
      emailNotifications: this._emailNotifications,
      smsNotifications: this._smsNotifications,
      pushNotifications: this._pushNotifications,
    };
  }
}
