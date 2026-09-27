/**
 * ProfileVisibilityService — Domain Service
 */
import { UserProfileEntity } from '../entities/user-profile.entity.js';
import { UserEntity } from '../entities/user.entity.js';

export type ViewerRelationship = 'self' | 'follower' | 'friend' | 'stranger' | 'admin';

export class ProfileVisibilityService {
  static canViewProfile(
    profile: UserProfileEntity,
    viewer: ViewerRelationship
  ): boolean {
    if (viewer === 'self' || viewer === 'admin') return true;

    const visibility = profile.visibility.value;
    switch (visibility) {
      case 'public':
        return true;
      case 'private':
      case 'only_me':
        return false;
      case 'followers':
        return viewer === 'follower';
      case 'friends':
        return viewer === 'friend';
      default:
        return false;
    }
  }

  static canViewField(
    profile: UserProfileEntity,
    field: 'bio' | 'avatar' | 'visibility',
    viewer: ViewerRelationship
  ): boolean {
    if (!ProfileVisibilityService.canViewProfile(profile, viewer)) return false;
    if (field === 'visibility') return viewer === 'self';
    return true;
  }

  static shouldHideFromSearch(user: UserEntity, profile: UserProfileEntity): boolean {
    if (user.isDeleted()) return true;
    if (!user.isActive()) return true;
    if (profile.visibility.value === 'private') return true;
    if (profile.visibility.value === 'only_me') return true;
    return false;
  }
}
