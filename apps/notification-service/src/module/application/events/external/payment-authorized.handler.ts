/**
 * PaymentAuthorizedHandler — notifies payment authorization
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderPaymentAuthorizedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PAYMENT_AUTHORIZED_EVENT = 'payment.payment.authorized';

@Injectable()
export class PaymentAuthorizedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentAuthorizedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_AUTHORIZED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_AUTHORIZED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderPaymentAuthorizedEmail({
      name: (payload.name as string) ?? 'গ্রাহক',
      orderId: (payload.orderId as string) ?? '',
      amount: (payload.amount as number) ?? 0,
      currency: (payload.currency as string) ?? 'BDT',
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `✅ পেমেন্ট authorized` : `✅ Payment Authorized`,
        body: html || isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার ৳${payload?.amount ?? 0} পেমেন্ট authorized হয়েছে। শীঘ্রই capture হবে।` : `Hi ${payload?.name ?? "Customer"}, ৳${payload?.amount ?? 0} payment has been authorized. Capture will follow.`,
        data: {
          html, eventType: 'payment.payment.authorized', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `pay-authorized-${event.id}`,
      });
      this.logger.log(`✅ PaymentAuthorizedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`PaymentAuthorizedHandler failed: ${err}`);
    }
  }
}
