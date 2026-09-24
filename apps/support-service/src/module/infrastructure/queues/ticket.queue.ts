import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface TicketNotificationJobPayload {
  readonly ticketId: string;
  readonly userId: string;
  readonly eventType: 'created' | 'updated' | 'resolved' | 'closed';
}

@Injectable()
export class TicketQueue {
  readonly queueName = QUEUE_NAME.NOTIFICATION;

  constructor(private readonly queueService: QueueService) {}

  async enqueueNotification(payload: TicketNotificationJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      `ticket.${payload.eventType}`,
      payload,
      { priority: QUEUE_PRIORITY.NORMAL },
    );
  }

  async enqueueAutoClose(ticketId: string, delayMs: number): Promise<string> {
    return this.queueService.enqueue(
      QUEUE_NAME.CLEANUP,
      'ticket.auto-close',
      { ticketId },
      { priority: QUEUE_PRIORITY.LOW, delayMs },
    );
  }
}
