import { SettlementAmountVO } from '../../../../../src/module/domain/value-objects/primitives/settlement-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SettlementAmountVO', () => {
  describe('create()', () => {
    it('creates valid amount', () => {
      const vo = SettlementAmountVO.create(10_000, 'BDT');
      expect(vo.amount).toBe(10_000);
      expect(vo.currency).toBe('BDT');
    });

    it('throws on below minimum', () => {
      expect(() => SettlementAmountVO.create(100, 'BDT')).toThrow(ValidationError);
    });

    it('throws on above maximum', () => {
      expect(() => SettlementAmountVO.create(99_999_999, 'BDT')).toThrow(ValidationError);
    });

    it('throws on invalid currency', () => {
      expect(() => SettlementAmountVO.create(5000, 'AB')).toThrow(ValidationError);
    });
  });

  describe('splitForPayout()', () => {
    it('pays out when above payout minimum', () => {
      const vo = SettlementAmountVO.create(5000, 'BDT');
      const r = vo.splitForPayout(100);
      expect(r.payoutable).toBe(5000);
      expect(r.carriedForward).toBe(0);
    });

    it('carries forward when below payout min', () => {
      const vo = SettlementAmountVO.create(1000, 'BDT');
      const r = vo.splitForPayout(2000);
      expect(r.payoutable).toBe(0);
      expect(r.carriedForward).toBe(1000);
    });
  });
});
