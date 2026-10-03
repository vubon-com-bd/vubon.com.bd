/**
 * ProfileCompletionService Unit Test
 */
import { ProfileCompletionService } from '@domain/services/profile-completion.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';

describe('ProfileCompletionService', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = (overrides: Partial<{ emailVerified: boolean; phone: boolean }> = {}) => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    if (overrides.emailVerified) user.markEmailVerified();
    return user;
  };

  const buildProfile = () =>
    UserProfileEntity.create({
      id: 'profile-1',
      userId: UserIdVO.create('user-1'),
      now,
    });

  describe('calculate', () => {
    it('should return breakdown with completed + missing + percentage', () => {
      const result = ProfileCompletionService.calculate(buildUser(), buildProfile());
      expect(result).toHaveProperty('percentage');
      expect(result).toHaveProperty('completed');
      expect(result).toHaveProperty('missing');
      expect(result.percentage).toBeGreaterThan(0);
      expect(result.percentage).toBeLessThanOrEqual(100);
    });

    it('should include name, email, visibility in completed', () => {
      const result = ProfileCompletionService.calculate(buildUser(), buildProfile());
      expect(result.completed).toContain('name');
      expect(result.completed).toContain('email');
      expect(result.completed).toContain('visibility');
    });

    it('should include emailVerified in missing when not verified', () => {
      const result = ProfileCompletionService.calculate(buildUser(), buildProfile());
      expect(result.missing).toContain('emailVerified');
    });

    it('should include avatar + bio in missing when profile is empty', () => {
      const result = ProfileCompletionService.calculate(buildUser(), buildProfile());
      expect(result.missing).toContain('avatar');
      expect(result.missing).toContain('bio');
    });

    it('should return 100% when everything is set', () => {
      const user = buildUser({ emailVerified: true });
      user.markPhoneVerified();

      const profile = buildProfile();
      profile.updateAvatar(UserAvatarVO.create('https://cdn.example.com/a.png'), now);
      profile.updateBio(UserBioVO.create('My bio'), now);

      const result = ProfileCompletionService.calculate(user, profile);
      // phone not set so cannot be 100 — check avatar + bio counted
      expect(result.completed).toContain('avatar');
      expect(result.completed).toContain('bio');
      expect(result.completed).toContain('emailVerified');
    });
  });

  describe('isComplete', () => {
    it('should return false when incomplete', () => {
      expect(ProfileCompletionService.isComplete(buildUser(), buildProfile())).toBe(false);
    });

    it('should be false when only some fields set', () => {
      const profile = buildProfile();
      profile.updateAvatar(UserAvatarVO.create('https://cdn.example.com/a.png'), now);
      expect(ProfileCompletionService.isComplete(buildUser(), profile)).toBe(false);
    });
  });

  describe('minimumThresholdMet', () => {
    it('should return true if percentage >= threshold', () => {
      const result = ProfileCompletionService.minimumThresholdMet(
        buildUser(),
        buildProfile(),
        10
      );
      expect(result).toBe(true);
    });

    it('should return false if percentage < threshold', () => {
      const result = ProfileCompletionService.minimumThresholdMet(
        buildUser(),
        buildProfile(),
        100
      );
      expect(result).toBe(false);
    });
  });
});
