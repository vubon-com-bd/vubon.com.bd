import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetGatewayHealthHandler } from '@application/queries/gateway/get-gateway-health.handler';
import { GetGatewayHealthQuery } from '@application/queries/gateway/get-gateway-health.query';
import type { IPaymentGatewayService } from '@application/services/interfaces/payment-gateway.service.interface';

function makeMockService(): IPaymentGatewayService {
  return {
    getByProvider: jest.fn(), listAvailable: jest.fn(), listByCurrency: jest.fn(),
    list: jest.fn(), getHealth: jest.fn(),
  };
}

describe('GetGatewayHealthHandler', () => {
  let handler: GetGatewayHealthHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetGatewayHealthHandler(service);
  });

  it('should delegate to service.getHealth', async () => {
    (service.getHealth as jest.Mock).mockResolvedValue([
      { gateway: 'stripe', status: 'healthy', lastChecked: '2025-01-15T10:00:00.000Z' },
    ]);
    const result = await handler.execute(new GetGatewayHealthQuery());
    expect(result).toHaveLength(1);
    expect(result[0]?.gateway).toBe('stripe');
  });

  it('should have correct type', () => {
    expect(new GetGatewayHealthQuery().type).toBe('payment.gateway.health');
  });
});
