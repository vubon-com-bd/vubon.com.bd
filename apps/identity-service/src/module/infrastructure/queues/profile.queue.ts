/**
 * Profile Queue
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { AUTH_QUEUE_NAME } from './queue.constants.js';

export interface ProfileCompletionEnqueuePayload {
  readonly userId?: string;
  readonly force?: boolean;
}

@Injectable()
export class ProfileQueue {
  private readonly logger = new Logger(ProfileQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueCompletion(payload: ProfileCompletionEnqueuePayload): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.AUTH,
        'profile-completion',
        payload as unknown as Record<string, unknown>,
        {
          priority: QUEUE_PRIORITY.LOW,
          jobId: payload.userId ? `profile-completion:${payload.userId}` : undefined,
        },
      );
    } catch (err) {
      this.logger.warn(`profile completion enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return '';
    }
  }
}
