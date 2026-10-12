import { CommissionAmountVO } from '../../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CommissionAmountVO', () => {
  describe('create()', () => {
    it('creates with amount + currency', () => {
      const vo = CommissionAmountVO.create(100, 'BDT');
      expect(vo.amount).toBe(100);
      expect(vo.currency).toBe('BDT');
    });

    it('uppercases currency', () => {
      expect(CommissionAmountVO.create(100, 'bdt').currency).toBe('BDT');
    });

    it('rounds to 2 decimals', () => {
      expect(CommissionAmountVO.create(100.567, 'BDT').amount).toBe(100.57);
    });

    it('throws on negative', () => {
      expect(() => CommissionAmountVO.create(-1, 'BDT')).toThrow(ValidationError);
    });

    it('throws on non-finite', () => {
      expect(() => CommissionAmountVO.create(Number.NaN, 'BDT')).toThrow(ValidationError);
    });

    it('throws on invalid currency', () => {
      expect(() => CommissionAmountVO.create(100, 'AB')).toThrow(ValidationError);
    });
  });

  describe('zero()', () => {
    it('creates zero amount', () => {
      const vo = CommissionAmountVO.zero('BDT');
      expect(vo.amount).toBe(0);
      expect(vo.currency).toBe('BDT');
    });
  });

  describe('add() / subtract()', () => {
    it('adds same currency', () => {
      const a = CommissionAmountVO.create(100, 'BDT');
      const b = CommissionAmountVO.create(50, 'BDT');
      expect(a.add(b).amount).toBe(150);
    });

    it('subtracts same currency', () => {
      const a = CommissionAmountVO.create(100, 'BDT');
      const b = CommissionAmountVO.create(30, 'BDT');
      expect(a.subtract(b).amount).toBe(70);
    });

    it('throws on subtract below zero', () => {
      const a = CommissionAmountVO.create(100, 'BDT');
      const b = CommissionAmountVO.create(200, 'BDT');
      expect(() => a.subtract(b)).toThrow(ValidationError);
    });

    it('throws on currency mismatch in add', () => {
      const a = CommissionAmountVO.create(100, 'BDT');
      const b = CommissionAmountVO.create(50, 'USD');
      expect(() => a.add(b)).toThrow(ValidationError);
    });
  });

  describe('isZero()', () => {
    it('true for zero', () => {
      expect(CommissionAmountVO.zero('BDT').isZero()).toBe(true);
    });
  });
});
