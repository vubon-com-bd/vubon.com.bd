/**
 * ReviewRatingVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ReviewRatingVO } from '../../../../src/module/domain/value-objects/primitives/review-rating.vo.js';

describe('ReviewRatingVO', () => {
  describe('create()', () => {
    it('creates 1', () => expect(ReviewRatingVO.create(1).value).toBe(1));
    it('creates 5', () => expect(ReviewRatingVO.create(5).value).toBe(5));
    it('creates 3', () => expect(ReviewRatingVO.create(3).value).toBe(3));
    it('throws for 0', () => expect(() => ReviewRatingVO.create(0)).toThrow());
    it('throws for 6', () => expect(() => ReviewRatingVO.create(6)).toThrow());
    it('throws for non-integer', () => expect(() => ReviewRatingVO.create(3.5)).toThrow());
    it('throws for NaN', () => expect(() => ReviewRatingVO.create(NaN)).toThrow());
  });

  describe('predicates', () => {
    it('isPositive for 5', () => expect(ReviewRatingVO.create(5).isPositive()).toBe(true));
    it('isPositive for 4', () => expect(ReviewRatingVO.create(4).isPositive()).toBe(true));
    it('isNeutral for 3', () => expect(ReviewRatingVO.create(3).isNeutral()).toBe(true));
    it('isNegative for 2', () => expect(ReviewRatingVO.create(2).isNegative()).toBe(true));
    it('isNegative for 1', () => expect(ReviewRatingVO.create(1).isNegative()).toBe(true));
    it('not isPositive for 3', () => expect(ReviewRatingVO.create(3).isPositive()).toBe(false));
  });

  describe('toPercentage()', () => {
    it('5 → 100', () => expect(ReviewRatingVO.create(5).toPercentage()).toBe(100));
    it('1 → 20', () => expect(ReviewRatingVO.create(1).toPercentage()).toBe(20));
    it('3 → 60', () => expect(ReviewRatingVO.create(3).toPercentage()).toBe(60));
  });
});
