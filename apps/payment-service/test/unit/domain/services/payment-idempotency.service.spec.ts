import { PaymentIdempotencyService } from '../../../../src/module/domain/services/payment-idempotency.service.js';

describe('PaymentIdempotencyService', () => {
  it('deriveKey — deterministic', () => {
    const parts = {
      orderId: 'order-1',
      userId: 'user-1',
      amount: 1000,
      method: 'mobile_banking',
    };
    const a = PaymentIdempotencyService.deriveKey(parts);
    const b = PaymentIdempotencyService.deriveKey(parts);
    expect(a.value).toBe(b.value);
    expect(a.value.startsWith('idem_')).toBe(true);
  });

  it('deriveKey — different inputs → different keys', () => {
    const a = PaymentIdempotencyService.deriveKey({
      orderId: 'order-1',
      userId: 'user-1',
      amount: 1000,
      method: 'mobile_banking',
    });
    const b = PaymentIdempotencyService.deriveKey({
      orderId: 'order-1',
      userId: 'user-1',
      amount: 999,
      method: 'mobile_banking',
    });
    expect(a.value).not.toBe(b.value);
  });

  it('random — unique keys', () => {
    const a = PaymentIdempotencyService.random();
    const b = PaymentIdempotencyService.random();
    expect(a.value).not.toBe(b.value);
    expect(a.value.startsWith('idem_')).toBe(true);
  });

  it('isValid — ok for valid key', () => {
    expect(PaymentIdempotencyService.isValid('idem_abc12345')).toBe(true);
  });

  it('isValid — false for invalid', () => {
    expect(PaymentIdempotencyService.isValid('ab')).toBe(false);
  });

  it('ttlSeconds — returns a positive number', () => {
    expect(PaymentIdempotencyService.ttlSeconds()).toBeGreaterThan(0);
  });
});
