/**
 * ProfileCompletionWorker
 */
import { Injectable, Inject } from '@nestjs/common';
import { LoggerService } from '@vubon/shared-kernel/infrastructure';
import {
  USER_PROFILE_REPOSITORY,
} from '@domain/repositories/user-profile.repository.interface';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import {
  USER_REPOSITORY,
} from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ProfileCompletionCalculatorService } from '../services/internal/profile-completion-calculator.service.js';

export interface ProfileCompletionJob {
  readonly id: string;
  readonly data: { readonly userId: string };
}

@Injectable()
export class ProfileCompletionWorker {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository,
    private readonly calculator: ProfileCompletionCalculatorService,
    private readonly logger: LoggerService
  ) {}

  async process(job: ProfileCompletionJob): Promise<void> {
    const { userId } = job.data;
    const idVO = UserIdVO.create(userId);

    const user = await this.userRepo.findById(idVO.value);
    if (!user) {
      this.logger.warn(`User not found for profile completion: ${userId}`);
      return;
    }

    const profile = await this.profileRepo.findByUserId(idVO);
    if (!profile) {
      this.logger.warn(`Profile not found for user: ${userId}`);
      return;
    }

    const result = this.calculator.calculate(user, profile);
    this.logger.log(
      `Profile completion for ${userId}: ${result.percentage}%`,
      { userId, percentage: result.percentage }
    );
  }
}
