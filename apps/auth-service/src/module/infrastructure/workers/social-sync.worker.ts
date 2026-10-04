/**
 * SocialSyncWorker — Refreshes social provider profiles
 * @module auth-service/infrastructure/workers
 */
import { Injectable, Logger } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import type { QueueJobResult } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class SocialSyncWorker {
  readonly name = 'SocialSyncWorker';
  private readonly logger = new Logger(SocialSyncWorker.name);
  private worker?: Worker;

  start(connection: { host: string; port: number }): void {
    if (this.worker) return;
    this.worker = new Worker(
      QUEUE_NAME.SYNC,
      async (job: Job) => this.handle(job),
      { connection, concurrency: QUEUE_LIMIT.CONCURRENCY },
    );
  }

  async stop(): Promise<void> {
    if (this.worker) await this.worker.close();
    this.worker = undefined;
  }

  private async handle(job: Job): Promise<QueueJobResult> {
    if (job.name !== 'social-sync') {
      return { jobId: String(job.id), success: true };
    }
    // Real impl calls provider SDK — Infrastructure concern.
    this.logger.log(`Social sync job ${job.id} for userId=${job.data.userId}`);
    return { jobId: String(job.id), success: true };
  }
}
