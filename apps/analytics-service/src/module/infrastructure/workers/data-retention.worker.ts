/**
 * Data Retention Worker
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { CleanupQueue } from '../queues/cleanup.queue.js';

@Injectable()
export class DataRetentionWorker implements OnModuleInit {
  private readonly logger = new Logger(DataRetentionWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly cleanupQueue: CleanupQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.cleanupQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { cutoffIso?: string; retentionDays?: number };
        this.logger.debug(`Retention cleanup: cutoff=${job.cutoffIso}, days=${job.retentionDays}`);
        return { purged: 0 };
      },
      1
    );
  }
}
