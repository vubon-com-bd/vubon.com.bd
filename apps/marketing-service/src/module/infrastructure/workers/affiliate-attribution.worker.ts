import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class AffiliateAttributionWorker implements OnModuleInit {
  private readonly logger = new Logger(AffiliateAttributionWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ affiliateId: string; action: string }>(
      'marketing-affiliate',
      async (payload) => {
        this.logger.log(`Affiliate job: ${payload.action} — ${payload.affiliateId}`);
      },
    );
  }
}
