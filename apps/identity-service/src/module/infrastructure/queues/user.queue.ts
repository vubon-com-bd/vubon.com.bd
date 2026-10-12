/**
 * User Queue
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from './queue.constants.js';

export interface UserSyncEnqueuePayload {
  readonly batchSize: number;
}

@Injectable()
export class UserQueue {
  private readonly logger = new Logger(UserQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSync(payload: UserSyncEnqueuePayload): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.SYNC,
        AUTH_JOB_NAME.DEVICE_SYNC,
        payload as unknown as Record<string, unknown>,
        { priority: QUEUE_PRIORITY.LOW, jobId: `user-sync:${Date.now()}` },
      );
    } catch (err) {
      this.logger.warn(`user sync enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return '';
    }
  }
}
