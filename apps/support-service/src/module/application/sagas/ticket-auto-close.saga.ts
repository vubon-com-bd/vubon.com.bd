import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { TicketResolvedEvent } from '../../domain/events/ticket.events';
import { AutoCloseInactiveTicketCommand } from './commands/auto-close-inactive-ticket.command';
import { SendSatisfactionSurveyCommand } from './commands/send-satisfaction-survey.command';

@Injectable()
export class TicketAutoCloseSaga extends BaseSaga {
  readonly name = 'TicketAutoCloseSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  autoClose = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TicketResolvedEvent),
      map((event: TicketResolvedEvent) => {
        return new AutoCloseInactiveTicketCommand(event.payload.ticketId);
      }),
    );
  };

  @Saga()
  survey = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TicketResolvedEvent),
      map((event: TicketResolvedEvent) => {
        return new SendSatisfactionSurveyCommand(
          event.payload.ticketId,
          event.payload.userId,
        );
      }),
    );
  };
}
