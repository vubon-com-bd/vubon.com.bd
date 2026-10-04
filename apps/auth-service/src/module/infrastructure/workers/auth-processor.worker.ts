/**
 * AuthProcessorWorker — Handles generic auth jobs
 * @module auth-service/infrastructure/workers
 */
import { Injectable, Logger } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import type { QueueJobResult } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';

export interface AuthJobData {
  readonly kind: string;
  readonly userId?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AuthProcessorWorker {
  readonly name = 'AuthProcessorWorker';
  private readonly logger = new Logger(AuthProcessorWorker.name);
  private worker?: Worker;

  start(connection: { host: string; port: number }): void {
    if (this.worker) return;
    this.worker = new Worker<AuthJobData>(
      QUEUE_NAME.AUTH,
      async (job: Job<AuthJobData>) => this.handle(job),
      {
        connection,
        concurrency: QUEUE_LIMIT.CONCURRENCY,
      },
    );
    this.worker.on('failed', (job, err) => {
      this.logger.error(`Auth job ${job?.id} failed: ${err.message}`);
    });
  }

  async stop(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
      this.worker = undefined;
    }
  }

  private async handle(job: Job<AuthJobData>): Promise<QueueJobResult> {
    this.logger.log(`Processing auth job ${job.id} (kind=${job.data.kind})`);
    return {
      jobId: String(job.id),
      success: true,
      data: { kind: job.data.kind },
    };
  }
}
