import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { MetricRecordedEvent } from '../../domain/events/metric.events';
import { NotifyAnomalyDetectedCommand } from './commands/notify-anomaly-detected.command';

@Injectable()
export class AnomalyDetectionSaga extends BaseSaga {
  readonly name = 'AnomalyDetectionSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  notifyOnAnomaly = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MetricRecordedEvent),
      map(
        (event: MetricRecordedEvent) =>
          new NotifyAnomalyDetectedCommand(
            event.payload.metricId,
            event.payload.value,
          ),
      ),
    );
  };
}
