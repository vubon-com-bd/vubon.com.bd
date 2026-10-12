/**
 * TrackingSyncWorker — periodic tracking refresh
 * @module logistics-service/infrastructure/workers
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { TrackingJobPayload } from '../queues/tracking.queue.js';

@Injectable()
export class TrackingSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(TrackingSyncWorker.name);
  constructor(private readonly queue: QueueService) {}

  onModuleInit(): void {
    this.queue.registerWorker<TrackingJobPayload>(QUEUE_NAME.TRACKING, async (payload) => {
      this.logger.debug(`Syncing tracking ${payload.trackingId} action=${payload.action}`);
      return { ok: true };
    });
  }
}
