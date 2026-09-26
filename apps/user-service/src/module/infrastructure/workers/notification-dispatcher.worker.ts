import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class NotificationDispatcherWorker implements OnModuleInit {
  private readonly logger = new Logger(NotificationDispatcherWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ to?: string; deviceToken?: string }>(
      QUEUE_NAME.NOTIFICATION,
      async (payload) => {
        this.logger.log(`Notification dispatch: ${JSON.stringify(payload)}`);
      },
    );
  }
}
