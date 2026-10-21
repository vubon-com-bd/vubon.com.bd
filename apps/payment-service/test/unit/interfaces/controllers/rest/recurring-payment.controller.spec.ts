/**
 * RecurringPaymentController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { RecurringPaymentController } from '@interfaces/controllers/rest/recurring-payment.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('RecurringPaymentController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: RecurringPaymentController;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'rec1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new RecurringPaymentController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('create dispatches CreateRecurringCommand', async () => {
    await controller.create(
      {
        paymentId: 'p1',
        amount: 100,
        currency: 'BDT',
        interval: 'monthly',
        intervalCount: 1,
        startAt: '2024-01-01',
      } as never,
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('pause dispatches PauseRecurringCommand', async () => {
    await controller.pause('rec1', user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('cancel dispatches CancelRecurringCommand', async () => {
    await controller.cancel('rec1', { reason: 'no longer needed' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('getById throws NotImplemented', async () => {
    await expect(controller.getById('rec1')).rejects.toThrow();
  });
});
