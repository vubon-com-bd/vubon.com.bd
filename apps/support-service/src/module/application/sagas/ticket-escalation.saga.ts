import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { TicketCreatedEvent } from '../../domain/events/ticket.events';
import { NotifyTicketCreatedCommand } from './commands/notify-ticket-created.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class TicketEscalationSaga extends BaseSaga {
  readonly name = 'TicketEscalationSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  notify = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TicketCreatedEvent),
      map((event: TicketCreatedEvent) => {
        return new NotifyTicketCreatedCommand(
          event.payload.ticketId,
          event.payload.userId,
        );
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TicketCreatedEvent),
      map((event: TicketCreatedEvent) => {
        return new UpdateAnalyticsCommand('ticket.created', event.payload.ticketId);
      }),
    );
  };
}
