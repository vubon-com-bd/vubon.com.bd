import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class AnalyticsProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ eventType: string; entityId: string }>(
      'marketing-analytics',
      async (payload) => {
        this.logger.log(`Analytics event: ${payload.eventType} — ${payload.entityId}`);
      },
    );
  }
}
