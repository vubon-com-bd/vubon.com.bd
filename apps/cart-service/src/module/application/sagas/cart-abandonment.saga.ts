/**
 * CartAbandonmentSaga — reacts to cart abandonment detection
 * @module cart-service/application/sagas
 *
 * Flow:
 *   AbandonedCartDetectedEvent
 *     → SendAbandonedEmailCommand (via CommandBus)
 *     → SendAbandonedSmsCommand
 *     → SendAbandonedPushCommand
 *     → UpdateAnalyticsCommand
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand, CommandBus } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { AbandonedCartDetectedEvent } from '../../domain/events/abandoned-cart.events.js';
import { SendAbandonedEmailCommand } from './commands/send-abandoned-email.command.js';
import { SendAbandonedPushCommand } from './commands/send-abandoned-push.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class CartAbandonmentSaga {
  private readonly logger = new Logger(CartAbandonmentSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onAbandoned = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AbandonedCartDetectedEvent),
      tap((e: AbandonedCartDetectedEvent) => {
        this.logger.log(
          `Cart abandoned: ${e.payload.cartId} (items=${e.payload.itemCount}, value=${e.payload.cartValue})`,
        );
      }),
      filter(
        (e: AbandonedCartDetectedEvent) => e.payload.itemCount > 0,
      ),
      map((e: AbandonedCartDetectedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(
            e.payload.cartId,
            'cart.abandoned',
            { itemCount: e.payload.itemCount, cartValue: e.payload.cartValue },
          ),
        );
        void this.commandBus.execute(
          new SendAbandonedEmailCommand(
            e.payload.abandonedCartId,
            e.payload.userId,
            undefined,
            1,
          ),
        );
        return new SendAbandonedPushCommand(
          e.payload.abandonedCartId,
          e.payload.userId,
          1,
        );
      }),
    );
  };
}
