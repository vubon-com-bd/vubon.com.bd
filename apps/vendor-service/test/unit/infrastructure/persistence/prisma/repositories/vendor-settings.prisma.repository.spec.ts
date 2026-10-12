import { jest } from '@jest/globals';
import { VendorSettingsPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-settings.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const DEFAULT_NOTIFS = {
  orderAlerts: true, payoutAlerts: true, reviewAlerts: true, stockAlerts: true,
  emailEnabled: true, smsEnabled: false, pushEnabled: true,
};

function makeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID,
    vendorId: UUID,
    autoAcceptOrders: false,
    autoConfirmPayout: false,
    vacationMode: false,
    vacationMessage: null,
    timezone: 'Asia/Dhaka',
    locale: 'bn-BD',
    currency: 'BDT',
    notifications: DEFAULT_NOTIFS,
    version: 0,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

describe('VendorSettingsPrismaRepository', () => {
  let repo: VendorSettingsPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    prisma = createMockPrisma();
    repo = new VendorSettingsPrismaRepository(prisma.prisma);
  });

  it('findById', async () => {
    prisma.mock.vendorSettings.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });

  it('findById null', async () => {
    prisma.mock.vendorSettings.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });

  it('findAll', async () => {
    prisma.mock.vendorSettings.findMany.mockResolvedValue([makeRow()]);
    expect((await repo.findAll()).length).toBe(1);
  });

  it('findByVendorId', async () => {
    prisma.mock.vendorSettings.findFirst.mockResolvedValue(makeRow());
    expect((await repo.findByVendorId(UUID))?.vendorId).toBe(UUID);
  });

  it('existsByVendorId true', async () => {
    prisma.mock.vendorSettings.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });

  it('upsert creates', async () => {
    prisma.mock.vendorSettings.findFirst.mockResolvedValue(null);
    prisma.mock.vendorSettings.create.mockResolvedValue(makeRow());
    const { VendorSettingsEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-settings.entity.js'
    );
    const entity = VendorSettingsEntity.create({
      id: UUID, vendorId: UUID, currency: 'BDT', now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });

  it('upsert updates', async () => {
    prisma.mock.vendorSettings.findFirst.mockResolvedValue(makeRow());
    prisma.mock.vendorSettings.update.mockResolvedValue(makeRow());
    const { VendorSettingsEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-settings.entity.js'
    );
    const entity = VendorSettingsEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID, autoAcceptOrders: false, autoConfirmPayout: false,
        vacationMode: false, vacationMessage: undefined,
        timezone: 'Asia/Dhaka', locale: 'bn-BD', currency: 'BDT',
        notifications: DEFAULT_NOTIFS,
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorSettings.update).toHaveBeenCalled();
  });

  it('delete', async () => {
    prisma.mock.vendorSettings.delete.mockResolvedValue(makeRow());
    await repo.delete(UUID);
    expect(prisma.mock.vendorSettings.delete).toHaveBeenCalled();
  });

  it('exists true', async () => {
    prisma.mock.vendorSettings.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });

  it('findOnVacation', async () => {
    prisma.mock.vendorSettings.findMany.mockResolvedValue([
      makeRow({ vacationMode: true, vacationMessage: 'Back soon' }),
    ]);
    expect((await repo.findOnVacation()).length).toBe(1);
  });

  it('findAutoAccept', async () => {
    prisma.mock.vendorSettings.findMany.mockResolvedValue([makeRow({ autoAcceptOrders: true })]);
    expect((await repo.findAutoAccept()).length).toBe(1);
  });
});
