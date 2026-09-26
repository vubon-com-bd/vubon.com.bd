import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CART_ANALYTICS_QUEUE, type AnalyticsJobPayload } from '../queues/analytics.queue';

@Injectable()
export class AnalyticsProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<AnalyticsJobPayload>(
      CART_ANALYTICS_QUEUE,
      async (payload) => {
        this.logger.log(`Processing analytics: ${payload.eventType} for cart ${payload.cartId}`);
      },
      5,
    );
  }
}
