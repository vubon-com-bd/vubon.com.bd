/**
 * Vendor Settings domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorSettings';

export const VENDOR_SETTINGS_EVENT_TYPE = {
  CREATED: 'vendor.settings.created',
  VACATION_ENABLED: 'vendor.settings.vacation_enabled',
  VACATION_DISABLED: 'vendor.settings.vacation_disabled',
  AUTO_ACCEPT_CHANGED: 'vendor.settings.auto_accept_changed',
  AUTO_PAYOUT_CHANGED: 'vendor.settings.auto_payout_changed',
  NOTIFICATIONS_UPDATED: 'vendor.settings.notifications_updated',
  LOCALE_UPDATED: 'vendor.settings.locale_updated',
} as const;

export interface VendorSettingsCreatedPayload {
  readonly settingsId: string;
  readonly vendorId: string;
  readonly createdAt: string;
}
export interface VendorVacationToggledPayload {
  readonly settingsId: string;
  readonly vendorId: string;
  readonly message?: string;
  readonly changedAt: string;
}
export interface VendorSettingsToggleChangedPayload {
  readonly settingsId: string;
  readonly vendorId: string;
  readonly enabled: boolean;
  readonly changedAt: string;
}
export interface VendorSettingsNotificationsUpdatedPayload {
  readonly settingsId: string;
  readonly vendorId: string;
  readonly preferences: Readonly<Record<string, boolean>>;
  readonly updatedAt: string;
}
export interface VendorSettingsLocaleUpdatedPayload {
  readonly settingsId: string;
  readonly vendorId: string;
  readonly timezone: string;
  readonly locale: string;
  readonly updatedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};
function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorSettingsCreatedEvent extends BaseDomainEvent<typeof VENDOR_SETTINGS_EVENT_TYPE.CREATED, VendorSettingsCreatedPayload> {
  constructor(p: EventParams<VendorSettingsCreatedPayload>) { super(buildParams(VENDOR_SETTINGS_EVENT_TYPE.CREATED, p)); }
}
export class VendorVacationEnabledEvent extends BaseDomainEvent<typeof VENDOR_SETTINGS_EVENT_TYPE.VACATION_ENABLED, VendorVacationToggledPayload> {
  constructor(p: EventParams<VendorVacationToggledPayload>) { super(buildParams(VENDOR_SETTINGS_EVENT_TYPE.VACATION_ENABLED, p)); }
}
export class VendorVacationDisabledEvent extends BaseDomainEvent<typeof VENDOR_SETTINGS_EVENT_TYPE.VACATION_DISABLED, VendorVacationToggledPayload> {
  constructor(p: EventParams<VendorVacationToggledPayload>) { super(buildParams(VENDOR_SETTINGS_EVENT_TYPE.VACATION_DISABLED, p)); }
}
export class VendorAutoAcceptChangedEvent extends BaseDomainEvent<typeof VENDOR_SETTINGS_EVENT_TYPE.AUTO_ACCEPT_CHANGED, VendorSettingsToggleChangedPayload> {
  constructor(p: EventParams<VendorSettingsToggleChangedPayload>) { super(buildParams(VENDOR_SETTINGS_EVENT_TYPE.AUTO_ACCEPT_CHANGED, p)); }
}
export class VendorAutoPayoutChangedEvent extends BaseDomainEvent<typeof VENDOR_SETTINGS_EVENT_TYPE.AUTO_PAYOUT_CHANGED, VendorSettingsToggleChangedPayload> {
  constructor(p: EventParams<VendorSettingsToggleChangedPayload>) { super(buildParams(VENDOR_SETTINGS_EVENT_TYPE.AUTO_PAYOUT_CHANGED, p)); }
}
export class VendorSettingsNotificationsUpdatedEvent extends BaseDomainEvent<typeof VENDOR_SETTINGS_EVENT_TYPE.NOTIFICATIONS_UPDATED, VendorSettingsNotificationsUpdatedPayload> {
  constructor(p: EventParams<VendorSettingsNotificationsUpdatedPayload>) { super(buildParams(VENDOR_SETTINGS_EVENT_TYPE.NOTIFICATIONS_UPDATED, p)); }
}
export class VendorSettingsLocaleUpdatedEvent extends BaseDomainEvent<typeof VENDOR_SETTINGS_EVENT_TYPE.LOCALE_UPDATED, VendorSettingsLocaleUpdatedPayload> {
  constructor(p: EventParams<VendorSettingsLocaleUpdatedPayload>) { super(buildParams(VENDOR_SETTINGS_EVENT_TYPE.LOCALE_UPDATED, p)); }
}
