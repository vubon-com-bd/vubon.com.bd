/**
 * OrderFulfillmentSaga
 * @module order-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderStatusChangedEvent } from '../../domain/events/order.events.js';
import { NotifyVendorCommand } from './commands/notify-vendor.command.js';

@Injectable()
export class OrderFulfillmentSaga {
  private readonly logger = new Logger(OrderFulfillmentSaga.name);

  @Saga()
  onConfirmed = (events$: Observable<unknown>): Observable<unknown> => {
    return events$.pipe(
      ofType(OrderStatusChangedEvent),
      map((e: OrderStatusChangedEvent) => {
        if (e.payload.toStatus !== 'confirmed') {
          return null;
        }
        this.logger.log(`Fulfillment starting for order ${e.payload.orderId}`);
        return new NotifyVendorCommand(
          'vendor',
          e.payload.orderId,
          'fulfillment_started',
          {},
        );
      }),
    );
  };
}
