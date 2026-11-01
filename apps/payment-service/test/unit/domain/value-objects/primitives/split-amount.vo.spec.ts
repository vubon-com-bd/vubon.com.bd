/**
 * SplitAmountVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SplitAmountVO', () => {
  describe('create()', () => {
    it('creates valid amount', () => {
      const vo = SplitAmountVO.create(50, 'BDT');
      expect(vo.amount).toBe(50);
      expect(vo.currency).toBe('BDT');
    });
    it('uppercases currency', () => {
      expect(SplitAmountVO.create(50, 'bdt').currency).toBe('BDT');
    });
    it('rounds to 2 decimals', () => {
      expect(SplitAmountVO.create(50.126, 'BDT').amount).toBe(50.13);
    });
    it('throws on zero', () => {
      expect(() => SplitAmountVO.create(0, 'BDT')).toThrow(ValidationError);
    });
    it('throws on negative', () => {
      expect(() => SplitAmountVO.create(-1, 'BDT')).toThrow(ValidationError);
    });
    it('throws on NaN', () => {
      expect(() => SplitAmountVO.create(NaN, 'BDT')).toThrow(ValidationError);
    });
    it('throws on empty currency', () => {
      expect(() => SplitAmountVO.create(50, '')).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('preserves amount', () => {
      expect(SplitAmountVO.reconstitute(50, 'BDT').amount).toBe(50);
    });
  });
});
