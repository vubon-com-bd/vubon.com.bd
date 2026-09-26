/**
 * AnalyticsProcessorWorker — Batches analytics events
 * @module auth-service/infrastructure/workers
 */
import { Injectable, Logger } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import type { QueueJobResult } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class AnalyticsProcessorWorker {
  readonly name = 'AnalyticsProcessorWorker';
  private readonly logger = new Logger(AnalyticsProcessorWorker.name);
  private worker?: Worker;

  start(connection: { host: string; port: number }): void {
    if (this.worker) return;
    this.worker = new Worker(
      QUEUE_NAME.ANALYTICS,
      async (job: Job) => this.handle(job),
      { connection, concurrency: QUEUE_LIMIT.CONCURRENCY },
    );
  }

  async stop(): Promise<void> {
    if (this.worker) await this.worker.close();
    this.worker = undefined;
  }

  private async handle(job: Job): Promise<QueueJobResult> {
    this.logger.log(`Analytics event ${job.name} — id=${job.id}`);
    return { jobId: String(job.id), success: true };
  }
}
