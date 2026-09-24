import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface AggregateMetricJobPayload {
  readonly metricName: string;
  readonly aggregation: string;
  readonly fromMs: number;
  readonly toMs: number;
}

@Injectable()
export class MetricQueue {
  readonly queueName = 'analytics:metric';

  constructor(private readonly queueService: QueueService) {}

  async enqueueAggregate(payload: AggregateMetricJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'aggregate-metric', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
