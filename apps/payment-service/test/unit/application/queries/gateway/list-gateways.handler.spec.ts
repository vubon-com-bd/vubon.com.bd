import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { ListGatewaysHandler } from '@application/queries/gateway/list-gateways.handler';
import { ListGatewaysQuery } from '@application/queries/gateway/list-gateways.query';
import type { IPaymentGatewayService } from '@application/services/interfaces/payment-gateway.service.interface';

function makeMockService(): IPaymentGatewayService {
  return {
    getByProvider: jest.fn(), listAvailable: jest.fn(), listByCurrency: jest.fn(),
    list: jest.fn(), getHealth: jest.fn(),
  };
}

describe('ListGatewaysHandler', () => {
  let handler: ListGatewaysHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ListGatewaysHandler(service);
  });

  it('should delegate to service.list', async () => {
    (service.list as jest.Mock).mockResolvedValue({ items: [], total: 0 });
    const query = new ListGatewaysQuery(1, 10, { isActive: true });
    await handler.execute(query);
    expect(service.list).toHaveBeenCalledWith({
      page: 1, limit: 10, filter: { isActive: true },
    });
  });

  it('should have correct type', () => {
    expect(new ListGatewaysQuery(1, 10).type).toBe('payment.gateway.list');
  });
});
