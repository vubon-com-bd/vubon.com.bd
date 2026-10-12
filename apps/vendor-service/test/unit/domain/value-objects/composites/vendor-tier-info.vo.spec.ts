import { VendorTierInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-tier-info.vo.js';
import { VendorTierVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const NOW = '2026-01-01T00:00:00.000Z';

function makeInfo(overrides: {
  currentTier?: string;
  currentSales?: number;
} = {}): VendorTierInfoVO {
  return VendorTierInfoVO.create({
    currentTier: VendorTierVO.reconstitute(overrides.currentTier ?? 'bronze'),
    currentSales: overrides.currentSales ?? 50_000,
    lastEvaluatedAt: NOW,
  });
}

describe('VendorTierInfoVO', () => {
  describe('create()', () => {
    it('creates valid tier info', () => {
      const v = makeInfo();
      expect(v.currentTier.value).toBe('bronze');
      expect(v.currentSales).toBe(50_000);
    });

    it('throws on negative sales', () => {
      expect(() => makeInfo({ currentSales: -1 })).toThrow(ValidationError);
    });

    it('throws on invalid evaluatedAt', () => {
      expect(() =>
        VendorTierInfoVO.create({
          currentTier: VendorTierVO.reconstitute('bronze'),
          currentSales: 0,
          lastEvaluatedAt: 'bad',
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('getProgressToNextTier', () => {
    it('returns 0-1 ratio', () => {
      const r = makeInfo().getProgressToNextTier();
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(1);
    });

    it('1 at top tier', () => {
      const v = makeInfo({ currentTier: 'diamond', currentSales: 500_000_000 });
      expect(v.getProgressToNextTier()).toBe(1);
    });
  });

  describe('getAmountToNextTier', () => {
    it('positive for bronze', () => {
      expect(makeInfo({ currentTier: 'bronze', currentSales: 0 }).getAmountToNextTier()).toBeGreaterThan(0);
    });

    it('0 at top tier', () => {
      expect(makeInfo({ currentTier: 'diamond', currentSales: 500_000_000 }).getAmountToNextTier()).toBe(0);
    });
  });

  describe('isAtTopTier', () => {
    it('true for diamond', () => {
      expect(makeInfo({ currentTier: 'diamond' }).isAtTopTier()).toBe(true);
    });

    it('false for bronze', () => {
      expect(makeInfo({ currentTier: 'bronze' }).isAtTopTier()).toBe(false);
    });
  });

  describe('computeCorrectTier', () => {
    it('returns tier for current sales', () => {
      const v = makeInfo({ currentTier: 'bronze', currentSales: 500_000 });
      expect(v.computeCorrectTier().value).toBe('silver');
    });
  });

  describe('shouldUpgrade / shouldDowngrade', () => {
    it('shouldUpgrade true when sales cross', () => {
      const v = makeInfo({ currentTier: 'bronze', currentSales: 500_000 });
      expect(v.shouldUpgrade()).toBe(true);
    });

    it('shouldUpgrade false when matching tier', () => {
      const v = makeInfo({ currentTier: 'silver', currentSales: 500_000 });
      expect(v.shouldUpgrade()).toBe(false);
    });

    it('shouldDowngrade true when sales drop', () => {
      const v = makeInfo({ currentTier: 'gold', currentSales: 50_000 });
      expect(v.shouldDowngrade()).toBe(true);
    });

    it('shouldDowngrade false when matching', () => {
      const v = makeInfo({ currentTier: 'bronze', currentSales: 50_000 });
      expect(v.shouldDowngrade()).toBe(false);
    });
  });
});
