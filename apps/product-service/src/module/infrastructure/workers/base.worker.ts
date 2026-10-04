/**
 * BaseWorker — common BullMQ worker lifecycle & error handling.
 * @module product-service/infrastructure/workers
 */
import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Worker, type Job } from 'bullmq';
import { getBullConnection } from '../queues/queue.config.js';
import type { QueueName, JobType } from '../queues/queue.constants.js';

export abstract class BaseWorker implements OnModuleInit, OnModuleDestroy {
  protected readonly logger: Logger;
  protected worker?: Worker;
  private readonly queueName: QueueName;

  protected constructor(queueName: QueueName, context?: string) {
    this.queueName = queueName;
    this.logger = new Logger(context ?? this.constructor.name);
  }

  protected abstract handle(job: Job): Promise<void>;

  protected concurrency(): number {
    return 5;
  }

  async onModuleInit(): Promise<void> {
    this.worker = new Worker(
      this.queueName,
      async (job) => {
        const start = Date.now();
        try {
          await this.handle(job);
          this.logger.debug(
            `${job.name as JobType} done in ${Date.now() - start}ms (id=${job.id})`,
          );
        } catch (err) {
          this.logger.error(
            `${job.name as JobType} failed (id=${job.id}): ${err instanceof Error ? err.message : String(err)}`,
          );
          throw err;
        }
      },
      {
        connection: getBullConnection(),
        concurrency: this.concurrency(),
      },
    );

    this.worker.on('failed', (job, err) => {
      this.logger.warn(
        `Job ${job?.name ?? 'unknown'} failed permanently: ${err.message}`,
      );
    });

    this.logger.log(`Worker started for queue: ${this.queueName}`);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
      this.logger.log(`Worker stopped for queue: ${this.queueName}`);
    }
  }
}
