/**
 * ProductSkuVO — unit tests
 */
import { ProductSkuVO } from '../../../src/module/domain/value-objects/primitives/product-sku.vo.js';

describe('ProductSkuVO', () => {
  describe('create()', () => {
    it('should accept valid SKU', () => {
      const vo = ProductSkuVO.create('WBH-001');
      expect(vo.value).toBe('WBH-001');
    });

    it('should uppercase input', () => {
      const vo = ProductSkuVO.create('wbh-001');
      expect(vo.value).toBe('WBH-001');
    });

    it('should trim whitespace', () => {
      const vo = ProductSkuVO.create('  WBH-001  ');
      expect(vo.value).toBe('WBH-001');
    });

    it('should reject too short SKU (< 2 chars)', () => {
      expect(() => ProductSkuVO.create('A')).toThrow(Error);
    });

    it('should reject too long SKU (> 64 chars)', () => {
      expect(() => ProductSkuVO.create('A'.repeat(65))).toThrow(Error);
    });
  });
});
