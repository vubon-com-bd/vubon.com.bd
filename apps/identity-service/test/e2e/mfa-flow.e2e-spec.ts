/**
 * E2E — MFA Flow: enable → verify → backup codes → use backup code
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { MfaEntity } from '@domain/entities/mfa.entity.js';
import { BackupCodeEntity } from '@domain/entities/backup-code.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { BackupCodeVO } from '@domain/value-objects/primitives/backup-code.vo.js';
import { BackupCodeService } from '@domain/services/backup-code.service.js';
import { MfaChallengeService } from '@domain/services/mfa-challenge.service.js';
import { CanEnableMfaSpecification } from '@domain/specifications/can-enable-mfa.specification.js';
import { CanDisableMfaSpecification } from '@domain/specifications/can-disable-mfa.specification.js';
import {
  E2E_IDS,
  E2E_CONSTANTS,
  E2E_DATES,
  E2EEventCollector,
} from './setup/e2e-fixtures.js';
import { activeLocalAuth } from '@fixtures/index';

describe('E2E — MFA Flow', () => {
  it('enable MFA: check eligibility → setup → verify → enable → backup codes', () => {
    const events = new E2EEventCollector();
    const auth = activeLocalAuth();
    auth.pullDomainEvents();

    // Step 1: Check eligibility
    const enableSpec = new CanEnableMfaSpecification();
    expect(
      enableSpec.isSatisfiedBy({
        auth,
        context: { method: 'totp', secretProvisioned: true },
      }),
    ).toBe(true);

    // Step 2: Create MFA entity (unverified)
    const mfa = MfaEntity.create({
      id: MfaIdVO.create(E2E_IDS.MFA),
      authId: AuthIdVO.create(E2E_IDS.AUTH),
      method: MfaMethodVO.totp(),
      secret: MfaSecretVO.create(E2E_CONSTANTS.MFA_SECRET),
      now: E2E_DATES.NOW,
    });
    mfa.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(mfa.verified).toBe(false);
    expect(mfa.enabled).toBe(false);

    // Step 3: Verify
    mfa.markVerified(E2E_DATES.NOW);
    mfa.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(mfa.verified).toBe(true);

    // Step 4: Enable
    mfa.enable(E2E_DATES.NOW);
    mfa.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(mfa.isEnabledAndVerified()).toBe(true);

    // Step 5: Enable on auth
    auth.enableMfa('totp', E2E_DATES.NOW);
    auth.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(auth.isMfaEnabled).toBe(true);

    // Step 6: Generate backup codes
    const codes = BackupCodeService.generate(10);
    expect(codes.length).toBe(10);
    expect(new Set(codes).size).toBe(10); // unique

    // Step 7: Create backup code entities
    const backupCodeEntities = codes.map((code, i) =>
      BackupCodeEntity.create({
        id: `${E2E_IDS.AUTH.slice(0, -4)}${String(i).padStart(4, '0')}`,
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        code: BackupCodeVO.create(code),
        now: E2E_DATES.NOW,
      }),
    );
    expect(backupCodeEntities.length).toBe(10);
    backupCodeEntities.forEach((bc) => expect(bc.used).toBe(false));

    // Step 8: Events
    expect(events.countByType('identity.mfa.setup_started')).toBe(1);
    expect(events.countByType('identity.mfa.verified')).toBe(1);
    expect(events.countByType('identity.mfa.enabled')).toBe(1);
    expect(events.countByType('identity.auth.mfa_enabled')).toBe(1);
  });

  it('disable MFA requires identity proof', () => {
    const auth = activeLocalAuth();
    auth.enableMfa('totp', E2E_DATES.NOW);

    const disableSpec = new CanDisableMfaSpecification();
    // No proof → fail
    expect(disableSpec.isSatisfiedBy({ auth, context: {} })).toBe(false);
    // Password provided → pass
    expect(
      disableSpec.isSatisfiedBy({
        auth,
        context: { currentPasswordProvided: true },
      }),
    ).toBe(true);

    // Disable
    auth.disableMfa('totp', E2E_DATES.NOW);
    expect(auth.isMfaEnabled).toBe(false);
  });

  it('MFA challenge tracking: attempts + expiry', () => {
    const challenge = {
      attempts: 0,
      maxAttempts: MfaChallengeService.maxAttempts(),
      expiresAtMs: Date.now() + 60000,
    };

    // Active initially
    expect(MfaChallengeService.isChallengeActive(challenge)).toBe(true);

    // Fail attempts
    let c = challenge;
    for (let i = 0; i < MfaChallengeService.maxAttempts() - 1; i++) {
      c = MfaChallengeService.recordAttempt(c);
    }
    expect(c.attempts).toBe(MfaChallengeService.maxAttempts() - 1);

    // Last attempt throws
    expect(() => MfaChallengeService.recordAttempt(c)).toThrow();
  });

  it('backup code usage flags low count', () => {
    expect(BackupCodeService.isLow(2)).toBe(true);
    expect(BackupCodeService.isLow(5)).toBe(false);
    expect(BackupCodeService.isExhausted(0)).toBe(true);
  });

  it('strong methods recognized correctly', () => {
    expect(MfaChallengeService.isStrongMethod('totp')).toBe(true);
    expect(MfaChallengeService.isStrongMethod('webauthn')).toBe(true);
    expect(MfaChallengeService.isStrongMethod('sms')).toBe(false);
    expect(MfaChallengeService.isStrongMethod('email')).toBe(false);
  });
});
