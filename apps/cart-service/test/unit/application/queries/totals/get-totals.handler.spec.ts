import { jest } from '@jest/globals';

import { GetTotalsHandler } from '../../../../../src/module/application/queries/totals/get-totals.handler.js';
import { GetTotalsQuery } from '../../../../../src/module/application/queries/totals/get-totals.query.js';
import type { ICartTaxService } from '../../../../../src/module/application/services/interfaces/cart-tax.service.interface.js';
import type { CartTotalsResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-totals-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartTaxService> {
  return { calculate: jest.fn(), getForCart: jest.fn() };
}

describe('GetTotalsHandler', () => {
  it('delegates to service.getForCart', async () => {
    const service = makeService();
    const handler = new GetTotalsHandler(service);
    service.getForCart.mockResolvedValue({ grandTotal: 500 } as CartTotalsResponseDTO);
    const r = await handler.execute(new GetTotalsQuery(UUID));
    expect(service.getForCart).toHaveBeenCalledWith(UUID);
    expect(r.grandTotal).toBe(500);
  });
});
