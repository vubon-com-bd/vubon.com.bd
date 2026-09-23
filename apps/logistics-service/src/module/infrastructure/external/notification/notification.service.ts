import { Injectable, Logger } from '@nestjs/common';
import { BaseNotificationService } from '@vubon/shared-kernel/infrastructure';
import type { NotificationInput } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class LogisticsNotificationService extends BaseNotificationService {
  readonly name = 'logistics-notification';
  private readonly logger = new Logger(LogisticsNotificationService.name);

  async send(input: NotificationInput): Promise<void> {
    this.logger.log(
      `Notification → user=${input.userId} title="${input.title}" channels=${input.channels?.join(',') ?? 'default'}`,
    );
  }
}
