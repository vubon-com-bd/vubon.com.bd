import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { EmbeddingGeneratedEvent } from '../../domain/events/embedding.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class EmbeddingIndexingSaga extends BaseSaga {
  readonly name = 'EmbeddingIndexingSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(EmbeddingGeneratedEvent),
      map((event: EmbeddingGeneratedEvent) => {
        return new UpdateAnalyticsCommand('embedding.generated', event.payload.embeddingId);
      }),
    );
  };
}
