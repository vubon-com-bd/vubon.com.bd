import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { EventProcessedEvent } from '../../domain/events/event.events';
import { AggregateMetricsCommand } from './commands/aggregate-metrics.command';

@Injectable()
export class MetricAggregationSaga extends BaseSaga {
  readonly name = 'MetricAggregationSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  aggregateAfterProcess = (
    events$: Observable<unknown>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(EventProcessedEvent),
      map(
        (event: EventProcessedEvent) =>
          new AggregateMetricsCommand(event.payload.eventId),
      ),
    );
  };
}
