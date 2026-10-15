/**
 * StockSyncSaga — reacts to external stock change events
 * @module cart-service/application/sagas
 *
 * Flow:
 *   External ProductStockChangedEvent → NotifyStockOut + UpdateAnalytics + ClearCache
 */
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NotifyStockOutCommand } from './commands/notify-stock-out.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { ClearCacheCommand } from './commands/clear-cache.command.js';

export interface ExternalProductStockChangedEvent {
  readonly type: 'product.stock.changed';
  readonly payload: {
    readonly cartId: string;
    readonly items: readonly {
      readonly itemId: string;
      readonly productId: string;
      readonly variantId?: string;
      readonly requested: number;
      readonly available: number;
    }[];
  };
}

@Injectable()
export class StockSyncSaga {
  private readonly logger = new Logger(StockSyncSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onStockChanged = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotifyStockOutCommand),
      tap((e: NotifyStockOutCommand) => {
        this.logger.log(
          `Stock-out detected for cart ${e.cartId} — ${e.items.length} item(s)`,
        );
      }),
      map((e: NotifyStockOutCommand) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.cartId, 'cart.stock_out', {
            itemCount: e.items.length,
          }),
        );
        void this.commandBus.execute(new ClearCacheCommand([`cart:${e.cartId}`]));
        return e;
      }),
    );
  };
}
