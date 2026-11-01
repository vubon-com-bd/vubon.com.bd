import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ApproveCancelHandler } from '@application/commands/cancel/approve-cancel.handler.js';
import { ApproveCancelCommand } from '@application/commands/cancel/approve-cancel.command.js';
import type { IOrderCancelService } from '@application/services/interfaces/order-cancel.service.interface.js';
import { makeCancelEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CancelMapper } from '@application/mappers/cancel.mapper.js';

describe('ApproveCancelHandler', () => {
  let handler: ApproveCancelHandler;
  let service: jest.Mocked<IOrderCancelService>;
  beforeEach(() => {
    service = { approve: jest.fn() } as unknown as jest.Mocked<IOrderCancelService>;
    handler = new ApproveCancelHandler(service);
  });
  it('delegates to service.approve', async () => {
    const dto = { cancelId: FIXTURE_ID, orderId: FIXTURE_ID } as never;
    service.approve.mockResolvedValue(CancelMapper.toResponse(makeCancelEntityStub()));
    await handler.execute(new ApproveCancelCommand(dto, 'admin'));
    expect(service.approve).toHaveBeenCalledWith(dto, 'admin');
  });
});
