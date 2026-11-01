/**
 * Payment E2E — full lifecycle (initiate → confirm → refund)
 * @module payment-service/test/e2e/interfaces
 *
 * Runs as a **contract test** — verifies the full Command/Query dispatch
 * surface without HTTP/Nest bootstrap (Termux-safe).
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PaymentController } from '@interfaces/controllers/rest/payment.controller';
import { RefundController } from '@interfaces/controllers/rest/refund.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

const VALID_UUID = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
const ORDER_UUID = 'b1b2c3d4-e5f6-4789-a012-3456789abcde';

describe('Payment Lifecycle E2E', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let paymentCtrl: PaymentController;
  let refundCtrl: RefundController;
  const user = { userId: VALID_UUID, roles: ['customer'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: VALID_UUID, success: true })) };
    queryBus = { execute: jest.fn(async () => ({ id: VALID_UUID })) };
    paymentCtrl = new PaymentController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
    refundCtrl = new RefundController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('SCENARIO: happy path — initiate → confirm → get', async () => {
    // 1. Initiate
    const initiate = await paymentCtrl.initiate(
      {
        orderId: ORDER_UUID,
        method: 'card',
        gateway: 'stripe',
        amount: 1000,
        currency: 'BDT',
      } as never,
      user,
      'idem-key-e2e-abc12345',
    );
    expect(initiate.success).toBe(true);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);

    // 2. Confirm
    await paymentCtrl.confirm(
      VALID_UUID,
      { gatewayReference: 'pi_123', confirmedAmount: 1000, currency: 'BDT' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(2);

    // 3. Query
    await paymentCtrl.getById(VALID_UUID);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: cancel flow', async () => {
    await paymentCtrl.cancel(
      VALID_UUID,
      { reason: 'customer_request' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: retry flow', async () => {
    await paymentCtrl.retry(VALID_UUID, {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: verify flow', async () => {
    await paymentCtrl.verify(
      VALID_UUID,
      { gatewaySignature: 'sig-abc' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: list with filters', async () => {
    await paymentCtrl.list({
      page: 1,
      limit: 20,
      status: 'paid',
      method: 'card',
    });
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: full refund cycle', async () => {
    // 1. Request refund
    await refundCtrl.request(VALID_UUID, { amount: 500 }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);

    // 2. Approve refund
    await refundCtrl.approve(VALID_UUID, {}, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(2);

    // 3. Query refund
    await refundCtrl.getById(VALID_UUID);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: refund rejection flow', async () => {
    await refundCtrl.request(VALID_UUID, { amount: 500 }, user);
    await refundCtrl.reject(
      VALID_UUID,
      { reason: 'window expired' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(2);
  });

  it('SCENARIO: stats retrieval', async () => {
    await paymentCtrl.stats(VALID_UUID);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: get payment by order', async () => {
    await paymentCtrl.getByOrder(ORDER_UUID);
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('SCENARIO: partial refund', async () => {
    await refundCtrl.partial(
      {
        paymentId: VALID_UUID,
        amount: 250,
        currency: 'BDT',
        reason: 'damaged',
      },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });
});
