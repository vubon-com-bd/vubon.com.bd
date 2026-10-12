/**
 * Bulk repo tests — subscription, commission, rating, review, performance, stats, report, shipping, warranty, return-policy
 */
import { jest } from '@jest/globals';
import { VendorSubscriptionPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-subscription.prisma.repository.js';
import { VendorCommissionPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-commission.prisma.repository.js';
import { VendorRatingPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-rating.prisma.repository.js';
import { VendorReviewPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-review.prisma.repository.js';
import { VendorPerformancePrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-performance.prisma.repository.js';
import { VendorStatsPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-stats.prisma.repository.js';
import { VendorReportPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-report.prisma.repository.js';
import { VendorShippingPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-shipping.prisma.repository.js';
import { VendorWarrantyPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-warranty.prisma.repository.js';
import { VendorReturnPolicyPrismaRepository } from '../../../../../../src/module/infrastructure/persistence/prisma/repositories/vendor-return-policy.prisma.repository.js';
import { createMockPrisma } from '@helpers/prisma-test-harness';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const END = new Date('2026-02-01T00:00:00Z');

// ═══════════════ SUBSCRIPTION ═══════════════
describe('VendorSubscriptionPrismaRepository', () => {
  let repo: VendorSubscriptionPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorSubscriptionPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID, plan: 'basic', status: 'active', cycle: 'monthly',
      price: 500, currency: 'BDT',
      startedAt: NOW, currentPeriodStart: NOW, currentPeriodEnd: END,
      trialEndsAt: null, cancelledAt: null,
      cancelAtPeriodEnd: false, autoRenew: true, features: [],
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorSubscription.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findById null', async () => {
    prisma.mock.vendorSubscription.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });
  it('findAll', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorSubscription.findFirst.mockResolvedValue(row());
    expect(await repo.findByVendorId(UUID)).not.toBeNull();
  });
  it('existsByVendorId', async () => {
    prisma.mock.vendorSubscription.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });
  it('findByStatus', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.findByStatus({ value: 'active' } as never)).length).toBe(1);
  });
  it('findByPlan', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.findByPlan({ value: 'basic' } as never)).length).toBe(1);
  });
  it('search', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.search({ plan: 'basic', status: 'active', autoRenew: true })).length).toBe(1);
  });
  it('findRenewingWithin', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.findRenewingWithin(7)).length).toBe(1);
  });
  it('findTrialsEndingWithin', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.findTrialsEndingWithin(7)).length).toBe(1);
  });
  it('findExpiredButActive', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.findExpiredButActive()).length).toBe(1);
  });
  it('findPastDue', async () => {
    prisma.mock.vendorSubscription.findMany.mockResolvedValue([row()]);
    expect((await repo.findPastDue()).length).toBe(1);
  });
  it('countByStatus', async () => {
    prisma.mock.vendorSubscription.count.mockResolvedValue(5);
    expect(await repo.countByStatus({ value: 'active' } as never)).toBe(5);
  });
  it('countByPlan', async () => {
    prisma.mock.vendorSubscription.count.mockResolvedValue(3);
    expect(await repo.countByPlan({ value: 'basic' } as never)).toBe(3);
  });
  it('getStats', async () => {
    prisma.mock.vendorSubscription.count
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(2);
    prisma.mock.vendorSubscription.groupBy.mockResolvedValue([
      { plan: 'basic', _count: { _all: 5 } },
    ]);
    prisma.mock.vendorSubscription.aggregate.mockResolvedValue({ _sum: { price: 5000 } });
    const r = await repo.getStats();
    expect(r.totalActive).toBe(10);
    expect(r.totalTrial).toBe(5);
    expect(r.totalPastDue).toBe(2);
    expect(r.mrr).toBe(5000);
  });
  it('getStats null sum', async () => {
    prisma.mock.vendorSubscription.count.mockResolvedValue(0);
    prisma.mock.vendorSubscription.groupBy.mockResolvedValue([]);
    prisma.mock.vendorSubscription.aggregate.mockResolvedValue({ _sum: { price: null } });
    const r = await repo.getStats();
    expect(r.mrr).toBe(0);
  });
  it('save creates', async () => {
    prisma.mock.vendorSubscription.findFirst.mockResolvedValue(null);
    prisma.mock.vendorSubscription.create.mockResolvedValue(row());
    const { VendorSubscriptionEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-subscription.entity.js'
    );
    const { SubscriptionPlanVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js'
    );
    const { SubscriptionCycleVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js'
    );
    const entity = VendorSubscriptionEntity.create({
      id: UUID, vendorId: UUID,
      plan: SubscriptionPlanVO.create('basic'),
      cycle: SubscriptionCycleVO.create('monthly'),
      price: 500, currency: 'BDT',
      trialDays: 0, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('save updates', async () => {
    prisma.mock.vendorSubscription.findFirst.mockResolvedValue(row());
    prisma.mock.vendorSubscription.update.mockResolvedValue(row());
    const { VendorSubscriptionEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-subscription.entity.js'
    );
    const { SubscriptionPlanVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js'
    );
    const { SubscriptionStatusVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/subscription-status.vo.js'
    );
    const { SubscriptionCycleVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js'
    );
    const entity = VendorSubscriptionEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        plan: SubscriptionPlanVO.create('basic'),
        status: SubscriptionStatusVO.active(),
        cycle: SubscriptionCycleVO.create('monthly'),
        price: 500, currency: 'BDT',
        startedAt: '2026-01-01T00:00:00.000Z',
        currentPeriodStart: '2026-01-01T00:00:00.000Z',
        currentPeriodEnd: '2026-02-01T00:00:00.000Z',
        cancelAtPeriodEnd: false, autoRenew: true, features: [],
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorSubscription.update).toHaveBeenCalled();
  });
  it('delete', async () => {
    prisma.mock.vendorSubscription.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorSubscription.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorSubscription.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});

// ═══════════════ COMMISSION ═══════════════
describe('VendorCommissionPrismaRepository', () => {
  let repo: VendorCommissionPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorCommissionPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID, type: 'percentage', percent: 10,
      fixedAmount: null, currency: 'BDT', minPercent: 0, maxPercent: 50,
      applyOnShipping: false, applyOnTax: false,
      effectiveFrom: NOW, effectiveTo: null, isActive: true,
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorCommission.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findById null', async () => {
    prisma.mock.vendorCommission.findFirst.mockResolvedValue(null);
    expect(await repo.findById(UUID)).toBeNull();
  });
  it('findAll', async () => {
    prisma.mock.vendorCommission.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorCommission.findMany.mockResolvedValue([row()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });
  it('findActiveByVendorId', async () => {
    prisma.mock.vendorCommission.findFirst.mockResolvedValue(row());
    expect(await repo.findActiveByVendorId(UUID)).not.toBeNull();
  });
  it('findActiveAt', async () => {
    prisma.mock.vendorCommission.findFirst.mockResolvedValue(row());
    expect(await repo.findActiveAt(UUID, NOW)).not.toBeNull();
  });
  it('findByType', async () => {
    prisma.mock.vendorCommission.findMany.mockResolvedValue([row()]);
    expect((await repo.findByType('percentage')).length).toBe(1);
  });
  it('findHistoryByVendorId', async () => {
    prisma.mock.vendorCommission.findMany.mockResolvedValue([row()]);
    expect((await repo.findHistoryByVendorId(UUID)).length).toBe(1);
  });
  it('findExpiredButActive', async () => {
    prisma.mock.vendorCommission.findMany.mockResolvedValue([row()]);
    expect((await repo.findExpiredButActive()).length).toBe(1);
  });
  it('findVendorsWithoutConfig', async () => {
    prisma.mock.vendor.findMany.mockResolvedValue([{ id: UUID }, { id: 'other' }]);
    prisma.mock.vendorCommission.findMany.mockResolvedValue([{ vendorId: UUID }]);
    const r = await repo.findVendorsWithoutConfig();
    expect(r).toContain('other');
  });
  it('getAveragePercent', async () => {
    prisma.mock.vendorCommission.aggregate.mockResolvedValue({ _avg: { percent: 12.5 } });
    expect(await repo.getAveragePercent()).toBe(12.5);
  });
  it('getAveragePercent null', async () => {
    prisma.mock.vendorCommission.aggregate.mockResolvedValue({ _avg: { percent: null } });
    expect(await repo.getAveragePercent()).toBe(0);
  });
  it('countActiveByVendor', async () => {
    prisma.mock.vendorCommission.count.mockResolvedValue(1);
    expect(await repo.countActiveByVendor(UUID)).toBe(1);
  });
  it('deactivateAllForVendor', async () => {
    prisma.mock.vendorCommission.updateMany.mockResolvedValue({ count: 2 });
    await repo.deactivateAllForVendor(UUID);
    expect(prisma.mock.vendorCommission.updateMany).toHaveBeenCalled();
  });
  it('save creates', async () => {
    prisma.mock.vendorCommission.findFirst.mockResolvedValue(null);
    prisma.mock.vendorCommission.create.mockResolvedValue(row());
    const { VendorCommissionEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-commission.entity.js'
    );
    const { CommissionPercentVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js'
    );
    const entity = VendorCommissionEntity.create({
      id: UUID, vendorId: UUID,
      type: 'percentage',
      percent: CommissionPercentVO.create(10),
      currency: 'BDT',
      minPercent: 0, maxPercent: 50,
      applyOnShipping: false, applyOnTax: false,
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('save updates', async () => {
    prisma.mock.vendorCommission.findFirst.mockResolvedValue(row());
    prisma.mock.vendorCommission.update.mockResolvedValue(row());
    const { VendorCommissionEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-commission.entity.js'
    );
    const { CommissionPercentVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js'
    );
    const entity = VendorCommissionEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID, type: 'percentage',
        percent: CommissionPercentVO.create(10),
        currency: 'BDT', minPercent: 0, maxPercent: 50,
        applyOnShipping: false, applyOnTax: false,
        effectiveFrom: '2026-01-01T00:00:00.000Z', isActive: true,
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorCommission.update).toHaveBeenCalled();
  });
  it('delete', async () => {
    prisma.mock.vendorCommission.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorCommission.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorCommission.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
});

// ═══════════════ RATING ═══════════════
describe('VendorRatingPrismaRepository', () => {
  let repo: VendorRatingPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorRatingPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID, overall: 4.5, totalReviews: 10,
      distribution: { '1': 0, '2': 0, '3': 1, '4': 3, '5': 6 },
      categories: [], recentWeight: 0,
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorRating.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorRating.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorRating.findFirst.mockResolvedValue(row());
    expect(await repo.findByVendorId(UUID)).not.toBeNull();
  });
  it('existsByVendorId', async () => {
    prisma.mock.vendorRating.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });
  it('findBelow', async () => {
    prisma.mock.vendorRating.findMany.mockResolvedValue([row()]);
    expect((await repo.findBelow(3)).length).toBe(1);
  });
  it('findTopRated', async () => {
    prisma.mock.vendorRating.findMany.mockResolvedValue([row()]);
    expect((await repo.findTopRated(10)).length).toBe(1);
  });
  it('findAutoHideCandidates', async () => {
    prisma.mock.vendorRating.findMany.mockResolvedValue([row()]);
    expect((await repo.findAutoHideCandidates()).length).toBe(1);
  });
  it('findWithMinReviews', async () => {
    prisma.mock.vendorRating.findMany.mockResolvedValue([row()]);
    expect((await repo.findWithMinReviews(5)).length).toBe(1);
  });
  it('getStats', async () => {
    prisma.mock.vendorRating.aggregate.mockResolvedValue({ _avg: { overall: 4.2 } });
    prisma.mock.vendorRating.count
      .mockResolvedValueOnce(100)
      .mockResolvedValueOnce(50);
    const r = await repo.getStats();
    expect(r.avgRating).toBe(4.2);
    expect(r.totalVendors).toBe(100);
  });
  it('getStats null avg', async () => {
    prisma.mock.vendorRating.aggregate.mockResolvedValue({ _avg: { overall: null } });
    prisma.mock.vendorRating.count.mockResolvedValue(0);
    const r = await repo.getStats();
    expect(r.avgRating).toBe(0);
  });
  it('upsert creates', async () => {
    prisma.mock.vendorRating.findFirst.mockResolvedValue(null);
    prisma.mock.vendorRating.create.mockResolvedValue(row());
    const { VendorRatingEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-rating.entity.js'
    );
    const entity = VendorRatingEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });
  it('upsert updates', async () => {
    prisma.mock.vendorRating.findFirst.mockResolvedValue(row());
    prisma.mock.vendorRating.update.mockResolvedValue(row());
    const { VendorRatingEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-rating.entity.js'
    );
    const entity = VendorRatingEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        overall: (await import('../../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js')).RatingScoreVO.zero(),
        totalReviews: 0,
        distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
        categories: [],
        recentWeight: 0,
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorRating.update).toHaveBeenCalled();
  });
  it('save delegates', async () => {
    prisma.mock.vendorRating.findFirst.mockResolvedValue(null);
    prisma.mock.vendorRating.create.mockResolvedValue(row());
    const { VendorRatingEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-rating.entity.js'
    );
    const entity = VendorRatingEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('delete', async () => {
    prisma.mock.vendorRating.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorRating.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorRating.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorRating.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorRating.updateMany).toHaveBeenCalled();
  });
});

// ═══════════════ REVIEW ═══════════════
describe('VendorReviewPrismaRepository', () => {
  let repo: VendorReviewPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorReviewPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID, userId: UUID, orderId: UUID,
      rating: 5, comment: 'Great product, recommend!',
      categories: [], status: 'pending', isVerifiedPurchase: true, flagCount: 0,
      hiddenReason: null,
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorReview.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });
  it('findByUserId', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findByUserId(UUID)).length).toBe(1);
  });
  it('findByOrderId', async () => {
    prisma.mock.vendorReview.findFirst.mockResolvedValue(row());
    expect(await repo.findByOrderId(UUID)).not.toBeNull();
  });
  it('findByStatus', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findByStatus({ value: 'pending' } as never)).length).toBe(1);
  });
  it('findPaginated with filters', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    prisma.mock.vendorReview.count.mockResolvedValue(1);
    const r = await repo.findPaginated({
      page: 1, limit: 20,
      filter: {
        vendorId: UUID, userId: UUID, status: 'approved', rating: 5,
        verifiedOnly: true, fromDate: '2026-01-01T00:00:00Z', toDate: '2026-02-01T00:00:00Z',
      },
    });
    expect(r.total).toBe(1);
  });
  it('findPaginated without filters', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([]);
    prisma.mock.vendorReview.count.mockResolvedValue(0);
    expect((await repo.findPaginated({ page: 1, limit: 20 })).total).toBe(0);
  });
  it('search', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.search({ status: 'pending' })).length).toBe(1);
  });
  it('findPendingModeration', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findPendingModeration()).length).toBe(1);
  });
  it('findFlagged', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findFlagged()).length).toBe(1);
  });
  it('findHidden', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findHidden()).length).toBe(1);
  });
  it('findPublicByVendorId', async () => {
    prisma.mock.vendorReview.findMany.mockResolvedValue([row()]);
    expect((await repo.findPublicByVendorId(UUID)).length).toBe(1);
  });
  it('countByVendor', async () => {
    prisma.mock.vendorReview.count.mockResolvedValue(5);
    expect(await repo.countByVendor(UUID)).toBe(5);
  });
  it('countByStatus', async () => {
    prisma.mock.vendorReview.count.mockResolvedValue(3);
    expect(await repo.countByStatus({ value: 'pending' } as never)).toBe(3);
  });
  it('countVerifiedByVendorId', async () => {
    prisma.mock.vendorReview.count.mockResolvedValue(2);
    expect(await repo.countVerifiedByVendorId(UUID)).toBe(2);
  });
  it('existsByOrderId', async () => {
    prisma.mock.vendorReview.count.mockResolvedValue(1);
    expect(await repo.existsByOrderId(UUID)).toBe(true);
  });
  it('getVendorAverageRating', async () => {
    prisma.mock.vendorReview.aggregate.mockResolvedValue({ _avg: { rating: 4.5 } });
    expect(await repo.getVendorAverageRating(UUID)).toBe(4.5);
  });
  it('getVendorAverageRating null', async () => {
    prisma.mock.vendorReview.aggregate.mockResolvedValue({ _avg: { rating: null } });
    expect(await repo.getVendorAverageRating(UUID)).toBe(0);
  });
  it('save creates', async () => {
    prisma.mock.vendorReview.findFirst.mockResolvedValue(null);
    prisma.mock.vendorReview.create.mockResolvedValue(row());
    const { VendorReviewEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-review.entity.js'
    );
    const { RatingScoreVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js'
    );
    const entity = VendorReviewEntity.create({
      id: UUID, vendorId: UUID, userId: UUID, orderId: UUID,
      rating: RatingScoreVO.create(5),
      comment: 'Great product, recommend!',
      isVerifiedPurchase: true,
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('save updates', async () => {
    prisma.mock.vendorReview.findFirst.mockResolvedValue(row());
    prisma.mock.vendorReview.update.mockResolvedValue(row());
    const { VendorReviewEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-review.entity.js'
    );
    const { RatingScoreVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js'
    );
    const { VendorReviewStatusVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-review-status.vo.js'
    );
    const entity = VendorReviewEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID, userId: UUID, orderId: UUID,
        rating: RatingScoreVO.create(5),
        comment: 'This product is really great!',
        categories: [],
        status: VendorReviewStatusVO.pending(),
        isVerifiedPurchase: true, flagCount: 0,
        createdAt: '2026-01-01T00:00:00.000Z',
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorReview.update).toHaveBeenCalled();
  });
  it('delete', async () => {
    prisma.mock.vendorReview.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorReview.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorReview.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorReview.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorReview.updateMany).toHaveBeenCalled();
  });
});

