import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { LoyaltyPointsCalculatorService } from '../services/internal/loyalty-points-calculator.service';

@Injectable()
export class LoyaltyPointsCalculatorWorker implements OnModuleInit {
  private readonly logger = new Logger(LoyaltyPointsCalculatorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly calculator: LoyaltyPointsCalculatorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ loyaltyId: string; orderAmount: number }>(
      'marketing-loyalty',
      async (payload) => {
        const points = this.calculator.calculate(payload.orderAmount);
        this.logger.log(`Loyalty ${payload.loyaltyId}: earned ${points} points`);
      },
    );
  }
}
