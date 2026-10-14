/**
 * CommissionQueue — enqueue helpers for commission calculations
 * @module vendor-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from './queue.constants.js';

export interface CalculateCommissionPayload {
  readonly vendorId: string;
  readonly orderId: string;
  readonly orderAmount: number;
  readonly categoryId?: string;
  readonly currency?: string;
}

@Injectable()
export class CommissionQueue {
  private readonly logger = new Logger(CommissionQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueCalculate(
    payload: CalculateCommissionPayload,
    delayMs?: number,
  ): Promise<string> {
    const jobId = `calc:${payload.vendorId}:${payload.orderId}`;
    const id = await this.queueService.enqueue(
      VENDOR_QUEUE_NAME.COMMISSION_CALC,
      VENDOR_JOB_NAME.CALCULATE_COMMISSION,
      payload,
      { priority: QUEUE_PRIORITY.HIGH, delayMs, jobId },
    );
    this.logger.debug(`Enqueued commission calc for ${jobId}`);
    return id;
  }
}
