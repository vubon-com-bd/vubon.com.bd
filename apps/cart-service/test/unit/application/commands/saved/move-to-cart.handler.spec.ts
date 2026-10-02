import { jest } from '@jest/globals';

import { MoveToCartHandler } from '../../../../../src/module/application/commands/saved/move-to-cart.handler.js';
import { MoveToCartCommand } from '../../../../../src/module/application/commands/saved/move-to-cart.command.js';
import type { ISavedForLaterService } from '../../../../../src/module/application/services/interfaces/saved-for-later.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';

function makeService(): jest.Mocked<ISavedForLaterService> {
  return { save: jest.fn(), moveToCart: jest.fn(), remove: jest.fn(), listByUser: jest.fn() };
}

describe('MoveToCartHandler', () => {
  it('delegates to service.moveToCart', async () => {
    const service = makeService();
    const handler = new MoveToCartHandler(service);
    service.moveToCart.mockResolvedValue();
    const dto = { savedItemId: UUID, cartId: UUID, userId: USER };
    await handler.execute(new MoveToCartCommand(dto));
    expect(service.moveToCart).toHaveBeenCalledWith(dto);
  });
});
