/**
 * ProductPublishSaga — orchestrates publish side effects
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductPublishedEvent } from '../../domain/events/product.events.js';

@Injectable()
export class ProductPublishSaga {
  private readonly logger = new Logger(ProductPublishSaga.name);

  @Saga()
  onPublished = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductPublishedEvent),
      tap((event: ProductPublishedEvent) => {
        this.logger.log(
          `Product published: ${event.payload.productId} at ${event.payload.publishedAt}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
