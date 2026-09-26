/**
 * AuthSsoVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthSsoVO } from './auth-sso.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SsoProviderVO } from '../primitives/sso-provider.vo';
import { SsoStatusVO } from '../primitives/sso-status.vo';

describe('AuthSsoVO', () => {
  const userId = UserIdVO.of('user-1');
  const now = Date.now();

  const valid = {
    ssoId: 'sso-1',
    userId,
    provider: SsoProviderVO.of('saml'),
    tenantId: 'acme-corp',
    providerUserId: 'saml-user-123',
    status: SsoStatusVO.of('active'),
    linkedAt: now,
  };

  describe('of()', () => {
    it('should create valid sso link', () => {
      const vo = AuthSsoVO.of(valid);
      expect(vo.provider.value).toBe('saml');
      expect(vo.tenantId).toBe('acme-corp');
      expect(vo.isActive()).toBe(true);
    });

    it('should reject empty tenantId', () => {
      expect(() => AuthSsoVO.of({ ...valid, tenantId: '' })).toThrow('tenantId is required');
    });

    it('should reject empty providerUserId', () => {
      expect(() => AuthSsoVO.of({ ...valid, providerUserId: '' })).toThrow('providerUserId is required');
    });
  });

  describe('isActive()', () => {
    it('should return true for active', () => {
      expect(AuthSsoVO.of(valid).isActive()).toBe(true);
    });

    it('should return false for revoked', () => {
      const vo = AuthSsoVO.of({ ...valid, status: SsoStatusVO.of('revoked') });
      expect(vo.isActive()).toBe(false);
    });
  });
});
