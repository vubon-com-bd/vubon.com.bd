/**
 * ProfileVisibilityService — visibility rules
 * @module identity-service/domain/services
 */
import { USER_PROFILE_VISIBILITY } from '@vubon/shared-constants/user';

export interface VisibilityContext {
  readonly viewerId?: string;
  readonly targetUserId: string;
  readonly visibility: string;
  readonly isFollower?: boolean;
  readonly isFriend?: boolean;
  readonly isAdmin?: boolean;
}

export class ProfileVisibilityService {
  static canView(context: VisibilityContext): boolean {
    if (context.isAdmin) return true;
    if (context.viewerId === context.targetUserId) return true;

    switch (context.visibility) {
      case USER_PROFILE_VISIBILITY.PUBLIC:
        return true;
      case USER_PROFILE_VISIBILITY.PRIVATE:
        return false;
      case USER_PROFILE_VISIBILITY.FRIENDS:
        return context.isFriend === true;
      case USER_PROFILE_VISIBILITY.FOLLOWERS:
        return context.isFollower === true;
      case USER_PROFILE_VISIBILITY.ONLY_ME:
        return false;
      default:
        return false;
    }
  }

  static canSearch(visibility: string): boolean {
    return visibility === USER_PROFILE_VISIBILITY.PUBLIC;
  }

  static canIndex(visibility: string): boolean {
    return visibility === USER_PROFILE_VISIBILITY.PUBLIC;
  }
}
