import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class RetentionCalculatorWorker implements OnModuleInit {
  private readonly logger = new Logger(RetentionCalculatorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ cohortId: string }>(
      'analytics:retention',
      async (payload) => {
        this.logger.debug(`Calculating retention for ${payload.cohortId}`);
      },
      2,
    );
  }
}
