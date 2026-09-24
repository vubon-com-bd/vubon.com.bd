import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface EscalationJobPayload {
  readonly ticketId: string;
  readonly level: string;
  readonly reason: string;
}

@Injectable()
export class EscalationQueue {
  readonly queueName = QUEUE_NAME.NOTIFICATION;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: EscalationJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'escalation.notify',
      payload,
      { priority: QUEUE_PRIORITY.CRITICAL },
    );
  }
}
