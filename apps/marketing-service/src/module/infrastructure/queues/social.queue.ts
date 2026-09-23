import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface SocialJobPayload {
  readonly postId: string;
  readonly action: 'schedule' | 'publish';
}

@Injectable()
export class SocialQueue {
  readonly queueName = 'marketing-social';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: SocialJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.action, payload);
  }
}
