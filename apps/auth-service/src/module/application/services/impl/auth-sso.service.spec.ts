/**
 * AuthSsoService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthSsoService } from './auth-sso.service';
import { AuthSsoEntity } from '../../../domain/entities/auth-sso.entity';
import { SsoProviderVO } from '../../../domain/value-objects/primitives/sso-provider.vo';
import { SsoStatusVO } from '../../../domain/value-objects/primitives/sso-status.vo';
import { SsoFailedAppError } from '../../errors/sso.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSso = (overrides: Partial<Parameters<typeof AuthSsoEntity.create>[0]> = {}) =>
  AuthSsoEntity.create({
    id: 'sso-1',
    userId: 'user-1' as never,
    provider: SsoProviderVO.of('saml'),
    tenantId: 'acme-corp',
    providerUserId: 'saml-123',
    status: SsoStatusVO.of('active'),
    linkedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUser: jest.fn(),
  findByProviderAndTenant: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((s: AuthSsoEntity) => Promise.resolve(s)),
  delete: jest.fn(),
  exists: jest.fn(),
});

const mockUserRepo = () => ({
  findById: jest.fn(),
  findByEmail: jest.fn(),
  existsByEmail: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  findByIds: jest.fn(),
  countByStatus: jest.fn(),
});

const mockSessionService = () => ({
  name: 'AuthSessionService',
  create: jest.fn(),
  findActiveByUser: jest.fn(),
  revoke: jest.fn(),
  revokeAllForUser: jest.fn(),
  findByToken: jest.fn(),
  toResponse: jest.fn(() => ({})),
});

const mockTokenService = () => ({
  name: 'AuthTokenService',
  generate: jest.fn(),
  generatePair: jest.fn(),
  verify: jest.fn(),
  revoke: jest.fn(),
  revokeAllForSubject: jest.fn(),
  refresh: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'sso-new'),
  generateUuid: jest.fn(() => 'state-uuid'),
});

describe('AuthSsoService', () => {
  let service: AuthSsoService;
  let repo: ReturnType<typeof mockRepo>;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let sessionService: ReturnType<typeof mockSessionService>;
  let tokenService: ReturnType<typeof mockTokenService>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    userRepo = mockUserRepo();
    sessionService = mockSessionService();
    tokenService = mockTokenService();
    idGen = mockIdGen();
    service = new AuthSsoService(
      repo as never,
      userRepo as never,
      tokenService as never,
      sessionService as never,
      idGen as never,
    );
  });

  // ═══════════════════════════════════════════════════════════
  // initiateLogin — Real signature: { providerId, relayState?, returnUrl? }
  // ═══════════════════════════════════════════════════════════

  describe('initiateLogin()', () => {
    it('should return a redirectUrl pointing to SSO provider', async () => {
      const result = await service.initiateLogin({
        providerId: 'acme-corp',
      } as never);

      expect(result.redirectUrl).toMatch(/^https?:\/\//);
      expect(result.redirectUrl).toContain('sso.example.com');
    });

    it('should embed providerId in redirectUrl', async () => {
      const result = await service.initiateLogin({
        providerId: 'acme-corp',
      } as never);

      expect(result.redirectUrl).toContain('providerId=acme-corp');
    });

    it('should encode special characters in providerId', async () => {
      const result = await service.initiateLogin({
        providerId: 'acme corp & co',
      } as never);

      expect(result.redirectUrl).toContain('providerId=acme%20corp%20%26%20co');
    });

    it('should return a state parameter from id generator', async () => {
      const result = await service.initiateLogin({
        providerId: 'acme-corp',
      } as never);

      expect(result.state).toBe('state-uuid');
    });

    it('should call id generator for state', async () => {
      await service.initiateLogin({ providerId: 'acme-corp' } as never);
      expect(idGen.generateUuid).toHaveBeenCalled();
    });

    it('should include state in redirectUrl', async () => {
      const result = await service.initiateLogin({
        providerId: 'acme-corp',
      } as never);

      expect(result.redirectUrl).toContain('state=state-uuid');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // handleCallback
  // ═══════════════════════════════════════════════════════════

  describe('handleCallback()', () => {
    it('should throw when no binding found', async () => {
      repo.findByProviderAndTenant.mockResolvedValue(null);

      await expect(
        service.handleCallback({
          provider: 'saml',
          tenantId: 'acme-corp',
          code: 'code-123',
        } as never),
      ).rejects.toThrow(SsoFailedAppError);
    });

    it('should throw when code missing', async () => {
      await expect(
        service.handleCallback({
          provider: 'saml',
          tenantId: 'acme-corp',
        } as never),
      ).rejects.toThrow(SsoFailedAppError);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // revoke
  // ═══════════════════════════════════════════════════════════

  describe('revoke()', () => {
    it('should revoke matching tenant', async () => {
      const sso = buildSso();
      repo.findByUser.mockResolvedValue([sso]);

      await service.revoke('user-1' as never, 'acme-corp');

      expect(sso.isActive()).toBe(false);
      expect(repo.save).toHaveBeenCalled();
    });

    it('should be a no-op if no matching binding', async () => {
      repo.findByUser.mockResolvedValue([]);

      await service.revoke('user-1' as never, 'other-tenant');

      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // listForUser
  // ═══════════════════════════════════════════════════════════

  describe('listForUser()', () => {
    it('should delegate to repo', async () => {
      repo.findByUser.mockResolvedValue([buildSso()]);
      const result = await service.listForUser('user-1' as never);
      expect(result).toHaveLength(1);
    });

    it('should return empty array when no bindings', async () => {
      repo.findByUser.mockResolvedValue([]);
      const result = await service.listForUser('user-1' as never);
      expect(result).toEqual([]);
    });
  });
});
