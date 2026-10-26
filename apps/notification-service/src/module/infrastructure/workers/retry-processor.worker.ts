/**
 * RetryProcessorWorker — retry dispatcher worker
 * @module notification-service/infrastructure/workers
 *
 * Flow:
 *  1. Load notification in failed state
 *  2. Check retry policy decision
 *  3. If retryable → re-enqueue to channel queue
 *  4. If exhausted → mark permanently failed
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { RetryPolicyService } from '@domain/services/retry-policy.service.js';

import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface RetryProcessorPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly attempt: number;
  readonly nextRetryAt: string;
}

@Injectable()
export class RetryProcessorWorker extends BaseWorker<RetryProcessorPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.RETRY;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.PROCESS_RETRY] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
  ) {
    super(queueService, 'RetryProcessorWorker');
  }

  protected async handle(payload: RetryProcessorPayload): Promise<unknown> {
    const vo = NotificationIdVO.reconstitute(payload.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Notification ${payload.notificationId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    const decision = RetryPolicyService.decide({
      attemptNumber: payload.attempt,
    });

    if (!decision.shouldRetry) {
      this.logger.warn(
        `Retry exhausted for ${payload.notificationId} — ${decision.reason}`,
      );
      return { processed: false, reason: decision.reason };
    }

    this.logger.log(
      `🔄 Retry → notification=${payload.notificationId} attempt=${payload.attempt + 1} delay=${decision.nextDelayMs}ms`,
    );

    entity.queue();
    await this.repo.save(entity);

    return {
      processed: true,
      nextAttempt: payload.attempt + 1,
      delayMs: decision.nextDelayMs,
    };
  }

  protected concurrency(): number {
    return 5;
  }
}
