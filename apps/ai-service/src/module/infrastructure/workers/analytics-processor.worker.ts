import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { ANALYTICS_QUEUE_NAME, type AnalyticsJobPayload } from '../queues/analytics.queue';
import { AiAnalyticsService } from '../../application/services/impl/ai-analytics.service';

@Injectable()
export class AnalyticsProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsProcessorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly analyticsService: AiAnalyticsService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<AnalyticsJobPayload>(
      ANALYTICS_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Analytics: ${payload.eventType}`);
        await this.analyticsService.record(payload.eventType, payload.modelId ?? null, {
          count: 1,
        });
      },
      10,
    );
  }
}
