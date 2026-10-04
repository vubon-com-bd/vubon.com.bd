/**
 * ReviewRatingVO — unit tests
 */
import { ReviewRatingVO } from '../../../src/module/domain/value-objects/primitives/review-rating.vo.js';
import { InvalidRatingError } from '../../../src/module/domain/errors/review.errors.js';

describe('ReviewRatingVO', () => {
  describe('create()', () => {
    it('should accept rating 1', () => {
      expect(ReviewRatingVO.create(1).value).toBe(1);
    });

    it('should accept rating 5', () => {
      expect(ReviewRatingVO.create(5).value).toBe(5);
    });

    it('should reject rating 0', () => {
      expect(() => ReviewRatingVO.create(0)).toThrow(InvalidRatingError);
    });

    it('should reject rating 6', () => {
      expect(() => ReviewRatingVO.create(6)).toThrow(InvalidRatingError);
    });

    it('should reject non-integer', () => {
      expect(() => ReviewRatingVO.create(3.5)).toThrow(InvalidRatingError);
    });
  });

  describe('isPositive / isNeutral / isNegative', () => {
    it('rating 4 or 5 is positive', () => {
      expect(ReviewRatingVO.create(4).isPositive()).toBe(true);
      expect(ReviewRatingVO.create(5).isPositive()).toBe(true);
      expect(ReviewRatingVO.create(3).isPositive()).toBe(false);
    });

    it('rating 3 is neutral', () => {
      expect(ReviewRatingVO.create(3).isNeutral()).toBe(true);
      expect(ReviewRatingVO.create(4).isNeutral()).toBe(false);
    });

    it('rating 1 or 2 is negative', () => {
      expect(ReviewRatingVO.create(1).isNegative()).toBe(true);
      expect(ReviewRatingVO.create(2).isNegative()).toBe(true);
      expect(ReviewRatingVO.create(3).isNegative()).toBe(false);
    });
  });
});
