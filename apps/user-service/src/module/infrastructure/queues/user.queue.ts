import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface UserSyncJobPayload {
  readonly userId: string;
  readonly correlationId?: string;
}

@Injectable()
export class UserQueue {
  readonly queueName = QUEUE_NAME.AUTH;

  constructor(private readonly queueService: QueueService) {}

  async enqueueSync(payload: UserSyncJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'user-sync', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  async enqueueNotification(userId: string, template: string): Promise<string> {
    return this.queueService.enqueue(
      QUEUE_NAME.NOTIFICATION,
      template,
      { userId },
      { priority: QUEUE_PRIORITY.HIGH },
    );
  }
}
