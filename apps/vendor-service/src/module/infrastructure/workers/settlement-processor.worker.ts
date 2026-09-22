import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class SettlementProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(SettlementProcessorWorker.name);
  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ settlementId: string }>(
      'settlement',
      async (payload) => {
        this.logger.log(`Processing settlement ${payload.settlementId}`);
      },
    );
  }
}
