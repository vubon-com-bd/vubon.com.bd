/**
 * ProductRatingService — Unit Tests
 * (Bayesian average + Wilson score)
 */
import { describe, it, expect } from '@jest/globals';
import { ProductRatingService } from '../../../../src/module/domain/services/product-rating.service.js';

describe('ProductRatingService', () => {
  describe('summarize()', () => {
    it('computes average + distribution', () => {
      const r = ProductRatingService.summarize([5, 4, 3, 5]);
      expect(r.totalReviews).toBe(4);
      expect(r.averageRating).toBe(4.25);
      expect(r.distribution[5]).toBe(2);
      expect(r.distribution[4]).toBe(1);
      expect(r.distribution[3]).toBe(1);
    });

    it('empty list → 0 average', () => {
      const r = ProductRatingService.summarize([]);
      expect(r.totalReviews).toBe(0);
      expect(r.averageRating).toBe(0);
    });

    it('throws for invalid rating', () => {
      expect(() => ProductRatingService.summarize([6])).toThrow();
    });
  });

  describe('bayesianAverage()', () => {
    it('new product pulls toward global avg', () => {
      const r = ProductRatingService.bayesianAverage({
        averageRating: 5,
        totalReviews: 1,
      });
      expect(r).toBeLessThan(5);
      expect(r).toBeGreaterThan(3.5);
    });

    it('many reviews approaches true average', () => {
      const r = ProductRatingService.bayesianAverage({
        averageRating: 4.8,
        totalReviews: 1000,
      });
      expect(r).toBeCloseTo(4.8, 1);
    });

    it('zero reviews → global average', () => {
      const r = ProductRatingService.bayesianAverage({
        averageRating: 0,
        totalReviews: 0,
      });
      expect(r).toBe(3.5);
    });
  });

  describe('wilsonScore()', () => {
    it('returns 0 for no reviews', () => {
      expect(
        ProductRatingService.wilsonScore({ positiveCount: 0, totalCount: 0 }),
      ).toBe(0);
    });

    it('5/5 positive → high score', () => {
      const s = ProductRatingService.wilsonScore({
        positiveCount: 5,
        totalCount: 5,
      });
      expect(s).toBeGreaterThan(0.5);
    });

    it('0/10 positive → low score', () => {
      const s = ProductRatingService.wilsonScore({
        positiveCount: 0,
        totalCount: 10,
      });
      expect(s).toBe(0);
    });
  });

  describe('isSuspiciousSpike()', () => {
    it('detects spike with many low ratings', () => {
      const result = ProductRatingService.isSuspiciousSpike([1, 1, 2, 1, 2, 1]);
      expect(result).toBe(true);
    });

    it('normal distribution → not suspicious', () => {
      const result = ProductRatingService.isSuspiciousSpike([4, 5, 4, 5, 4, 5]);
      expect(result).toBe(false);
    });
  });
});
