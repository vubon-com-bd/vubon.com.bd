import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class NotificationWorker implements OnModuleInit {
  private readonly logger = new Logger(NotificationWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ userId: string; channel: string }>(
      'marketing-notification',
      async (payload) => {
        this.logger.log(`Notification for ${payload.userId} via ${payload.channel}`);
      },
    );
  }
}
