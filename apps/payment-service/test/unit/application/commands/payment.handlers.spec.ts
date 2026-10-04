import { jest } from '@jest/globals';
import { InitiatePaymentHandler } from '../../../../src/module/application/commands/payment/initiate-payment.handler.js';
import { CapturePaymentHandler } from '../../../../src/module/application/commands/payment/capture-payment.handler.js';
import { FailPaymentHandler } from '../../../../src/module/application/commands/payment/fail-payment.handler.js';
import { CancelPaymentHandler } from '../../../../src/module/application/commands/payment/cancel-payment.handler.js';
import { RetryPaymentHandler } from '../../../../src/module/application/commands/payment/retry-payment.handler.js';
import { MarkChargebackHandler } from '../../../../src/module/application/commands/payment/mark-chargeback.handler.js';
import { MarkPaidHandler } from '../../../../src/module/application/commands/payment/mark-paid.handler.js';
import { InitiatePaymentCommand } from '../../../../src/module/application/commands/payment/initiate-payment.command.js';
import { CapturePaymentCommand } from '../../../../src/module/application/commands/payment/capture-payment.command.js';
import { FailPaymentCommand } from '../../../../src/module/application/commands/payment/fail-payment.command.js';
import { CancelPaymentCommand } from '../../../../src/module/application/commands/payment/cancel-payment.command.js';
import { RetryPaymentCommand } from '../../../../src/module/application/commands/payment/retry-payment.command.js';
import { MarkChargebackCommand } from '../../../../src/module/application/commands/payment/mark-chargeback.command.js';
import { MarkPaidCommand } from '../../../../src/module/application/commands/payment/mark-paid.command.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function mockService() {
  return {
    initiate: jest.fn(async () => ({ success: true, paymentId: UUID, status: 'pending' })),
    capture: jest.fn(async () => ({ id: UUID, status: 'captured' })),
    fail: jest.fn(async () => ({ id: UUID, status: 'failed' })),
    cancel: jest.fn(async () => ({ id: UUID, status: 'cancelled' })),
    retry: jest.fn(async () => ({ id: UUID, status: 'pending', retryAttempts: 1 })),
    chargeback: jest.fn(async () => ({ id: UUID, status: 'chargeback' })),
    markPaid: jest.fn(async () => ({ id: UUID, status: 'paid' })),
  };
}

describe('Payment command handlers', () => {
  let svc: ReturnType<typeof mockService>;

  beforeEach(() => {
    svc = mockService();
  });

  it('InitiatePaymentHandler → service.initiate', async () => {
    const h = new InitiatePaymentHandler(svc as never);
    const cmd = new InitiatePaymentCommand(
      { orderId: UUID, method: 'mobile_banking', amount: 1000, currency: 'BDT' } as never,
      UUID,
    );
    const out = await h.execute(cmd);
    expect(svc.initiate).toHaveBeenCalled();
    expect(out.success).toBe(true);
  });

  it('CapturePaymentHandler → service.capture', async () => {
    const h = new CapturePaymentHandler(svc as never);
    const out = await h.execute(new CapturePaymentCommand({ paymentId: UUID }));
    expect(svc.capture).toHaveBeenCalled();
    expect(out.status).toBe('captured');
  });

  it('FailPaymentHandler → service.fail', async () => {
    const h = new FailPaymentHandler(svc as never);
    const out = await h.execute(new FailPaymentCommand({ paymentId: UUID, reason: 'x' }));
    expect(svc.fail).toHaveBeenCalled();
    expect(out.status).toBe('failed');
  });

  it('CancelPaymentHandler → service.cancel', async () => {
    const h = new CancelPaymentHandler(svc as never);
    const out = await h.execute(new CancelPaymentCommand({ paymentId: UUID }));
    expect(out.status).toBe('cancelled');
  });

  it('RetryPaymentHandler → service.retry', async () => {
    const h = new RetryPaymentHandler(svc as never);
    const out = await h.execute(new RetryPaymentCommand({ paymentId: UUID }));
    expect(out.status).toBe('pending');
  });

  it('MarkChargebackHandler → service.chargeback', async () => {
    const h = new MarkChargebackHandler(svc as never);
    const out = await h.execute(
      new MarkChargebackCommand({ paymentId: UUID, amount: 1000 }),
    );
    expect(out.status).toBe('chargeback');
  });

  it('MarkPaidHandler → service.markPaid', async () => {
    const h = new MarkPaidHandler(svc as never);
    const out = await h.execute(new MarkPaidCommand(UUID));
    expect(out.status).toBe('paid');
  });
});
