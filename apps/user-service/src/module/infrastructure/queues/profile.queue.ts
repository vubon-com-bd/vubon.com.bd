/**
 * Profile Queue
 */
import { Injectable } from '@nestjs/common';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface ProfileCompletionJobPayload {
  readonly userId: string;
}

@Injectable()
export class ProfileQueue {
  static readonly name = 'profile';

  constructor(private readonly queues: QueueService) {}

  async enqueueCompletion(payload: ProfileCompletionJobPayload): Promise<void> {
    await this.queues.enqueue(
      ProfileQueue.name,
      'profile.completion',
      { userId: payload.userId },
      {
        priority: QUEUE_PRIORITY.LOW,
      }
    );
  }
}
