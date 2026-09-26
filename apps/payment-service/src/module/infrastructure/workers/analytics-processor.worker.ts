import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

interface AnalyticsJobPayload {
  readonly eventType: string;
  readonly referenceId: string;
}

@Injectable()
export class AnalyticsProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsProcessorWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<AnalyticsJobPayload>(
      'notification',
      async (payload) => {
        this.logger.log(
          `Analytics event: ${payload.eventType} for ${payload.referenceId}`,
        );
      },
    );
  }
}
