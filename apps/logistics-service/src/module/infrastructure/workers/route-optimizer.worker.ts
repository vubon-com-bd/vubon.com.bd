import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class RouteOptimizerWorker implements OnModuleInit {
  private readonly logger = new Logger(RouteOptimizerWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ routeId: string }>(
      QUEUE_NAME.DISPATCH,
      async (payload) => {
        this.logger.log(`Optimizing route ${payload.routeId}`);
      },
    );
  }
}
