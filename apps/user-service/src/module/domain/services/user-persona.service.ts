/**
 * UserPersonaService — Domain Service
 */
import { UserEntity } from '../entities/user.entity.js';
import { UserProfileEntity } from '../entities/user-profile.entity.js';
import { UserPreferencesEntity } from '../entities/user-preferences.entity.js';
import { UserPersonaVO } from '../value-objects/composites/user-persona.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export class UserPersonaService {
  static build(
    user: UserEntity,
    profile: UserProfileEntity,
    preferences: UserPreferencesEntity
  ): UserPersonaVO {
    return UserPersonaVO.create({
      user: user.toUserVO(),
      profile: profile.toProfileVO(),
      preferences: preferences.toPreferencesVO(),
    });
  }

  static displayName(user: UserEntity): string {
    return user.name.value;
  }

  static isOnboarded(user: UserEntity, profile: UserProfileEntity): boolean {
    return (
      user.emailVerified &&
      user.hasPhone() &&
      !profile.avatar.isEmpty()
    );
  }
}
