/**
 * ShipmentProcessorWorker — async shipment lifecycle processor
 * @module logistics-service/infrastructure/workers
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { ShipmentJobPayload } from '../queues/shipment.queue.js';

@Injectable()
export class ShipmentProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(ShipmentProcessorWorker.name);
  constructor(private readonly queue: QueueService) {}

  onModuleInit(): void {
    this.queue.registerWorker<ShipmentJobPayload>(QUEUE_NAME.SHIPPING, async (payload) => {
      this.logger.log(`Processing shipment ${payload.shipmentId} action=${payload.action}`);
      // Downstream: publish domain events, notify, update analytics
      return { ok: true };
    });
  }
}
