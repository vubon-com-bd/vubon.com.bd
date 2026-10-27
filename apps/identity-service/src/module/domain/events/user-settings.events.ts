/**
 * User Settings Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const USER_SETTINGS_EVENT_TYPE = {
  CREATED: 'identity.user.settings_created',
  UPDATED: 'identity.user.settings_updated',
  THEME_CHANGED: 'identity.user.settings_theme_changed',
  LANGUAGE_CHANGED: 'identity.user.settings_language_changed',
} as const;

export interface UserSettingsCreatedPayload {
  readonly userId: string;
  readonly createdAt: string;
}

export interface UserSettingsUpdatedPayload {
  readonly userId: string;
  readonly fields: readonly string[];
  readonly updatedAt: string;
}

export interface UserSettingsThemePayload {
  readonly userId: string;
  readonly fromTheme: string;
  readonly toTheme: string;
  readonly changedAt: string;
}

export interface UserSettingsLanguagePayload {
  readonly userId: string;
  readonly fromLanguage: string;
  readonly toLanguage: string;
  readonly changedAt: string;
}

export class UserSettingsCreatedEvent extends BaseDomainEvent<
  typeof USER_SETTINGS_EVENT_TYPE.CREATED,
  UserSettingsCreatedPayload
> {
  constructor(p: BaseEventParams<UserSettingsCreatedPayload>) {
    super(buildEventParams(USER_SETTINGS_EVENT_TYPE.CREATED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserSettingsUpdatedEvent extends BaseDomainEvent<
  typeof USER_SETTINGS_EVENT_TYPE.UPDATED,
  UserSettingsUpdatedPayload
> {
  constructor(p: BaseEventParams<UserSettingsUpdatedPayload>) {
    super(buildEventParams(USER_SETTINGS_EVENT_TYPE.UPDATED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserSettingsThemeChangedEvent extends BaseDomainEvent<
  typeof USER_SETTINGS_EVENT_TYPE.THEME_CHANGED,
  UserSettingsThemePayload
> {
  constructor(p: BaseEventParams<UserSettingsThemePayload>) {
    super(buildEventParams(USER_SETTINGS_EVENT_TYPE.THEME_CHANGED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserSettingsLanguageChangedEvent extends BaseDomainEvent<
  typeof USER_SETTINGS_EVENT_TYPE.LANGUAGE_CHANGED,
  UserSettingsLanguagePayload
> {
  constructor(p: BaseEventParams<UserSettingsLanguagePayload>) {
    super(buildEventParams(USER_SETTINGS_EVENT_TYPE.LANGUAGE_CHANGED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}
