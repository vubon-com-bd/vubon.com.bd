/**
 * ProfileCompletionService — Domain Service
 * @module user-service/domain/services
 *
 * Pure business logic: calculate profile completion %.
 */
import { UserEntity } from '../entities/user.entity.js';
import { UserProfileEntity } from '../entities/user-profile.entity.js';

export interface ProfileCompletionBreakdown {
  readonly percentage: number;
  readonly completed: readonly string[];
  readonly missing: readonly string[];
}

export class ProfileCompletionService {
  private static readonly WEIGHTS = {
    name: 15,
    email: 10,
    emailVerified: 15,
    phone: 10,
    phoneVerified: 10,
    avatar: 15,
    bio: 15,
    visibility: 10,
  } as const;

  static calculate(
    user: UserEntity,
    profile: UserProfileEntity
  ): ProfileCompletionBreakdown {
    const completed: string[] = [];
    const missing: string[] = [];
    let percentage = 0;

    if (user.name.value.length > 0) {
      completed.push('name');
      percentage += ProfileCompletionService.WEIGHTS.name;
    } else {
      missing.push('name');
    }

    if (user.email.value.length > 0) {
      completed.push('email');
      percentage += ProfileCompletionService.WEIGHTS.email;
    } else {
      missing.push('email');
    }

    if (user.emailVerified) {
      completed.push('emailVerified');
      percentage += ProfileCompletionService.WEIGHTS.emailVerified;
    } else {
      missing.push('emailVerified');
    }

    if (user.phone !== null) {
      completed.push('phone');
      percentage += ProfileCompletionService.WEIGHTS.phone;
    } else {
      missing.push('phone');
    }

    if (user.phoneVerified) {
      completed.push('phoneVerified');
      percentage += ProfileCompletionService.WEIGHTS.phoneVerified;
    } else {
      missing.push('phoneVerified');
    }

    if (!profile.avatar.isEmpty()) {
      completed.push('avatar');
      percentage += ProfileCompletionService.WEIGHTS.avatar;
    } else {
      missing.push('avatar');
    }

    if (!profile.bio.isEmpty()) {
      completed.push('bio');
      percentage += ProfileCompletionService.WEIGHTS.bio;
    } else {
      missing.push('bio');
    }

    completed.push('visibility');
    percentage += ProfileCompletionService.WEIGHTS.visibility;

    return {
      percentage: Math.min(100, percentage),
      completed,
      missing,
    };
  }

  static isComplete(user: UserEntity, profile: UserProfileEntity): boolean {
    return ProfileCompletionService.calculate(user, profile).percentage === 100;
  }

  static minimumThresholdMet(
    user: UserEntity,
    profile: UserProfileEntity,
    threshold: number
  ): boolean {
    return ProfileCompletionService.calculate(user, profile).percentage >= threshold;
  }
}
