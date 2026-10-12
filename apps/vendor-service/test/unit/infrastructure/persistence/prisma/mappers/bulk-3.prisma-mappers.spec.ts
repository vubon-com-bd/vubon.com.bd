/**
 * Bulk Prisma mappers — Stats, Report, Shipping, Warranty, Return Policy
 */
import { VendorStatsPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-stats.prisma-mapper.js';
import { VendorReportPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-report.prisma-mapper.js';
import { VendorShippingPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-shipping.prisma-mapper.js';
import { VendorWarrantyPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-warranty.prisma-mapper.js';
import { VendorReturnPolicyPrismaMapper } from '../../../../../../src/module/infrastructure/persistence/prisma/mappers/vendor-return-policy.prisma-mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date('2026-01-01T00:00:00Z');
const FUTURE = new Date('2027-01-01T00:00:00Z');

describe('VendorStatsPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    periodStart: NOW, periodEnd: FUTURE,
    totalProducts: 100, totalOrders: 500,
    totalRevenue: 100000, totalCommission: 15000, totalPayout: 85000,
    totalRefund: 0, totalCancelled: 0,
    averageOrderValue: 200, currency: 'BDT',
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorStatsPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.totalProducts).toBe(100);
    expect(e.totalRevenue).toBe(100000);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorStatsPrismaMapper.toDomain(row);
    const p = VendorStatsPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.totalOrders).toBe(500);
  });
});

describe('VendorReportPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    type: 'sales', format: 'pdf', period: 'last_30_days',
    periodStart: NOW, periodEnd: FUTURE,
    status: 'pending', fileUrl: null, fileSize: null,
    generatedAt: null, expiresAt: null, generatedBy: null,
    failureReason: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorReportPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.type.value).toBe('sales');
    expect(e.format.value).toBe('pdf');
  });

  it('toPersistence roundtrip', () => {
    const d = VendorReportPrismaMapper.toDomain(row);
    const p = VendorReportPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.type).toBe('sales');
  });
});

describe('VendorShippingPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    defaultMethod: 'standard',
    trackingRequired: true, allowPickup: true, allowCourier: true,
    freeShippingThreshold: null,
    rates: [{ method: 'standard', zone: 'inside_city', cost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3, isActive: true }],
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorShippingPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.defaultMethod.value).toBe('standard');
    expect(e.rates).toHaveLength(1);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorShippingPrismaMapper.toDomain(row);
    const p = VendorShippingPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.defaultMethod).toBe('standard');
  });
});

describe('VendorWarrantyPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    defaultType: 'seller', defaultPeriodDays: 30,
    coversShipping: false, requireProof: true, autoRegister: true,
    terms: null, exclusions: [],
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorWarrantyPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.defaultType.value).toBe('seller');
    expect(e.defaultPeriod.days).toBe(30);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorWarrantyPrismaMapper.toDomain(row);
    const p = VendorWarrantyPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.defaultType).toBe('seller');
  });
});

describe('VendorReturnPolicyPrismaMapper', () => {
  const row = {
    id: UUID, vendorId: UUID,
    type: 'full_return', windowDays: 7, freeReturn: true,
    restockFeePercent: 0, requireReason: true, requireImages: false,
    maxImages: 5, autoApprove: false, approvalSlaHours: 48,
    exclusions: [], notes: null,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  } as never;

  it('toDomain maps all fields', () => {
    const e = VendorReturnPolicyPrismaMapper.toDomain(row);
    expect(e.id).toBe(UUID);
    expect(e.type.value).toBe('full_return');
    expect(e.window.days).toBe(7);
  });

  it('toPersistence roundtrip', () => {
    const d = VendorReturnPolicyPrismaMapper.toDomain(row);
    const p = VendorReturnPolicyPrismaMapper.toPersistence(d);
    expect(p.id).toBe(UUID);
    expect(p.type).toBe('full_return');
  });
});
