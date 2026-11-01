/**
 * InventoryAlertSaga — orchestrates inventory alerts
 * @module product-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  InventoryLowStockAlertEvent,
  InventoryOutOfStockEvent,
  InventoryRestockedEvent,
} from '../../domain/events/product-inventory.events.js';

import { SendLowStockAlertCommand } from './commands/send-low-stock-alert.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { UpdateSearchIndexCommand } from './commands/update-search-index.command.js';

@Injectable()
export class InventoryAlertSaga {
  private readonly logger = new Logger(InventoryAlertSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onLowStock = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InventoryLowStockAlertEvent),
      tap((e: InventoryLowStockAlertEvent) => {
        this.logger.warn(`Saga: LOW STOCK → ${e.payload.productId} (${e.payload.currentStock})`);
      }),
      map((e: InventoryLowStockAlertEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'inventory.low_stock', {
            currentStock: e.payload.currentStock,
            threshold: e.payload.threshold,
          }),
        );
        return new SendLowStockAlertCommand(
          e.payload.productId,
          undefined,
          e.payload.currentStock,
          e.payload.threshold,
          ['vendor', 'admin'],
        );
      }),
    );
  };

  @Saga()
  onOutOfStock = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InventoryOutOfStockEvent),
      tap((e: InventoryOutOfStockEvent) => {
        this.logger.warn(`Saga: OUT OF STOCK → ${e.payload.productId}`);
      }),
      map((e: InventoryOutOfStockEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'inventory.out_of_stock', {}),
        );
        void this.commandBus.execute(
          new UpdateSearchIndexCommand(e.payload.productId, 'reindex'),
        );
        return new SendLowStockAlertCommand(
          e.payload.productId,
          undefined,
          0,
          0,
          ['vendor', 'admin'],
        );
      }),
    );
  };

  @Saga()
  onRestocked = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InventoryRestockedEvent),
      tap((e: InventoryRestockedEvent) => {
        this.logger.log(`Saga: restocked → ${e.payload.productId} (+${e.payload.restockedQuantity})`);
      }),
      map((e: InventoryRestockedEvent) =>
        new UpdateAnalyticsCommand(e.payload.productId, 'inventory.restocked', {
          quantity: e.payload.restockedQuantity,
        }),
      ),
    );
  };
}
