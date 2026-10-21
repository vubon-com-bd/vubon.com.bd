/**
 * PaymentProcessingSaga — reacts to payment lifecycle events
 * @module payment-service/application/sagas
 *
 * Emits side-effect commands (analytics + notify + order-status) without
 * coupling payment to those services.
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  PaymentCreatedEvent,
  PaymentCapturedEvent,
  PaymentPaidEvent,
  PaymentFailedEvent,
  PaymentCancelledEvent,
} from '@domain/events/payment.events.js';

import { NotifyPaymentSuccessCommand } from './commands/notify-payment-success.command.js';
import { NotifyPaymentFailedCommand } from './commands/notify-payment-failed.command.js';
import { UpdateOrderStatusCommand } from './commands/update-order-status.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class PaymentProcessingSaga {
  private readonly logger = new Logger(PaymentProcessingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCreatedEvent),
      tap((e: PaymentCreatedEvent) => {
        this.logger.log(`[SAGA] Payment created: ${e.payload.paymentId}`);
      }),
      map((e: PaymentCreatedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.paymentId, 'payment.created', {
            amount: e.payload.amount,
            currency: e.payload.currency,
          }),
        );
        return new UpdateOrderStatusCommand(e.payload.orderId, 'payment_pending');
      }),
    );
  };

  @Saga()
  onPaid = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentPaidEvent, PaymentCapturedEvent),
      map(
        (e: PaymentPaidEvent | PaymentCapturedEvent) =>
          new NotifyPaymentSuccessCommand(
            e.payload.paymentId,
            'system',
            0,
            'BDT',
          ),
      ),
    );
  };

  @Saga()
  onFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentFailedEvent, PaymentCancelledEvent),
      map(
        (e: PaymentFailedEvent | PaymentCancelledEvent) =>
          new NotifyPaymentFailedCommand(
            e.payload.paymentId,
            'system',
            'Payment failed',
          ),
      ),
    );
  };
}
