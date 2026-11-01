import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from '../queues/queue.constants.js';
import type { ProcessDeliveryPayload } from '../queues/delivery.queue.js';
import { DELIVERY_REPOSITORY, type DeliveryRepository } from '@domain/repositories/delivery.repository.interface.js';

type JobPayload = ProcessDeliveryPayload | { deliveryId: string; attempt: number };

@Injectable()
export class DeliveryProcessorWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.DELIVERY_PROCESSING;
  protected readonly jobNames = [
    LOGISTICS_JOB_NAME.PROCESS_DELIVERY,
    LOGISTICS_JOB_NAME.RETRY_DELIVERY,
    LOGISTICS_JOB_NAME.EXPIRE_DELIVERY,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(DELIVERY_REPOSITORY) private readonly repo: DeliveryRepository,
  ) {
    super(queueService, 'DeliveryProcessorWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    const id = payload.deliveryId;
    if (!id) return { skipped: true };
    const entity = await this.repo.findById(id);
    if (!entity) return { skipped: true, reason: 'not_found' };
    await this.repo.save(entity);
    return { processed: true };
  }

  protected concurrency(): number { return 2; }
}
