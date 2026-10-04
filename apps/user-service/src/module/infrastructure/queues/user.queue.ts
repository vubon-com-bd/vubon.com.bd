/**
 * User Queue — sync, activities, notifications
 * @module user-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface UserSyncJobPayload {
  readonly userId: string;
  readonly correlationId?: string;
}

@Injectable()
export class UserQueue {
  static readonly name = QUEUE_NAME.SYNC;

  constructor(private readonly queues: QueueService) {}

  async enqueueSync(payload: UserSyncJobPayload): Promise<void> {
    await this.queues.enqueue(
      UserQueue.name,
      'user.sync',
      {
        userId: payload.userId,
        correlationId: payload.correlationId,
      },
      {
        priority: QUEUE_PRIORITY.NORMAL,
      }
    );
  }
}
