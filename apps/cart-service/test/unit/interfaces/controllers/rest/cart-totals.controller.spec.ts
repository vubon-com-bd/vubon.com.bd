import { jest } from '@jest/globals';

import { CartTotalsController } from '../../../../../src/module/interfaces/controllers/rest/cart-totals.controller.js';
import type { QueryBus } from '@nestjs/cqrs';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('CartTotalsController', () => {
  it('get() dispatches GetTotalsQuery', async () => {
    const qry = { execute: jest.fn() } as unknown as jest.Mocked<QueryBus>;
    const ctrl = new CartTotalsController(qry);
    qry.execute.mockResolvedValue({ grandTotal: 500 } as never);
    await ctrl.get(UUID);
    expect(qry.execute).toHaveBeenCalled();
  });
});
