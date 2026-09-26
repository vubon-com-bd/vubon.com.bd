import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { VectorIndexRebuiltEvent } from '../../domain/events/vector.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class VectorIndexRebuildSaga extends BaseSaga {
  readonly name = 'VectorIndexRebuildSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VectorIndexRebuiltEvent),
      map((event: VectorIndexRebuiltEvent) => {
        return new UpdateAnalyticsCommand('vector.index.rebuilt', event.payload.indexId);
      }),
    );
  };
}
