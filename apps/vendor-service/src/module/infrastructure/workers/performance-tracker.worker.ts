import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class PerformanceTrackerWorker implements OnModuleInit {
  private readonly logger = new Logger(PerformanceTrackerWorker.name);
  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ vendorId: string }>(
      'vendor',
      async (payload) => {
        this.logger.log(`Performance tracking for ${payload.vendorId}`);
      },
    );
  }
}
