/**
 * PaymentController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PaymentController } from '@interfaces/controllers/rest/payment.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('PaymentController', () => {
  let commandBus: { execute: ReturnType<typeof jest.fn> };
  let queryBus: { execute: ReturnType<typeof jest.fn> };
  let controller: PaymentController;

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ success: true, paymentId: 'pay-1' })) };
    queryBus = { execute: jest.fn(async () => ({ id: 'pay-1' })) };
    controller = new PaymentController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  const user = { userId: 'u1', roles: ['customer'] };

  it('initiate dispatches InitiatePaymentCommand', async () => {
    const dto = {
      orderId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
      method: 'card',
      amount: 100,
      currency: 'BDT',
    };
    const result = await controller.initiate(dto as never, user, 'idem-key-12345');
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true, paymentId: 'pay-1' });
  });

  it('confirm dispatches ConfirmPaymentCommand', async () => {
    await controller.confirm('pay-1', { gatewayReference: 'pi_123' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('cancel dispatches CancelPaymentCommand', async () => {
    await controller.cancel('pay-1', { reason: 'customer_request' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('retry dispatches RetryPaymentCommand', async () => {
    await controller.retry('pay-1', {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('verify dispatches VerifyPaymentCommand', async () => {
    await controller.verify('pay-1', {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list dispatches ListPaymentsQuery', async () => {
    await controller.list({ page: 1, limit: 20 });
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('stats dispatches GetPaymentStatsQuery', async () => {
    await controller.stats('u1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('getById dispatches GetPaymentQuery', async () => {
    await controller.getById('pay-1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('getByOrder dispatches GetPaymentByOrderQuery', async () => {
    await controller.getByOrder('ord-1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});

// ─── Additional branch coverage ───
describe('PaymentController — additional branches', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: PaymentController;
  const user = { userId: 'u1', roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ success: true, paymentId: 'p1' })) };
    queryBus = { execute: jest.fn(async () => ({ id: 'p1' })) };
    controller = new PaymentController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('initiate with idempotencyKey (uses header)', async () => {
    const dto = {
      orderId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
      method: 'card',
      amount: 100,
      currency: 'BDT',
    };
    await controller.initiate(dto as never, user, 'idem-key-abc-123');
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('initiate without idempotencyKey (uses undefined)', async () => {
    const dto = {
      orderId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
      method: 'card',
      amount: 100,
      currency: 'BDT',
    };
    await controller.initiate(dto as never, user, undefined);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('cancel without reason (uses default)', async () => {
    await controller.cancel('p1', {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('cancel with custom reason', async () => {
    await controller.cancel('p1', { reason: 'custom reason' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('stats without userId', async () => {
    await controller.stats();
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('stats with userId', async () => {
    await controller.stats('u1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('retry without gateway/reason', async () => {
    await controller.retry('p1', {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('retry with gateway+reason', async () => {
    await controller.retry('p1', { gateway: 'stripe', reason: 'retry' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('verify with gatewaySignature/gatewayData', async () => {
    await controller.verify(
      'p1',
      { gatewaySignature: 'sig', gatewayData: { trxID: 'x' } },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('confirm with all optional fields', async () => {
    await controller.confirm(
      'p1',
      {
        gatewayReference: 'ref',
        gatewaySignature: 'sig',
        gatewayData: { k: 'v' },
        confirmedAmount: 100,
        currency: 'BDT',
      },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
