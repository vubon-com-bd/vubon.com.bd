/**
 * PaymentService tests
 * @module order-service/test/unit/infrastructure/external/payment
 */
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { PaymentService } from '@infrastructure/external/payment/payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    service = new PaymentService();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('initiate sends POST and returns success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        paymentId: 'pay-1',
        redirectUrl: 'https://pay.example.com/1',
      }),
    } as Response);

    const result = await service.initiate({
      orderId: 'order-1',
      amount: 1000,
      currency: 'BDT',
      method: 'bkash',
      customerId: 'cust-1',
    });

    expect(result.success).toBe(true);
    expect(result.paymentId).toBe('pay-1');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/payments/initiate'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('initiate handles HTTP error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    const result = await service.initiate({
      orderId: 'order-1',
      amount: 1000,
      currency: 'BDT',
      method: 'bkash',
      customerId: 'cust-1',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('500');
  });

  it('initiate handles network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network down'));

    const result = await service.initiate({
      orderId: 'order-1',
      amount: 1000,
      currency: 'BDT',
      method: 'bkash',
      customerId: 'cust-1',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Network down');
  });

  it('refund sends POST', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, refundId: 'refund-1' }),
    } as Response);

    const result = await service.refund({
      orderId: 'order-1',
      paymentId: 'pay-1',
      amount: 500,
      reason: 'customer_request',
    });

    expect(result.success).toBe(true);
    expect(result.refundId).toBe('refund-1');
  });

  it('refund handles error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('timeout'));

    const result = await service.refund({
      orderId: 'order-1',
      paymentId: 'pay-1',
      amount: 500,
      reason: 'customer_request',
    });

    expect(result.success).toBe(false);
  });

  it('isHealthy returns true when 200', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    expect(await service.isHealthy()).toBe(true);
  });

  it('isHealthy returns false on error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('down'));
    expect(await service.isHealthy()).toBe(false);
  });
});
