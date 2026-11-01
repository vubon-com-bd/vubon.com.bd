import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME, LOGISTICS_QUEUE_LIMITS } from './queue.constants.js';

export interface ProcessShipmentPayload {
  readonly shipmentId: string;
  readonly action: string;
}

export interface RetryShipmentPayload {
  readonly shipmentId: string;
  readonly attempt: number;
}

@Injectable()
export class ShipmentQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessShipmentPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.SHIPMENT_PROCESSING,
      LOGISTICS_JOB_NAME.PROCESS_SHIPMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process:${payload.shipmentId}:${payload.action}`,
      },
    );
  }

  async enqueueRetry(payload: RetryShipmentPayload, delayMs: number = LOGISTICS_QUEUE_LIMITS.RETRY_DELAY_MS): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.SHIPMENT_PROCESSING,
      LOGISTICS_JOB_NAME.RETRY_SHIPMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry:${payload.shipmentId}:${payload.attempt}`,
      },
    );
  }

  async enqueueExpire(shipmentId: string, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.SHIPMENT_PROCESSING,
      LOGISTICS_JOB_NAME.EXPIRE_SHIPMENT,
      { shipmentId },
      { priority: QUEUE_PRIORITY.LOW, delayMs, jobId: `expire:${shipmentId}` },
    );
  }
}
