import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class TrackingSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(TrackingSyncWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ trackingId: string; action: string }>(
      QUEUE_NAME.TRACKING,
      async (payload) => {
        this.logger.log(`Syncing tracking ${payload.trackingId}: ${payload.action}`);
      },
    );
  }
}
