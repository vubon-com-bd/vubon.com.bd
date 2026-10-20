/**
 * CreateOrderHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateOrderHandler } from '@application/commands/order/create-order.handler.js';
import { CreateOrderCommand } from '@application/commands/order/create-order.command.js';
import type { IOrderService } from '@application/services/interfaces/order.service.interface.js';
import { FIXTURE_ID } from '@fixtures/application/entity-factories.js';

describe('CreateOrderHandler', () => {
  let handler: CreateOrderHandler;
  let service: jest.Mocked<IOrderService>;

  beforeEach(() => {
    service = { create: jest.fn() } as unknown as jest.Mocked<IOrderService>;
    handler = new CreateOrderHandler(service);
  });

  it('has correct commandType from command class', () => {
    const cmd = new CreateOrderCommand({} as never, FIXTURE_ID);
    expect(cmd.type).toBe('order.order.create');
  });

  it('delegates to service.create with dto and userId', async () => {
    const dto = { customerId: FIXTURE_ID } as never;
    service.create.mockResolvedValue({
      success: true,
      orderId: FIXTURE_ID,
      orderNumber: 'ORD-2024-000123',
      status: 'pending',
    } as never);

    const cmd = new CreateOrderCommand(dto, 'user-1');
    const result = await handler.execute(cmd);

    expect(service.create).toHaveBeenCalledWith(dto, 'user-1');
    expect(result.orderId).toBe(FIXTURE_ID);
  });
});
