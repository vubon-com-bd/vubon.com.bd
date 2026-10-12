import { CommissionPercentVO } from '../../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CommissionPercentVO', () => {
  describe('create()', () => {
    it('throws on zero (MIN=1)', () => {
      expect(() => CommissionPercentVO.create(0)).toThrow(ValidationError);
    });

    it('accepts valid percent', () => {
      expect(CommissionPercentVO.create(15).value).toBe(15);
    });

    it('accepts max percent', () => {
      expect(CommissionPercentVO.create(50).value).toBe(50);
    });

    it('rounds to 2 decimals', () => {
      expect(CommissionPercentVO.create(15.126).value).toBe(15.13);
    });

    it('throws on negative', () => {
      expect(() => CommissionPercentVO.create(-1)).toThrow(ValidationError);
    });

    it('throws on above max', () => {
      expect(() => CommissionPercentVO.create(51)).toThrow(ValidationError);
    });

    it('throws on NaN', () => {
      expect(() => CommissionPercentVO.create(Number.NaN)).toThrow(ValidationError);
    });

    it('throws on Infinity', () => {
      expect(() => CommissionPercentVO.create(Number.POSITIVE_INFINITY)).toThrow(ValidationError);
    });
  });

  describe('named constructors', () => {
    it('zero()', () => {
      expect(CommissionPercentVO.zero().value).toBe(0);
    });

    it('defaultPercent()', () => {
      expect(CommissionPercentVO.defaultPercent().value).toBeGreaterThan(0);
    });
  });

  describe('applyTo()', () => {
    it('computes percent of amount', () => {
      expect(CommissionPercentVO.create(10).applyTo(1000)).toBe(100);
    });

    it('rounds to 2 decimals', () => {
      expect(CommissionPercentVO.create(15).applyTo(99.99)).toBeCloseTo(15.0, 1);
    });

    it('throws on negative amount', () => {
      expect(() => CommissionPercentVO.create(10).applyTo(-1)).toThrow(ValidationError);
    });
  });

  describe('isZero() / asFraction()', () => {
    it('isZero', () => {
      expect(CommissionPercentVO.zero().isZero()).toBe(true);
      expect(CommissionPercentVO.create(10).isZero()).toBe(false);
    });

    it('asFraction', () => {
      expect(CommissionPercentVO.create(10).asFraction()).toBe(0.1);
    });
  });
});
