/**
 * AuthSsoEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthSsoEntity } from './auth-sso.entity';
import { SsoProviderVO } from '../value-objects/primitives/sso-provider.vo';
import { SsoTokenVO } from '../value-objects/primitives/sso-token.vo';
import { SsoStatusVO } from '../value-objects/primitives/sso-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSso = (overrides: Partial<Parameters<typeof AuthSsoEntity.create>[0]> = {}) =>
  AuthSsoEntity.create({
    id: 'sso-1',
    userId: 'user-1' as never,
    provider: SsoProviderVO.of('saml'),
    tenantId: 'acme-corp',
    providerUserId: 'saml-user-123',
    status: SsoStatusVO.of('active'),
    linkedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthSsoEntity', () => {
  describe('create()', () => {
    it('should create valid sso link', () => {
      const s = buildSso();
      expect(s.provider.value).toBe('saml');
      expect(s.tenantId).toBe('acme-corp');
      expect(s.isActive()).toBe(true);
    });

    it('should accept optional assertion', () => {
      const s = buildSso({ assertion: SsoTokenVO.of('assertion-token-12345') });
      expect(s).toBeDefined();
    });
  });

  describe('isActive()', () => {
    it('should return true for active', () => {
      expect(buildSso().isActive()).toBe(true);
    });

    it('should return false for revoked', () => {
      const s = buildSso({ status: SsoStatusVO.of('revoked') });
      expect(s.isActive()).toBe(false);
    });

    it('should return false for expired', () => {
      const s = buildSso({ status: SsoStatusVO.of('expired') });
      expect(s.isActive()).toBe(false);
    });
  });

  describe('refreshAssertion()', () => {
    it('should update assertion and set status to active', () => {
      const s = buildSso({ status: SsoStatusVO.of('expired') });
      s.refreshAssertion(SsoTokenVO.of('new-assertion-token'));
      expect(s.isActive()).toBe(true);
    });
  });

  describe('revoke()', () => {
    it('should set status to revoked', () => {
      const s = buildSso();
      s.revoke();
      expect(s.isActive()).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose provider', () => {
      expect(buildSso().provider.value).toBe('saml');
    });

    it('should expose tenantId', () => {
      expect(buildSso().tenantId).toBe('acme-corp');
    });

    it('should expose status', () => {
      expect(buildSso().status.value).toBe('active');
    });
  });
});
