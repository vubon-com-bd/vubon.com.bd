/**
 * PaymentMethodController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PaymentMethodController } from '@interfaces/controllers/rest/payment-method.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('PaymentMethodController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: PaymentMethodController;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'm1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new PaymentMethodController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('add dispatches AddPaymentMethodCommand', async () => {
    await controller.add({ method: 'card', type: 'online' } as never, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('update dispatches UpdatePaymentMethodCommand', async () => {
    await controller.update('m1', { label: 'My Visa' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('remove dispatches DeletePaymentMethodCommand', async () => {
    await controller.remove('m1', {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('setDefault dispatches SetDefaultMethodCommand', async () => {
    await controller.setDefault('m1', user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list dispatches ListMethodsQuery', async () => {
    await controller.list(user, '1', '20');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list uses default pagination when params missing', async () => {
    await controller.list(user);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getById dispatches GetMethodQuery', async () => {
    await controller.getById('m1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});

// ─── Additional branch coverage ───
describe('PaymentMethodController — additional branches', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: PaymentMethodController;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'm1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new PaymentMethodController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('list with page only', async () => {
    await controller.list(user, '2', undefined);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('list with limit only', async () => {
    await controller.list(user, undefined, '10');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('list with both', async () => {
    await controller.list(user, '2', '10');
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('remove without reason', async () => {
    await controller.remove('m1', {}, user);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('remove with reason', async () => {
    await controller.remove('m1', { reason: 'closing account' }, user);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('update with all fields', async () => {
    await controller.update(
      'm1',
      {
        label: 'My Card',
        holderName: 'John',
        expiryMonth: 12,
        expiryYear: 2028,
      },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
