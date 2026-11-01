/**
 * AuthProviderVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { InvalidAuthProviderError } from '@domain/errors/auth.errors.js';

describe('AuthProviderVO', () => {
  describe('create()', () => {
    it('should create all valid providers', () => {
      for (const p of [
        'local',
        'google',
        'facebook',
        'apple',
        'github',
        'microsoft',
        'twitter',
        'linkedin',
        'custom',
      ]) {
        expect(AuthProviderVO.create(p).value).toBe(p);
      }
    });

    it('should normalize case', () => {
      expect(AuthProviderVO.create(' GOOGLE ').value).toBe('google');
    });

    it('should throw on empty', () => {
      expect(() => AuthProviderVO.create('')).toThrow(InvalidAuthProviderError);
    });

    it('should throw on invalid', () => {
      expect(() => AuthProviderVO.create('unknown')).toThrow(InvalidAuthProviderError);
    });
  });

  describe('static factories', () => {
    it('local/google/facebook/apple/github', () => {
      expect(AuthProviderVO.local().value).toBe('local');
      expect(AuthProviderVO.google().value).toBe('google');
      expect(AuthProviderVO.facebook().value).toBe('facebook');
      expect(AuthProviderVO.apple().value).toBe('apple');
      expect(AuthProviderVO.github().value).toBe('github');
    });
  });

  describe('predicates', () => {
    it('isLocal()', () => {
      expect(AuthProviderVO.local().isLocal()).toBe(true);
      expect(AuthProviderVO.google().isLocal()).toBe(false);
    });

    it('isSocial()', () => {
      expect(AuthProviderVO.google().isSocial()).toBe(true);
      expect(AuthProviderVO.facebook().isSocial()).toBe(true);
      expect(AuthProviderVO.apple().isSocial()).toBe(true);
      expect(AuthProviderVO.github().isSocial()).toBe(true);
      expect(AuthProviderVO.twitter().isSocial()).toBe(true);
      expect(AuthProviderVO.linkedin().isSocial()).toBe(true);
      expect(AuthProviderVO.microsoft().isSocial()).toBe(true);
      expect(AuthProviderVO.local().isSocial()).toBe(false);
    });

    it('isCustom()', () => {
      expect(AuthProviderVO.reconstitute('custom').isCustom()).toBe(true);
      expect(AuthProviderVO.local().isCustom()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(AuthProviderVO.reconstitute('x').value).toBe('x');
    });
  });
});
