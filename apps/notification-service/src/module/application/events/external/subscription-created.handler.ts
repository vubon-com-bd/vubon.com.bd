/**
 * SubscriptionCreatedHandler — payment.subscription.created → Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderSubscriptionCreatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const SUBSCRIPTION_CREATED_EVENT = 'payment.subscription.created';

@Injectable()
export class SubscriptionCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(SubscriptionCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SUBSCRIPTION_CREATED_EVENT, async (event) => {
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
          html = renderSubscriptionCreatedEmail({
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
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: isBn ? 'Created' : 'Created',
          body: html || `প্রিয় গ্রাহক,\n\nআপনার সাবস্ক্রিপশন সফলভাবে তৈরি হয়েছে!\n\nপ্ল্যান: {planName}\nমূল্য: {amount} {currency}\n\nসুবিধা:\n✓ প্রিমিয়াম ফিচার\n✓ অগ্রাধিকার সাপোর্ট\n✓ এক্সক্লুসিভ অফার\n\nVubon টিম`,
          data: { eventType: 'payment.subscription.created', ...p , html },
          idempotencyKey: 'subscription-created-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "payment.subscription.created"');
  }
}
