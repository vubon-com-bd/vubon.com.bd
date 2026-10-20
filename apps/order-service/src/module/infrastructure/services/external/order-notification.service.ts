/**
 * OrderNotificationService — multi-channel dispatcher
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  EmailService,
  SmsService,
  PushService,
} from '@vubon/shared-kernel/infrastructure/external';

export const ORDER_NOTIFICATION_SERVICE = Symbol('ORDER_NOTIFICATION_SERVICE');

export interface OrderNotificationPayload {
  readonly userId: string;
  readonly orderId: string;
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface IOrderNotificationService {
  notifyCustomer(payload: OrderNotificationPayload): Promise<boolean>;
  notifyAdmin(payload: OrderNotificationPayload): Promise<boolean>;
}

@Injectable()
export class OrderNotificationService implements IOrderNotificationService {
  private readonly logger = new Logger(OrderNotificationService.name);

  constructor(
    private readonly email: EmailService,
    private readonly sms: SmsService,
    private readonly push: PushService,
  ) {}

  async notifyCustomer(payload: OrderNotificationPayload): Promise<boolean> {
    this.logger.log(`[customer] ${payload.template} → user=${payload.userId}`);
    try {
      await this.push.send({
        deviceToken: `user:${payload.userId}`,
        title: this.titleFor(payload.template),
        body: this.bodyFor(payload.template, payload.data),
        data: { orderId: payload.orderId, template: payload.template },
      });
      return true;
    } catch (err) {
      this.logger.warn(`push failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return false;
    }
  }

  async notifyAdmin(payload: OrderNotificationPayload): Promise<boolean> {
    this.logger.log(`[admin] ${payload.template} → orderId=${payload.orderId}`);
    try {
      await this.email.send({
        to: `admin+${payload.userId}@vubon.com.bd`,
        subject: this.titleFor(payload.template),
        text: this.bodyFor(payload.template, payload.data),
      });
      return true;
    } catch {
      return false;
    }
  }

  private titleFor(template: string): string {
    const map: Record<string, string> = {
      order_created: 'Order created',
      order_confirmed: 'Order confirmed',
      order_shipped: 'Order shipped',
      order_delivered: 'Order delivered',
      order_cancelled: 'Order cancelled',
      order_returned: 'Order returned',
    };
    return map[template] ?? `Order update: ${template}`;
  }

  private bodyFor(template: string, data?: Readonly<Record<string, unknown>>): string {
    const orderNumber = data?.['orderNumber'] ?? '';
    return `${template}${orderNumber ? ` — ${orderNumber}` : ''}`;
  }
}

export { EmailService, SmsService, PushService };
