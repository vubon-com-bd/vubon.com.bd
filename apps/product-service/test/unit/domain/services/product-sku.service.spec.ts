/**
 * ProductSkuService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { ProductSkuService } from '../../../../src/module/domain/services/product-sku.service.js';

describe('ProductSkuService', () => {
  describe('generate()', () => {
    it('generates deterministic SKU', () => {
      const r = ProductSkuService.generate({
        vendorCode: 'VBN',
        categoryCode: 'CLT',
        sequence: 1,
      });
      expect(r.value).toMatch(/^VBN-CLT-000001[A-Z]{2}$/);
    });

    it('pads sequence with zeros', () => {
      const r = ProductSkuService.generate({
        vendorCode: 'ABC',
        categoryCode: 'DEF',
        sequence: 42,
      });
      expect(r.value).toContain('000042');
    });

    it('same input → same SKU (deterministic)', () => {
      const a = ProductSkuService.generate({
        vendorCode: 'VBN',
        categoryCode: 'CLT',
        sequence: 1,
      });
      const b = ProductSkuService.generate({
        vendorCode: 'VBN',
        categoryCode: 'CLT',
        sequence: 1,
      });
      expect(a.value).toBe(b.value);
    });

    it('different sequence → different SKU', () => {
      const a = ProductSkuService.generate({
        vendorCode: 'VBN',
        categoryCode: 'CLT',
        sequence: 1,
      });
      const b = ProductSkuService.generate({
        vendorCode: 'VBN',
        categoryCode: 'CLT',
        sequence: 2,
      });
      expect(a.value).not.toBe(b.value);
    });

    it('throws for zero sequence', () => {
      expect(() =>
        ProductSkuService.generate({
          vendorCode: 'VBN',
          categoryCode: 'CLT',
          sequence: 0,
        }),
      ).toThrow();
    });
  });

  describe('generateVariantSku()', () => {
    it('appends option values to product SKU', () => {
      const r = ProductSkuService.generateVariantSku({
        productSku: 'VBN-CLT-000001AB',
        optionValues: ['M', 'RED'],
      });
      expect(r.value).toBe('VBN-CLT-000001AB-M-RED');
    });

    it('throws for empty options', () => {
      expect(() =>
        ProductSkuService.generateVariantSku({
          productSku: 'VBN-CLT-000001AB',
          optionValues: [],
        }),
      ).toThrow();
    });
  });

  describe('needsVariantSkuRegeneration()', () => {
    it('returns true when productSku changed', () => {
      expect(
        ProductSkuService.needsVariantSkuRegeneration('OLD', 'NEW'),
      ).toBe(true);
    });

    it('returns false when same', () => {
      expect(
        ProductSkuService.needsVariantSkuRegeneration('SAME', 'SAME'),
      ).toBe(false);
    });
  });
});
