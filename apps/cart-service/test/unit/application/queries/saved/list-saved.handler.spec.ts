import { jest } from '@jest/globals';

import { ListSavedHandler } from '../../../../../src/module/application/queries/saved/list-saved.handler.js';
import { ListSavedQuery } from '../../../../../src/module/application/queries/saved/list-saved.query.js';
import type { ISavedForLaterService } from '../../../../../src/module/application/services/interfaces/saved-for-later.service.interface.js';

const USER = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ISavedForLaterService> {
  return { save: jest.fn(), moveToCart: jest.fn(), remove: jest.fn(), listByUser: jest.fn() };
}

describe('ListSavedHandler', () => {
  it('returns paginated saved items', async () => {
    const service = makeService();
    const handler = new ListSavedHandler(service);
    service.listByUser.mockResolvedValue({
      items: [{ id: 's1' } as never],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
    });
    const r = await handler.execute(new ListSavedQuery(USER, 1, 20));
    expect(service.listByUser).toHaveBeenCalledWith(USER, 1, 20);
    expect(r.total).toBe(1);
  });

  it('uses default pagination when not provided', async () => {
    const service = makeService();
    const handler = new ListSavedHandler(service);
    service.listByUser.mockResolvedValue({
      items: [], total: 0, page: 1, limit: 20, totalPages: 0,
    });
    await handler.execute(new ListSavedQuery(USER));
    expect(service.listByUser).toHaveBeenCalledWith(USER, 1, 20);
  });
});
