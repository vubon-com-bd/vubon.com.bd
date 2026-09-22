import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class TierEvaluatorWorker implements OnModuleInit {
  private readonly logger = new Logger(TierEvaluatorWorker.name);
  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ vendorId: string }>(
      'vendor',
      async (payload) => {
        this.logger.log(`Tier evaluation for ${payload.vendorId}`);
      },
    );
  }
}
