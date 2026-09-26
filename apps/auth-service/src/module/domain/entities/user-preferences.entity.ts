/**
 * UserPreferencesEntity — UI / behavior preferences
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';

export type ThemePreference = 'light' | 'dark' | 'system';

export interface UserPreferencesEntityProps {
  readonly id: UserId;
  readonly userId: UserId;
  readonly theme: ThemePreference;
  readonly currency: string;
  readonly dateFormat: string;
  readonly reduceMotion: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserPreferencesEntity extends BaseEntity<UserId> {
  readonly userId: UserId;
  private _theme: ThemePreference;
  private _currency: string;
  private _dateFormat: string;
  private _reduceMotion: boolean;

  private constructor(props: UserPreferencesEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._theme = props.theme;
    this._currency = props.currency;
    this._dateFormat = props.dateFormat;
    this._reduceMotion = props.reduceMotion;
  }

  static create(props: UserPreferencesEntityProps): UserPreferencesEntity {
    return new UserPreferencesEntity(props);
  }

  // ─── Getters ────────────────────────────────────────────────
  get theme(): ThemePreference { return this._theme; }
  get currency(): string { return this._currency; }
  get dateFormat(): string { return this._dateFormat; }
  get reduceMotion(): boolean { return this._reduceMotion; }

  // ─── Mutations ──────────────────────────────────────────────
  setTheme(theme: ThemePreference): void {
    if (!['light', 'dark', 'system'].includes(theme)) {
      throw new Error('Invalid theme');
    }
    this._theme = theme;
  }

  setCurrency(currency: string): void {
    if (currency.length !== 3) {
      throw new Error('Currency must be ISO 4217 (3 letters)');
    }
    this._currency = currency.toUpperCase();
  }

  setReduceMotion(value: boolean): void {
    this._reduceMotion = value;
  }
}
