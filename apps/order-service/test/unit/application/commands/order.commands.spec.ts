import { jest } from '@jest/globals';
import { CreateOrderHandler } from '../../../../src/module/application/commands/order/create-order.handler.js';
import { UpdateOrderHandler } from '../../../../src/module/application/commands/order/update-order.handler.js';
import { DeleteOrderHandler } from '../../../../src/module/application/commands/order/delete-order.handler.js';
import { ConfirmOrderHandler } from '../../../../src/module/application/commands/order/confirm-order.handler.js';
import { HoldOrderHandler } from '../../../../src/module/application/commands/order/hold-order.handler.js';
import { ReleaseOrderHandler } from '../../../../src/module/application/commands/order/release-order.handler.js';
import { CreateOrderCommand } from '../../../../src/module/application/commands/order/create-order.command.js';
import { UpdateOrderCommand } from '../../../../src/module/application/commands/order/update-order.command.js';
import { DeleteOrderCommand } from '../../../../src/module/application/commands/order/delete-order.command.js';
import { ConfirmOrderCommand } from '../../../../src/module/application/commands/order/confirm-order.command.js';
import { HoldOrderCommand } from '../../../../src/module/application/commands/order/hold-order.command.js';
import { ReleaseOrderCommand } from '../../../../src/module/application/commands/order/release-order.command.js';
import { ORDER_COMMAND_HANDLERS } from '../../../../src/module/application/commands/order/index.js';
import { makeOrder, UUID_ORDER, UUID_CUSTOMER } from '../services/_helpers.js';

function mockService() {
  const order = makeOrder();
  return {
    create: jest.fn().mockResolvedValue(order),
    update: jest.fn().mockResolvedValue(order),
    delete: jest.fn().mockResolvedValue(undefined),
    confirm: jest.fn().mockResolvedValue(order),
    hold: jest.fn().mockResolvedValue(order),
    release: jest.fn().mockResolvedValue(order),
  };
}

describe('Order command handlers', () => {
  let service: ReturnType<typeof mockService>;

  beforeEach(() => { service = mockService(); });

  it('CreateOrderHandler delegates to service.create', async () => {
    const h = new CreateOrderHandler(service as never);
    const cmd = new CreateOrderCommand({ customerId: UUID_CUSTOMER } as never, 'actor-1');
    const result = await h.execute(cmd);
    expect(service.create).toHaveBeenCalledWith(cmd.dto, 'actor-1');
    expect(result.id).toBe(UUID_ORDER);
  });

  it('UpdateOrderHandler delegates', async () => {
    const h = new UpdateOrderHandler(service as never);
    const cmd = new UpdateOrderCommand({ orderId: UUID_ORDER } as never, 'actor-1');
    const result = await h.execute(cmd);
    expect(service.update).toHaveBeenCalledWith(cmd.dto, 'actor-1');
    expect(result.id).toBe(UUID_ORDER);
  });

  it('DeleteOrderHandler delegates', async () => {
    const h = new DeleteOrderHandler(service as never);
    const cmd = new DeleteOrderCommand({ orderId: UUID_ORDER } as never, 'actor-1');
    await h.execute(cmd);
    expect(service.delete).toHaveBeenCalledWith(UUID_ORDER, 'actor-1');
  });

  it('ConfirmOrderHandler delegates', async () => {
    const h = new ConfirmOrderHandler(service as never);
    const cmd = new ConfirmOrderCommand({ orderId: UUID_ORDER } as never);
    await h.execute(cmd);
    expect(service.confirm).toHaveBeenCalled();
  });

  it('HoldOrderHandler delegates', async () => {
    const h = new HoldOrderHandler(service as never);
    const cmd = new HoldOrderCommand({ orderId: UUID_ORDER, reason: 'wait' } as never);
    await h.execute(cmd);
    expect(service.hold).toHaveBeenCalled();
  });

  it('ReleaseOrderHandler delegates', async () => {
    const h = new ReleaseOrderHandler(service as never);
    const cmd = new ReleaseOrderCommand({ orderId: UUID_ORDER } as never);
    await h.execute(cmd);
    expect(service.release).toHaveBeenCalled();
  });

  it('ORDER_COMMAND_HANDLERS exports all 6', () => {
    expect(ORDER_COMMAND_HANDLERS).toHaveLength(6);
  });
});
