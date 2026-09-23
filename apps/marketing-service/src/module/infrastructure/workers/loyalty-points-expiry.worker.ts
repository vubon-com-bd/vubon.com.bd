import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class LoyaltyPointsExpiryWorker implements OnModuleInit {
  private readonly logger = new Logger(LoyaltyPointsExpiryWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ loyaltyId: string }>(
      'marketing-loyalty',
      async (payload) => {
        this.logger.log(`Expiring points for loyalty: ${payload.loyaltyId}`);
      },
    );
  }
}
