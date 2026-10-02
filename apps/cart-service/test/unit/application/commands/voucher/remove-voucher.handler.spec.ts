import { jest } from '@jest/globals';

import { RemoveVoucherHandler } from '../../../../../src/module/application/commands/voucher/remove-voucher.handler.js';
import { RemoveVoucherCommand } from '../../../../../src/module/application/commands/voucher/remove-voucher.command.js';
import type { ICartVoucherService } from '../../../../../src/module/application/services/interfaces/cart-voucher.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartVoucherService> {
  return { apply: jest.fn(), remove: jest.fn() };
}

describe('RemoveVoucherHandler', () => {
  it('delegates to service.remove', async () => {
    const service = makeService();
    const handler = new RemoveVoucherHandler(service);
    service.remove.mockResolvedValue({ id: UUID } as CartResponseDTO);
    await handler.execute(new RemoveVoucherCommand({ cartId: UUID }));
    expect(service.remove).toHaveBeenCalled();
  });
});
