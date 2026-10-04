/**
 * PaymentLifecycleSaga — orchestrates payment-flow side effects
 * @module payment-service/application/sagas
 *
 * Flow:
 *   PaymentInitiatedEvent  → NotifyCustomer + UpdateAnalytics
 *   PaymentAuthorizedEvent → UpdateAnalytics
 *   PaymentCapturedEvent   → NotifyCustomer + UpdateAnalytics + PublishDomainEvent
 *   PaymentPaidEvent       → NotifyCustomer + NotifyVendor + UpdateAnalytics
 *   PaymentFailedEvent     → NotifyCustomer + UpdateAnalytics + RetryGateway
 *   PaymentDeclinedEvent   → NotifyCustomer + UpdateAnalytics
 *   PaymentRefundedEvent   → NotifyCustomer + UpdateAnalytics
 *   PaymentChargebackEvent → NotifyCustomer + NotifyVendor + UpdateAnalytics
 *   PaymentRetryAttemptedEvent → UpdateAnalytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  PaymentInitiatedEvent,
  PaymentAuthorizedEvent,
  PaymentCapturedEvent,
  PaymentPaidEvent,
  PaymentFailedEvent,
  PaymentDeclinedEvent,
  PaymentRefundedEvent,
  PaymentChargebackEvent,
  PaymentRetryAttemptedEvent,
} from '../../domain/events/payment.events.js';

import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { NotifyVendorCommand } from './commands/notify-vendor.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { PublishDomainEventCommand } from './commands/publish-domain-event.command.js';
import { RetryGatewayCommand } from './commands/retry-gateway.command.js';

@Injectable()
export class PaymentLifecycleSaga {
  private readonly logger = new Logger(PaymentLifecycleSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onPaymentInitiated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentInitiatedEvent),
      tap((e: PaymentInitiatedEvent) => {
        this.logger.log(
          `Payment initiated: ${e.payload.paymentId} — ${e.payload.amount} ${e.payload.currency} via ${e.payload.method}`,
        );
      }),
      map((e: PaymentInitiatedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.initiated', {
            amount: e.payload.amount,
            currency: e.payload.currency,
            method: e.payload.method,
            gateway: e.payload.gateway,
          }),
        );
        return new NotifyCustomerCommand(
          e.payload.userId,
          e.payload.paymentId,
          'payment_initiated',
          { amount: e.payload.amount, currency: e.payload.currency },
        );
      }),
    );
  };

  @Saga()
  onPaymentCaptured = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCapturedEvent),
      map((e: PaymentCapturedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.captured', {
            amount: e.payload.amount,
            currency: e.payload.currency,
          }),
        );
        void this.commandBus.execute(
          new PublishDomainEventCommand(
            e.payload.paymentId,
            'payment.captured',
            {
              paymentId: e.payload.paymentId,
              amount: e.payload.amount,
              currency: e.payload.currency,
            },
          ),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'payment_captured',
          { amount: e.payload.amount, currency: e.payload.currency },
        );
      }),
    );
  };

  @Saga()
  onPaymentPaid = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentPaidEvent),
      map((e: PaymentPaidEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.paid', {
            orderId: e.payload.orderId,
            amount: e.payload.amount,
            currency: e.payload.currency,
          }),
        );
        void this.commandBus.execute(
          new NotifyVendorCommand(
            'system',
            e.payload.paymentId,
            'payment_paid',
            { orderId: e.payload.orderId },
          ),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'payment_paid',
          { orderId: e.payload.orderId },
        );
      }),
    );
  };

  @Saga()
  onPaymentFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentFailedEvent),
      tap((e: PaymentFailedEvent) => {
        this.logger.warn(
          `Payment failed: ${e.payload.paymentId} — ${e.payload.reason}`,
        );
      }),
      map((e: PaymentFailedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.failed', {
            reason: e.payload.reason,
            code: e.payload.code,
          }),
        );
        void this.commandBus.execute(
          new RetryGatewayCommand(e.payload.paymentId, 1, 30_000),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'payment_failed',
          { reason: e.payload.reason },
        );
      }),
    );
  };

  @Saga()
  onPaymentDeclined = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentDeclinedEvent),
      map((e: PaymentDeclinedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.declined', {
            reason: e.payload.reason,
          }),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'payment_declined',
          { reason: e.payload.reason },
        );
      }),
    );
  };

  @Saga()
  onPaymentRefunded = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentRefundedEvent),
      map((e: PaymentRefundedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.refunded', {
            amount: e.payload.amount,
            currency: e.payload.currency,
            fullyRefunded: e.payload.fullyRefunded,
          }),
        );
        void this.commandBus.execute(
          new PublishDomainEventCommand(
            e.payload.paymentId,
            'payment.refunded',
            {
              paymentId: e.payload.paymentId,
              amount: e.payload.amount,
              currency: e.payload.currency,
            },
          ),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'payment_refunded',
          {
            amount: e.payload.amount,
            currency: e.payload.currency,
            fullyRefunded: e.payload.fullyRefunded,
          },
        );
      }),
    );
  };

  @Saga()
  onPaymentChargeback = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentChargebackEvent),
      map((e: PaymentChargebackEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.chargeback', {
            amount: e.payload.amount,
            currency: e.payload.currency,
          }),
        );
        void this.commandBus.execute(
          new NotifyVendorCommand(
            'system',
            e.payload.paymentId,
            'payment_chargeback',
            { amount: e.payload.amount, currency: e.payload.currency },
          ),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'payment_chargeback',
          { amount: e.payload.amount },
        );
      }),
    );
  };

  @Saga()
  onPaymentRetryAttempted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentRetryAttemptedEvent),
      map((e: PaymentRetryAttemptedEvent) => {
        return new UpdateAnalyticsCommand(
          e.payload.paymentId,
          'payment.retry_attempted',
          { attempt: e.payload.attempt },
        );
      }),
    );
  };

  @Saga()
  onPaymentAuthorized = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentAuthorizedEvent),
      map((e: PaymentAuthorizedEvent) => {
        return new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.authorized', {
          amount: e.payload.amount,
          currency: e.payload.currency,
        });
      }),
    );
  };
}
