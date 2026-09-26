import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { CartRecoveredEvent } from '../../domain/events/abandoned-cart.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';
import { ClearCacheCommand } from './commands/clear-cache.command';

@Injectable()
export class CartRecoverySaga extends BaseSaga {
  readonly name = 'CartRecoverySaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartRecoveredEvent),
      map((e: CartRecoveredEvent) => new UpdateAnalyticsCommand(e.payload.cartId)),
    );
  };

  @Saga()
  cache = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartRecoveredEvent),
      map((e: CartRecoveredEvent) => new ClearCacheCommand(e.payload.cartId)),
    );
  };
}
