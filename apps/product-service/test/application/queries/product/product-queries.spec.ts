/**
 * Product Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { GetProductHandler } from '../../../../src/module/application/queries/product/get-product.handler.js';
import { GetProductQuery } from '../../../../src/module/application/queries/product/get-product.query.js';
import { GetProductBySlugHandler } from '../../../../src/module/application/queries/product/get-product-by-slug.handler.js';
import { GetProductBySlugQuery } from '../../../../src/module/application/queries/product/get-product-by-slug.query.js';
import { GetProductDetailHandler } from '../../../../src/module/application/queries/product/get-product-detail.handler.js';
import { GetProductDetailQuery } from '../../../../src/module/application/queries/product/get-product-detail.query.js';
import { ListProductsHandler } from '../../../../src/module/application/queries/product/list-products.handler.js';
import { ListProductsQuery } from '../../../../src/module/application/queries/product/list-products.query.js';
import { SearchProductsHandler } from '../../../../src/module/application/queries/product/search-products.handler.js';
import { SearchProductsQuery } from '../../../../src/module/application/queries/product/search-products.query.js';
import {
  createMockProductService,
  createMockProductCatalogService,
  type MockedProductService,
  type MockedProductCatalogService,
} from '../../../mocks/services.js';
import { mockProductDetailResponse, mockProductListResponse } from '../../../mocks/responses.js';
import { PRODUCT_ID } from '../../../helpers.js';

describe('Product Query Handlers', () => {
  let productService: MockedProductService;
  let catalogService: MockedProductCatalogService;

  beforeEach(() => {
    productService = createMockProductService();
    catalogService = createMockProductCatalogService();
    productService.getDetail.mockResolvedValue(mockProductDetailResponse());
    catalogService.getDetail.mockResolvedValue(mockProductDetailResponse());
    catalogService.getBySlug.mockResolvedValue(mockProductDetailResponse());
    catalogService.list.mockResolvedValue(mockProductListResponse());
  });

  describe('GetProductHandler', () => {
    it('should call service.getDetail', async () => {
      const handler = new GetProductHandler(productService);
      await handler.execute(new GetProductQuery(PRODUCT_ID));
      expect(productService.getDetail).toHaveBeenCalledWith(PRODUCT_ID);
    });
  });

  describe('GetProductBySlugHandler', () => {
    it('should call catalog.getBySlug', async () => {
      const handler = new GetProductBySlugHandler(catalogService);
      await handler.execute(new GetProductBySlugQuery('test-product'));
      expect(catalogService.getBySlug).toHaveBeenCalledWith('test-product');
    });
  });

  describe('GetProductDetailHandler', () => {
    it('should return product detail DTO', async () => {
      const handler = new GetProductDetailHandler(productService);
      const result = await handler.execute(new GetProductDetailQuery(PRODUCT_ID));
      expect(result.product.id).toBe(PRODUCT_ID);
    });
  });

  describe('ListProductsHandler', () => {
    it('should call catalog.list with options', async () => {
      const handler = new ListProductsHandler(catalogService);
      const options = { page: 1, limit: 20, sortBy: 'createdAt' as const, sortDir: 'desc' as const };
      await handler.execute(new ListProductsQuery(options));
      expect(catalogService.list).toHaveBeenCalledWith(options);
    });
  });

  describe('SearchProductsHandler', () => {
    it('should call catalog.list with search filter', async () => {
      const handler = new SearchProductsHandler(catalogService);
      await handler.execute(new SearchProductsQuery('headphones', 1, 20));
      expect(catalogService.list).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        filter: { search: 'headphones' },
      });
    });
  });
});
