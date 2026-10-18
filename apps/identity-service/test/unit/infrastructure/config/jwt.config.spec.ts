/**
 * JWT config tests
 */
import { describe, it, expect } from '@jest/globals';
import { AUTH_JWT_CONFIG } from '@infrastructure/config/jwt.config.js';

describe('AUTH_JWT_CONFIG', () => {
  it('should have algorithm', () => {
    expect(AUTH_JWT_CONFIG.algorithm).toBeTruthy();
  });

  it('should have positive accessTokenTtlSeconds', () => {
    expect(AUTH_JWT_CONFIG.accessTokenTtlSeconds).toBeGreaterThan(0);
  });

  it('should have refreshTtl > accessTtl', () => {
    expect(AUTH_JWT_CONFIG.refreshTokenTtlSeconds).toBeGreaterThan(
      AUTH_JWT_CONFIG.accessTokenTtlSeconds,
    );
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(AUTH_JWT_CONFIG)).toBe(true);
  });
});
