import { jest } from '@jest/globals';
import { ProductMediaController } from '../../../src/module/interfaces/controllers/rest/product-media.controller.js';
import { ListMediaByProductQuery } from '../../../src/module/application/queries/media/list-media-by-product.query.js';
import { createMockCommandBus, createMockQueryBus, type MockedCommandBus, type MockedQueryBus } from '../../mocks/buses.js';
import { PRODUCT_ID } from '../../helpers.js';

describe('ProductMediaController', () => {
  let controller: ProductMediaController;
  let commandBus: MockedCommandBus;
  let queryBus: MockedQueryBus;

  beforeEach(() => {
    commandBus = createMockCommandBus();
    queryBus = createMockQueryBus();
    controller = new ProductMediaController(commandBus, queryBus);
  });

  it('listByProduct should dispatch ListMediaByProductQuery', async () => {
    queryBus.execute.mockResolvedValueOnce([]);
    const result = await controller.listByProduct(PRODUCT_ID);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListMediaByProductQuery));
    expect(result).toEqual([]);
  });

  it('add should throw placeholder error (uses MediaService directly)', async () => {
    await expect(
      controller.add({} as never, {} as never),
    ).rejects.toThrow(/MediaService directly/);
  });

  it('remove should throw placeholder error', async () => {
    await expect(
      controller.remove('media-1', {} as never),
    ).rejects.toThrow(/MediaService directly/);
  });
});
