/**
 * CleanupWorker — periodic housekeeping for stale + expired data
 * @module notification-service/infrastructure/workers
 *
 * Jobs: cleanup-stale-notifications, cleanup-expired-notifications,
 *       cleanup-old-attempts, cleanup-rate-limits
 *
 * The worker itself is invoked by an external scheduler (cron-style job
 * enqueues with delayMs). It performs best-effort cleanup and re-enqueues
 * itself for the next cycle.
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_LIMITS,
} from '../queues/queue.constants.js';
import { CleanupQueue } from '../queues/cleanup.queue.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';

const STALE_PENDING_MINUTES = 60;
const EXPIRED_BATCH_SIZE = 500;

@Injectable()
export class CleanupWorker extends BaseWorker<Record<string, unknown>> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.CLEANUP;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.CLEANUP_STALE_NOTIFICATIONS,
    NOTIFICATION_JOB_NAME.CLEANUP_EXPIRED_NOTIFICATIONS,
    NOTIFICATION_JOB_NAME.CLEANUP_OLD_ATTEMPTS,
    NOTIFICATION_JOB_NAME.CLEANUP_RATE_LIMITS,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepo: NotificationRepository,
    private readonly cleanupQueue: CleanupQueue,
  ) {
    super(queueService, 'CleanupWorker');
  }

  protected async handle(payload: Record<string, unknown>): Promise<unknown> {
    const stale = await this.notificationRepo.findStalePending(STALE_PENDING_MINUTES);
    this.logger.log(`Cleanup: ${stale.length} stale pending notifications`);

    let markedStale = 0;
    for (const n of stale.slice(0, EXPIRED_BATCH_SIZE)) {
      try {
        n.expire();
        await this.notificationRepo.save(n);
        markedStale++;
      } catch (err) {
        this.logger.warn(`Expire failed for ${n.id}: ${(err as Error).message}`);
      }
    }

    const expired = await this.notificationRepo.findExpired();
    let archived = 0;
    for (const n of expired.slice(0, EXPIRED_BATCH_SIZE)) {
      try {
        if (!n.isExpired()) {
          n.expire();
          await this.notificationRepo.save(n);
        }
        archived++;
      } catch (err) {
        this.logger.warn(`Archive failed for ${n.id}: ${(err as Error).message}`);
      }
    }

    // Self-reschedule
    await this.cleanupQueue.enqueueStaleCleanup(
      { olderThanMinutes: STALE_PENDING_MINUTES },
      NOTIFICATION_QUEUE_LIMITS.CLEANUP_INTERVAL_MS,
    );

    void payload;
    this.logger.log(`Cleanup done: stale=${markedStale} expired=${archived}`);
    return { markedStale, archived };
  }

  protected concurrency(): number {
    return 1;
  }
}
