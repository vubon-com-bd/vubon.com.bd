import { jest } from '@jest/globals';

import { ApplyVoucherHandler } from '../../../../../src/module/application/commands/voucher/apply-voucher.handler.js';
import { ApplyVoucherCommand } from '../../../../../src/module/application/commands/voucher/apply-voucher.command.js';
import type { ICartVoucherService } from '../../../../../src/module/application/services/interfaces/cart-voucher.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartVoucherService> {
  return { apply: jest.fn(), remove: jest.fn() };
}

describe('ApplyVoucherHandler', () => {
  it('delegates to service.apply', async () => {
    const service = makeService();
    const handler = new ApplyVoucherHandler(service);
    service.apply.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = { cartId: UUID, code: 'GC-ABCD1234' };
    await handler.execute(new ApplyVoucherCommand(dto));
    expect(service.apply).toHaveBeenCalledWith(dto);
  });
});
