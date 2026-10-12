/**
 * Cohort Builder Worker
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { CohortQueue } from '../queues/cohort.queue.js';

@Injectable()
export class CohortBuilderWorker implements OnModuleInit {
  private readonly logger = new Logger(CohortBuilderWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly cohortQueue: CohortQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.cohortQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { cohortId: string; maxPeriods: number };
        this.logger.debug(`Building cohort ${job.cohortId}`);
        return { built: true, cohortId: job.cohortId };
      },
      2
    );
  }
}
