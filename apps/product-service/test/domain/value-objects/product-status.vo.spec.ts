/**
 * ProductStatusVO — unit tests
 */
import { ProductStatusVO } from '../../../src/module/domain/value-objects/primitives/product-status.vo.js';
import { PRODUCT_STATUS } from '@vubon/shared-constants/business/product';
import { InvalidProductStatusError } from '../../../src/module/domain/errors/product.errors.js';

describe('ProductStatusVO', () => {
  describe('create()', () => {
    it('should accept valid status DRAFT', () => {
      const vo = ProductStatusVO.create(PRODUCT_STATUS.DRAFT);
      expect(vo.value).toBe(PRODUCT_STATUS.DRAFT);
    });

    it('should accept valid status PUBLISHED', () => {
      const vo = ProductStatusVO.create(PRODUCT_STATUS.PUBLISHED);
      expect(vo.value).toBe(PRODUCT_STATUS.PUBLISHED);
    });

    it('should reject invalid status', () => {
      expect(() => ProductStatusVO.create('invalid_status')).toThrow(
        InvalidProductStatusError,
      );
    });

    it('should reject empty string', () => {
      expect(() => ProductStatusVO.create('')).toThrow(InvalidProductStatusError);
    });
  });

  describe('isDraft / isPublished / isArchived', () => {
    it('isDraft returns true only for DRAFT', () => {
      expect(ProductStatusVO.create(PRODUCT_STATUS.DRAFT).isDraft()).toBe(true);
      expect(ProductStatusVO.create(PRODUCT_STATUS.PUBLISHED).isDraft()).toBe(false);
    });

    it('isPublished returns true only for PUBLISHED', () => {
      expect(ProductStatusVO.create(PRODUCT_STATUS.PUBLISHED).isPublished()).toBe(true);
      expect(ProductStatusVO.create(PRODUCT_STATUS.DRAFT).isPublished()).toBe(false);
    });

    it('isArchived returns true only for ARCHIVED', () => {
      expect(ProductStatusVO.create(PRODUCT_STATUS.ARCHIVED).isArchived()).toBe(true);
    });
  });

  describe('canTransitionTo()', () => {
    it('DRAFT can transition to PENDING', () => {
      const vo = ProductStatusVO.create(PRODUCT_STATUS.DRAFT);
      expect(vo.canTransitionTo(PRODUCT_STATUS.PENDING)).toBe(true);
    });

    it('DRAFT can transition to PUBLISHED', () => {
      const vo = ProductStatusVO.create(PRODUCT_STATUS.DRAFT);
      expect(vo.canTransitionTo(PRODUCT_STATUS.PUBLISHED)).toBe(true);
    });

    it('PUBLISHED can transition to OUT_OF_STOCK', () => {
      const vo = ProductStatusVO.create(PRODUCT_STATUS.PUBLISHED);
      expect(vo.canTransitionTo(PRODUCT_STATUS.OUT_OF_STOCK)).toBe(true);
    });

    it('ARCHIVED cannot transition to PUBLISHED', () => {
      const vo = ProductStatusVO.create(PRODUCT_STATUS.ARCHIVED);
      expect(vo.canTransitionTo(PRODUCT_STATUS.PUBLISHED)).toBe(false);
    });

    it('unknown status has no transitions', () => {
      const vo = ProductStatusVO.create(PRODUCT_STATUS.DISCONTINUED);
      expect(vo.canTransitionTo(PRODUCT_STATUS.PUBLISHED)).toBe(false);
    });
  });
});
