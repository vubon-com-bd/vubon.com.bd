/**
 * Auth2FaService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { Auth2FaService } from './auth-2fa.service';
import { Auth2FaEntity } from '../../../domain/entities/auth-2fa.entity';
import { MfaTypeVO } from '../../../domain/value-objects/primitives/mfa-type.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const build2FA = (overrides: Partial<Parameters<typeof Auth2FaEntity.create>[0]> = {}) =>
  Auth2FaEntity.create({
    id: '2fa-1',
    userId: 'user-1' as never,
    primaryMethod: MfaTypeVO.of('totp'),
    backupMethods: [],
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUser: jest.fn(),
  findEnabledByUsers: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((e: Auth2FaEntity) => Promise.resolve(e)),
  delete: jest.fn(),
  exists: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => '2fa-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('Auth2FaService', () => {
  let service: Auth2FaService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new Auth2FaService(repo as never, idGen as never);
  });

  describe('enable()', () => {
    it('should create new 2FA config', async () => {
      repo.findByUser.mockResolvedValue(null);

      const result = await service.enable('user-1' as never, 'totp');

      expect(repo.save).toHaveBeenCalled();
      expect(result.isEnabled()).toBe(true);
    });

    it('should enable existing 2FA config', async () => {
      const existing = build2FA();
      repo.findByUser.mockResolvedValue(existing);

      const result = await service.enable('user-1' as never, 'totp');

      expect(result.isEnabled()).toBe(true);
    });
  });

  describe('disable()', () => {
    it('should disable 2FA', async () => {
      const existing = build2FA({ enabledAt: NOW_MS });
      repo.findByUser.mockResolvedValue(existing);

      await service.disable('user-1' as never);

      expect(repo.save).toHaveBeenCalled();
      expect(existing.isEnabled()).toBe(false);
    });

    it('should be a no-op when not found', async () => {
      repo.findByUser.mockResolvedValue(null);
      await service.disable('user-1' as never);
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('setPrimary()', () => {
    it('should throw when not configured', async () => {
      repo.findByUser.mockResolvedValue(null);
      await expect(service.setPrimary('user-1' as never, 'sms')).rejects.toThrow();
    });

    it('should update primary method', async () => {
      const existing = build2FA();
      repo.findByUser.mockResolvedValue(existing);

      await service.setPrimary('user-1' as never, 'sms');

      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('addBackupMethod()', () => {
    it('should throw when not configured', async () => {
      repo.findByUser.mockResolvedValue(null);
      await expect(
        service.addBackupMethod('user-1' as never, 'sms'),
      ).rejects.toThrow();
    });

    it('should add backup method', async () => {
      const existing = build2FA();
      repo.findByUser.mockResolvedValue(existing);

      await service.addBackupMethod('user-1' as never, 'sms');

      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('getConfig()', () => {
    it('should return config', async () => {
      const existing = build2FA();
      repo.findByUser.mockResolvedValue(existing);

      const result = await service.getConfig('user-1' as never);

      expect(result).toEqual(existing);
    });

    it('should return null when not found', async () => {
      repo.findByUser.mockResolvedValue(null);
      const result = await service.getConfig('user-1' as never);
      expect(result).toBeNull();
    });
  });
});
