import { VendorSettingsPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-settings.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function makeRow(overrides: Record<string, unknown> = {}): never {
  return {
    id: UUID,
    vendorId: UUID,
    autoAcceptOrders: true,
    autoConfirmPayout: false,
    vacationMode: false,
    vacationMessage: null,
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
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  } as never;
}

describe('VendorSettingsPrismaMapper', () => {
  it('maps all fields', () => {
    const e = VendorSettingsPrismaMapper.toDomain(makeRow());
    expect(e.vendorId).toBe(UUID);
    expect(e.autoAcceptOrders).toBe(true);
    expect(e.autoConfirmPayout).toBe(false);
    expect(e.timezone).toBe('Asia/Dhaka');
    expect(e.locale).toBe('bn-BD');
    expect(e.currency).toBe('BDT');
  });

  it('maps notifications', () => {
    const e = VendorSettingsPrismaMapper.toDomain(makeRow());
    expect(e.notifications.orderAlerts).toBe(true);
    expect(e.notifications.smsEnabled).toBe(false);
  });

  it('handles vacation mode', () => {
    const e = VendorSettingsPrismaMapper.toDomain(
      makeRow({ vacationMode: true, vacationMessage: 'Back soon' }),
    );
    expect(e.vacationMode).toBe(true);
    expect(e.vacationMessage).toBe('Back soon');
  });

  it('toPersistence roundtrip', () => {
    const domain = VendorSettingsPrismaMapper.toDomain(makeRow());
    const persisted = VendorSettingsPrismaMapper.toPersistence(domain);
    expect(persisted.autoAcceptOrders).toBe(true);
    expect(persisted.currency).toBe('BDT');
  });
});
