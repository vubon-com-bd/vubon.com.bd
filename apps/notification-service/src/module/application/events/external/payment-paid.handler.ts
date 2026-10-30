/**
 * PaymentPaidHandler — reacts to payment.payment.paid
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderPaymentReceiptEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const PAYMENT_PAID_EVENT = 'payment.payment.paid';
export const PAYMENT_COMPLETED_NOTIF_EVENT = 'payment.payment.completed';

interface PaymentPaidHandlerPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
}

interface PaymentPaidHandlerEvent {
  readonly id: string;
  readonly type: 'payment.payment.paid';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: PaymentPaidHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class PaymentPaidHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentPaidHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_PAID_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentPaidHandlerEvent);
    });
    this.eventBus.registerHandler(PAYMENT_COMPLETED_NOTIF_EVENT, async (event) => {
      await this.handle(event as unknown as PaymentPaidHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_PAID_EVENT}" + "${PAYMENT_COMPLETED_NOTIF_EVENT}"`);
  }

  private async handle(event: PaymentPaidHandlerEvent): Promise<void> {
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
    this.logger.log(`Received payment.payment.paid — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        

        

        ;
const html = renderPaymentReceiptEmail({
          name: (payload as unknown as { name?: string }).name ?? 'Customer',
          orderId: (payload as unknown as { orderId?: string }).orderId ?? '',
          amount: (payload as unknown as { amount?: number }).amount ?? 0,
          currency: (payload as unknown as { currency?: string }).currency ?? 'BDT',
          transactionId: (payload as unknown as { transactionId?: string }).transactionId ?? '',
          locale: ((payload as unknown as { locale?: 'en' | 'bn' }).locale ?? 'bn'),
        });

const resolved = resolveTemplate(
          this.i18n,
          'PAYMENT_RECEIVED',
          locale,
          {
            amount: (payload as any).amount, transactionId: (payload as any).transactionId
          },
          {
            subject: 'Payment Received',
            body: html || 'Payment of {{amount}} received. TxnID: {{transactionId}}',
          },
        );

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
          eventType: 'payment.payment.paid',
          eventId: event.id,
          ...payload,
          html,
        },
        idempotencyKey: `paymentpaid-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PaymentPaidHandler failed: ${msg}`);
    }
  }
}
