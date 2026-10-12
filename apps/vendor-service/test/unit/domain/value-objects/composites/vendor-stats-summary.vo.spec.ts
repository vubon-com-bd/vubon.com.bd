import { VendorStatsSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-stats-summary.vo.js';
import { RatingScoreVO } from '../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeSummary(overrides: {
  totalProducts?: number;
  totalOrders?: number;
  totalRevenue?: number;
  totalPayout?: number;
  fulfillmentRate?: number;
} = {}): VendorStatsSummaryVO {
  return VendorStatsSummaryVO.create({
    totalProducts: overrides.totalProducts ?? 100,
    totalOrders: overrides.totalOrders ?? 500,
    totalRevenue: overrides.totalRevenue ?? 100_000,
    totalCommission: 15_000,
    totalPayout: overrides.totalPayout ?? 85_000,
    averageRating: RatingScoreVO.create(4.5),
    fulfillmentRate: overrides.fulfillmentRate ?? 0.95,
    currency: 'BDT',
  });
}

describe('VendorStatsSummaryVO', () => {
  describe('create()', () => {
    it('creates valid summary', () => {
      const v = makeSummary();
      expect(v.totalProducts).toBe(100);
      expect(v.totalOrders).toBe(500);
    });

    it('throws on negative stats', () => {
      expect(() => makeSummary({ totalProducts: -1 })).toThrow(ValidationError);
    });

    it('throws on fulfillmentRate out of range', () => {
      expect(() => makeSummary({ fulfillmentRate: 1.5 })).toThrow(ValidationError);
      expect(() => makeSummary({ fulfillmentRate: -0.1 })).toThrow(ValidationError);
    });
  });

  describe('getPlatformEarning', () => {
    it('revenue - payout', () => {
      const v = makeSummary({ totalRevenue: 100_000, totalPayout: 85_000 });
      expect(v.getPlatformEarning()).toBe(15_000);
    });
  });

  describe('getAverageOrderValue', () => {
    it('revenue / orders', () => {
      const v = makeSummary({ totalRevenue: 100_000, totalOrders: 500 });
      expect(v.getAverageOrderValue()).toBe(200);
    });

    it('0 when no orders', () => {
      const v = makeSummary({ totalOrders: 0, totalRevenue: 0 });
      expect(v.getAverageOrderValue()).toBe(0);
    });
  });

  describe('getPayoutRatio', () => {
    it('payout / revenue', () => {
      const v = makeSummary({ totalRevenue: 100_000, totalPayout: 85_000 });
      expect(v.getPayoutRatio()).toBe(0.85);
    });

    it('0 when no revenue', () => {
      const v = makeSummary({ totalRevenue: 0, totalPayout: 0 });
      expect(v.getPayoutRatio()).toBe(0);
    });
  });

  describe('flags', () => {
    it('isHighVolume', () => {
      expect(makeSummary({ totalOrders: 1000 }).isHighVolume()).toBe(true);
      expect(makeSummary({ totalOrders: 100 }).isHighVolume()).toBe(false);
    });

    it('isLowFulfillment', () => {
      expect(makeSummary({ fulfillmentRate: 0.5 }).isLowFulfillment()).toBe(true);
      expect(makeSummary({ fulfillmentRate: 0.9 }).isLowFulfillment()).toBe(false);
    });

    it('isHealthy', () => {
      expect(makeSummary({ fulfillmentRate: 0.95 }).isHealthy()).toBe(true);
      expect(makeSummary({ fulfillmentRate: 0.5 }).isHealthy()).toBe(false);
    });
  });

  describe('toDisplaySummary', () => {
    it('returns display strings', () => {
      const r = makeSummary().toDisplaySummary();
      expect(r.products).toBe('100');
      expect(r.orders).toBe('500');
      expect(r.revenue).toContain('BDT');
    });
  });
});
