import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class AbandonedCartRecoveryWorker implements OnModuleInit {
  private readonly logger = new Logger(AbandonedCartRecoveryWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ leadId: string }>(
      'marketing-lead',
      async (payload) => {
        this.logger.log(`Cart recovery for lead: ${payload.leadId}`);
      },
    );
  }
}
