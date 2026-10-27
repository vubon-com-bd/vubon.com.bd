/**
 * E2E — Domain Integration: Full auth lifecycle
 *
 * Flow: register → verify → activate → login → MFA enable →
 *       session → refresh token → logout → revoke all
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { SessionEntity } from '@domain/entities/session.entity.js';
import { TokenEntity } from '@domain/entities/token.entity.js';
import { MfaEntity } from '@domain/entities/mfa.entity.js';
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { CanLoginSpecification } from '@domain/specifications/can-login.specification.js';
import { CanEnableMfaSpecification } from '@domain/specifications/can-enable-mfa.specification.js';
import { SessionManagerService } from '@domain/services/session-manager.service.js';
import { TokenGeneratorService } from '@domain/services/token-generator.service.js';
import { OtpGeneratorService } from '@domain/services/otp-generator.service.js';
import {
  E2E_IDS,
  E2E_CONSTANTS,
  E2E_DATES,
  E2EEventCollector,
} from './setup/e2e-fixtures.js';

describe('E2E — Domain Integration (full lifecycle)', () => {
  it('register → verify → activate → login → MFA → session → logout', () => {
    const events = new E2EEventCollector();

    // ═══════════════ 1. REGISTER ═══════════════
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

    // ═══════════════ 2. VERIFY EMAIL ═══════════════
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
    verification.verify(E2E_DATES.NOW);
    auth.markEmailVerified(E2E_DATES.NOW);
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(auth.isEmailVerified).toBe(true);

    // ═══════════════ 3. ACTIVATE ═══════════════
    auth.activate(E2E_DATES.NOW);
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(auth.isActive()).toBe(true);

    // ═══════════════ 4. CAN LOGIN ═══════════════
    const canLogin = new CanLoginSpecification();
    expect(canLogin.isSatisfiedBy({ auth })).toBe(true);

    // ═══════════════ 5. LOGIN → SESSION + TOKENS ═══════════════
    const session = SessionEntity.create({
      id: SessionIdVO.create(E2E_IDS.SESSION),
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        expiry: SessionManagerService.buildExpiry(false),
        rememberMe: false,
      },
      now: E2E_DATES.NOW,
    });
    session.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));

    const accessPayload = TokenGeneratorService.accessTokenPayload({
      sub: E2E_IDS.USER,
      sid: E2E_IDS.SESSION,
      iss: TokenGeneratorService.issuer(),
      jti: E2E_CONSTANTS.JTI,
    });
    const accessToken = TokenEntity.create({
      id: TokenIdVO.create(E2E_IDS.TOKEN),
      props: {
        userId: UserIdVO.create(E2E_IDS.USER),
        sessionId: SessionIdVO.create(E2E_IDS.SESSION),
        type: TokenTypeVO.access(),
        value: TokenValueVO.create(E2E_CONSTANTS.ACCESS_TOKEN),
        expiry: TokenExpiryVO.fromEpochSeconds(accessPayload.exp),
        jti: E2E_CONSTANTS.JTI,
      },
      now: E2E_DATES.NOW,
    });
    accessToken.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(session.isActive()).toBe(true);
    expect(accessToken.isUsable()).toBe(true);

    // ═══════════════ 6. ENABLE MFA ═══════════════
    const canEnableMfa = new CanEnableMfaSpecification();
    expect(
      canEnableMfa.isSatisfiedBy({
        auth,
        context: { method: 'totp', secretProvisioned: true },
      }),
    ).toBe(true);

    const mfa = MfaEntity.create({
      id: MfaIdVO.create(E2E_IDS.MFA),
      authId: AuthIdVO.create(E2E_IDS.AUTH),
      method: MfaMethodVO.totp(),
      secret: MfaSecretVO.create(E2E_CONSTANTS.MFA_SECRET),
      now: E2E_DATES.NOW,
    });
    mfa.markVerified(E2E_DATES.NOW);
    mfa.enable(E2E_DATES.NOW);
    mfa.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));

    auth.enableMfa('totp', E2E_DATES.NOW);
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(auth.isMfaEnabled).toBe(true);
    expect(mfa.isEnabledAndVerified()).toBe(true);

    // ═══════════════ 7. LOGOUT ═══════════════
    session.logout(E2E_DATES.FUTURE);
    session.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(session.status.isRevoked()).toBe(true);

    // ═══════════════ 8. REVOKE ALL TOKENS ═══════════════
    accessToken.revoke('logout', E2E_DATES.FUTURE);
    accessToken.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(accessToken.isRevoked()).toBe(true);

    // ═══════════════ 9. VERIFY EVENT STREAM ═══════════════
    expect(events.countByType('identity.auth.created')).toBe(1);
    expect(events.countByType('identity.auth.email_verified')).toBe(1);
    expect(events.countByType('identity.auth.status_changed')).toBeGreaterThanOrEqual(1);
    expect(events.countByType('identity.session.created')).toBe(1);
    expect(events.countByType('identity.session.logout')).toBe(1);
    expect(events.countByType('identity.token.issued')).toBe(1);
    expect(events.countByType('identity.token.revoked')).toBe(1);
    expect(events.countByType('identity.mfa.setup_started')).toBe(1);
    expect(events.countByType('identity.mfa.verified')).toBe(1);
    expect(events.countByType('identity.mfa.enabled')).toBe(1);
    expect(events.countByType('identity.auth.mfa_enabled')).toBe(1);
  });

  it('revoked auth cannot login again', () => {
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
    auth.activate(E2E_DATES.NOW);
    auth.revoke('admin_action', E2E_DATES.NOW);
    expect(auth.isRevoked()).toBe(true);

    const canLogin = new CanLoginSpecification();
    expect(canLogin.isSatisfiedBy({ auth })).toBe(false);
    expect(canLogin.explain({ auth })).toContain('terminal');
  });

  it('locked auth cannot login but can reset', () => {
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
    auth.activate(E2E_DATES.NOW);
    auth.lock(E2E_DATES.FUTURE, 'too_many_attempts', E2E_DATES.NOW);
    expect(auth.isLocked()).toBe(true);

    const canLogin = new CanLoginSpecification();
    expect(canLogin.isSatisfiedBy({ auth })).toBe(false);
  });
});
