import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetReturnHandler } from '@application/queries/return/get-return.handler.js';
import { GetReturnQuery } from '@application/queries/return/get-return.query.js';
import type { IOrderReturnService } from '@application/services/interfaces/order-return.service.interface.js';
import { makeReturnEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';
import { ReturnMapper } from '@application/mappers/return.mapper.js';

describe('GetReturnHandler', () => {
  let handler: GetReturnHandler;
  let service: jest.Mocked<IOrderReturnService>;
  beforeEach(() => {
    service = { getById: jest.fn() } as unknown as jest.Mocked<IOrderReturnService>;
    handler = new GetReturnHandler(service);
  });
  it('delegates to service.getById', async () => {
    service.getById.mockResolvedValue(ReturnMapper.toResponse(makeReturnEntityStub()));
    await handler.execute(new GetReturnQuery(FIXTURE_ID));
    expect(service.getById).toHaveBeenCalledWith(FIXTURE_ID);
  });
});
