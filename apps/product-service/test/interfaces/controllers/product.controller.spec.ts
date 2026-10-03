/**
 * ProductController — unit tests (bus-based delegation)
 */
import { jest } from '@jest/globals';
import { ProductController } from '../../../src/module/interfaces/controllers/rest/product.controller.js';
import { CreateProductCommand } from '../../../src/module/application/commands/product/create-product.command.js';
import { UpdateProductCommand } from '../../../src/module/application/commands/product/update-product.command.js';
import { DeleteProductCommand } from '../../../src/module/application/commands/product/delete-product.command.js';
import { PublishProductCommand } from '../../../src/module/application/commands/product/publish-product.command.js';
import { UnpublishProductCommand } from '../../../src/module/application/commands/product/unpublish-product.command.js';
import { ArchiveProductCommand } from '../../../src/module/application/commands/product/archive-product.command.js';
import { FeatureProductCommand } from '../../../src/module/application/commands/product/feature-product.command.js';
import { DuplicateProductCommand } from '../../../src/module/application/commands/product/duplicate-product.command.js';
import { GetProductDetailQuery } from '../../../src/module/application/queries/product/get-product-detail.query.js';
import { ListProductsQuery } from '../../../src/module/application/queries/product/list-products.query.js';
import { SearchProductsQuery } from '../../../src/module/application/queries/product/search-products.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockUser, mockAdmin } from '../../mocks/users.js';
import { mockProductResponse, mockProductDetailResponse, mockProductListResponse } from '../../mocks/responses.js';
import { PRODUCT_ID, USER_ID, CATEGORY_ID } from '../../helpers.js';
import { PRODUCT_TYPE } from '@vubon/shared-constants/business/product';

describe('ProductController', () => {
  let controller: ProductController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductController(commandBus, queryBus);
  });

  describe('create', () => {
    it('should dispatch CreateProductCommand with dto + actorId', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());
      const dto = {
        name: 'Test',
        slug: 'test',
        sku: 'TEST-1',
        type: PRODUCT_TYPE.PHYSICAL,
        categoryId: CATEGORY_ID,
        currency: 'BDT',
        price: 1000,
      };

      const result = await controller.create(dto as never, mockUser() as never);

      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(CreateProductCommand));
      const cmd = commandBus.execute.mock.calls[0][0] as CreateProductCommand;
      expect(cmd.actorId).toBe(USER_ID);
      expect(result.id).toBe(PRODUCT_ID);
    });
  });

  describe('list', () => {
    it('should dispatch ListProductsQuery with pagination', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductListResponse());

      const result = await controller.list(1, 20);

      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListProductsQuery));
      const q = queryBus.execute.mock.calls[0][0] as ListProductsQuery;
      expect(q.options.page).toBe(1);
      expect(q.options.limit).toBe(20);
      expect(result.success).toBe(true);
    });

    it('should pass filters to query', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductListResponse());

      await controller.list(1, 20, 'published', 'physical', CATEGORY_ID);

      const q = queryBus.execute.mock.calls[0][0] as ListProductsQuery;
      expect(q.options.filter?.status).toBe('published');
      expect(q.options.filter?.type).toBe('physical');
      expect(q.options.filter?.categoryId).toBe(CATEGORY_ID);
    });
  });

  describe('search', () => {
    it('should dispatch SearchProductsQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductListResponse());

      await controller.search('headphones', 1, 20);

      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(SearchProductsQuery));
      const q = queryBus.execute.mock.calls[0][0] as SearchProductsQuery;
      expect(q.search).toBe('headphones');
    });
  });

  describe('getDetail', () => {
    it('should dispatch GetProductDetailQuery', async () => {
      queryBus.execute.mockResolvedValueOnce(mockProductDetailResponse());

      const result = await controller.getDetail(PRODUCT_ID);

      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetProductDetailQuery));
      expect(result.product.id).toBe(PRODUCT_ID);
    });
  });

  describe('update', () => {
    it('should dispatch UpdateProductCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());

      await controller.update(PRODUCT_ID, { name: 'Updated' } as never, mockUser() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as UpdateProductCommand;
      expect(cmd.productId).toBe(PRODUCT_ID);
      expect(cmd.actorId).toBe(USER_ID);
    });
  });

  describe('publish', () => {
    it('should dispatch PublishProductCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());

      await controller.publish(PRODUCT_ID, mockUser() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as PublishProductCommand;
      expect(cmd.productId).toBe(PRODUCT_ID);
      expect(cmd.actorId).toBe(USER_ID);
    });
  });

  describe('unpublish', () => {
    it('should dispatch UnpublishProductCommand with reason', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());

      await controller.unpublish(PRODUCT_ID, 'testing', mockUser() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as UnpublishProductCommand;
      expect(cmd.reason).toBe('testing');
    });

    it('should accept undefined reason', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());

      await controller.unpublish(PRODUCT_ID, undefined, mockUser() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as UnpublishProductCommand;
      expect(cmd.reason).toBeUndefined();
    });
  });

  describe('archive', () => {
    it('should dispatch ArchiveProductCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());
      await controller.archive(PRODUCT_ID, mockUser() as never);
      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(ArchiveProductCommand));
    });
  });

  describe('feature', () => {
    it('should dispatch FeatureProductCommand with true', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());
      await controller.feature(PRODUCT_ID, true, mockAdmin() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as FeatureProductCommand;
      expect(cmd.featured).toBe(true);
    });

    it('should default to true when body undefined', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());
      await controller.feature(PRODUCT_ID, undefined as never, mockAdmin() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as FeatureProductCommand;
      expect(cmd.featured).toBe(true);
    });
  });

  describe('duplicate', () => {
    it('should dispatch DuplicateProductCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(mockProductResponse());

      await controller.duplicate(PRODUCT_ID, 'Copy', mockUser() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as DuplicateProductCommand;
      expect(cmd.newName).toBe('Copy');
    });
  });

  describe('remove', () => {
    it('should dispatch DeleteProductCommand', async () => {
      commandBus.execute.mockResolvedValueOnce(undefined);

      await controller.remove(PRODUCT_ID, mockAdmin() as never);

      const cmd = commandBus.execute.mock.calls[0][0] as DeleteProductCommand;
      expect(cmd.productId).toBe(PRODUCT_ID);
    });
  });

  describe('BaseController helpers', () => {
    it('should extend BaseController', () => {
      expect(controller).toHaveProperty('isAuthenticated');
      expect(typeof controller['isAuthenticated']).toBe('function');
    });

    it('isAuthenticated returns false without currentUser override', () => {
      expect(controller['isAuthenticated']()).toBe(false);
    });
  });
});
