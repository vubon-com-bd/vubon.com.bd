import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ReportScheduledEvent } from '../../domain/events/report.events';
import { SendScheduledReportCommand } from './commands/send-scheduled-report.command';

@Injectable()
export class ReportGenerationSaga extends BaseSaga {
  readonly name = 'ReportGenerationSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  sendScheduledReport = (
    events$: Observable<unknown>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReportScheduledEvent),
      map(
        (event: ReportScheduledEvent) =>
          new SendScheduledReportCommand(
            event.payload.reportId,
            event.payload.nextRunAt,
          ),
      ),
    );
  };
}
