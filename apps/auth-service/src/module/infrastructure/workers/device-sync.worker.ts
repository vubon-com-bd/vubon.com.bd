import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class DeviceSyncWorker implements OnModuleInit {
  private readonly logger = new Logger(DeviceSyncWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ userId: string; deviceId: string }>(
      QUEUE_NAME.SYNC,
      async (payload) => {
        this.logger.log(
          `Syncing device ${payload.deviceId} for user ${payload.userId}`,
        );
      },
    );
  }
}
