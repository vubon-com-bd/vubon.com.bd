/**
 * Payout, Settlement, Invoice, Subscription, Commission — bulk
 */
import { jest } from '@jest/globals';
import { VendorPayoutPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-payout.prisma.repository.js';
import { VendorSettlementPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-settlement.prisma.repository.js';
import { VendorInvoicePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-invoice.prisma.repository.js';
import { VendorSubscriptionPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-subscription.prisma.repository.js';
import { VendorCommissionPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-commission.prisma.repository.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');

function mk() {
  return {
    findFirst: jest.fn().mockResolvedValue(null),
    findMany: jest.fn().mockResolvedValue([]),
    count: jest.fn().mockResolvedValue(0),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    groupBy: jest.fn().mockResolvedValue([]),
    aggregate: jest.fn().mockResolvedValue({ _avg: {}, _sum: {} }),
  };
}

function makePrisma() {
  return {
    vendorPayout: mk(), vendorSettlement: mk(), vendorInvoice: mk(),
    vendorSubscription: mk(), vendorCommission: mk(),
  } as never;
}

describe('VendorPayoutPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorPayoutPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorPayoutPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => expect(await repo.findByVendorId(UUID)).toEqual([]));
  it('findByStatus delegates', async () => expect(await repo.findByStatus({ value: 'pending' } as never)).toEqual([]));
  it('findByMethod delegates', async () => expect(await repo.findByMethod({ value: 'bank_transfer' } as never)).toEqual([]));
  it('findByNumber delegates', async () => expect(await repo.findByNumber('PO-X')).toBeNull());
  it('findPaginated returns result', async () => {
    const r = await repo.findPaginated({ page: 1, limit: 20 });
    expect(r.total).toBe(0);
  });
  it('findActive delegates', async () => expect(await repo.findActive()).toEqual([]));
  it('findProcessingPastSla delegates', async () => expect(await repo.findProcessingPastSla(48)).toEqual([]));
  it('countTodayByVendor returns 0', async () => expect(await repo.countTodayByVendor(UUID)).toBe(0));
  it('getSummary returns summary', async () => {
    const r = await repo.getSummary(UUID);
    expect(r.vendorId).toBe(UUID);
    expect(r.totalPaid).toBe(0);
  });
  it('sumPaidBetween returns 0', async () => expect(await repo.sumPaidBetween(UUID, 'x', 'y')).toBe(0));
  it('countByStatus returns 0', async () => expect(await repo.countByStatus({ value: 'pending' } as never)).toBe(0));
});

describe('VendorSettlementPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorSettlementPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorSettlementPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => expect(await repo.findByVendorId(UUID)).toEqual([]));
  it('findByStatus delegates', async () => expect(await repo.findByStatus('pending')).toEqual([]));
  it('findByNumber delegates', async () => expect(await repo.findByNumber('ST-X')).toBeNull());
  it('findByPayoutId delegates', async () => expect(await repo.findByPayoutId(UUID)).toEqual([]));
  it('findPendingReady delegates', async () => expect(await repo.findPendingReady()).toEqual([]));
  it('findLatestByVendorId delegates', async () => expect(await repo.findLatestByVendorId(UUID)).toBeNull());
  it('sumNetBetween returns 0', async () => expect(await repo.sumNetBetween(UUID, 'x', 'y')).toBe(0));
});

describe('VendorInvoicePrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorInvoicePrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorInvoicePrismaRepository(prisma); });

  it('findByVendorId delegates', async () => expect(await repo.findByVendorId(UUID)).toEqual([]));
  it('findByStatus delegates', async () => expect(await repo.findByStatus({ value: 'draft' } as never)).toEqual([]));
  it('findByType delegates', async () => expect(await repo.findByType({ value: 'commission' } as never)).toEqual([]));
  it('findByNumber delegates', async () => expect(await repo.findByNumber('INV-X')).toBeNull());
  it('findByOrderId delegates', async () => expect(await repo.findByOrderId(UUID)).toEqual([]));
  it('findOverdue delegates', async () => expect(await repo.findOverdue()).toEqual([]));
  it('findDueWithin delegates', async () => expect(await repo.findDueWithin(7)).toEqual([]));
  it('findUnpaidByVendorId delegates', async () => expect(await repo.findUnpaidByVendorId(UUID)).toEqual([]));
  it('sumUnpaidByVendorId returns 0', async () => expect(await repo.sumUnpaidByVendorId(UUID)).toBe(0));
  it('existsByNumber false', async () => expect(await repo.existsByNumber('INV-X')).toBe(false));
});

describe('VendorSubscriptionPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorSubscriptionPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorSubscriptionPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => expect(await repo.findByVendorId(UUID)).toBeNull());
  it('existsByVendorId false', async () => expect(await repo.existsByVendorId(UUID)).toBe(false));
  it('findByStatus delegates', async () => expect(await repo.findByStatus({ value: 'active' } as never)).toEqual([]));
  it('findByPlan delegates', async () => expect(await repo.findByPlan({ value: 'basic' } as never)).toEqual([]));
  it('findRenewingWithin delegates', async () => expect(await repo.findRenewingWithin(7)).toEqual([]));
  it('findTrialsEndingWithin delegates', async () => expect(await repo.findTrialsEndingWithin(7)).toEqual([]));
  it('findExpiredButActive delegates', async () => expect(await repo.findExpiredButActive()).toEqual([]));
  it('findPastDue delegates', async () => expect(await repo.findPastDue()).toEqual([]));
  it('countByStatus returns 0', async () => expect(await repo.countByStatus({ value: 'active' } as never)).toBe(0));
  it('countByPlan returns 0', async () => expect(await repo.countByPlan({ value: 'basic' } as never)).toBe(0));
  it('getStats returns object', async () => {
    const r = await repo.getStats();
    expect(r.totalActive).toBe(0);
    expect(r.mrr).toBe(0);
  });
});

describe('VendorCommissionPrismaRepository', () => {
  let prisma: ReturnType<typeof makePrisma>; let repo: VendorCommissionPrismaRepository;
  beforeEach(() => { prisma = makePrisma(); repo = new VendorCommissionPrismaRepository(prisma); });

  it('findByVendorId delegates', async () => expect(await repo.findByVendorId(UUID)).toEqual([]));
  it('findActiveByVendorId delegates', async () => expect(await repo.findActiveByVendorId(UUID)).toBeNull());
  it('findActiveAt delegates', async () => expect(await repo.findActiveAt(UUID, new Date())).toBeNull());
  it('findByType delegates', async () => expect(await repo.findByType('percentage')).toEqual([]));
  it('findHistoryByVendorId delegates', async () => expect(await repo.findHistoryByVendorId(UUID)).toEqual([]));
  it('findExpiredButActive delegates', async () => expect(await repo.findExpiredButActive()).toEqual([]));
  it('getAveragePercent returns 0', async () => expect(await repo.getAveragePercent()).toBe(0));
  it('countActiveByVendor returns 0', async () => expect(await repo.countActiveByVendor(UUID)).toBe(0));
  it('deactivateAllForVendor calls updateMany', async () => {
    await repo.deactivateAllForVendor(UUID);
    expect((prisma as never as { vendorCommission: { updateMany: jest.Mock } }).vendorCommission.updateMany).toHaveBeenCalled();
  });
});
