/**
 * Attribute Query Handlers — unit tests
 */
import { jest } from '@jest/globals';
import { ListAttributesByProductHandler } from '../../../../src/module/application/queries/attribute/list-attributes-by-product.handler.js';
import { ListAttributesByProductQuery } from '../../../../src/module/application/queries/attribute/list-attributes-by-product.query.js';
import {
  createMockAttributeService,
  type MockedAttributeService,
} from '../../../mocks/services.js';
import { PRODUCT_ID } from '../../../helpers.js';

describe('Attribute Query Handlers', () => {
  let service: MockedAttributeService;

  beforeEach(() => {
    service = createMockAttributeService();
    service.listByProduct.mockResolvedValue([]);
  });

  describe('ListAttributesByProductHandler', () => {
    it('should call service.listByProduct', async () => {
      const handler = new ListAttributesByProductHandler(service);

      const result = await handler.execute(new ListAttributesByProductQuery(PRODUCT_ID));

      expect(service.listByProduct).toHaveBeenCalledWith(PRODUCT_ID);
      expect(result).toEqual([]);
    });
  });
});
