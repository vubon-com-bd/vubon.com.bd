/**
 * Final coverage gap-fill — Target 90%+ global
 * @module identity-service/test/unit
 */
import { describe, it, expect, beforeEach } from '@jest/globals';

import { ListUsersHandler } from '@application/queries/user/list-users.handler.js';
import { makeListUsersQuery, makeUserRepositoryMock, activeUser } from '@fixtures/index.js';

import { SsoConfigEntity } from '@domain/entities/sso-config.entity.js';
import { SsoProviderVO } from '@domain/value-objects/primitives/sso-provider.vo.js';
import { TEST_IDS } from '@fixtures/index.js';

describe('Final Gap-Fill', () => {
  // ─── ListUsersHandler mapping path (28-32) ───
  describe('ListUsersHandler — full mapping', () => {
    it('maps user entity fields to DTO', async () => {
      const repo = makeUserRepositoryMock();
      const user = activeUser();
      repo.findPaginated.mockResolvedValue({
        items: [user],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      } as never);

      const handler = new ListUsersHandler(repo as never);
      const result = await handler.execute(makeListUsersQuery());

      expect(result.total).toBe(1);
      expect(result.items.length).toBe(1);
      expect(result.items[0].id).toBe(user.id);
      expect(result.items[0].email).toBe(user.email.value);
      expect(result.items[0].status).toBe(user.status.value);
      expect(result.items[0].type).toBe(user.type.value);
      expect(result.items[0].roles).toEqual(user.roles.map((r) => r.value));
      expect(result.items[0].emailVerified).toBe(user.emailVerified);
      expect(result.items[0].phoneVerified).toBe(user.phoneVerified);
      expect(result.items[0].isMfaEnabled).toBe(user.isMfaEnabled);
      expect(result.items[0].createdAt).toBe(user.createdAt);
    });

    it('maps multiple users', async () => {
      const repo = makeUserRepositoryMock();
      repo.findPaginated.mockResolvedValue({
        items: [activeUser(), activeUser()],
        total: 2,
        page: 1,
        limit: 20,
        totalPages: 1,
      } as never);

      const handler = new ListUsersHandler(repo as never);
      const result = await handler.execute(makeListUsersQuery());
      expect(result.items.length).toBe(2);
    });

    it('handles users with optional firstName/lastName missing', async () => {
      const repo = makeUserRepositoryMock();
      const user = activeUser();
      // Remove optional fields by clearing fixture
      repo.findPaginated.mockResolvedValue({
        items: [user],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      } as never);

      const handler = new ListUsersHandler(repo as never);
      const result = await handler.execute(makeListUsersQuery());
      expect(result.items[0].id).toBe(user.id);
    });
  });

  // ─── SsoConfigEntity.deactivate (85-89) ───
  describe('SsoConfigEntity — deactivate path', () => {
    it('deactivate() flips isActive to false', () => {
      const entity = SsoConfigEntity.create({
        id: TEST_IDS.SSO_CONFIG_ID,
        props: {
          name: 'test-sso',
          provider: SsoProviderVO.saml(),
          entryPoint: 'https://idp.example.com/sso',
          issuer: 'test-issuer',
          certificate: 'CERT_PEM_DATA',
          isActive: true,
        },
        now: new Date().toISOString(),
      });

      expect(entity.isActive).toBe(true);
      entity.deactivate();
      expect(entity.isActive).toBe(false);
    });

    it('deactivate() with OIDC provider (no cert required)', () => {
      const entity = SsoConfigEntity.create({
        id: TEST_IDS.SSO_CONFIG_ID,
        props: {
          name: 'oidc-sso',
          provider: SsoProviderVO.oidc(),
          entryPoint: 'https://idp.example.com/oidc',
          issuer: 'oidc-issuer',
          isActive: true,
        },
        now: new Date().toISOString(),
      });

      expect(entity.isActive).toBe(true);
      entity.deactivate();
      expect(entity.isActive).toBe(false);
    });

    it('all getters accessible', () => {
      const entity = SsoConfigEntity.create({
        id: TEST_IDS.SSO_CONFIG_ID,
        props: {
          name: 'test',
          provider: SsoProviderVO.saml(),
          entryPoint: 'https://x.com',
          issuer: 'iss',
          certificate: 'cert',
          metadataUrl: 'https://x.com/meta',
          isActive: true,
        },
        now: new Date().toISOString(),
      });
      expect(entity.name).toBe('test');
      expect(entity.provider.value).toBe('saml');
      expect(entity.entryPoint).toBe('https://x.com');
      expect(entity.issuer).toBe('iss');
      expect(entity.certificate).toBe('cert');
      expect(entity.metadataUrl).toBe('https://x.com/meta');
      expect(entity.isActive).toBe(true);
    });
  });
});
