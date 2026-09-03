import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { SMSService } from '../sms/sms.service';
import { PushService, PushNotification } from '../push/push.service';

export interface Notification {
  type: 'email' | 'sms' | 'push' | 'inApp';
  recipient: string | string[];
  subject?: string;
  message: string;
  data?: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high';
}

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SMSService,
    private readonly pushService: PushService
  ) {}

  async send(notification: Notification): Promise<void> {
    switch (notification.type) {
      case 'email':
        await this.emailService.send(
          notification.recipient as string | string[],
          notification.subject || 'Notification',
          notification.message,
          true
        );
        break;
      case 'sms':
        await this.smsService.send(notification.recipient as string, notification.message);
        break;
      case 'push':
        await this.pushService.send(
          notification.recipient as string,
          {
            title: notification.subject || 'Notification',
            body: notification.message,
            data: notification.data,
          } as PushNotification
        );
        break;
      default:
        throw new Error(`Unsupported notification type: ${notification.type}`);
    }
  }

  async sendBulk(notifications: Notification[]): Promise<void> {
    for (const notification of notifications) {
      await this.send(notification);
    }
  }

  async sendToAll(
    type: Notification['type'],
    recipients: string[],
    subject: string,
    message: string,
    data?: Record<string, unknown>
  ): Promise<void> {
    const notification: Notification = {
      type,
      recipient: recipients,
      subject,
      message,
      data,
    };
    await this.send(notification);
  }
}
