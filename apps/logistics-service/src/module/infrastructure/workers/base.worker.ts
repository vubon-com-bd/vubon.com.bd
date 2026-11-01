/**
 * BaseWorker — abstract base for BullMQ processors
 * @module logistics-service/infrastructure/workers
 *
 * Auto-start via OnModuleInit — checks QUEUE_CONFIG.autoStartWorkers
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
    workerName?: string,
  ) {
    this.logger = new Logger(workerName ?? this.constructor.name);
  }

  onModuleInit(): void {
    if (!QUEUE_CONFIG.autoStartWorkers) {
      this.logger.warn(`autoStartWorkers=false — "${this.queueName}" not started`);
      return;
    }
    this.queueService.registerWorker<TPayload>(
      this.queueName,
      async (payload) => this.handle(payload),
      this.concurrency(),
    );
    this.logger.log(`Worker "${this.queueName}" started (concurrency=${this.concurrency()})`);
  }

  protected abstract handle(payload: TPayload): Promise<unknown>;

  protected concurrency(): number {
    return QUEUE_CONFIG.workerConcurrency;
  }
}
