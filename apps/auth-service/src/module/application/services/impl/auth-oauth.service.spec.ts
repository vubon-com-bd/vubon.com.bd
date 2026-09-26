/**
 * AuthOAuthService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthOAuthService } from './auth-oauth.service';
import { AuthOAuthEntity } from '../../../domain/entities/auth-oauth.entity';
import { OAuthProviderVO } from '../../../domain/value-objects/primitives/oauth-provider.vo';
import { OAuthStatusVO } from '../../../domain/value-objects/primitives/oauth-status.vo';
import { OAuthFailedAppError } from '../../errors/oauth.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildOAuth = (overrides: Partial<Parameters<typeof AuthOAuthEntity.create>[0]> = {}) =>
  AuthOAuthEntity.create({
    id: 'oa-1',
    userId: 'user-1' as never,
    provider: OAuthProviderVO.of('google'),
    providerUserId: 'google-123',
    scopes: ['email', 'profile'],
    status: OAuthStatusVO.of('active'),
    linkedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUser: jest.fn(),
  findByProvider: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((o: AuthOAuthEntity) => Promise.resolve(o)),
  delete: jest.fn(),
  exists: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'oa-new'),
  generateUuid: jest.fn(() => 'state-uuid'),
});

describe('AuthOAuthService', () => {
  let service: AuthOAuthService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new AuthOAuthService(repo as never, idGen as never);
  });

  describe('authorize()', () => {
    it('should return authUrl with state', async () => {
      const result = await service.authorize({
        provider: 'google',
        redirectUri: 'http://localhost/callback',
        scopes: ['email'],
      });

      expect(result.authUrl).toContain('google');
      expect(result.state).toBeDefined();
    });
  });

  describe('exchangeCode()', () => {
    it('should throw when code missing', async () => {
      await expect(
        service.exchangeCode({
          provider: 'google',
          code: '',
          state: 'x',
          redirectUri: 'http://x',
        }),
      ).rejects.toThrow(OAuthFailedAppError);
    });

    it('should throw (exchange deferred to infrastructure)', async () => {
      await expect(
        service.exchangeCode({
          provider: 'google',
          code: 'code-123',
          state: 'x',
          redirectUri: 'http://x',
        }),
      ).rejects.toThrow(OAuthFailedAppError);
    });
  });

  describe('revoke()', () => {
    it('should revoke matching provider', async () => {
      const oa = buildOAuth();
      repo.findByUser.mockResolvedValue([oa]);

      await service.revoke('user-1' as never, 'google');

      expect(oa.isActive()).toBe(false);
    });
  });

  describe('listForUser()', () => {
    it('should delegate', async () => {
      repo.findByUser.mockResolvedValue([buildOAuth()]);
      const result = await service.listForUser('user-1' as never);
      expect(result).toHaveLength(1);
    });
  });
});
