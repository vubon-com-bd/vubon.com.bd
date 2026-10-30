/**
 * TransactionFailedHandler — payment.transaction.failed → Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderTransactionFailedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const TRANSACTION_FAILED_EVENT = 'payment.transaction.failed';

@Injectable()
export class TransactionFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(TransactionFailedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(TRANSACTION_FAILED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      const orderId = (p.orderId as string) ?? '';
      const amount = p.amount ?? p.total ?? 0;
      const currency = (p.currency as string) ?? 'BDT';

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderTransactionFailedEmail({
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
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: isBn ? 'Failed' : 'Failed',
          body: html || `প্রিয় গ্রাহক,\n\nআপনার লেনদেন ব্যর্থ হয়েছে।\n\nকারণ:\n{reason}\n\nআবার চেষ্টা করুন:\nVubon অ্যাপে → Transactions\n\nসহায়তা: support@vubon.com.bd\n\nVubon টিম`,
          data: { eventType: 'payment.transaction.failed', ...p , html },
          idempotencyKey: 'transaction-failed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "payment.transaction.failed"');
  }
}
