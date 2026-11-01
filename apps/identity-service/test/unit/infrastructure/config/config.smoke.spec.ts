/**
 * Infrastructure Config — Smoke tests
 * @module identity-service/test/unit/infrastructure/config
 */
import { describe, it, expect } from '@jest/globals';

import { AUTH_SERVICE_CONFIG } from '@infrastructure/config/auth.config.js';
import { AUTH_JWT_CONFIG } from '@infrastructure/config/jwt.config.js';
import { AUTH_SESSION_CONFIG } from '@infrastructure/config/session.config.js';
import { AUTH_TOKEN_CONFIG } from '@infrastructure/config/token.config.js';
import { AUTH_PASSWORD_CONFIG } from '@infrastructure/config/password.config.js';
import { AUTH_ACCOUNT_LOCK_CONFIG } from '@infrastructure/config/account-lock.config.js';
import { AUTH_LOGIN_ATTEMPT_CONFIG } from '@infrastructure/config/login-attempt.config.js';
import { AUTH_DEVICE_CONFIG } from '@infrastructure/config/device.config.js';
import { AUTH_MFA_CONFIG } from '@infrastructure/config/mfa.config.js';
import { AUTH_OAUTH_CONFIG } from '@infrastructure/config/oauth.config.js';
import { AUTH_SSO_CONFIG } from '@infrastructure/config/sso.config.js';
import { AUTH_BIOMETRIC_CONFIG } from '@infrastructure/config/biometric.config.js';
import { AUTH_RATE_LIMIT_CONFIG } from '@infrastructure/config/rate-limit.config.js';
import { AUTH_USER_CONFIG } from '@infrastructure/config/user.config.js';
import { AUTH_KYC_CONFIG } from '@infrastructure/config/kyc.config.js';

describe('Infrastructure Config — Smoke', () => {
  describe('AUTH_SERVICE_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_SERVICE_CONFIG)).toBe(true));
    it('has serviceName', () => expect(typeof AUTH_SERVICE_CONFIG.serviceName).toBe('string'));
    it('has servicePort', () => expect(typeof AUTH_SERVICE_CONFIG.servicePort).toBe('number'));
    it('has registrationEnabled boolean', () =>
      expect(typeof AUTH_SERVICE_CONFIG.registrationEnabled).toBe('boolean'));
  });

  describe('AUTH_JWT_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_JWT_CONFIG)).toBe(true));
    it('has algorithm', () => expect(typeof AUTH_JWT_CONFIG.algorithm).toBe('string'));
    it('accessTokenTtlSeconds > 0', () =>
      expect(AUTH_JWT_CONFIG.accessTokenTtlSeconds).toBeGreaterThan(0));
    it('refreshTokenTtlSeconds > accessTokenTtlSeconds', () =>
      expect(AUTH_JWT_CONFIG.refreshTokenTtlSeconds).toBeGreaterThan(
        AUTH_JWT_CONFIG.accessTokenTtlSeconds,
      ));
  });

  describe('AUTH_SESSION_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_SESSION_CONFIG)).toBe(true));
    it('defaultExpirySeconds > 0', () =>
      expect(AUTH_SESSION_CONFIG.defaultExpirySeconds).toBeGreaterThan(0));
    it('maxSessionsPerUser > 0', () =>
      expect(AUTH_SESSION_CONFIG.maxSessionsPerUser).toBeGreaterThan(0));
    it('rotateOnRefresh boolean', () =>
      expect(typeof AUTH_SESSION_CONFIG.rotateOnRefresh).toBe('boolean'));
  });

  describe('AUTH_TOKEN_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_TOKEN_CONFIG)).toBe(true));
    it('defined', () => expect(AUTH_TOKEN_CONFIG).toBeDefined());
  });

  describe('AUTH_PASSWORD_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_PASSWORD_CONFIG)).toBe(true));
    it('minLength > 0', () => expect(AUTH_PASSWORD_CONFIG.minLength).toBeGreaterThan(0));
    it('maxLength > minLength', () =>
      expect(AUTH_PASSWORD_CONFIG.maxLength).toBeGreaterThan(AUTH_PASSWORD_CONFIG.minLength));
    it('bcryptRounds >= 10', () => expect(AUTH_PASSWORD_CONFIG.bcryptRounds).toBeGreaterThanOrEqual(10));
  });

  describe('AUTH_ACCOUNT_LOCK_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_ACCOUNT_LOCK_CONFIG)).toBe(true));
    it('maxLoginAttempts > 0', () =>
      expect(AUTH_ACCOUNT_LOCK_CONFIG.maxLoginAttempts).toBeGreaterThan(0));
    it('lockoutDurationSeconds > 0', () =>
      expect(AUTH_ACCOUNT_LOCK_CONFIG.lockoutDurationSeconds).toBeGreaterThan(0));
  });

  describe('AUTH_LOGIN_ATTEMPT_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_LOGIN_ATTEMPT_CONFIG)).toBe(true));
    it('defined', () => expect(AUTH_LOGIN_ATTEMPT_CONFIG).toBeDefined());
  });

  describe('AUTH_DEVICE_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_DEVICE_CONFIG)).toBe(true));
    it('defined', () => expect(AUTH_DEVICE_CONFIG).toBeDefined());
  });

  describe('AUTH_MFA_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_MFA_CONFIG)).toBe(true));
    it('defined', () => expect(AUTH_MFA_CONFIG).toBeDefined());
  });

  describe('AUTH_OAUTH_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_OAUTH_CONFIG)).toBe(true));
    it('stateLength > 0', () => expect(AUTH_OAUTH_CONFIG.stateLength).toBeGreaterThan(0));
    it('pkceMethod is string', () =>
      expect(typeof AUTH_OAUTH_CONFIG.pkceMethod).toBe('string'));
  });

  describe('AUTH_SSO_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_SSO_CONFIG)).toBe(true));
    it('defined', () => expect(AUTH_SSO_CONFIG).toBeDefined());
  });

  describe('AUTH_BIOMETRIC_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_BIOMETRIC_CONFIG)).toBe(true));
    it('challengeTtlSeconds > 0', () =>
      expect(AUTH_BIOMETRIC_CONFIG.challengeTtlSeconds).toBeGreaterThan(0));
    it('maxAttempts > 0', () =>
      expect(AUTH_BIOMETRIC_CONFIG.maxAttempts).toBeGreaterThan(0));
  });

  describe('AUTH_RATE_LIMIT_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_RATE_LIMIT_CONFIG)).toBe(true));
    it('windowSeconds > 0', () =>
      expect(AUTH_RATE_LIMIT_CONFIG.windowSeconds).toBeGreaterThan(0));
    it('maxRequests > 0', () =>
      expect(AUTH_RATE_LIMIT_CONFIG.maxRequests).toBeGreaterThan(0));
  });

  describe('AUTH_USER_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_USER_CONFIG)).toBe(true));
    it('maxAddressesPerUser > 0', () =>
      expect(AUTH_USER_CONFIG.maxAddressesPerUser).toBeGreaterThan(0));
    it('softDeleteGraceDays >= 0', () =>
      expect(AUTH_USER_CONFIG.softDeleteGraceDays).toBeGreaterThanOrEqual(0));
  });

  describe('AUTH_KYC_CONFIG', () => {
    it('is frozen', () => expect(Object.isFrozen(AUTH_KYC_CONFIG)).toBe(true));
    it('has enabled boolean', () => expect(typeof AUTH_KYC_CONFIG.enabled).toBe('boolean'));
    it('maxRetries > 0', () => expect(AUTH_KYC_CONFIG.maxRetries).toBeGreaterThan(0));
  });
});
