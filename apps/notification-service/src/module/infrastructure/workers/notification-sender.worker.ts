import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { NOTIFICATION_QUEUE, type SendNotificationJobPayload } from '../queues/notification.queue';
import { SendGridProvider } from '../providers/email/sendgrid.provider';
import { TwilioProvider } from '../providers/sms/twilio.provider';
import { FcmProvider } from '../providers/push/fcm.provider';

@Injectable()
export class NotificationSenderWorker implements OnModuleInit {
  private readonly logger = new Logger(NotificationSenderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly sendGrid: SendGridProvider,
    private readonly twilio: TwilioProvider,
    private readonly fcm: FcmProvider,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<SendNotificationJobPayload>(
      NOTIFICATION_QUEUE,
      async (payload) => {
        await this.process(payload);
      },
    );
  }

  private async process(payload: SendNotificationJobPayload): Promise<void> {
    this.logger.log(
      `Processing notification ${payload.notificationId} via ${payload.channel}`,
    );

    switch (payload.channel) {
      case 'email': {
        const result = await this.sendGrid.send({
          recipient: payload.recipient,
          subject: 'Notification',
          body: payload.recipient,
        });
        if (!result.success) throw new Error(result.error ?? 'email failed');
        break;
      }
      case 'sms': {
        const result = await this.twilio.send({
          recipient: payload.recipient,
          body: payload.recipient,
        });
        if (!result.success) throw new Error(result.error ?? 'sms failed');
        break;
      }
      case 'push': {
        const result = await this.fcm.send({
          recipient: payload.recipient,
          body: payload.recipient,
        });
        if (!result.success) throw new Error(result.error ?? 'push failed');
        break;
      }
      default:
        this.logger.warn(`Unsupported channel: ${payload.channel}`);
    }
  }
}
