import { jest } from '@jest/globals';

import { CalculateShippingHandler } from '../../../../../src/module/application/commands/shipping/calculate-shipping.handler.js';
import { CalculateShippingCommand } from '../../../../../src/module/application/commands/shipping/calculate-shipping.command.js';
import type { ICartShippingService } from '../../../../../src/module/application/services/interfaces/cart-shipping.service.interface.js';
import type { CartTotalsResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-totals-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartShippingService> {
  return { setMethod: jest.fn(), calculate: jest.fn() };
}

describe('CalculateShippingHandler', () => {
  it('delegates to service.calculate', async () => {
    const service = makeService();
    const handler = new CalculateShippingHandler(service);
    service.calculate.mockResolvedValue({ grandTotal: 300 } as CartTotalsResponseDTO);
    const dto = { cartId: UUID };
    const r = await handler.execute(new CalculateShippingCommand(dto));
    expect(service.calculate).toHaveBeenCalledWith(dto);
    expect(r.grandTotal).toBe(300);
  });
});
