/**
 * AuthSocialService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthSocialService } from './auth-social.service';
import { AuthSocialEntity } from '../../../domain/entities/auth-social.entity';
import { SocialProviderVO } from '../../../domain/value-objects/primitives/social-provider.vo';
import { SocialStatusVO } from '../../../domain/value-objects/primitives/social-status.vo';
import {
  SocialAlreadyLinkedAppError,
  SocialNotLinkedAppError,
} from '../../errors/social.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSocial = (overrides: Partial<Parameters<typeof AuthSocialEntity.create>[0]> = {}) =>
  AuthSocialEntity.create({
    id: 'soc-1',
    userId: 'user-1' as never,
    provider: SocialProviderVO.of('google'),
    providerUserId: 'google-123',
    status: SocialStatusVO.of('active'),
    linkedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockSocialRepo = () => ({
  findById: jest.fn(),
  findByUser: jest.fn(),
  findByProvider: jest.fn(),
  existsByProvider: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((s: AuthSocialEntity) => Promise.resolve(s)),
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
  generate: jest.fn(() => 'soc-new'),
  generateUuid: jest.fn(() => 'state-uuid'),
});

describe('AuthSocialService', () => {
  let service: AuthSocialService;
  let socialRepo: ReturnType<typeof mockSocialRepo>;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let sessionService: ReturnType<typeof mockSessionService>;
  let tokenService: ReturnType<typeof mockTokenService>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    socialRepo = mockSocialRepo();
    userRepo = mockUserRepo();
    sessionService = mockSessionService();
    tokenService = mockTokenService();
    idGen = mockIdGen();
    service = new AuthSocialService(
      socialRepo as never,
      userRepo as never,
      tokenService as never,
      sessionService as never,
      idGen as never,
    );
  });

  describe('initiateLogin()', () => {
    it('should return authUrl and state', async () => {
      const result = await service.initiateLogin({
        provider: 'google',
      } as never);

      expect(result.authUrl).toContain('google');
      expect(result.state).toBeDefined();
    });
  });

  describe('link()', () => {
    it('should throw if already linked', async () => {
      socialRepo.existsByProvider.mockResolvedValue(true);

      await expect(
        service.link('user-1' as never, {
          provider: 'google',
          accessToken: 'token-12345678',
          providerUserId: 'google-123',
        } as never),
      ).rejects.toThrow(SocialAlreadyLinkedAppError);
    });

    it('should create social link', async () => {
      socialRepo.existsByProvider.mockResolvedValue(false);

      await service.link('user-1' as never, {
        provider: 'google',
        accessToken: 'token-12345678',
        providerUserId: 'google-123',
      } as never);

      expect(socialRepo.save).toHaveBeenCalled();
    });
  });

  describe('unlink()', () => {
    it('should throw if not linked', async () => {
      socialRepo.findByUser.mockResolvedValue([]);

      await expect(
        service.unlink('user-1' as never, {
          provider: 'google',
          password: 'x',
        } as never),
      ).rejects.toThrow(SocialNotLinkedAppError);
    });

    it('should unlink matching provider', async () => {
      socialRepo.findByUser.mockResolvedValue([buildSocial()]);

      await service.unlink('user-1' as never, {
        provider: 'google',
        password: 'x',
      } as never);

      expect(socialRepo.save).toHaveBeenCalled();
    });
  });

  describe('listForUser()', () => {
    it('should delegate', async () => {
      socialRepo.findByUser.mockResolvedValue([buildSocial()]);
      const result = await service.listForUser('user-1' as never);
      expect(result).toHaveLength(1);
    });
  });
});
