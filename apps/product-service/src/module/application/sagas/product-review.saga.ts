import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ReviewSubmittedEvent } from '../../domain/events/product-review.events';
import { NotifyReviewCommand } from './commands/notify-review.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class ProductReviewSaga extends BaseSaga {
  readonly name = 'ProductReviewSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  notify = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviewSubmittedEvent),
      map(
        (event: ReviewSubmittedEvent) =>
          new NotifyReviewCommand(event.payload.userId, event.payload.reviewId),
      ),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviewSubmittedEvent),
      map(
        (event: ReviewSubmittedEvent) =>
          new UpdateAnalyticsCommand('product.review.submitted', event.payload.productId),
      ),
    );
  };
}
