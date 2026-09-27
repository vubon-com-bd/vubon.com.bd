/**
 * UserProfileEntity Unit Test
 */
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';

describe('UserProfileEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildProfile = () =>
    UserProfileEntity.create({
      id: 'profile-1',
      userId: UserIdVO.create('user-1'),
      now,
    });

  describe('create', () => {
    it('should start with empty avatar and bio', () => {
      const profile = buildProfile();
      expect(profile.avatar.isEmpty()).toBe(true);
      expect(profile.bio.isEmpty()).toBe(true);
    });

    it('should start with public visibility', () => {
      const profile = buildProfile();
      expect(profile.visibility.value).toBe('public');
      expect(profile.visibility.isPublic()).toBe(true);
    });

    it('should have completionScore 0 initially', () => {
      const profile = buildProfile();
      expect(profile.completionScore()).toBe(0);
      expect(profile.isComplete()).toBe(false);
    });
  });

  describe('updateAvatar', () => {
    it('should update avatar', () => {
      const profile = buildProfile();
      profile.updateAvatar(UserAvatarVO.create('https://cdn.example.com/a.png'), now);
      expect(profile.avatar.isEmpty()).toBe(false);
    });

    it('should emit ProfileUpdatedEvent', () => {
      const profile = buildProfile();
      profile.pullDomainEvents();
      profile.updateAvatar(UserAvatarVO.create('https://cdn.example.com/a.png'), now);
      const events = profile.pullDomainEvents();
      expect(events.length).toBe(1);
      expect(events[0].type).toBe('profile.updated');
    });
  });

  describe('updateBio', () => {
    it('should update bio and increase completion', () => {
      const profile = buildProfile();
      profile.updateBio(UserBioVO.create('Hello world'), now);
      expect(profile.bio.value).toBe('Hello world');
      expect(profile.completionScore()).toBeGreaterThan(0);
    });
  });

  describe('updateVisibility', () => {
    it('should update visibility', () => {
      const profile = buildProfile();
      profile.updateVisibility(ProfileVisibilityVO.create('private'), now);
      expect(profile.visibility.isPrivate()).toBe(true);
    });
  });

  describe('isComplete', () => {
    it('should be complete when avatar + bio set', () => {
      const profile = buildProfile();
      profile.updateAvatar(UserAvatarVO.create('https://cdn.example.com/a.png'), now);
      profile.updateBio(UserBioVO.create('My bio'), now);
      expect(profile.isComplete()).toBe(true);
      expect(profile.completionScore()).toBe(100);
    });
  });
});
