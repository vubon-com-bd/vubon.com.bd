/**
 * VerificationEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationEntity } from '@domain/entities/verification.entity';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeVerification(): VerificationEntity {
  return VerificationEntity.create({
    id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
    props: {
      paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
      method: VerificationMethodVO.create('otp_sms'),
      expiresAt: TEST_DATES.EXPIRES_IN_1_HOUR,
    },
    now: TEST_DATES.NOW,
  });
}

describe('VerificationEntity', () => {
  describe('create()', () => {
    it('creates pending verification', () => {
      const v = makeVerification();
      expect(v.status.isPending()).toBe(true);
      expect(v.attempts).toBe(0);
    });
  });

  describe('startProgress()', () => {
    it('pending → in_progress', () => {
      const v = makeVerification();
      v.startProgress(TEST_DATES.NOW);
      expect(v.status.isInProgress()).toBe(true);
    });
    it('throws from verified', () => {
      const v = makeVerification();
      v.verify(TEST_DATES.NOW);
      expect(() => v.startProgress(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('recordAttempt()', () => {
    it('increments attempts', () => {
      const v = makeVerification();
      v.recordAttempt(TEST_DATES.NOW);
      v.recordAttempt(TEST_DATES.NOW);
      expect(v.attempts).toBe(2);
    });
    it('throws from verified (final)', () => {
      const v = makeVerification();
      v.verify(TEST_DATES.NOW);
      expect(() => v.recordAttempt(TEST_DATES.NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('verify()', () => {
    it('pending → verified', () => {
      const v = makeVerification();
      v.verify(TEST_DATES.NOW);
      expect(v.isVerified()).toBe(true);
      expect(v.verifiedAt).toBe(TEST_DATES.NOW);
    });
    it('in_progress → verified', () => {
      const v = makeVerification();
      v.startProgress(TEST_DATES.NOW);
      v.verify(TEST_DATES.NOW);
      expect(v.isVerified()).toBe(true);
    });
  });

  describe('fail()', () => {
    it('pending → failed with reason', () => {
      const v = makeVerification();
      v.fail('invalid OTP', TEST_DATES.NOW);
      expect(v.status.isFailed()).toBe(true);
      expect(v.failureReason).toBe('invalid OTP');
    });
  });

  describe('expire()', () => {
    it('pending → expired', () => {
      const v = makeVerification();
      v.expire(TEST_DATES.NOW);
      expect(v.status.isExpired()).toBe(true);
    });
  });

  describe('isExpired()', () => {
    it('true when expiresAt < reference', () => {
      const v = VerificationEntity.create({
        id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
        props: {
          paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
          method: VerificationMethodVO.create('otp_sms'),
          expiresAt: TEST_DATES.YESTERDAY,
        },
        now: TEST_DATES.NOW,
      });
      expect(v.isExpired(new Date(TEST_DATES.NOW))).toBe(true);
    });
    it('false when future', () => {
      const v = makeVerification();
      expect(v.isExpired(new Date(TEST_DATES.NOW))).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds verified state', () => {
      const v = VerificationEntity.reconstitute({
        id: TEST_IDS.VERIFICATION_ID,
        createdAt: TEST_DATES.YESTERDAY,
        updatedAt: TEST_DATES.NOW,
        props: {
          paymentId: PaymentIdVO.create(TEST_IDS.PAYMENT_ID),
          status: VerificationStatusVO.verified(),
          method: VerificationMethodVO.create('card_3ds'),
          attempts: 2,
          expiresAt: TEST_DATES.EXPIRES_IN_1_HOUR,
          verifiedAt: TEST_DATES.NOW,
        },
      });
      expect(v.isVerified()).toBe(true);
      expect(v.attempts).toBe(2);
    });
  });
});
