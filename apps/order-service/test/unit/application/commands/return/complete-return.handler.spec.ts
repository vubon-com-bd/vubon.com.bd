import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CompleteReturnHandler } from '@application/commands/return/complete-return.handler.js';
import { CompleteReturnCommand } from '@application/commands/return/complete-return.command.js';
import type { IOrderReturnService } from '@application/services/interfaces/order-return.service.interface.js';
import { makeReturnEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { ReturnMapper } from '@application/mappers/return.mapper.js';

describe('CompleteReturnHandler', () => {
  let handler: CompleteReturnHandler;
  let service: jest.Mocked<IOrderReturnService>;
  beforeEach(() => {
    service = { complete: jest.fn() } as unknown as jest.Mocked<IOrderReturnService>;
    handler = new CompleteReturnHandler(service);
  });
  it('delegates to service.complete', async () => {
    const dto = { returnId: FIXTURE_ID, orderId: FIXTURE_ID, refundAmount: 100 } as never;
    service.complete.mockResolvedValue(ReturnMapper.toResponse(makeReturnEntityStub()));
    await handler.execute(new CompleteReturnCommand(dto, 'admin'));
    expect(service.complete).toHaveBeenCalledWith(dto, 'admin');
  });
});
