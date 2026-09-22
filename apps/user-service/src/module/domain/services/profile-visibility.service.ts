import { UserProfileEntity } from '../entities/user-profile.entity';

export class ProfileVisibilityService {
  static canView(
    profile: UserProfileEntity,
    viewerId: string,
  ): boolean {
    if (profile.visibility.isPublic()) return true;
    if (profile.userId.value === viewerId) return true;
    return false;
  }
}
