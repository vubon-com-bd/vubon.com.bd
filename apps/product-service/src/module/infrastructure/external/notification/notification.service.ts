/**
 * ProductNotificationDispatcher — low-level notification dispatcher
 * @module product-service/infrastructure/external/notification
 *
 * Low-level: takes a channel + template and dispatches it.
 * Higher-level orchestration lives in services/external/product-notification.service.ts.
 */
import { Injectable, Logger } from '@nestjs/common';

export type NotificationChannel = 'email' | 'sms' | 'push' | 'in-app';

export interface NotificationPayload {
  readonly userId: string;
  readonly channel: NotificationChannel;
  readonly template: string;
  readonly data: Readonly<Record<string, unknown>>;
}

@Injectable()
export class ProductNotificationDispatcher {
  private readonly logger = new Logger(ProductNotificationDispatcher.name);

  async dispatch(payload: NotificationPayload): Promise<{ readonly sent: boolean }> {
    this.logger.log(
      `Dispatch [${payload.channel}] ${payload.template} → user=${payload.userId}`,
    );
    return { sent: true };
  }
}
