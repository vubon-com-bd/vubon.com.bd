import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const REMINDER_QUEUE = 'reminder';

export interface ReminderJobPayload {
  readonly cartId: string;
  readonly userId: string | null;
  readonly stage: '1h' | '24h' | '48h';
}

@Injectable()
export class ReminderQueue {
  readonly queueName = REMINDER_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueueEmail(payload: ReminderJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-reminder-email', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  async enqueueSms(payload: ReminderJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-reminder-sms', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }
}
