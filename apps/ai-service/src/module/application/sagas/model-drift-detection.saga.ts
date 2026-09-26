import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { AnomalyDetectedEvent } from '../../domain/events/insight.events';
import { NotifyDriftDetectedCommand } from './commands/notify-drift-detected.command';
import { TriggerRetrainingCommand } from './commands/trigger-retraining.command';

@Injectable()
export class ModelDriftDetectionSaga extends BaseSaga {
  readonly name = 'ModelDriftDetectionSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  notify = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AnomalyDetectedEvent),
      map((event: AnomalyDetectedEvent) => {
        return new NotifyDriftDetectedCommand(event.payload.target, event.payload.severity);
      }),
    );
  };

  @Saga()
  retrain = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AnomalyDetectedEvent),
      map((event: AnomalyDetectedEvent) => {
        return new TriggerRetrainingCommand(event.payload.target);
      }),
    );
  };
}
