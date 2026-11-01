/**
 * TokenGeneratorService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TokenGeneratorService } from '@domain/services/token-generator.service.js';

describe('TokenGeneratorService', () => {
  describe('buildPayload()', () => {
    it('should build with correct exp', () => {
      const now = 1700000000000;
      const p = TokenGeneratorService.buildPayload(
        { sub: 'user-1', type: 'access', iss: 'test', jti: 'jti-1' },
        900,
        now,
      );
      expect(p.iat).toBe(Math.floor(now / 1000));
      expect(p.exp).toBe(p.iat + 900);
      expect(p.sub).toBe('user-1');
      expect(p.type).toBe('access');
    });

    it('should preserve sid + scope + aud', () => {
      const p = TokenGeneratorService.buildPayload(
        {
          sub: 'user-1',
          sid: 'session-1',
          type: 'access',
          scope: ['read', 'write'],
          iss: 'test',
          aud: 'client',
          jti: 'jti-1',
        },
        900,
      );
      expect(p.sid).toBe('session-1');
      expect(p.scope).toEqual(['read', 'write']);
      expect(p.aud).toBe('client');
    });
  });

  describe('accessTokenPayload()', () => {
    it('should have access TTL', () => {
      const p = TokenGeneratorService.accessTokenPayload({
        sub: 'user-1',
        iss: 'test',
        jti: 'jti-1',
      });
      expect(p.type).toBe('access');
      expect(p.exp - p.iat).toBe(TokenGeneratorService.ACCESS_TOKEN_TTL_SECONDS);
    });
  });

  describe('refreshTokenPayload()', () => {
    it('should have refresh type + TTL', () => {
      const p = TokenGeneratorService.refreshTokenPayload({
        sub: 'user-1',
        iss: 'test',
        jti: 'jti-1',
      });
      expect(p.type).toBe('refresh');
      expect(p.exp - p.iat).toBe(TokenGeneratorService.REFRESH_TOKEN_TTL_SECONDS);
    });
  });

  describe('idTokenPayload() / resetTokenPayload() / verifyTokenPayload() / inviteTokenPayload()', () => {
    it('each should have correct type', () => {
      expect(TokenGeneratorService.idTokenPayload({ sub: 'u', iss: 'i', jti: 'j' }).type).toBe('id');
      expect(TokenGeneratorService.resetTokenPayload({ sub: 'u', iss: 'i', jti: 'j' }).type).toBe('reset');
      expect(TokenGeneratorService.verifyTokenPayload({ sub: 'u', iss: 'i', jti: 'j' }).type).toBe('verify');
      expect(TokenGeneratorService.inviteTokenPayload({ sub: 'u', iss: 'i', jti: 'j' }).type).toBe('invite');
    });
  });

  describe('accessExpiry() / refreshExpiry()', () => {
    it('should be in future', () => {
      const a = TokenGeneratorService.accessExpiry();
      const r = TokenGeneratorService.refreshExpiry();
      expect(a.isExpired()).toBe(false);
      expect(r.isExpired()).toBe(false);
      expect(r.expiresAt).toBeGreaterThan(a.expiresAt);
    });
  });

  describe('config helpers', () => {
    it('issuer/audience/algorithm', () => {
      expect(TokenGeneratorService.issuer()).toBeDefined();
      expect(TokenGeneratorService.audience()).toBeDefined();
      expect(TokenGeneratorService.algorithm()).toBeDefined();
    });

    it('defaultType is access', () => {
      expect(TokenGeneratorService.defaultType().isAccess()).toBe(true);
    });
  });
});
