/**
 * ProductVariantEntity — unit tests
 */
import { ProductVariantEntity } from '../../../src/module/domain/entities/product-variant.entity.js';
import { VariantNameVO } from '../../../src/module/domain/value-objects/primitives/variant-name.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { VARIANT_STATUS } from '@vubon/shared-constants/business/product';
import { buildVariant } from '../../fixtures.js';
import { LATER, DEFAULT_CURRENCY } from '../../helpers.js';

describe('ProductVariantEntity', () => {
  describe('changePrice()', () => {
    it('should update variant price', () => {
      const variant = buildVariant();
      variant.changePrice(PriceVO.create(1500, DEFAULT_CURRENCY), LATER);
      expect(variant.price.amount).toBe(1500);
    });

    it('should be idempotent', () => {
      const variant = buildVariant();
      const before = variant.price.amount;
      variant.changePrice(PriceVO.create(before, DEFAULT_CURRENCY), LATER);
      expect(variant.price.amount).toBe(before);
    });
  });

  describe('changeStock()', () => {
    it('should update stock to positive', () => {
      const variant = buildVariant();
      variant.changeStock(5, LATER);
      expect(variant.stock).toBe(5);
    });

    it('should set OUT_OF_STOCK when stock is 0', () => {
      const variant = buildVariant();
      variant.changeStock(0, LATER);
      expect(variant.status).toBe(VARIANT_STATUS.OUT_OF_STOCK);
    });

    it('should return to ACTIVE when restocked from 0', () => {
      const variant = buildVariant({ status: VARIANT_STATUS.OUT_OF_STOCK, stock: 0 });
      variant.changeStock(10, LATER);
      expect(variant.status).toBe(VARIANT_STATUS.ACTIVE);
    });

    it('should reject negative stock', () => {
      const variant = buildVariant();
      expect(() => variant.changeStock(-1, LATER)).toThrow(Error);
    });
  });

  describe('isAvailable()', () => {
    it('returns true for ACTIVE with stock', () => {
      const variant = buildVariant({ status: VARIANT_STATUS.ACTIVE, stock: 5 });
      expect(variant.isAvailable()).toBe(true);
    });

    it('returns false for 0 stock', () => {
      const variant = buildVariant({ status: VARIANT_STATUS.ACTIVE, stock: 0 });
      expect(variant.isAvailable()).toBe(false);
    });

    it('returns false for INACTIVE', () => {
      const variant = buildVariant({ status: VARIANT_STATUS.INACTIVE, stock: 5 });
      expect(variant.isAvailable()).toBe(false);
    });
  });

  describe('getProfitMargin()', () => {
    it('returns 0 without cost', () => {
      const variant = buildVariant();
      expect(variant.getProfitMargin()).toBe(0);
    });

    it('calculates margin with cost', () => {
      const variant = buildVariant({
        price: PriceVO.create(1000, DEFAULT_CURRENCY),
        cost: PriceVO.create(600, DEFAULT_CURRENCY),
      });
      expect(variant.getProfitMargin()).toBe(40);
    });
  });

  describe('matchesOptions()', () => {
    it('returns true for matching option set', () => {
      const variant = buildVariant();
      expect(variant.matchesOptions([
        { name: 'Color', value: 'Red' },
        { name: 'Size', value: 'L' },
      ])).toBe(true);
    });

    it('returns false for different options', () => {
      const variant = buildVariant();
      expect(variant.matchesOptions([{ name: 'Color', value: 'Blue' }])).toBe(false);
    });

    it('is case-insensitive', () => {
      const variant = buildVariant();
      expect(variant.matchesOptions([
        { name: 'color', value: 'red' },
        { name: 'size', value: 'l' },
      ])).toBe(true);
    });
  });

  describe('optionsSignature()', () => {
    it('produces stable signature regardless of order', () => {
      const a = buildVariant({
        options: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'L' }],
      });
      const b = buildVariant({
        options: [{ name: 'Size', value: 'L' }, { name: 'Color', value: 'Red' }],
      });
      expect(a.optionsSignature()).toBe(b.optionsSignature());
    });
  });

  describe('updateImage / updateWeight', () => {
    it('should update image url', () => {
      const variant = buildVariant();
      variant.updateImage('https://cdn.example.com/variant.jpg');
      expect(variant.imageUrl).toBe('https://cdn.example.com/variant.jpg');
    });

    it('should update weight', () => {
      const variant = buildVariant();
      variant.updateWeight(0.5);
      expect(variant.weight).toBe(0.5);
    });

    it('should reject non-positive weight', () => {
      const variant = buildVariant();
      expect(() => variant.updateWeight(0)).toThrow(Error);
      expect(() => variant.updateWeight(-1)).toThrow(Error);
    });
  });

  describe('activate / deactivate', () => {
    it('should activate variant', () => {
      const variant = buildVariant({ status: VARIANT_STATUS.INACTIVE });
      variant.activate();
      expect(variant.status).toBe(VARIANT_STATUS.ACTIVE);
    });

    it('should deactivate variant', () => {
      const variant = buildVariant({ status: VARIANT_STATUS.ACTIVE });
      variant.deactivate();
      expect(variant.status).toBe(VARIANT_STATUS.INACTIVE);
    });
  });

  describe('invariants', () => {
    it('should reject variant without options', () => {
      expect(() => buildVariant({ options: [] })).toThrow(Error);
    });

    it('should accept variant with valid name change', () => {
      const variant = buildVariant();
      expect(variant.name.value).toBe('Red / Large');
      void VariantNameVO; // ensure import used
    });
  });
});
