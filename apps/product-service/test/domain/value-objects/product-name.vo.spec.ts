/**
 * ProductNameVO — unit tests
 */
import { ProductNameVO } from '../../../src/module/domain/value-objects/primitives/product-name.vo.js';

describe('ProductNameVO', () => {
  describe('create()', () => {
    it('should accept valid name', () => {
      const vo = ProductNameVO.create('Wireless Headphones');
      expect(vo.value).toBe('Wireless Headphones');
    });

    it('should trim whitespace', () => {
      const vo = ProductNameVO.create('  Trimmed Name  ');
      expect(vo.value).toBe('Trimmed Name');
    });

    it('should collapse multiple spaces', () => {
      const vo = ProductNameVO.create('Multi   Space   Name');
      expect(vo.value).toBe('Multi Space Name');
    });

    it('should reject empty name', () => {
      expect(() => ProductNameVO.create('')).toThrow(Error);
    });

    it('should reject too short name (< 2 chars)', () => {
      expect(() => ProductNameVO.create('A')).toThrow(Error);
    });

    it('should reject name > 200 chars', () => {
      expect(() => ProductNameVO.create('A'.repeat(201))).toThrow(Error);
    });

    it('should accept max length name', () => {
      const vo = ProductNameVO.create('A'.repeat(200));
      expect(vo.value).toBe('A'.repeat(200));
    });
  });

  describe('length', () => {
    it('returns character count', () => {
      expect(ProductNameVO.create('Hello').length).toBe(5);
    });
  });
});
