import { jest } from '@jest/globals';
import { ProductCollectionController } from '../../../src/module/interfaces/controllers/rest/product-collection.controller.js';
import { CreateCollectionCommand } from '../../../src/module/application/commands/collection/create-collection.command.js';
import { UpdateCollectionCommand } from '../../../src/module/application/commands/collection/update-collection.command.js';
import { DeleteCollectionCommand } from '../../../src/module/application/commands/collection/delete-collection.command.js';
import { AddProductToCollectionCommand } from '../../../src/module/application/commands/collection/add-product-to-collection.command.js';
import { RemoveProductFromCollectionCommand } from '../../../src/module/application/commands/collection/remove-product-from-collection.command.js';
import { ListFeaturedCollectionsQuery } from '../../../src/module/application/queries/collection/list-featured-collections.query.js';
import { ListActiveCollectionsQuery } from '../../../src/module/application/queries/collection/list-active-collections.query.js';
import { GetCollectionQuery } from '../../../src/module/application/queries/collection/get-collection.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { mockAdmin } from '../../mocks/users.js';
import { PRODUCT_ID, USER_ID } from '../../helpers.js';

describe('ProductCollectionController', () => {
  let controller: ProductCollectionController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductCollectionController(commandBus, queryBus);
  });

  it('create should dispatch CreateCollectionCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.create({ name: 'Summer', slug: 'summer', type: 'manual' } as never, mockAdmin() as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(CreateCollectionCommand));
  });

  it('featured should dispatch ListFeaturedCollectionsQuery', async () => {
    queryBus.execute.mockResolvedValueOnce([]);
    await controller.featured(10);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListFeaturedCollectionsQuery));
  });

  it('active should dispatch ListActiveCollectionsQuery', async () => {
    queryBus.execute.mockResolvedValueOnce([]);
    await controller.active();
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListActiveCollectionsQuery));
  });

  it('getById should dispatch GetCollectionQuery', async () => {
    queryBus.execute.mockResolvedValueOnce(null);
    await controller.getById('col-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetCollectionQuery));
  });

  it('update should dispatch UpdateCollectionCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.update('col-1', { name: 'Updated' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateCollectionCommand));
  });

  it('addProduct should dispatch AddProductToCollectionCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.addProduct('col-1', PRODUCT_ID, mockAdmin() as never);
    const cmd = commandBus.execute.mock.calls[0][0] as AddProductToCollectionCommand;
    expect(cmd.collectionId).toBe('col-1');
    expect(cmd.productId).toBe(PRODUCT_ID);
    expect(cmd.actorId).toBe(USER_ID === 'user-11111111-1111-1111-1111-111111111111' ? 'admin-11111111-1111-1111-1111-111111111111' : USER_ID);
  });

  it('removeProduct should dispatch RemoveProductFromCollectionCommand', async () => {
    commandBus.execute.mockResolvedValueOnce({});
    await controller.removeProduct('col-1', PRODUCT_ID, mockAdmin() as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(RemoveProductFromCollectionCommand));
  });

  it('remove should dispatch DeleteCollectionCommand', async () => {
    commandBus.execute.mockResolvedValueOnce(undefined);
    await controller.remove('col-1', mockAdmin() as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteCollectionCommand));
  });
});
