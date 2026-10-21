/**
 * VerifiedPayment decorator — unit tests
 * @module payment-service/test/unit/interfaces/decorators
 */
import { describe, it, expect } from '@jest/globals';
import {
  VerifiedPayment,
  VERIFIED_PAYMENT_META_KEY,
} from '@interfaces/decorators/verified-payment.decorator';

describe('VerifiedPayment decorator', () => {
  it('is a function', () => {
    expect(typeof VerifiedPayment).toBe('function');
  });

  it('returns decorator function', () => {
    const decorator = VerifiedPayment();
    expect(typeof decorator).toBe('function');
  });

  it('exports metadata key', () => {
    expect(VERIFIED_PAYMENT_META_KEY).toBe('verified_payment_required');
  });
});
