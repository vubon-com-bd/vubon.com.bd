/**
 * PaymentPushService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentPushService } from '@infrastructure/services/external/push.service';
import { PushService as KernelPushService } from '@vubon/shared-kernel/infrastructure/external/push';

function makeKernelMock() {
  return {
    send: jest.fn(),
  };
}

describe('PaymentPushService', () => {
  let kernel: ReturnType<typeof makeKernelMock>;
  let service: PaymentPushService;

  beforeEach(() => {
    kernel = makeKernelMock();
    service = new PaymentPushService(
      kernel as unknown as KernelPushService,
    );
  });

  it('sends payment_success push', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      userId: 'usr-1',
      template: 'payment_success',
      data: { paymentId: 'pay-1', amount: 1000, currency: 'BDT' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({
        deviceToken: 'user:usr-1',
        title: 'Payment Successful',
        body: expect.stringContaining('1000 BDT'),
      }),
    );
  });

  it('sends payment_failed push', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      userId: 'usr-1',
      template: 'payment_failed',
      data: { paymentId: 'pay-1' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Payment Failed' }),
    );
  });

  it('sends refund_processed push', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      userId: 'usr-1',
      template: 'refund_processed',
      data: { refundId: 'rf-1', amount: 500, currency: 'BDT' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Refund Processed' }),
    );
  });

  it('uses fallback for unknown template', async () => {
    kernel.send.mockResolvedValue({ success: true });
    await service.send({
      userId: 'usr-1',
      template: 'custom',
      data: {},
    });
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Payment Update' }),
    );
  });

  it('returns false on kernel failure', async () => {
    kernel.send.mockResolvedValue({ success: false });
    const ok = await service.send({
      userId: 'usr-1',
      template: 'payment_success',
      data: {},
    });
    expect(ok).toBe(false);
  });

  it('returns false on kernel throw', async () => {
    kernel.send.mockRejectedValue(new Error('network'));
    const ok = await service.send({
      userId: 'usr-1',
      template: 'payment_success',
      data: {},
    });
    expect(ok).toBe(false);
  });
});
