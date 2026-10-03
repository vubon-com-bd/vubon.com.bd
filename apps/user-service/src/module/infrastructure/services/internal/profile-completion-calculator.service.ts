/**
 * ProfileCompletionCalculatorService
 * @module user-service/infrastructure/services/internal
 *
 * Injectable adapter around domain ProfileCompletionService.
 * Used by workers / sagas to compute completion without depending on
 * static domain service directly.
 */
import { Injectable } from '@nestjs/common';
import { ProfileCompletionService } from '@domain/services/profile-completion.service';
import { UserEntity } from '@domain/entities/user.entity';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';

export interface ProfileCompletionResult {
  readonly percentage: number;
  readonly completed: readonly string[];
  readonly missing: readonly string[];
  readonly isComplete: boolean;
}

@Injectable()
export class ProfileCompletionCalculatorService {
  calculate(
    user: UserEntity,
    profile: UserProfileEntity
  ): ProfileCompletionResult {
    const breakdown = ProfileCompletionService.calculate(user, profile);
    return {
      percentage: breakdown.percentage,
      completed: breakdown.completed,
      missing: breakdown.missing,
      isComplete: breakdown.percentage === 100,
    };
  }

  isComplete(user: UserEntity, profile: UserProfileEntity): boolean {
    return ProfileCompletionService.isComplete(user, profile);
  }

  meetsThreshold(
    user: UserEntity,
    profile: UserProfileEntity,
    threshold: number
  ): boolean {
    return ProfileCompletionService.minimumThresholdMet(user, profile, threshold);
  }
}
