/**
 * ProfileCompletionWorker — recomputes profile completeness
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME } from '../queues/queue.constants.js';
import type { UserProfileRepository } from '../../domain/repositories/user-profile.repository.interface.js';
import { USER_PROFILE_REPOSITORY } from '../../domain/repositories/user-profile.repository.interface.js';

export interface ProfileCompletionPayload {
  readonly userId?: string;
  readonly force?: boolean;
}

@Injectable()
export class ProfileCompletionWorker extends BaseWorker<ProfileCompletionPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.AUTH;
  protected readonly jobNames = ['profile-completion'] as const;

  constructor(
    queueService: QueueService,
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository,
  ) {
    super(queueService, 'ProfileCompletionWorker');
  }

  protected async handle(payload: ProfileCompletionPayload): Promise<unknown> {
    if (payload.userId) {
      const profile = await this.profileRepo.findByUserIdRaw(payload.userId);
      return { userId: payload.userId, found: !!profile };
    }
    const profiles = await this.profileRepo.findAll();
    this.logger.log(`Scanned ${profiles.length} profiles`);
    return { scanned: profiles.length };
  }

  protected concurrency(): number {
    return 3;
  }
}
