/**
 * Bulk Prisma mappers — Commission, Rating, Review, Performance
 */
import { VendorCommissionPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-commission.prisma-mapper.js';
import { VendorRatingPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-rating.prisma-mapper.js';
import { VendorReviewPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-review.prisma-mapper.js';
import { VendorPerformancePrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-performance.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const FUTURE = new Date('2027-01-01T00:00:00Z');

describe('VendorCommissionPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID, type: 'percentage',
    percent: 10, fixedAmount: null, currency: 'BDT',
    minPercent: 0, maxPercent: 50,
    applyOnShipping: false, applyOnTax: false,
    effectiveFrom: NOW, effectiveTo: null, isActive: true,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorCommissionPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.type).toBe('percentage');
    expect(e.percent.value).toBe(10);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorCommissionPrismaMapper.toDomain(row);
    const p = VendorCommissionPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.type).toBe('percentage');
  });
});

describe('VendorRatingPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    overall: 4.5, totalReviews: 10,
    distribution: { '1': 0, '2': 0, '3': 1, '4': 3, '5': 6 },
    categories: [],
    recentWeight: 0,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorRatingPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.overall.value).toBe(4.5);
    expect(e.totalReviews).toBe(10);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorRatingPrismaMapper.toDomain(row);
    const p = VendorRatingPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.totalReviews).toBe(10);
  });
});

describe('VendorReviewPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID, userId: UUID, orderId: UUID,
    rating: 5, comment: 'Great product!',
    categories: [],
    status: 'pending', isVerifiedPurchase: true,
    flagCount: 0, hiddenReason: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorReviewPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.rating.value).toBe(5);
    expect(e.isVerifiedPurchase).toBe(true);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorReviewPrismaMapper.toDomain(row);
    const p = VendorReviewPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.rating).toBe(5);
  });
});

describe('VendorPerformancePrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    grade: 'a', overallScore: 92,
    metrics: [{ metric: 'order_fulfillment_rate', value: 95, target: 100, grade: 'a' }],
    evaluationPeriodStart: NOW, evaluationPeriodEnd: FUTURE,
    orderCount: 100, isSuspended: false, warningIssued: false,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorPerformancePrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.grade.value).toBe('a');
    expect(e.overallScore).toBe(92);
    expect(e.metrics).toHaveLength(1);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorPerformancePrismaMapper.toDomain(row);
    const p = VendorPerformancePrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.grade).toBe('a');
  });
});
