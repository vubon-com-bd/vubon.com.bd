import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const ABANDONMENT_QUEUE = 'abandonment';

export interface AbandonmentJobPayload {
  readonly cartId: string;
  readonly userId: string | null;
  readonly idleHours: number;
}

@Injectable()
export class AbandonmentQueue {
  readonly queueName = ABANDONMENT_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueueDetect(payload: AbandonmentJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'detect-abandonment', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  async enqueueMark(payload: AbandonmentJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'mark-abandoned', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
