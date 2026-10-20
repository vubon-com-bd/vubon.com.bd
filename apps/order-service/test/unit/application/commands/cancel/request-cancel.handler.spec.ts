import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RequestCancelHandler } from '@application/commands/cancel/request-cancel.handler.js';
import { RequestCancelCommand } from '@application/commands/cancel/request-cancel.command.js';
import type { IOrderCancelService } from '@application/services/interfaces/order-cancel.service.interface.js';
import { makeCancelEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CancelMapper } from '@application/mappers/cancel.mapper.js';

describe('RequestCancelHandler', () => {
  let handler: RequestCancelHandler;
  let service: jest.Mocked<IOrderCancelService>;
  beforeEach(() => {
    service = { request: jest.fn() } as unknown as jest.Mocked<IOrderCancelService>;
    handler = new RequestCancelHandler(service);
  });
  it('delegates to service.request', async () => {
    const dto = { orderId: FIXTURE_ID, reason: 'customer_request' } as never;
    service.request.mockResolvedValue(CancelMapper.toResponse(makeCancelEntityStub()));
    await handler.execute(new RequestCancelCommand(dto, 'admin'));
    expect(service.request).toHaveBeenCalledWith(dto, 'admin');
  });
});
