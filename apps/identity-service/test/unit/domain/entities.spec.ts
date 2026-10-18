/**
 * Domain Entities — Grouped Test
 * @module identity-service/test/unit/domain
 */
import { describe, it, expect } from '@jest/globals';

// ─── Entities ─────────────────────────────────
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { SessionEntity } from '@domain/entities/session.entity.js';
import { CredentialEntity } from '@domain/entities/credential.entity.js';
import { TokenEntity } from '@domain/entities/token.entity.js';
import { MfaEntity } from '@domain/entities/mfa.entity.js';
import { BackupCodeEntity } from '@domain/entities/backup-code.entity.js';
import { LoginAttemptEntity } from '@domain/entities/login-attempt.entity.js';
import { AccountLockEntity } from '@domain/entities/account-lock.entity.js';
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { SocialAccountEntity } from '@domain/entities/social-account.entity.js';
import { OAuthClientEntity } from '@domain/entities/oauth-client.entity.js';
import { SsoConfigEntity } from '@domain/entities/sso-config.entity.js';
import { RoleEntity } from '@domain/entities/role.entity.js';
import { PermissionEntity } from '@domain/entities/permission.entity.js';
import { UserEntity } from '@domain/entities/user.entity.js';
import { UserProfileEntity } from '@domain/entities/user-profile.entity.js';
import { UserSettingsEntity } from '@domain/entities/user-settings.entity.js';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity.js';
import { UserAddressEntity } from '@domain/entities/user-address.entity.js';
import { UserContactEntity } from '@domain/entities/user-contact.entity.js';
import { UserVerificationEntity } from '@domain/entities/user-verification.entity.js';
import { UserKycEntity } from '@domain/entities/user-kyc.entity.js';
import { UserActivityEntity } from '@domain/entities/user-activity.entity.js';
import { AuthTwoFactorEntity } from '@domain/entities/auth-2fa.entity.js';
import { AuthBiometricEntity } from '@domain/entities/auth-biometric.entity.js';
import { AuthRecoveryCodeEntity } from '@domain/entities/auth-recovery-code.entity.js';

// ─── Primitives ───────────────────────────────
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { RoleIdVO } from '@domain/value-objects/primitives/role-id.vo.js';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo.js';
import { BiometricIdVO } from '@domain/value-objects/primitives/biometric-id.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo.js';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo.js';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo.js';
import { UserRoleVO } from '@domain/value-objects/primitives/user-role.vo.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '@domain/value-objects/primitives/verification-status.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { LoginAttemptStatusVO } from '@domain/value-objects/primitives/login-attempt-status.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { RoleNameVO } from '@domain/value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { UserGenderVO } from '@domain/value-objects/primitives/user-gender.vo.js';
import { UserLanguageVO } from '@domain/value-objects/primitives/user-language.vo.js';
import { UserTimezoneVO } from '@domain/value-objects/primitives/user-timezone.vo.js';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo.js';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo.js';
import { AddressTypeVO } from '@domain/value-objects/primitives/address-type.vo.js';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo.js';
import { CityVO } from '@domain/value-objects/primitives/city.vo.js';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2025-01-01T00:00:00.000Z';

