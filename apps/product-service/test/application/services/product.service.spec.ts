/**
 * ProductService — unit tests (repositories mocked)
 */
import { jest } from '@jest/globals';
import { ProductService } from '../../../src/module/application/services/impl/product.service.js';
import {
  ProductNotFoundApplicationError,
  ProductSlugConflictError,
  ProductSkuConflictError,
} from '../../../src/module/application/errors/product.errors.js';
import {
  createMockProductRepository,
  createMockVariantRepository,
  createMockInventoryRepository,
  createMockPricingRepository,
  createMockReviewRepository,
  emptyProductPage,
  type MockedProductRepository,
} from '../../mocks/repositories.js';
import { buildProduct, buildNewProduct } from '../../fixtures.js';
import { PRODUCT_STATUS, PRODUCT_TYPE } from '@vubon/shared-constants/business/product';
import { CategoryIdVO } from '../../../src/module/domain/value-objects/primitives/category-id.vo.js';
import { ProductDescriptionVO } from '../../../src/module/domain/value-objects/primitives/product-description.vo.js';
import { ProductNameVO } from '../../../src/module/domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../src/module/domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../src/module/domain/value-objects/primitives/product-sku.vo.js';
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import {
  NOW, USER_ID, PRODUCT_ID, CATEGORY_ID, DEFAULT_CURRENCY,
} from '../../helpers.js';
import type { AttributeRepository } from '../../../src/module/domain/repositories/attribute.repository.interface.js';

// Mock attribute repository (unused in create path)
function noopAttributeRepo(): AttributeRepository {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByProductId: jest.fn(),
    findBySlug: jest.fn(),
    findFilterable: jest.fn(),
    findSearchable: jest.fn(),
    countByProductId: jest.fn(),
    deleteByProductId: jest.fn(),
  } as unknown as AttributeRepository;
}

