import { Injectable } from '@nestjs/common';
import {
  EmailService,
  SmsService,
  PushService,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class NotificationService {
  constructor(
    private readonly email: EmailService,
    private readonly sms: SmsService,
    private readonly push: PushService,
  ) {}

  async sendOrderConfirmation(to: string, orderNumber: string): Promise<void> {
    await this.email.send({
      to,
      subject: `Order Confirmed: ${orderNumber}`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been confirmed.</p>`,
      text: `Your order ${orderNumber} has been confirmed.`,
    });
  }

  async sendOrderShipped(to: string, orderNumber: string): Promise<void> {
    await this.email.send({
      to,
      subject: `Order Shipped: ${orderNumber}`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been shipped.</p>`,
      text: `Your order ${orderNumber} has been shipped.`,
    });
  }

  async sendOrderDelivered(to: string, orderNumber: string): Promise<void> {
    await this.email.send({
      to,
      subject: `Order Delivered: ${orderNumber}`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been delivered.</p>`,
      text: `Your order ${orderNumber} has been delivered.`,
    });
  }
}
