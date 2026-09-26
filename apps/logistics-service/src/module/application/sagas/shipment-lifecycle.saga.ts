import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  ShipmentCreatedEvent,
  ShipmentDeliveredEvent,
} from '../../domain/events/shipment.events';
import { NotifyCustomerCommand } from './commands/notify-customer.command';
import { UpdateOrderStatusCommand } from './commands/update-order-status.command';

@Injectable()
export class ShipmentLifecycleSaga extends BaseSaga {
  readonly name = 'ShipmentLifecycleSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven saga
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  created = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ShipmentCreatedEvent),
      map((event: ShipmentCreatedEvent) => {
        return new UpdateOrderStatusCommand(event.payload.orderId, 'shipped');
      }),
    );
  };

  @Saga()
  delivered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ShipmentDeliveredEvent),
      map((event: ShipmentDeliveredEvent) => {
        return new NotifyCustomerCommand(
          event.payload.orderId,
          'delivered',
          `Shipment ${event.payload.shipmentId} has been delivered`,
        );
      }),
    );
  };
}
