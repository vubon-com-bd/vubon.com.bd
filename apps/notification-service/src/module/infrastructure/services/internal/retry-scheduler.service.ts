/**
 * RetrySchedulerInfraService — enqueues retry operations
 * @module notification-service/infrastructure/services/internal
 *
 * Wraps domain `RetryPolicyService` + `RetryQueue` to schedule retries।
 */
import { Injectable, Logger } from '@nestjs/common';

import { RetryPolicyService } from '@domain/services/retry-policy.service.js';
import { RetryQueue } from '@infrastructure/queues/retry.queue.js';

export interface ScheduleRetryRequest {
  readonly notificationId: string;
  readonly channel: string;
  readonly attemptNumber: number;
  readonly errorCode?: string;
}

export interface ScheduleRetryResult {
  readonly scheduled: boolean;
  readonly delayMs: number;
  readonly attempt: number;
  readonly reason: string;
}

@Injectable()
export class RetrySchedulerInfraService {
  private readonly logger = new Logger(RetrySchedulerInfraService.name);

  constructor(private readonly retryQueue: RetryQueue) {}

  async schedule(request: ScheduleRetryRequest): Promise<ScheduleRetryResult> {
    const decision = RetryPolicyService.decide({
      attemptNumber: request.attemptNumber,
      errorCode: request.errorCode,
    });

    if (!decision.shouldRetry) {
      this.logger.debug(
        `Retry not scheduled for ${request.notificationId}: ${decision.reason}`,
      );
      return {
        scheduled: false,
        delayMs: 0,
        attempt: request.attemptNumber,
        reason: decision.reason,
      };
    }

    const nextRetryAt = new Date(Date.now() + decision.nextDelayMs).toISOString();

    await this.retryQueue.enqueueProcess(
      {
        notificationId: request.notificationId,
        channel: request.channel,
        attempt: request.attemptNumber + 1,
        nextRetryAt,
      },
      decision.nextDelayMs,
    );

    this.logger.log(
      `⏱️  Retry scheduled: notification=${request.notificationId} attempt=${request.attemptNumber + 1} delay=${decision.nextDelayMs}ms`,
    );

    return {
      scheduled: true,
      delayMs: decision.nextDelayMs,
      attempt: request.attemptNumber + 1,
      reason: decision.reason,
    };
  }

  isRetryable(errorCode?: string): boolean {
    const decision = RetryPolicyService.decide({
      attemptNumber: 1,
      errorCode,
    });
    return decision.shouldRetry;
  }
}
