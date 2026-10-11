/**
 * PreferenceEntity — user notification preferences
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_PREFERENCE } from '@vubon/shared-constants/platform/notification';

import { PreferenceIdVO } from '../value-objects/primitives/preference-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

import {
  PreferenceCreatedEvent,
  PreferenceUpdatedEvent,
  PreferenceChannelToggledEvent,
  PreferenceCategoryToggledEvent,
  PreferenceQuietHoursUpdatedEvent,
  PreferenceOptedOutEvent,
  PreferenceOptedInEvent,
} from '../events/preference.events.js';

export interface PreferenceEntityProps {
  readonly userId: string;
  readonly channelPreferences: Readonly<Record<string, boolean>>;
  readonly categoryPreferences: Readonly<Record<string, boolean>>;
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale?: string;
}

export class PreferenceEntity extends AggregateRoot<string> {
  private _channelPreferences: Readonly<Record<string, boolean>>;
  private _categoryPreferences: Readonly<Record<string, boolean>>;
  private _quietHoursEnabled: boolean;
  private _quietHoursStart?: number;
  private _quietHoursEnd?: number;
  private _locale?: string;

  private readonly _userId: string;
  private readonly _timezone: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PreferenceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._channelPreferences = Object.freeze({ ...props.channelPreferences });
    this._categoryPreferences = Object.freeze({ ...props.categoryPreferences });
    this._quietHoursEnabled = props.quietHoursEnabled;
    this._quietHoursStart = props.quietHoursStart;
    this._quietHoursEnd = props.quietHoursEnd;
    this._timezone = props.timezone;
    this._locale = props.locale;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._quietHoursEnabled) {
      if (this._quietHoursStart === undefined || this._quietHoursEnd === undefined) {
        throw new ValidationError(
          'Quiet hours enabled requires start and end hour',
          'quietHours',
        );
      }
      if (this._quietHoursStart < 0 || this._quietHoursStart > 23) {
        throw new ValidationError('quietHoursStart must be 0-23', 'quietHoursStart');
      }
      if (this._quietHoursEnd < 0 || this._quietHoursEnd > 23) {
        throw new ValidationError('quietHoursEnd must be 0-23', 'quietHoursEnd');
      }
    }
  }

  get userId(): string { return this._userId; }
  get channelPreferences(): Readonly<Record<string, boolean>> { return this._channelPreferences; }
  get categoryPreferences(): Readonly<Record<string, boolean>> { return this._categoryPreferences; }
  get quietHoursEnabled(): boolean { return this._quietHoursEnabled; }
  get quietHoursStart(): number | undefined { return this._quietHoursStart; }
  get quietHoursEnd(): number | undefined { return this._quietHoursEnd; }
  get timezone(): string { return this._timezone; }
  get locale(): string | undefined { return this._locale; }

  get toIdVO(): PreferenceIdVO { return PreferenceIdVO.reconstitute(this.id); }
  get toUserIdVO(): UserIdVO { return UserIdVO.reconstitute(this._userId); }

  isChannelEnabled(channel: string): boolean {
    return this._channelPreferences[channel] ?? true;
  }

  isCategoryEnabled(category: string): boolean {
    return this._categoryPreferences[category] ?? true;
  }

  isInQuietHours(hour: number): boolean {
    if (!this._quietHoursEnabled) return false;
    const s = this._quietHoursStart ?? 22;
    const e = this._quietHoursEnd ?? 8;
    if (s === e) return false;
    if (s < e) return hour >= s && hour < e;
    return hour >= s || hour < e;
  }

  // ═══ Business Methods ═══
  toggleChannel(
    channel: string,
    enabled: boolean,
    now: string = new Date().toISOString(),
  ): void {
    this._channelPreferences = Object.freeze({
      ...this._channelPreferences,
      [channel]: enabled,
    });
    this.addDomainEvent(
      new PreferenceChannelToggledEvent({
        aggregateId: this.id,
        payload: { preferenceId: this.id, userId: this._userId, channel, enabled },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  toggleCategory(
    category: string,
    enabled: boolean,
    now: string = new Date().toISOString(),
  ): void {
    this._categoryPreferences = Object.freeze({
      ...this._categoryPreferences,
      [category]: enabled,
    });
    this.addDomainEvent(
      new PreferenceCategoryToggledEvent({
        aggregateId: this.id,
        payload: { preferenceId: this.id, userId: this._userId, category, enabled },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateQuietHours(
    enabled: boolean,
    startHour: number | undefined,
    endHour: number | undefined,
    now: string = new Date().toISOString(),
  ): void {
    if (enabled) {
      if (startHour === undefined || endHour === undefined) {
        throw new ValidationError(
          'Quiet hours enabled requires start and end hour',
          'quietHours',
        );
      }
      if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
        throw new ValidationError('Quiet hours must be 0-23', 'quietHours');
      }
    }
    this._quietHoursEnabled = enabled;
    this._quietHoursStart = startHour;
    this._quietHoursEnd = endHour;
    this.addDomainEvent(
      new PreferenceQuietHoursUpdatedEvent({
        aggregateId: this.id,
        payload: {
          preferenceId: this.id,
          userId: this._userId,
          startHour: startHour ?? 0,
          endHour: endHour ?? 0,
          timezone: this._timezone,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  optOut(scope: string, reason?: string, now: string = new Date().toISOString()): void {
    this._channelPreferences = Object.freeze({
      ...this._channelPreferences,
      [scope]: false,
    });
    this.addDomainEvent(
      new PreferenceOptedOutEvent({
        aggregateId: this.id,
        payload: { preferenceId: this.id, userId: this._userId, scope, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  optIn(scope: string, now: string = new Date().toISOString()): void {
    this._channelPreferences = Object.freeze({
      ...this._channelPreferences,
      [scope]: true,
    });
    this.addDomainEvent(
      new PreferenceOptedInEvent({
        aggregateId: this.id,
        payload: { preferenceId: this.id, userId: this._userId, scope },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateLocale(locale: string, now: string = new Date().toISOString()): void {
    this._locale = locale;
    this.addDomainEvent(
      new PreferenceUpdatedEvent({
        aggregateId: this.id,
        payload: {
          preferenceId: this.id,
          userId: this._userId,
          changedFields: ['locale'],
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static createDefault(params: {
    id: string;
    userId: string;
    timezone?: string;
    locale?: string;
    now: string;
  }): PreferenceEntity {
    const channelPreferences: Record<string, boolean> = {
      email: true,
      sms: false,
      push: true,
      in_app: true,
      webhook: false,
      whatsapp: false,
    };
    const categoryPreferences: Record<string, boolean> = {
      marketing: false,
      promotion: false,
      order: true,
      payment: true,
      shipping: true,
      security: true,
      system: true,
    };
    const fullProps: PreferenceEntityProps = {
      userId: params.userId,
      channelPreferences,
      categoryPreferences,
      quietHoursEnabled: NOTIFICATION_PREFERENCE.QUIET_HOURS_ENABLED,
      quietHoursStart: NOTIFICATION_PREFERENCE.QUIET_HOURS_START,
      quietHoursEnd: NOTIFICATION_PREFERENCE.QUIET_HOURS_END,
      timezone: params.timezone ?? NOTIFICATION_PREFERENCE.TIMEZONE_DEFAULT,
      locale: params.locale ?? NOTIFICATION_PREFERENCE.LOCALE_FALLBACK,
    };
    const entity = new PreferenceEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new PreferenceCreatedEvent({
        aggregateId: params.id,
        payload: { preferenceId: params.id, userId: params.userId },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: PreferenceEntityProps;
    version?: number;
  }): PreferenceEntity {
    const entity = new PreferenceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
