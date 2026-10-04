/**
 * BaseWorker — shared scaffolding for BullMQ processors
 * @module payment-service/infrastructure/workers
 */
import { Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_CONFIG } from '@vubon/shared-config/infrastructure';

export abstract class BaseWorker<TPayload extends object = Record<string, unknown>>
  implements OnModuleInit
{
  protected readonly logger: Logger;

  /** Queue name this worker listens on. */
  protected abstract readonly queueName: string;
  /** Job names accepted — empty array means all jobs on that queue. */
  protected abstract readonly jobNames: readonly string[];
  /** Concurrency; defaults to config. */
  protected concurrency(): number {
    return QUEUE_CONFIG.workerConcurrency;
  }

  protected constructor(
    protected readonly queueService: QueueService,
    name?: string,
  ) {
    this.logger = new Logger(name ?? this.constructor.name);
  }

  onModuleInit(): void {
    if (!QUEUE_CONFIG.autoStartWorkers) {
      this.logger.warn(`autoStartWorkers=false — worker "${this.queueName}" not started`);
      return;
    }
    this.queueService.registerWorker<TPayload>(
      this.queueName,
      async (payload) => this.handle(payload),
      this.concurrency(),
    );
    this.logger.log(
      `Worker "${this.queueName}" started — jobs=[${this.jobNames.join(',') || 'all'}] concurrency=${this.concurrency()}`,
    );
  }

  /** Concrete workers implement the actual handling. */
  protected abstract handle(payload: TPayload): Promise<unknown>;

  protected jobMatches(jobName: string): boolean {
    return this.jobNames.length === 0 || this.jobNames.includes(jobName);
  }
}
