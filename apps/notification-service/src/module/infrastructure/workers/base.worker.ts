/**
 * BaseWorker — abstract base for all notification workers
 * @module notification-service/infrastructure/workers
 *
 * Kernel QueueService auto-registers concrete workers on module init.
 * Subclasses implement `handle()` with typed payload।
 */
import { Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_CONFIG } from '@vubon/shared-config/infrastructure';

export abstract class BaseWorker<TPayload extends object = Record<string, unknown>>
  implements OnModuleInit
{
  protected readonly logger: Logger;

  protected abstract readonly queueName: string;
  protected abstract readonly jobNames: readonly string[];

  protected constructor(
    protected readonly queueService: QueueService,
    name?: string,
  ) {
    this.logger = new Logger(name ?? this.constructor.name);
  }

  protected concurrency(): number {
    return QUEUE_CONFIG.workerConcurrency ?? 5;
  }

  onModuleInit(): void {
    if (!QUEUE_CONFIG.autoStartWorkers) {
      this.logger.warn(
        `autoStartWorkers=false — worker "${this.queueName}" not started`,
      );
      return;
    }

    this.queueService.registerWorker<TPayload>(
      this.queueName,
      async (payload) => this.handle(payload),
      this.concurrency(),
    );

    this.logger.log(
      `Worker "${this.queueName}" started — jobs=[${this.jobNames.join(',')}] concurrency=${this.concurrency()}`,
    );
  }

  protected abstract handle(payload: TPayload): Promise<unknown>;

  protected jobMatches(jobName: string): boolean {
    return this.jobNames.length === 0 || this.jobNames.includes(jobName);
  }
}
