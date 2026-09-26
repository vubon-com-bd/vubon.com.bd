import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface DetectAnomalyJobPayload {
  readonly metricName: string;
  readonly currentValue: number;
}

@Injectable()
export class AnomalyQueue {
  readonly queueName = 'analytics:anomaly';

  constructor(private readonly queueService: QueueService) {}

  async enqueueDetect(payload: DetectAnomalyJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'detect-anomaly', payload, {
      priority: QUEUE_PRIORITY.CRITICAL,
    });
  }
}
