import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from '../queues/queue.constants.js';
import { COURIER_REPOSITORY, type CourierRepository } from '@domain/repositories/courier.repository.interface.js';

type JobPayload = { courierId: string; courierCode: string };

@Injectable()
export class CourierSyncWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.COURIER_SYNC;
  protected readonly jobNames = [LOGISTICS_JOB_NAME.SYNC_COURIER_STATUS] as const;

  constructor(
    queueService: QueueService,
    @Inject(COURIER_REPOSITORY) private readonly repo: CourierRepository,
  ) {
    super(queueService, 'CourierSyncWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    const id = payload.courierId;
    if (!id) return { skipped: true };
    const entity = await this.repo.findById(id);
    if (!entity) return { skipped: true, reason: 'not_found' };
    await this.repo.save(entity);
    return { processed: true };
  }

  protected concurrency(): number { return 2; }
}
