/**
 * PricingChangedHandler — notifies pricing changes
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderPricingChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRICING_CHANGED_EVENT = 'product.pricing.changed';

@Injectable()
export class PricingChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(PricingChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRICING_CHANGED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PRICING_CHANGED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderPricingChangedEmail({
      name: (payload.name as string) ?? 'গ্রাহক',
      productName: (payload.productName as string) ?? '',
      oldPrice: (payload.oldPrice as number) ?? 0,
      newPrice: (payload.newPrice as number) ?? 0,
      currency: (payload.currency as string) ?? 'BDT',
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `💰 দাম পরিবর্তন হয়েছে` : `💰 Price Changed`,
        body: html || isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, "${payload?.productName ?? ""}" পণ্যের দাম ৳${payload?.oldPrice ?? 0} থেকে ৳${payload?.newPrice ?? 0} হয়েছে।` : `Hi ${payload?.name ?? "Vendor"}, price of "${payload?.productName ?? ""}" changed from ৳${payload?.oldPrice ?? 0} to ৳${payload?.newPrice ?? 0}.`,
        data: {
          html, eventType: 'product.pricing.changed', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `pricing-changed-${event.id}`,
      });
      this.logger.log(`✅ PricingChangedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`PricingChangedHandler failed: ${err}`);
    }
  }
}
