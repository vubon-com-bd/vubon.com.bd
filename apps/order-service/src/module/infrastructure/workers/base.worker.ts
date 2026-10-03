/**
 * BaseWorker — shared logging helper for all workers
 * @module order-service/infrastructure/workers
 */
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';

export abstract class BaseWorker {
  protected readonly logger = new Logger(this.constructor.name);

  protected logJobStart(job: Job): void {
    this.logger.log(`[${job.name}] id=${job.id ?? 'n/a'} attempt=${job.attemptsMade + 1}`);
  }

  protected logJobSuccess(job: Job): void {
    this.logger.log(`[${job.name}] id=${job.id ?? 'n/a'} OK`);
  }

  protected logJobFailure(job: Job, err: unknown): void {
    const msg = err instanceof Error ? err.message : String(err);
    this.logger.error(`[${job.name}] id=${job.id ?? 'n/a'} failed: ${msg}`);
  }
}
