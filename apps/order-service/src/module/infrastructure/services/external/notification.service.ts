/**
 * NotificationService — external adapter (email/SMS/push dispatcher)
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export const NOTIFICATION_SERVICE = Symbol('NOTIFICATION_SERVICE');

export interface NotificationPayload {
  readonly recipientId: string;
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface INotificationService {
  sendEmail(payload: NotificationPayload & { to: string }): Promise<boolean>;
  sendSms(payload: NotificationPayload & { phone: string }): Promise<boolean>;
  sendPush(payload: NotificationPayload & { deviceToken?: string }): Promise<boolean>;
}

@Injectable()
export class NotificationService implements INotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async sendEmail(payload: NotificationPayload & { to: string }): Promise<boolean> {
    this.logger.log(`email → ${payload.to} [${payload.template}]`);
    return true;
  }

  async sendSms(payload: NotificationPayload & { phone: string }): Promise<boolean> {
    this.logger.log(`sms → ${payload.phone} [${payload.template}]`);
    return true;
  }

  async sendPush(payload: NotificationPayload & { deviceToken?: string }): Promise<boolean> {
    this.logger.log(`push → ${payload.recipientId} [${payload.template}]`);
    return true;
  }
}
