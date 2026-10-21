/**
 * SplitPaymentController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SplitPaymentController } from '@interfaces/controllers/rest/split-payment.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('SplitPaymentController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: SplitPaymentController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'sp1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new SplitPaymentController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('create dispatches CreateSplitPaymentCommand', async () => {
    await controller.create({
      paymentId: 'p1',
      type: 'equal',
      totalAmount: 300,
      currency: 'BDT',
      receivers: [
        { receiverId: 'r1' },
        { receiverId: 'r2' },
        { receiverId: 'r3' },
      ],
    });
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('listByPayment returns empty result (stub)', async () => {
    const result = await controller.listByPayment('p1');
    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });
});
