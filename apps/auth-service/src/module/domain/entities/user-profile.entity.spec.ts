/**
 * UserProfileEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserProfileEntity } from './user-profile.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';

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

describe('UserProfileEntity', () => {
  describe('create()', () => {
    it('should create a valid profile', () => {
      const profile = buildProfile();
      expect(profile.userId).toBe('user-1');
      expect(profile.displayName.value).toBe('John Doe');
      expect(profile.locale).toBe('bn-BD');
    });

    it('should accept optional bio', () => {
      const profile = buildProfile({ bio: 'Hello world' });
      expect(profile.bio).toBe('Hello world');
    });

    it('should accept optional avatarUrl', () => {
      const profile = buildProfile({ avatarUrl: 'https://img.com/a.jpg' });
      expect(profile.avatarUrl).toBe('https://img.com/a.jpg');
    });
  });

  describe('updateDisplayName()', () => {
    it('should update display name', () => {
      const profile = buildProfile();
      profile.updateDisplayName(UserNameVO.of('Jane Doe'));
      expect(profile.displayName.value).toBe('Jane Doe');
    });

    it('should skip if unchanged', () => {
      const profile = buildProfile();
      profile.updateDisplayName(UserNameVO.of('John Doe'));
      expect(profile.displayName.value).toBe('John Doe');
    });
  });

  describe('updateBio()', () => {
    it('should update bio', () => {
      const profile = buildProfile();
      profile.updateBio('New bio');
      expect(profile.bio).toBe('New bio');
    });

    it('should reject bio > 500 chars', () => {
      const profile = buildProfile();
      expect(() => profile.updateBio('x'.repeat(501))).toThrow('Bio exceeds 500 chars');
    });

    it('should allow clearing bio', () => {
      const profile = buildProfile({ bio: 'Old bio' });
      profile.updateBio(undefined);
      expect(profile.bio).toBeUndefined();
    });
  });

  describe('updateAvatar()', () => {
    it('should update avatar url', () => {
      const profile = buildProfile();
      profile.updateAvatar('https://img.com/b.jpg');
      expect(profile.avatarUrl).toBe('https://img.com/b.jpg');
    });

    it('should reject avatarUrl > 2048 chars', () => {
      const profile = buildProfile();
      expect(() => profile.updateAvatar('a'.repeat(2049))).toThrow('Avatar URL too long');
    });

    it('should allow clearing avatar', () => {
      const profile = buildProfile({ avatarUrl: 'https://x.com/a.jpg' });
      profile.updateAvatar(undefined);
      expect(profile.avatarUrl).toBeUndefined();
    });
  });

  describe('identity', () => {
    it('should preserve id', () => {
      expect(buildProfile().id).toBe('user-1');
    });

    it('should expose createdAt/updatedAt', () => {
      const profile = buildProfile();
      expect(profile.createdAt).toBe(NOW);
      expect(profile.updatedAt).toBe(NOW);
    });
  });
});
