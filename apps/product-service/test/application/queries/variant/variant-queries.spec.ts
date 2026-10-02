/**
 * Variant Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { ListVariantsByProductHandler } from '../../../../src/module/application/queries/variant/list-variants-by-product.handler.js';
import { ListVariantsByProductQuery } from '../../../../src/module/application/queries/variant/list-variants-by-product.query.js';
import { createMockVariantService, type MockedVariantService } from '../../../mocks/services.js';
import { PRODUCT_ID } from '../../../helpers.js';

describe('Variant Query Handlers', () => {
  let service: MockedVariantService;

  beforeEach(() => {
    service = createMockVariantService();
    service.listByProduct.mockResolvedValue([]);
  });

  describe('ListVariantsByProductHandler', () => {
    it('should call service.listByProduct', async () => {
      const handler = new ListVariantsByProductHandler(service);

      const result = await handler.execute(new ListVariantsByProductQuery(PRODUCT_ID));

      expect(service.listByProduct).toHaveBeenCalledWith(PRODUCT_ID);
      expect(result).toEqual([]);
    });
  });
});
