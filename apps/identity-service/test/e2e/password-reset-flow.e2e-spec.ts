/**
 * E2E — Password Reset Flow
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { CredentialEntity } from '@domain/entities/credential.entity.js';
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { PasswordHashVO } from '@domain/value-objects/primitives/password-hash.vo.js';
import { CanResetPasswordSpecification } from '@domain/specifications/can-reset-password.specification.js';
import { CredentialValidatorService } from '@domain/services/credential-validator.service.js';
import { PasswordPolicyService } from '@domain/services/password-policy.service.js';
import { OtpGeneratorService } from '@domain/services/otp-generator.service.js';
import {
  E2E_IDS,
  E2E_CONSTANTS,
  E2E_DATES,
  E2EEventCollector,
} from './setup/e2e-fixtures.js';
import { activeLocalAuth } from '@fixtures/index';

describe('E2E — Password Reset Flow', () => {
  it('request reset → verify OTP → change password → audit event', () => {
    const events = new E2EEventCollector();
    const auth = activeLocalAuth();
    auth.pullDomainEvents();

    // Step 1: Check can reset
    const resetSpec = new CanResetPasswordSpecification();
    expect(resetSpec.isSatisfiedBy({ auth })).toBe(true);

    // Step 2: Create verification for password reset
    const otp = OtpGeneratorService.generate();
    const verification = VerificationEntity.create({
      id: VerificationIdVO.create(E2E_IDS.VERIFICATION),
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        target: IdentifierVO.email(E2E_CONSTANTS.EMAIL),
        channel: VerificationChannelVO.email(),
        purpose: VerificationPurposeVO.passwordReset(),
        code: OtpCodeVO.create(otp),
        maxAttempts: 5,
        maxResend: 3,
        expiresAt: E2E_DATES.FUTURE,
      },
      now: E2E_DATES.NOW,
    });

    // Step 3: Verify the OTP
    verification.verify(E2E_DATES.NOW);
    verification.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(verification.status.isVerified()).toBe(true);

    // Step 4: Validate new password
    const validation = CredentialValidatorService.validatePassword('NewPass@5678');
    expect(validation.valid).toBe(true);

    // Step 5: Change password on credential
    const credential = CredentialEntity.create({
      id: E2E_IDS.AUTH,
      authId: AuthIdVO.create(E2E_IDS.AUTH),
      passwordHash: PasswordHashVO.create(E2E_CONSTANTS.PASSWORD_HASH),
      now: E2E_DATES.PAST,
    });
    credential.changePassword(
      PasswordHashVO.create(E2E_CONSTANTS.PASSWORD_HASH_2),
      PasswordPolicyService.expiryDate(E2E_DATES.NOW_MS).toISOString(),
      PasswordPolicyService.historyLimit(),
      E2E_DATES.NOW,
    );
    expect(credential.passwordHash.value).toBe(E2E_CONSTANTS.PASSWORD_HASH_2);
    expect(credential.previousHashes.length).toBe(1);
    expect(credential.previousHashes[0].value).toBe(E2E_CONSTANTS.PASSWORD_HASH);

    // Step 6: Auth emits password changed event
    auth.changePassword(E2E_IDS.USER, E2E_DATES.NOW);
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(events.countByType('identity.auth.password_changed')).toBe(1);
    expect(events.countByType('identity.verification.verified')).toBe(1);
  });

  it('rejects weak new password', () => {
    const validation = CredentialValidatorService.validatePassword('weak');
    expect(validation.valid).toBe(false);
    expect(validation.reasons.length).toBeGreaterThan(0);
  });

  it('rejects password reuse from history', () => {
    const credential = CredentialEntity.create({
      id: E2E_IDS.AUTH,
      authId: AuthIdVO.create(E2E_IDS.AUTH),
      passwordHash: PasswordHashVO.create(E2E_CONSTANTS.PASSWORD_HASH),
      now: E2E_DATES.PAST,
    });
    // Change to hash B
    credential.changePassword(
      PasswordHashVO.create(E2E_CONSTANTS.PASSWORD_HASH_2),
      undefined,
      5,
    );
    // Try to change back to A (in history) → throws
    expect(() =>
      credential.changePassword(
        PasswordHashVO.create(E2E_CONSTANTS.PASSWORD_HASH),
        undefined,
        5,
      ),
    ).toThrow();
  });

  it('max reset attempts blocks further requests', () => {
    const auth = activeLocalAuth();
    const spec = new CanResetPasswordSpecification();
    expect(
      spec.isSatisfiedBy({
        auth,
        context: { recentResetCount: 3, maxResetsPerHour: 3 },
      }),
    ).toBe(false);
  });

  it('expired OTP cannot be used', () => {
    const otp = OtpGeneratorService.generate();
    const verification = VerificationEntity.create({
      id: VerificationIdVO.create(E2E_IDS.VERIFICATION),
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        target: IdentifierVO.email(E2E_CONSTANTS.EMAIL),
        channel: VerificationChannelVO.email(),
        purpose: VerificationPurposeVO.passwordReset(),
        code: OtpCodeVO.create(otp),
        maxAttempts: 5,
        maxResend: 3,
        expiresAt: E2E_DATES.PAST,
      },
      now: E2E_DATES.PAST,
    });
    expect(verification.isExpired()).toBe(true);
    expect(verification.canAttempt()).toBe(false);
    expect(() => verification.verify()).toThrow();
  });
});
