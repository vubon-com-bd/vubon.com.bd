/**
 * StockSyncSaga — reacts to item unavailability
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand, CommandBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ItemUnavailableEvent } from '../../domain/events/cart-item.events.js';
import { NotifyStockOutCommand } from './commands/notify-stock-out.command.js';
import { ClearCacheCommand } from './commands/clear-cache.command.js';

@Injectable()
export class StockSyncSaga {
  private readonly logger = new Logger(StockSyncSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onUnavailable = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ItemUnavailableEvent),
      tap((e: ItemUnavailableEvent) => {
        this.logger.log(
          `Item unavailable: ${e.payload.itemId} (product ${e.payload.productId})`,
        );
      }),
      map((e: ItemUnavailableEvent) => {
        void this.commandBus.execute(
          new NotifyStockOutCommand(
            e.payload.cartId,
            e.payload.itemId,
            e.payload.productId,
          ),
        );
        return new ClearCacheCommand(e.payload.cartId);
      }),
    );
  };
}
