/**
 * StockAlertSaga — reacts to low/out-of-stock inventory events
 * @module product-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  LowStockAlertEvent,
  OutOfStockAlertEvent,
} from '../../domain/events/inventory.events.js';

@Injectable()
export class StockAlertSaga {
  private readonly logger = new Logger(StockAlertSaga.name);

  @Saga()
  onLowStock = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LowStockAlertEvent),
      tap((e: LowStockAlertEvent) => {
        this.logger.warn(
          `LOW STOCK: product=${e.payload.productId} current=${e.payload.currentStock} threshold=${e.payload.threshold}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onOutOfStock = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OutOfStockAlertEvent),
      tap((e: OutOfStockAlertEvent) => {
        this.logger.error(
          `OUT OF STOCK: product=${e.payload.productId} last=${e.payload.lastQuantity}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
