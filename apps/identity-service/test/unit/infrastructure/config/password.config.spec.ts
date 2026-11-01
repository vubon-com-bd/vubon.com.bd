/**
 * Password config tests
 */
import { describe, it, expect } from '@jest/globals';
import { AUTH_PASSWORD_CONFIG } from '@infrastructure/config/password.config.js';

describe('AUTH_PASSWORD_CONFIG', () => {
  it('should have minLength', () => {
    expect(AUTH_PASSWORD_CONFIG.minLength).toBeGreaterThanOrEqual(8);
  });

  it('should have maxLength > minLength', () => {
    expect(AUTH_PASSWORD_CONFIG.maxLength).toBeGreaterThan(
      AUTH_PASSWORD_CONFIG.minLength,
    );
  });

  it('should have bcryptRounds', () => {
    expect(AUTH_PASSWORD_CONFIG.bcryptRounds).toBeGreaterThanOrEqual(10);
  });

  it('should be frozen', () => {
    expect(Object.isFrozen(AUTH_PASSWORD_CONFIG)).toBe(true);
  });
});
