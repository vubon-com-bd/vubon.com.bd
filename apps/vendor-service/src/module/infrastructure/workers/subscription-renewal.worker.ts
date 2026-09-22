import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SubscriptionRenewalWorker implements OnModuleInit {
  private readonly logger = new Logger(SubscriptionRenewalWorker.name);
  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ vendorId: string }>(
      'vendor',
      async (payload) => {
        this.logger.log(`Subscription renewal for ${payload.vendorId}`);
      },
    );
  }
}
