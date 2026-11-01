/**
 * ProductPricingDiscountAppliedHandler — Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderPricingDiscountAppliedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import { BanglaEmailTemplate } from '@infrastructure/external/email/templates/bangla-base.template.js';

export const PRODUCT_PRICING_DISCOUNT_APPLIED_EVENT = 'product.pricing.discount_applied';

@Injectable()
export class ProductPricingDiscountAppliedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductPricingDiscountAppliedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_PRICING_DISCOUNT_APPLIED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      const discountPercent = Number(p.discountPercent ?? 0);
      const discountAmount = Number(p.discountAmount ?? 0);
      const effectiveFrom = p.effectiveFrom ? new Date(p.effectiveFrom as string).toLocaleDateString('bn-BD') : 'আজ';
      const effectiveTo = p.effectiveTo ? new Date(p.effectiveTo as string).toLocaleDateString('bn-BD') : '';
      const productId = (p.productId as string) ?? 'পণ্য';

      const expiryLine = effectiveTo ? `⏰ শেষ তারিখ: ${effectiveTo}\n\n` : '';

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderPricingDiscountAppliedEmail({
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
        type: NOTIFICATION_TYPE.PROMOTIONAL,
        category: NOTIFICATION_CATEGORY.MARKETING,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? 'ডিসকাউন্ট প্রয়োগ' : 'Discount Applied',
        body: html || (isBn ? 'আপনার পণ্যে নতুন ডিসকাউন্ট প্রয়োগ হয়েছে।' : 'A new discount has been applied to your product.'),
        data: { eventType: 'product.pricing.discount_applied', ...p, html },
        idempotencyKey: 'product-pricing-discount-applied-' + (event as { id: string }).id,
      });
      this.logger.log('✅ Bengali discount notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "product.pricing.discount_applied"');
  }
}
