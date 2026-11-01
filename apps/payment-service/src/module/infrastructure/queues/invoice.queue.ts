/**
 * InvoiceQueue
 * @module payment-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from './queue.constants.js';

export interface InvoicePayload {
  readonly invoiceId: string;
}

@Injectable()
export class InvoiceQueue {
  private readonly logger = new Logger(InvoiceQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueGenerate(payload: InvoicePayload): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.INVOICE,
      PAYMENT_JOB_NAME.GENERATE_INVOICE,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `generate-invoice:${payload.invoiceId}`,
      },
    );
  }

  async enqueueSend(payload: InvoicePayload): Promise<string> {
    return this.queueService.enqueue(
      PAYMENT_QUEUE_NAME.INVOICE,
      PAYMENT_JOB_NAME.SEND_INVOICE,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `send-invoice:${payload.invoiceId}`,
      },
    );
  }
}
