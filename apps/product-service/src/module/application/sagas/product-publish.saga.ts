import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ProductPublishedEvent } from '../../domain/events/product.events';
import { NotifyVendorCommand } from './commands/notify-vendor.command';
import { UpdateSearchIndexCommand } from './commands/update-search-index.command';

@Injectable()
export class ProductPublishSaga extends BaseSaga {
  readonly name = 'ProductPublishSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  searchIndex = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductPublishedEvent),
      map((event: ProductPublishedEvent) => new UpdateSearchIndexCommand(event.payload.productId)),
    );
  };

  @Saga()
  notify = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductPublishedEvent),
      map(
        (event: ProductPublishedEvent) =>
          new NotifyVendorCommand('unknown', event.payload.productId),
      ),
    );
  };
}
