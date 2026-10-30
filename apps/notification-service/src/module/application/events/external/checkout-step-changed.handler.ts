/**
 * CheckoutStepChangedHandler — reacts to order.checkout.step_changed
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
import { renderCheckoutStepChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const CHECKOUT_STEP_CHANGED_EVENT = 'order.checkout.step_changed';

interface CheckoutStepChangedHandlerPayload {
  readonly checkoutId: string;
  readonly userId: string;
  readonly fromStep?: string;
  readonly toStep?: string;
  readonly name?: string;
  readonly locale?: string;
}

interface CheckoutStepChangedHandlerEvent {
  readonly id: string;
  readonly type: 'order.checkout.step_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CheckoutStepChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CheckoutStepChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(CheckoutStepChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CHECKOUT_STEP_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as CheckoutStepChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CHECKOUT_STEP_CHANGED_EVENT}"`);
  }

  private async handle(event: CheckoutStepChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order.checkout.step_changed — ${JSON.stringify(payload)}`);

    const locale = ((payload as any).locale as string) ?? 'bn';
    const name = ((payload as any).name as string) ?? 'Customer';

    try {
      let html = '';
      try {
        html = renderCheckoutStepChangedEmail({
          name,
          checkoutId: (payload as any).checkoutId ?? '',
          fromStep: payload.fromStep,
          toStep: payload.toStep,
          locale: locale as 'en' | 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: ((payload as any).userId as string) ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: `চেকআউট ধাপ পরিবর্তন`,
        body: html || `চেকআউটের পরবর্তী ধাপে এগিয়েছে।`,
        data: {
          html,
          eventType: 'order.checkout.step_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `checkout-step-changed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CheckoutStepChangedHandler failed: ${msg}`);
    }
  }
}
