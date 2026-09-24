import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import { AnalyticsClient } from '../services/external/analytics.client';

@Injectable()
export class AnalyticsProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly analyticsClient: AnalyticsClient,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ eventType: string; entityId: string }>(
      QUEUE_NAME.ANALYTICS,
      async (payload) => {
        const ok = await this.analyticsClient.track({
          eventType: payload.eventType,
          entityId: payload.entityId,
        });
        this.logger.debug(`Analytics tracked: ${ok}`);
      },
    );
  }
}
