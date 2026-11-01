/**
 * ProductValidator (Application) — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductValidator } from '../../../../src/module/application/validators/product.validator.js';

describe('ProductValidator (Application)', () => {
  describe('validateCreate()', () => {
    it('passes valid payload', () => {
      const result = ProductValidator.validateCreate({
        name: 'Test Product',
        slug: 'test-product',
        sku: 'TEST-SKU-001',
        type: 'physical',
        categoryId: '11111111-1111-4111-8111-111111111111',
        price: 1000,
        currency: 'BDT',
      });
      expect(result).toBeDefined();
      expect(result.name).toBe('Test Product');
    });

    it('throws for missing name', () => {
      expect(() =>
        ProductValidator.validateCreate({
          slug: 'test',
          sku: 'SKU',
          type: 'physical',
          categoryId: '11111111-1111-4111-8111-111111111111',
          price: 100,
          currency: 'BDT',
        }),
      ).toThrow();
    });

    it('throws for invalid currency (not 3 chars)', () => {
      expect(() =>
        ProductValidator.validateCreate({
          name: 'Test',
          slug: 'test',
          sku: 'SKU',
          type: 'physical',
          categoryId: '11111111-1111-4111-8111-111111111111',
          price: 100,
          currency: 'AB',
        }),
      ).toThrow();
    });

    it('throws for negative price', () => {
      expect(() =>
        ProductValidator.validateCreate({
          name: 'Test',
          slug: 'test',
          sku: 'SKU',
          type: 'physical',
          categoryId: '11111111-1111-4111-8111-111111111111',
          price: -1,
          currency: 'BDT',
        }),
      ).toThrow();
    });
  });

  describe('validateUpdate()', () => {
    it('passes with partial update', () => {
      const result = ProductValidator.validateUpdate({ name: 'Updated' });
      expect(result).toBeDefined();
    });

    it('throws for empty object (refine rule)', () => {
      expect(() => ProductValidator.validateUpdate({})).toThrow();
    });
  });
});
