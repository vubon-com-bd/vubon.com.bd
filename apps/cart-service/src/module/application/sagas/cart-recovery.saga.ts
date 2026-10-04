/**
 * CartRecoverySaga — reacts to recovered abandoned carts
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand, CommandBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AbandonedCartRecoveredEvent } from '../../domain/events/abandoned-cart.events.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { ClearCacheCommand } from './commands/clear-cache.command.js';

@Injectable()
export class CartRecoverySaga {
  private readonly logger = new Logger(CartRecoverySaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onRecovered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AbandonedCartRecoveredEvent),
      tap((e: AbandonedCartRecoveredEvent) => {
        this.logger.log(
          `Cart recovered: ${e.payload.cartId} → order ${e.payload.orderId}`,
        );
      }),
      map((e: AbandonedCartRecoveredEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.cartId,
            'cart.recovered',
            {
              orderId: e.payload.orderId,
              recoveredValue: e.payload.recoveredValue,
            },
          ),
        );
        return new ClearCacheCommand(e.payload.cartId);
      }),
    );
  };
}
