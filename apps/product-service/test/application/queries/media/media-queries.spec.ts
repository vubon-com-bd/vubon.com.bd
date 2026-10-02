/**
 * Media Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { ListMediaByProductHandler } from '../../../../src/module/application/queries/media/list-media-by-product.handler.js';
import { ListMediaByProductQuery } from '../../../../src/module/application/queries/media/list-media-by-product.query.js';
import { createMockMediaService, type MockedMediaService } from '../../../mocks/services.js';
import { PRODUCT_ID } from '../../../helpers.js';

describe('Media Query Handlers', () => {
  let service: MockedMediaService;

  beforeEach(() => {
    service = createMockMediaService();
    service.listByProduct.mockResolvedValue([]);
  });

  describe('ListMediaByProductHandler', () => {
    it('should call service.listByProduct', async () => {
      const handler = new ListMediaByProductHandler(service);

      const result = await handler.execute(new ListMediaByProductQuery(PRODUCT_ID));

      expect(service.listByProduct).toHaveBeenCalledWith(PRODUCT_ID);
      expect(result).toEqual([]);
    });
  });
});
