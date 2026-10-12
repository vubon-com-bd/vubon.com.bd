/**
 * Metric Queue
 * @module analytics-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-metric';

export interface MetricAggregationJobPayload {
  readonly metricName: string;
  readonly seriesKey: string;
  readonly granularity: string;
}

@Injectable()
export class MetricQueue {
  constructor(private readonly queue: QueueService) {}

  async enqueueAggregation(payload: MetricAggregationJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE, 'aggregate-metric', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
      jobId: `agg:${payload.seriesKey}:${payload.granularity}`,
    });
  }

  get queueName(): string {
    return QUEUE;
  }
}
