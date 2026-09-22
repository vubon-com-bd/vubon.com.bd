import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PayoutProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(PayoutProcessorWorker.name);
  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ payoutId: string }>(
      'payout',
      async (payload) => {
        this.logger.log(`Processing payout ${payload.payoutId}`);
      },
    );
  }
}
