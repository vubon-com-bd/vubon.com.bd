/**
 * UserSettingsService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { jest } from '@jest/globals';

import { UserSettingsService } from './user-settings.service.js';
import { UserSettingsEntity } from '../../../domain/entities/user-settings.entity.js';

const NOW = '2024-01-01T00:00:00.000Z';

const buildSettings = (overrides: Partial<Parameters<typeof UserSettingsEntity.create>[0]> = {}) =>
  UserSettingsEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    language: 'bn',
    timezone: 'Asia/Dhaka',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn() as jest.Mock,
  findByUserId: jest.fn() as jest.Mock,
  findAll: jest.fn() as jest.Mock,
  save: jest.fn((s: UserSettingsEntity) => Promise.resolve(s)),
  delete: jest.fn() as jest.Mock,
  exists: jest.fn() as jest.Mock,
});

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    service = new UserSettingsService(repo as never);
  });

  describe('getByUserId()', () => {
    it('should return settings when found', async () => {
      const s = buildSettings();
      repo.findByUserId.mockResolvedValue(s);

      const result = await service.getByUserId('user-1' as never);

      expect(result).toEqual(s);
    });

    it('should throw when not found', async () => {
      repo.findByUserId.mockResolvedValue(null);

      await expect(service.getByUserId('user-1' as never)).rejects.toThrow();
    });
  });

  describe('update()', () => {
    it('should update notifications', async () => {
      const s = buildSettings();
      repo.findByUserId.mockResolvedValue(s);

      await service.update('user-1' as never, {
        emailNotifications: false,
        smsNotifications: true,
      } as never);

      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('toResponse()', () => {
    it('should map settings to DTO', () => {
      const dto = service.toResponse(buildSettings());
      expect(dto.userId).toBe('user-1');
      expect(dto.twoFactorEnabled).toBe(false);
      expect(dto.emailNotifications).toBe(true);
    });
  });
});
