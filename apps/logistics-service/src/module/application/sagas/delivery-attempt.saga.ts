import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  DeliveryAttemptedEvent,
  DeliveryFailedEvent,
} from '../../domain/events/delivery.events';
import { NotifyCustomerCommand } from './commands/notify-customer.command';

@Injectable()
export class DeliveryAttemptSaga extends BaseSaga {
  readonly name = 'DeliveryAttemptSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  attempted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeliveryAttemptedEvent),
      map((event: DeliveryAttemptedEvent) => {
        return new NotifyCustomerCommand(
          event.payload.deliveryId,
          'attempt',
          `Delivery attempt #${event.payload.attemptNo}`,
        );
      }),
    );
  };

  @Saga()
  failed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeliveryFailedEvent),
      map((event: DeliveryFailedEvent) => {
        return new NotifyCustomerCommand(
          event.payload.deliveryId,
          'failed',
          `Delivery failed: ${event.payload.reason}`,
        );
      }),
    );
  };
}
