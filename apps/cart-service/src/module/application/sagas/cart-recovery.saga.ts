/**
 * CartRecoverySaga — orchestrates recovery side effects
 * @module cart-service/application/sagas
 *
 * Flow:
 *   AbandonedCartRecoveredEvent → UpdateAnalytics + ClearCache + SendNotification
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  AbandonedCartRecoveredEvent,
  AbandonedCartReminderSentEvent,
} from '../../domain/events/abandoned-cart.events.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { ClearCacheCommand } from './commands/clear-cache.command.js';
import { SendAbandonedEmailCommand } from './commands/send-abandoned-email.command.js';

@Injectable()
export class CartRecoverySaga {
  private readonly logger = new Logger(CartRecoverySaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onRecovered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AbandonedCartRecoveredEvent),
      tap((e: AbandonedCartRecoveredEvent) => {
        this.logger.log(`Abandoned cart recovered: ${e.payload.abandonedCartId}`);
      }),
      map((e: AbandonedCartRecoveredEvent) => {
        const p = e.payload;

        void this.commandBus.execute(
          new UpdateAnalyticsCommand(p.abandonedCartId, 'cart.recovered', {
            orderId: p.orderId,
            recoveredValue: p.recoveredValue,
            recoveredAt: p.recoveredAt,
          }),
        );

        void this.commandBus.execute(
          new ClearCacheCommand([`abandoned:${p.abandonedCartId}`]),
        );

        return new SendAbandonedEmailCommand(
          'system',
          p.abandonedCartId,
          p.abandonedCartId,
          0,
          p.recoveredValue,
          'BDT',
          'cart-recovered',
        );
      }),
    );
  };

  @Saga()
  onReminderSent = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AbandonedCartReminderSentEvent),
      map((e: AbandonedCartReminderSentEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.abandonedCartId, 'cart.reminder_sent', {
            channel: e.payload.channel,
            remindersSent: e.payload.remindersSent,
          }),
        );
        return new ClearCacheCommand([`abandoned:${e.payload.abandonedCartId}`]);
      }),
    );
  };
}
