/**
 * CourierSyncWorker — syncs courier statuses & health-checks
 * @module logistics-service/infrastructure/workers
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { CourierJobPayload } from '../queues/courier.queue.js';

@Injectable()
export class CourierSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(CourierSyncWorker.name);
  constructor(private readonly queue: QueueService) {}

  onModuleInit(): void {
    this.queue.registerWorker<CourierJobPayload>(QUEUE_NAME.COURIER, async (payload) => {
      this.logger.log(`Courier ${payload.courierCode} action=${payload.action}`);
      return { ok: true };
    });
  }
}