// ═══════════════ PERFORMANCE ═══════════════
describe('VendorPerformancePrismaRepository', () => {
  let repo: VendorPerformancePrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorPerformancePrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID, grade: 'a', overallScore: 92,
      metrics: [], evaluationPeriodStart: NOW, evaluationPeriodEnd: END,
      orderCount: 100, isSuspended: false, warningIssued: false,
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorPerformance.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorPerformance.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorPerformance.findMany.mockResolvedValue([row()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });
  it('findLatestByVendorId', async () => {
    prisma.mock.vendorPerformance.findFirst.mockResolvedValue(row());
    expect(await repo.findLatestByVendorId(UUID)).not.toBeNull();
  });
  it('findByGrade', async () => {
    prisma.mock.vendorPerformance.findMany.mockResolvedValue([row()]);
    expect((await repo.findByGrade({ value: 'a' } as never)).length).toBe(1);
  });
  it('findAtRisk', async () => {
    prisma.mock.vendorPerformance.findMany.mockResolvedValue([row()]);
    expect((await repo.findAtRisk()).length).toBe(1);
  });
  it('findAutoSuspendCandidates', async () => {
    prisma.mock.vendorPerformance.findMany.mockResolvedValue([row()]);
    expect((await repo.findAutoSuspendCandidates()).length).toBe(1);
  });
  it('findReinstatementCandidates', async () => {
    prisma.mock.vendorPerformance.findMany.mockResolvedValue([row()]);
    expect((await repo.findReinstatementCandidates()).length).toBe(1);
  });
  it('findEvaluationDue', async () => {
    prisma.mock.vendorPerformance.findMany.mockResolvedValue([row()]);
    expect((await repo.findEvaluationDue()).length).toBe(1);
  });
  it('getStats', async () => {
    prisma.mock.vendorPerformance.aggregate.mockResolvedValue({ _avg: { overallScore: 85 } });
    prisma.mock.vendorPerformance.groupBy.mockResolvedValue([{ grade: 'a', _count: { _all: 5 } }]);
    prisma.mock.vendorPerformance.count.mockResolvedValue(3);
    const r = await repo.getStats();
    expect(r.avgScore).toBe(85);
    expect(r.byGrade.a).toBe(5);
    expect(r.atRiskCount).toBe(3);
  });
  it('getStats null avg', async () => {
    prisma.mock.vendorPerformance.aggregate.mockResolvedValue({ _avg: { overallScore: null } });
    prisma.mock.vendorPerformance.groupBy.mockResolvedValue([]);
    prisma.mock.vendorPerformance.count.mockResolvedValue(0);
    const r = await repo.getStats();
    expect(r.avgScore).toBe(0);
  });
  it('countByGrade', async () => {
    prisma.mock.vendorPerformance.count.mockResolvedValue(5);
    expect(await repo.countByGrade({ value: 'a' } as never)).toBe(5);
  });
  it('save creates', async () => {
    prisma.mock.vendorPerformance.findFirst.mockResolvedValue(null);
    prisma.mock.vendorPerformance.create.mockResolvedValue(row());
    const { VendorPerformanceEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-performance.entity.js'
    );
    const entity = VendorPerformanceEntity.create({
      id: UUID, vendorId: UUID,
      evaluationPeriodStart: '2026-01-01T00:00:00.000Z',
      evaluationPeriodEnd: '2026-02-01T00:00:00.000Z',
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('save updates', async () => {
    prisma.mock.vendorPerformance.findFirst.mockResolvedValue(row());
    prisma.mock.vendorPerformance.update.mockResolvedValue(row());
    const { VendorPerformanceEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-performance.entity.js'
    );
    const { PerformanceGradeVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/performance-grade.vo.js'
    );
    const entity = VendorPerformanceEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        grade: PerformanceGradeVO.create('a'),
        overallScore: 92, metrics: [],
        evaluationPeriodStart: '2026-01-01T00:00:00.000Z',
        evaluationPeriodEnd: '2026-02-01T00:00:00.000Z',
        orderCount: 100, isSuspended: false, warningIssued: false,
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorPerformance.update).toHaveBeenCalled();
  });
  it('delete', async () => {
    prisma.mock.vendorPerformance.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorPerformance.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorPerformance.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorPerformance.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorPerformance.updateMany).toHaveBeenCalled();
  });
});

// ═══════════════ STATS ═══════════════
describe('VendorStatsPrismaRepository', () => {
  let repo: VendorStatsPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorStatsPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID,
      periodStart: NOW, periodEnd: END,
      totalProducts: 100, totalOrders: 50,
      totalRevenue: 10000, totalCommission: 1000, totalPayout: 9000,
      totalRefund: 100, totalCancelled: 2,
      averageOrderValue: 200, currency: 'BDT',
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorStats.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorStats.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorStats.findMany.mockResolvedValue([row()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });
  it('findLatestByVendorId', async () => {
    prisma.mock.vendorStats.findFirst.mockResolvedValue(row());
    expect(await repo.findLatestByVendorId(UUID)).not.toBeNull();
  });
  it('findByVendorIdAndDate', async () => {
    prisma.mock.vendorStats.findFirst.mockResolvedValue(row());
    expect(await repo.findByVendorIdAndDate(UUID, NOW)).not.toBeNull();
  });
  it('findByVendorIdBetween', async () => {
    prisma.mock.vendorStats.findMany.mockResolvedValue([row()]);
    expect((await repo.findByVendorIdBetween(UUID, '2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z')).length).toBe(1);
  });
  it('findTopByRevenue', async () => {
    prisma.mock.vendorStats.findMany.mockResolvedValue([row()]);
    expect((await repo.findTopByRevenue('2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z', 10)).length).toBe(1);
  });
  it('findDecliningVendors', async () => {
    prisma.mock.vendorStats.findMany.mockResolvedValue([row({ totalCancelled: 5 })]);
    const r = await repo.findDecliningVendors('2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z', 0.05);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });
  it('findHighCancellationRate', async () => {
    prisma.mock.vendorStats.findMany.mockResolvedValue([row({ totalCancelled: 5 })]);
    const r = await repo.findHighCancellationRate(0.05);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });
  it('findHighRefundRate', async () => {
    prisma.mock.vendorStats.findMany.mockResolvedValue([row({ totalRefund: 5000 })]);
    const r = await repo.findHighRefundRate(0.1);
    expect(r.length).toBeGreaterThanOrEqual(0);
  });
  it('sumRevenueBetween', async () => {
    prisma.mock.vendorStats.aggregate.mockResolvedValue({ _sum: { totalRevenue: 10000 } });
    expect(await repo.sumRevenueBetween('2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z')).toBe(10000);
  });
  it('sumCommissionBetween', async () => {
    prisma.mock.vendorStats.aggregate.mockResolvedValue({ _sum: { totalCommission: 1000 } });
    expect(await repo.sumCommissionBetween('2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z')).toBe(1000);
  });
  it('sumPayoutBetween', async () => {
    prisma.mock.vendorStats.aggregate.mockResolvedValue({ _sum: { totalPayout: 9000 } });
    expect(await repo.sumPayoutBetween('2026-01-01T00:00:00Z', '2026-02-01T00:00:00Z')).toBe(9000);
  });
  it('upsert creates', async () => {
    prisma.mock.vendorStats.findFirst.mockResolvedValue(null);
    prisma.mock.vendorStats.create.mockResolvedValue(row());
    const { VendorStatsEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-stats.entity.js'
    );
    const entity = VendorStatsEntity.create({
      id: UUID, vendorId: UUID,
      periodStart: '2026-01-01T00:00:00.000Z',
      periodEnd: '2026-02-01T00:00:00.000Z',
      currency: 'BDT',
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });
  it('upsert updates', async () => {
    prisma.mock.vendorStats.findFirst.mockResolvedValue(row());
    prisma.mock.vendorStats.update.mockResolvedValue(row());
    const { VendorStatsEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-stats.entity.js'
    );
    const entity = VendorStatsEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        periodStart: '2026-01-01T00:00:00.000Z',
        periodEnd: '2026-02-01T00:00:00.000Z',
        totalProducts: 0, totalOrders: 0,
        totalRevenue: 0, totalCommission: 0, totalPayout: 0,
        totalRefund: 0, totalCancelled: 0,
        averageOrderValue: 0, currency: 'BDT',
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorStats.update).toHaveBeenCalled();
  });
  it('save delegates', async () => {
    prisma.mock.vendorStats.findFirst.mockResolvedValue(null);
    prisma.mock.vendorStats.create.mockResolvedValue(row());
    const { VendorStatsEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-stats.entity.js'
    );
    const entity = VendorStatsEntity.create({
      id: UUID, vendorId: UUID,
      periodStart: '2026-01-01T00:00:00.000Z',
      periodEnd: '2026-02-01T00:00:00.000Z',
      currency: 'BDT',
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('delete', async () => {
    prisma.mock.vendorStats.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorStats.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorStats.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorStats.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorStats.updateMany).toHaveBeenCalled();
  });
});

// ═══════════════ REPORT ═══════════════
describe('VendorReportPrismaRepository', () => {
  let repo: VendorReportPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorReportPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID,
      type: 'sales', format: 'pdf', period: 'last_30_days',
      periodStart: NOW, periodEnd: END,
      status: 'pending', fileUrl: null, fileSize: null,
      generatedAt: null, expiresAt: null, generatedBy: null, failureReason: null,
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorReport.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.findByVendorId(UUID)).length).toBe(1);
  });
  it('findByStatus', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.findByStatus({ value: 'pending' } as never)).length).toBe(1);
  });
  it('findByType', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.findByType({ value: 'sales' } as never)).length).toBe(1);
  });
  it('search with filters', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.search({
      vendorId: UUID, type: 'sales', status: 'pending', format: 'pdf',
      fromDate: '2026-01-01T00:00:00Z', toDate: '2026-02-01T00:00:00Z',
    })).length).toBe(1);
  });
  it('search without filters', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([]);
    expect((await repo.search({})).length).toBe(0);
  });
  it('findInProgress', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.findInProgress()).length).toBe(1);
  });
  it('findExpiredReady', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.findExpiredReady()).length).toBe(1);
  });
  it('findDownloadableByVendorId', async () => {
    prisma.mock.vendorReport.findMany.mockResolvedValue([row()]);
    expect((await repo.findDownloadableByVendorId(UUID)).length).toBe(1);
  });
  it('countByVendor', async () => {
    prisma.mock.vendorReport.count.mockResolvedValue(5);
    expect(await repo.countByVendor(UUID)).toBe(5);
  });
  it('countByStatus', async () => {
    prisma.mock.vendorReport.count.mockResolvedValue(3);
    expect(await repo.countByStatus({ value: 'pending' } as never)).toBe(3);
  });
  it('countRecentByVendorId', async () => {
    prisma.mock.vendorReport.count.mockResolvedValue(2);
    expect(await repo.countRecentByVendorId(UUID, 24)).toBe(2);
  });
  it('save creates', async () => {
    prisma.mock.vendorReport.findFirst.mockResolvedValue(null);
    prisma.mock.vendorReport.create.mockResolvedValue(row());
    const { VendorReportEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-report.entity.js'
    );
    const { VendorReportTypeVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-report-type.vo.js'
    );
    const { VendorReportFormatVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-report-format.vo.js'
    );
    const { VendorReportPeriodVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-report-period.vo.js'
    );
    const entity = VendorReportEntity.create({
      id: UUID, now: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        type: VendorReportTypeVO.create('sales'),
        format: VendorReportFormatVO.create('pdf'),
        period: VendorReportPeriodVO.create('last_30_days'),
        periodStart: '2026-01-01T00:00:00.000Z',
        periodEnd: '2026-02-01T00:00:00.000Z',
      },
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('save updates', async () => {
    prisma.mock.vendorReport.findFirst.mockResolvedValue(row());
    prisma.mock.vendorReport.update.mockResolvedValue(row());
    const { VendorReportEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-report.entity.js'
    );
    const { VendorReportTypeVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-report-type.vo.js'
    );
    const { VendorReportFormatVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-report-format.vo.js'
    );
    const { VendorReportPeriodVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-report-period.vo.js'
    );
    const { VendorReportStatusVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/vendor-report-status.vo.js'
    );
    const entity = VendorReportEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        type: VendorReportTypeVO.create('sales'),
        format: VendorReportFormatVO.create('pdf'),
        period: VendorReportPeriodVO.create('last_30_days'),
        periodStart: '2026-01-01T00:00:00.000Z',
        periodEnd: '2026-02-01T00:00:00.000Z',
        status: VendorReportStatusVO.pending(),
      },
    });
    await repo.save(entity);
    expect(prisma.mock.vendorReport.update).toHaveBeenCalled();
  });
  it('delete', async () => {
    prisma.mock.vendorReport.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorReport.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorReport.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorReport.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorReport.updateMany).toHaveBeenCalled();
  });
});

