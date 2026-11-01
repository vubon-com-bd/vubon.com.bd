/**
 * SsoProviderVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SsoProviderVO } from '@domain/value-objects/primitives/sso-provider.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SsoProviderVO', () => {
  describe('create()', () => {
    it('should create all valid providers', () => {
      for (const p of ['saml', 'oidc', 'cas', 'kerberos', 'ldap']) {
        expect(SsoProviderVO.create(p).value).toBe(p);
      }
    });

    it('should normalize case', () => {
      expect(SsoProviderVO.create(' SAML ').value).toBe('saml');
    });

    it('should throw on empty', () => {
      expect(() => SsoProviderVO.create('')).toThrow(ValidationError);
    });

    it('should throw on invalid', () => {
      expect(() => SsoProviderVO.create('xxx')).toThrow(ValidationError);
    });
  });

  describe('static factories', () => {
    it('saml/oidc/cas/kerberos/ldap', () => {
      expect(SsoProviderVO.saml().value).toBe('saml');
      expect(SsoProviderVO.oidc().value).toBe('oidc');
      expect(SsoProviderVO.cas().value).toBe('cas');
      expect(SsoProviderVO.kerberos().value).toBe('kerberos');
      expect(SsoProviderVO.ldap().value).toBe('ldap');
    });
  });

  describe('predicates', () => {
    it('isSaml()', () => {
      expect(SsoProviderVO.saml().isSaml()).toBe(true);
      expect(SsoProviderVO.oidc().isSaml()).toBe(false);
    });

    it('isOidc()', () => {
      expect(SsoProviderVO.oidc().isOidc()).toBe(true);
      expect(SsoProviderVO.saml().isOidc()).toBe(false);
    });

    it('isLdap()', () => {
      expect(SsoProviderVO.ldap().isLdap()).toBe(true);
      expect(SsoProviderVO.saml().isLdap()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(SsoProviderVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
