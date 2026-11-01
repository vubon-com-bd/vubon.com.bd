import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ApproveReturnHandler } from '@application/commands/return/approve-return.handler.js';
import { ApproveReturnCommand } from '@application/commands/return/approve-return.command.js';
import type { IOrderReturnService } from '@application/services/interfaces/order-return.service.interface.js';
import { makeReturnEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { ReturnMapper } from '@application/mappers/return.mapper.js';

describe('ApproveReturnHandler', () => {
  let handler: ApproveReturnHandler;
  let service: jest.Mocked<IOrderReturnService>;
  beforeEach(() => {
    service = { approve: jest.fn() } as unknown as jest.Mocked<IOrderReturnService>;
    handler = new ApproveReturnHandler(service);
  });
  it('delegates to service.approve', async () => {
    const dto = { returnId: FIXTURE_ID, orderId: FIXTURE_ID } as never;
    service.approve.mockResolvedValue(ReturnMapper.toResponse(makeReturnEntityStub()));
    await handler.execute(new ApproveReturnCommand(dto, 'admin'));
    expect(service.approve).toHaveBeenCalledWith(dto, 'admin');
  });
});
