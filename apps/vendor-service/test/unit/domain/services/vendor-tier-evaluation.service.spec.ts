/**
 * VendorTierEvaluationService — unit tests
 * @module vendor-service/test/unit/domain/services
 */
import { VendorTierEvaluationService } from '../../../../src/module/domain/services/vendor-tier-evaluation.service.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorTierEvaluationService', () => {
  describe('evaluate()', () => {
    it('returns upgrade when sales cross next threshold', () => {
      const r = VendorTierEvaluationService.evaluate(
        VendorTierVO.reconstitute('bronze'),
        500_000,
      );
      expect(r.direction).toBe('upgrade');
      expect(r.targetTier.value).toBe('silver');
      expect(r.shouldChange).toBe(true);
      expect(r.reason).toContain('bronze');
    });

    it('returns downgrade when sales drop below current tier', () => {
      const r = VendorTierEvaluationService.evaluate(
        VendorTierVO.reconstitute('gold'),
        50_000,
      );
      expect(r.direction).toBe('downgrade');
      expect(r.targetTier.value).toBe('bronze');
      expect(r.shouldChange).toBe(true);
    });

    it('returns none when sales still in current tier range', () => {
      const r = VendorTierEvaluationService.evaluate(
        VendorTierVO.reconstitute('silver'),
        500_000,
      );
      expect(r.direction).toBe('none');
      expect(r.shouldChange).toBe(false);
    });

    it('throws on negative sales', () => {
      expect(() =>
        VendorTierEvaluationService.evaluate(VendorTierVO.reconstitute('bronze'), -1),
      ).toThrow(ValidationError);
    });
  });

  describe('getProgress()', () => {
    it('returns next tier and progress info', () => {
      const r = VendorTierEvaluationService.getProgress(
        VendorTierVO.reconstitute('bronze'),
        50_000,
      );
      expect(r.nextTier?.value).toBe('silver');
      expect(r.amountToNext).toBeGreaterThan(0);
      expect(r.progressPercent).toBeGreaterThanOrEqual(0);
      expect(r.progressPercent).toBeLessThanOrEqual(1);
    });

    it('returns 100% at top tier', () => {
      const r = VendorTierEvaluationService.getProgress(
        VendorTierVO.reconstitute('diamond'),
        200_000_000,
      );
      expect(r.nextTier).toBeNull();
      expect(r.progressPercent).toBe(1);
      expect(r.amountToNext).toBe(0);
    });

    it('throws on negative sales', () => {
      expect(() =>
        VendorTierEvaluationService.getProgress(VendorTierVO.reconstitute('bronze'), -1),
      ).toThrow(ValidationError);
    });
  });

  describe('shouldPromote()', () => {
    it('true when sales cross next tier', () => {
      expect(
        VendorTierEvaluationService.shouldPromote(VendorTierVO.reconstitute('bronze'), 500_000),
      ).toBe(true);
    });
    it('false when still in current tier', () => {
      expect(
        VendorTierEvaluationService.shouldPromote(VendorTierVO.reconstitute('silver'), 100_000),
      ).toBe(false);
    });
  });

  describe('shouldDemote()', () => {
    it('true when sales drop below', () => {
      expect(
        VendorTierEvaluationService.shouldDemote(VendorTierVO.reconstitute('gold'), 50_000),
      ).toBe(true);
    });
    it('false when sales still support tier', () => {
      expect(
        VendorTierEvaluationService.shouldDemote(VendorTierVO.reconstitute('silver'), 500_000),
      ).toBe(false);
    });
  });

  describe('shouldGrantGrace()', () => {
    it('grants when performance above warning threshold', () => {
      const r = VendorTierEvaluationService.shouldGrantGrace(
        VendorTierVO.reconstitute('gold'),
        VendorTierVO.reconstitute('bronze'),
        70,
      );
      expect(r).toBe(true);
    });

    it('does not grant when performance below warning', () => {
      const r = VendorTierEvaluationService.shouldGrantGrace(
        VendorTierVO.reconstitute('gold'),
        VendorTierVO.reconstitute('bronze'),
        40,
      );
      expect(r).toBe(false);
    });

    it('does not grant when not a downgrade', () => {
      const r = VendorTierEvaluationService.shouldGrantGrace(
        VendorTierVO.reconstitute('bronze'),
        VendorTierVO.reconstitute('gold'),
        100,
      );
      expect(r).toBe(false);
    });
  });

  describe('effectiveTier()', () => {
    it('returns current tier when grace granted', () => {
      const r = VendorTierEvaluationService.effectiveTier(
        VendorTierVO.reconstitute('gold'),
        VendorTierVO.reconstitute('silver'),
        70,
      );
      expect(r.value).toBe('gold');
    });

    it('returns target when grace denied', () => {
      const r = VendorTierEvaluationService.effectiveTier(
        VendorTierVO.reconstitute('gold'),
        VendorTierVO.reconstitute('silver'),
        30,
      );
      expect(r.value).toBe('silver');
    });
  });

  describe('suggestTier()', () => {
    it('returns tier for sales when performance is ok', () => {
      const r = VendorTierEvaluationService.suggestTier(500_000, 80);
      expect(r.value).toBe('silver');
    });

    it('downgrades tier when performance is failing', () => {
      const r = VendorTierEvaluationService.suggestTier(500_000, 30);
      expect(r.value).toBe('bronze');
    });
  });

  describe('evaluateBatch()', () => {
    it('counts upgrades/downgrades/unchanged', () => {
      const r = VendorTierEvaluationService.evaluateBatch([
        { tier: VendorTierVO.reconstitute('bronze'), totalSales: 500_000 },
        { tier: VendorTierVO.reconstitute('gold'), totalSales: 50_000 },
        { tier: VendorTierVO.reconstitute('silver'), totalSales: 500_000 },
      ]);
      expect(r.upgrades).toBe(1);
      expect(r.downgrades).toBe(1);
      expect(r.unchanged).toBe(1);
    });

    it('handles empty array', () => {
      const r = VendorTierEvaluationService.evaluateBatch([]);
      expect(r.upgrades).toBe(0);
      expect(r.downgrades).toBe(0);
      expect(r.unchanged).toBe(0);
    });
  });
});
