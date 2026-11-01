/**
 * RefundController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { RefundController } from '@interfaces/controllers/rest/refund.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('RefundController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: RefundController;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'r1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new RefundController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('request dispatches RequestRefundCommand', async () => {
    await controller.request('p1', { amount: 100 }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('approve dispatches ApproveRefundCommand', async () => {
    await controller.approve('r1', { approvedAmount: 100 }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('reject dispatches RejectRefundCommand', async () => {
    await controller.reject('r1', { reason: 'not eligible' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('partial dispatches PartialRefundCommand', async () => {
    await controller.partial(
      { paymentId: 'p1', amount: 50, currency: 'BDT', reason: 'damaged' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list dispatches ListRefundsQuery', async () => {
    await controller.list({ page: 1, limit: 20 });
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('getById dispatches GetRefundQuery', async () => {
    await controller.getById('r1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});
