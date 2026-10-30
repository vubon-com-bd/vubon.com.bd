/**
 * PaymentTransactionStatusChangedHandler — payment.transaction.status_changed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderTransactionStatusChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PAYMENT_TRANSACTION_STATUS_CHANGED_EVENT = 'payment.transaction.status_changed';

@Injectable()
export class PaymentTransactionStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentTransactionStatusChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_TRANSACTION_STATUS_CHANGED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderTransactionStatusChangedEmail({
            name: ((p.name as string) ?? (typeof p.firstName === 'string' ? p.firstName as string : 'গ্রাহক')),
            locale: (((p.locale as 'en' | 'bn') ?? 'bn')),
            ...p,
          } as any);
        } catch (err) {
          this.logger.warn(`Template render failed: ${err}`);
        }

        const isBn = ((p.locale as string) ?? 'bn') === 'bn';

        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: isBn ? 'লেনদেন স্ট্যাটাস' : 'Status Changed',
          body: html || 'আপনার লেনদেনের স্ট্যাটাস পরিবর্তিত হয়েছে।',
          data: { eventType: 'payment.transaction.status_changed', ...p , html },
          idempotencyKey: 'payment-transaction-status-changed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ payment.transaction.status_changed বিজ্ঞপ্তি পাঠানো হয়েছে → ' + userId);
      } catch (err) {
        this.logger.error('ব্যর্থ: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ রেজিস্টার্ড হ্যান্ডলার: "payment.transaction.status_changed"');
  }
}
