/**
 * ProfileVisibilityService Unit Test
 */
import { ProfileVisibilityService } from '@domain/services/profile-visibility.service';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';

describe('ProfileVisibilityService', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildProfile = (visibility: 'public' | 'private' | 'only_me' | 'followers' | 'friends') => {
    const profile = UserProfileEntity.create({
      id: 'profile-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    profile.updateVisibility(ProfileVisibilityVO.create(visibility), now);
    return profile;
  };

  describe('canViewProfile', () => {
    it('should let self view own profile', () => {
      const p = buildProfile('private');
      expect(ProfileVisibilityService.canViewProfile(p, 'self')).toBe(true);
    });

    it('should let admin view any profile', () => {
      const p = buildProfile('private');
      expect(ProfileVisibilityService.canViewProfile(p, 'admin')).toBe(true);
    });

    it('should let public profile viewed by anyone', () => {
      const p = buildProfile('public');
      expect(ProfileVisibilityService.canViewProfile(p, 'stranger')).toBe(true);
    });

    it('should block stranger on private profile', () => {
      const p = buildProfile('private');
      expect(ProfileVisibilityService.canViewProfile(p, 'stranger')).toBe(false);
    });

    it('should block stranger on only_me', () => {
      const p = buildProfile('only_me');
      expect(ProfileVisibilityService.canViewProfile(p, 'stranger')).toBe(false);
    });

    it('should allow followers on followers-only', () => {
      const p = buildProfile('followers');
      expect(ProfileVisibilityService.canViewProfile(p, 'follower')).toBe(true);
      expect(ProfileVisibilityService.canViewProfile(p, 'stranger')).toBe(false);
    });

    it('should allow friends on friends-only', () => {
      const p = buildProfile('friends');
      expect(ProfileVisibilityService.canViewProfile(p, 'friend')).toBe(true);
      expect(ProfileVisibilityService.canViewProfile(p, 'stranger')).toBe(false);
    });
  });

  describe('canViewField', () => {
    it('should let self see visibility field', () => {
      const p = buildProfile('public');
      expect(ProfileVisibilityService.canViewField(p, 'visibility', 'self')).toBe(true);
    });

    it('should block stranger from visibility field', () => {
      const p = buildProfile('public');
      expect(ProfileVisibilityService.canViewField(p, 'visibility', 'stranger')).toBe(false);
    });

    it('should let stranger see bio on public profile', () => {
      const p = buildProfile('public');
      expect(ProfileVisibilityService.canViewField(p, 'bio', 'stranger')).toBe(true);
    });
  });

  describe('shouldHideFromSearch', () => {
    it('should hide deleted user', () => {
      const user = UserEntity.create({
        id: UserIdVO.create('user-1'),
        email: UserEmailVO.create('user@example.com'),
        name: UserNameVO.create('John'),
        type: UserTypeVO.create('individual'),
        now,
      });
      user.delete(now);
      expect(ProfileVisibilityService.shouldHideFromSearch(user, buildProfile('public'))).toBe(true);
    });

    it('should hide private profile', () => {
      const user = UserEntity.create({
        id: UserIdVO.create('user-1'),
        email: UserEmailVO.create('user@example.com'),
        name: UserNameVO.create('John'),
        type: UserTypeVO.create('individual'),
        now,
      });
      expect(ProfileVisibilityService.shouldHideFromSearch(user, buildProfile('private'))).toBe(true);
    });

    it('should show public profile of active user', () => {
      const user = UserEntity.create({
        id: UserIdVO.create('user-1'),
        email: UserEmailVO.create('user@example.com'),
        name: UserNameVO.create('John'),
        type: UserTypeVO.create('individual'),
        now,
      });
      user.activate(now);
      expect(ProfileVisibilityService.shouldHideFromSearch(user, buildProfile('public'))).toBe(false);
    });
  });
});
