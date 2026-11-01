/**
 * PaymentOwner decorator — unit tests
 * @module payment-service/test/unit/interfaces/decorators
 */
import { describe, it, expect } from '@jest/globals';
import {
  PaymentOwner,
  PAYMENT_OWNER_META_KEY,
} from '@interfaces/decorators/payment-owner.decorator';

describe('PaymentOwner decorator', () => {
  it('is a function', () => {
    expect(typeof PaymentOwner).toBe('function');
  });

  it('returns decorator function', () => {
    const decorator = PaymentOwner();
    expect(typeof decorator).toBe('function');
  });

  it('exports metadata key', () => {
    expect(PAYMENT_OWNER_META_KEY).toBe('payment_owner_required');
  });
});
