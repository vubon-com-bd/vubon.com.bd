import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { SubscriptionRenewedEvent } from '../../domain/events/subscription.events';
import { SendInvoiceEmailCommand } from './commands/send-invoice-email.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class SubscriptionRenewalSaga extends BaseSaga {
  readonly name = 'SubscriptionRenewalSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven saga
  }

  async compensate(): Promise<void> {
    // no compensation required
  }

  @Saga()
  onRenewed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionRenewedEvent),
      map((event: SubscriptionRenewedEvent) => {
        return new SendInvoiceEmailCommand(event.payload.subscriptionId);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionRenewedEvent),
      map((event: SubscriptionRenewedEvent) => {
        return new UpdateAnalyticsCommand('subscription.renewed', event.payload.subscriptionId);
      }),
    );
  };
}
