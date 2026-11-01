/**
 * ProductPricingRuleRemovedHandler — product.pricing.rule_removed → Bengali notification
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderPricingRuleRemovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_PRICING_RULE_REMOVED_EVENT = 'product.pricing.rule_removed';

@Injectable()
export class ProductPricingRuleRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductPricingRuleRemovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_PRICING_RULE_REMOVED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderPricingRuleRemovedEmail({
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
          type: NOTIFICATION_TYPE.ANNOUNCEMENT,
          category: NOTIFICATION_CATEGORY.SYSTEM,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: isBn ? 'প্রাইসিং রুল সরানো' : 'Rule Removed',
          body: html || `প্রিয় গ্রাহক,\n\nএকটি মূল্য নিয়ম সরানো হয়েছে।\n\nবর্তমান দাম:\nVubon অ্যাপে → Products\n\nVubon টিম`,
          data: { eventType: 'product.pricing.rule_removed', ...p , html },
          idempotencyKey: 'product-pricing-rule-removed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "product.pricing.rule_removed"');
  }
}
