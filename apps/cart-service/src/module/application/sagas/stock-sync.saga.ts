import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ItemUpdatedEvent } from '../../domain/events/cart-item.events';
import { NotifyStockOutCommand } from './commands/notify-stock-out.command';

@Injectable()
export class StockSyncSaga extends BaseSaga {
  readonly name = 'StockSyncSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  notify = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ItemUpdatedEvent),
      map((e: ItemUpdatedEvent) => new NotifyStockOutCommand(e.payload.cartId, e.payload.itemId)),
    );
  };
}
