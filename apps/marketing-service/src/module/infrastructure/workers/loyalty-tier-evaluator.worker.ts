import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { LoyaltyPointsCalculatorService } from '../services/internal/loyalty-points-calculator.service';

@Injectable()
export class LoyaltyTierEvaluatorWorker implements OnModuleInit {
  private readonly logger = new Logger(LoyaltyTierEvaluatorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly calculator: LoyaltyPointsCalculatorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ loyaltyId: string; points: number }>(
      'marketing-loyalty',
      async (payload) => {
        const tier = this.calculator.calculateTier(payload.points);
        this.logger.log(`Loyalty ${payload.loyaltyId}: tier ${tier}`);
      },
    );
  }
}
