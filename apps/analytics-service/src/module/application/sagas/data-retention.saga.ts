import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { EventReceivedEvent } from '../../domain/events/event.events';
import { CleanupExpiredDataCommand } from './commands/cleanup-expired-data.command';

const RETENTION_DAYS = 365;

@Injectable()
export class DataRetentionSaga extends BaseSaga {
  readonly name = 'DataRetentionSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  cleanupOldData = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(EventReceivedEvent),
      map(
        (_event: EventReceivedEvent) =>
          new CleanupExpiredDataCommand(RETENTION_DAYS),
      ),
    );
  };
}
