/**
 * RefundFailedHandler — payment.refund.failed → Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderRefundFailedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const REFUND_FAILED_EVENT = 'payment.refund.failed';

@Injectable()
export class RefundFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(RefundFailedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(REFUND_FAILED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;
      const orderId = (p.orderId as string) ?? '';
      const amount = p.amount ?? p.total ?? 0;
      const currency = (p.currency as string) ?? 'BDT';

      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderRefundFailedEmail({
      name: (p.name as string) ?? 'গ্রাহক',
      orderId: (p.orderId as string) ?? '',
      amount: (p.amount as number) ?? 0,
      currency: (p.currency as string) ?? 'BDT',
      reason: (p.reason as string) ?? undefined,
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '❌ রিফান্ড ব্যর্থ',
          body: html || `প্রিয় গ্রাহক,\n\nদুঃখিত, আপনার রিফান্ড প্রক্রিয়া ব্যর্থ হয়েছে।\n\nকারণ:\n{reason}\n\nসহায়তার জন্য:\nsupport@vubon.com.bd\n\nVubon টিম`,
          data: {
          html, eventType: 'payment.refund.failed', ...p },
          idempotencyKey: 'refund-failed-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "payment.refund.failed"');
  }
}
