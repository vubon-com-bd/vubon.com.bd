import { VendorStatsAggregatorService } from '../../../../src/module/domain/services/vendor-stats-aggregator.service.js';
import type { RawOrder } from '../../../../src/module/domain/services/vendor-stats-aggregator.service.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeOrder(
  amount: number,
  status: RawOrder['status'] = 'delivered',
  createdAt = '2026-01-15T00:00:00.000Z',
): RawOrder {
  return {
    orderId: 'o-' + Math.random().toString(36).slice(2, 8),
    amount, currency: 'BDT', status, createdAt,
  };
}

describe('VendorStatsAggregatorService', () => {
  describe('filterByRange', () => {
    it('keeps items within range', () => {
      const items = [
        { createdAt: '2026-01-05T00:00:00Z' },
        { createdAt: '2026-01-15T00:00:00Z' },
        { createdAt: '2026-01-25T00:00:00Z' },
      ];
      const r = VendorStatsAggregatorService.filterByRange(
        items, '2026-01-10T00:00:00Z', '2026-01-20T00:00:00Z',
      );
      expect(r).toHaveLength(1);
    });

    it('throws on invalid range', () => {
      expect(() => VendorStatsAggregatorService.filterByRange([], 'bad', 'also-bad')).toThrow(ValidationError);
    });
  });

  describe('sumRevenue / sumRefunds / sumPayouts', () => {
    it('sumRevenue excludes cancelled', () => {
      const r = VendorStatsAggregatorService.sumRevenue([
        makeOrder(100), makeOrder(200),
        makeOrder(500, 'cancelled'), makeOrder(300, 'refunded'),
      ]);
      expect(r).toBe(300);
    });

    it('sumRefunds sums amounts', () => {
      const r = VendorStatsAggregatorService.sumRefunds([
        { amount: 50, currency: 'BDT', createdAt: '2026-01-01T00:00:00Z' },
        { amount: 30, currency: 'BDT', createdAt: '2026-01-02T00:00:00Z' },
      ]);
      expect(r).toBe(80);
    });

    it('sumPayouts sums amounts', () => {
      const r = VendorStatsAggregatorService.sumPayouts([
        { amount: 500, currency: 'BDT', paidAt: '2026-01-01T00:00:00Z' },
        { amount: 200, currency: 'BDT', paidAt: '2026-01-02T00:00:00Z' },
      ]);
      expect(r).toBe(700);
    });
  });

  describe('computeSnapshot', () => {
    it('computes all fields', () => {
      const r = VendorStatsAggregatorService.computeSnapshot({
        orders: [
          makeOrder(100, 'delivered', '2026-01-05T00:00:00Z'),
          makeOrder(200, 'delivered', '2026-01-06T00:00:00Z'),
          makeOrder(50, 'cancelled', '2026-01-07T00:00:00Z'),
        ],
        refunds: [], payouts: [],
        periodStart: '2026-01-01T00:00:00Z',
        periodEnd: '2026-02-01T00:00:00Z',
        currency: 'BDT',
      });
      expect(r.totalOrders).toBe(3);
      expect(r.deliveredOrders).toBe(2);
      expect(r.cancelledOrders).toBe(1);
      expect(r.totalRevenue).toBe(300);
      expect(r.currency).toBe('BDT');
    });

    it('handles empty period', () => {
      const r = VendorStatsAggregatorService.computeSnapshot({
        orders: [], refunds: [], payouts: [],
        periodStart: '2026-01-01T00:00:00Z',
        periodEnd: '2026-02-01T00:00:00Z',
        currency: 'BDT',
      });
      expect(r.totalOrders).toBe(0);
      expect(r.averageOrderValue).toBe(0);
    });
  });

  describe('trend', () => {
    it('up for growth', () => {
      const r = VendorStatsAggregatorService.trend(150, 100);
      expect(r.direction).toBe('up');
      expect(r.deltaPercent).toBeGreaterThan(0);
    });

    it('down for decline', () => {
      expect(VendorStatsAggregatorService.trend(50, 100).direction).toBe('down');
    });

    it('flat when similar', () => {
      expect(VendorStatsAggregatorService.trend(100, 100).direction).toBe('flat');
    });

    it('throws on non-numeric', () => {
      expect(() => VendorStatsAggregatorService.trend(Number.NaN, 100)).toThrow(ValidationError);
    });
  });

  describe('rates', () => {
    const snapshot = {
      periodStart: '2026-01-01T00:00:00Z',
      periodEnd: '2026-02-01T00:00:00Z',
      totalOrders: 10, deliveredOrders: 8, cancelledOrders: 2,
      totalRevenue: 1000, totalRefunds: 100, netRevenue: 900,
      totalPayouts: 700, averageOrderValue: 100, currency: 'BDT',
    };

    it('fulfillmentRate', () => {
      expect(VendorStatsAggregatorService.fulfillmentRate(snapshot)).toBe(0.8);
    });

    it('cancellationRate', () => {
      expect(VendorStatsAggregatorService.cancellationRate(snapshot)).toBe(0.2);
    });

    it('refundRate', () => {
      expect(VendorStatsAggregatorService.refundRate(snapshot)).toBe(0.1);
    });

    it('payoutRatio', () => {
      expect(VendorStatsAggregatorService.payoutRatio(snapshot)).toBe(0.7);
    });

    it('handles zero totals', () => {
      const empty = {
        ...snapshot,
        totalOrders: 0, deliveredOrders: 0, cancelledOrders: 0,
        totalRevenue: 0, totalRefunds: 0, totalPayouts: 0,
      };
      expect(VendorStatsAggregatorService.fulfillmentRate(empty)).toBe(0);
      expect(VendorStatsAggregatorService.cancellationRate(empty)).toBe(0);
      expect(VendorStatsAggregatorService.refundRate(empty)).toBe(0);
      expect(VendorStatsAggregatorService.payoutRatio(empty)).toBe(0);
    });
  });

  describe('dailyBreakdown', () => {
    it('buckets orders per day', () => {
      const r = VendorStatsAggregatorService.dailyBreakdown(
        [
          makeOrder(100, 'delivered', '2026-01-05T10:00:00Z'),
          makeOrder(200, 'delivered', '2026-01-05T15:00:00Z'),
          makeOrder(300, 'delivered', '2026-01-06T10:00:00Z'),
        ],
        '2026-01-05T00:00:00Z', '2026-01-07T00:00:00Z',
      );
      const day5 = r.find((d) => d.date === '2026-01-05');
      expect(day5?.orders).toBe(2);
    });
  });

  describe('merge', () => {
    it('sums totals', () => {
      const a = {
        periodStart: '', periodEnd: '',
        totalOrders: 5, deliveredOrders: 4, cancelledOrders: 1,
        totalRevenue: 500, totalRefunds: 50, netRevenue: 450,
        totalPayouts: 400, averageOrderValue: 100, currency: 'BDT',
      };
      const b = { ...a, totalOrders: 3, totalRevenue: 300 };
      const r = VendorStatsAggregatorService.merge([a, b]);
      expect(r?.totalOrders).toBe(8);
      expect(r?.totalRevenue).toBe(800);
    });

    it('null for empty list', () => {
      expect(VendorStatsAggregatorService.merge([])).toBeNull();
    });
  });
});
