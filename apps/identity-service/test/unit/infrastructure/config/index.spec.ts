/**
 * Config barrel smoke test
 */
import { describe, it, expect } from '@jest/globals';
import * as Config from '@infrastructure/config/index.js';

describe('Config barrel', () => {
  it('exports AUTH_SERVICE_CONFIG', () => {
    expect(Config).toHaveProperty('AUTH_SERVICE_CONFIG');
  });

  it('exports AUTH_JWT_CONFIG', () => {
    expect(Config).toHaveProperty('AUTH_JWT_CONFIG');
  });

  it('exports AUTH_PASSWORD_CONFIG', () => {
    expect(Config).toHaveProperty('AUTH_PASSWORD_CONFIG');
  });

  it('exports AUTH_SESSION_CONFIG', () => {
    expect(Config).toHaveProperty('AUTH_SESSION_CONFIG');
  });

  it('exports AUTH_MFA_CONFIG', () => {
    expect(Config).toHaveProperty('AUTH_MFA_CONFIG');
  });

  it('exports AUTH_OAUTH_CONFIG', () => {
    expect(Config).toHaveProperty('AUTH_OAUTH_CONFIG');
  });

  it('exports AUTH_SSO_CONFIG', () => {
    expect(Config).toHaveProperty('AUTH_SSO_CONFIG');
  });
});
