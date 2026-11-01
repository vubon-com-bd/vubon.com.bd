/**
 * ProductReviewSaga — orchestrates post-review side effects
 * @module product-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  ReviewSubmittedEvent,
  ReviewApprovedEvent,
  ReviewRejectedEvent,
} from '../../domain/events/product-review.events.js';

import { NotifyReviewCommand } from './commands/notify-review.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class ProductReviewSaga {
  private readonly logger = new Logger(ProductReviewSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onSubmitted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviewSubmittedEvent),
      tap((e: ReviewSubmittedEvent) => {
        this.logger.log(`Saga: review submitted → ${e.payload.reviewId}`);
      }),
      map((e: ReviewSubmittedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'review.submitted', {
            reviewId: e.payload.reviewId,
            rating: e.payload.rating,
          }),
        );
        // Notify moderators — via system template
        return new NotifyReviewCommand(
          e.payload.userId,
          e.payload.productId,
          e.payload.reviewId,
          'review_replied',
          { status: 'pending' },
        );
      }),
    );
  };

  @Saga()
  onApproved = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviewApprovedEvent),
      map((e: ReviewApprovedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'review.approved', {
            reviewId: e.payload.reviewId,
          }),
        );
        return new NotifyReviewCommand(
          'system',
          e.payload.productId,
          e.payload.reviewId,
          'review_approved',
          { approvedBy: e.payload.approvedBy },
        );
      }),
    );
  };

  @Saga()
  onRejected = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviewRejectedEvent),
      map((e: ReviewRejectedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.productId, 'review.rejected', {
            reviewId: e.payload.reviewId,
            reason: e.payload.reason,
          }),
        );
        return new NotifyReviewCommand(
          'system',
          e.payload.productId,
          e.payload.reviewId,
          'review_rejected',
          { reason: e.payload.reason },
        );
      }),
    );
  };
}
