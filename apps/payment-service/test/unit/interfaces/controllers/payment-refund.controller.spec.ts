import { jest } from '@jest/globals';
import { PaymentController } from '../../../../src/module/interfaces/controllers/rest/payment.controller.js';
import { RefundController } from '../../../../src/module/interfaces/controllers/rest/refund.controller.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = { userId: UUID, roles: ['customer'] };

function mockBuses() {
  return {
    commandBus: { execute: jest.fn(async () => ({ ok: true })) },
    queryBus: { execute: jest.fn(async () => ({ ok: true })) },
  };
}

describe('PaymentController', () => {
  let c: PaymentController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    const m = mockBuses();
    commandBus = m.commandBus;
    queryBus = m.queryBus;
    c = new PaymentController(commandBus as never, queryBus as never);
  });

  it('initiate → InitiatePaymentCommand', async () => {
    await c.initiate(
      { orderId: UUID, method: 'mobile_banking', amount: 1000, currency: 'BDT' },
      USER,
    );
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('list → ListPaymentsQuery', async () => {
    await c.list({});
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('stats → GetPaymentStatsQuery', async () => {
    await c.stats();
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('listByUser → ListPaymentsByUserQuery', async () => {
    await c.listByUser(UUID, {});
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('listByOrder → ListPaymentsByOrderQuery', async () => {
    await c.listByOrder(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getById → GetPaymentQuery', async () => {
    await c.getById(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getDetail → GetPaymentDetailQuery', async () => {
    await c.getDetail(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getPublic → GetPaymentPublicQuery', async () => {
    await c.getPublic(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('verify → VerifyPaymentCommand', async () => {
    await c.verify(UUID, { gatewaySignature: 'sig' }, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('capture → CapturePaymentCommand', async () => {
    await c.capture(UUID, { amount: 1000 }, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('fail → FailPaymentCommand', async () => {
    await c.fail(UUID, { reason: 'x' }, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('cancel → CancelPaymentCommand', async () => {
    await c.cancel(UUID, {}, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('retry → RetryPaymentCommand', async () => {
    await c.retry(UUID, {}, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('chargeback → MarkChargebackCommand', async () => {
    await c.chargeback(UUID, { amount: 1000 }, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('markPaid → MarkPaidCommand', async () => {
    await c.markPaid(UUID, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});

describe('RefundController', () => {
  let c: RefundController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    const m = mockBuses();
    commandBus = m.commandBus;
    queryBus = m.queryBus;
    c = new RefundController(commandBus as never, queryBus as never);
  });

  it('request → RequestRefundCommand', async () => {
    await c.request({ paymentId: UUID, amount: 500 }, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('list → ListRefundsQuery', async () => {
    await c.list({});
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('listByPayment → ListRefundsByPaymentQuery', async () => {
    await c.listByPayment(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getById → GetRefundQuery', async () => {
    await c.getById(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('getPublic → GetRefundPublicQuery', async () => {
    await c.getPublic(UUID);
    expect(queryBus.execute).toHaveBeenCalled();
  });

  it('approve → ApproveRefundCommand', async () => {
    await c.approve(UUID, {}, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('process → ProcessRefundCommand', async () => {
    await c.process(UUID, {}, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('complete → CompleteRefundCommand', async () => {
    await c.complete(UUID, {}, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('fail → FailRefundCommand', async () => {
    await c.fail(UUID, { reason: 'x' }, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('cancel → CancelRefundCommand', async () => {
    await c.cancel(UUID, {}, USER);
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
