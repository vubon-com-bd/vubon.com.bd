import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { CartPriceChangedEvent } from '../../domain/events/cart-tax.events';
import { NotifyPriceChangeCommand } from './commands/notify-price-change.command';
import { ClearCacheCommand } from './commands/clear-cache.command';

@Injectable()
export class PriceSyncSaga extends BaseSaga {
  readonly name = 'PriceSyncSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  notify = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartPriceChangedEvent),
      map((e: CartPriceChangedEvent) => new NotifyPriceChangeCommand(e.payload.cartId, '')),
    );
  };

  @Saga()
  cache = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartPriceChangedEvent),
      map((e: CartPriceChangedEvent) => new ClearCacheCommand(e.payload.cartId)),
    );
  };
}
