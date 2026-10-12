import { VendorRatingSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-rating-summary.vo.js';
import { RatingScoreVO } from '../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const NOW = '2026-01-01T00:00:00.000Z';

function makeSummary(overrides: {
  overall?: number;
  totalReviews?: number;
  distribution?: { 1: number; 2: number; 3: number; 4: number; 5: number };
  categories?: Array<{ category: string; score: number; count: number }>;
} = {}): VendorRatingSummaryVO {
  const total = overrides.totalReviews ?? 10;
  return VendorRatingSummaryVO.create({
    overall: RatingScoreVO.create(overrides.overall ?? 4.5),
    totalReviews: total,
    distribution: overrides.distribution ?? { 1: 0, 2: 0, 3: 1, 4: 3, 5: 6 },
    categories: overrides.categories ?? [],
    updatedAt: NOW,
  });
}

describe('VendorRatingSummaryVO', () => {
  describe('create()', () => {
    it('creates valid summary', () => {
      const v = makeSummary();
      expect(v.overall.value).toBe(4.5);
      expect(v.totalReviews).toBe(10);
    });

    it('throws on invalid overall', () => {
      expect(() => makeSummary({ overall: -1 })).toThrow(ValidationError);
    });

    it('throws when distribution sum mismatches', () => {
      expect(() =>
        makeSummary({ totalReviews: 10, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }),
      ).toThrow(ValidationError);
    });

    it('throws on invalid updatedAt', () => {
      expect(() =>
        VendorRatingSummaryVO.create({
          overall: RatingScoreVO.create(4),
          totalReviews: 0,
          distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          categories: [],
          updatedAt: 'bad',
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('isDisplayable', () => {
    it('true with enough reviews', () => {
      expect(makeSummary({ totalReviews: 10 }).isDisplayable()).toBe(true);
    });

    it('false with too few', () => {
      expect(makeSummary({ totalReviews: 2, distribution: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 1 } }).isDisplayable()).toBe(false);
    });
  });

  describe('percentageFor', () => {
    it('returns percentage', () => {
      const v = makeSummary({ totalReviews: 10, distribution: { 1: 0, 2: 0, 3: 0, 4: 2, 5: 8 } });
      expect(v.percentageFor(5)).toBe(80);
      expect(v.percentageFor(4)).toBe(20);
    });

    it('0 when no reviews', () => {
      const v = makeSummary({ totalReviews: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
      expect(v.percentageFor(5)).toBe(0);
    });
  });

  describe('positiveRatio / negativeRatio', () => {
    it('positiveRatio', () => {
      const v = makeSummary({ totalReviews: 10, distribution: { 1: 0, 2: 1, 3: 1, 4: 3, 5: 5 } });
      expect(v.positiveRatio()).toBe(0.8);
    });

    it('negativeRatio', () => {
      const v = makeSummary({ totalReviews: 10, distribution: { 1: 1, 2: 1, 3: 1, 4: 3, 5: 4 } });
      expect(v.negativeRatio()).toBe(0.2);
    });
  });

  describe('getCategoryScore', () => {
    it('returns category score', () => {
      const v = makeSummary({
        categories: [{ category: 'quality', score: 4.5, count: 5 }],
      });
      expect(v.getCategoryScore('quality')).toBe(4.5);
    });

    it('undefined for missing', () => {
      expect(makeSummary().getCategoryScore('quality')).toBeUndefined();
    });
  });
});
