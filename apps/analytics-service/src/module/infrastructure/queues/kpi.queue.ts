/**
 * KPI Queue
 * @module analytics-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-kpi';

export interface KpiEvaluateJobPayload {
  readonly kpiId: string;
  readonly actual: number;
}

@Injectable()
export class KpiQueue {
  constructor(private readonly queue: QueueService) {}

  async enqueueEvaluate(payload: KpiEvaluateJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE, 'evaluate-kpi', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }

  async enqueueMonitorRun(): Promise<string> {
    return this.queue.enqueue(QUEUE, 'monitor-kpis', {}, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }

  get queueName(): string {
    return QUEUE;
  }
}
