/**
 * ProductCatalogService — unit tests
 */
import { jest } from '@jest/globals';
import { ProductCatalogService } from '../../../src/module/application/services/impl/product-catalog.service.js';
import {
  createMockProductRepository,
  type MockedProductRepository,
} from '../../mocks/repositories.js';
import { buildProduct } from '../../fixtures.js';
import { PRODUCT_ID, CATEGORY_ID } from '../../helpers.js';
import type { IProductService } from '../../../src/module/application/services/interfaces/product.service.interface.js';
import type { ProductDetailResponseDTO } from '../../../src/module/application/dtos/responses/product-detail-response.dto.js';

function noopProductService(): IProductService {
  return {
    create: jest.fn(),
    update: jest.fn(),
    publish: jest.fn(),
    unpublish: jest.fn(),
    archive: jest.fn(),
    softDelete: jest.fn(),
    feature: jest.fn(),
    unfeature: jest.fn(),
    duplicate: jest.fn(),
    getDetail: jest.fn(async (productId: string): Promise<ProductDetailResponseDTO> => ({
      product: {
        id: productId,
        name: 'Test',
        slug: 'test',
        sku: 'SKU',
        type: 'physical',
        status: 'draft',
        categoryId: CATEGORY_ID,
        price: 1000,
        currency: 'BDT',
        tags: [],
        images: [],
        totalStock: 0,
        isFeatured: false,
        isPublished: false,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
      variants: [],
      inventory: [],
      attributes: [],
    })),
  } as unknown as IProductService;
}

describe('ProductCatalogService', () => {
  let service: ProductCatalogService;
  let productRepo: MockedProductRepository;

  beforeEach(() => {
    productRepo = createMockProductRepository();
    service = new ProductCatalogService(productRepo, noopProductService());
  });

  describe('list()', () => {
    it('should return paginated list', async () => {
      productRepo.findPaginated.mockResolvedValueOnce({
        items: [buildProduct()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });

      const result = await service.list({ page: 1, limit: 20 });
      expect(result.success).toBe(true);
      expect(result.products.length).toBe(1);
      expect(result.total).toBe(1);
    });
  });

  describe('getDetail()', () => {
    it('should return product detail', async () => {
      const result = await service.getDetail(PRODUCT_ID);
      expect(result.product.id).toBe(PRODUCT_ID);
    });
  });

  describe('getBySlug()', () => {
    it('should return null when not found', async () => {
      productRepo.findBySlug.mockResolvedValueOnce(null);
      expect(await service.getBySlug('missing')).toBeNull();
    });

    it('should return detail when found', async () => {
      productRepo.findBySlug.mockResolvedValueOnce(buildProduct());
      const result = await service.getBySlug('test-product');
      expect(result?.product.id).toBe(PRODUCT_ID);
    });
  });

  describe('listFeatured()', () => {
    it('should return featured list', async () => {
      productRepo.findFeatured.mockResolvedValueOnce([buildProduct({ isFeatured: true })]);
      const result = await service.listFeatured();
      expect(result.products.length).toBe(1);
    });
  });

  describe('listByCategory()', () => {
    it('should filter by category', async () => {
      productRepo.findPaginated.mockResolvedValueOnce({
        items: [buildProduct()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });

      const result = await service.listByCategory(CATEGORY_ID, 1, 20);
      expect(result.total).toBe(1);
    });
  });
});
