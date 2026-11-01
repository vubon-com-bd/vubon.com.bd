/**
 * Session config tests
 */
import { describe, it, expect } from '@jest/globals';
import { AUTH_SESSION_CONFIG } from '@infrastructure/config/session.config.js';

describe('AUTH_SESSION_CONFIG', () => {
  it('should have positive defaultExpiry', () => {
    expect(AUTH_SESSION_CONFIG.defaultExpirySeconds).toBeGreaterThan(0);
  });

  it('should have rememberMeExpiry > defaultExpiry', () => {
    expect(AUTH_SESSION_CONFIG.rememberMeExpirySeconds).toBeGreaterThan(
      AUTH_SESSION_CONFIG.defaultExpirySeconds,
    );
  });

  it('should have positive maxSessions', () => {
    expect(AUTH_SESSION_CONFIG.maxSessionsPerUser).toBeGreaterThan(0);
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(AUTH_SESSION_CONFIG)).toBe(true);
  });
});
