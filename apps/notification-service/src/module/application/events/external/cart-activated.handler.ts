/**
 * CartActivatedHandler
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

export const CART_ACTIVATED_EVENT = 'cart.cart.activated';

@Injectable()
export class CartActivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartActivatedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_ACTIVATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ORDER_UPDATE,
          category: NOTIFICATION_CATEGORY.ORDER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: '🛒 আপনার কার্ট প্রস্তুত',
          body: `প্রিয় গ্রাহক,\n\nআপনার কার্ট প্রস্তুত!\n\nশপিং চালিয়ে যান →\nVubon অ্যাপে → Cart`,
          data: { eventType: 'cart.cart.activated', ...p },
          idempotencyKey: 'cart-activated-' + (event as { id: string }).id,
        });
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "cart.cart.activated"');
  }
}
