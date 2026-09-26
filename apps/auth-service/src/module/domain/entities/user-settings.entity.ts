/**
 * UserSettingsEntity — Notification & account toggles
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';

export interface UserSettingsEntityProps {
  readonly id: UserId;
  readonly userId: UserId;
  readonly twoFactorEnabled: boolean;
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly marketingEmails: boolean;
  readonly language: string;
  readonly timezone: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserSettingsEntity extends BaseEntity<UserId> {
  readonly userId: UserId;
  private _twoFactorEnabled: boolean;
  private _emailNotifications: boolean;
  private _smsNotifications: boolean;
  private _pushNotifications: boolean;
  private _marketingEmails: boolean;
  private _language: string;
  private _timezone: string;

  private constructor(props: UserSettingsEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._twoFactorEnabled = props.twoFactorEnabled;
    this._emailNotifications = props.emailNotifications;
    this._smsNotifications = props.smsNotifications;
    this._pushNotifications = props.pushNotifications;
    this._marketingEmails = props.marketingEmails;
    this._language = props.language;
    this._timezone = props.timezone;
  }

  static create(props: UserSettingsEntityProps): UserSettingsEntity {
    return new UserSettingsEntity(props);
  }

  static defaults(id: UserId, userId: UserId, now: string): UserSettingsEntity {
    return new UserSettingsEntity({
      id,
      userId,
      twoFactorEnabled: false,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      marketingEmails: false,
      language: 'bn',
      timezone: 'Asia/Dhaka',
      createdAt: now,
      updatedAt: now,
    });
  }

  // ─── Getters ────────────────────────────────────────────────
  get twoFactorEnabled(): boolean { return this._twoFactorEnabled; }
  get emailNotifications(): boolean { return this._emailNotifications; }
  get smsNotifications(): boolean { return this._smsNotifications; }
  get pushNotifications(): boolean { return this._pushNotifications; }
  get marketingEmails(): boolean { return this._marketingEmails; }
  get language(): string { return this._language; }
  get timezone(): string { return this._timezone; }

  // ─── Mutations ──────────────────────────────────────────────
  enableTwoFactor(): void {
    if (this._twoFactorEnabled) return;
    this._twoFactorEnabled = true;
  }

  disableTwoFactor(): void {
    this._twoFactorEnabled = false;
  }

  updateNotifications(input: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    marketing?: boolean;
  }): void {
    if (input.email !== undefined) this._emailNotifications = input.email;
    if (input.sms !== undefined) this._smsNotifications = input.sms;
    if (input.push !== undefined) this._pushNotifications = input.push;
    if (input.marketing !== undefined) this._marketingEmails = input.marketing;
  }
}
