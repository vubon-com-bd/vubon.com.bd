import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class CampaignProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(CampaignProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ campaignId: string; action: string }>(
      'marketing-campaign',
      async (payload) => {
        this.logger.log(`Processing campaign job: ${payload.action} — ${payload.campaignId}`);
      },
    );
  }
}
