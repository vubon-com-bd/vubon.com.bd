import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { FeedbackSubmittedEvent } from '../../domain/events/feedback.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class FeedbackFollowupSaga extends BaseSaga {
  readonly name = 'FeedbackFollowupSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  track = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FeedbackSubmittedEvent),
      map((event: FeedbackSubmittedEvent) => {
        return new UpdateAnalyticsCommand('feedback.submitted', event.payload.feedbackId);
      }),
    );
  };
}