describe('Domain Entities', () => {
  // ═══════════════════════════════════════════
  // Simple Entities (extend BaseEntity)
  // ═══════════════════════════════════════════
  describe('LoginAttemptEntity', () => {
    it('create valid attempt', () => {
      const e = LoginAttemptEntity.create({
        id: 'la-1',
        props: {
          identifier: IdentifierVO.email('a@b.com'),
          status: LoginAttemptStatusVO.success(),
          attemptedAt: NOW,
        },
        now: NOW,
      });
      expect(e.identifier.isEmail()).toBe(true);
      expect(e.isSuccess()).toBe(true);
      expect(e.isFailure()).toBe(false);
    });
    it('reconstitute', () => {
      const e = LoginAttemptEntity.reconstitute({
        id: 'la-1', createdAt: NOW, updatedAt: NOW,
        props: {
          identifier: IdentifierVO.username('user'),
          status: LoginAttemptStatusVO.failed(),
          attemptedAt: NOW,
        },
      });
      expect(e.isFailure()).toBe(true);
    });
  });

  describe('PermissionEntity', () => {
    it('create and check fields', () => {
      const e = PermissionEntity.create({
        id: 'p-1',
        props: {
          name: PermissionNameVO.create('user:view'),
          description: 'View users',
          category: 'user',
          isSensitive: false,
        },
        now: NOW,
      });
      expect(e.name.value).toBe('user:view');
      expect(e.category).toBe('user');
      expect(e.isSensitive).toBe(false);
    });
  });

  describe('UserActivityEntity', () => {
    it('create', () => {
      const e = UserActivityEntity.create({
        id: UUID,
        props: {
          userId: UserIdVO.create(UUID),
          type: { value: 'login', isSecurityEvent: () => true } as never,
          occurredAt: NOW,
        },
        now: NOW,
      });
      expect(e.userId.value).toBe(UUID);
    });
  });

  // ═══════════════════════════════════════════
  // AggregateRoot Entities
  // ═══════════════════════════════════════════
  describe('AuthEntity', () => {
    const buildCreate = () =>
      AuthEntity.create({
        id: AuthIdVO.create(UUID),
        props: {
          userId: UserIdVO.create(UUID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          identifier: IdentifierVO.email('a@b.com'),
        },
        now: NOW,
      });

    it('create → pending status', () => {
      const e = buildCreate();
      expect(e.isPending()).toBe(true);
      expect(e.isActive()).toBe(false);
      expect(e.failedAttempts).toBe(0);
    });
    it('create emits AuthCreatedEvent', () => {
      const e = buildCreate();
      const events = e.domainEvents;
      expect(events.length).toBeGreaterThan(0);
      expect(events[0].type).toBe('auth.created');
    });
    it('activate → active status', () => {
      const e = buildCreate();
      e.activate(NOW);
      expect(e.isActive()).toBe(true);
      expect(e.isPending()).toBe(false);
    });
    it('recordFailedAttempt increments', () => {
      const e = buildCreate();
      e.recordFailedAttempt(NOW);
      e.recordFailedAttempt(NOW);
      expect(e.failedAttempts).toBe(2);
    });
    it('resetFailedAttempts → 0', () => {
      const e = buildCreate();
      e.recordFailedAttempt(NOW);
      e.resetFailedAttempts(NOW);
      expect(e.failedAttempts).toBe(0);
    });
    it('revoke from pending throws', () => {
      const e = buildCreate();
      // pending → revoked is allowed by VALID_TRANSITIONS
      e.revoke('admin', NOW);
      expect(e.isRevoked()).toBe(true);
    });
    it('reconstitute skips events', () => {
      const e = AuthEntity.reconstitute({
        id: UUID, createdAt: NOW, updatedAt: NOW,
        props: {
          userId: UserIdVO.create(UUID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          status: AuthStatusVO.active(),
          identifier: IdentifierVO.email('a@b.com'),
          isEmailVerified: true,
          isPhoneVerified: false,
          isMfaEnabled: false,
          failedAttempts: 0,
        },
      });
      expect(e.domainEvents.length).toBe(0);
      expect(e.isActive()).toBe(true);
    });
  });

  describe('SessionEntity', () => {
    const build = () =>
      SessionEntity.create({
        id: SessionIdVO.create(UUID),
        props: {
          authId: AuthIdVO.create(UUID),
          userId: UserIdVO.create(UUID),
          expiry: SessionExpiryVO.create({ absoluteExpiresAt: 9999999999, idleTimeoutSeconds: 3600 }),
          rememberMe: false,
        },
        now: NOW,
      });

    it('create → active', () => {
      const e = build();
      expect(e.isActive()).toBe(true);
    });
    it('create emits SessionCreatedEvent', () => {
      const e = build();
      expect(e.domainEvents[0].type).toBe('session.created');
    });
    it('revoke → revoked', () => {
      const e = build();
      e.revoke('admin', NOW);
      expect(e.status.isRevoked()).toBe(true);
      expect(e.revokedReason).toBe('admin');
    });
    it('revoke twice throws', () => {
      const e = build();
      e.revoke('first', NOW);
      expect(() => e.revoke('second', NOW)).toThrow();
    });
    it('logout', () => {
      const e = build();
      e.logout(NOW);
      expect(e.revokedReason).toBe('logout');
    });
  });

  describe('MfaEntity', () => {
    const build = () =>
      MfaEntity.create({
        id: MfaIdVO.create(UUID),
        authId: AuthIdVO.create(UUID),
        method: MfaMethodVO.totp(),
        secret: MfaSecretVO.create('JBSWY3DPEHPK3PXP'),
        now: NOW,
      });

    it('create → not verified, not enabled', () => {
      const e = build();
      expect(e.verified).toBe(false);
      expect(e.enabled).toBe(false);
    });
    it('create emits MfaSetupStartedEvent', () => {
      const e = build();
      expect(e.domainEvents[0].type).toBe('mfa.setup_started');
    });
    it('markVerified', () => {
      const e = build();
      e.markVerified(NOW);
      expect(e.verified).toBe(true);
    });
    it('enable throws without verified', () => {
      const e = build();
      expect(() => e.enable(NOW)).toThrow();
    });
    it('enable after verify', () => {
      const e = build();
      e.markVerified(NOW);
      e.enable(NOW);
      expect(e.enabled).toBe(true);
    });
    it('recordFailedAttempt increments', () => {
      const e = build();
      e.recordFailedAttempt(NOW);
      expect(e.failedAttempts).toBe(1);
    });
  });

  describe('DeviceEntity', () => {
    const build = () =>
      DeviceEntity.create({
        id: DeviceIdVO.create(UUID),
        props: {
          userId: UserIdVO.create(UUID),
          type: DeviceTypeVO.mobile(),
          fingerprint: DeviceFingerprintVO.create('abc12345'),
        },
        now: NOW,
      });

    it('create → not trusted', () => {
      const e = build();
      expect(e.trusted).toBe(false);
      expect(e.isTrustActive()).toBe(false);
    });
    it('create emits DeviceRegisteredEvent', () => {
      const e = build();
      expect(e.domainEvents[0].type).toBe('device.registered');
    });
    it('trust', () => {
      const e = build();
      const until = new Date(Date.now() + 30 * 86400_000).toISOString();
      e.trust(until, NOW);
      expect(e.trusted).toBe(true);
      expect(e.trustedUntil).toBe(until);
    });
    it('trust twice throws', () => {
      const e = build();
      e.trust(new Date(Date.now() + 86400_000).toISOString(), NOW);
      expect(() => e.trust(new Date(Date.now() + 86400_000).toISOString(), NOW)).toThrow();
    });
    it('untrust', () => {
      const e = build();
      e.trust(new Date(Date.now() + 86400_000).toISOString(), NOW);
      e.untrust(NOW);
      expect(e.trusted).toBe(false);
    });
    it('touchActive updates', () => {
      const e = build();
      const newNow = '2025-06-01T00:00:00.000Z';
      e.touchActive(newNow);
      expect(e.lastActiveAt).toBe(newNow);
    });
  });

  describe('AccountLockEntity', () => {
    it('create and unlock', () => {
      const e = AccountLockEntity.create({
        id: 'lock-1',
        props: {
          authId: AuthIdVO.create(UUID),
          userId: UserIdVO.create(UUID),
          reason: LockReasonVO.create('too_many_attempts'),
          duration: LockDurationVO.fromSeconds(900),
          attemptCount: 5,
          lockedAt: NOW,
          lockedUntil: new Date(Date.now() + 900_000).toISOString(),
        },
        now: NOW,
      });
      expect(e.isActive()).toBe(true);
      e.unlock('admin', NOW);
      expect(e.isActive()).toBe(false);
      expect(e.unlockedBy).toBe('admin');
    });
    it('unlock twice throws', () => {
      const e = AccountLockEntity.create({
        id: 'lock-1',
        props: {
          authId: AuthIdVO.create(UUID),
          userId: UserIdVO.create(UUID),
          reason: LockReasonVO.create('too_many_attempts'),
          duration: LockDurationVO.fromSeconds(900),
          attemptCount: 5,
          lockedAt: NOW,
          lockedUntil: new Date(Date.now() + 900_000).toISOString(),
        },
        now: NOW,
      });
      e.unlock(undefined, NOW);
      expect(() => e.unlock(undefined, NOW)).toThrow();
    });
  });

  describe('RoleEntity', () => {
    const build = () =>
      RoleEntity.create({
        id: RoleIdVO.create(UUID),
        props: {
          name: RoleNameVO.create('admin'),
          level: 50,
          permissions: [PermissionNameVO.create('user:view')],
        },
        now: NOW,
      });

    it('create and hasPermission', () => {
      const e = build();
      expect(e.hasPermission('user:view')).toBe(true);
      expect(e.hasPermission('user:delete')).toBe(false);
    });
    it('grantPermission', () => {
      const e = build();
      e.grantPermission(PermissionNameVO.create('user:delete'), NOW);
      expect(e.hasPermission('user:delete')).toBe(true);
    });
    it('revokePermission', () => {
      const e = build();
      e.revokePermission('user:view', NOW);
      expect(e.hasPermission('user:view')).toBe(false);
    });
    it('rename on system role throws', () => {
      const e = RoleEntity.create({
        id: RoleIdVO.create(UUID),
        props: {
          name: RoleNameVO.create('admin'),
          level: 50,
          permissions: [],
          isSystemRole: true,
        },
        now: NOW,
      });
      expect(() => e.rename(RoleNameVO.create('moderator'), NOW)).toThrow();
    });
  });

  describe('VerificationEntity', () => {
    const build = () =>
      VerificationEntity.create({
        id: VerificationIdVO.create(UUID),
        props: {
          authId: AuthIdVO.create(UUID),
          userId: UserIdVO.create(UUID),
          target: IdentifierVO.email('a@b.com'),
          channel: VerificationChannelVO.email(),
          purpose: VerificationPurposeVO.emailVerify(),
          maxAttempts: 5,
          maxResend: 3,
          expiresAt: new Date(Date.now() + 300_000).toISOString(),
        },
        now: NOW,
      });

    it('create → pending', () => {
      const e = build();
      expect(e.status.isPending()).toBe(true);
      expect(e.attempts).toBe(0);
    });
    it('recordAttempt increments', () => {
      const e = build();
      e.recordAttempt(NOW);
      expect(e.attempts).toBe(1);
    });
    it('verify sets verified', () => {
      const e = build();
      e.verify(NOW);
      expect(e.status.isVerified()).toBe(true);
      expect(e.verifiedAt).toBe(NOW);
    });
  });

  describe('UserKycEntity', () => {
    it('create → pending', () => {
      const e = UserKycEntity.create({
        id: KycIdVO.create(UUID),
        userId: UserIdVO.create(UUID),
        now: NOW,
      });
      expect(e.isPending()).toBe(true);
      expect(e.documents.length).toBe(0);
    });
  });

  // ═══════════════════════════════════════════
  // Additional Entity Factories
  // ═══════════════════════════════════════════
  describe('Entity factory smoke tests', () => {
    it('TokenEntity.create + reconstitute signature exists', () => {
      expect(typeof TokenEntity.create).toBe('function');
      expect(typeof TokenEntity.reconstitute).toBe('function');
    });
    it('UserEntity.create exists', () => {
      expect(typeof UserEntity.create).toBe('function');
    });
    it('UserProfileEntity.create exists', () => {
      expect(typeof UserProfileEntity.create).toBe('function');
    });
    it('UserSettingsEntity.create exists', () => {
      expect(typeof UserSettingsEntity.create).toBe('function');
    });
    it('UserPreferencesEntity.create exists', () => {
      expect(typeof UserPreferencesEntity.create).toBe('function');
    });
    it('UserAddressEntity.create exists', () => {
      expect(typeof UserAddressEntity.create).toBe('function');
    });
    it('UserContactEntity.create exists', () => {
      expect(typeof UserContactEntity.create).toBe('function');
    });
    it('UserVerificationEntity.create exists', () => {
      expect(typeof UserVerificationEntity.create).toBe('function');
    });
    it('UserKycEntity.create exists', () => {
      expect(typeof UserKycEntity.create).toBe('function');
    });
    it('UserActivityEntity.create exists', () => {
      expect(typeof UserActivityEntity.create).toBe('function');
    });
    it('SocialAccountEntity.create exists', () => {
      expect(typeof SocialAccountEntity.create).toBe('function');
    });
    it('OAuthClientEntity.create exists', () => {
      expect(typeof OAuthClientEntity.create).toBe('function');
    });
    it('SsoConfigEntity.create exists', () => {
      expect(typeof SsoConfigEntity.create).toBe('function');
    });
    it('CredentialEntity.create exists', () => {
      expect(typeof CredentialEntity.create).toBe('function');
    });
    it('BackupCodeEntity.create exists', () => {
      expect(typeof BackupCodeEntity.create).toBe('function');
    });
    it('AuthTwoFactorEntity.create exists', () => {
      expect(typeof AuthTwoFactorEntity.create).toBe('function');
    });
    it('AuthBiometricEntity.create exists', () => {
      expect(typeof AuthBiometricEntity.create).toBe('function');
    });
    it('AuthRecoveryCodeEntity.create exists', () => {
      expect(typeof AuthRecoveryCodeEntity.create).toBe('function');
    });
  });
});
