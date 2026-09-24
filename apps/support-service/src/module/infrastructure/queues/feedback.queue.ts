import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface FeedbackJobPayload {
  readonly feedbackId: string;
  readonly userId: string;
  readonly type: string;
}

@Injectable()
export class FeedbackQueue {
  readonly queueName = QUEUE_NAME.NOTIFICATION;

  constructor(private readonly queueService: QueueService) {}

  async enqueueSubmit(payload: FeedbackJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'feedback.submitted',
      payload,
      { priority: QUEUE_PRIORITY.NORMAL },
    );
  }

  async enqueueFollowup(feedbackId: string): Promise<string> {
    return this.queueService.enqueue(
      QUEUE_NAME.ANALYTICS,
      'feedback.followup',
      { feedbackId },
      { priority: QUEUE_PRIORITY.LOW },
    );
  }
}
