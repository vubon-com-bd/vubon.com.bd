import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class FunnelBuilderWorker implements OnModuleInit {
  private readonly logger = new Logger(FunnelBuilderWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ funnelId: string }>(
      'analytics:funnel',
      async (payload) => {
        this.logger.debug(`Building funnel ${payload.funnelId}`);
      },
      2,
    );
  }
}
