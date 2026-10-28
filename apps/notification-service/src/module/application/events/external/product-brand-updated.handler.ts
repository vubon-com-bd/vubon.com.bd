/**
 * ProductBrandUpdatedHandler
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY, NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';
import { NOTIFICATION_SERVICE, type INotificationService } from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_BRAND_UPDATED_EVENT = 'product.brand.updated';

@Injectable()
export class ProductBrandUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductBrandUpdatedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_BRAND_UPDATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.updatedBy as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.SYSTEM,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'Brand Updated',
          body: `Brand "${(p.name as string) ?? 'N/A'}" has been updated.`,
          data: { eventType: PRODUCT_BRAND_UPDATED_EVENT, ...p },
          idempotencyKey: `brand-updated-${(event as { id: string }).id}`,
        });
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_BRAND_UPDATED_EVENT}"`);
  }
}
