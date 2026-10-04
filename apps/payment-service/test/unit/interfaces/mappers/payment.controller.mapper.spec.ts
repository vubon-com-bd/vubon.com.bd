import { jest } from '@jest/globals';
import { PaymentControllerMapper } from '../../../../src/module/interfaces/mappers/payment.controller.mapper.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('PaymentControllerMapper', () => {
  it('toInitiateAppDto maps fields', () => {
    const out = PaymentControllerMapper.toInitiateAppDto({
      orderId: UUID,
      method: 'mobile_banking',
      gateway: 'bkash',
      amount: 1000,
      currency: 'BDT',
      returnUrl: 'https://shop.vubon.com.bd/return',
      idempotencyKey: 'idem_abc12345',
      metadata: { source: 'web' },
    });
    expect(out.orderId).toBe(UUID);
    expect(out.method).toBe('mobile_banking');
    expect(out.gateway).toBe('bkash');
    expect(out.amount).toBe(1000);
    expect(out.currency).toBe('BDT');
    expect(out.idempotencyKey).toBe('idem_abc12345');
  });

  it('toHttpResponse passes through', () => {
    const out = PaymentControllerMapper.toHttpResponse({
      id: UUID,
      orderId: UUID,
      userId: UUID,
      type: 'one_time',
      status: 'pending',
      method: 'mobile_banking',
      gateway: 'bkash',
      amount: 1000,
      currency: 'BDT',
      refundedAmount: 0,
      refundableRemaining: 1000,
      retryAttempts: 0,
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    });
    expect(out.id).toBe(UUID);
  });
});
