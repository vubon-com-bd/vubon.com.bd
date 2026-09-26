import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { InsightGeneratedEvent } from '../../domain/events/insight.events';
import { NotifyAnomalyDetectedCommand } from './commands/notify-anomaly-detected.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class InsightGenerationSaga extends BaseSaga {
  readonly name = 'InsightGenerationSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  notify = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InsightGeneratedEvent),
      map((event: InsightGeneratedEvent) => {
        return new NotifyAnomalyDetectedCommand(event.payload.insightId);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InsightGeneratedEvent),
      map((event: InsightGeneratedEvent) => {
        return new UpdateAnalyticsCommand('insight.generated', event.payload.insightId);
      }),
    );
  };
}