describe('ProductService', () => {
  let service: ProductService;
  let productRepo: MockedProductRepository;

  beforeEach(() => {
    productRepo = createMockProductRepository();
    productRepo.existsBySlug.mockResolvedValue(false);
    productRepo.existsBySku.mockResolvedValue(false);
    productRepo.save.mockImplementation(async (p) => p);

    service = new ProductService(
      productRepo,
      createMockVariantRepository(),
      createMockInventoryRepository(),
      createMockPricingRepository(),
      noopAttributeRepo(),
    );
  });

  describe('create()', () => {
    it('should create product and return DTO', async () => {
      const dto = {
        name: 'New Product',
        slug: 'new-product',
        sku: 'NEW-001',
        type: PRODUCT_TYPE.PHYSICAL,
        categoryId: CATEGORY_ID,
        currency: DEFAULT_CURRENCY,
        price: 999,
      };

      const result = await service.create(dto as never, USER_ID);

      expect(result.name).toBe('New Product');
      expect(result.slug).toBe('new-product');
      expect(result.status).toBe(PRODUCT_STATUS.DRAFT);
      expect(productRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should reject duplicate slug', async () => {
      productRepo.existsBySlug.mockResolvedValueOnce(true);

      const dto = {
        name: 'Test',
        slug: 'existing-slug',
        sku: 'SKU-001',
        type: PRODUCT_TYPE.PHYSICAL,
        categoryId: CATEGORY_ID,
        currency: DEFAULT_CURRENCY,
        price: 100,
      };

      await expect(service.create(dto as never, USER_ID)).rejects.toThrow(
        ProductSlugConflictError,
      );
    });

    it('should reject duplicate SKU', async () => {
      productRepo.existsBySlug.mockResolvedValueOnce(false);
      productRepo.existsBySku.mockResolvedValueOnce(true);

      const dto = {
        name: 'Test',
        slug: 'new-slug',
        sku: 'EXISTING-SKU',
        type: PRODUCT_TYPE.PHYSICAL,
        categoryId: CATEGORY_ID,
        currency: DEFAULT_CURRENCY,
        price: 100,
      };

      await expect(service.create(dto as never, USER_ID)).rejects.toThrow(
        ProductSkuConflictError,
      );
    });
  });

  describe('update()', () => {
    it('should throw ProductNotFoundApplicationError for missing id', async () => {
      productRepo.findById.mockResolvedValueOnce(null);

      await expect(
        service.update('missing-id', { name: 'X' } as never, USER_ID),
      ).rejects.toThrow(ProductNotFoundApplicationError);
    });

    it('should update description', async () => {
      const product = buildProduct();
      productRepo.findById.mockResolvedValueOnce(product);

      const result = await service.update(
        PRODUCT_ID,
        { description: 'Updated description' } as never,
        USER_ID,
      );

      expect(result.id).toBe(PRODUCT_ID);
      expect(productRepo.save).toHaveBeenCalled();
    });

    it('should update price when provided', async () => {
      const product = buildProduct();
      productRepo.findById.mockResolvedValueOnce(product);

      await service.update(PRODUCT_ID, { price: 1500 } as never, USER_ID);

      expect(product.price.amount).toBe(1500);
    });
  });

  describe('publish()', () => {
    it('should publish valid draft product', async () => {
      const product = buildProduct();
      productRepo.findById.mockResolvedValueOnce(product);

      const result = await service.publish(PRODUCT_ID, USER_ID);

      expect(result.status).toBe(PRODUCT_STATUS.PUBLISHED);
    });

    it('should reject publish for missing product', async () => {
      productRepo.findById.mockResolvedValueOnce(null);
      await expect(service.publish('missing', USER_ID)).rejects.toThrow(
        ProductNotFoundApplicationError,
      );
    });
  });

  describe('unpublish()', () => {
    it('should revert to DRAFT', async () => {
      const product = buildProduct();
      product.publish(USER_ID, NOW);
      productRepo.findById.mockResolvedValueOnce(product);

      const result = await service.unpublish(PRODUCT_ID, USER_ID, 'testing');

      expect(result.status).toBe(PRODUCT_STATUS.DRAFT);
    });
  });

  describe('archive()', () => {
    it('should set status to ARCHIVED', async () => {
      const product = buildProduct();
      productRepo.findById.mockResolvedValueOnce(product);

      const result = await service.archive(PRODUCT_ID, USER_ID);
      expect(result.status).toBe(PRODUCT_STATUS.ARCHIVED);
    });
  });

  describe('softDelete()', () => {
    it('should mark product as deleted', async () => {
      const product = buildProduct();
      productRepo.findById.mockResolvedValueOnce(product);

      await service.softDelete(PRODUCT_ID, USER_ID);

      expect(product.isDeleted()).toBe(true);
      expect(productRepo.save).toHaveBeenCalledTimes(1);
    });

    it('should reject deleting a missing product', async () => {
      productRepo.findById.mockResolvedValueOnce(null);
      await expect(service.softDelete('missing', USER_ID)).rejects.toThrow(
        ProductNotFoundApplicationError,
      );
    });
  });

  describe('feature() / unfeature()', () => {
    it('should feature a product', async () => {
      const product = buildProduct();
      productRepo.findById.mockResolvedValueOnce(product);

      const result = await service.feature(PRODUCT_ID, USER_ID);
      expect(result.isFeatured).toBe(true);
    });

    it('should unfeature a product', async () => {
      const product = buildProduct({ isFeatured: true });
      productRepo.findById.mockResolvedValueOnce(product);

      const result = await service.unfeature(PRODUCT_ID, USER_ID);
      expect(result.isFeatured).toBe(false);
    });
  });

  describe('duplicate()', () => {
    it('should create copy with new name and slug', async () => {
      const original = buildProduct();
      productRepo.findById.mockResolvedValueOnce(original);
      productRepo.existsBySlug.mockResolvedValueOnce(false);
      productRepo.existsBySku.mockResolvedValueOnce(false);

      const result = await service.duplicate(PRODUCT_ID, 'Copy Product', USER_ID);

      expect(result.name).toBe('Copy Product');
      expect(result.slug).not.toBe(original.slug.value);
    });

    it('should append -1 to slug if base exists', async () => {
      const original = buildProduct();
      productRepo.findById.mockResolvedValueOnce(original);
      productRepo.existsBySlug.mockResolvedValueOnce(true);
      productRepo.existsBySlug.mockResolvedValueOnce(false);
      productRepo.existsBySku.mockResolvedValueOnce(false);

      const result = await service.duplicate(PRODUCT_ID, 'Copy Product', USER_ID);
      expect(result.slug).toBe('copy-product-1');
    });
  });

  // silence unused-import warnings
  void buildNewProduct;
  void CategoryIdVO;
  void ProductDescriptionVO;
  void ProductNameVO;
  void ProductSlugVO;
  void ProductSkuVO;
  void PriceVO;
  void emptyProductPage;
});
