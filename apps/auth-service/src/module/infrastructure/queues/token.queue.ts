import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface TokenCleanupJobPayload {
  readonly olderThanMs: number;
}

@Injectable()
export class TokenQueue {
  readonly queueName = QUEUE_NAME.TOKEN;

  constructor(private readonly queueService: QueueService) {}

  async enqueueCleanup(olderThanMs: number): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'token-cleanup',
      { olderThanMs },
      { priority: QUEUE_PRIORITY.LOW },
    );
  }
}
