import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface SlaCheckJobPayload {
  readonly ticketId: string;
  readonly slaId: string;
}

@Injectable()
export class SlaQueue {
  readonly queueName = QUEUE_NAME.ANALYTICS;

  constructor(private readonly queueService: QueueService) {}

  async enqueueCheck(payload: SlaCheckJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      'sla.check',
      payload,
      { priority: QUEUE_PRIORITY.HIGH },
    );
  }

  async enqueueBreachAlert(payload: SlaCheckJobPayload): Promise<string> {
    return this.queueService.enqueue(
      QUEUE_NAME.NOTIFICATION,
      'sla.breach-alert',
      payload,
      { priority: QUEUE_PRIORITY.CRITICAL },
    );
  }
}
