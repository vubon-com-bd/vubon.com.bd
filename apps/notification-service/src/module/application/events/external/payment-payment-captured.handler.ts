/**
 * PaymentPaymentCapturedHandler — payment.payment.captured
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderPaymentCapturedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PAYMENT_PAYMENT_CAPTURED_EVENT = 'payment.payment.captured';

@Injectable()
export class PaymentPaymentCapturedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentPaymentCapturedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_PAYMENT_CAPTURED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderPaymentCapturedEmail({
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
          subject: 'পেমেন্ট সম্পন্ন হয়েছে',
          body: html || 'আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।',
          data: {
          html, eventType: 'payment.payment.captured', ...p },
          idempotencyKey: 'payment-payment-captured-' + (event as { id: string }).id,
        });
        this.logger.log('✅ payment.payment.captured বিজ্ঞপ্তি পাঠানো হয়েছে → ' + userId);
      } catch (err) {
        this.logger.error('ব্যর্থ: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ রেজিস্টার্ড হ্যান্ডলার: "payment.payment.captured"');
  }
}
