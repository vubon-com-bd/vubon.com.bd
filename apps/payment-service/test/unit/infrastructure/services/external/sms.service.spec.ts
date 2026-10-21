/**
 * PaymentSmsService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentSmsService } from '@infrastructure/services/external/sms.service';
import { SmsService as KernelSmsService } from '@vubon/shared-kernel/infrastructure/external/sms';

function makeKernelMock() {
  return {
    send: jest.fn(),
  };
}

describe('PaymentSmsService', () => {
  let kernel: ReturnType<typeof makeKernelMock>;
  let service: PaymentSmsService;

  beforeEach(() => {
    kernel = makeKernelMock();
    service = new PaymentSmsService(
      kernel as unknown as KernelSmsService,
    );
  });

  it('sends payment_success SMS', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      to: '+8801700000000',
      template: 'payment_success',
      data: { paymentId: 'pay-1', amount: 1000, currency: 'BDT' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '+8801700000000',
        message: expect.stringContaining('1000 BDT'),
      }),
    );
  });

  it('sends payment_failed SMS', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      to: '+8801',
      template: 'payment_failed',
      data: { paymentId: 'pay-2' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('failed') }),
    );
  });

  it('sends refund_processed SMS', async () => {
    kernel.send.mockResolvedValue({ success: true });
    const ok = await service.send({
      to: '+8801',
      template: 'refund_processed',
      data: { refundId: 'rf-1', amount: 500, currency: 'BDT' },
    });
    expect(ok).toBe(true);
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('Refund') }),
    );
  });

  it('uses fallback message for unknown template', async () => {
    kernel.send.mockResolvedValue({ success: true });
    await service.send({
      to: '+8801',
      template: 'custom',
      data: {},
    });
    expect(kernel.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('custom') }),
    );
  });

  it('returns false on kernel failure', async () => {
    kernel.send.mockResolvedValue({ success: false });
    const ok = await service.send({
      to: '+8801',
      template: 'payment_success',
      data: {},
    });
    expect(ok).toBe(false);
  });

  it('returns false on kernel throw', async () => {
    kernel.send.mockRejectedValue(new Error('network'));
    const ok = await service.send({
      to: '+8801',
      template: 'payment_success',
      data: {},
    });
    expect(ok).toBe(false);
  });

  it('uses last 8 chars of ID as reference', async () => {
    kernel.send.mockResolvedValue({ success: true });
    await service.send({
      to: '+8801',
      template: 'payment_success',
      data: {
        paymentId: '11111111-2222-3333-4444-555555555555',
        amount: 100,
        currency: 'BDT',
      },
    });
    const call = kernel.send.mock.calls[0][0] as { message: string };
    // Last 8: '55555555'
    expect(call.message).toContain('55555555');
  });
});
