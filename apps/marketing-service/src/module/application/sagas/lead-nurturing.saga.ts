import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { LeadCreatedEvent } from '../../domain/events/lead.events';
import { SendWelcomeEmailCommand } from './commands/send-welcome-email.command';

@Injectable()
export class LeadNurturingSaga extends BaseSaga {
  readonly name = 'LeadNurturingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  leadCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LeadCreatedEvent),
      map((event: LeadCreatedEvent) => {
        return new SendWelcomeEmailCommand(event.payload.leadId);
      }),
    );
  };
}
