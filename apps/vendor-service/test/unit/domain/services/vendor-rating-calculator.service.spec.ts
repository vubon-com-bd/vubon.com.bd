/**
 * VendorRatingCalculatorService — unit tests
 * @module vendor-service/test/unit/domain/services
 */
import { VendorRatingCalculatorService } from '../../../../src/module/domain/services/vendor-rating-calculator.service.js';
import { VendorReviewEntity } from '../../../../src/module/domain/entities/vendor-review.entity.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorReviewStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-review-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

let counter = 0;
function nextUUID(): string {
  counter += 1;
  const suffix = String(counter).padStart(12, '0');
  return `7c9e6679-7425-40de-944b-${suffix}`;
}

function makeReview(rating: number, status = 'approved'): VendorReviewEntity {
  const id = nextUUID();
  return VendorReviewEntity.reconstitute({
    id,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: UUID,
      userId: UUID,
      orderId: id,
      rating: RatingScoreVO.create(rating),
      comment: undefined,
      categories: [],
      status: VendorReviewStatusVO.create(status),
      isVerifiedPurchase: true,
      flagCount: 0,
      createdAt: NOW,
    },
  });
}

describe('VendorRatingCalculatorService', () => {
  describe('emptyDistribution()', () => {
    it('returns zeroed distribution', () => {
      const d = VendorRatingCalculatorService.emptyDistribution();
      expect(d[1]).toBe(0);
      expect(d[5]).toBe(0);
    });
  });

  describe('distributionFromReviews()', () => {
    it('counts ratings by star', () => {
      const reviews = [
        makeReview(5), makeReview(5), makeReview(4),
        makeReview(3), makeReview(1),
      ];
      const d = VendorRatingCalculatorService.distributionFromReviews(reviews);
      expect(d[5]).toBe(2);
      expect(d[4]).toBe(1);
      expect(d[3]).toBe(1);
      expect(d[2]).toBe(0);
      expect(d[1]).toBe(1);
    });

    it('returns zeroed distribution for empty list', () => {
      const d = VendorRatingCalculatorService.distributionFromReviews([]);
      expect(d[1]).toBe(0);
      expect(d[5]).toBe(0);
    });
  });

  describe('computeOverall()', () => {
    it('returns 0 for empty distribution', () => {
      const overall = VendorRatingCalculatorService.computeOverall(
        VendorRatingCalculatorService.emptyDistribution(),
      );
      expect(overall.value).toBe(0);
    });

    it('computes weighted average', () => {
      const overall = VendorRatingCalculatorService.computeOverall({
        1: 0, 2: 0, 3: 0, 4: 1, 5: 1,
      });
      expect(overall.value).toBe(4.5);
    });

    it('handles all 5-star reviews', () => {
      const overall = VendorRatingCalculatorService.computeOverall({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 3,
      });
      expect(overall.value).toBe(5);
    });
  });

  describe('calculate()', () => {
    it('aggregates visible reviews', () => {
      const reviews = [
        makeReview(5, 'approved'),
        makeReview(4, 'approved'),
        makeReview(1, 'pending'),
        makeReview(1, 'hidden'),
      ];
      const r = VendorRatingCalculatorService.calculate(reviews);
      expect(r.totalReviews).toBe(2);
      expect(r.overall.value).toBe(4.5);
      expect(r.positiveRatio).toBeGreaterThan(0);
    });

    it('returns zeros when no visible reviews', () => {
      const reviews = [
        makeReview(5, 'pending'),
        makeReview(4, 'hidden'),
      ];
      const r = VendorRatingCalculatorService.calculate(reviews);
      expect(r.totalReviews).toBe(0);
      expect(r.overall.value).toBe(0);
    });
  });

  describe('shouldAutoHide()', () => {
    it('false when below min review threshold', () => {
      const overall = RatingScoreVO.create(1.5);
      expect(VendorRatingCalculatorService.shouldAutoHide(overall, 3)).toBe(false);
    });

    it('true when rating is low and enough reviews', () => {
      const overall = RatingScoreVO.create(1.5);
      expect(VendorRatingCalculatorService.shouldAutoHide(overall, 10)).toBe(true);
    });
  });

  describe('percentageFor()', () => {
    it('returns percentage of given star', () => {
      const d = { 1: 0, 2: 0, 3: 0, 4: 2, 5: 8 };
      expect(VendorRatingCalculatorService.percentageFor(d, 5)).toBe(80);
      expect(VendorRatingCalculatorService.percentageFor(d, 4)).toBe(20);
    });

    it('returns 0 for empty distribution', () => {
      const d = VendorRatingCalculatorService.emptyDistribution();
      expect(VendorRatingCalculatorService.percentageFor(d, 5)).toBe(0);
    });
  });

  describe('trend()', () => {
    it('improving when delta > 0.2', () => {
      const r = VendorRatingCalculatorService.trend(
        RatingScoreVO.create(4.5),
        RatingScoreVO.create(4.0),
      );
      expect(r).toBe('improving');
    });

    it('declining when delta < -0.2', () => {
      const r = VendorRatingCalculatorService.trend(
        RatingScoreVO.create(3.5),
        RatingScoreVO.create(4.2),
      );
      expect(r).toBe('declining');
    });

    it('stable when delta within 0.2', () => {
      const r = VendorRatingCalculatorService.trend(
        RatingScoreVO.create(4.1),
        RatingScoreVO.create(4.0),
      );
      expect(r).toBe('stable');
    });
  });

  describe('assertNonEmpty()', () => {
    it('throws on empty array', () => {
      expect(() => VendorRatingCalculatorService.assertNonEmpty([])).toThrow(ValidationError);
    });

    it('passes on non-empty array', () => {
      expect(() => VendorRatingCalculatorService.assertNonEmpty([1])).not.toThrow();
    });
  });
});


