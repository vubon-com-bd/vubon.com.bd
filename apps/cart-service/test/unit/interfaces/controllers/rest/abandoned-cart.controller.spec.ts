import { jest } from '@jest/globals';

import { AbandonedCartController } from '../../../../../src/module/interfaces/controllers/rest/abandoned-cart.controller.js';
import type { QueryBus } from '@nestjs/cqrs';

describe('AbandonedCartController', () => {
  let qry: jest.Mocked<QueryBus>;
  let ctrl: AbandonedCartController;

  beforeEach(() => {
    qry = { execute: jest.fn() } as unknown as jest.Mocked<QueryBus>;
    ctrl = new AbandonedCartController(qry);
  });

  it('list() dispatches ListAbandonedQuery', async () => {
    qry.execute.mockResolvedValue([]);
    await ctrl.list(1, 20);
    expect(qry.execute).toHaveBeenCalled();
  });

  it('stats() dispatches GetAbandonedStatsQuery', async () => {
    qry.execute.mockResolvedValue({ total: 10 } as never);
    await ctrl.stats();
    expect(qry.execute).toHaveBeenCalled();
  });
});
