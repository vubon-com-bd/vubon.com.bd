/**
 * BaseWorker — common BullMQ worker lifecycle
 * @module cart-service/infrastructure/workers
 */
import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Worker, type Job } from 'bullmq';

export interface BullConnection {
  readonly host: string;
  readonly port: number;
}

export function getBullConnection(): BullConnection {
  return { host: 'localhost', port: 6379 };
}

export abstract class BaseWorker implements OnModuleInit, OnModuleDestroy {
  protected readonly logger: Logger;
  protected worker?: Worker;
  private readonly queueName: string;

  protected constructor(queueName: string, context?: string) {
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
            `${job.name} done in ${Date.now() - start}ms (id=${job.id})`,
          );
        } catch (err) {
          this.logger.error(
            `${job.name} failed (id=${job.id}): ${err instanceof Error ? err.message : String(err)}`,
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
      this.logger.warn(`Job ${job?.name ?? 'unknown'} failed permanently: ${err.message}`);
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