describe('VendorRatingCalculatorService — extended coverage', () => {
  describe('weightedAverage', () => {
    it('returns historicalAvg when recentCount=0', () => {
      const r = VendorRatingCalculatorService.weightedAverage(5, 4, 0);
      expect(r.value).toBe(4);
    });

    it('uses simple combination when recentCount < 5', () => {
      const r = VendorRatingCalculatorService.weightedAverage(5, 4, 3);
      expect(r.value).toBeGreaterThan(4);
      expect(r.value).toBeLessThan(5);
    });

    it('uses weighted formula when recentCount >= 5', () => {
      const r = VendorRatingCalculatorService.weightedAverage(5, 4, 10);
      expect(r.value).toBeGreaterThan(4);
      expect(r.value).toBeLessThanOrEqual(5);
    });
  });

  describe('shouldAutoFlag', () => {
    it('false when below display threshold', () => {
      expect(VendorRatingCalculatorService.shouldAutoFlag(RatingScoreVO.create(2), 3)).toBe(false);
    });

    it('true when rating is low and enough reviews', () => {
      expect(VendorRatingCalculatorService.shouldAutoFlag(RatingScoreVO.create(2), 10)).toBe(true);
    });
  });

  describe('categoryComposite', () => {
    it('returns 0 for empty', () => {
      expect(VendorRatingCalculatorService.categoryComposite([])).toBe(0);
    });

    it('returns weighted average', () => {
      const r = VendorRatingCalculatorService.categoryComposite([
        { score: 5, count: 3 },
        { score: 3, count: 1 },
      ]);
      expect(r).toBe(4.5);
    });

    it('ignores zero-count categories', () => {
      const r = VendorRatingCalculatorService.categoryComposite([
        { score: 5, count: 4 },
        { score: 1, count: 0 },
      ]);
      expect(r).toBe(5);
    });

    it('returns 0 when all counts are 0', () => {
      expect(VendorRatingCalculatorService.categoryComposite([
        { score: 5, count: 0 },
      ])).toBe(0);
    });
  });
});
