import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { RETENTION_CONFIG } from '../config/retention.config';
import { WORKER_CONFIG } from '../config/worker.config';

@Injectable()
export class DataRetentionWorker implements OnModuleInit {
  private readonly logger = new Logger(DataRetentionWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      retentionDays: number;
      batchSize: number;
    }>('analytics:cleanup', async (payload) => {
      this.logger.log(
        `Cleaning data older than ${payload.retentionDays} days`,
      );
      void RETENTION_CONFIG;
    }, WORKER_CONFIG.cleanupConcurrency);
  }
}
