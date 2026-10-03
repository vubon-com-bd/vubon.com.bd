/**
 * OrderCheckoutSaga — react to checkout lifecycle
 * @module order-service/application/sagas
 *
 * Flow:
 *   CheckoutCompletedEvent → CreateOrder (via order service)
 *                          → SendOrderEmail (created)
 *                          → UpdateAnalytics
 *   CheckoutAbandonedEvent → SendOrderEmail (abandon notification)
 *   CheckoutExpiredEvent   → ReleaseInventory (if reserved)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import {
  CheckoutCompletedEvent,
  CheckoutAbandonedEvent,
  CheckoutExpiredEvent,
} from '../../domain/events/checkout.events.js';
import { SendOrderEmailCommand } from './commands/send-order-email.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { ReleaseInventoryCommand } from './commands/release-inventory.command.js';

@Injectable()
export class OrderCheckoutSaga {
  private readonly logger = new Logger(OrderCheckoutSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onCheckoutCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutCompletedEvent),
      tap((e: CheckoutCompletedEvent) => {
        this.logger.log(
          `Checkout completed: ${e.payload.checkoutId} → order ${e.payload.orderId}`,
        );
      }),
      map((e: CheckoutCompletedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.orderId, 'order.created', {
            total: e.payload.total,
            currency: e.payload.currency,
          }),
        );
        return new SendOrderEmailCommand(
          e.payload.orderId,
          'customer@example.com',
          'created',
        );
      }),
    );
  };

  @Saga()
  onCheckoutAbandoned = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutAbandonedEvent),
      tap((e: CheckoutAbandonedEvent) => {
        this.logger.warn(
          `Checkout abandoned: ${e.payload.checkoutId} at step ${e.payload.lastStep}`,
        );
      }),
      map(
        (e: CheckoutAbandonedEvent) =>
          new UpdateAnalyticsCommand(e.payload.checkoutId, 'checkout.abandoned', {
            lastStep: e.payload.lastStep,
            itemCount: e.payload.itemCount,
          }),
      ),
    );
  };

  @Saga()
  onCheckoutExpired = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutExpiredEvent),
      filter((e: CheckoutExpiredEvent) => !!e.payload.checkoutId),
      map(
        (e: CheckoutExpiredEvent) =>
          new ReleaseInventoryCommand(e.payload.checkoutId, 'checkout_expired'),
      ),
    );
  };
}
