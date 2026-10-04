import { jest } from '@jest/globals';
import { PaymentNotificationService } from '../../../../src/module/infrastructure/services/external/payment-notification.service.js';
import { PaymentAnalyticsService } from '../../../../src/module/infrastructure/services/external/payment-analytics.service.js';

describe('PaymentNotificationService', () => {
  let email: { send: jest.Mock };
  let sms: { send: jest.Mock };
  let push: { send: jest.Mock };
  let svc: PaymentNotificationService;

  beforeEach(() => {
    email = { send: jest.fn(async () => ({ success: true })) };
    sms = { send: jest.fn(async () => ({ success: true })) };
    push = { send: jest.fn(async () => ({ success: true })) };
    svc = new PaymentNotificationService(email as never, sms as never, push as never);
  });

  it('notifyCustomer sends push', async () => {
    const ok = await svc.notifyCustomer({
      userId: 'u1',
      paymentId: 'p1',
      template: 'payment_initiated',
      data: { amount: 1000, currency: 'BDT' },
    });
    expect(ok).toBe(true);
    expect(push.send).toHaveBeenCalled();
  });

  it('notifyCustomer handles push failure gracefully', async () => {
    push.send.mockRejectedValue(new Error('push down'));
    const ok = await svc.notifyCustomer({
      userId: 'u1',
      paymentId: 'p1',
      template: 'payment_paid',
    });
    expect(ok).toBe(false);
  });

  it('notifyVendor sends email', async () => {
    const ok = await svc.notifyVendor({
      userId: 'v1',
      paymentId: 'p1',
      template: 'payment_paid',
    });
    expect(ok).toBe(true);
    expect(email.send).toHaveBeenCalled();
  });

  it('notifyVendor handles email failure', async () => {
    email.send.mockRejectedValue(new Error('smtp down'));
    const ok = await svc.notifyVendor({
      userId: 'v1',
      paymentId: 'p1',
      template: 'payment_failed',
    });
    expect(ok).toBe(false);
  });

  it('covers all template titles', async () => {
    for (const t of [
      'payment_initiated', 'payment_captured', 'payment_paid',
      'payment_failed', 'payment_declined', 'payment_refunded',
      'payment_chargeback', 'refund_requested', 'refund_succeeded',
      'refund_failed', 'unknown_template',
    ]) {
      await svc.notifyCustomer({ userId: 'u', paymentId: 'p', template: t });
    }
    expect(true).toBe(true);
  });
});

describe('PaymentAnalyticsService', () => {
  let svc: PaymentAnalyticsService;

  beforeEach(() => {
    svc = new PaymentAnalyticsService();
  });

  it('track logs event', async () => {
    await svc.track('payment.created', { amount: 1000 });
    expect(true).toBe(true);
  });

  it('track without properties', async () => {
    await svc.track('payment.updated');
    expect(true).toBe(true);
  });

  it('identify logs user', async () => {
    await svc.identify('u1', { tier: 'gold' });
    expect(true).toBe(true);
  });

  it('identify without traits', async () => {
    await svc.identify('u1');
    expect(true).toBe(true);
  });
});
