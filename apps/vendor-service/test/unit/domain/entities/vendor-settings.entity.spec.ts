/**
 * VendorSettingsEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorSettingsEntity } from '../../../../src/module/domain/entities/vendor-settings.entity.js';
import type { VendorNotificationPrefs } from '../../../../src/module/domain/entities/vendor-settings.entity.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';

function makeSettings() {
  return VendorSettingsEntity.create({
    id: UUID,
    vendorId: VENDOR,
    currency: 'BDT',
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { deletedAt, ...propsOverrides } = overrides as {
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorSettingsEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      autoAcceptOrders: false,
      autoConfirmPayout: false,
      vacationMode: false,
      timezone: 'Asia/Dhaka',
      locale: 'bn-BD',
      currency: 'BDT',
      notifications: {
        orderAlerts: true,
        payoutAlerts: true,
        reviewAlerts: true,
        stockAlerts: true,
        emailEnabled: true,
        smsEnabled: false,
        pushEnabled: true,
      },
      ...propsOverrides,
    } as never,
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorSettingsEntity — creation', () => {
  it('creates with defaults', () => {
    const s = makeSettings();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.currency).toBe('BDT');
    expect(s.vacationMode).toBe(false);
    expect(s.autoAcceptOrders).toBe(false);
  });

  it('creates with custom timezone/locale', () => {
    const s = VendorSettingsEntity.create({
      id: UUID,
      vendorId: VENDOR,
      currency: 'BDT',
      timezone: 'UTC',
      locale: 'en-US',
      now: NOW,
    });
    expect(s.timezone).toBe('UTC');
    expect(s.locale).toBe('en-US');
  });
});

describe('VendorSettingsEntity — invariants', () => {
  it('rejects invalid currency length', () => {
    expect(() => reconstitute({ currency: 'AB' })).toThrow();
  });

  it('rejects vacation message > 500 chars', () => {
    expect(() =>
      reconstitute({
        vacationMode: true,
        vacationMessage: 'x'.repeat(501),
      }),
    ).toThrow();
  });

  it('rejects vacation mode without message', () => {
    expect(() =>
      reconstitute({
        vacationMode: true,
        vacationMessage: undefined,
      }),
    ).toThrow();
  });
});

describe('VendorSettingsEntity — getters', () => {
  it('returns scalar getters', () => {
    const s = makeSettings();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.autoAcceptOrders).toBe(false);
    expect(s.autoConfirmPayout).toBe(false);
    expect(s.vacationMode).toBe(false);
    expect(s.vacationMessage).toBeUndefined();
    expect(s.timezone).toBe('Asia/Dhaka');
    expect(s.locale).toBe('bn-BD');
    expect(s.currency).toBe('BDT');
    expect(s.notifications.emailEnabled).toBe(true);
  });
});

describe('VendorSettingsEntity — predicates', () => {
  it('isOnVacation false normally', () => {
    expect(makeSettings().isOnVacation()).toBe(false);
  });

  it('isOnVacation true when enabled', () => {
    const s = reconstitute({
      vacationMode: true,
      vacationMessage: 'Away for the holidays',
    });
    expect(s.isOnVacation()).toBe(true);
  });

  it('isAcceptingOrders false when on vacation', () => {
    const s = reconstitute({
      vacationMode: true,
      vacationMessage: 'Away',
      autoAcceptOrders: true,
    });
    expect(s.isAcceptingOrders()).toBe(false);
  });

  it('isAcceptingOrders requires autoAccept + not vacation', () => {
    const s = reconstitute({ autoAcceptOrders: true });
    expect(s.isAcceptingOrders()).toBe(true);
  });

  it('isAcceptingOrders false when autoAccept off', () => {
    expect(makeSettings().isAcceptingOrders()).toBe(false);
  });
});

describe('VendorSettingsEntity — toggleVacation', () => {
  it('enables vacation with message', () => {
    const s = makeSettings();
    s.toggleVacation(true, 'Away until Jan 15', NOW);
    expect(s.vacationMode).toBe(true);
    expect(s.vacationMessage).toBe('Away until Jan 15');
  });

  it('disables vacation', () => {
    const s = reconstitute({
      vacationMode: true,
      vacationMessage: 'Away',
    });
    s.toggleVacation(false, undefined, NOW);
    expect(s.vacationMode).toBe(false);
    expect(s.vacationMessage).toBeUndefined();
  });

  it('throws when enabling without message', () => {
    const s = makeSettings();
    expect(() => s.toggleVacation(true, undefined, NOW)).toThrow();
    expect(() => s.toggleVacation(true, '', NOW)).toThrow();
  });
});

describe('VendorSettingsEntity — setAutoAcceptOrders', () => {
  it('enables auto-accept', () => {
    const s = makeSettings();
    s.setAutoAcceptOrders(true, NOW);
    expect(s.autoAcceptOrders).toBe(true);
  });

  it('disables auto-accept', () => {
    const s = reconstitute({ autoAcceptOrders: true });
    s.setAutoAcceptOrders(false, NOW);
    expect(s.autoAcceptOrders).toBe(false);
  });
});

describe('VendorSettingsEntity — setAutoConfirmPayout', () => {
  it('enables auto-payout', () => {
    const s = makeSettings();
    s.setAutoConfirmPayout(true, NOW);
    expect(s.autoConfirmPayout).toBe(true);
  });
});

describe('VendorSettingsEntity — updateNotifications', () => {
  it('partially updates notifications', () => {
    const s = makeSettings();
    s.updateNotifications({ smsEnabled: true }, NOW);
    expect(s.notifications.smsEnabled).toBe(true);
    expect(s.notifications.emailEnabled).toBe(true); // unchanged
  });

  it('updates multiple prefs', () => {
    const s = makeSettings();
    s.updateNotifications(
      { emailEnabled: false, pushEnabled: false, orderAlerts: false },
      NOW,
    );
    expect(s.notifications.emailEnabled).toBe(false);
    expect(s.notifications.pushEnabled).toBe(false);
  });
});

describe('VendorSettingsEntity — updateLocale', () => {
  it('updates timezone and locale', () => {
    const s = makeSettings();
    s.updateLocale('UTC', 'en-US', NOW);
    expect(s.timezone).toBe('UTC');
    expect(s.locale).toBe('en-US');
  });

  it('throws on empty timezone', () => {
    const s = makeSettings();
    expect(() => s.updateLocale('', 'en-US', NOW)).toThrow();
  });

  it('throws on timezone too long', () => {
    const s = makeSettings();
    expect(() => s.updateLocale('x'.repeat(61), 'en-US', NOW)).toThrow();
  });

  it('throws on empty locale', () => {
    const s = makeSettings();
    expect(() => s.updateLocale('UTC', '', NOW)).toThrow();
  });

  it('throws on locale too long', () => {
    const s = makeSettings();
    expect(() => s.updateLocale('UTC', 'x'.repeat(11), NOW)).toThrow();
  });
});

describe('VendorSettingsEntity — reconstitute coverage', () => {
  it('reconstitute with deletedAt', () => {
    const s = reconstitute({ deletedAt: NOW });
    expect(s.deletedAt).toBe(NOW);
  });
});
