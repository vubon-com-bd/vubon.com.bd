/**
 * ReviewModerationSaga — auto-flag suspicious reviews
 * @module product-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ReviewReportedEvent } from '../../domain/events/review.events.js';

@Injectable()
export class ReviewModerationSaga {
  private readonly logger = new Logger(ReviewModerationSaga.name);

  @Saga()
  onReported = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReviewReportedEvent),
      tap((e: ReviewReportedEvent) => {
        if (e.payload.reportCount >= 5) {
          this.logger.warn(
            `Review flagged for auto-moderation: reviewId=${e.payload.reviewId} reports=${e.payload.reportCount}`,
          );
        }
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
