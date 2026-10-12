/**
 * Cleanup Queue
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY, QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-cleanup';

export interface CleanupJobPayload {
  readonly cutoffIso: string;
  readonly retentionDays: number;
}

@Injectable()
export class CleanupQueue {
  constructor(private readonly queue: QueueService) {}

  async enqueueRetentionRun(payload: CleanupJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE, 'retention-cleanup', payload, {
      priority: QUEUE_PRIORITY.BACKGROUND,
      jobId: `cleanup:${payload.cutoffIso}`,
    });
  }

  async enqueueCacheWarm(): Promise<string> {
    return this.queue.enqueue(QUEUE, 'cache-warm', {}, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }

  get queueName(): string {
    return QUEUE;
  }

  static getName(): string {
    return QUEUE_NAME.CLEANUP;
  }
}
