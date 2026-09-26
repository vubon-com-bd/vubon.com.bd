/**
 * UserPreferencesService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferencesEntity } from '../../../domain/entities/user-preferences.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildPrefs = (overrides: Partial<Parameters<typeof UserPreferencesEntity.create>[0]> = {}) =>
  UserPreferencesEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    theme: 'system',
    currency: 'BDT',
    dateFormat: 'DD/MM/YYYY',
    reduceMotion: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((p: UserPreferencesEntity) => Promise.resolve(p)),
  delete: jest.fn(),
  exists: jest.fn(),
});

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    service = new UserPreferencesService(repo as never);
  });

  describe('getByUserId()', () => {
    it('should return prefs when found', async () => {
      const p = buildPrefs();
      repo.findByUserId.mockResolvedValue(p);

      const result = await service.getByUserId('user-1' as never);

      expect(result).toEqual(p);
    });

    it('should throw when not found', async () => {
      repo.findByUserId.mockResolvedValue(null);
      await expect(service.getByUserId('user-1' as never)).rejects.toThrow();
    });
  });

  describe('update()', () => {
    it('should update theme', async () => {
      const p = buildPrefs();
      repo.findByUserId.mockResolvedValue(p);

      await service.update('user-1' as never, { theme: 'dark' } as never);

      expect(p.theme).toBe('dark');
    });

    it('should update currency', async () => {
      const p = buildPrefs();
      repo.findByUserId.mockResolvedValue(p);

      await service.update('user-1' as never, { currency: 'USD' } as never);

      expect(p.currency).toBe('USD');
    });

    it('should update reduceMotion', async () => {
      const p = buildPrefs();
      repo.findByUserId.mockResolvedValue(p);

      await service.update('user-1' as never, { reduceMotion: true } as never);

      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('toResponse()', () => {
    it('should map to DTO', () => {
      const dto = service.toResponse(buildPrefs({ theme: 'dark' }));
      expect(dto.userId).toBe('user-1');
      expect(dto.theme).toBe('dark');
      expect(dto.currency).toBe('BDT');
    });
  });
});
