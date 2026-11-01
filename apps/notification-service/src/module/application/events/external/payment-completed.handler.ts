/**
 * PaymentCompletedHandler — payment.payment.completed → Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderPaymentCompletedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PAYMENT_COMPLETED_EVENT = 'payment.payment.completed';

@Injectable()
export class PaymentCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentCompletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_COMPLETED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      const orderId = (p.orderId as string) ?? '';
      const amount = p.amount ?? p.total ?? 0;
      const currency = (p.currency as string) ?? 'BDT';

      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderPaymentCompletedEmail({
      name: (p.name as string) ?? 'গ্রাহক',
      orderId: (p.orderId as string) ?? '',
      amount: (p.amount as number) ?? 0,
      currency: (p.currency as string) ?? 'BDT',
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '✅ পেমেন্ট সফল!',
          body: html || `প্রিয় গ্রাহক,\n\n🎉 আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!\n\nঅর্ডার: {orderId}\nপরিমাণ: {amount} {currency}\n\nআপনার অর্ডার প্রক্রিয়া করা হচ্ছে।\n\nঅর্ডার দেখুন →\nVubon অ্যাপে → My Orders\n\nVubon টিম`,
          data: {
          html, eventType: 'payment.payment.completed', ...p },
          idempotencyKey: 'payment-completed-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "payment.payment.completed"');
  }
}
