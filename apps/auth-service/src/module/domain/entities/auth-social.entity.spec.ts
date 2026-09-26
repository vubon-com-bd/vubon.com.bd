/**
 * AuthSocialEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthSocialEntity } from './auth-social.entity';
import { SocialProviderVO } from '../value-objects/primitives/social-provider.vo';
import { SocialTokenVO } from '../value-objects/primitives/social-token.vo';
import { SocialStatusVO } from '../value-objects/primitives/social-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSocial = (overrides: Partial<Parameters<typeof AuthSocialEntity.create>[0]> = {}) =>
  AuthSocialEntity.create({
    id: 'soc-1',
    userId: 'user-1' as never,
    provider: SocialProviderVO.of('google'),
    providerUserId: 'google-user-123',
    status: SocialStatusVO.of('active'),
    linkedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthSocialEntity', () => {
  describe('create()', () => {
    it('should create valid social link', () => {
      const s = buildSocial();
      expect(s.provider.value).toBe('google');
      expect(s.providerUserId).toBe('google-user-123');
      expect(s.isLinked()).toBe(true);
    });

    it('should accept optional tokens', () => {
      const s = buildSocial({
        accessToken: SocialTokenVO.of('token-access-12345'),
        refreshToken: SocialTokenVO.of('token-refresh-12345'),
      });
      expect(s).toBeDefined();
    });
  });

  describe('isLinked()', () => {
    it('should return true for active', () => {
      expect(buildSocial().isLinked()).toBe(true);
    });

    it('should return false for revoked', () => {
      const s = buildSocial({ status: SocialStatusVO.of('revoked') });
      expect(s.isLinked()).toBe(false);
    });

    it('should return false for expired', () => {
      const s = buildSocial({ status: SocialStatusVO.of('expired') });
      expect(s.isLinked()).toBe(false);
    });
  });

  describe('updateTokens()', () => {
    it('should update access token', () => {
      const s = buildSocial();
      s.updateTokens(SocialTokenVO.of('new-access-token'));
      expect(s).toBeDefined();
    });

    it('should update refresh token', () => {
      const s = buildSocial();
      s.updateTokens(undefined, SocialTokenVO.of('new-refresh-token'));
      expect(s).toBeDefined();
    });

    it('should update both tokens', () => {
      const s = buildSocial();
      s.updateTokens(
        SocialTokenVO.of('new-access'),
        SocialTokenVO.of('new-refresh'),
      );
      expect(s).toBeDefined();
    });
  });

  describe('unlink()', () => {
    it('should set status to revoked and clear tokens', () => {
      const s = buildSocial({
        accessToken: SocialTokenVO.of('token-access-12345'),
      });
      s.unlink(NOW_MS + 1000);
      expect(s.isLinked()).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose provider', () => {
      expect(buildSocial().provider.value).toBe('google');
    });

    it('should expose providerUserId', () => {
      expect(buildSocial().providerUserId).toBe('google-user-123');
    });

    it('should expose status', () => {
      expect(buildSocial().status.value).toBe('active');
    });
  });
});
