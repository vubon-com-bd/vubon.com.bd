/**
 * PriceSyncSaga — reacts to cart price changes
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand, CommandBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CartPriceChangedEvent } from '../../domain/events/cart.events.js';
import { NotifyPriceChangeCommand } from './commands/notify-price-change.command.js';
import { ClearCacheCommand } from './commands/clear-cache.command.js';

@Injectable()
export class PriceSyncSaga {
  private readonly logger = new Logger(PriceSyncSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onPriceChanged = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartPriceChangedEvent),
      tap((e: CartPriceChangedEvent) => {
        this.logger.log(
          `Cart ${e.payload.cartId} price changed: ${e.payload.oldTotal} → ${e.payload.newTotal}`,
        );
      }),
      map((e: CartPriceChangedEvent) => {
        void this.commandBus.execute(
          new NotifyPriceChangeCommand(
            e.payload.cartId,
            '',
            e.payload.oldTotal,
            e.payload.newTotal,
            e.payload.currency,
          ),
        );
        return new ClearCacheCommand(e.payload.cartId);
      }),
    );
  };
}
