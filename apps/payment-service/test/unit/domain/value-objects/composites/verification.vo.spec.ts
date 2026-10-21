/**
 * VerificationVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationVO } from '@domain/composites/verification.vo';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeProps(overrides: Partial<Parameters<typeof VerificationVO.create>[0]> = {}) {
  return {
    id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
    paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
    status: VerificationStatusVO.pending(),
    method: VerificationMethodVO.create('otp_sms'),
    attempts: 0,
    expiresAt: TEST_DATES.EXPIRES_IN_1_HOUR,
    createdAt: TEST_DATES.NOW,
    updatedAt: TEST_DATES.NOW,
    ...overrides,
  };
}

describe('VerificationVO', () => {
  describe('create()', () => {
    it('creates valid verification', () => {
      const vo = VerificationVO.create(makeProps());
      expect(vo.method.value).toBe('otp_sms');
      expect(vo.attempts).toBe(0);
    });
    it('throws on negative attempts', () => {
      expect(() => VerificationVO.create(makeProps({ attempts: -1 }))).toThrow(ValidationError);
    });
    it('throws when verified without verifiedAt', () => {
      expect(() =>
        VerificationVO.create(makeProps({ status: VerificationStatusVO.verified() })),
      ).toThrow(ValidationError);
    });
    it('accepts verified with verifiedAt', () => {
      const vo = VerificationVO.create(
        makeProps({ status: VerificationStatusVO.verified(), verifiedAt: TEST_DATES.NOW }),
      );
      expect(vo.isVerified()).toBe(true);
    });
    it('throws when failed without failureReason', () => {
      expect(() =>
        VerificationVO.create(makeProps({ status: VerificationStatusVO.failed() })),
      ).toThrow(ValidationError);
    });
    it('accepts failed with failureReason', () => {
      const vo = VerificationVO.create(
        makeProps({ status: VerificationStatusVO.failed(), failureReason: 'invalid OTP' }),
      );
      expect(vo.failureReason).toBe('invalid OTP');
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = VerificationVO.reconstitute(makeProps({ attempts: -1 }));
      expect(vo.attempts).toBe(-1);
    });
  });

  describe('isExpired()', () => {
    it('true for past expiresAt', () => {
      const vo = VerificationVO.create(makeProps({ expiresAt: TEST_DATES.YESTERDAY }));
      expect(vo.isExpired(new Date(TEST_DATES.NOW))).toBe(true);
    });
    it('false for future expiresAt', () => {
      const vo = VerificationVO.create(makeProps({ expiresAt: TEST_DATES.NEXT_MONTH }));
      expect(vo.isExpired(new Date(TEST_DATES.NOW))).toBe(false);
    });
  });
});
