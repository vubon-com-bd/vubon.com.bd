import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { RecommendationClickedEvent } from '../../domain/events/recommendation.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class RecommendationFeedbackSaga extends BaseSaga {
  readonly name = 'RecommendationFeedbackSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RecommendationClickedEvent),
      map((event: RecommendationClickedEvent) => {
        return new UpdateAnalyticsCommand('recommendation.clicked', event.payload.userId);
      }),
    );
  };
}
