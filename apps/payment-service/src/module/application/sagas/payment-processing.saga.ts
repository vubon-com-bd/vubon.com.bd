import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { PaymentCompletedEvent } from '../../domain/events/payment.events';
import { PaymentFailedEvent } from '../../domain/events/payment.events';
import { NotifyPaymentSuccessCommand } from './commands/notify-payment-success.command';
import { NotifyPaymentFailedCommand } from './commands/notify-payment-failed.command';
import { UpdateOrderStatusCommand } from './commands/update-order-status.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class PaymentProcessingSaga extends BaseSaga {
  readonly name = 'PaymentProcessingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven saga
  }

  async compensate(): Promise<void> {
    // no compensation required
  }

  @Saga()
  onCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCompletedEvent),
      map((event: PaymentCompletedEvent) => {
        return new NotifyPaymentSuccessCommand(event.payload.paymentId);
      }),
    );
  };

  @Saga()
  orderUpdate = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCompletedEvent),
      map((event: PaymentCompletedEvent) => {
        return new UpdateOrderStatusCommand(
          event.payload.orderId,
          'paid',
        );
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCompletedEvent),
      map((event: PaymentCompletedEvent) => {
        return new UpdateAnalyticsCommand('payment.completed', event.payload.paymentId);
      }),
    );
  };

  @Saga()
  onFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentFailedEvent),
      map((event: PaymentFailedEvent) => {
        return new NotifyPaymentFailedCommand(event.payload.paymentId, event.payload.reason);
      }),
    );
  };
}
