import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from '../queues/queue.constants.js';
import { DISPATCH_REPOSITORY, type DispatchRepository } from '@domain/repositories/dispatch.repository.interface.js';

type JobPayload = { dispatchId: string; action?: string };

@Injectable()
export class DispatchProcessorWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.DISPATCH_PROCESSING;
  protected readonly jobNames = [LOGISTICS_JOB_NAME.PROCESS_DISPATCH] as const;

  constructor(
    queueService: QueueService,
    @Inject(DISPATCH_REPOSITORY) private readonly repo: DispatchRepository,
  ) {
    super(queueService, 'DispatchProcessorWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    const id = payload.dispatchId;
    if (!id) return { skipped: true };
    const entity = await this.repo.findById(id);
    if (!entity) return { skipped: true, reason: 'not_found' };
    await this.repo.save(entity);
    return { processed: true };
  }

  protected concurrency(): number { return 2; }
}
