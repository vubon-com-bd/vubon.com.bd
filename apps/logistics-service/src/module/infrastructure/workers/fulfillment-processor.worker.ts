import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from '../queues/queue.constants.js';
import { FULFILLMENT_REPOSITORY, type FulfillmentRepository } from '@domain/repositories/fulfillment.repository.interface.js';

type JobPayload = { fulfillmentId: string; action?: string };

@Injectable()
export class FulfillmentProcessorWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.FULFILLMENT_PROCESSING;
  protected readonly jobNames = [
    LOGISTICS_JOB_NAME.PROCESS_FULFILLMENT,
    LOGISTICS_JOB_NAME.CHECK_SLA,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(FULFILLMENT_REPOSITORY) private readonly repo: FulfillmentRepository,
  ) {
    super(queueService, 'FulfillmentProcessorWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    const id = payload.fulfillmentId;
    if (!id) return { skipped: true };
    const entity = await this.repo.findById(id);
    if (!entity) return { skipped: true, reason: 'not_found' };
    await this.repo.save(entity);
    return { processed: true };
  }

  protected concurrency(): number { return 2; }
}
