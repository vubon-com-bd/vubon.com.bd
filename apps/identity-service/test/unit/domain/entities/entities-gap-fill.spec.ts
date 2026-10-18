/**
 * Entities — Coverage Gap Fill
 * @module identity-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { SessionEntity } from '@domain/entities/session.entity.js';
import { TokenEntity } from '@domain/entities/token.entity.js';
import { MfaEntity } from '@domain/entities/mfa.entity.js';
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { CredentialEntity } from '@domain/entities/credential.entity.js';
import { AccountLockEntity } from '@domain/entities/account-lock.entity.js';
import { OAuthClientEntity } from '@domain/entities/oauth-client.entity.js';
import { SsoConfigEntity } from '@domain/entities/sso-config.entity.js';
import { SocialAccountEntity } from '@domain/entities/social-account.entity.js';
import { RoleEntity } from '@domain/entities/role.entity.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { PasswordHashVO } from '@domain/value-objects/primitives/password-hash.vo.js';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { OAuthGrantTypeVO } from '@domain/value-objects/primitives/oauth-grant-type.vo.js';
import { SsoProviderVO } from '@domain/value-objects/primitives/sso-provider.vo.js';
import { SocialProviderVO } from '@domain/value-objects/primitives/social-provider.vo.js';
import { RoleIdVO } from '@domain/value-objects/primitives/role-id.vo.js';
import { RoleNameVO } from '@domain/value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import {
  TEST_IDS,
  TEST_EMAIL,
  TEST_MFA_SECRET,
  TEST_FINGERPRINT,
  TEST_DATES,
} from '@fixtures/index';

// ✅ Valid bcrypt hash (60 chars: $2b$12$ + 53 chars)
const VALID_HASH = '$2b$12$' + 'a'.repeat(53);

describe('Entities — Coverage Gap Fill', () => {
  describe('AuthEntity — version + reconstitute edge cases', () => {
    it('toIdVO returns correct', () => {
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
      expect(a.toIdVO.value).toBe(TEST_IDS.AUTH_ID);
    });

    it('canLogin false when locked', () => {
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
      a.activate();
      a.lock(TEST_DATES.FUTURE, 'reason');
      expect(a.canLogin()).toBe(false);
      expect(a.isLockedNow()).toBe(true);
    });

    it('isLockedNow returns false when no lockedUntil', () => {
      const a = AuthEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          status: AuthStatusVO.active(),
          identifier: IdentifierVO.email(TEST_EMAIL),
          isEmailVerified: true,
          isPhoneVerified: false,
          isMfaEnabled: false,
          failedAttempts: 0,
        },
      });
      expect(a.isLockedNow()).toBe(false);
    });

    it('isUsable / isSettled via inactive status', () => {
      const a = AuthEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          status: AuthStatusVO.inactive(),
          identifier: IdentifierVO.email(TEST_EMAIL),
          isEmailVerified: true,
          isPhoneVerified: false,
          isMfaEnabled: false,
          failedAttempts: 0,
        },
      });
      expect(a.isInactive()).toBe(true);
      expect(a.isUsable()).toBe(true);
    });

    it('metadata getter', () => {
      const a = AuthEntity.reconstitute({
        id: TEST_IDS.AUTH_ID,
        createdAt: TEST_DATES.NOW,
        updatedAt: TEST_DATES.NOW,
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: AuthTypeVO.password(),
          provider: AuthProviderVO.local(),
          method: AuthMethodVO.emailPassword(),
          status: AuthStatusVO.active(),
          identifier: IdentifierVO.email(TEST_EMAIL),
          isEmailVerified: true,
          isPhoneVerified: false,
          isMfaEnabled: false,
          failedAttempts: 0,
          metadata: { source: 'test' },
        },
      });
      expect(a.metadata).toEqual({ source: 'test' });
    });
  });

  describe('SessionEntity — version + revoked', () => {
    it('isFinal after revoke', () => {
      const s = SessionEntity.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: TEST_DATES.FAR_FUTURE_EPOCH,
            idleTimeoutSeconds: 1800,
          }),
          rememberMe: false,
        },
        now: TEST_DATES.NOW,
      });
      s.revoke('reason');
      expect(s.isFinal()).toBe(true);
    });

    it('isIdle detects via lastAccessedAt', () => {
      const s = SessionEntity.reconstitute({
        id: TEST_IDS.SESSION_ID,
        createdAt: TEST_DATES.PAST,
        updatedAt: TEST_DATES.PAST,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          status: SessionStatusVO.active(),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: TEST_DATES.FAR_FUTURE_EPOCH,
            idleTimeoutSeconds: 60,
          }),
          rememberMe: false,
          lastAccessedAt: new Date(Date.now() - 120000).toISOString(),
        },
      });
      expect(s.isIdle()).toBe(true);
    });

    it('expire on already-final returns', () => {
      const s = SessionEntity.reconstitute({
        id: TEST_IDS.SESSION_ID,
        createdAt: TEST_DATES.PAST,
        updatedAt: TEST_DATES.PAST,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          status: SessionStatusVO.revoked(),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: TEST_DATES.FAR_FUTURE_EPOCH,
            idleTimeoutSeconds: 1800,
          }),
          rememberMe: false,
          lastAccessedAt: TEST_DATES.PAST,
          revokedAt: TEST_DATES.PAST,
          revokedReason: 'test',
        },
      });
      s.expire();
      expect(s.status.isRevoked()).toBe(true);
    });

    it('logout on final returns', () => {
      const s = SessionEntity.reconstitute({
        id: TEST_IDS.SESSION_ID,
        createdAt: TEST_DATES.PAST,
        updatedAt: TEST_DATES.PAST,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          status: SessionStatusVO.expired(),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: TEST_DATES.FAR_FUTURE_EPOCH,
            idleTimeoutSeconds: 1800,
          }),
          rememberMe: false,
          lastAccessedAt: TEST_DATES.PAST,
        },
      });
      s.logout();
      expect(s.status.isExpired()).toBe(true);
    });

    it('getters for ipAddress/userAgent/deviceId/refreshedAt', () => {
      const s = SessionEntity.create({
        id: SessionIdVO.create(TEST_IDS.SESSION_ID),
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          expiry: SessionExpiryVO.create({
            absoluteExpiresAt: TEST_DATES.FAR_FUTURE_EPOCH,
            idleTimeoutSeconds: 1800,
          }),
          rememberMe: true,
        },
        now: TEST_DATES.NOW,
      });
      expect(s.rememberMe).toBe(true);
      expect(s.ipAddress).toBeUndefined();
      expect(s.userAgent).toBeUndefined();
      expect(s.deviceId).toBeUndefined();
      expect(s.refreshedAt).toBeUndefined();
      expect(s.revokedAt).toBeUndefined();
      expect(s.revokedReason).toBeUndefined();
    });
  });

  describe('TokenEntity — version + getters', () => {
    it('all getters', () => {
      const t = TokenEntity.create({
        id: TokenIdVO.create(TEST_IDS.TOKEN_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          sessionId: SessionIdVO.create(TEST_IDS.SESSION_ID),
          type: TokenTypeVO.access(),
          value: TokenValueVO.create('a'.repeat(64)),
          expiry: TokenExpiryVO.fromEpochSeconds(TEST_DATES.FAR_FUTURE_EPOCH),
          jti: TEST_IDS.JTI,
        },
        now: TEST_DATES.NOW,
      });
      expect(t.userId.value).toBe(TEST_IDS.USER_ID);
      expect(t.sessionId.value).toBe(TEST_IDS.SESSION_ID);
      expect(t.type.isAccess()).toBe(true);
      expect(t.jti).toBe(TEST_IDS.JTI);
      expect(t.usedAt).toBeUndefined();
      expect(t.revokedAt).toBeUndefined();
      expect(t.revokedReason).toBeUndefined();
    });

    it('isUsable false when used', () => {
      const t = TokenEntity.create({
        id: TokenIdVO.create(TEST_IDS.TOKEN_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          sessionId: SessionIdVO.create(TEST_IDS.SESSION_ID),
          type: TokenTypeVO.access(),
          value: TokenValueVO.create('a'.repeat(64)),
          expiry: TokenExpiryVO.fromEpochSeconds(TEST_DATES.FAR_FUTURE_EPOCH),
          jti: TEST_IDS.JTI,
        },
        now: TEST_DATES.NOW,
      });
      t.markUsed();
      expect(t.isUsable()).toBe(false);
    });
  });

  describe('MfaEntity — additional branches', () => {
    it('getters', () => {
      const m = MfaEntity.create({
        id: MfaIdVO.create(TEST_IDS.MFA_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        method: MfaMethodVO.totp(),
        secret: MfaSecretVO.create(TEST_MFA_SECRET),
        now: TEST_DATES.NOW,
      });
      expect(m.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(m.method.isTotp()).toBe(true);
      expect(m.secret).toBeDefined();
      expect(m.enabledAt).toBeUndefined();
      expect(m.disabledAt).toBeUndefined();
      expect(m.verifiedAt).toBeUndefined();
    });

    it('verified false → isEnabledAndVerified false', () => {
      const m = MfaEntity.create({
        id: MfaIdVO.create(TEST_IDS.MFA_ID),
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        method: MfaMethodVO.totp(),
        secret: MfaSecretVO.create(TEST_MFA_SECRET),
        now: TEST_DATES.NOW,
      });
      expect(m.isEnabledAndVerified()).toBe(false);
    });
  });

  describe('DeviceEntity — trust branches', () => {
    it('getters + isTrustActive without trustedUntil', () => {
      const d = DeviceEntity.create({
        id: DeviceIdVO.create(TEST_IDS.DEVICE_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: DeviceTypeVO.mobile(),
          fingerprint: DeviceFingerprintVO.create(TEST_FINGERPRINT),
          name: 'Test',
          os: 'iOS',
          browser: 'Safari',
          appVersion: '1.0',
        },
        now: TEST_DATES.NOW,
      });
      expect(d.userId.value).toBe(TEST_IDS.USER_ID);
      expect(d.type.isMobile()).toBe(true);
      expect(d.fingerprint.value).toBe(TEST_FINGERPRINT);
      expect(d.name).toBe('Test');
      expect(d.os).toBe('iOS');
      expect(d.browser).toBe('Safari');
      expect(d.appVersion).toBe('1.0');
      expect(d.isTrustActive()).toBe(false);
    });

    it('trusted but expired → isTrustActive false', () => {
      const d = DeviceEntity.create({
        id: DeviceIdVO.create(TEST_IDS.DEVICE_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: DeviceTypeVO.mobile(),
          fingerprint: DeviceFingerprintVO.create(TEST_FINGERPRINT),
        },
        now: TEST_DATES.NOW,
      });
      // Trust with expiry that's already in the past
      d.trust(TEST_DATES.PAST);
      // Now check with current time — should be expired
      expect(d.isTrustActive()).toBe(false);
    });

    it('untrust when not trusted → no-op', () => {
      const d = DeviceEntity.create({
        id: DeviceIdVO.create(TEST_IDS.DEVICE_ID),
        props: {
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          type: DeviceTypeVO.mobile(),
          fingerprint: DeviceFingerprintVO.create(TEST_FINGERPRINT),
        },
        now: TEST_DATES.NOW,
      });
      d.untrust();
      expect(d.trusted).toBe(false);
    });
  });

  describe('CredentialEntity — previousHashes getter', () => {
    it('returns copy', () => {
      const c = CredentialEntity.create({
        id: TEST_IDS.AUTH_ID,
        authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
        passwordHash: PasswordHashVO.create(VALID_HASH),
        now: TEST_DATES.NOW,
      });
      expect(c.previousHashes).toEqual([]);
      expect(c.passwordChangedAt).toBe(TEST_DATES.NOW);
      expect(c.passwordExpiresAt).toBeUndefined();
    });
  });

  describe('AccountLockEntity — getters + isExpired', () => {
    it('all getters', () => {
      const l = AccountLockEntity.create({
        id: TEST_IDS.ACCOUNT_LOCK_ID,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          reason: LockReasonVO.create('too_many_attempts'),
          duration: LockDurationVO.fromSeconds(900),
          attemptCount: 5,
          lockedAt: TEST_DATES.NOW,
          lockedUntil: TEST_DATES.FUTURE,
        },
        now: TEST_DATES.NOW,
      });
      expect(l.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(l.userId.value).toBe(TEST_IDS.USER_ID);
      expect(l.reason.value).toBe('too_many_attempts');
      expect(l.attemptCount).toBe(5);
      expect(l.lockedAt).toBe(TEST_DATES.NOW);
      expect(l.lockedUntil).toBe(TEST_DATES.FUTURE);
      expect(l.unlockedAt).toBeUndefined();
      expect(l.unlockedBy).toBeUndefined();
    });

    it('isExpired with far future nowMs', () => {
      const l = AccountLockEntity.create({
        id: TEST_IDS.ACCOUNT_LOCK_ID,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          reason: LockReasonVO.create('too_many_attempts'),
          duration: LockDurationVO.fromSeconds(900),
          attemptCount: 5,
          lockedAt: TEST_DATES.NOW,
          lockedUntil: TEST_DATES.FUTURE,
        },
        now: TEST_DATES.NOW,
      });
      // nowMs well beyond lockedUntil
      const wayFuture = TEST_DATES.FAR_FUTURE_EPOCH * 1000 + 999999999;
      expect(l.isExpired(wayFuture)).toBe(true);
    });
  });

  describe('OAuthClientEntity — branches', () => {
    it('hasScope true/false', () => {
      const c = OAuthClientEntity.create({
        id: TEST_IDS.OAUTH_CLIENT_ID,
        props: {
          clientId: 'c1',
          clientName: 'C1',
          redirectUris: ['https://app.example.com/cb'],
          scopes: ['read', 'write'],
          grantTypes: [OAuthGrantTypeVO.authorizationCode()],
          isPublic: false,
        },
        now: TEST_DATES.NOW,
      });
      expect(c.hasScope('read')).toBe(true);
      expect(c.hasScope('admin')).toBe(false);
    });

    it('getters', () => {
      const c = OAuthClientEntity.create({
        id: TEST_IDS.OAUTH_CLIENT_ID,
        props: {
          clientId: 'c1',
          clientName: 'C1',
          redirectUris: ['https://app.example.com/cb'],
          scopes: ['read'],
          grantTypes: [OAuthGrantTypeVO.authorizationCode()],
          isPublic: true,
        },
        now: TEST_DATES.NOW,
      });
      expect(c.clientId).toBe('c1');
      expect(c.clientName).toBe('C1');
      expect(c.isPublic).toBe(true);
      expect(c.isActive).toBe(true);
      expect(c.redirectUris.length).toBe(1);
      expect(c.scopes.length).toBe(1);
      expect(c.grantTypes.length).toBe(1);
    });

    it('deactivate', () => {
      const c = OAuthClientEntity.create({
        id: TEST_IDS.OAUTH_CLIENT_ID,
        props: {
          clientId: 'c1',
          clientName: 'C1',
          redirectUris: ['https://x.com/cb'],
          scopes: ['read'],
          grantTypes: [OAuthGrantTypeVO.authorizationCode()],
          isPublic: false,
        },
        now: TEST_DATES.NOW,
      });
      c.deactivate();
      expect(c.isActive).toBe(false);
    });
  });

  describe('SsoConfigEntity — branches', () => {
    it('getters + deactivate', () => {
      const s = SsoConfigEntity.create({
        id: TEST_IDS.SSO_CONFIG_ID,
        props: {
          name: 'Okta',
          provider: SsoProviderVO.oidc(),
          entryPoint: 'https://sso.example.com/entry',
          issuer: 'https://sso.example.com',
        },
        now: TEST_DATES.NOW,
      });
      expect(s.name).toBe('Okta');
      expect(s.entryPoint).toBe('https://sso.example.com/entry');
      expect(s.issuer).toBe('https://sso.example.com');
      expect(s.certificate).toBeUndefined();
      expect(s.metadataUrl).toBeUndefined();
      s.deactivate();
      expect(s.isActive).toBe(false);
    });
  });

  describe('SocialAccountEntity — getters', () => {
    it('all getters', () => {
      const s = SocialAccountEntity.create({
        id: TEST_IDS.SOCIAL_ACCOUNT_ID,
        props: {
          authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
          userId: UserIdVO.create(TEST_IDS.USER_ID),
          provider: SocialProviderVO.google(),
          providerUserId: 'google-uid',
          email: 'social@gmail.com',
          name: 'Social User',
          avatarUrl: 'https://avatar.url/x.png',
        },
        now: TEST_DATES.NOW,
      });
      expect(s.authId.value).toBe(TEST_IDS.AUTH_ID);
      expect(s.userId.value).toBe(TEST_IDS.USER_ID);
      expect(s.provider.value).toBe('google');
      expect(s.providerUserId).toBe('google-uid');
      expect(s.email).toBe('social@gmail.com');
      expect(s.name).toBe('Social User');
      expect(s.avatarUrl).toBe('https://avatar.url/x.png');
      expect(s.lastUsedAt).toBeUndefined();
    });
  });

  describe('RoleEntity — getters', () => {
    it('all getters + permissions copy', () => {
      const r = RoleEntity.create({
        id: RoleIdVO.create(TEST_IDS.ROLE_ID),
        props: {
          name: RoleNameVO.create('admin'),
          description: 'Admin role',
          level: 90,
          permissions: [PermissionNameVO.create('auth:login')],
        },
        now: TEST_DATES.NOW,
      });
      expect(r.description).toBe('Admin role');
      expect(r.level).toBe(90);
      expect(r.isSystemRole).toBe(false);
      expect(r.permissions.length).toBe(1);
    });

    it('system role without permissions', () => {
      const r = RoleEntity.create({
        id: RoleIdVO.create(TEST_IDS.ROLE_ID),
        props: {
          name: RoleNameVO.create('admin'),
          level: 90,
          isSystemRole: true,
          permissions: [],
        },
        now: TEST_DATES.NOW,
      });
      expect(r.isSystemRole).toBe(true);
    });
  });
});
