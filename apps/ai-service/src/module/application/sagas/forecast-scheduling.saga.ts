import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ForecastGeneratedEvent } from '../../domain/events/forecast.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class ForecastSchedulingSaga extends BaseSaga {
  readonly name = 'ForecastSchedulingSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ForecastGeneratedEvent),
      map((event: ForecastGeneratedEvent) => {
        return new UpdateAnalyticsCommand('forecast.generated', event.payload.forecastId);
      }),
    );
  };
}
