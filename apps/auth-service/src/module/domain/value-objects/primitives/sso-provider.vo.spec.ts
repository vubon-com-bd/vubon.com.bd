/**
 * SsoProviderVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { SsoProviderVO } from './sso-provider.vo';

describe('SsoProviderVO', () => {
  describe('of()', () => {
    it('should accept all valid SSO providers', () => {
      ['saml', 'oidc', 'azure_ad', 'okta', 'keycloak', 'auth0', 'google_workspace', 'custom'].forEach((p) => {
        const vo = SsoProviderVO.of(p);
        expect(vo.value).toBe(p);
      });
    });

    it('should normalize to lowercase', () => {
      const vo = SsoProviderVO.of('SAML');
      expect(vo.value).toBe('saml');
    });

    it('should reject unsupported provider', () => {
      expect(() => SsoProviderVO.of('unknown')).toThrow();
    });
  });

  describe('isSaml()', () => {
    it('should return true only for saml', () => {
      expect(SsoProviderVO.of('saml').isSaml()).toBe(true);
      ['oidc', 'azure_ad', 'okta'].forEach((p) => {
        expect(SsoProviderVO.of(p).isSaml()).toBe(false);
      });
    });
  });

  describe('isOidc()', () => {
    it('should return true for oidc', () => {
      expect(SsoProviderVO.of('oidc').isOidc()).toBe(true);
    });

    it('should return true for azure_ad', () => {
      expect(SsoProviderVO.of('azure_ad').isOidc()).toBe(true);
    });

    it('should return true for okta, keycloak, auth0, google_workspace', () => {
      ['okta', 'keycloak', 'auth0', 'google_workspace'].forEach((p) => {
        expect(SsoProviderVO.of(p).isOidc()).toBe(true);
      });
    });

    it('should return false for saml', () => {
      expect(SsoProviderVO.of('saml').isOidc()).toBe(false);
    });

    it('should return false for custom', () => {
      expect(SsoProviderVO.of('custom').isOidc()).toBe(false);
    });
  });
});
