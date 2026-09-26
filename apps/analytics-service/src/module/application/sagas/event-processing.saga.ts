import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { EventReceivedEvent } from '../../domain/events/event.events';
import { ProcessEventCommand } from '../commands/event/process-event.command';

@Injectable()
export class EventProcessingSaga extends BaseSaga {
  readonly name = 'EventProcessingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation needed
  }

  @Saga()
  processReceived = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(EventReceivedEvent),
      map((event: EventReceivedEvent) =>
        new ProcessEventCommand(event.payload.eventId),
      ),
    );
  };
}
