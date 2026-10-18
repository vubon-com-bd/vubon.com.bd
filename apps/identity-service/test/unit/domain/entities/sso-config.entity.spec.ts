/**
 * SsoConfigEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SsoConfigEntity } from '@domain/entities/sso-config.entity.js';
import { SsoProviderVO } from '@domain/value-objects/primitives/sso-provider.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

const makeSso = (overrides: Record<string, unknown> = {}) =>
  SsoConfigEntity.create({
    id: TEST_IDS.SSO_CONFIG_ID,
    props: {
      name: 'Okta SSO',
      provider: SsoProviderVO.oidc(),
      entryPoint: 'https://sso.example.com/entry',
      issuer: 'https://sso.example.com',
      isActive: true,
      ...overrides,
    },
    now: TEST_DATES.NOW,
  });

describe('SsoConfigEntity', () => {
  describe('create()', () => {
    it('should create active by default', () => {
      const s = makeSso();
      expect(s.isActive).toBe(true);
      expect(s.name).toBe('Okta SSO');
    });

    it('should throw when entryPoint not URL', () => {
      expect(() => makeSso({ entryPoint: 'not-a-url' })).toThrow(ValidationError);
    });

    it('should throw when SAML without certificate', () => {
      expect(() =>
        makeSso({ provider: SsoProviderVO.saml(), certificate: undefined }),
      ).toThrow(ValidationError);
    });

    it('should allow SAML with certificate', () => {
      const s = makeSso({
        provider: SsoProviderVO.saml(),
        certificate: 'X509-CERT-DATA',
      });
      expect(s.provider.isSaml()).toBe(true);
      expect(s.certificate).toBe('X509-CERT-DATA');
    });
  });

  describe('deactivate()', () => {
    it('should set isActive false', () => {
      const s = makeSso();
      s.deactivate();
      expect(s.isActive).toBe(false);
    });
  });
});
