import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME, LOGISTICS_QUEUE_LIMITS } from './queue.constants.js';

export interface ProcessDeliveryPayload {
  readonly deliveryId: string;
  readonly action: string;
}

@Injectable()
export class DeliveryQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessDeliveryPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.DELIVERY_PROCESSING,
      LOGISTICS_JOB_NAME.PROCESS_DELIVERY,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process:${payload.deliveryId}:${payload.action}`,
      },
    );
  }

  async enqueueRetry(deliveryId: string, attempt: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.DELIVERY_PROCESSING,
      LOGISTICS_JOB_NAME.RETRY_DELIVERY,
      { deliveryId, attempt },
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs: LOGISTICS_QUEUE_LIMITS.RETRY_DELAY_MS,
        jobId: `retry:${deliveryId}:${attempt}`,
      },
    );
  }
}
