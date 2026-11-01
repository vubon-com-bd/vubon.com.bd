/**
 * VerificationEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import {
  TEST_DATES,
  TEST_OTP_CODE,
  makeVerificationEntity,
  pendingVerification,
  verifiedVerification,
  expiredVerification,
  maxAttemptsVerification,
  maxResendVerification,
  createNewVerification,
} from '@fixtures/index';

describe('VerificationEntity', () => {
  describe('create()', () => {
    it('should create pending', () => {
      const v = createNewVerification();
      expect(v.status.isPending()).toBe(true);
      expect(v.attempts).toBe(0);
      expect(v.resendCount).toBe(0);
    });
  });

  describe('isExpired()', () => {
    it('false for future', () => {
      expect(pendingVerification().isExpired()).toBe(false);
    });

    it('true for past', () => {
      expect(expiredVerification().isExpired()).toBe(true);
    });
  });

  describe('canAttempt()', () => {
    it('true when fresh + pending', () => {
      expect(pendingVerification().canAttempt()).toBe(true);
    });

    it('false when max attempts', () => {
      expect(maxAttemptsVerification().canAttempt()).toBe(false);
    });

    it('false when expired', () => {
      expect(expiredVerification().canAttempt()).toBe(false);
    });
  });

  describe('canResend()', () => {
    it('true when fresh', () => {
      expect(pendingVerification().canResend()).toBe(true);
    });

    it('false when max resend', () => {
      expect(maxResendVerification().canResend()).toBe(false);
    });
  });

  describe('recordAttempt()', () => {
    it('should increment attempts', () => {
      const v = pendingVerification();
      v.recordAttempt();
      expect(v.attempts).toBe(1);
    });

    it('should throw when cannot attempt', () => {
      const v = maxAttemptsVerification();
      expect(() => v.recordAttempt()).toThrow(BusinessRuleError);
    });
  });

  describe('verify()', () => {
    it('should set status=verified + verifiedAt + emit event', () => {
      const v = pendingVerification();
      v.pullDomainEvents();
      v.verify();
      expect(v.status.isVerified()).toBe(true);
      expect(v.verifiedAt).toBeDefined();
      const events = v.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.verification.verified')).toBe(true);
    });

    it('should throw when already verified', () => {
      const v = verifiedVerification();
      expect(() => v.verify()).toThrow(BusinessRuleError);
    });

    it('should throw on expired status', () => {
      const v = expiredVerification();
      expect(() => v.verify()).toThrow(BusinessRuleError);
    });
  });

  describe('expire()', () => {
    it('should set status=expired + emit event', () => {
      const v = pendingVerification();
      v.pullDomainEvents();
      v.expire();
      expect(v.status.isExpired()).toBe(true);
      const events = v.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.verification.expired')).toBe(true);
    });

    it('should be idempotent', () => {
      const v = verifiedVerification();
      v.pullDomainEvents();
      v.expire();
      expect(v.pullDomainEvents().length).toBe(0);
    });
  });

  describe('resendOtp()', () => {
    it('should update code + increment resendCount + reset attempts + emit', () => {
      const v = pendingVerification();
      v.recordAttempt();
      v.pullDomainEvents();
      const newCode = OtpCodeVO.create('999888');
      v.resendOtp(newCode);
      expect(v.resendCount).toBe(1);
      expect(v.attempts).toBe(0);
      expect(v.code?.value).toBe('999888');
      const events = v.pullDomainEvents();
      expect(events.some((e) => e.type === 'identity.verification.otp_resent')).toBe(true);
    });

    it('should throw when cannot resend', () => {
      const v = maxResendVerification();
      const newCode = OtpCodeVO.create(TEST_OTP_CODE);
      expect(() => v.resendOtp(newCode)).toThrow(BusinessRuleError);
    });
  });
});

// ═══════════════ EXTRA: expired verify protection ═══════════════
describe('VerificationEntity (extra coverage)', () => {
  it('verify() should throw when expired', () => {
    const v = expiredVerification();
    expect(() => v.verify()).toThrow();
  });

  it('verify() on expired even at provided future time', () => {
    const v = pendingVerification();
    const farFuture = new Date(Date.now() + 999999999).toISOString();
    expect(() => v.verify(farFuture)).toThrow();
  });
});
