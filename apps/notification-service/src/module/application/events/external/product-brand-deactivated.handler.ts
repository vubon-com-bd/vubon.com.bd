/**
 * ProductBrandDeactivatedHandler
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_BRAND_DEACTIVATED_EVENT = 'product.brand.deactivated';

@Injectable()
export class ProductBrandDeactivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductBrandDeactivatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_BRAND_DEACTIVATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.updatedBy as string) ?? (p.createdBy as string) ?? (event as { aggregateId: string }).aggregateId;
      const name = typeof p.name === 'string' ? p.name : '';
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.SYSTEM,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'Brand Deactivated',
          body: name ? 'Brand Deactivated: ' + name : 'A brand has been deactivated.',
          data: { eventType: 'product.brand.deactivated', ...p },
          idempotencyKey: 'brand-deactivated-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Brand deactivated notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "product.brand.deactivated"');
  }
}
