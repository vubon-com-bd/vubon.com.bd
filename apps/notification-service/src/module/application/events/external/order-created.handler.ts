/**
 * OrderCreatedHandler — reacts to order-service.order.created
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
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderOrderConfirmationEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';

export const ORDER_CREATED_EVENT = 'order.order.created';

interface OrderCreatedHandlerPayload {
  readonly orderId: string;
  readonly orderNumber?: string;
  readonly customerId?: string;
  readonly userId?: string;
  readonly total?: number;
  readonly totalAmount?: number;
  readonly currency: string;
  readonly name?: string;
  readonly email?: string;
  readonly locale?: 'en' | 'bn';
}

interface OrderCreatedHandlerEvent {
  readonly id: string;
  readonly type: 'order.order.created';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderCreatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly userClient: UserClient,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CREATED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderCreatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CREATED_EVENT}"`);
  }

  private async handle(event: OrderCreatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received order-service.order.created — ${JSON.stringify(payload)}`);

    // ─── Resolve customer ID (order service uses customerId) ───
    const customerId = payload.customerId ?? payload.userId ?? event.aggregateId;
    this.logger.log(`🔍 DEBUG: customerId=${customerId}, userClient=${!!this.userClient}`);
    if (!customerId) {
      this.logger.warn('No customerId in order.created payload — skip');
      return;
    }

    // ─── Fetch user profile for email/name/locale ───
    let userEmail = payload.email;
    let userName = payload.name;
    let userLocale = payload.locale;

    // Fallback: if email missing after user lookup, use SMTP_USER (admin) for testing
    const FALLBACK_EMAIL = process.env['NOTIFICATION_FALLBACK_EMAIL'] ?? process.env['SMTP_USER'];

    if (!userEmail || !userName) {
      this.logger.log(`🔍 Calling userClient.getById(${customerId})...`);
      try {
        const profile = await this.userClient.getById(customerId);
        this.logger.log(`🔍 userClient response: ${profile ? 'found' : 'null'}`);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? profile.name ?? profile.firstName;
          userLocale = userLocale ?? (profile.locale as 'en' | 'bn' | undefined);
          this.logger.log(
            `Fetched user profile: email=${profile.email ? 'yes' : 'no'} name=${profile.name ?? profile.firstName ?? 'no'}`,
          );
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.warn(`User fetch failed for ${customerId}: ${msg}`);
      }
    }

    // Final fallback: use admin email if user email still missing
    if (!userEmail && FALLBACK_EMAIL) {
      userEmail = FALLBACK_EMAIL;
      this.logger.log(`📬 Using fallback email: ${FALLBACK_EMAIL}`);
    }

    const locale = getLocale({
      locale: userLocale,
    } as Record<string, unknown>);
    const amount = payload.total ?? payload.totalAmount ?? 0;

    try {
      const resolved = resolveTemplate(
        this.i18n,
        'ORDER_CREATED',
        locale,
        {
          name: userName ?? 'Customer',
          orderId: payload.orderId,
          orderNumber: payload.orderNumber ?? payload.orderId,
          total: this.i18n.formatCurrency(amount, locale),
          currency: payload.currency,
        },
        {
          subject: 'Order Confirmed',
          body: 'Your order #{{orderId}} has been created. Total: {{total}} {{currency}}',
        },
      );

      this.logger.log(`🌐 Locale: ${locale} | Subject: ${resolved.subject}`);
      this.logger.log(`📝 Body: ${resolved.body.substring(0, 100)}...`);

      // ─── Render HTML template ───
      let html = '';
      try {
        html = renderOrderConfirmationEmail({
          name: userName ?? 'Customer',
          orderId: payload.orderId,
          total: amount,
          currency: payload.currency,
          locale: locale === 'bn' ? 'bn' : 'en',
        });
      } catch (err) {
        this.logger.warn(`HTML render failed: ${err}`);
      }

      // ─── Determine channels ───
      // EMAIL: only if we have userEmail
      // IN_APP: always
      const channels = userEmail
        ? [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP]
        : [NOTIFICATION_CHANNEL.IN_APP];

      this.logger.log(
        `📬 Channels: ${channels.join(', ')} | email=${userEmail ?? 'none'}`,
      );

      const result = await this.notificationService.send({
        userId: customerId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels,
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'order.order.created',
          eventId: event.id,
          orderId: payload.orderId,
          orderNumber: payload.orderNumber ?? payload.orderId,
          amount,
          currency: payload.currency,
          // ─── CRITICAL: fields required by SendEmailDispatchHandler ───
          email: userEmail,
          html,
          name: userName,
          locale,
        },
        idempotencyKey: `ordercreated-${event.id}`,
        ...(userEmail ? { email: userEmail } : {}),
      });

      this.logger.log(
        `✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`OrderCreatedHandler failed: ${msg}`);
    }
  }
}
