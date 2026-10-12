/**
 * BaseWorker — shared behavior for BullMQ processors
 * @module vendor-service/infrastructure/workers
 */
import { Logger } from '@nestjs/common';
import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';

export abstract class BaseWorker<TPayload = unknown> extends WorkerHost {
  protected readonly logger = new Logger(this.constructor.name);

  protected abstract handle(job: Job<TPayload>): Promise<unknown>;

  async process(job: Job<TPayload>): Promise<unknown> {
    const start = Date.now();
    this.logger.log(`▶ ${job.name} [${job.id}]`);
    try {
      const result = await this.handle(job);
      this.logger.log(`✅ ${job.name} [${job.id}] ${Date.now() - start}ms`);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ ${job.name} [${job.id}] failed: ${msg}`);
      throw err;
    }
  }
}
