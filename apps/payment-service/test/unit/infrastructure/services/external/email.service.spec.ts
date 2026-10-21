/**
 * PaymentEmailService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentEmailService } from '@infrastructure/services/external/email.service';
import { EmailService as KernelEmailService } from '@vubon/shared-kernel/infrastructure/external/email';

function makeKernelMock() {
  return {
    send: jest.fn(),
  };
}

describe('PaymentEmailService', () => {
  let kernel: ReturnType<typeof makeKernelMock>;
  let service: PaymentEmailService;

  beforeEach(() => {
    kernel = makeKernelMock();
    service = new PaymentEmailService(
      kernel as unknown as KernelEmailService,
    );
  });

  it('sends payment_success email', async () => {
    kernel.send.mockResolvedValue({ success: true, messageId: 'msg-1' });
    const ok = await service.send({
      to: 'a@example.com',
      template: 'payment_success',
      data: { paymentId: 'pay-1', amount: 1000, currency: 'BDT' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'a@example.com',
        subject: 'Payment Successful',
        html: expect.stringContaining('pay-1'),
      }),
    );
  });

  it('sends payment_failed email', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      to: 'a@example.com',
      template: 'payment_failed',
      data: { paymentId: 'pay-1' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ subject: 'Payment Failed' }),
    );
  });

  it('sends refund_processed email', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      to: 'a@example.com',
      template: 'refund_processed',
      data: { refundId: 'rf-1', amount: 500, currency: 'BDT' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ subject: 'Refund Processed' }),
    );
  });

  it('sends invoice_created email', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      to: 'a@example.com',
      template: 'invoice_created',
      data: { invoiceId: 'inv-1' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ subject: 'Invoice Generated' }),
    );
  });

  it('sends subscription_renewed email', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      to: 'a@example.com',
      template: 'subscription_renewed',
      data: {},
    });
    expect(ok).toBe(true);
  });

  it('uses fallback subject for unknown template', async () => {
    kernel.send.mockResolvedValue({ success: true });
    await service.send({
      to: 'a@example.com',
      template: 'unknown',
      data: {},
    });
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ subject: 'Payment Notification' }),
    );
  });

  it('returns false on kernel failure', async () => {
    kernel.send.mockResolvedValue({ success: false, error: 'smtp down' });
    const ok = await service.send({
      to: 'a@example.com',
      template: 'payment_success',
      data: {},
    });
    expect(ok).toBe(false);
  });

  it('returns false on kernel throw', async () => {
    kernel.send.mockRejectedValue(new Error('network'));
    const ok = await service.send({
      to: 'a@example.com',
      template: 'payment_success',
      data: {},
    });
    expect(ok).toBe(false);
  });
});
