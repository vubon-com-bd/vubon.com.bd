/**
 * Final Coverage Gap Fill — Targets remaining uncovered functions
 * @module identity-service/test/unit/domain
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { SessionEntity } from '@domain/entities/session.entity.js';
import { TokenEntity } from '@domain/entities/token.entity.js';
import { MfaEntity } from '@domain/entities/mfa.entity.js';
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { VerificationEntity } from '@domain/entities/verification.entity.js';
import { AccountLockEntity } from '@domain/entities/account-lock.entity.js';
import { LoginAttemptEntity } from '@domain/entities/login-attempt.entity.js';
import { CredentialEntity } from '@domain/entities/credential.entity.js';
import { BackupCodeEntity } from '@domain/entities/backup-code.entity.js';
import { SocialAccountEntity } from '@domain/entities/social-account.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { LoginAttemptStatusVO } from '@domain/value-objects/primitives/login-attempt-status.vo.js';
import { PasswordHashVO } from '@domain/value-objects/primitives/password-hash.vo.js';
import { BackupCodeVO } from '@domain/value-objects/primitives/backup-code.vo.js';
import { SocialProviderVO } from '@domain/value-objects/primitives/social-provider.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';
import { TEST_IDS, TEST_EMAIL, TEST_MFA_SECRET, TEST_FINGERPRINT, TEST_DATES } from '@fixtures/index';

const VALID_HASH = '$2b$12$' + 'a'.repeat(53);
const NOW_MS = Date.now();
const FAR_FUTURE_EPOCH = Math.floor((NOW_MS + 30 * 86400_000) / 1000);
const PAST_ISO = new Date(NOW_MS - 86400_000).toISOString();
const FAR_FUTURE_ISO = new Date(NOW_MS + 30 * 86400_000).toISOString();
const FUTURE_ISO = new Date(NOW_MS + 3600_000).toISOString();

describe('Coverage Final Gap Fill', () => {
  describe('AuthEntity — remaining getters + methods', () => {
    it('changePassword emits event', () => {
      const a = AuthEntity.create({
        id: AuthIdVO.create(TEST_IDS.AUTH_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          identifier: IdentifierVO.email(TEST_EMAIL),
        },
        now: TEST_DATES.NOW,
      });
      a.pullDomainEvents();
      a.changePassword('tester');
      expect(a.pullDomainEvents().length).toBe(1);
    });

    it('exposes readonly ownerId + identifier + provider + method + type', () => {
      const a = AuthEntity.create({
        id: AuthIdVO.create(TEST_IDS.AUTH_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          identifier: IdentifierVO.email(TEST_EMAIL),
        },
        now: TEST_DATES.NOW,
      });
      expect(a.userId.value).toBe(TEST_IDS.USER_ID);
      expect(a.type.value).toBe('password');
      expect(a.provider.value).toBe('local');
      expect(a.method.value).toBe('email_password');
      expect(a.identifier.value.normalized).toBe(TEST_EMAIL.toLowerCase());
    });

    it('isFinal for expired', () => {
      const a = AuthEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          status: AuthStatusVO.expired(),
          identifier: IdentifierVO.email(TEST_EMAIL),
          isEmailVerified: true,
          isPhoneVerified: false,
          isMfaEnabled: false,
          failedAttempts: 0,
        },
      });
      expect(a.isExpired()).toBe(true);
      expect(a.isFinal()).toBe(true);
    });
  });

  describe('VerificationEntity — remaining branches', () => {
    it('userId + channel + purpose + code getters', () => {
      const v = VerificationEntity.create({
        id: VerificationIdVO.create(TEST_IDS.VERIFICATION_ID),
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          target: IdentifierVO.email(TEST_EMAIL),
          channel: VerificationChannelVO.email(),
          purpose: VerificationPurposeVO.emailVerify(),
          code: OtpCodeVO.create('123456'),
          maxAttempts: 5,
          maxResend: 3,
          expiresAt: FAR_FUTURE_ISO,
        },
        now: TEST_DATES.NOW,
      });
      expect(v.userId.value).toBe(TEST_IDS.USER_ID);
      expect(v.channel.isEmail()).toBe(true);
      expect(v.purpose.isEmailVerify()).toBe(true);
      expect(v.code?.value).toBe('123456');
      expect(v.target.normalized).toBe(TEST_EMAIL.toLowerCase());
    });
  });

  describe('SessionEntity — remaining branches', () => {
    it('isRevoked getter', () => {
      const s = SessionEntity.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: FAR_FUTURE_EPOCH,
            idleTimeoutSeconds: 1800,
          }),
          rememberMe: false,
        },
        now: TEST_DATES.NOW,
      });
      s.revoke('test');
      expect(s.revokedAt).toBeDefined();
      expect(s.revokedReason).toBe('test');
      expect(s.status.isRevoked()).toBe(true);
    });

    it('refresh updates refreshedAt', () => {
      const s = SessionEntity.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: FAR_FUTURE_EPOCH,
            idleTimeoutSeconds: 1800,
          }),
          rememberMe: false,
        },
        now: TEST_DATES.NOW,
      });
      s.pullDomainEvents();
      const newExpiry = SessionExpiryVO.create({
        absoluteExpiresAt: FAR_FUTURE_EPOCH,
        idleTimeoutSeconds: 3600,
      });
      s.refresh(newExpiry);
      expect(s.refreshedAt).toBeDefined();
    });
  });

  describe('TokenEntity — remaining branches', () => {
    it('refresh token type getters', () => {
      const t = TokenEntity.create({
        id: TokenIdVO.create(TEST_IDS.TOKEN_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          sessionId: SessionIdVO.create(TEST_IDS.SESSION_ID),
          type: TokenTypeVO.refresh(),
          value: TokenValueVO.create('a'.repeat(64)),
          expiry: TokenExpiryVO.fromEpochSeconds(FAR_FUTURE_EPOCH),
          jti: TEST_IDS.JTI,
        },
        now: TEST_DATES.NOW,
      });
      expect(t.type.isRefresh()).toBe(true);
      expect(t.expiry.expiresAt).toBeGreaterThan(0);
      expect(t.value.value).toBe('a'.repeat(64));
    });
  });

  describe('MfaEntity — remaining branches', () => {
    it('recordFailedAttempt + resetFailedAttempts', () => {
      const m = MfaEntity.create({
        id: MfaIdVO.create(TEST_IDS.MFA_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        method: MfaMethodVO.totp(),
        secret: MfaSecretVO.create(TEST_MFA_SECRET),
        now: TEST_DATES.NOW,
      });
      m.markVerified();
      m.recordFailedAttempt();
      m.recordFailedAttempt();
      expect(m.failedAttempts).toBe(2);
      m.resetFailedAttempts();
      expect(m.failedAttempts).toBe(0);
    });

    it('disable sets disabledAt', () => {
      const m = MfaEntity.create({
        id: MfaIdVO.create(TEST_IDS.MFA_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        method: MfaMethodVO.totp(),
        secret: MfaSecretVO.create(TEST_MFA_SECRET),
        now: TEST_DATES.NOW,
      });
      m.markVerified();
      m.enable();
      m.disable();
      expect(m.enabled).toBe(false);
      expect(m.disabledAt).toBeDefined();
    });
  });

  describe('DeviceEntity — remaining branches', () => {
    it('touchActive updates lastActiveAt', () => {
      const d = DeviceEntity.create({
        id: DeviceIdVO.create(TEST_IDS.DEVICE_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: DeviceTypeVO.mobile(),
          fingerprint: DeviceFingerprintVO.create(TEST_FINGERPRINT),
        },
        now: TEST_DATES.NOW,
      });
      const before = d.lastActiveAt;
      d.touchActive(FAR_FUTURE_ISO);
      expect(d.lastActiveAt).toBe(FAR_FUTURE_ISO);
      expect(d.lastActiveAt).not.toBe(before);
    });

    it('trust sets trustedUntil + trusted=true', () => {
      const d = DeviceEntity.create({
        id: DeviceIdVO.create(TEST_IDS.DEVICE_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: DeviceTypeVO.mobile(),
          fingerprint: DeviceFingerprintVO.create(TEST_FINGERPRINT),
        },
        now: TEST_DATES.NOW,
      });
      d.trust(FAR_FUTURE_ISO);
      expect(d.trusted).toBe(true);
      expect(d.trustedUntil).toBe(FAR_FUTURE_ISO);
      expect(d.isTrustActive()).toBe(true);
    });
  });

  describe('CredentialEntity — remaining', () => {
    it('changePassword adds to history', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(VALID_HASH),
        now: TEST_DATES.NOW,
      });
      const newHash = PasswordHashVO.create('$2b$12$' + 'b'.repeat(53));
      c.changePassword(newHash, undefined, 5);
      expect(c.previousHashes.length).toBe(1);
      expect(c.passwordHash.value).toBe(newHash.value);
    });

    it('mustChangePassword flag', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(VALID_HASH),
        mustChangePassword: true,
        now: TEST_DATES.NOW,
      });
      expect(c.mustChangePassword).toBe(true);
    });
  });

  describe('BackupCodeEntity — markUsed', () => {
    it('markUsed updates usedAt', () => {
      const bc = BackupCodeEntity.create({
        id: TEST_IDS.BACKUP_CODE_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        code: BackupCodeVO.create('ABCD1234EF'),
        now: TEST_DATES.NOW,
      });
      bc.markUsed();
      expect(bc.used).toBe(true);
      expect(bc.usedAt).toBeDefined();
    });
  });

  describe('LoginAttemptEntity — getters', () => {
    it('attemptedAt + failureReason', () => {
      const la = LoginAttemptEntity.create({
        id: TEST_IDS.LOGIN_ATTEMPT_ID,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          identifier: IdentifierVO.email(TEST_EMAIL),
          status: LoginAttemptStatusVO.failed(),
          ipAddress: IpAddressVO.create('192.168.1.1'),
          userAgent: UserAgentVO.create('Mozilla/5.0'),
          failureReason: 'invalid_password',
          attemptedAt: TEST_DATES.NOW,
        },
        now: TEST_DATES.NOW,
      });
      expect(la.attemptedAt).toBe(TEST_DATES.NOW);
      expect(la.failureReason).toBe('invalid_password');
      expect(la.userAgent).toBeDefined();
    });
  });

  describe('AccountLockEntity — unlock', () => {
    it('unlock sets unlockedAt + unlockedBy', () => {
      const l = AccountLockEntity.create({
        id: TEST_IDS.ACCOUNT_LOCK_ID,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          reason: LockReasonVO.create('too_many_attempts'),
          duration: LockDurationVO.fromSeconds(900),
          attemptCount: 5,
          lockedAt: TEST_DATES.NOW,
          lockedUntil: FUTURE_ISO,
        },
        now: TEST_DATES.NOW,
      });
      l.unlock(TEST_IDS.USER_ID);
      expect(l.unlockedAt).toBeDefined();
      expect(l.unlockedBy).toBe(TEST_IDS.USER_ID);
    });
  });

  describe('SocialAccountEntity — markUsed + deactivate', () => {
    it('markUsed updates lastUsedAt', () => {
      const s = SocialAccountEntity.create({
        id: TEST_IDS.SOCIAL_ACCOUNT_ID,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          provider: SocialProviderVO.google(),
          providerUserId: 'google-uid',
        },
        now: TEST_DATES.NOW,
      });
      s.markUsed(FAR_FUTURE_ISO);
      expect(s.lastUsedAt).toBe(FAR_FUTURE_ISO);
    });

    it('deactivate sets isActive false', () => {
      const s = SocialAccountEntity.create({
        id: TEST_IDS.SOCIAL_ACCOUNT_ID,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          provider: SocialProviderVO.google(),
          providerUserId: 'google-uid',
        },
        now: TEST_DATES.NOW,
      });
      s.deactivate();
      expect(s.isActive).toBe(false);
    });
  });
});
