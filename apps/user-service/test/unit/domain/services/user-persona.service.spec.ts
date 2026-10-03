/**
 * UserPersonaService Unit Test
 */
import { UserPersonaService } from '@domain/services/user-persona.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserPersonaService', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  const buildProfile = () =>
    UserProfileEntity.create({
      id: 'profile-1',
      userId: UserIdVO.create('user-1'),
      now,
    });

  const buildPrefs = () =>
    UserPreferencesEntity.create({ id: 'user-1', userId: 'user-1', now });

  describe('build', () => {
    it('should construct UserPersonaVO', () => {
      const persona = UserPersonaService.build(buildUser(), buildProfile(), buildPrefs());
      expect(persona.user.id.value).toBe('user-1');
    });
  });

  describe('displayName', () => {
    it('should return user name', () => {
      expect(UserPersonaService.displayName(buildUser())).toBe('John Doe');
    });
  });

  describe('isOnboarded', () => {
    it('should be false for incomplete user', () => {
      expect(UserPersonaService.isOnboarded(buildUser(), buildProfile())).toBe(false);
    });
  });
});
