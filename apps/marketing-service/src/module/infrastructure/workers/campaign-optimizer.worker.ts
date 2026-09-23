import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { BudgetOptimizerService } from '../services/internal/budget-optimizer.service';

@Injectable()
export class CampaignOptimizerWorker implements OnModuleInit {
  private readonly logger = new Logger(CampaignOptimizerWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly optimizer: BudgetOptimizerService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ campaignId: string; roi: number }>(
      'marketing-campaign',
      async (payload) => {
        const suggestion = this.optimizer.suggest(payload.roi);
        this.logger.log(`Campaign ${payload.campaignId}: ${suggestion.action}`);
      },
    );
  }
}
