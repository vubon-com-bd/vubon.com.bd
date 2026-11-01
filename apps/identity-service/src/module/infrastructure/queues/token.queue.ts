/**
 * Token Queue — cleanup + revocation sweep
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from './queue.constants.js';

export interface TokenCleanupPayload {
  readonly olderThanHours: number;
}

@Injectable()
export class TokenQueue {
  private readonly logger = new Logger(TokenQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueCleanup(
    payload: TokenCleanupPayload = { olderThanHours: 168 },
  ): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.TOKEN,
        AUTH_JOB_NAME.TOKEN_CLEANUP,
        payload as unknown as Record<string, unknown>,
        {
          priority: QUEUE_PRIORITY.BACKGROUND,
          jobId: `token-cleanup:${Date.now()}`,
        },
      );
    } catch (err) {
      this.logger.warn(
        `token cleanup enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return '';
    }
  }

  async enqueueRevocationSweep(): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.TOKEN,
        AUTH_JOB_NAME.TOKEN_REVOCATION_SWEEP,
        {} as Record<string, unknown>,
        { priority: QUEUE_PRIORITY.LOW },
      );
    } catch (err) {
      this.logger.warn(
        `token revocation sweep failed: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      return '';
    }
  }
}
