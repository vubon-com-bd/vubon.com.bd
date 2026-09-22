import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface ProfileCompletionJobPayload {
  readonly userId: string;
}

@Injectable()
export class ProfileQueue {
  readonly queueName = QUEUE_NAME.AUTH;

  constructor(private readonly queueService: QueueService) {}

  async enqueueCompletionCheck(payload: ProfileCompletionJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'profile-completion',
      payload,
      { priority: QUEUE_PRIORITY.LOW },
    );
  }
}
