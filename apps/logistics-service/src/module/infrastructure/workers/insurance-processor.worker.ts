import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class InsuranceProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(InsuranceProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ insuranceId: string; action: string }>(
      QUEUE_NAME.SHIPPING,
      async (payload) => {
        this.logger.log(`Processing insurance ${payload.insuranceId}: ${payload.action}`);
      },
    );
  }
}
