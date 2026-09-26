import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { WORKER_CONFIG } from '../config/worker.config';

@Injectable()
export class CohortBuilderWorker implements OnModuleInit {
  private readonly logger = new Logger(CohortBuilderWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ bucketKey: string; period: string }>(
      'analytics:cohort',
      async (payload) => {
        this.logger.debug(`Building cohort for ${payload.bucketKey}`);
      },
      WORKER_CONFIG.cohortBuilderConcurrency,
    );
  }
}
