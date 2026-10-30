/**
 * CartVoucherRemovedHandler — reacts to cart.voucher.removed
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
import { renderVoucherRemovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';

export const CART_VOUCHER_REMOVED_EVENT = 'cart.voucher.removed';

interface CartVoucherRemovedHandlerPayload {
  readonly name?: string;
  readonly locale?: string;
  readonly [key: string]: unknown;
}

interface CartVoucherRemovedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.voucher.removed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartVoucherRemovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartVoucherRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartVoucherRemovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_VOUCHER_REMOVED_EVENT, async (event) => {
      await this.handle(event as unknown as CartVoucherRemovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_VOUCHER_REMOVED_EVENT}"`);
  }

  private async handle(event: CartVoucherRemovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.voucher.removed — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as Record<string, unknown>);
      // ─── HTML template (rendered first) ───
      let html = '';
      try {
        html = renderVoucherRemovedEmail({
          name: (payload as any).name ?? 'Customer',
          code: (payload as any).code ?? '',
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }


      const resolved = resolveTemplate(
        this.i18n,
        'cart.voucher.removed',
        locale,
        payload as Record<string, unknown>,
        {
          subject: 'Voucher Removed',
          body: html,
        },
      );

      // ─── HTML template ───

            const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'cart.voucher.removed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-voucher-removed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartVoucherRemovedHandler failed: ${msg}`);
    }
  }
}
