import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RequestReturnHandler } from '@application/commands/return/request-return.handler.js';
import { RequestReturnCommand } from '@application/commands/return/request-return.command.js';
import type { IOrderReturnService } from '@application/services/interfaces/order-return.service.interface.js';
import { makeReturnEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { ReturnMapper } from '@application/mappers/return.mapper.js';

describe('RequestReturnHandler', () => {
  let handler: RequestReturnHandler;
  let service: jest.Mocked<IOrderReturnService>;
  beforeEach(() => {
    service = { request: jest.fn() } as unknown as jest.Mocked<IOrderReturnService>;
    handler = new RequestReturnHandler(service);
  });
  it('delegates to service.request', async () => {
    const dto = { orderId: FIXTURE_ID, reason: 'defective', itemIds: [FIXTURE_ID] } as never;
    service.request.mockResolvedValue(ReturnMapper.toResponse(makeReturnEntityStub()));
    await handler.execute(new RequestReturnCommand(dto, 'admin'));
    expect(service.request).toHaveBeenCalledWith(dto, 'admin');
  });
});
