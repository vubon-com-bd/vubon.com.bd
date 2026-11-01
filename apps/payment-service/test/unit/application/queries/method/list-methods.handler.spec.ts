import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { ListMethodsHandler } from '@application/queries/method/list-methods.handler';
import { ListMethodsQuery } from '@application/queries/method/list-methods.query';
import type { IPaymentMethodService } from '@application/services/interfaces/payment-method.service.interface';

const USER_ID = '423e4567-e89b-42d3-a456-426614174003';

function makeMockService(): IPaymentMethodService {
  return {
    add: jest.fn(), update: jest.fn(), remove: jest.fn(), setDefault: jest.fn(),
    getById: jest.fn(), listByUser: jest.fn(),
  };
}

describe('ListMethodsHandler', () => {
  let handler: ListMethodsHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ListMethodsHandler(service);
  });

  it('should delegate to service.listByUser', async () => {
    (service.listByUser as jest.Mock).mockResolvedValue({ items: [], total: 0 });
    const query = new ListMethodsQuery(USER_ID, 1, 10, { isActive: true });
    await handler.execute(query);
    expect(service.listByUser).toHaveBeenCalledWith(USER_ID, {
      page: 1, limit: 10, filter: { isActive: true },
    });
  });

  it('should have correct type', () => {
    expect(new ListMethodsQuery(USER_ID, 1, 10).type).toBe('payment.method.list');
  });
});
