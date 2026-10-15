/**
 * CartAbandonmentSaga — orchestrates abandonment side effects
 * @module cart-service/application/sagas
 *
 * Flow:
 *   CartAbandonedEvent → UpdateAnalytics + ClearCache + SendEmail (if user has email)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CartAbandonedEvent } from '../../domain/events/cart.events.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { ClearCacheCommand } from './commands/clear-cache.command.js';
import { SendAbandonedEmailCommand } from './commands/send-abandoned-email.command.js';

@Injectable()
export class CartAbandonmentSaga {
  private readonly logger = new Logger(CartAbandonmentSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onAbandoned = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartAbandonedEvent),
      tap((e: CartAbandonedEvent) => {
        this.logger.log(`Cart abandoned: ${e.payload.cartId}`);
      }),
      map((e: CartAbandonedEvent) => {
        const p = e.payload;

        void this.commandBus.execute(
          new UpdateAnalyticsCommand(p.cartId, 'cart.abandoned', {
            itemCount: p.itemCount,
            abandonedAt: p.abandonedAt,
          }),
        );

        void this.commandBus.execute(
          new ClearCacheCommand([`cart:${p.cartId}`, `user-cart:${p.cartId}`]),
        );

        return new SendAbandonedEmailCommand(
          'system',
          p.cartId,
          p.cartId,
          p.itemCount,
          0,
          'BDT',
          'cart-abandoned',
        );
      }),
    );
  };
}
