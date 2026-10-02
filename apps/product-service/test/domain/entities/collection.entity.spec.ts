/**
 * CollectionEntity — unit tests
 */
import { CollectionEntity } from '../../../src/module/domain/entities/collection.entity.js';
import { CollectionNameVO } from '../../../src/module/domain/value-objects/primitives/collection-name.vo.js';
import { ProductIdVO } from '../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { COLLECTION_TYPE, COLLECTION_STATUS, COLLECTION } from '@vubon/shared-constants/business/product';
import { buildCollection, buildNewCollection } from '../../fixtures.js';
import { USER_ID, PRODUCT_ID, LATER } from '../../helpers.js';

describe('CollectionEntity', () => {
  describe('create()', () => {
    it('should create collection with given type', () => {
      const col = buildNewCollection();
      expect(col.type).toBe(COLLECTION_TYPE.MANUAL);
      expect(col.productCount).toBe(0);
    });

    it('should reject invalid collection type', () => {
      expect(() => buildNewCollection({ type: 'unknown_type' })).toThrow(Error);
    });

    it('should reject products over limit at construction', () => {
      const tooMany = Array.from({ length: COLLECTION.MAX_PRODUCTS + 1 }, (_, i) => `p-${i}`);
      expect(() => buildNewCollection({ productIds: tooMany })).toThrow(Error);
    });
  });

  describe('update()', () => {
    it('should update name, description, image', () => {
      const col = buildCollection();
      col.pullDomainEvents();
      col.update({
        name: CollectionNameVO.create('Winter Sale'),
        description: 'New description',
        imageUrl: 'https://cdn.example.com/col.jpg',
        isFeatured: true,
        sortOrder: 10,
      }, USER_ID);
      expect(col.name.value).toBe('Winter Sale');
      expect(col.description).toBe('New description');
      expect(col.imageUrl).toBe('https://cdn.example.com/col.jpg');
      expect(col.isFeatured).toBe(true);
      expect(col.sortOrder).toBe(10);
    });

    it('should reject bad schedule', () => {
      const col = buildCollection();
      expect(() =>
        col.update({ startAt: LATER, endAt: LATER }, USER_ID),
      ).toThrow(Error);
    });
  });

  describe('addProduct() / removeProduct()', () => {
    it('should add a product', () => {
      const col = buildCollection();
      col.addProduct(ProductIdVO.create(PRODUCT_ID), USER_ID);
      expect(col.productCount).toBe(1);
      expect(col.hasProduct(ProductIdVO.create(PRODUCT_ID))).toBe(true);
    });

    it('should not double add', () => {
      const col = buildCollection();
      col.addProduct(ProductIdVO.create(PRODUCT_ID), USER_ID);
      col.addProduct(ProductIdVO.create(PRODUCT_ID), USER_ID);
      expect(col.productCount).toBe(1);
    });

    it('should reject manual add on automatic collection', () => {
      const col = buildCollection({ type: COLLECTION_TYPE.AUTOMATIC });
      expect(() => col.addProduct(ProductIdVO.create(PRODUCT_ID), USER_ID)).toThrow(Error);
    });

    it('should remove product', () => {
      const col = buildCollection({ productIds: [PRODUCT_ID] });
      col.removeProduct(ProductIdVO.create(PRODUCT_ID));
      expect(col.productCount).toBe(0);
    });

    it('should remove no-op if product not present', () => {
      const col = buildCollection();
      const before = col.version;
      col.removeProduct(ProductIdVO.create(PRODUCT_ID));
      expect(col.version).toBe(before);
    });
  });

  describe('addProducts()', () => {
    it('should add multiple products', () => {
      const col = buildCollection();
      col.addProducts(
        [ProductIdVO.create('product-1111111'), ProductIdVO.create('product-2222222')],
        USER_ID,
      );
      expect(col.productCount).toBe(2);
    });

    it('should reject on automatic collection', () => {
      const col = buildCollection({ type: COLLECTION_TYPE.AUTOMATIC });
      expect(() => col.addProducts([ProductIdVO.create('product-1111111')], USER_ID)).toThrow(Error);
    });
  });

  describe('publish() / unpublish()', () => {
    it('publish sets ACTIVE', () => {
      const col = buildCollection({ status: COLLECTION_STATUS.INACTIVE });
      col.publish();
      expect(col.status).toBe(COLLECTION_STATUS.ACTIVE);
    });

    it('unpublish sets INACTIVE', () => {
      const col = buildCollection({ status: COLLECTION_STATUS.ACTIVE });
      col.unpublish();
      expect(col.status).toBe(COLLECTION_STATUS.INACTIVE);
    });
  });

  describe('schedule()', () => {
    it('should set start/end and SCHEDULED status', () => {
      const col = buildCollection();
      col.schedule('2025-01-01T00:00:00.000Z', '2025-02-01T00:00:00.000Z');
      expect(col.status).toBe(COLLECTION_STATUS.SCHEDULED);
      expect(col.startAt).toBe('2025-01-01T00:00:00.000Z');
    });

    it('should reject start >= end', () => {
      const col = buildCollection();
      expect(() => col.schedule(LATER, LATER)).toThrow(Error);
    });
  });

  describe('softDelete()', () => {
    it('should set DELETED status', () => {
      const col = buildCollection();
      col.softDelete(USER_ID);
      expect(col.status).toBe(COLLECTION_STATUS.DELETED);
    });
  });

  describe('isActive()', () => {
    it('true for active collection within window', () => {
      const col = buildCollection({ status: COLLECTION_STATUS.ACTIVE });
      expect(col.isActive(LATER)).toBe(true);
    });

    it('false before startAt', () => {
      const col = buildCollection({
        status: COLLECTION_STATUS.ACTIVE,
        startAt: '2026-01-01T00:00:00.000Z',
      });
      expect(col.isActive(LATER)).toBe(false);
    });

    it('false after endAt', () => {
      const col = buildCollection({
        status: COLLECTION_STATUS.ACTIVE,
        endAt: '2024-01-01T00:00:00.000Z',
      });
      expect(col.isActive(LATER)).toBe(false);
    });
  });

  describe('queries', () => {
    it('isAutomatic', () => {
      expect(buildCollection({ type: COLLECTION_TYPE.AUTOMATIC }).isAutomatic()).toBe(true);
      expect(buildCollection().isAutomatic()).toBe(false);
    });

    it('canAddMore', () => {
      expect(buildCollection().canAddMore()).toBe(true);
    });
  });

  void CollectionEntity;
});
