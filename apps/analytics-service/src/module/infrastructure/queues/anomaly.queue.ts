/**
 * Anomaly Queue
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-anomaly';

export interface AnomalyJobPayload {
  readonly metricName: string;
  readonly fromDate: string;
  readonly toDate: string;
}

@Injectable()
export class AnomalyQueue {
  constructor(private readonly queue: QueueService) {}

  async enqueueDetect(payload: AnomalyJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE, 'detect-anomaly', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  get queueName(): string {
    return QUEUE;
  }
}
