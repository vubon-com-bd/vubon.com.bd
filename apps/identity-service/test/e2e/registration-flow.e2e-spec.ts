/**
 * E2E — Registration Flow
 *
 * Flow: create auth → verify email → activate → ready to login
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { CanLoginSpecification } from '@domain/specifications/can-login.specification.js';
import { CanRegisterSpecification } from '@domain/specifications/can-register.specification.js';
import { OtpGeneratorService } from '@domain/services/otp-generator.service.js';
import { E2E_IDS, E2E_CONSTANTS, E2E_DATES, E2EEventCollector } from './setup/e2e-fixtures.js';

describe('E2E — Registration Flow', () => {
  it('creates pending auth → verifies email → activates → can login', () => {
    const events = new E2EEventCollector();

    // Step 1: Check registration eligibility
    const canRegister = new CanRegisterSpecification();
    expect(
      canRegister.isSatisfiedBy({
        identifier: E2E_CONSTANTS.EMAIL,
        context: { existingIdentifierCount: 0, registrationEnabled: true },
      }),
    ).toBe(true);

    // Step 2: Create pending auth
    const auth = AuthEntity.create({
      id: AuthIdVO.create(E2E_IDS.AUTH),
      props: {
        userId: UserIdVO.create(E2E_IDS.USER),
        type: AuthTypeVO.password(),
        provider: AuthProviderVO.local(),
        method: AuthMethodVO.emailPassword(),
        identifier: IdentifierVO.email(E2E_CONSTANTS.EMAIL),
      },
      now: E2E_DATES.NOW,
    });
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(auth.isPending()).toBe(true);
    expect(auth.isEmailVerified).toBe(false);

    // Step 3: Create verification with OTP
    const otp = OtpGeneratorService.generate();
    const verification = VerificationEntity.create({
      id: VerificationIdVO.create(E2E_IDS.VERIFICATION),
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        target: IdentifierVO.email(E2E_CONSTANTS.EMAIL),
        channel: VerificationChannelVO.email(),
        purpose: VerificationPurposeVO.emailVerify(),
        code: OtpCodeVO.create(otp),
        maxAttempts: 5,
        maxResend: 3,
        expiresAt: E2E_DATES.FUTURE,
      },
      now: E2E_DATES.NOW,
    });
    expect(verification.status.isPending()).toBe(true);
    expect(verification.canAttempt()).toBe(true);

    // Step 4: Record successful verification
    verification.verify(E2E_DATES.NOW);
    verification.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(verification.status.isVerified()).toBe(true);

    // Step 5: Mark email verified on auth
    auth.markEmailVerified(E2E_DATES.NOW);
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(auth.isEmailVerified).toBe(true);

    // Step 6: Activate auth
    auth.activate(E2E_DATES.NOW);
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(auth.isActive()).toBe(true);

    // Step 7: Check can login
    const canLogin = new CanLoginSpecification();
    expect(canLogin.isSatisfiedBy({ auth })).toBe(true);

    // Step 8: Verify events recorded
    expect(events.countByType('auth.created')).toBe(1);
    expect(events.countByType('verification.verified')).toBe(1);
    expect(events.countByType('auth.email_verified')).toBe(1);
    expect(events.countByType('auth.status_changed')).toBeGreaterThanOrEqual(1);
  });

  it('rejects duplicate registration', () => {
    const canRegister = new CanRegisterSpecification();
    const result = canRegister.isSatisfiedBy({
      identifier: E2E_CONSTANTS.EMAIL,
      context: { existingIdentifierCount: 1, registrationEnabled: true },
    });
    expect(result).toBe(false);
    expect(
      canRegister.explain({
        identifier: E2E_CONSTANTS.EMAIL,
        context: { existingIdentifierCount: 1, registrationEnabled: true },
      }),
    ).toContain('already registered');
  });

  it('rejects registration when IP limit reached', () => {
    const canRegister = new CanRegisterSpecification();
    expect(
      canRegister.isSatisfiedBy({
        identifier: E2E_CONSTANTS.EMAIL,
        context: { existingIdentifierCount: 0, ipRegistrationCount24h: 5, maxRegistrationsPerIp24h: 5 },
      }),
    ).toBe(false);
  });
});
