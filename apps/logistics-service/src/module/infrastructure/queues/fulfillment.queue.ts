import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from './queue.constants.js';

export interface ProcessFulfillmentPayload {
  readonly fulfillmentId: string;
  readonly action: string;
}

@Injectable()
export class FulfillmentQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessFulfillmentPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.FULFILLMENT_PROCESSING,
      LOGISTICS_JOB_NAME.PROCESS_FULFILLMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process:${payload.fulfillmentId}:${payload.action}`,
      },
    );
  }

  async enqueueSlaCheck(fulfillmentId: string, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.FULFILLMENT_PROCESSING,
      LOGISTICS_JOB_NAME.CHECK_SLA,
      { fulfillmentId },
      { priority: QUEUE_PRIORITY.NORMAL, delayMs, jobId: `sla:${fulfillmentId}` },
    );
  }
}
