/**
 * SubscriptionRenewalSaga — reacts to subscription lifecycle
 * @module payment-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  SubscriptionCreatedEvent,
  SubscriptionRenewedEvent,
  SubscriptionCancelledEvent,
  SubscriptionExpiredEvent,
} from '@domain/events/subscription.events.js';

import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { SendInvoiceEmailCommand } from './commands/send-invoice-email.command.js';

@Injectable()
export class SubscriptionRenewalSaga {
  private readonly logger = new Logger(SubscriptionRenewalSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionCreatedEvent),
      tap((e: SubscriptionCreatedEvent) => {
        this.logger.log(`[SAGA] Subscription created: ${e.payload.subscriptionId}`);
      }),
      map(
        (e: SubscriptionCreatedEvent) =>
          new UpdateAnalyticsCommand(e.payload.subscriptionId, 'subscription.created', {
            plan: e.payload.plan,
            price: e.payload.price,
          }),
      ),
    );
  };

  @Saga()
  onRenewed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionRenewedEvent),
      map(
        (e: SubscriptionRenewedEvent) =>
          new UpdateAnalyticsCommand(e.payload.subscriptionId, 'subscription.renewed', {
            periodStart: e.payload.periodStart,
            periodEnd: e.payload.periodEnd,
          }),
      ),
    );
  };

  @Saga()
  onCancelledOrExpired = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionCancelledEvent, SubscriptionExpiredEvent),
      map(
        (e: SubscriptionCancelledEvent | SubscriptionExpiredEvent) =>
          new UpdateAnalyticsCommand(e.payload.subscriptionId, 'subscription.terminated', {
            reason: e.payload.toStatus,
          }),
      ),
    );
  };
}
