/**
 * RefundProcessingSaga — reacts to refund lifecycle
 * @module payment-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  RefundRequestedEvent,
  RefundCompletedEvent,
  RefundFailedEvent,
} from '@domain/events/refund.events.js';

import { NotifyRefundProcessedCommand } from './commands/notify-refund-processed.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class RefundProcessingSaga {
  private readonly logger = new Logger(RefundProcessingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onRequested = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundRequestedEvent),
      tap((e: RefundRequestedEvent) => {
        this.logger.log(`[SAGA] Refund requested: ${e.payload.refundId}`);
      }),
      map(
        (e: RefundRequestedEvent) =>
          new UpdateAnalyticsCommand(e.payload.paymentId, 'refund.requested', {
            amount: e.payload.amount,
          }),
      ),
    );
  };

  @Saga()
  onCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundCompletedEvent),
      map(
        (e: RefundCompletedEvent) =>
          new NotifyRefundProcessedCommand(
            e.payload.refundId,
            e.payload.paymentId,
            e.payload.refundedAmount,
            e.payload.currency,
          ),
      ),
    );
  };

  @Saga()
  onFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundFailedEvent),
      map(
        (e: RefundFailedEvent) =>
          new UpdateAnalyticsCommand(e.payload.paymentId, 'refund.failed', {
            reason: e.payload.reason,
          }),
      ),
    );
  };
}
