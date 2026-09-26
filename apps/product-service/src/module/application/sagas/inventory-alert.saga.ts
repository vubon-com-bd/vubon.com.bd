import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  InventoryLowEvent,
  OutOfStockEvent,
} from '../../domain/events/product-inventory.events';
import { SendLowStockAlertCommand } from './commands/send-low-stock-alert.command';
import { NotifyVendorCommand } from './commands/notify-vendor.command';

@Injectable()
export class InventoryAlertSaga extends BaseSaga {
  readonly name = 'InventoryAlertSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  lowStock = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InventoryLowEvent),
      map(
        (event: InventoryLowEvent) =>
          new SendLowStockAlertCommand(event.payload.productId, event.payload.remaining),
      ),
    );
  };

  @Saga()
  outOfStock = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OutOfStockEvent),
      map(
        (event: OutOfStockEvent) =>
          new NotifyVendorCommand('unknown', event.payload.productId),
      ),
    );
  };
}