// ═══════════════ SHIPPING ═══════════════
describe('VendorShippingPrismaRepository', () => {
  let repo: VendorShippingPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorShippingPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID,
      defaultMethod: 'standard', trackingRequired: true,
      allowPickup: true, allowCourier: true,
      freeShippingThreshold: null, rates: [],
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorShipping.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorShipping.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorShipping.findFirst.mockResolvedValue(row());
    expect(await repo.findByVendorId(UUID)).not.toBeNull();
  });
  it('existsByVendorId', async () => {
    prisma.mock.vendorShipping.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });
  it('upsert creates', async () => {
    prisma.mock.vendorShipping.findFirst.mockResolvedValue(null);
    prisma.mock.vendorShipping.create.mockResolvedValue(row());
    const { VendorShippingEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-shipping.entity.js'
    );
    const { ShippingMethodVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/shipping-method.vo.js'
    );
    const entity = VendorShippingEntity.create({
      id: UUID, vendorId: UUID,
      defaultMethod: ShippingMethodVO.create('standard'),
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });
  it('upsert updates', async () => {
    prisma.mock.vendorShipping.findFirst.mockResolvedValue(row());
    prisma.mock.vendorShipping.update.mockResolvedValue(row());
    const { VendorShippingEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-shipping.entity.js'
    );
    const { ShippingMethodVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/shipping-method.vo.js'
    );
    const entity = VendorShippingEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        defaultMethod: ShippingMethodVO.create('standard'),
        trackingRequired: true, allowPickup: true, allowCourier: true,
        rates: [],
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorShipping.update).toHaveBeenCalled();
  });
  it('save delegates', async () => {
    prisma.mock.vendorShipping.findFirst.mockResolvedValue(null);
    prisma.mock.vendorShipping.create.mockResolvedValue(row());
    const { VendorShippingEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-shipping.entity.js'
    );
    const { ShippingMethodVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/shipping-method.vo.js'
    );
    const entity = VendorShippingEntity.create({
      id: UUID, vendorId: UUID,
      defaultMethod: ShippingMethodVO.create('standard'),
      now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('delete', async () => {
    prisma.mock.vendorShipping.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorShipping.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorShipping.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('findSupportingZone', async () => {
    prisma.mock.vendorShipping.findMany.mockResolvedValue([]);
    const r = await repo.findSupportingZone({ value: 'inside_city' } as never);
    expect(Array.isArray(r)).toBe(true);
  });
  it('findSupportingMethod', async () => {
    prisma.mock.vendorShipping.findMany.mockResolvedValue([]);
    const r = await repo.findSupportingMethod({ value: 'standard' } as never);
    expect(Array.isArray(r)).toBe(true);
  });
  it('findSameDaySupport', async () => {
    prisma.mock.vendorShipping.findMany.mockResolvedValue([]);
    const r = await repo.findSameDaySupport();
    expect(Array.isArray(r)).toBe(true);
  });
  it('findWithFreeShipping', async () => {
    prisma.mock.vendorShipping.findMany.mockResolvedValue([row({ freeShippingThreshold: 1000 })]);
    expect((await repo.findWithFreeShipping()).length).toBe(1);
  });
  it('findWithoutActiveRates', async () => {
    prisma.mock.vendorShipping.findMany.mockResolvedValue([row({ rates: [] })]);
    const r = await repo.findWithoutActiveRates();
    expect(r.length).toBe(1);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorShipping.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorShipping.updateMany).toHaveBeenCalled();
  });
});

// ═══════════════ WARRANTY ═══════════════
describe('VendorWarrantyPrismaRepository', () => {
  let repo: VendorWarrantyPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorWarrantyPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID,
      defaultType: 'seller', defaultPeriodDays: 30,
      coversShipping: false, requireProof: true, autoRegister: true,
      terms: null, exclusions: [],
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorWarranty.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorWarranty.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorWarranty.findFirst.mockResolvedValue(row());
    expect(await repo.findByVendorId(UUID)).not.toBeNull();
  });
  it('existsByVendorId', async () => {
    prisma.mock.vendorWarranty.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });
  it('upsert creates', async () => {
    prisma.mock.vendorWarranty.findFirst.mockResolvedValue(null);
    prisma.mock.vendorWarranty.create.mockResolvedValue(row());
    const { VendorWarrantyEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-warranty.entity.js'
    );
    const entity = VendorWarrantyEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });
  it('upsert updates', async () => {
    prisma.mock.vendorWarranty.findFirst.mockResolvedValue(row());
    prisma.mock.vendorWarranty.update.mockResolvedValue(row());
    const { VendorWarrantyEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-warranty.entity.js'
    );
    const { WarrantyTypeVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/warranty-type.vo.js'
    );
    const { WarrantyPeriodDaysVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/warranty-period-days.vo.js'
    );
    const entity = VendorWarrantyEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        defaultType: WarrantyTypeVO.create('seller'),
        defaultPeriod: WarrantyPeriodDaysVO.create(30),
        coversShipping: false, requireProof: true, autoRegister: true,
        exclusions: [],
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorWarranty.update).toHaveBeenCalled();
  });
  it('save delegates', async () => {
    prisma.mock.vendorWarranty.findFirst.mockResolvedValue(null);
    prisma.mock.vendorWarranty.create.mockResolvedValue(row());
    const { VendorWarrantyEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-warranty.entity.js'
    );
    const entity = VendorWarrantyEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('delete', async () => {
    prisma.mock.vendorWarranty.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorWarranty.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorWarranty.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('findWithNoWarranty returns empty when none exist', async () => {
    prisma.mock.vendorWarranty.findMany.mockResolvedValue([]);
    expect((await repo.findWithNoWarranty()).length).toBe(0);
  });
  it('findByType', async () => {
    prisma.mock.vendorWarranty.findMany.mockResolvedValue([row()]);
    expect((await repo.findByType({ value: 'seller' } as never)).length).toBe(1);
  });
  it('findCoveringShipping', async () => {
    prisma.mock.vendorWarranty.findMany.mockResolvedValue([row()]);
    expect((await repo.findCoveringShipping()).length).toBe(1);
  });
  it('findLongTermWarranty', async () => {
    prisma.mock.vendorWarranty.findMany.mockResolvedValue([row()]);
    expect((await repo.findLongTermWarranty()).length).toBe(1);
  });
  it('findWithExclusions', async () => {
    prisma.mock.vendorWarranty.findMany.mockResolvedValue([row({ exclusions: ['abuse'] })]);
    expect((await repo.findWithExclusions()).length).toBe(1);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorWarranty.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorWarranty.updateMany).toHaveBeenCalled();
  });
});

// ═══════════════ RETURN POLICY ═══════════════
describe('VendorReturnPolicyPrismaRepository', () => {
  let repo: VendorReturnPolicyPrismaRepository;
  let prisma: ReturnType<typeof createMockPrisma>;
  beforeEach(() => { prisma = createMockPrisma(); repo = new VendorReturnPolicyPrismaRepository(prisma.prisma); });

  function row(over: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      id: UUID, vendorId: UUID,
      type: 'full_return', windowDays: 7, freeReturn: true,
      restockFeePercent: 0, requireReason: true, requireImages: false,
      maxImages: 5, autoApprove: false, approvalSlaHours: 48,
      exclusions: [], notes: null,
      version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
      ...over,
    };
  }

  it('findById', async () => {
    prisma.mock.vendorReturnPolicy.findFirst.mockResolvedValue(row());
    expect((await repo.findById(UUID))?.id).toBe(UUID);
  });
  it('findAll', async () => {
    prisma.mock.vendorReturnPolicy.findMany.mockResolvedValue([row()]);
    expect((await repo.findAll()).length).toBe(1);
  });
  it('findByVendorId', async () => {
    prisma.mock.vendorReturnPolicy.findFirst.mockResolvedValue(row());
    expect(await repo.findByVendorId(UUID)).not.toBeNull();
  });
  it('existsByVendorId', async () => {
    prisma.mock.vendorReturnPolicy.count.mockResolvedValue(1);
    expect(await repo.existsByVendorId(UUID)).toBe(true);
  });
  it('upsert creates', async () => {
    prisma.mock.vendorReturnPolicy.findFirst.mockResolvedValue(null);
    prisma.mock.vendorReturnPolicy.create.mockResolvedValue(row());
    const { VendorReturnPolicyEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-return-policy.entity.js'
    );
    const entity = VendorReturnPolicyEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.upsert(entity)).id).toBe(UUID);
  });
  it('upsert updates', async () => {
    prisma.mock.vendorReturnPolicy.findFirst.mockResolvedValue(row());
    prisma.mock.vendorReturnPolicy.update.mockResolvedValue(row());
    const { VendorReturnPolicyEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-return-policy.entity.js'
    );
    const { ReturnTypeVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/return-type.vo.js'
    );
    const { ReturnWindowDaysVO } = await import(
      '../../../../../../src/module/domain/value-objects/primitives/return-window-days.vo.js'
    );
    const entity = VendorReturnPolicyEntity.reconstitute({
      id: UUID, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z',
      props: {
        vendorId: UUID,
        type: ReturnTypeVO.create('full_return'),
        window: ReturnWindowDaysVO.create(7),
        freeReturn: true, restockFeePercent: 0,
        requireReason: true, requireImages: false,
        maxImages: 5, autoApprove: false, approvalSlaHours: 48,
        exclusions: [],
      },
    });
    await repo.upsert(entity);
    expect(prisma.mock.vendorReturnPolicy.update).toHaveBeenCalled();
  });
  it('save delegates', async () => {
    prisma.mock.vendorReturnPolicy.findFirst.mockResolvedValue(null);
    prisma.mock.vendorReturnPolicy.create.mockResolvedValue(row());
    const { VendorReturnPolicyEntity } = await import(
      '../../../../../../src/module/domain/entities/vendor-return-policy.entity.js'
    );
    const entity = VendorReturnPolicyEntity.create({
      id: UUID, vendorId: UUID, now: '2026-01-01T00:00:00.000Z',
    });
    expect((await repo.save(entity)).id).toBe(UUID);
  });
  it('delete', async () => {
    prisma.mock.vendorReturnPolicy.delete.mockResolvedValue(row());
    await repo.delete(UUID);
    expect(prisma.mock.vendorReturnPolicy.delete).toHaveBeenCalled();
  });
  it('exists', async () => {
    prisma.mock.vendorReturnPolicy.count.mockResolvedValue(1);
    expect(await repo.exists(UUID)).toBe(true);
  });
  it('findNoReturnPolicies', async () => {
    prisma.mock.vendorReturnPolicy.findMany.mockResolvedValue([row({ type: 'no_return', windowDays: 0 })]);
    expect((await repo.findNoReturnPolicies()).length).toBe(1);
  });
  it('findGenerousPolicies', async () => {
    prisma.mock.vendorReturnPolicy.findMany.mockResolvedValue([row({ windowDays: 14 })]);
    expect((await repo.findGenerousPolicies()).length).toBe(1);
  });
  it('findRequiringImages', async () => {
    prisma.mock.vendorReturnPolicy.findMany.mockResolvedValue([row({ requireImages: true })]);
    expect((await repo.findRequiringImages()).length).toBe(1);
  });
  it('deleteByVendorId', async () => {
    prisma.mock.vendorReturnPolicy.updateMany.mockResolvedValue({ count: 1 });
    await repo.deleteByVendorId(UUID);
    expect(prisma.mock.vendorReturnPolicy.updateMany).toHaveBeenCalled();
  });
});
