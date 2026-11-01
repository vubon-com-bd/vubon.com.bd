/**
 * SplitPercentageVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SplitPercentageVO', () => {
  describe('create()', () => {
    it('creates valid percentage', () => {
      expect(SplitPercentageVO.create(50).value).toBe(50);
    });
    it('accepts 0.01 (min)', () => {
      expect(SplitPercentageVO.create(0.01).value).toBe(0.01);
    });
    it('accepts 100 (max)', () => {
      expect(SplitPercentageVO.create(100).value).toBe(100);
    });
    it('rounds to 2 decimals', () => {
      expect(SplitPercentageVO.create(33.333).value).toBe(33.33);
    });
    it('throws below 0.01', () => {
      expect(() => SplitPercentageVO.create(0)).toThrow(ValidationError);
      expect(() => SplitPercentageVO.create(0.001)).toThrow(ValidationError);
    });
    it('throws above 100', () => {
      expect(() => SplitPercentageVO.create(100.01)).toThrow(ValidationError);
    });
    it('throws on NaN', () => {
      expect(() => SplitPercentageVO.create(NaN)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves value', () => {
      expect(SplitPercentageVO.reconstitute(33.33).value).toBe(33.33);
    });
  });

  describe('toFraction()', () => {
    it('converts to 0-1 range', () => {
      expect(SplitPercentageVO.create(50).toFraction()).toBe(0.5);
    });
  });

  describe('applyTo()', () => {
    it('applies percentage to total', () => {
      expect(SplitPercentageVO.create(50).applyTo(200)).toBe(100);
    });
    it('rounds to 2 decimals', () => {
      expect(SplitPercentageVO.create(33.33).applyTo(100)).toBe(33.33);
    });
    it('handles 0 total', () => {
      expect(SplitPercentageVO.create(50).applyTo(0)).toBe(0);
    });
  });
});
