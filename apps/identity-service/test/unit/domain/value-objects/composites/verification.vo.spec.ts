/**
 * VerificationVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationVO } from '@domain/value-objects/composites/verification.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '@domain/value-objects/primitives/verification-status.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_EMAIL, TEST_OTP_CODE } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
  authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
  userId: UserIdVO.create(TEST_IDS.USER_ID),
  target: IdentifierVO.email(TEST_EMAIL),
  channel: VerificationChannelVO.email(),
  purpose: VerificationPurposeVO.emailVerify(),
  status: VerificationStatusVO.pending(),
  code: OtpCodeVO.create(TEST_OTP_CODE),
  attempts: 0,
  maxAttempts: 5,
  resendCount: 0,
  maxResend: 3,
  createdAt: TEST_DATES.NOW,
  expiresAt: TEST_DATES.FUTURE_EXPIRY,
  ...overrides,
});

describe('VerificationVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = VerificationVO.create(makeProps());
      expect(vo.status.isPending()).toBe(true);
      expect(vo.target.isEmail()).toBe(true);
    });

    it('should throw when attempts > maxAttempts', () => {
      expect(() => VerificationVO.create(makeProps({ attempts: 6, maxAttempts: 5 }))).toThrow(
        ValidationError,
      );
    });

    it('should throw when resendCount > maxResend', () => {
      expect(() => VerificationVO.create(makeProps({ resendCount: 4, maxResend: 3 }))).toThrow(
        ValidationError,
      );
    });

    it('should throw when verified but no verifiedAt', () => {
      expect(() =>
        VerificationVO.create(
          makeProps({ status: VerificationStatusVO.verified() }),
        ),
      ).toThrow(ValidationError);
    });

    it('should freeze', () => {
      expect(Object.isFrozen(VerificationVO.create(makeProps()))).toBe(true);
    });
  });

  describe('isExpired()', () => {
    it('false for future', () => {
      expect(VerificationVO.create(makeProps()).isExpired()).toBe(false);
    });

    it('true for past', () => {
      expect(
        VerificationVO.create(makeProps({ expiresAt: TEST_DATES.PAST_EXPIRY })).isExpired(),
      ).toBe(true);
    });
  });

  describe('canAttempt()', () => {
    it('true when fresh', () => {
      expect(VerificationVO.create(makeProps()).canAttempt()).toBe(true);
    });

    it('false when expired', () => {
      expect(
        VerificationVO.create(makeProps({ expiresAt: TEST_DATES.PAST_EXPIRY })).canAttempt(),
      ).toBe(false);
    });

    it('false when max attempts reached', () => {
      expect(
        VerificationVO.create(makeProps({ attempts: 5, maxAttempts: 5 })).canAttempt(),
      ).toBe(false);
    });
  });

  describe('canResend()', () => {
    it('true when fresh', () => {
      expect(VerificationVO.create(makeProps()).canResend()).toBe(true);
    });

    it('false when max resend reached', () => {
      expect(
        VerificationVO.create(makeProps({ resendCount: 3, maxResend: 3 })).canResend(),
      ).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = VerificationVO.reconstitute(makeProps({ attempts: 100 }));
      expect(vo.attempts).toBe(100);
    });
  });
});
