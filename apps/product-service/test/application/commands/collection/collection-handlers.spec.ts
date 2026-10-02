/**
 * Collection Command Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { CreateCollectionHandler } from '../../../../src/module/application/commands/collection/create-collection.handler.js';
import { CreateCollectionCommand } from '../../../../src/module/application/commands/collection/create-collection.command.js';
import { UpdateCollectionHandler } from '../../../../src/module/application/commands/collection/update-collection.handler.js';
import { UpdateCollectionCommand } from '../../../../src/module/application/commands/collection/update-collection.command.js';
import { DeleteCollectionHandler } from '../../../../src/module/application/commands/collection/delete-collection.handler.js';
import { DeleteCollectionCommand } from '../../../../src/module/application/commands/collection/delete-collection.command.js';
import { AddProductToCollectionHandler } from '../../../../src/module/application/commands/collection/add-product-to-collection.handler.js';
import { AddProductToCollectionCommand } from '../../../../src/module/application/commands/collection/add-product-to-collection.command.js';
import { RemoveProductFromCollectionHandler } from '../../../../src/module/application/commands/collection/remove-product-from-collection.handler.js';
import { RemoveProductFromCollectionCommand } from '../../../../src/module/application/commands/collection/remove-product-from-collection.command.js';
import { createMockCollectionService, type MockedCollectionService } from '../../../mocks/services.js';
import { USER_ID, PRODUCT_ID, COLLECTION_ID } from '../../../helpers.js';

describe('Collection Command Handlers', () => {
  let service: MockedCollectionService;

  beforeEach(() => {
    service = createMockCollectionService();
    service.create.mockResolvedValue({} as never);
    service.update.mockResolvedValue({} as never);
    service.remove.mockResolvedValue(undefined);
    service.addProduct.mockResolvedValue({} as never);
    service.removeProduct.mockResolvedValue({} as never);
  });

  describe('CreateCollectionHandler', () => {
    it('should call service.create with dto + actorId', async () => {
      const handler = new CreateCollectionHandler(service);
      const dto = { name: 'Summer Sale', slug: 'summer-sale', type: 'manual' };

      await handler.execute(new CreateCollectionCommand(dto as never, USER_ID));

      expect(service.create).toHaveBeenCalledWith(dto, USER_ID);
    });
  });

  describe('UpdateCollectionHandler', () => {
    it('should call service.update with dto', async () => {
      const handler = new UpdateCollectionHandler(service);
      const dto = { collectionId: COLLECTION_ID, name: 'Updated' };

      await handler.execute(new UpdateCollectionCommand(dto as never));

      expect(service.update).toHaveBeenCalledWith(dto);
    });
  });

  describe('DeleteCollectionHandler', () => {
    it('should call service.remove', async () => {
      const handler = new DeleteCollectionHandler(service);

      await handler.execute(new DeleteCollectionCommand(COLLECTION_ID, USER_ID));

      expect(service.remove).toHaveBeenCalledWith(COLLECTION_ID, USER_ID);
    });
  });

  describe('AddProductToCollectionHandler', () => {
    it('should call service.addProduct', async () => {
      const handler = new AddProductToCollectionHandler(service);

      await handler.execute(new AddProductToCollectionCommand(COLLECTION_ID, PRODUCT_ID, USER_ID));

      expect(service.addProduct).toHaveBeenCalledWith(COLLECTION_ID, PRODUCT_ID, USER_ID);
    });
  });

  describe('RemoveProductFromCollectionHandler', () => {
    it('should call service.removeProduct', async () => {
      const handler = new RemoveProductFromCollectionHandler(service);

      await handler.execute(new RemoveProductFromCollectionCommand(COLLECTION_ID, PRODUCT_ID, USER_ID));

      expect(service.removeProduct).toHaveBeenCalledWith(COLLECTION_ID, PRODUCT_ID, USER_ID);
    });
  });
});
