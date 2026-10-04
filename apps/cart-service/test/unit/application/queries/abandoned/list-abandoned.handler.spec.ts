import { jest } from '@jest/globals';

import { ListAbandonedHandler } from '../../../../../src/module/application/queries/abandoned/list-abandoned.handler.js';
import { ListAbandonedQuery } from '../../../../../src/module/application/queries/abandoned/list-abandoned.query.js';
import type { IAbandonedCartService } from '../../../../../src/module/application/services/interfaces/abandoned-cart.service.interface.js';
import type { AbandonedCartResponseDTO } from '../../../../../src/module/application/dtos/responses/abandoned-cart-response.dto.js';

function makeService(): jest.Mocked<IAbandonedCartService> {
  return {
    detect: jest.fn(), sendReminder: jest.fn(), recover: jest.fn(),
    markLost: jest.fn(), listPending: jest.fn(), getStats: jest.fn(),
  };
}

describe('ListAbandonedHandler', () => {
  it('returns paginated abandoned carts', async () => {
    const service = makeService();
    const handler = new ListAbandonedHandler(service);
    service.listPending.mockResolvedValue([
      { id: 'a1' },
    ] as unknown as readonly AbandonedCartResponseDTO[]);
    const r = await handler.execute(new ListAbandonedQuery(1, 20));
    expect(service.listPending).toHaveBeenCalledWith(1, 20);
    expect(r.length).toBe(1);
  });

  it('uses default pagination', async () => {
    const service = makeService();
    const handler = new ListAbandonedHandler(service);
    service.listPending.mockResolvedValue([]);
    await handler.execute(new ListAbandonedQuery());
    expect(service.listPending).toHaveBeenCalledWith(1, 20);
  });
});
