import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ModelDeployedEvent } from '../../domain/events/model.events';
import { NotifyModelDeployedCommand } from './commands/notify-model-deployed.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class ModelDeploymentSaga extends BaseSaga {
  readonly name = 'ModelDeploymentSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  deployed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModelDeployedEvent),
      map((event: ModelDeployedEvent) => {
        return new NotifyModelDeployedCommand(event.payload.modelId);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ModelDeployedEvent),
      map((event: ModelDeployedEvent) => {
        return new UpdateAnalyticsCommand('model.deployed', event.payload.modelId);
      }),
    );
  };
}
