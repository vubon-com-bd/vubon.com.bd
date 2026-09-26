import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ReportGeneratedEvent } from '../../domain/events/report.events';
import { UpdateCacheCommand } from './commands/update-cache.command';

@Injectable()
export class ReportSchedulingSaga extends BaseSaga {
  readonly name = 'ReportSchedulingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  invalidateCacheOnGenerate = (
    events$: Observable<unknown>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReportGeneratedEvent),
      map(
        (event: ReportGeneratedEvent) =>
          new UpdateCacheCommand('report', event.payload.reportId),
      ),
    );
  };
}
