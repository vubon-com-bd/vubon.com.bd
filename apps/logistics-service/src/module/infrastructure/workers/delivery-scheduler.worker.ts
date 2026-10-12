/**
 * DeliverySchedulerWorker — scheduled delivery dispatch
 * @module logistics-service/infrastructure/workers
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { DeliveryJobPayload } from '../queues/delivery.queue.js';

@Injectable()
export class DeliverySchedulerWorker implements OnModuleInit {
  private readonly logger = new Logger(DeliverySchedulerWorker.name);
  constructor(private readonly queue: QueueService) {}

  onModuleInit(): void {
    this.queue.registerWorker<DeliveryJobPayload>(QUEUE_NAME.DELIVERY, async (payload) => {
      this.logger.log(`Delivery ${payload.deliveryId} action=${payload.action}`);
      return { ok: true };
    });
  }
}
