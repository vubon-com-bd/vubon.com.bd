/**
 * SplitCalculationService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitCalculationService } from '@domain/services/split-calculation.service';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SplitCalculationService', () => {
  describe('percentage split', () => {
    it('splits 60/40 correctly', () => {
      const r = SplitCalculationService.calculate({
        totalAmount: 100,
        currency: 'BDT',
        type: SplitTypeVO.create('percentage'),
        receivers: [
          { receiverId: 'a', percentage: 60 },
          { receiverId: 'b', percentage: 40 },
        ],
      });
      expect(r.receivers[0].amount).toBe(60);
      expect(r.receivers[1].amount).toBe(40);
    });
    it('throws when percentages != 100', () => {
      expect(() =>
        SplitCalculationService.calculate({
          totalAmount: 100,
          currency: 'BDT',
          type: SplitTypeVO.create('percentage'),
          receivers: [
            { receiverId: 'a', percentage: 50 },
            { receiverId: 'b', percentage: 40 },
          ],
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('fixed split', () => {
    it('splits by fixed amounts', () => {
      const r = SplitCalculationService.calculate({
        totalAmount: 100,
        currency: 'BDT',
        type: SplitTypeVO.create('fixed'),
        receivers: [
          { receiverId: 'a', fixedAmount: 70 },
          { receiverId: 'b', fixedAmount: 30 },
        ],
      });
      expect(r.receivers[0].amount).toBe(70);
    });
    it('throws when fixed sum != total', () => {
      expect(() =>
        SplitCalculationService.calculate({
          totalAmount: 100,
          currency: 'BDT',
          type: SplitTypeVO.create('fixed'),
          receivers: [
            { receiverId: 'a', fixedAmount: 70 },
            { receiverId: 'b', fixedAmount: 20 },
          ],
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('equal split', () => {
    it('2 receivers: 50/50', () => {
      const r = SplitCalculationService.calculate({
        totalAmount: 100,
        currency: 'BDT',
        type: SplitTypeVO.create('equal'),
        receivers: [{ receiverId: 'a' }, { receiverId: 'b' }],
      });
      expect(r.receivers[0].amount).toBe(50);
      expect(r.receivers[1].amount).toBe(50);
    });
    it('3 receivers: 33.33 + rounding to last', () => {
      const r = SplitCalculationService.calculate({
        totalAmount: 100,
        currency: 'BDT',
        type: SplitTypeVO.create('equal'),
        receivers: [{ receiverId: 'a' }, { receiverId: 'b' }, { receiverId: 'c' }],
      });
      const sum = r.receivers.reduce((s, x) => s + x.amount, 0);
      expect(sum).toBe(100);
    });
  });

  describe('custom split', () => {
    it('mixes fixed and percentage', () => {
      const r = SplitCalculationService.calculate({
        totalAmount: 100,
        currency: 'BDT',
        type: SplitTypeVO.create('custom'),
        receivers: [
          { receiverId: 'a', fixedAmount: 40 },
          { receiverId: 'b', percentage: 60 },
        ],
      });
      const sum = r.receivers.reduce((s, x) => s + x.amount, 0);
      expect(sum).toBe(100);
    });
  });

  describe('validation', () => {
    it('throws on <= 0 total', () => {
      expect(() =>
        SplitCalculationService.calculate({
          totalAmount: 0,
          currency: 'BDT',
          type: SplitTypeVO.create('equal'),
          receivers: [{ receiverId: 'a' }, { receiverId: 'b' }],
        }),
      ).toThrow(ValidationError);
    });
    it('throws on < 2 receivers', () => {
      expect(() =>
        SplitCalculationService.calculate({
          totalAmount: 100,
          currency: 'BDT',
          type: SplitTypeVO.create('equal'),
          receivers: [{ receiverId: 'a' }],
        }),
      ).toThrow(ValidationError);
    });
  });
});
