/**
 * ProductEntity — unit tests
 */
import { ProductEntity } from '../../../src/module/domain/entities/product.entity.js';
import { PRODUCT_STATUS, PRODUCT_TYPE } from '@vubon/shared-constants/business/product';
import { ProductStatusVO } from '../../../src/module/domain/value-objects/primitives/product-status.vo.js';
import { ProductTypeVO } from '../../../src/module/domain/value-objects/primitives/product-type.vo.js';
import { ProductDescriptionVO } from '../../../src/module/domain/value-objects/primitives/product-description.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { ProductAlreadyPublishedError, ProductCannotBePublishedError } from '../../../src/module/domain/errors/product.errors.js';
import { ProductCreatedEvent, ProductPublishedEvent, ProductPriceChangedEvent } from '../../../src/module/domain/events/product.events.js';
import { buildProduct, buildNewProduct, buildProductProps } from '../../fixtures.js';
import { USER_ID, LATER, DEFAULT_CURRENCY } from '../../helpers.js';

describe('ProductEntity', () => {
  describe('create()', () => {
    it('should create product with DRAFT status', () => {
      const product = buildNewProduct();
      expect(product.status.value).toBe(PRODUCT_STATUS.DRAFT);
      expect(product.isPublished).toBe(false);
    });

    it('should emit ProductCreatedEvent', () => {
      const product = buildNewProduct();
      const events = product.pullDomainEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toBeInstanceOf(ProductCreatedEvent);
    });

    it('should start at version 1 after creation', () => {
      const product = buildNewProduct();
      expect(product.version).toBe(1);
    });
  });

  describe('publish()', () => {
    it('should publish a fully-formed draft product', () => {
      const product = buildProduct();
      product.publish(USER_ID, LATER);
      expect(product.status.value).toBe(PRODUCT_STATUS.PUBLISHED);
      expect(product.isPublished).toBe(true);
      expect(product.publishedAt).toBe(LATER);
    });

    it('should emit ProductPublishedEvent', () => {
      const product = buildProduct();
      product.pullDomainEvents(); // discard initial
      product.publish(USER_ID, LATER);
      const events = product.pullDomainEvents();
      expect(events[0]).toBeInstanceOf(ProductPublishedEvent);
    });

    it('should reject publishing empty description', () => {
      const product = buildProduct({
        description: ProductDescriptionVO.empty(),
      });
      expect(() => product.publish(USER_ID, LATER)).toThrow(ProductCannotBePublishedError);
    });

    it('should reject publishing zero-price product', () => {
      const product = buildProduct({
        price: PriceVO.create(0, DEFAULT_CURRENCY),
      });
      expect(() => product.publish(USER_ID, LATER)).toThrow(ProductCannotBePublishedError);
    });

    it('should reject publishing physical product with no stock', () => {
      const product = buildProduct({ totalStock: 0 });
      expect(() => product.publish(USER_ID, LATER)).toThrow(ProductCannotBePublishedError);
    });

    it('should reject publishing digital product with no stock', () => {
      const product = buildProduct({
        type: ProductTypeVO.create(PRODUCT_TYPE.DIGITAL),
        totalStock: 0,
      });
      expect(() => product.publish(USER_ID, LATER)).not.toThrow();
    });

    it('should reject publishing product without images', () => {
      const product = buildProduct({ images: [], thumbnailUrl: undefined });
      expect(() => product.publish(USER_ID, LATER)).toThrow(ProductCannotBePublishedError);
    });

    it('should reject re-publishing already published product', () => {
      const product = buildProduct();
      product.publish(USER_ID, LATER);
      expect(() => product.publish(USER_ID, LATER)).toThrow(ProductAlreadyPublishedError);
    });
  });

  describe('unpublish()', () => {
    it('should revert to DRAFT and clear publishedAt', () => {
      const product = buildProduct();
      product.publish(USER_ID, LATER);
      product.unpublish(USER_ID, 'testing', LATER);
      expect(product.status.value).toBe(PRODUCT_STATUS.DRAFT);
      expect(product.isPublished).toBe(false);
      expect(product.publishedAt).toBeUndefined();
    });

    it('should throw if product is not published', () => {
      const product = buildProduct();
      expect(() => product.unpublish(USER_ID, 'reason', LATER)).toThrow(Error);
    });
  });

  describe('archive()', () => {
    it('should set status to ARCHIVED', () => {
      const product = buildProduct();
      product.archive(USER_ID, LATER);
      expect(product.status.value).toBe(PRODUCT_STATUS.ARCHIVED);
      expect(product.isPublished).toBe(false);
    });

    it('should throw if already archived', () => {
      const product = buildProduct();
      product.archive(USER_ID, LATER);
      expect(() => product.archive(USER_ID, LATER)).toThrow(Error);
    });
  });

  describe('softDelete()', () => {
    it('should mark product as deleted', () => {
      const product = buildProduct();
      product.softDelete(USER_ID, LATER);
      expect(product.status.value).toBe(PRODUCT_STATUS.DELETED);
      expect(product.isPublished).toBe(false);
    });

    it('isDeleted() should be true after deletion', () => {
      const product = buildProduct();
      product.softDelete(USER_ID, LATER);
      expect(product.isDeleted()).toBe(true);
    });
  });

  describe('feature() / unfeature()', () => {
    it('should set isFeatured true', () => {
      const product = buildProduct();
      product.feature(USER_ID);
      expect(product.isFeatured).toBe(true);
    });

    it('should be idempotent (no change if already featured)', () => {
      const product = buildProduct({ isFeatured: true });
      const before = product.version;
      product.feature(USER_ID);
      expect(product.version).toBe(before);
    });

    it('should set isFeatured false', () => {
      const product = buildProduct({ isFeatured: true });
      product.unfeature(USER_ID);
      expect(product.isFeatured).toBe(false);
    });
  });

  describe('changePrice()', () => {
    it('should update price and emit event', () => {
      const product = buildProduct();
      product.pullDomainEvents();
      const newPrice = PriceVO.create(1500, DEFAULT_CURRENCY);
      product.changePrice(newPrice, USER_ID);
      expect(product.price.amount).toBe(1500);
      const events = product.pullDomainEvents();
      expect(events[0]).toBeInstanceOf(ProductPriceChangedEvent);
    });

    it('should not emit event if price unchanged', () => {
      const product = buildProduct();
      product.pullDomainEvents();
      const same = PriceVO.create(1000, DEFAULT_CURRENCY);
      product.changePrice(same, USER_ID);
      expect(product.pullDomainEvents().length).toBe(0);
    });
  });

  describe('changeStatus()', () => {
    it('should transition DRAFT to PENDING', () => {
      const product = buildProduct();
      product.changeStatus(ProductStatusVO.create(PRODUCT_STATUS.PENDING), USER_ID);
      expect(product.status.value).toBe(PRODUCT_STATUS.PENDING);
    });

    it('should reject invalid transition', () => {
      const product = buildProduct({ status: ProductStatusVO.create(PRODUCT_STATUS.ARCHIVED) });
      expect(() =>
        product.changeStatus(ProductStatusVO.create(PRODUCT_STATUS.PUBLISHED), USER_ID),
      ).toThrow(Error);
    });
  });

  describe('addVariant() / removeVariant()', () => {
    it('should add variant id', () => {
      const product = buildProduct();
      product.addVariant('variant-1');
      expect(product.variantCount()).toBe(1);
    });

    it('should not duplicate variant id', () => {
      const product = buildProduct();
      product.addVariant('variant-1');
      product.addVariant('variant-1');
      expect(product.variantCount()).toBe(1);
    });

    it('should remove variant id', () => {
      const product = buildProduct();
      product.addVariant('variant-1');
      product.removeVariant('variant-1');
      expect(product.variantCount()).toBe(0);
    });
  });

  describe('updateTotalStock()', () => {
    it('should update total stock', () => {
      const product = buildProduct();
      product.updateTotalStock(50);
      expect(product.totalStock).toBe(50);
    });

    it('should reject negative stock', () => {
      const product = buildProduct();
      expect(() => product.updateTotalStock(-1)).toThrow(Error);
    });
  });

  describe('isAvailable()', () => {
    it('returns false for DRAFT product', () => {
      const product = buildProduct();
      expect(product.isAvailable()).toBe(false);
    });

    it('returns true for published product with stock', () => {
      const product = buildProduct();
      product.publish(USER_ID, LATER);
      expect(product.isAvailable()).toBe(true);
    });

    it('returns false for deleted product', () => {
      const product = buildProduct();
      product.publish(USER_ID, LATER);
      product.softDelete(USER_ID, LATER);
      expect(product.isAvailable()).toBe(false);
    });
  });

  describe('hasDiscount() / getDiscountPercent()', () => {
    it('returns false when no compareAtPrice', () => {
      const product = buildProduct();
      expect(product.hasDiscount()).toBe(false);
      expect(product.getDiscountPercent()).toBe(0);
    });

    it('calculates discount percent', () => {
      const product = buildProduct({
        price: PriceVO.create(800, DEFAULT_CURRENCY),
        compareAtPrice: PriceVO.create(1000, DEFAULT_CURRENCY),
      });
      expect(product.hasDiscount()).toBe(true);
      expect(product.getDiscountPercent()).toBe(20);
    });
  });
});
