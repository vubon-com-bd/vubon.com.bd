/**
 * PaymentEventsHandler — cross-service consumer for payment events
 * @module notification-service/infrastructure/handlers
 *
 * payment.captured   → "Payment received"
 * payment.failed     → "Payment failed"
 * payment.refunded   → "Refund processed"
 * payment.paid       → "Payment confirmed"
 *
 * ⚠️ Payment payload may not carry userId (only orderId). We accept
 * userId/customerId if present; otherwise we skip with warning — the
 * order-service still emits order.confirmed with the customer context.
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

interface PaymentEventPayload {
  readonly paymentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly customerId?: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly reason?: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

type PaymentKind = 'captured' | 'failed' | 'refunded' | 'paid';

@Injectable()
export class PaymentEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentEventsHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notifications: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    const kinds: readonly PaymentKind[] = ['captured', 'failed', 'refunded', 'paid'];
    for (const kind of kinds) {
      this.eventBus.registerHandler(`payment.${kind}`, async (event) => {
        await this.onPaymentEvent(event, kind);
      });
    }
    this.logger.log(`🔗 PaymentEventsHandler subscribed to payment.captured/failed/refunded/paid`);
  }

  private async onPaymentEvent(event: unknown, kind: PaymentKind): Promise<void> {
    const env = event as DomainEventEnvelope;
    const p = (env.payload ?? {}) as PaymentEventPayload;
    const userId = p.userId ?? p.customerId;

    if (!userId) {
      this.logger.warn(`payment.${kind} — no userId in payload, skipping (orderId=${p.orderId ?? 'n/a'})`);
      return;
    }

    const tpl = this.template(kind, p);
    this.logger.log(`📬 payment.${kind} → notify user ${userId} (order=${p.orderId ?? 'n/a'})`);

    try {
      await this.notifications.send(
        {
          userId,
          type: tpl.type,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: tpl.channels,
          priority: tpl.priority,
          title: tpl.title,
          body: tpl.body,
          reference: p.paymentId
            ? { type: 'payment', id: p.paymentId }
            : undefined,
          data: {
            paymentId: p.paymentId,
            orderId: p.orderId,
            amount: p.amount,
            currency: p.currency,
          },
        },
        'system:payment-events-handler',
      );
      this.logger.log(`✅ payment.${kind} notification sent to ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ payment.${kind} notification failed: ${msg}`);
    }
  }

  private template(kind: PaymentKind, p: PaymentEventPayload) {
    const amt = p.amount !== undefined ? `${p.amount} ${p.currency ?? ''}`.trim() : '';
    switch (kind) {
      case 'captured':
        return {
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'Payment received',
          body: `We received your payment${amt ? ` of ${amt}` : ''}. Thank you!`,
        };
      case 'paid':
        return {
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.NORMAL,
          title: 'Payment confirmed',
          body: `Your payment has been confirmed${amt ? ` (${amt})` : ''}.`,
        };
      case 'failed':
        return {
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.PUSH] as const,
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          title: 'Payment failed',
          body: `Your payment could not be completed${p.reason ? `: ${p.reason}` : ''}. Please try again.`,
        };
      case 'refunded':
        return {
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'Refund processed',
          body: `Your refund${amt ? ` of ${amt}` : ''} has been processed. It may take 5-7 business days to reflect.`,
        };
    }
  }
}
