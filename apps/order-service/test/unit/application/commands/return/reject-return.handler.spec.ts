import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RejectReturnHandler } from '@application/commands/return/reject-return.handler.js';
import { RejectReturnCommand } from '@application/commands/return/reject-return.command.js';
import type { IOrderReturnService } from '@application/services/interfaces/order-return.service.interface.js';
import { makeReturnEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { ReturnMapper } from '@application/mappers/return.mapper.js';

describe('RejectReturnHandler', () => {
  let handler: RejectReturnHandler;
  let service: jest.Mocked<IOrderReturnService>;
  beforeEach(() => {
    service = { reject: jest.fn() } as unknown as jest.Mocked<IOrderReturnService>;
    handler = new RejectReturnHandler(service);
  });
  it('delegates to service.reject', async () => {
    const dto = { returnId: FIXTURE_ID, orderId: FIXTURE_ID, reason: 'not eligible' } as never;
    service.reject.mockResolvedValue(ReturnMapper.toResponse(makeReturnEntityStub()));
    await handler.execute(new RejectReturnCommand(dto, 'admin'));
    expect(service.reject).toHaveBeenCalledWith(dto, 'admin');
  });
});
