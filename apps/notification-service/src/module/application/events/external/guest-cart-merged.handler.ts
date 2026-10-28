/**
 * GuestCartMergedHandler — reacts to cart.guest_cart.merged
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { renderGuestCartMergedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';

export const GUEST_CART_MERGED_EVENT = 'cart.guest_cart.merged';

interface GuestCartMergedHandlerPayload {
  readonly name?: string;
  readonly locale?: string;
  readonly [key: string]: unknown;
}

interface GuestCartMergedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.guest_cart.merged';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: GuestCartMergedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class GuestCartMergedHandler implements OnModuleInit {
  private readonly logger = new Logger(GuestCartMergedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(GUEST_CART_MERGED_EVENT, async (event) => {
      await this.handle(event as unknown as GuestCartMergedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${GUEST_CART_MERGED_EVENT}"`);
  }

  private async handle(event: GuestCartMergedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.guest_cart.merged — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as Record<string, unknown>);
      const resolved = resolveTemplate(
        this.i18n,
        'cart.guest_cart.merged',
        locale,
        payload as Record<string, unknown>,
        {
          subject: 'Guest Cart Merged',
          body: 'Your guest cart has been merged. {{itemCount}} items added.',
        },
      );

      // ─── HTML template ───
      let html = '';
      try {
        html = renderGuestCartMergedEmail({
          name: (payload as any).name ?? 'Customer',
          itemCount: (payload as any).itemCount ?? 0,
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'cart.guest_cart.merged',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-guest-cart-merged-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`GuestCartMergedHandler failed: ${msg}`);
    }
  }
}
