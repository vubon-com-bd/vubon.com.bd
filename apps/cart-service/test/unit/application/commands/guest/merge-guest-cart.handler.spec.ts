import { jest } from '@jest/globals';

import { MergeGuestCartHandler } from '../../../../../src/module/application/commands/guest/merge-guest-cart.handler.js';
import { MergeGuestCartCommand } from '../../../../../src/module/application/commands/guest/merge-guest-cart.command.js';
import type { ICartMergerService } from '../../../../../src/module/application/services/interfaces/cart-merger.service.interface.js';
import type { MergeResponseDTO } from '../../../../../src/module/application/dtos/responses/merge-response.dto.js';

const TOKEN = 'a'.repeat(32);
const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';

function makeService(): jest.Mocked<ICartMergerService> {
  return { mergeGuestCart: jest.fn(), getById: jest.fn() };
}

describe('MergeGuestCartHandler', () => {
  it('delegates to service.mergeGuestCart', async () => {
    const service = makeService();
    const handler = new MergeGuestCartHandler(service);
    service.mergeGuestCart.mockResolvedValue({ mergerId: 'm-1' } as MergeResponseDTO);
    const dto = { guestToken: TOKEN, targetCartId: UUID, userId: USER };
    const r = await handler.execute(new MergeGuestCartCommand(dto));
    expect(service.mergeGuestCart).toHaveBeenCalledWith(dto);
    expect(r.mergerId).toBe('m-1');
  });
});
