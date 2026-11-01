/**
 * BaseWorker — shared scaffolding for queue workers
 * @module identity-service/infrastructure/workers
 */
import { Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';

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

  onModuleInit(): void {
    try {
      this.queueService.registerWorker<TPayload>(
        this.queueName,
        async (payload) => this.handle(payload),
        this.concurrency(),
      );
      this.logger.log(`Worker "${this.queueName}" started`);
    } catch (err) {
      this.logger.warn(
        `Worker "${this.queueName}" could not start: ${err instanceof Error ? err.message : 'unknown'}`,
      );
    }
  }

  protected abstract handle(payload: TPayload): Promise<unknown>;

  protected concurrency(): number {
    return 5;
  }

  protected jobMatches(jobName: string): boolean {
    return this.jobNames.length === 0 || this.jobNames.includes(jobName);
  }
}
