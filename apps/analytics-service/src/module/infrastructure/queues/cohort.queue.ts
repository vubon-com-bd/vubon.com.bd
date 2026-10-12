/**
 * Cohort Queue
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-cohort';

export interface CohortBuildJobPayload {
  readonly cohortId: string;
  readonly maxPeriods: number;
}

@Injectable()
export class CohortQueue {
  constructor(private readonly queue: QueueService) {}

  async enqueueBuild(payload: CohortBuildJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE, 'build-cohort', payload, {
      priority: QUEUE_PRIORITY.LOW,
      jobId: `cohort:${payload.cohortId}`,
    });
  }

  get queueName(): string {
    return QUEUE;
  }
}
