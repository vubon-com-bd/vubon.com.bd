import { jest } from '@jest/globals';

import { CreateGuestCartHandler } from '../../../../../src/module/application/commands/guest/create-guest-cart.handler.js';
import { CreateGuestCartCommand } from '../../../../../src/module/application/commands/guest/create-guest-cart.command.js';
import type { IGuestCartService } from '../../../../../src/module/application/services/interfaces/guest-cart.service.interface.js';
import type { GuestCartResponseDTO } from '../../../../../src/module/application/dtos/responses/guest-cart-response.dto.js';

const TOKEN = 'a'.repeat(32);

function makeService(): jest.Mocked<IGuestCartService> {
  return { create: jest.fn(), findByToken: jest.fn(), updateItemCount: jest.fn(), expire: jest.fn() };
}

describe('CreateGuestCartHandler', () => {
  it('delegates to service.create', async () => {
    const service = makeService();
    const handler = new CreateGuestCartHandler(service);
    service.create.mockResolvedValue({ id: 'g-1', token: TOKEN } as GuestCartResponseDTO);
    const dto = { token: TOKEN, currency: 'BDT' };
    const r = await handler.execute(new CreateGuestCartCommand(dto));
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(r.token).toBe(TOKEN);
  });
});
