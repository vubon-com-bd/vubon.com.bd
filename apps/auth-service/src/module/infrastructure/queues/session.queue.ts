import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface SessionCleanupJobPayload {
  readonly olderThanMs: number;
}

export interface SessionRevokeJobPayload {
  readonly sessionId: string;
  readonly reason: string;
}

@Injectable()
export class SessionQueue {
  readonly queueName = QUEUE_NAME.SESSION;

  constructor(private readonly queueService: QueueService) {}

  async enqueueCleanup(olderThanMs: number): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'session-cleanup',
      { olderThanMs },
      { priority: QUEUE_PRIORITY.LOW },
    );
  }

  async enqueueRevoke(payload: SessionRevokeJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'session-revoke', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }
}
