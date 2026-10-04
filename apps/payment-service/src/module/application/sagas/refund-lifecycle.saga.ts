/**
 * RefundLifecycleSaga — orchestrates refund-flow side effects
 * @module payment-service/application/sagas
 *
 * Flow:
 *   RefundRequestedEvent  → NotifyCustomer + UpdateAnalytics
 *   RefundSucceededEvent  → NotifyCustomer + NotifyVendor + PublishDomainEvent
 *   RefundFailedEvent     → NotifyCustomer + UpdateAnalytics
 *   RefundCancelledEvent  → UpdateAnalytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  RefundRequestedEvent,
  RefundSucceededEvent,
  RefundFailedEvent,
  RefundCancelledEvent,
} from '../../domain/events/refund.events.js';

import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { NotifyVendorCommand } from './commands/notify-vendor.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { PublishDomainEventCommand } from './commands/publish-domain-event.command.js';

@Injectable()
export class RefundLifecycleSaga {
  private readonly logger = new Logger(RefundLifecycleSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onRefundRequested = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundRequestedEvent),
      tap((e: RefundRequestedEvent) => {
        this.logger.log(
          `Refund requested: ${e.payload.refundId} for payment ${e.payload.paymentId} — ${e.payload.amount} ${e.payload.currency}`,
        );
      }),
      map((e: RefundRequestedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'refund.requested', {
            refundId: e.payload.refundId,
            amount: e.payload.amount,
            currency: e.payload.currency,
          }),
        );
        return new NotifyCustomerCommand(
          e.payload.requestedBy ?? 'system',
          e.payload.paymentId,
          'refund_requested',
          {
            refundId: e.payload.refundId,
            amount: e.payload.amount,
            currency: e.payload.currency,
          },
        );
      }),
    );
  };

  @Saga()
  onRefundSucceeded = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundSucceededEvent),
      map((e: RefundSucceededEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'refund.succeeded', {
            refundId: e.payload.refundId,
            amount: e.payload.amount,
            currency: e.payload.currency,
          }),
        );
        void this.commandBus.execute(
          new PublishDomainEventCommand(
            e.payload.paymentId,
            'refund.succeeded',
            {
              refundId: e.payload.refundId,
              paymentId: e.payload.paymentId,
              amount: e.payload.amount,
              currency: e.payload.currency,
            },
          ),
        );
        void this.commandBus.execute(
          new NotifyVendorCommand(
            'system',
            e.payload.paymentId,
            'refund_succeeded',
            { refundId: e.payload.refundId, amount: e.payload.amount },
          ),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'refund_succeeded',
          {
            refundId: e.payload.refundId,
            amount: e.payload.amount,
            currency: e.payload.currency,
          },
        );
      }),
    );
  };

  @Saga()
  onRefundFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundFailedEvent),
      tap((e: RefundFailedEvent) => {
        this.logger.warn(
          `Refund failed: ${e.payload.refundId} — ${e.payload.reason}`,
        );
      }),
      map((e: RefundFailedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'refund.failed', {
            refundId: e.payload.refundId,
            reason: e.payload.reason,
          }),
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.paymentId,
          'refund_failed',
          { refundId: e.payload.refundId, reason: e.payload.reason },
        );
      }),
    );
  };

  @Saga()
  onRefundCancelled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundCancelledEvent),
      map((e: RefundCancelledEvent) => {
        return new UpdateAnalyticsCommand(e.payload.paymentId, 'refund.cancelled', {
          refundId: e.payload.refundId,
          reason: e.payload.reason,
        });
      }),
    );
  };
}
