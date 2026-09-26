import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email.service';
import { SmsService } from './sms.service';
import { PushService } from './push.service';

export interface PaymentNotificationInput {
  readonly userId: string;
  readonly email?: string;
  readonly phone?: string;
  readonly deviceToken?: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly email: EmailService,
    private readonly sms: SmsService,
    private readonly push: PushService,
  ) {}

  async notifyPaymentSuccess(input: PaymentNotificationInput): Promise<void> {
    if (input.email) {
      await this.email.sendPaymentSuccess({
        to: input.email,
        orderId: input.orderId,
        amount: input.amount,
        currency: input.currency,
      });
    }
    if (input.phone) {
      await this.sms.sendPaymentConfirmation(
        input.phone,
        input.orderId,
        `${input.amount} ${input.currency}`,
      );
    }
    if (input.deviceToken) {
      await this.push.sendPaymentSuccess(
        input.deviceToken,
        input.orderId,
        `${input.amount} ${input.currency}`,
      );
    }
    this.logger.log(`Payment success notification sent for order ${input.orderId}`);
  }

  async notifyPaymentFailed(input: {
    email?: string;
    phone?: string;
    deviceToken?: string;
    orderId: string;
    reason: string;
  }): Promise<void> {
    if (input.email) {
      await this.email.sendPaymentFailed({
        to: input.email,
        orderId: input.orderId,
        reason: input.reason,
      });
    }
    if (input.phone) {
      await this.sms.sendPaymentFailed(input.phone, input.orderId);
    }
    if (input.deviceToken) {
      await this.push.sendPaymentFailed(input.deviceToken, input.orderId);
    }
  }
}
