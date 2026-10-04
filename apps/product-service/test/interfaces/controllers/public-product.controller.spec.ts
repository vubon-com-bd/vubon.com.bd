/**
 * PublicProductController — unit tests
 */
import { jest } from '@jest/globals';
import { PublicProductController } from '../../../src/module/interfaces/controllers/rest/public-product.controller.js';
import { GetProductBySlugQuery } from '../../../src/module/application/queries/product/get-product-by-slug.query.js';
import { ListProductsQuery } from '../../../src/module/application/queries/product/list-products.query.js';
import { SearchProductsQuery } from '../../../src/module/application/queries/product/search-products.query.js';
import { createMockQueryBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockProductListResponse, mockProductDetailResponse } from '../../mocks/responses.js';
import { CATEGORY_ID } from '../../helpers.js';

describe('PublicProductController', () => {
  let controller: PublicProductController;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    queryBus = createMockQueryBus();
    controller = new PublicProductController(queryBus);
  });

  describe('list', () => {
    it('should filter by published status', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductListResponse());

      await controller.list(1, 20);

      const q = queryBus.execute.mock.calls[0][0] as ListProductsQuery;
      expect(q.options.filter?.status).toBe('published');
    });

    it('should pass categoryId + search', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductListResponse());

      await controller.list(1, 20, CATEGORY_ID, 'headphones');

      const q = queryBus.execute.mock.calls[0][0] as ListProductsQuery;
      expect(q.options.filter?.categoryId).toBe(CATEGORY_ID);
      expect(q.options.filter?.search).toBe('headphones');
    });
  });

  describe('search', () => {
    it('should dispatch SearchProductsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductListResponse());
      await controller.search('headphones', 1, 20);
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(SearchProductsQuery));
    });
  });

  describe('getBySlug', () => {
    it('should dispatch GetProductBySlugQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductDetailResponse());

      const result = await controller.getBySlug('test-product');

      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetProductBySlugQuery));
      const q = queryBus.execute.mock.calls[0][0] as GetProductBySlugQuery;
      expect(q.slug).toBe('test-product');
      expect(result?.product).toBeDefined();
    });

    it('should return null when not found', async () => {
      queryBus.execute.mockResolvedValueOnce(null);
      const result = await controller.getBySlug('missing');
      expect(result).toBeNull();
    });
  });
});
