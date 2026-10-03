/**
 * CartTaxCompositeVO — Unit Tests
 */
import { CartTaxCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-tax.vo.js';
import { CartTaxIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '../../../../../src/module/domain/value-objects/primitives/cart-tax-rate.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('CartTaxCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = CartTaxCompositeVO.create({
        id: CartTaxIdVO.create(UUID),
        rate: CartTaxRateVO.create(15),
        inclusive: false,
        region: 'BD',
      });
      expect(vo.rate.percent).toBe(15);
      expect(vo.inclusive).toBe(false);
      expect(vo.region).toBe('BD');
    });
  });

  describe('none()', () => {
    it('creates zero-rate VO', () => {
      const vo = CartTaxCompositeVO.none();
      expect(vo.rate.percent).toBe(0);
      expect(vo.inclusive).toBe(false);
    });
  });

  describe('computeTax()', () => {
    it('computes 15% of 1000 = 150', () => {
      const vo = CartTaxCompositeVO.create({
        id: CartTaxIdVO.create(UUID),
        rate: CartTaxRateVO.create(15),
        inclusive: false,
      });
      expect(vo.computeTax(1000)).toBe(150);
    });

    it('returns 0 for zero rate', () => {
      const vo = CartTaxCompositeVO.none();
      expect(vo.computeTax(1000)).toBe(0);
    });

    it('throws on negative amount', () => {
      const vo = CartTaxCompositeVO.create({
        id: CartTaxIdVO.create(UUID),
        rate: CartTaxRateVO.create(15),
        inclusive: false,
      });
      expect(() => vo.computeTax(-1)).toThrow();
    });
  });

  describe('extractBase()', () => {
    it('returns same amount when exclusive', () => {
      const vo = CartTaxCompositeVO.create({
        id: CartTaxIdVO.create(UUID),
        rate: CartTaxRateVO.create(15),
        inclusive: false,
      });
      expect(vo.extractBase(1000)).toBe(1000);
    });

    it('extracts base when inclusive', () => {
      const vo = CartTaxCompositeVO.create({
        id: CartTaxIdVO.create(UUID),
        rate: CartTaxRateVO.create(15),
        inclusive: true,
      });
      // inclusive 115 → base 100, tax 15
      expect(vo.extractBase(115)).toBe(100);
    });
  });

  describe('isZero()', () => {
    it('true for zero rate', () => {
      expect(CartTaxCompositeVO.none().isZero()).toBe(true);
    });

    it('false for non-zero rate', () => {
      const vo = CartTaxCompositeVO.create({
        id: CartTaxIdVO.create(UUID),
        rate: CartTaxRateVO.create(15),
        inclusive: false,
      });
      expect(vo.isZero()).toBe(false);
    });
  });
});
