import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RejectCancelHandler } from '@application/commands/cancel/reject-cancel.handler.js';
import { RejectCancelCommand } from '@application/commands/cancel/reject-cancel.command.js';
import type { IOrderCancelService } from '@application/services/interfaces/order-cancel.service.interface.js';
import { makeCancelEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CancelMapper } from '@application/mappers/cancel.mapper.js';

describe('RejectCancelHandler', () => {
  let handler: RejectCancelHandler;
  let service: jest.Mocked<IOrderCancelService>;
  beforeEach(() => {
    service = { reject: jest.fn() } as unknown as jest.Mocked<IOrderCancelService>;
    handler = new RejectCancelHandler(service);
  });
  it('delegates to service.reject', async () => {
    const dto = { cancelId: FIXTURE_ID, orderId: FIXTURE_ID, reason: 'not eligible' } as never;
    service.reject.mockResolvedValue(CancelMapper.toResponse(makeCancelEntityStub()));
    await handler.execute(new RejectCancelCommand(dto, 'admin'));
    expect(service.reject).toHaveBeenCalledWith(dto, 'admin');
  });
});
