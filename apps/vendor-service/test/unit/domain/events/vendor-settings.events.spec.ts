import {
  VENDOR_SETTINGS_EVENT_TYPE,
  VendorSettingsCreatedEvent,
  VendorVacationEnabledEvent,
  VendorVacationDisabledEvent,
  VendorAutoAcceptChangedEvent,
  VendorAutoPayoutChangedEvent,
  VendorSettingsNotificationsUpdatedEvent,
  VendorSettingsLocaleUpdatedEvent,
} from '../../../../src/module/domain/events/vendor-settings.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('Vendor settings events', () => {
  it('constants defined', () => {
    expect(VENDOR_SETTINGS_EVENT_TYPE.CREATED).toBe('vendor.settings.created');
    expect(VENDOR_SETTINGS_EVENT_TYPE.VACATION_ENABLED).toBe('vendor.settings.vacation_enabled');
  });

  it('VendorSettingsCreatedEvent', () => {
    const e = new VendorSettingsCreatedEvent({
      aggregateId: UUID,
      payload: { settingsId: UUID, vendorId: UUID, createdAt: NOW },
    });
    expect(e.type).toBe('vendor.settings.created');
    expect(e.aggregateType).toBe('VendorSettings');
  });

  it('VendorVacationEnabledEvent', () => {
    const e = new VendorVacationEnabledEvent({
      aggregateId: UUID,
      payload: { settingsId: UUID, vendorId: UUID, message: 'Back soon', changedAt: NOW },
    });
    expect(e.type).toBe('vendor.settings.vacation_enabled');
  });

  it('VendorVacationDisabledEvent', () => {
    const e = new VendorVacationDisabledEvent({
      aggregateId: UUID,
      payload: { settingsId: UUID, vendorId: UUID, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.settings.vacation_disabled');
  });

  it('VendorAutoAcceptChangedEvent', () => {
    const e = new VendorAutoAcceptChangedEvent({
      aggregateId: UUID,
      payload: { settingsId: UUID, vendorId: UUID, enabled: true, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.settings.auto_accept_changed');
    expect(e.payload.enabled).toBe(true);
  });

  it('VendorAutoPayoutChangedEvent', () => {
    const e = new VendorAutoPayoutChangedEvent({
      aggregateId: UUID,
      payload: { settingsId: UUID, vendorId: UUID, enabled: false, changedAt: NOW },
    });
    expect(e.type).toBe('vendor.settings.auto_payout_changed');
  });

  it('VendorSettingsNotificationsUpdatedEvent', () => {
    const e = new VendorSettingsNotificationsUpdatedEvent({
      aggregateId: UUID,
      payload: {
        settingsId: UUID, vendorId: UUID,
        preferences: { smsEnabled: true },
        updatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.settings.notifications_updated');
  });

  it('VendorSettingsLocaleUpdatedEvent', () => {
    const e = new VendorSettingsLocaleUpdatedEvent({
      aggregateId: UUID,
      payload: {
        settingsId: UUID, vendorId: UUID,
        timezone: 'Asia/Dhaka', locale: 'bn-BD', updatedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.settings.locale_updated');
  });
});
