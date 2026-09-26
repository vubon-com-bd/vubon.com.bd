/**
 * Infrastructure Config — Unit Tests
 * @module auth-service/infrastructure/config
 *
 * Config files are module-level constants built from env vars.
 * This test file verifies shape + type safety of all 16 configs.
 */
import { AUTH_CONFIG } from './auth.config';
import { JWT_CONFIG } from './jwt.config';
import { OAUTH_CONFIG } from './oauth.config';
import { SSO_CONFIG } from './sso.config';
import { MFA_CONFIG } from './mfa.config';
import { SESSION_CONFIG } from './session.config';
import { TOKEN_CONFIG } from './token.config';
import { PASSWORD_CONFIG } from './password.config';
import { ACCOUNT_LOCK_CONFIG } from './account-lock.config';
import { LOGIN_ATTEMPT_CONFIG } from './login-attempt.config';
import { DEVICE_CONFIG } from './device.config';
import { SOCIAL_CONFIG } from './social.config';
import { TWO_FA_CONFIG } from './2fa.config';
import { BIOMETRIC_CONFIG } from './biometric.config';
import { RATE_LIMIT_CONFIG } from './rate-limit.config';
import { USER_CONFIG } from './user.config';

describe('Infrastructure Configs', () => {
  // ═══════════════════════════════════════════════════════════
  // AUTH_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('AUTH_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(AUTH_CONFIG)).toBe(true);
    });

    it('should have loginMaxAttempts as number', () => {
      expect(typeof AUTH_CONFIG.loginMaxAttempts).toBe('number');
      expect(AUTH_CONFIG.loginMaxAttempts).toBeGreaterThan(0);
    });

    it('should have lockoutDurationSeconds', () => {
      expect(typeof AUTH_CONFIG.lockoutDurationSeconds).toBe('number');
    });

    it('should have boolean registration flags', () => {
      expect(typeof AUTH_CONFIG.registrationOpen).toBe('boolean');
      expect(typeof AUTH_CONFIG.requireEmailVerification).toBe('boolean');
      expect(typeof AUTH_CONFIG.requirePhoneVerification).toBe('boolean');
      expect(typeof AUTH_CONFIG.allowConcurrentSessions).toBe('boolean');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // JWT_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('JWT_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(JWT_CONFIG)).toBe(true);
    });

    it('should have secret as non-empty string', () => {
      expect(typeof JWT_CONFIG.secret).toBe('string');
      expect(JWT_CONFIG.secret.length).toBeGreaterThan(0);
    });

    it('should have algorithm', () => {
      expect(typeof JWT_CONFIG.algorithm).toBe('string');
    });

    it('should have expiry strings', () => {
      expect(typeof JWT_CONFIG.accessTokenExpiry).toBe('string');
      expect(typeof JWT_CONFIG.refreshTokenExpiry).toBe('string');
    });

    it('should have issuer and audience', () => {
      expect(typeof JWT_CONFIG.issuer).toBe('string');
      expect(typeof JWT_CONFIG.audience).toBe('string');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // OAUTH_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('OAUTH_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(OAUTH_CONFIG)).toBe(true);
    });

    it('should have google, facebook, github providers', () => {
      expect(OAUTH_CONFIG.google).toBeDefined();
      expect(OAUTH_CONFIG.facebook).toBeDefined();
      expect(OAUTH_CONFIG.github).toBeDefined();
    });

    it('each provider should have clientId, clientSecret, redirectUri', () => {
      ['google', 'facebook', 'github'].forEach((p) => {
        const provider = OAUTH_CONFIG[p as 'google' | 'facebook' | 'github'];
        expect(typeof provider.clientId).toBe('string');
        expect(typeof provider.clientSecret).toBe('string');
        expect(typeof provider.redirectUri).toBe('string');
      });
    });
  });

  // ═══════════════════════════════════════════════════════════
  // SSO_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('SSO_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(SSO_CONFIG)).toBe(true);
    });

    it('should have enabled boolean', () => {
      expect(typeof SSO_CONFIG.enabled).toBe('boolean');
    });

    it('should have saml and oidc sub-configs', () => {
      expect(SSO_CONFIG.saml).toBeDefined();
      expect(SSO_CONFIG.oidc).toBeDefined();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // MFA_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('MFA_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(MFA_CONFIG)).toBe(true);
    });

    it('should have numeric config values', () => {
      expect(typeof MFA_CONFIG.totpWindow).toBe('number');
      expect(typeof MFA_CONFIG.totpPeriodSeconds).toBe('number');
      expect(typeof MFA_CONFIG.totpDigits).toBe('number');
      expect(typeof MFA_CONFIG.backupCodeCount).toBe('number');
    });

    it('should have totpPeriod = 30', () => {
      expect(MFA_CONFIG.totpPeriodSeconds).toBe(30);
    });

    it('should have totpDigits = 6', () => {
      expect(MFA_CONFIG.totpDigits).toBe(6);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // SESSION_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('SESSION_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(SESSION_CONFIG)).toBe(true);
    });

    it('should have positive numbers', () => {
      expect(SESSION_CONFIG.expirySeconds).toBeGreaterThan(0);
      expect(SESSION_CONFIG.rememberMeExpirySeconds).toBeGreaterThan(0);
      expect(SESSION_CONFIG.idleTimeoutSeconds).toBeGreaterThan(0);
      expect(SESSION_CONFIG.absoluteTimeoutSeconds).toBeGreaterThan(0);
    });

    it('should have max sessions/devices', () => {
      expect(SESSION_CONFIG.maxSessionsPerUser).toBeGreaterThan(0);
      expect(SESSION_CONFIG.maxDevicesPerUser).toBeGreaterThan(0);
    });

    it('remember me > default expiry', () => {
      expect(SESSION_CONFIG.rememberMeExpirySeconds)
        .toBeGreaterThan(SESSION_CONFIG.expirySeconds);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // TOKEN_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('TOKEN_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(TOKEN_CONFIG)).toBe(true);
    });

    it('should have expiry strings', () => {
      expect(typeof TOKEN_CONFIG.accessExpiry).toBe('string');
      expect(typeof TOKEN_CONFIG.refreshExpiry).toBe('string');
    });

    it('should have algorithm and issuer', () => {
      expect(typeof TOKEN_CONFIG.algorithm).toBe('string');
      expect(typeof TOKEN_CONFIG.issuer).toBe('string');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // PASSWORD_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('PASSWORD_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(PASSWORD_CONFIG)).toBe(true);
    });

    it('should have minLength >= 8', () => {
      expect(PASSWORD_CONFIG.minLength).toBeGreaterThanOrEqual(8);
    });

    it('maxLength > minLength', () => {
      expect(PASSWORD_CONFIG.maxLength).toBeGreaterThan(PASSWORD_CONFIG.minLength);
    });

    it('should have boolean requirement flags', () => {
      expect(typeof PASSWORD_CONFIG.requireUppercase).toBe('boolean');
      expect(typeof PASSWORD_CONFIG.requireLowercase).toBe('boolean');
      expect(typeof PASSWORD_CONFIG.requireNumber).toBe('boolean');
      expect(typeof PASSWORD_CONFIG.requireSymbol).toBe('boolean');
    });

    it('bcryptRounds between 10 and 15', () => {
      expect(PASSWORD_CONFIG.bcryptRounds).toBeGreaterThanOrEqual(10);
      expect(PASSWORD_CONFIG.bcryptRounds).toBeLessThanOrEqual(15);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // ACCOUNT_LOCK_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('ACCOUNT_LOCK_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(ACCOUNT_LOCK_CONFIG)).toBe(true);
    });

    it('should have maxAttempts >= 3', () => {
      expect(ACCOUNT_LOCK_CONFIG.maxAttempts).toBeGreaterThanOrEqual(3);
    });

    it('should have baseDurationSeconds', () => {
      expect(ACCOUNT_LOCK_CONFIG.baseDurationSeconds).toBeGreaterThan(0);
    });

    it('should enable escalating locks', () => {
      expect(ACCOUNT_LOCK_CONFIG.escalatingLocks).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // LOGIN_ATTEMPT_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('LOGIN_ATTEMPT_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(LOGIN_ATTEMPT_CONFIG)).toBe(true);
    });

    it('should have tracking window', () => {
      expect(LOGIN_ATTEMPT_CONFIG.trackingWindowSeconds).toBeGreaterThan(0);
    });

    it('should have suspicious thresholds', () => {
      expect(LOGIN_ATTEMPT_CONFIG.suspiciousIpThreshold).toBeGreaterThan(0);
      expect(LOGIN_ATTEMPT_CONFIG.suspiciousEmailThreshold).toBeGreaterThan(0);
    });

    it('should have retention days', () => {
      expect(LOGIN_ATTEMPT_CONFIG.retentionDays).toBeGreaterThan(0);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // DEVICE_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('DEVICE_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(DEVICE_CONFIG)).toBe(true);
    });

    it('trustPromotionThreshold = 3', () => {
      expect(DEVICE_CONFIG.trustPromotionThreshold).toBe(3);
    });

    it('should have max devices per user', () => {
      expect(DEVICE_CONFIG.maxDevicesPerUser).toBeGreaterThan(0);
    });

    it('should have autoTrust flag', () => {
      expect(typeof DEVICE_CONFIG.autoTrustEnabled).toBe('boolean');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // SOCIAL_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('SOCIAL_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(SOCIAL_CONFIG)).toBe(true);
    });

    it('should have enabled flag', () => {
      expect(typeof SOCIAL_CONFIG.enabled).toBe('boolean');
    });

    it('should have allowedProviders array', () => {
      expect(Array.isArray(SOCIAL_CONFIG.allowedProviders)).toBe(true);
      expect(SOCIAL_CONFIG.allowedProviders.length).toBeGreaterThan(0);
    });

    it('should allow link/register flags', () => {
      expect(typeof SOCIAL_CONFIG.allowLinkExisting).toBe('boolean');
      expect(typeof SOCIAL_CONFIG.allowAutoRegister).toBe('boolean');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // TWO_FA_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('TWO_FA_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(TWO_FA_CONFIG)).toBe(true);
    });

    it('default method should be totp', () => {
      expect(TWO_FA_CONFIG.defaultMethod).toBe('totp');
    });

    it('should have admin requirement flag', () => {
      expect(typeof TWO_FA_CONFIG.requiredForAdmin).toBe('boolean');
    });

    it('should have challenge expiry', () => {
      expect(TWO_FA_CONFIG.challengeExpirySeconds).toBeGreaterThan(0);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // BIOMETRIC_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('BIOMETRIC_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(BIOMETRIC_CONFIG)).toBe(true);
    });

    it('should have enabled flag', () => {
      expect(typeof BIOMETRIC_CONFIG.enabled).toBe('boolean');
    });

    it('should have allowedKinds with fingerprint/face', () => {
      expect(BIOMETRIC_CONFIG.allowedKinds).toContain('fingerprint');
      expect(BIOMETRIC_CONFIG.allowedKinds).toContain('face');
    });

    it('should have max enrollments', () => {
      expect(BIOMETRIC_CONFIG.maxEnrollmentsPerUser).toBeGreaterThan(0);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // RATE_LIMIT_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('RATE_LIMIT_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(RATE_LIMIT_CONFIG)).toBe(true);
    });

    it('should have positive window and limits', () => {
      expect(RATE_LIMIT_CONFIG.windowSeconds).toBeGreaterThan(0);
      expect(RATE_LIMIT_CONFIG.maxRequests).toBeGreaterThan(0);
      expect(RATE_LIMIT_CONFIG.authMax).toBeGreaterThan(0);
    });

    it('authMax should be lower than general max', () => {
      expect(RATE_LIMIT_CONFIG.authMax).toBeLessThanOrEqual(RATE_LIMIT_CONFIG.maxRequests);
    });

    it('otpMax should be very low', () => {
      expect(RATE_LIMIT_CONFIG.otpMax).toBeLessThanOrEqual(5);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // USER_CONFIG
  // ═══════════════════════════════════════════════════════════

  describe('USER_CONFIG', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(USER_CONFIG)).toBe(true);
    });

    it('name limits: min < max', () => {
      expect(USER_CONFIG.nameMinLength).toBeLessThan(USER_CONFIG.nameMaxLength);
    });

    it('username limits: min < max', () => {
      expect(USER_CONFIG.usernameMinLength).toBeLessThan(USER_CONFIG.usernameMaxLength);
    });

    it('should have max addresses/contacts', () => {
      expect(USER_CONFIG.maxAddressesPerUser).toBeGreaterThan(0);
      expect(USER_CONFIG.maxContactsPerUser).toBeGreaterThan(0);
    });

    it('should have soft delete enabled', () => {
      expect(typeof USER_CONFIG.softDeleteEnabled).toBe('boolean');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Cross-config invariants
  // ═══════════════════════════════════════════════════════════

  describe('Cross-config invariants', () => {
    it('JWT algorithm matches TOKEN algorithm', () => {
      expect(JWT_CONFIG.algorithm).toBe(TOKEN_CONFIG.algorithm);
    });

    it('PASSWORD bcryptRounds within valid range', () => {
      expect(PASSWORD_CONFIG.bcryptRounds).toBeGreaterThanOrEqual(10);
      expect(PASSWORD_CONFIG.bcryptRounds).toBeLessThanOrEqual(15);
    });

    it('all configs are frozen', () => {
      const configs = [
        AUTH_CONFIG, JWT_CONFIG, OAUTH_CONFIG, SSO_CONFIG, MFA_CONFIG,
        SESSION_CONFIG, TOKEN_CONFIG, PASSWORD_CONFIG, ACCOUNT_LOCK_CONFIG,
        LOGIN_ATTEMPT_CONFIG, DEVICE_CONFIG, SOCIAL_CONFIG, TWO_FA_CONFIG,
        BIOMETRIC_CONFIG, RATE_LIMIT_CONFIG, USER_CONFIG,
      ];
      configs.forEach((cfg) => expect(Object.isFrozen(cfg)).toBe(true));
    });
  });
});
