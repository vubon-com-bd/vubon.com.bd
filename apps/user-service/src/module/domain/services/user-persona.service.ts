import { UserEntity } from '../entities/user.entity';
import { UserProfileEntity } from '../entities/user-profile.entity';
import { UserPreferencesEntity } from '../entities/user-preferences.entity';
import { UserPersonaVO } from '../value-objects/composites/user-persona.vo';
import { UserVO } from '../value-objects/composites/user.vo';
import { UserProfileVO } from '../value-objects/composites/user-profile.vo';
import { UserPreferencesVO } from '../value-objects/composites/user-preferences.vo';

export class UserPersonaService {
  static build(
    user: UserEntity,
    profile: UserProfileEntity,
    preferences: UserPreferencesEntity,
  ): UserPersonaVO {
    const userVO = UserVO.create({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      status: user.status,
      type: user.type,
      emailVerified: user.emailVerified,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    });

    const profileVO = UserProfileVO.create({
      userId: profile.userId,
      avatar: profile.avatar,
      bio: profile.bio,
      visibility: profile.visibility,
    });

    const preferencesVO = UserPreferencesVO.create({
      userId: preferences.userId,
      entries: preferences.entries.map((e) => ({ key: e.key, value: e.value })),
    });

    return UserPersonaVO.create({
      user: userVO,
      profile: profileVO,
      preferences: preferencesVO,
    });
  }
}
