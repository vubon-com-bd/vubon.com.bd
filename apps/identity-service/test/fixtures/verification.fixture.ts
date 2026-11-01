/**
 * Verification fixtures
 * @module identity-service/test/fixtures
 */
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '@domain/value-objects/primitives/verification-status.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';

import { TEST_IDS, TEST_EMAIL, TEST_OTP_CODE } from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

export interface MakeVerificationOptions {
  readonly id?: string;
  readonly authId?: string;
  readonly userId?: string;
  readonly target?: string;
  readonly channel?: string;
  readonly purpose?: string;
  readonly status?: string;
  readonly code?: string;
  readonly attempts?: number;
  readonly maxAttempts?: number;
  readonly resendCount?: number;
  readonly maxResend?: number;
  readonly expiresAt?: string;
  readonly verifiedAt?: string;
}

export const makeVerificationEntity = (
  options: MakeVerificationOptions = {},
): VerificationEntity => {
  const now = TEST_DATES.NOW;
  return VerificationEntity.reconstitute({
    id: options.id ?? TEST_IDS.VERIFICATION_ID,
    createdAt: now,
    updatedAt: now,
    props: {
      authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      target: IdentifierVO.email(options.target ?? TEST_EMAIL),
      channel: VerificationChannelVO.reconstitute(options.channel ?? 'email'),
      purpose: VerificationPurposeVO.reconstitute(options.purpose ?? 'email_verify'),
      status: VerificationStatusVO.reconstitute(options.status ?? 'pending'),
      code: options.code ? OtpCodeVO.create(options.code) : OtpCodeVO.create(TEST_OTP_CODE),
      attempts: options.attempts ?? 0,
      maxAttempts: options.maxAttempts ?? 5,
      resendCount: options.resendCount ?? 0,
      maxResend: options.maxResend ?? 3,
      expiresAt: options.expiresAt ?? TEST_DATES.FUTURE_EXPIRY,
      verifiedAt: options.verifiedAt,
    },
  });
};

export const pendingVerification = (): VerificationEntity =>
  makeVerificationEntity({ status: 'pending' });

export const verifiedVerification = (): VerificationEntity =>
  makeVerificationEntity({
    status: 'verified',
    verifiedAt: TEST_DATES.NOW,
  });

export const expiredVerification = (): VerificationEntity =>
  makeVerificationEntity({
    status: 'expired',
    expiresAt: TEST_DATES.PAST_EXPIRY,
  });

export const maxAttemptsVerification = (): VerificationEntity =>
  makeVerificationEntity({ attempts: 5, maxAttempts: 5 });

export const maxResendVerification = (): VerificationEntity =>
  makeVerificationEntity({ resendCount: 3, maxResend: 3 });

export const createNewVerification = (
  options: MakeVerificationOptions = {},
): VerificationEntity => {
  const now = TEST_DATES.NOW;
  return VerificationEntity.create({
    id: VerificationIdVO.create(options.id ?? TEST_IDS.VERIFICATION_ID),
    props: {
      authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      target: IdentifierVO.email(options.target ?? TEST_EMAIL),
      channel: VerificationChannelVO.reconstitute(options.channel ?? 'email'),
      purpose: VerificationPurposeVO.reconstitute(options.purpose ?? 'email_verify'),
      code: OtpCodeVO.create(options.code ?? TEST_OTP_CODE),
      maxAttempts: options.maxAttempts ?? 5,
      maxResend: options.maxResend ?? 3,
      expiresAt: options.expiresAt ?? TEST_DATES.FUTURE_EXPIRY,
    },
    now,
  });
};
