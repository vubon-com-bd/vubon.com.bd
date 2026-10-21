/**
 * RefundAmountVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('RefundAmountVO', () => {
  describe('create()', () => {
    it('creates valid refund amount', () => {
      const vo = RefundAmountVO.create(50, 'BDT');
      expect(vo.amount).toBe(50);
      expect(vo.currency).toBe('BDT');
    });
    it('uppercases currency', () => {
      expect(RefundAmountVO.create(50, 'bdt').currency).toBe('BDT');
    });
    it('rounds to 2 decimals', () => {
      expect(RefundAmountVO.create(50.126, 'BDT').amount).toBe(50.13);
    });
    it('throws on zero', () => {
      expect(() => RefundAmountVO.create(0, 'BDT')).toThrow(ValidationError);
    });
    it('throws on negative', () => {
      expect(() => RefundAmountVO.create(-1, 'BDT')).toThrow(ValidationError);
    });
    it('throws on NaN', () => {
      expect(() => RefundAmountVO.create(NaN, 'BDT')).toThrow(ValidationError);
    });
    it('throws on empty currency', () => {
      expect(() => RefundAmountVO.create(50, '')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves amount', () => {
      expect(RefundAmountVO.reconstitute(50, 'BDT').amount).toBe(50);
    });
  });

  describe('exceeds()', () => {
    it('true when exceeds', () => {
      expect(RefundAmountVO.create(100, 'BDT').exceeds(50)).toBe(true);
    });
    it('false when within', () => {
      expect(RefundAmountVO.create(30, 'BDT').exceeds(100)).toBe(false);
    });
  });

  describe('isFullRefundOf()', () => {
    it('true when equal', () => {
      expect(RefundAmountVO.create(100, 'BDT').isFullRefundOf(100)).toBe(true);
    });
    it('false when partial', () => {
      expect(RefundAmountVO.create(50, 'BDT').isFullRefundOf(100)).toBe(false);
    });
  });
});
