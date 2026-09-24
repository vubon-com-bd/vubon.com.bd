import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface EvaluateKpiJobPayload {
  readonly kpiId: string;
  readonly actual: number;
}

@Injectable()
export class KpiQueue {
  readonly queueName = 'analytics:kpi';

  constructor(private readonly queueService: QueueService) {}

  async enqueueEvaluate(payload: EvaluateKpiJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'evaluate-kpi', payload, {
      priority: QUEUE_PRIORITY.HIGH,
    });
  }
}
