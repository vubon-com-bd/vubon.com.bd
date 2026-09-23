import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ReturnShipmentRequestedEvent } from '../../domain/events/return-shipment.events';
import { NotifyCustomerCommand } from './commands/notify-customer.command';

@Injectable()
export class ReturnPickupSaga extends BaseSaga {
  readonly name = 'ReturnPickupSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  requested = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReturnShipmentRequestedEvent),
      map((event: ReturnShipmentRequestedEvent) => {
        return new NotifyCustomerCommand(
          event.payload.returnShipmentId,
          'return-requested',
          `Your return ${event.payload.returnShipmentId} has been requested`,
        );
      }),
    );
  };
}
