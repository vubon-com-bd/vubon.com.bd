import { VendorCommissionConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-commission-config.vo.js';
import { CommissionPercentVO } from '../../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2027-01-01T00:00:00.000Z';

function makeConfig(overrides: {
  type?: string;
  percent?: number;
  fixedAmount?: number;
  effectiveTo?: string;
} = {}): VendorCommissionConfigVO {
  return VendorCommissionConfigVO.create({
    type: (overrides.type ?? 'percentage') as never,
    percent: CommissionPercentVO.create(overrides.percent ?? 10),
    fixedAmount:
      overrides.fixedAmount !== undefined
        ? CommissionAmountVO.create(overrides.fixedAmount, 'BDT')
        : undefined,
    applyOnShipping: false,
    applyOnTax: false,
    effectiveFrom: NOW,
    effectiveTo: overrides.effectiveTo,
  });
}

describe('VendorCommissionConfigVO', () => {
  describe('create()', () => {
    it('creates percentage config', () => {
      const v = makeConfig();
      expect(v.type).toBe('percentage');
      expect(v.percent.value).toBe(10);
    });

    it('throws on invalid type', () => {
      expect(() => makeConfig({ type: 'bogus' })).toThrow(ValidationError);
    });

    it('throws when FIXED missing fixedAmount', () => {
      expect(() => makeConfig({ type: 'fixed' })).toThrow(ValidationError);
    });

    it('throws when HYBRID missing fixedAmount', () => {
      expect(() => makeConfig({ type: 'hybrid' })).toThrow(ValidationError);
    });

    it('throws when effectiveTo before effectiveFrom', () => {
      expect(() => makeConfig({ effectiveTo: '2025-01-01T00:00:00Z' })).toThrow(ValidationError);
    });
  });

  describe('calculateCommission()', () => {
    it('percentage only', () => {
      expect(makeConfig({ percent: 10 }).calculateCommission(1000)).toBe(100);
    });

    it('hybrid = percent + fixed', () => {
      const v = makeConfig({ type: 'hybrid', percent: 5, fixedAmount: 20 });
      expect(v.calculateCommission(1000)).toBe(70);
    });
  });

  describe('isActive()', () => {
    it('true within effective range', () => {
      const v = makeConfig();
      expect(v.isActive(new Date('2026-06-01T00:00:00Z'))).toBe(true);
    });

    it('false before effectiveFrom', () => {
      const v = makeConfig();
      expect(v.isActive(new Date('2025-01-01T00:00:00Z'))).toBe(false);
    });

    it('false after effectiveTo', () => {
      const v = makeConfig({ effectiveTo: FUTURE });
      expect(v.isActive(new Date('2028-01-01T00:00:00Z'))).toBe(false);
    });
  });

  describe('type checks', () => {
    it('isPercentage / isFixed', () => {
      expect(makeConfig({ type: 'percentage' }).isPercentage()).toBe(true);
      expect(makeConfig({ type: 'fixed', fixedAmount: 100 }).isFixed()).toBe(true);
    });
  });
});
