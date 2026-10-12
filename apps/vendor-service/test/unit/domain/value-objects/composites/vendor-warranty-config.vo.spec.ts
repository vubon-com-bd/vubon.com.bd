import { VendorWarrantyConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-warranty-config.vo.js';
import { WarrantyTypeVO } from '../../../../../src/module/domain/value-objects/primitives/warranty-type.vo.js';
import { WarrantyPeriodDaysVO } from '../../../../../src/module/domain/value-objects/primitives/warranty-period-days.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

function makeConfig(overrides: {
  defaultType?: string;
  defaultPeriod?: number;
  terms?: string;
  exclusions?: string[];
} = {}): VendorWarrantyConfigVO {
  return VendorWarrantyConfigVO.create({
    defaultType: WarrantyTypeVO.create(overrides.defaultType ?? 'seller'),
    defaultPeriod: WarrantyPeriodDaysVO.create(overrides.defaultPeriod ?? 30),
    coversShipping: false,
    requireProof: true,
    autoRegister: true,
    terms: overrides.terms,
    exclusions: overrides.exclusions,
  });
}

describe('VendorWarrantyConfigVO', () => {
  describe('create()', () => {
    it('creates valid config', () => {
      const v = makeConfig();
      expect(v.defaultType.value).toBe('seller');
      expect(v.defaultPeriod.days).toBe(30);
    });

    it('throws when type NONE + period > 0', () => {
      expect(() => makeConfig({ defaultType: 'none' })).toThrow(ValidationError);
    });

    it('throws when terms too long', () => {
      expect(() => makeConfig({ terms: 'A'.repeat(6000) })).toThrow(ValidationError);
    });

    it('throws when too many exclusions', () => {
      expect(() =>
        makeConfig({ exclusions: new Array(100).fill('x') }),
      ).toThrow(ValidationError);
    });
  });

  describe('defaults()', () => {
    it('creates defaults', () => {
      const v = VendorWarrantyConfigVO.defaults();
      expect(v.defaultType.hasWarranty()).toBe(true);
    });
  });

  describe('helpers', () => {
    it('isWarrantyEnabled', () => {
      expect(makeConfig().isWarrantyEnabled()).toBe(true);
    });

    it('isManufacturerWarranty', () => {
      expect(makeConfig({ defaultType: 'manufacturer' }).isManufacturerWarranty()).toBe(true);
    });

    it('isSellerWarranty', () => {
      expect(makeConfig({ defaultType: 'seller' }).isSellerWarranty()).toBe(true);
    });

    it('hasExclusions', () => {
      expect(makeConfig({ exclusions: ['abuse'] }).hasExclusions()).toBe(true);
      expect(makeConfig().hasExclusions()).toBe(false);
    });

    it('isExclusion', () => {
      const v = makeConfig({ exclusions: ['abuse'] });
      expect(v.isExclusion('abuse')).toBe(true);
      expect(v.isExclusion('ABUSE')).toBe(true);
      expect(v.isExclusion('other')).toBe(false);
    });
  });

  describe('calculateExpiry', () => {
    it('returns date after period', () => {
      const start = new Date('2026-01-01T00:00:00Z');
      const expiry = makeConfig({ defaultPeriod: 30 }).calculateExpiry(start);
      expect(expiry.getTime()).toBeGreaterThan(start.getTime());
    });
  });
});
