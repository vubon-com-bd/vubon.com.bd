import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListSavedHandler } from '../../../../src/module/application/queries/saved/list-saved.handler.js';
import { ListSavedQuery } from '../../../../src/module/application/queries/saved/list-saved.query.js';
import type { ISavedForLaterService } from '../../../../src/module/application/services/interfaces/saved-for-later.service.interface.js';

const USER_ID = '123e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ISavedForLaterService> {
  return {
    save: jest.fn(), moveToCart: jest.fn(), remove: jest.fn(),
    getById: jest.fn(), getPublicById: jest.fn(),
    listByUser: jest.fn(), list: jest.fn(),
  } as unknown as jest.Mocked<ISavedForLaterService>;
}

describe('Saved Query Handlers', () => {
  let service: jest.Mocked<ISavedForLaterService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('ListSavedHandler', () => {
    it('should return paginated saved items', async () => {
      service.list.mockResolvedValue({
        items: [], total: 0, page: 1, limit: 10, totalPages: 0,
      });

      const handler = new ListSavedHandler(service);
      const query = new ListSavedQuery({ page: 1, limit: 10, filter: { userId: USER_ID } });
      const result = await handler.execute(query);

      expect(result.total).toBe(0);
      expect(service.list).toHaveBeenCalledWith({
        page: 1, limit: 10, filter: { userId: USER_ID },
      });
    });

    it('should have correct type', () => {
      const query = new ListSavedQuery({ page: 1, limit: 10 });
      expect(query.type).toBe('cart.saved.list');
    });
  });
});
