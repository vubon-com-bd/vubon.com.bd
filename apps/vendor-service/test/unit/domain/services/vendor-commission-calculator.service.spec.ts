/**
 * VendorCommissionCalculatorService — unit tests
 * @module vendor-service/test/unit/domain/services
 */
import { VendorCommissionCalculatorService } from '../../../../src/module/domain/services/vendor-commission-calculator.service.js';
import { VendorCommissionEntity } from '../../../../src/module/domain/entities/vendor-commission.entity.js';
import { CommissionPercentVO } from '../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { VendorTierVO } from '../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeConfig(
  overrides: {
    type?: 'percentage' | 'fixed' | 'hybrid' | 'tiered' | 'category_based';
    percent?: number;
    fixedAmount?: number;
    applyOnShipping?: boolean;
    applyOnTax?: boolean;
  } = {},
): VendorCommissionEntity {
  return VendorCommissionEntity.create({
    id: UUID,
    vendorId: UUID,
    type: overrides.type ?? 'percentage',
    percent: CommissionPercentVO.create(overrides.percent ?? 10),
    fixedAmount:
      overrides.fixedAmount !== undefined
        ? CommissionAmountVO.create(overrides.fixedAmount, 'BDT')
        : undefined,
    currency: 'BDT',
    minPercent: 0,
    maxPercent: 50,
    applyOnShipping: overrides.applyOnShipping ?? false,
    applyOnTax: overrides.applyOnTax ?? false,
    effectiveFrom: NOW,
    now: NOW,
  });
}

describe('VendorCommissionCalculatorService', () => {
  describe('calculate()', () => {
    it('computes percentage commission on order amount', () => {
      const r = VendorCommissionCalculatorService.calculate(makeConfig({ percent: 10 }), {
        orderAmount: 1000,
        currency: 'BDT',
        applyOnShipping: false,
      });
      expect(r.totalCommission).toBe(100);
      expect(r.vendorEarning).toBe(900);
      expect(r.baseAmount).toBe(1000);
      expect(r.currency).toBe('BDT');
    });

    it('includes shipping when applyOnShipping=true', () => {
      const r = VendorCommissionCalculatorService.calculate(
        makeConfig({ percent: 10, applyOnShipping: true }),
        { orderAmount: 1000, currency: 'BDT', applyOnShipping: true, shippingAmount: 100 },
      );
      expect(r.baseAmount).toBe(1100);
      expect(r.totalCommission).toBe(110);
      expect(r.vendorEarning).toBe(990);
    });

    it('includes tax when applyOnTax=true', () => {
      const r = VendorCommissionCalculatorService.calculate(
        makeConfig({ percent: 10, applyOnTax: true }),
        { orderAmount: 1000, currency: 'BDT', applyOnShipping: false, taxAmount: 150 },
      );
      expect(r.baseAmount).toBe(1150);
      expect(r.totalCommission).toBe(115);
    });

    it('excludes shipping and tax when both flags false', () => {
      const r = VendorCommissionCalculatorService.calculate(
        makeConfig({ percent: 10, applyOnShipping: false, applyOnTax: false }),
        { orderAmount: 1000, currency: 'BDT', applyOnShipping: false, shippingAmount: 100, taxAmount: 150 },
      );
      expect(r.baseAmount).toBe(1000);
    });

    it('throws on negative order amount', () => {
      expect(() =>
        VendorCommissionCalculatorService.calculate(makeConfig(), {
          orderAmount: -1,
          currency: 'BDT',
          applyOnShipping: false,
        }),
      ).toThrow(ValidationError);
    });

    it('throws on invalid currency', () => {
      expect(() =>
        VendorCommissionCalculatorService.calculate(makeConfig(), {
          orderAmount: 100,
          currency: 'AB',
          applyOnShipping: false,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('calculateForTier()', () => {
    it('bronze tier uses 15%', () => {
      const r = VendorCommissionCalculatorService.calculateForTier(
        VendorTierVO.reconstitute('bronze'), 1000, 'BDT',
      );
      expect(r.totalCommission).toBe(150);
      expect(r.vendorEarning).toBe(850);
    });

    it('silver tier uses 12%', () => {
      const r = VendorCommissionCalculatorService.calculateForTier(
        VendorTierVO.reconstitute('silver'), 1000, 'BDT',
      );
      expect(r.totalCommission).toBe(120);
    });

    it('gold tier uses 10%', () => {
      const r = VendorCommissionCalculatorService.calculateForTier(
        VendorTierVO.reconstitute('gold'), 1000, 'BDT',
      );
      expect(r.totalCommission).toBe(100);
    });

    it('diamond tier uses 5%', () => {
      const r = VendorCommissionCalculatorService.calculateForTier(
        VendorTierVO.reconstitute('diamond'), 1000, 'BDT',
      );
      expect(r.totalCommission).toBe(50);
    });
  });

  describe('buildDefaultConfig()', () => {
    it('builds config from tier benefit', () => {
      const cfg = VendorCommissionCalculatorService.buildDefaultConfig({
        id: UUID,
        vendorId: UUID,
        tier: VendorTierVO.reconstitute('silver'),
        currency: 'BDT',
        now: NOW,
      });
      expect(cfg.percent.value).toBe(12);
      expect(cfg.currency).toBe('BDT');
      expect(cfg.isActive).toBe(true);
    });
  });

  describe('compare()', () => {
    it('computes delta between two configs', () => {
      const r = VendorCommissionCalculatorService.compare(
        makeConfig({ percent: 10 }),
        makeConfig({ percent: 15 }),
        1000,
        'BDT',
      );
      expect(r.configA).toBe(100);
      expect(r.configB).toBe(150);
      expect(r.delta).toBe(50);
    });

    it('negative delta when B is cheaper', () => {
      const r = VendorCommissionCalculatorService.compare(
        makeConfig({ percent: 20 }),
        makeConfig({ percent: 10 }),
        1000,
        'BDT',
      );
      expect(r.delta).toBe(-100);
    });
  });

  describe('calculateAmount()', () => {
    it('returns total commission only', () => {
      const amount = VendorCommissionCalculatorService.calculateAmount(
        makeConfig({ percent: 20 }), 500, 'BDT',
      );
      expect(amount).toBe(100);
    });
  });
});
