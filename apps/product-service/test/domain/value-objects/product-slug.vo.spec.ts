/**
 * ProductSlugVO — unit tests
 */
import { ProductSlugVO } from '../../../src/module/domain/value-objects/primitives/product-slug.vo.js';

describe('ProductSlugVO', () => {
  describe('create()', () => {
    it('should accept valid slug', () => {
      const vo = ProductSlugVO.create('wireless-headphones');
      expect(vo.value).toBe('wireless-headphones');
    });

    it('should lowercase input', () => {
      const vo = ProductSlugVO.create('Wireless-Headphones');
      expect(vo.value).toBe('wireless-headphones');
    });

    it('should trim whitespace', () => {
      const vo = ProductSlugVO.create('  valid-slug  ');
      expect(vo.value).toBe('valid-slug');
    });

    it('should reject empty slug', () => {
      expect(() => ProductSlugVO.create('')).toThrow(Error);
    });

    it('should reject slug > 180 chars', () => {
      expect(() => ProductSlugVO.create('a'.repeat(181))).toThrow(Error);
    });
  });

  describe('fromName()', () => {
    it('generates slug from simple name', () => {
      expect(ProductSlugVO.fromName('Wireless Headphones').value).toBe('wireless-headphones');
    });

    it('removes special characters', () => {
      expect(ProductSlugVO.fromName('Café & Resto!').value).toBe('cafe-resto');
    });

    it('collapses multiple dashes', () => {
      expect(ProductSlugVO.fromName('A -- B --- C').value).toBe('a-b-c');
    });

    it('trims leading/trailing dashes', () => {
      expect(ProductSlugVO.fromName('--- slug ---').value).toBe('slug');
    });
  });
});
