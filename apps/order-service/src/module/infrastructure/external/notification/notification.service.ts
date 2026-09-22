import { Injectable } from '@nestjs/common';
import {
  EmailService,
  SmsService,
  PushService,
} from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class OrderNotificationService {
  constructor(
    private readonly email: EmailService,
    private readonly sms: SmsService,
    private readonly push: PushService,
  ) {}

  async notifyOrderCreated(to: string, orderNumber: string): Promise<void> {
    await this.email.send({
      to,
      subject: `Order Created: ${orderNumber}`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been created.</p>`,
      text: `Your order ${orderNumber} has been created.`,
    });
  }

  async notifyOrderShipped(to: string, orderNumber: string): Promise<void> {
    await this.email.send({
      to,
      subject: `Order Shipped: ${orderNumber}`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been shipped.</p>`,
      text: `Your order ${orderNumber} has been shipped.`,
    });
  }

  async notifyOrderDelivered(to: string, orderNumber: string): Promise<void> {
    await this.email.send({
      to,
      subject: `Order Delivered: ${orderNumber}`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been delivered.</p>`,
      text: `Your order ${orderNumber} has been delivered.`,
    });
  }

  async notifyOrderCancelled(to: string, orderNumber: string): Promise<void> {
    await this.email.send({
      to,
      subject: `Order Cancelled: ${orderNumber}`,
      html: `<p>Your order <strong>${orderNumber}</strong> has been cancelled.</p>`,
      text: `Your order ${orderNumber} has been cancelled.`,
    });
  }

  async sendSms(to: string, message: string): Promise<void> {
    await this.sms.send({ to, message });
  }

  async sendPush(deviceToken: string, title: string, body: string): Promise<void> {
    await this.push.send({ deviceToken, title, body });
  }
}
