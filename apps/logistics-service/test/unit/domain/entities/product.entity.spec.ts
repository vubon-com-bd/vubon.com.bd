/**
 * ProductEntity — Unit Tests (Aggregate Root)
 */
import { describe, it, expect } from '@jest/globals';
import { ProductEntity } from '../../../../src/module/domain/entities/product.entity.js';
import { ProductVO } from '../../../../src/module/domain/value-objects/composites/product.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { ProductNameVO } from '../../../../src/module/domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../../src/module/domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../../src/module/domain/value-objects/primitives/product-sku.vo.js';
import { ProductStatusVO } from '../../../../src/module/domain/value-objects/primitives/product-status.vo.js';
import { ProductTypeVO } from '../../../../src/module/domain/value-objects/primitives/product-type.vo.js';
import { CategoryIdVO } from '../../../../src/module/domain/value-objects/primitives/category-id.vo.js';

const NOW = '2026-01-01T00:00:00.000Z';
const PRODUCT_ID = '11111111-1111-4111-8111-111111111111';
const CATEGORY_ID = '22222222-2222-4222-8222-222222222222';

function buildDraftVO() {
  return ProductVO.create({
    id: ProductIdVO.create(PRODUCT_ID),
    name: ProductNameVO.create('Test Product'),
    slug: ProductSlugVO.create('test-product'),
    sku: ProductSkuVO.create('TEST-SKU-001'),
    type: ProductTypeVO.create('physical'),
    status: ProductStatusVO.draft(),
    categoryId: CategoryIdVO.create(CATEGORY_ID),
    tags: [],
    images: ['https://example.com/img.jpg'],
    totalStock: 10,
    isFeatured: false,
    isPublished: false,
  });
}

describe('ProductEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates draft product', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      expect(e.id).toBe(PRODUCT_ID);
      expect(e.status.isDraft()).toBe(true);
    });

    it('emits ProductCreatedEvent', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      const events = e.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(events[0].type).toBe('product.product.created');
    });

    it('throws if not draft', () => {
      const vo = buildDraftVO();
      const published = ProductVO.create({
        ...vo.value,
        status: ProductStatusVO.published(),
        isPublished: true,
        publishedAt: NOW,
      });
      expect(() =>
        ProductEntity.create({
          id: ProductIdVO.create(PRODUCT_ID),
          vo: published,
          now: NOW,
        }),
      ).toThrow();
    });
  });

  describe('state machine — submit/approve/publish', () => {
    it('submit: draft → pending', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.submit();
      expect(e.status.isPending()).toBe(true);
    });

    it('approve: pending → approved', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.submit();
      e.approve();
      expect(e.status.isApproved()).toBe(true);
    });

    it('publish: approved → published', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.submit();
      e.approve();
      e.publish(NOW);
      expect(e.status.isPublished()).toBe(true);
      expect(e.vo.publishedAt).toBe(NOW);
    });

    it('reject: pending → rejected', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.submit();
      e.reject('Missing images');
      expect(e.status.isRejected()).toBe(true);
      expect(e.rejectionReason).toBe('Missing images');
    });

    it('archive: published → archived', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.submit();
      e.approve();
      e.publish(NOW);
      e.archive(NOW);
      expect(e.status.isArchived()).toBe(true);
    });
  });

  describe('updateStock()', () => {
    it('changes total stock + emits event', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.pullDomainEvents();
      e.updateStock(5, 'manual adjust', NOW);
      const events = e.pullDomainEvents();
      expect(events.some((ev) => ev.type === 'product.product.stock_changed')).toBe(true);
    });

    it('marks out_of_stock when stock becomes 0 + published', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.submit();
      e.approve();
      e.publish(NOW);
      e.updateStock(0, 'sold out', NOW);
      expect(e.status.isOutOfStock()).toBe(true);
    });
  });

  describe('delete()', () => {
    it('draft can be deleted', () => {
      const e = ProductEntity.create({
        id: ProductIdVO.create(PRODUCT_ID),
        vo: buildDraftVO(),
        now: NOW,
      });
      e.delete('user-1', NOW);
      expect(e.status.isDeleted()).toBe(true);
    });
  });
});
