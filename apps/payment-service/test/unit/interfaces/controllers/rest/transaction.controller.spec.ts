/**
 * TransactionController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { TransactionController } from '@interfaces/controllers/rest/transaction.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('TransactionController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: TransactionController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 't1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new TransactionController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('create dispatches CreateTransactionCommand', async () => {
    await controller.create({
      paymentId: 'p1',
      type: 'payment',
      amount: 100,
      currency: 'BDT',
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('reverse dispatches ReverseTransactionCommand', async () => {
    await controller.reverse('t1', { reason: 'duplicate' });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list dispatches ListTransactionsQuery', async () => {
    await controller.list('p1', '1', '20');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list handles missing params', async () => {
    await controller.list();
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getById dispatches GetTransactionQuery', async () => {
    await controller.getById('t1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});
