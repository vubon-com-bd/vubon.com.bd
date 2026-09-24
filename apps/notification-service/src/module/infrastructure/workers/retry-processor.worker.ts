import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { RETRY_QUEUE, type RetryJobPayload } from '../queues/retry.queue';
import type { NotificationDeliveryRepository } from '../../domain/repositories/notification-delivery.repository.interface';
import { NotificationDeliveryEntity } from '../../domain/entities/notification-delivery.entity';

@Injectable()
export class RetryProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(RetryProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly deliveryRepo: NotificationDeliveryRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<RetryJobPayload>(
      RETRY_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: RetryJobPayload): Promise<void> {
    try {
      const entity = await this.deliveryRepo.findById(payload.deliveryId);
      if (!entity) {
        this.logger.warn(`Delivery not found: ${payload.deliveryId}`);
        return;
      }
      if (entity.attemptCount.hasExceededLimit()) {
        this.logger.warn(`Retry exhausted for delivery ${entity.id}`);
        return;
      }
      this.logger.log(
        `Retrying delivery ${entity.id} (attempt ${entity.attemptCount.value + 1})`,
      );
      // TODO: dispatch retry via channel-specific worker
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Retry processor error: ${message}`);
      throw error;
    }
  }
}
