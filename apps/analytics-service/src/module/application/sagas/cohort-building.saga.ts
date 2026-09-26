import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { SessionEndedEvent } from '../../domain/events/session.events';
import { UpdateCacheCommand } from './commands/update-cache.command';

@Injectable()
export class CohortBuildingSaga extends BaseSaga {
  readonly name = 'CohortBuildingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  rebuildCacheOnSessionEnd = (
    events$: Observable<unknown>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(SessionEndedEvent),
      map(
        (event: SessionEndedEvent) =>
          new UpdateCacheCommand('cohort', event.payload.sessionId),
      ),
    );
  };
}
