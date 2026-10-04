import { jest } from '@jest/globals';

import { ProceedToCheckoutHandler } from '../../../../../src/module/application/commands/checkout/proceed-to-checkout.handler.js';
import { ProceedToCheckoutCommand } from '../../../../../src/module/application/commands/checkout/proceed-to-checkout.command.js';
import type { ICartService } from '../../../../../src/module/application/services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartService> {
  return {
    create: jest.fn(), update: jest.fn(), clear: jest.fn(), delete: jest.fn(),
    getById: jest.fn(), getByUserId: jest.fn(), getSummary: jest.fn(), recalculateTotals: jest.fn(),
  };
}

describe('ProceedToCheckoutHandler', () => {
  it('calls service.getById', async () => {
    const service = makeService();
    const handler = new ProceedToCheckoutHandler(service);
    service.getById.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const cmd = new ProceedToCheckoutCommand({ cartId: UUID });
    const r = await handler.execute(cmd);
    expect(service.getById).toHaveBeenCalledWith(UUID);
    expect(r.id).toBe(UUID);
  });

  it('propagates errors', async () => {
    const service = makeService();
    const handler = new ProceedToCheckoutHandler(service);
    service.getById.mockRejectedValue(new Error('cart not found'));
    await expect(
      handler.execute(new ProceedToCheckoutCommand({ cartId: UUID })),
    ).rejects.toThrow('cart not found');
  });
});
