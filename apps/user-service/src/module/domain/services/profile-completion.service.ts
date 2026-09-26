import { UserEntity } from '../entities/user.entity';
import { UserProfileEntity } from '../entities/user-profile.entity';

export class ProfileCompletionService {
  static calculate(user: UserEntity, profile: UserProfileEntity | null): number {
    let score = 0;
    let total = 5;

    if (user.name.value.length > 0) score += 1;
    if (user.emailVerified) score += 1;
    if (user.phone !== null) score += 1;
    if (profile?.avatar) score += 1;
    if (profile?.bio) score += 1;

    return Math.round((score / total) * 100);
  }

  static isComplete(user: UserEntity, profile: UserProfileEntity | null): boolean {
    return ProfileCompletionService.calculate(user, profile) === 100;
  }
}
