/**
 * ActivityCleanupWorker — purges old activities
 * @module identity-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME } from '../queues/queue.constants.js';
import type { UserActivityRepository } from '../../domain/repositories/user-activity.repository.interface.js';
import { USER_ACTIVITY_REPOSITORY } from '../../domain/repositories/user-activity.repository.interface.js';
import { ACTIVITY_CONFIG } from '@vubon/shared-config/user';

export interface ActivityCleanupPayload {
  readonly olderThanDays?: number;
}

@Injectable()
export class ActivityCleanupWorker extends BaseWorker<ActivityCleanupPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.AUTH;
  protected readonly jobNames = ['activity-cleanup'] as const;

  constructor(
    queueService: QueueService,
    @Inject(USER_ACTIVITY_REPOSITORY)
    private readonly activityRepo: UserActivityRepository,
  ) {
    super(queueService, 'ActivityCleanupWorker');
  }

  protected async handle(payload: ActivityCleanupPayload): Promise<unknown> {
    const days = payload.olderThanDays ?? ACTIVITY_CONFIG.retentionDays;
    const cutoff = new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();
    const purged = await this.activityRepo.purge(cutoff);
    this.logger.log(`Purged ${purged} activities older than ${days}d`);
    return { purged };
  }

  protected concurrency(): number {
    return 1;
  }
}
