import { jest } from '@jest/globals';

import { SetShippingMethodHandler } from '../../../../../src/module/application/commands/shipping/set-shipping-method.handler.js';
import { SetShippingMethodCommand } from '../../../../../src/module/application/commands/shipping/set-shipping-method.command.js';
import type { ICartShippingService } from '../../../../../src/module/application/services/interfaces/cart-shipping.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartShippingService> {
  return { setMethod: jest.fn(), calculate: jest.fn() };
}

describe('SetShippingMethodHandler', () => {
  it('delegates to service.setMethod', async () => {
    const service = makeService();
    const handler = new SetShippingMethodHandler(service);
    service.setMethod.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = {
      cartId: UUID,
      method: 'standard',
      cost: 100,
      currency: 'BDT',
    };
    await handler.execute(new SetShippingMethodCommand(dto));
    expect(service.setMethod).toHaveBeenCalledWith(dto);
  });
});
