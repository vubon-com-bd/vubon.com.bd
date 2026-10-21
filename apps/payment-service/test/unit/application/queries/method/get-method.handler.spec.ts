import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetMethodHandler } from '@application/queries/method/get-method.handler';
import { GetMethodQuery } from '@application/queries/method/get-method.query';
import type { IPaymentMethodService } from '@application/services/interfaces/payment-method.service.interface';

const METHOD_ID = '523e4567-e89b-42d3-a456-426614174004';

function makeMockService(): IPaymentMethodService {
  return {
    add: jest.fn(), update: jest.fn(), remove: jest.fn(), setDefault: jest.fn(),
    getById: jest.fn(), listByUser: jest.fn(),
  };
}

describe('GetMethodHandler', () => {
  let handler: GetMethodHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetMethodHandler(service);
  });

  it('should delegate to service.getById', async () => {
    (service.getById as jest.Mock).mockResolvedValue({ id: METHOD_ID });
    const query = new GetMethodQuery(METHOD_ID);
    const result = await handler.execute(query);
    expect(result).toEqual({ id: METHOD_ID });
    expect(service.getById).toHaveBeenCalledWith(METHOD_ID);
  });

  it('should have correct type', () => {
    expect(new GetMethodQuery(METHOD_ID).type).toBe('payment.method.get');
  });
});
