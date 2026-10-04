/**
 * AuthSocialService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { jest } from '@jest/globals';

import { AuthSocialService } from './auth-social.service.js';
import { AuthSocialEntity } from '../../../domain/entities/auth-social.entity.js';
import { SocialProviderVO } from '../../../domain/value-objects/primitives/social-provider.vo.js';
import { SocialStatusVO } from '../../../domain/value-objects/primitives/social-status.vo.js';
import {
  SocialAlreadyLinkedAppError,
  SocialNotLinkedAppError,
} from '../../errors/social.errors.js';

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
  findById: jest.fn<() => Promise<unknown>>(),
  findByUser: jest.fn<() => Promise<unknown>>(),
  findByProvider: jest.fn<() => Promise<unknown>>(),
  existsByProvider: jest.fn<() => Promise<unknown>>(),
  findAll: jest.fn<() => Promise<unknown>>(),
  save: jest.fn((s: AuthSocialEntity) => Promise.resolve(s)),
  delete: jest.fn<() => Promise<unknown>>(),
  exists: jest.fn<() => Promise<unknown>>(),
});

const mockUserRepo = () => ({
  findById: jest.fn<() => Promise<unknown>>(),
  findByEmail: jest.fn<() => Promise<unknown>>(),
  existsByEmail: jest.fn<() => Promise<unknown>>(),
  findAll: jest.fn<() => Promise<unknown>>(),
  save: jest.fn<() => Promise<unknown>>(),
  delete: jest.fn<() => Promise<unknown>>(),
  exists: jest.fn<() => Promise<unknown>>(),
  findByIds: jest.fn<() => Promise<unknown>>(),
  countByStatus: jest.fn<() => Promise<unknown>>(),
});

const mockSessionService = () => ({
  name: 'AuthSessionService',
  create: jest.fn<() => Promise<unknown>>(),
  findActiveByUser: jest.fn<() => Promise<unknown>>(),
  revoke: jest.fn<() => Promise<unknown>>(),
  revokeAllForUser: jest.fn<() => Promise<unknown>>(),
  findByToken: jest.fn<() => Promise<unknown>>(),
  toResponse: jest.fn(() => ({})),
});

const mockTokenService = () => ({
  name: 'AuthTokenService',
  generate: jest.fn<() => Promise<unknown>>(),
  generatePair: jest.fn<() => Promise<unknown>>(),
  verify: jest.fn<() => Promise<unknown>>(),
  revoke: jest.fn<() => Promise<unknown>>(),
  revokeAllForSubject: jest.fn<() => Promise<unknown>>(),
  refresh: jest.fn<() => Promise<unknown>>(),
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
