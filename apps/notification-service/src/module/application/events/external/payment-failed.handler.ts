/**
 * PaymentFailedHandler — reacts to payment.payment.failed
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderPaymentFailedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { REMINDER_CHAIN_SERVICE, type ReminderChainService } from '../../services/impl/reminder-chain.service.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
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

export const PAYMENT_FAILED_EVENT = 'payment.payment.failed';

interface PaymentFailedHandlerPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly reason: string | undefined;
}

interface PaymentFailedHandlerEvent {
  readonly id: string;
  readonly type: 'payment.payment.failed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentFailedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentFailedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentFailedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    @Inject(REMINDER_CHAIN_SERVICE)
    private readonly reminderChain: ReminderChainService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_FAILED_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentFailedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_FAILED_EVENT}"`);
  }

  private async handle(event: PaymentFailedHandlerEvent): Promise<void> {
    const payload = event.payload;

    // ─── Fetch user profile for email/name/locale ───
    const _userId = (payload as any).userId ?? (payload as any).customerId ?? event.aggregateId;
    let userEmail = (payload as any).email;
    let userName = (payload as any).name;
    let userLocale = (payload as any).locale;
    if (!userEmail && _userId) {
      try {
        const profile = await this.userClient.getById(_userId);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? profile.name ?? profile.firstName;
          userLocale = userLocale ?? (profile.locale as 'en' | 'bn' | undefined);
        }
      } catch (err) {
        this.logger.warn(`User fetch failed for ${_userId}: ${err}`);
      }
    }
    this.logger.log(`Received payment.payment.failed — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'PAYMENT_FAILED',
          locale,
          {
            amount: (payload as any).amount, reason: (payload as any).reason
          },
          {
            subject: 'Payment Failed',
            body: 'Your payment of {{amount}} failed. Reason: {{reason}}',
          },
        );

              let html = '';
      try {
        html = renderPaymentFailedEmail({
          name: (payload as any).name ?? 'Customer',
          orderId: (payload as any).orderId ?? '',
          amount: (payload as any).amount ?? 0,
          currency: (payload as any).currency ?? 'BDT',
          reason: (payload as any).reason,
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'payment.payment.failed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `paymentfailed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);

      // 📅 Schedule payment retry reminders (1d, 3d, 7d)
      try {
        await this.reminderChain.schedulePaymentRetryReminders({
          paymentId: (payload as any).paymentId ?? event.aggregateId,
          orderId: (payload as any).orderId ?? '',
          userId: (payload as any).userId ?? '',
          amount: (payload as any).amount ?? 0,
          currency: (payload as any).currency ?? 'BDT',
        });
      } catch (reminderErr) {
        const msg = reminderErr instanceof Error ? reminderErr.message : 'unknown';
        this.logger.warn(`Reminder chain scheduling failed: ${msg}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PaymentFailedHandler failed: ${msg}`);
    }
  }
}
