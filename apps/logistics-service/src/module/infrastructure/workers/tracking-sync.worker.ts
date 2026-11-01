import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from '../queues/queue.constants.js';
import { TRACKING_REPOSITORY, type TrackingRepository } from '@domain/repositories/tracking.repository.interface.js';

type JobPayload = { trackingId: string; courierCode?: string };

@Injectable()
export class TrackingSyncWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.TRACKING_SYNC;
  protected readonly jobNames = [
    LOGISTICS_JOB_NAME.SYNC_TRACKING,
    LOGISTICS_JOB_NAME.FETCH_TRACKING_EVENTS,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(TRACKING_REPOSITORY) private readonly repo: TrackingRepository,
  ) {
    super(queueService, 'TrackingSyncWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    const id = payload.trackingId;
    if (!id) return { skipped: true };
    const entity = await this.repo.findById(id);
    if (!entity) return { skipped: true, reason: 'not_found' };
    await this.repo.save(entity);
    return { processed: true };
  }

  protected concurrency(): number { return 3; }
}
