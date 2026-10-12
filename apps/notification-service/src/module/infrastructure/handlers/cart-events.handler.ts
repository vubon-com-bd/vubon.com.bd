/**
 * CartEventsHandler — cross-service consumer for cart events
 * @module notification-service/infrastructure/handlers
 *
 * cart.abandoned → reminder email + push
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from '@vubon/shared-constants/platform/notification';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../application/services/interfaces/notification.service.interface.js';

interface CartEventPayload {
  readonly cartId?: string;
  readonly userId?: string;
  readonly customerId?: string;
  readonly itemCount?: number;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class CartEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(CartEventsHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notifications: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('cart.abandoned', async (event) => {
      await this.onAbandoned(event);
    });
    this.logger.log(`🔗 CartEventsHandler subscribed to cart.abandoned`);
  }

  private async onAbandoned(event: unknown): Promise<void> {
    const env = event as DomainEventEnvelope;
    const p = (env.payload ?? {}) as CartEventPayload;
    const userId = p.userId ?? p.customerId;

    if (!userId) {
      this.logger.warn(`cart.abandoned — missing userId, skipping`);
      return;
    }

    this.logger.log(`📬 cart.abandoned → reminder to user ${userId}`);

    try {
      await this.notifications.send(
        {
          userId,
          type: NOTIFICATION_TYPE.REMINDER,
          category: NOTIFICATION_CATEGORY.ORDER,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.PUSH],
          priority: NOTIFICATION_PRIORITY.LOW,
          title: 'You left something behind',
          body: `You have ${p.itemCount ?? 'some'} item(s) waiting in your cart. Complete your purchase before they sell out!`,
          reference: p.cartId ? { type: 'cart', id: p.cartId } : undefined,
          data: { cartId: p.cartId, itemCount: p.itemCount },
        },
        'system:cart-events-handler',
      );
      this.logger.log(`✅ cart.abandoned reminder sent to ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ cart.abandoned notification failed: ${msg}`);
    }
  }
}
