import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface BuildCohortJobPayload {
  readonly bucketKey: string;
  readonly period: string;
}

@Injectable()
export class CohortQueue {
  readonly queueName = 'analytics:cohort';

  constructor(private readonly queueService: QueueService) {}

  async enqueueBuild(payload: BuildCohortJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'build-cohort', payload, {
      priority: QUEUE_PRIORITY.LOW,
    });
  }
}
