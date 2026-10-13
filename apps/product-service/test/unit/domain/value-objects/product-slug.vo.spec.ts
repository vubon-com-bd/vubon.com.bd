/**
 * ProductSlugVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductSlugVO } from '../../../../src/module/domain/value-objects/primitives/product-slug.vo.js';

describe('ProductSlugVO', () => {
  describe('create()', () => {
    it('creates valid slug', () => {
      expect(ProductSlugVO.create('premium-tshirt').value).toBe('premium-tshirt');
    });
    it('normalizes uppercase → lowercase', () => {
      expect(ProductSlugVO.create('PREMIUM-TSHIRT').value).toBe('premium-tshirt');
    });
    it('trims whitespace', () => {
      expect(ProductSlugVO.create('  premium-tshirt  ').value).toBe('premium-tshirt');
    });
    it('throws for empty string', () => {
      expect(() => ProductSlugVO.create('')).toThrow();
    });
    it('throws for spaces in slug', () => {
      expect(() => ProductSlugVO.create('premium tshirt')).toThrow();
    });
    it('throws for uppercase after normalization check', () => {
      // Upper becomes lowercase — should work
      const vo = ProductSlugVO.create('UPPER');
      expect(vo.value).toBe('upper');
    });
    it('throws for leading dash', () => {
      expect(() => ProductSlugVO.create('-invalid')).toThrow();
    });
  });

  describe('fromName()', () => {
    it('generates slug from name', () => {
      const vo = ProductSlugVO.fromName('Premium T-Shirt');
      expect(vo.value).toBe('premium-t-shirt');
    });
    it('handles multiple spaces', () => {
      const vo = ProductSlugVO.fromName('Premium   T-Shirt');
      expect(vo.value).toBe('premium-t-shirt');
    });
    it('removes special characters', () => {
      const vo = ProductSlugVO.fromName('Premium @#$ T-Shirt!');
      expect(vo.value).toBe('premium-t-shirt');
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      const vo = ProductSlugVO.reconstitute('ANY-VALUE');
      expect(vo.value).toBe('ANY-VALUE');
    });
  });
});
