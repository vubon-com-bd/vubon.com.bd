/**
 * OAuthClientEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { OAuthClientEntity } from '@domain/entities/oauth-client.entity.js';
import { OAuthGrantTypeVO } from '@domain/value-objects/primitives/oauth-grant-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

const makeClient = (overrides: Record<string, unknown> = {}) =>
  OAuthClientEntity.create({
    id: TEST_IDS.OAUTH_CLIENT_ID,
    props: {
      clientId: 'test-client-id',
      clientName: 'Test Client',
      redirectUris: ['https://app.example.com/callback'],
      scopes: ['read', 'write'],
      grantTypes: [OAuthGrantTypeVO.authorizationCode()],
      isPublic: false,
      ...overrides,
    },
    now: TEST_DATES.NOW,
  });

describe('OAuthClientEntity', () => {
  describe('create()', () => {
    it('should create active by default', () => {
      const c = makeClient();
      expect(c.isActive).toBe(true);
      expect(c.clientId).toBe('test-client-id');
    });

    it('should throw on empty redirectUris', () => {
      expect(() => makeClient({ redirectUris: [] })).toThrow(ValidationError);
    });

    it('should throw on empty grantTypes', () => {
      expect(() => makeClient({ grantTypes: [] })).toThrow(ValidationError);
    });
  });

  describe('isRedirectAllowed()', () => {
    it('should return true for allowed URI', () => {
      const c = makeClient();
      expect(c.isRedirectAllowed('https://app.example.com/callback')).toBe(true);
    });

    it('should return false for other URI', () => {
      const c = makeClient();
      expect(c.isRedirectAllowed('https://evil.com/callback')).toBe(false);
    });
  });

  describe('supportsGrant()', () => {
    it('should return true for supported grant', () => {
      const c = makeClient();
      expect(c.supportsGrant(OAuthGrantTypeVO.authorizationCode())).toBe(true);
    });

    it('should return false for unsupported grant', () => {
      const c = makeClient();
      expect(c.supportsGrant(OAuthGrantTypeVO.clientCredentials())).toBe(false);
    });
  });

  describe('hasScope()', () => {
    it('should check scope', () => {
      const c = makeClient();
      expect(c.hasScope('read')).toBe(true);
      expect(c.hasScope('admin')).toBe(false);
    });
  });

  describe('deactivate()', () => {
    it('should set isActive false', () => {
      const c = makeClient();
      c.deactivate();
      expect(c.isActive).toBe(false);
    });
  });
});
