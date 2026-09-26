import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class CommissionCalculatorWorker implements OnModuleInit {
  private readonly logger = new Logger(CommissionCalculatorWorker.name);
  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ vendorId: string; orderId: string }>(
      'commission',
      async (payload) => {
        this.logger.log(`Commission calculation for ${payload.vendorId}`);
      },
    );
  }
}
