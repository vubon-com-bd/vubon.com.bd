import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface InvoiceJobPayload {
  readonly invoiceId: string;
  readonly number: string;
}

@Injectable()
export class InvoiceQueue {
  readonly queueName = 'invoice';

  constructor(private readonly queueService: QueueService) {}

  async enqueueGenerate(payload: InvoiceJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'generate-invoice', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  async enqueueSend(payload: InvoiceJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'send-invoice', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
