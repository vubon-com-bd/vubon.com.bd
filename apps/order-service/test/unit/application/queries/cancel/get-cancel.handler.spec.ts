import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetCancelHandler } from '@application/queries/cancel/get-cancel.handler.js';
import { GetCancelQuery } from '@application/queries/cancel/get-cancel.query.js';
import type { IOrderCancelService } from '@application/services/interfaces/order-cancel.service.interface.js';
import { makeCancelEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { CancelMapper } from '@application/mappers/cancel.mapper.js';

describe('GetCancelHandler', () => {
  let handler: GetCancelHandler;
  let service: jest.Mocked<IOrderCancelService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<IOrderCancelService>;
    handler = new GetCancelHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(CancelMapper.toResponse(makeCancelEntityStub()));
    await handler.execute(new GetCancelQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
