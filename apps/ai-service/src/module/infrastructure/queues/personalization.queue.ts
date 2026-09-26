import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const PERSONALIZATION_QUEUE_NAME = 'ai-personalization';

export interface PersonalizationJobPayload {
  readonly userId: string;
  readonly interactionCount: number;
}

@Injectable()
export class PersonalizationQueue {
  readonly name = PERSONALIZATION_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: PersonalizationJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'build-profile', payload, {
      priority: QUEUE_PRIORITY.LOW,
    });
  }
}
