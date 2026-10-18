/**
 * SocialProviderVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SocialProviderVO } from '@domain/value-objects/primitives/social-provider.vo.js';
import { InvalidSocialProviderError } from '@domain/errors/social.errors.js';

describe('SocialProviderVO', () => {
  describe('create()', () => {
    it('should create all valid providers', () => {
      for (const p of ['google', 'facebook', 'apple', 'github', 'linkedin', 'twitter', 'microsoft']) {
        expect(SocialProviderVO.create(p).value).toBe(p);
      }
    });

    it('should normalize case', () => {
      expect(SocialProviderVO.create(' GOOGLE ').value).toBe('google');
    });

    it('should throw on empty', () => {
      expect(() => SocialProviderVO.create('')).toThrow(InvalidSocialProviderError);
    });

    it('should throw on invalid', () => {
      expect(() => SocialProviderVO.create('xxx')).toThrow(InvalidSocialProviderError);
    });
  });

  describe('static factories', () => {
    it('google/facebook/apple/github/linkedin/twitter/microsoft', () => {
      expect(SocialProviderVO.google().value).toBe('google');
      expect(SocialProviderVO.facebook().value).toBe('facebook');
      expect(SocialProviderVO.apple().value).toBe('apple');
      expect(SocialProviderVO.github().value).toBe('github');
      expect(SocialProviderVO.linkedin().value).toBe('linkedin');
      expect(SocialProviderVO.twitter().value).toBe('twitter');
      expect(SocialProviderVO.microsoft().value).toBe('microsoft');
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(SocialProviderVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
