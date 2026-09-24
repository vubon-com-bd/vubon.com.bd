import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface CleanupJobPayload {
  readonly retentionDays: number;
  readonly batchSize: number;
}

@Injectable()
export class CleanupQueue {
  readonly queueName = 'analytics:cleanup';

  constructor(private readonly queueService: QueueService) {}

  async enqueueCleanup(payload: CleanupJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'cleanup-expired', payload, {
      priority: QUEUE_PRIORITY.BACKGROUND,
      delayMs: 60 * 60 * 1000, // 1h
    });
  }
}
