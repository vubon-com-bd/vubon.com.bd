/**
 * VendorStatsEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorStatsEntity } from '../../../../src/module/domain/entities/vendor-stats.entity.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';
const PERIOD_START = '2025-01-01T00:00:00.000Z';
const PERIOD_END = '2025-01-31T00:00:00.000Z';

function makeStats() {
  return VendorStatsEntity.create({
    id: UUID,
    vendorId: VENDOR,
    periodStart: PERIOD_START,
    periodEnd: PERIOD_END,
    currency: 'BDT',
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { deletedAt, ...propsOverrides } = overrides as {
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorStatsEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      periodStart: PERIOD_START,
      periodEnd: PERIOD_END,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalCommission: 0,
      totalPayout: 0,
      totalRefund: 0,
      totalCancelled: 0,
      averageOrderValue: 0,
      currency: 'BDT',
      ...propsOverrides,
    } as never,
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorStatsEntity — creation', () => {
  it('creates empty stats', () => {
    const s = makeStats();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.totalOrders).toBe(0);
    expect(s.totalRevenue).toBe(0);
    expect(s.currency).toBe('BDT');
  });
});

describe('VendorStatsEntity — invariants', () => {
  it('rejects periodEnd < periodStart', () => {
    expect(() =>
      reconstitute({
        periodStart: '2025-06-01T00:00:00.000Z',
        periodEnd: '2025-01-01T00:00:00.000Z',
      }),
    ).toThrow();
  });

  it('rejects negative totalRevenue', () => {
    expect(() => reconstitute({ totalRevenue: -1 })).toThrow();
  });

  it('rejects negative totalOrders', () => {
    expect(() => reconstitute({ totalOrders: -1 })).toThrow();
  });

  it('rejects non-integer totalOrders', () => {
    expect(() => reconstitute({ totalOrders: 1.5 })).toThrow();
  });

  it('rejects non-integer totalProducts', () => {
    expect(() => reconstitute({ totalProducts: 1.5 })).toThrow();
  });

  it('rejects invalid currency length', () => {
    expect(() => reconstitute({ currency: 'AB' })).toThrow();
  });
});

describe('VendorStatsEntity — getters', () => {
  it('returns scalar getters', () => {
    const s = makeStats();
    expect(s.vendorId).toBe(VENDOR);
    expect(s.periodStart).toBe(PERIOD_START);
    expect(s.periodEnd).toBe(PERIOD_END);
    expect(s.totalProducts).toBe(0);
    expect(s.totalOrders).toBe(0);
    expect(s.totalRevenue).toBe(0);
    expect(s.totalCommission).toBe(0);
    expect(s.totalPayout).toBe(0);
    expect(s.totalRefund).toBe(0);
    expect(s.totalCancelled).toBe(0);
    expect(s.averageOrderValue).toBe(0);
    expect(s.currency).toBe('BDT');
  });
});

describe('VendorStatsEntity — computed metrics', () => {
  it('getPlatformEarning = revenue - payout', () => {
    const s = reconstitute({ totalRevenue: 10000, totalPayout: 7000 });
    expect(s.getPlatformEarning()).toBe(3000);
  });

  it('getNetRevenue = revenue - refund', () => {
    const s = reconstitute({ totalRevenue: 10000, totalRefund: 500 });
    expect(s.getNetRevenue()).toBe(9500);
  });

  it('getCancellationRate 0 when no orders', () => {
    expect(makeStats().getCancellationRate()).toBe(0);
  });

  it('getCancellationRate correct', () => {
    const s = reconstitute({ totalOrders: 100, totalCancelled: 5 });
    expect(s.getCancellationRate()).toBe(0.05);
  });

  it('getRefundRate 0 when no orders', () => {
    expect(makeStats().getRefundRate()).toBe(0);
  });

  it('getRefundRate correct', () => {
    const s = reconstitute({ totalOrders: 100, totalRevenue: 10000, totalRefund: 500 });
    expect(s.getRefundRate()).toBe(0.05);
  });

  it('getPayoutRatio 0 when no revenue', () => {
    expect(makeStats().getPayoutRatio()).toBe(0);
  });

  it('getPayoutRatio correct', () => {
    const s = reconstitute({ totalRevenue: 10000, totalPayout: 7500 });
    expect(s.getPayoutRatio()).toBe(0.75);
  });

  it('isHealthy true for low cancel/refund rates', () => {
    const s = reconstitute({
      totalOrders: 100,
      totalCancelled: 2,
      totalRevenue: 10000,
      totalRefund: 500,
    });
    expect(s.isHealthy()).toBe(true);
  });

  it('isHealthy false for high cancel rate', () => {
    const s = reconstitute({
      totalOrders: 100,
      totalCancelled: 10,
      totalRevenue: 10000,
      totalRefund: 500,
    });
    expect(s.isHealthy()).toBe(false);
  });

  it('isHighVolume true for >= 1000 orders', () => {
    const s = reconstitute({ totalOrders: 1000 });
    expect(s.isHighVolume()).toBe(true);
  });

  it('isHighVolume false for < 1000 orders', () => {
    expect(makeStats().isHighVolume()).toBe(false);
  });
});

describe('VendorStatsEntity — recordOrder', () => {
  it('records order', () => {
    const s = makeStats();
    s.recordOrder(500, NOW);
    expect(s.totalOrders).toBe(1);
    expect(s.totalRevenue).toBe(500);
  });

  it('throws on non-positive amount', () => {
    const s = makeStats();
    expect(() => s.recordOrder(0, NOW)).toThrow();
    expect(() => s.recordOrder(-1, NOW)).toThrow();
  });

  it('throws on non-finite amount', () => {
    const s = makeStats();
    expect(() => s.recordOrder(NaN, NOW)).toThrow();
    expect(() => s.recordOrder(Infinity, NOW)).toThrow();
  });
});

describe('VendorStatsEntity — recordRefund', () => {
  it('records refund', () => {
    const s = makeStats();
    s.recordRefund(200, NOW);
    expect(s.totalRefund).toBe(200);
  });

  it('throws on negative amount', () => {
    const s = makeStats();
    expect(() => s.recordRefund(-1, NOW)).toThrow();
  });

  it('throws on non-finite amount', () => {
    const s = makeStats();
    expect(() => s.recordRefund(NaN, NOW)).toThrow();
  });
});

describe('VendorStatsEntity — recordCancellation', () => {
  it('records cancellation', () => {
    const s = makeStats();
    s.recordCancellation(NOW);
    expect(s.totalCancelled).toBe(1);
  });
});

describe('VendorStatsEntity — recordPayout', () => {
  it('records payout', () => {
    const s = makeStats();
    s.recordPayout(1000, NOW);
    expect(s.totalPayout).toBe(1000);
  });

  it('throws on negative amount', () => {
    const s = makeStats();
    expect(() => s.recordPayout(-1, NOW)).toThrow();
  });

  it('throws on non-finite amount', () => {
    const s = makeStats();
    expect(() => s.recordPayout(NaN, NOW)).toThrow();
  });
});

describe('VendorStatsEntity — reconstitute coverage', () => {
  it('reconstitute with deletedAt', () => {
    const s = reconstitute({ deletedAt: NOW });
    expect(s.deletedAt).toBe(NOW);
  });
});
