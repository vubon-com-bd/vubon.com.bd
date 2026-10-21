import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetRefundHandler } from '@application/queries/refund/get-refund.handler';
import { GetRefundQuery } from '@application/queries/refund/get-refund.query';
import type { IRefundService } from '@application/services/interfaces/refund.service.interface';

const REFUND_ID = '123e4567-e89b-42d3-a456-426614174000';

function makeMockService(): IRefundService {
  return {
    request: jest.fn(), approve: jest.fn(), reject: jest.fn(), partial: jest.fn(),
    getById: jest.fn(), listByPayment: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetRefundHandler', () => {
  let handler: GetRefundHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetRefundHandler(service);
  });

  it('should delegate to service.getById', async () => {
    (service.getById as jest.Mock).mockResolvedValue({ id: REFUND_ID });
    const result = await handler.execute(new GetRefundQuery(REFUND_ID));
    expect(result).toEqual({ id: REFUND_ID });
    expect(service.getById).toHaveBeenCalledWith(REFUND_ID);
  });

  it('should have correct type', () => {
    expect(new GetRefundQuery(REFUND_ID).type).toBe('payment.refund.get');
  });
});
