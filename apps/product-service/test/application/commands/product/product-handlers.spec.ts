/**
 * Product Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { CreateProductHandler } from '../../../../src/module/application/commands/product/create-product.handler.js';
import { CreateProductCommand } from '../../../../src/module/application/commands/product/create-product.command.js';
import { UpdateProductHandler } from '../../../../src/module/application/commands/product/update-product.handler.js';
import { UpdateProductCommand } from '../../../../src/module/application/commands/product/update-product.command.js';
import { DeleteProductHandler } from '../../../../src/module/application/commands/product/delete-product.handler.js';
import { DeleteProductCommand } from '../../../../src/module/application/commands/product/delete-product.command.js';
import { PublishProductHandler } from '../../../../src/module/application/commands/product/publish-product.handler.js';
import { PublishProductCommand } from '../../../../src/module/application/commands/product/publish-product.command.js';
import { UnpublishProductHandler } from '../../../../src/module/application/commands/product/unpublish-product.handler.js';
import { UnpublishProductCommand } from '../../../../src/module/application/commands/product/unpublish-product.command.js';
import { ArchiveProductHandler } from '../../../../src/module/application/commands/product/archive-product.handler.js';
import { ArchiveProductCommand } from '../../../../src/module/application/commands/product/archive-product.command.js';
import { FeatureProductHandler } from '../../../../src/module/application/commands/product/feature-product.handler.js';
import { FeatureProductCommand } from '../../../../src/module/application/commands/product/feature-product.command.js';
import { DuplicateProductHandler } from '../../../../src/module/application/commands/product/duplicate-product.handler.js';
import { DuplicateProductCommand } from '../../../../src/module/application/commands/product/duplicate-product.command.js';
import {
  createMockProductService,
  type MockedProductService,
} from '../../../mocks/services.js';
import { mockProductResponse } from '../../../mocks/responses.js';
import { PRODUCT_ID, USER_ID } from '../../../helpers.js';
import { PRODUCT_TYPE, PRODUCT_STATUS } from '@vubon/shared-constants/business/product';
import { CATEGORY_ID } from '../../../helpers.js';

describe('Product Command Handlers', () => {
  let service: MockedProductService;

  beforeEach(() => {
    service = createMockProductService();
    service.create.mockResolvedValue(mockProductResponse());
    service.update.mockResolvedValue(mockProductResponse());
    service.publish.mockResolvedValue(mockProductResponse());
    service.unpublish.mockResolvedValue(mockProductResponse());
    service.archive.mockResolvedValue(mockProductResponse());
    service.softDelete.mockResolvedValue(undefined);
    service.feature.mockResolvedValue(mockProductResponse());
    service.unfeature.mockResolvedValue(mockProductResponse());
    service.duplicate.mockResolvedValue(mockProductResponse());
  });

  describe('CreateProductHandler', () => {
    it('should call service.create with dto and actorId', async () => {
      const handler = new CreateProductHandler(service);
      const dto = {
        name: 'Test',
        slug: 'test',
        sku: 'TEST-1',
        type: PRODUCT_TYPE.PHYSICAL,
        categoryId: CATEGORY_ID,
        currency: 'BDT',
        price: 1000,
      };

      const result = await handler.execute(new CreateProductCommand(dto as never, USER_ID));

      expect(service.create).toHaveBeenCalledWith(dto, USER_ID);
      expect(result).toEqual(mockProductResponse());
    });
  });

  describe('UpdateProductHandler', () => {
    it('should call service.update with productId, dto, actorId', async () => {
      const handler = new UpdateProductHandler(service);
      const dto = { name: 'Updated' };

      await handler.execute(new UpdateProductCommand(PRODUCT_ID, dto as never, USER_ID));

      expect(service.update).toHaveBeenCalledWith(PRODUCT_ID, dto, USER_ID);
    });
  });

  describe('DeleteProductHandler', () => {
    it('should call service.softDelete', async () => {
      const handler = new DeleteProductHandler(service);
      await handler.execute(new DeleteProductCommand(PRODUCT_ID, USER_ID));
      expect(service.softDelete).toHaveBeenCalledWith(PRODUCT_ID, USER_ID);
    });
  });

  describe('PublishProductHandler', () => {
    it('should call service.publish', async () => {
      const handler = new PublishProductHandler(service);
      await handler.execute(new PublishProductCommand(PRODUCT_ID, USER_ID));
      expect(service.publish).toHaveBeenCalledWith(PRODUCT_ID, USER_ID);
    });
  });

  describe('UnpublishProductHandler', () => {
    it('should call service.unpublish with reason', async () => {
      const handler = new UnpublishProductHandler(service);
      await handler.execute(new UnpublishProductCommand(PRODUCT_ID, USER_ID, 'testing'));
      expect(service.unpublish).toHaveBeenCalledWith(PRODUCT_ID, USER_ID, 'testing');
    });

    it('should accept undefined reason', async () => {
      const handler = new UnpublishProductHandler(service);
      await handler.execute(new UnpublishProductCommand(PRODUCT_ID, USER_ID));
      expect(service.unpublish).toHaveBeenCalledWith(PRODUCT_ID, USER_ID, undefined);
    });
  });

  describe('ArchiveProductHandler', () => {
    it('should call service.archive', async () => {
      const handler = new ArchiveProductHandler(service);
      await handler.execute(new ArchiveProductCommand(PRODUCT_ID, USER_ID));
      expect(service.archive).toHaveBeenCalledWith(PRODUCT_ID, USER_ID);
    });
  });

  describe('FeatureProductHandler', () => {
    it('should call feature when featured=true', async () => {
      const handler = new FeatureProductHandler(service);
      await handler.execute(new FeatureProductCommand(PRODUCT_ID, USER_ID, true));
      expect(service.feature).toHaveBeenCalledWith(PRODUCT_ID, USER_ID);
      expect(service.unfeature).not.toHaveBeenCalled();
    });

    it('should call unfeature when featured=false', async () => {
      const handler = new FeatureProductHandler(service);
      await handler.execute(new FeatureProductCommand(PRODUCT_ID, USER_ID, false));
      expect(service.unfeature).toHaveBeenCalledWith(PRODUCT_ID, USER_ID);
      expect(service.feature).not.toHaveBeenCalled();
    });
  });

  describe('DuplicateProductHandler', () => {
    it('should call service.duplicate with newName', async () => {
      const handler = new DuplicateProductHandler(service);
      await handler.execute(new DuplicateProductCommand(PRODUCT_ID, 'Copy', USER_ID));
      expect(service.duplicate).toHaveBeenCalledWith(PRODUCT_ID, 'Copy', USER_ID);
    });
  });

  void PRODUCT_STATUS;
});
