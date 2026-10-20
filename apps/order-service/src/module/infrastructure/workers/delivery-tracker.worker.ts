/**
 * DeliveryTrackerWorker — polls courier for tracking updates
 * @module order-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import {
  DELIVERY_REPOSITORY,
  type DeliveryRepository,
} from '../../domain/repositories/delivery.repository.interface.js';
import type { TrackDeliveryPayload } from '../queues/delivery.queue.js';

@Injectable()
export class DeliveryTrackerWorker extends BaseWorker<TrackDeliveryPayload> {
  protected readonly queueName = ORDER_QUEUE_NAME.TRACKING;
  protected readonly jobNames = [ORDER_JOB_NAME.TRACK_DELIVERY] as const;

  constructor(
    queueService: QueueService,
    @Inject(DELIVERY_REPOSITORY)
    private readonly repo: DeliveryRepository,
  ) {
    super(queueService, 'DeliveryTrackerWorker');
  }

  protected async handle(payload: TrackDeliveryPayload): Promise<unknown> {
    const delivery = await this.repo.findByTrackingNumber(payload.trackingNumber);
    if (!delivery) return { skipped: true, reason: 'not_found' };
    this.logger.log(
      `Tracking ${payload.trackingNumber} → ${delivery.status.value}`,
    );
    return { tracked: true, status: delivery.status.value };
  }
}
