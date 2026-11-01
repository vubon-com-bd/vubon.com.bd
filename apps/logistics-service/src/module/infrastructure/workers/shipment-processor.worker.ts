import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME, LOGISTICS_QUEUE_LIMITS } from '../queues/queue.constants.js';
import type { ProcessShipmentPayload, RetryShipmentPayload } from '../queues/shipment.queue.js';
import {
  SHIPMENT_REPOSITORY,
  type ShipmentRepository,
} from '@domain/repositories/shipment.repository.interface.js';

type JobPayload = ProcessShipmentPayload | RetryShipmentPayload;

@Injectable()
export class ShipmentProcessorWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.SHIPMENT_PROCESSING;
  protected readonly jobNames = [
    LOGISTICS_JOB_NAME.PROCESS_SHIPMENT,
    LOGISTICS_JOB_NAME.RETRY_SHIPMENT,
    LOGISTICS_JOB_NAME.EXPIRE_SHIPMENT,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(SHIPMENT_REPOSITORY) private readonly repo: ShipmentRepository,
  ) {
    super(queueService, 'ShipmentProcessorWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    const id = payload.shipmentId;
    if (!id) {
      this.logger.warn('Missing shipmentId — skip');
      return { skipped: true };
    }
    const entity = await this.repo.findById(id);
    if (!entity) {
      this.logger.warn(`Shipment ${id} not found`);
      return { skipped: true };
    }
    try {
      if ('attempt' in payload && payload.attempt >= LOGISTICS_QUEUE_LIMITS.MAX_ATTEMPTS) {
        this.logger.warn(`Max attempts reached for shipment ${id}`);
        return { skipped: true, reason: 'max_attempts' };
      }
      await this.repo.save(entity);
      return { processed: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Job failed for shipment ${id}: ${msg}`);
      throw err;
    }
  }

  protected concurrency(): number {
    return 2;
  }
}
