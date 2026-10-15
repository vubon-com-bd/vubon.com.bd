/**
 * PriceSyncSaga — reacts to external price change events (from product-service)
 * @module cart-service/application/sagas
 *
 * Flow:
 *   External ProductPriceChangedEvent → NotifyPriceChangeCommand + UpdateAnalytics
 *
 * NOTE: actual cross-service event reception is wired in infrastructure layer.
 */
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NotifyPriceChangeCommand } from './commands/notify-price-change.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

export interface ExternalProductPriceChangedEvent {
  readonly type: 'product.price.changed';
  readonly payload: {
    readonly cartId: string;
    readonly changes: readonly {
      readonly itemId: string;
      readonly productId: string;
      readonly oldPrice: number;
      readonly newPrice: number;
      readonly delta: number;
    }[];
    readonly currency: string;
  };
}

@Injectable()
export class PriceSyncSaga {
  private readonly logger = new Logger(PriceSyncSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onPriceChanged = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotifyPriceChangeCommand),
      tap((e: NotifyPriceChangeCommand) => {
        this.logger.log(
          `Price change detected for cart ${e.cartId} — ${e.changes.length} item(s)`,
        );
      }),
      map((e: NotifyPriceChangeCommand) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.cartId, 'cart.price_changed', {
            changeCount: e.changes.length,
            currency: e.currency,
          }),
        );
        return e;
      }),
    );
  };
}
