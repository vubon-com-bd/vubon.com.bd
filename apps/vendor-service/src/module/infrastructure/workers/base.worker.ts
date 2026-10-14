/**
 * BaseWorker — shared scaffolding for BullMQ processors
 * @module vendor-service/infrastructure/workers
 */
import { Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BULL_CONFIG } from '@vubon/shared-config/infrastructure';

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
    return BULL_CONFIG.concurrency;
  }

  onModuleInit(): void {
    this.queueService.registerWorker<TPayload>(
      this.queueName,
      async (payload) => this.handle(payload),
      this.concurrency(),
    );
    this.logger.log(`Worker "${this.queueName}" started (concurrency=${this.concurrency()})`);
  }

  protected abstract handle(payload: TPayload): Promise<unknown>;

  protected jobMatches(jobName: string): boolean {
    return this.jobNames.length === 0 || this.jobNames.includes(jobName);
  }
}
