/**
 * PayoutProcessedHandler — notifies vendor when payout is processed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderPayoutProcessedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PAYOUT_PROCESSED_EVENT = 'vendor.payout.processed';

@Injectable()
export class PayoutProcessedHandler implements OnModuleInit {
  private readonly logger = new Logger(PayoutProcessedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYOUT_PROCESSED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PAYOUT_PROCESSED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderPayoutProcessedEmail({
      name: (payload.name as string) ?? 'ভেন্ডর',
      amount: (payload.amount as number) ?? 0,
      currency: (payload.currency as string) ?? 'BDT',
      method: (payload.method as string) ?? undefined,
      processedAt: (payload.processedAt as string) ?? new Date().toISOString(),
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `পেআউট সম্পন্ন` : `Payout Processed`,
        body: html || isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার ৳${payload?.amount ?? 0} পেআউট সফলভাবে সম্পন্ন হয়েছে।` : `Hi ${payload?.name ?? "Vendor"}, your ৳${payload?.amount ?? 0} payout has been processed.`,
        data: {
          html, eventType: 'vendor.payout.processed', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `payout-processed-${event.id}`,
      });
      this.logger.log(`✅ PayoutProcessedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`PayoutProcessedHandler failed: ${err}`);
    }
  }
}
