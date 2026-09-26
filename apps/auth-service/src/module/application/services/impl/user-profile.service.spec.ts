/**
 * UserProfileService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserProfileService } from './user-profile.service';
import { UserProfileEntity } from '../../../domain/entities/user-profile.entity';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildProfile = (overrides: Partial<Parameters<typeof UserProfileEntity.create>[0]> = {}) =>
  UserProfileEntity.create({
    id: 'user-1' as never,
    userId: 'user-1' as never,
    displayName: UserNameVO.of('John Doe'),
    locale: 'bn-BD',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((p: UserProfileEntity) => Promise.resolve(p)),
  delete: jest.fn(),
  exists: jest.fn(),
});

describe('UserProfileService', () => {
  let service: UserProfileService;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    service = new UserProfileService(repo as never);
  });

  describe('getByUserId()', () => {
    it('should return profile when found', async () => {
      const profile = buildProfile();
      repo.findByUserId.mockResolvedValue(profile);

      const result = await service.getByUserId('user-1' as never);

      expect(result).toEqual(profile);
    });

    it('should throw when not found', async () => {
      repo.findByUserId.mockResolvedValue(null);

      await expect(service.getByUserId('user-1' as never)).rejects.toThrow();
    });
  });

  describe('update()', () => {
    it('should update display name', async () => {
      const profile = buildProfile();
      repo.findByUserId.mockResolvedValue(profile);

      await service.update('user-1' as never, { displayName: 'Jane Doe' } as never);

      expect(profile.displayName.value).toBe('Jane Doe');
      expect(repo.save).toHaveBeenCalled();
    });

    it('should update bio', async () => {
      const profile = buildProfile();
      repo.findByUserId.mockResolvedValue(profile);

      await service.update('user-1' as never, { bio: 'My new bio' } as never);

      expect(profile.bio).toBe('My new bio');
    });

    it('should update avatarUrl', async () => {
      const profile = buildProfile();
      repo.findByUserId.mockResolvedValue(profile);

      await service.update('user-1' as never, { avatarUrl: 'https://x.com/a.jpg' } as never);

      expect(profile.avatarUrl).toBe('https://x.com/a.jpg');
    });
  });

  describe('toResponse()', () => {
    it('should map to DTO', () => {
      const dto = service.toResponse(buildProfile());
      expect(dto.userId).toBe('user-1');
      expect(dto.displayName).toBe('John Doe');
      expect(dto.locale).toBe('bn-BD');
    });

    it('should include optional bio', () => {
      const dto = service.toResponse(buildProfile({ bio: 'Hello' }));
      expect(dto.bio).toBe('Hello');
    });
  });
});
