/**
 * ProductTypeVO — unit tests
 */
import { ProductTypeVO } from '../../../src/module/domain/value-objects/primitives/product-type.vo.js';
import { PRODUCT_TYPE } from '@vubon/shared-constants/business/product';
import { InvalidProductTypeError } from '../../../src/module/domain/errors/product.errors.js';

describe('ProductTypeVO', () => {
  it('should create PHYSICAL type', () => {
    const vo = ProductTypeVO.create(PRODUCT_TYPE.PHYSICAL);
    expect(vo.value).toBe(PRODUCT_TYPE.PHYSICAL);
  });

  it('should create DIGITAL type', () => {
    const vo = ProductTypeVO.create(PRODUCT_TYPE.DIGITAL);
    expect(vo.value).toBe(PRODUCT_TYPE.DIGITAL);
  });

  it('should reject invalid type', () => {
    expect(() => ProductTypeVO.create('invalid_type')).toThrow(InvalidProductTypeError);
  });

  describe('isPhysical / isDigital', () => {
    it('PHYSICAL is physical', () => {
      expect(ProductTypeVO.create(PRODUCT_TYPE.PHYSICAL).isPhysical()).toBe(true);
    });

    it('DIGITAL is digital', () => {
      expect(ProductTypeVO.create(PRODUCT_TYPE.DIGITAL).isDigital()).toBe(true);
    });

    it('DIGITAL is not physical', () => {
      expect(ProductTypeVO.create(PRODUCT_TYPE.DIGITAL).isPhysical()).toBe(false);
    });
  });

  describe('requiresShipping()', () => {
    it('PHYSICAL requires shipping', () => {
      expect(ProductTypeVO.create(PRODUCT_TYPE.PHYSICAL).requiresShipping()).toBe(true);
    });

    it('DIGITAL does not require shipping', () => {
      expect(ProductTypeVO.create(PRODUCT_TYPE.DIGITAL).requiresShipping()).toBe(false);
    });

    it('SERVICE does not require shipping', () => {
      expect(ProductTypeVO.create(PRODUCT_TYPE.SERVICE).requiresShipping()).toBe(false);
    });
  });
});
