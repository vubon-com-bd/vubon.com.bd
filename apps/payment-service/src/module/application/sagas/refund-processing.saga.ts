import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { RefundProcessedEvent } from '../../domain/events/refund.events';
import { NotifyRefundProcessedCommand } from './commands/notify-refund-processed.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class RefundProcessingSaga extends BaseSaga {
  readonly name = 'RefundProcessingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven saga
  }

  async compensate(): Promise<void> {
    // no compensation required
  }

  @Saga()
  onProcessed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundProcessedEvent),
      map((event: RefundProcessedEvent) => {
        return new NotifyRefundProcessedCommand(event.payload.refundId);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RefundProcessedEvent),
      map((event: RefundProcessedEvent) => {
        return new UpdateAnalyticsCommand('refund.processed', event.payload.refundId);
      }),
    );
  };
}
