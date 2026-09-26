import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { TrainingStartedEvent } from '../../domain/events/training.events';
import { TrainingCompletedEvent } from '../../domain/events/training.events';
import { NotifyTrainingStartedCommand } from './commands/notify-training-started.command';
import { NotifyTrainingCompletedCommand } from './commands/notify-training-completed.command';

@Injectable()
export class ModelTrainingSaga extends BaseSaga {
  readonly name = 'ModelTrainingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  started = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TrainingStartedEvent),
      map((event: TrainingStartedEvent) => {
        return new NotifyTrainingStartedCommand(
          event.payload.trainingId,
          event.payload.modelId,
        );
      }),
    );
  };

  @Saga()
  completed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TrainingCompletedEvent),
      map((event: TrainingCompletedEvent) => {
        return new NotifyTrainingCompletedCommand(
          event.payload.trainingId,
          event.payload.modelId,
        );
      }),
    );
  };
}
