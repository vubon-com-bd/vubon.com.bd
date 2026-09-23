import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PromotionExpiryWorker implements OnModuleInit {
  private readonly logger = new Logger(PromotionExpiryWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ promotionId: string }>(
      'marketing-promotion',
      async (payload) => {
        this.logger.log(`Expiring promotion: ${payload.promotionId}`);
      },
    );
  }
}
