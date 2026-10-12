import { RatingScoreVO } from '../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('RatingScoreVO', () => {
  describe('create()', () => {
    it('accepts zero', () => {
      expect(RatingScoreVO.create(0).value).toBe(0);
    });

    it('accepts max', () => {
      expect(RatingScoreVO.create(5).value).toBe(5);
    });

    it('rounds to 1 decimal', () => {
      expect(RatingScoreVO.create(4.567).value).toBe(4.6);
    });

    it('throws on negative', () => {
      expect(() => RatingScoreVO.create(-1)).toThrow(ValidationError);
    });

    it('throws on above max', () => {
      expect(() => RatingScoreVO.create(6)).toThrow(ValidationError);
    });

    it('throws on NaN', () => {
      expect(() => RatingScoreVO.create(Number.NaN)).toThrow(ValidationError);
    });
  });

  describe('named constructors', () => {
    it('zero()', () => {
      expect(RatingScoreVO.zero().value).toBe(0);
    });

    it('max()', () => {
      expect(RatingScoreVO.max().value).toBe(5);
    });
  });

  describe('quality predicates', () => {
    it('isPositive for >= 4', () => {
      expect(RatingScoreVO.create(4).isPositive()).toBe(true);
      expect(RatingScoreVO.create(5).isPositive()).toBe(true);
      expect(RatingScoreVO.create(3.9).isPositive()).toBe(false);
    });

    it('isNeutral for 3-4', () => {
      expect(RatingScoreVO.create(3.5).isNeutral()).toBe(true);
      expect(RatingScoreVO.create(4).isNeutral()).toBe(false);
    });

    it('isNegative for < 3', () => {
      expect(RatingScoreVO.create(2).isNegative()).toBe(true);
      expect(RatingScoreVO.create(0).isNegative()).toBe(false);
    });
  });

  describe('auto thresholds', () => {
    it('shouldAutoHide for < 2', () => {
      expect(RatingScoreVO.create(1).shouldAutoHide()).toBe(true);
      expect(RatingScoreVO.create(3).shouldAutoHide()).toBe(false);
    });

    it('shouldAutoFlag for < 3', () => {
      expect(RatingScoreVO.create(2).shouldAutoFlag()).toBe(true);
      expect(RatingScoreVO.create(4).shouldAutoFlag()).toBe(false);
    });
  });

  describe('asStars()', () => {
    it('renders full stars for integer', () => {
      expect(RatingScoreVO.create(4).asStars()).toBe('★★★★☆');
    });

    it('renders empty for zero', () => {
      expect(RatingScoreVO.zero().asStars()).toBe('☆☆☆☆☆');
    });

    it('renders full for 5', () => {
      expect(RatingScoreVO.max().asStars()).toBe('★★★★★');
    });
  });
});
