/**
 * PaymentGatewayController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PaymentGatewayController } from '@interfaces/controllers/rest/payment-gateway.controller';
import type { QueryBus } from '@nestjs/cqrs';

describe('PaymentGatewayController', () => {
  let queryBus: { execute: jest.Mock };
  let controller: PaymentGatewayController;

  beforeEach(() => {
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new PaymentGatewayController(queryBus as unknown as QueryBus);
  });

  it('list dispatches ListGatewaysQuery', async () => {
    await controller.list('1', '20');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list uses defaults when params missing', async () => {
    await controller.list();
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('health dispatches GetGatewayHealthQuery', async () => {
    await controller.health();
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});
