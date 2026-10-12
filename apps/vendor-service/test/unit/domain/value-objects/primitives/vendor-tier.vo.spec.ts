import { VendorTierVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-tier.vo.js';
import { InvalidVendorTierError } from '../../../../../src/module/domain/errors/vendor.errors.js';

describe('VendorTierVO', () => {
  it('creates bronze', () => {
    expect(VendorTierVO.create('bronze').value).toBe('bronze');
  });

  it('throws on invalid tier', () => {
    expect(() => VendorTierVO.create('bogus')).toThrow(InvalidVendorTierError);
  });

  describe('getBenefit()', () => {
    it('bronze has 15% commission', () => {
      expect(VendorTierVO.reconstitute('bronze').getCommissionPercent()).toBe(15);
    });

    it('diamond has 5% commission', () => {
      expect(VendorTierVO.reconstitute('diamond').getCommissionPercent()).toBe(5);
    });
  });

  describe('getThreshold()', () => {
    it('returns min/max sales range', () => {
      const t = VendorTierVO.reconstitute('bronze').getThreshold();
      expect(t.minSales).toBeGreaterThanOrEqual(0);
      expect(t.maxSales).toBeGreaterThan(0);
    });
  });

  describe('getRank()', () => {
    it('bronze is 0', () => {
      expect(VendorTierVO.reconstitute('bronze').getRank()).toBe(0);
    });

    it('diamond is 4', () => {
      expect(VendorTierVO.reconstitute('diamond').getRank()).toBe(4);
    });
  });

  describe('nextTier() / previousTier()', () => {
    it('bronze → silver', () => {
      expect(VendorTierVO.reconstitute('bronze').nextTier()?.value).toBe('silver');
    });

    it('diamond → null', () => {
      expect(VendorTierVO.reconstitute('diamond').nextTier()).toBeNull();
    });

    it('silver → bronze (previous)', () => {
      expect(VendorTierVO.reconstitute('silver').previousTier()?.value).toBe('bronze');
    });

    it('bronze → null (previous)', () => {
      expect(VendorTierVO.reconstitute('bronze').previousTier()).toBeNull();
    });
  });

  describe('comparison', () => {
    it('gold higher than bronze', () => {
      expect(VendorTierVO.reconstitute('gold').isHigherThan(VendorTierVO.reconstitute('bronze'))).toBe(true);
    });

    it('bronze lower than diamond', () => {
      expect(VendorTierVO.reconstitute('bronze').isLowerThan(VendorTierVO.reconstitute('diamond'))).toBe(true);
    });

    it('same tier', () => {
      expect(VendorTierVO.reconstitute('gold').isSameAs(VendorTierVO.reconstitute('gold'))).toBe(true);
    });
  });

  describe('forSalesAmount()', () => {
    it('low sales → bronze', () => {
      expect(VendorTierVO.forSalesAmount(50_000).value).toBe('bronze');
    });

    it('200M sales → diamond', () => {
      expect(VendorTierVO.forSalesAmount(500_000_000).value).toBe('diamond');
    });
  });
});
