import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { CartAbandonedEvent } from '../../domain/events/abandoned-cart.events';
import { SendAbandonedEmailCommand } from './commands/send-abandoned-email.command';
import { SendAbandonedSmsCommand } from './commands/send-abandoned-sms.command';
import { SendAbandonedPushCommand } from './commands/send-abandoned-push.command';

@Injectable()
export class CartAbandonmentSaga extends BaseSaga {
  readonly name = 'CartAbandonmentSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  email = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartAbandonedEvent),
      map((e: CartAbandonedEvent) =>
        new SendAbandonedEmailCommand(e.payload.userId ?? '', e.payload.cartId),
      ),
    );
  };

  @Saga()
  sms = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartAbandonedEvent),
      map((e: CartAbandonedEvent) =>
        new SendAbandonedSmsCommand(e.payload.userId ?? '', e.payload.cartId),
      ),
    );
  };

  @Saga()
  push = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CartAbandonedEvent),
      map((e: CartAbandonedEvent) =>
        new SendAbandonedPushCommand(e.payload.userId ?? '', e.payload.cartId),
      ),
    );
  };
}
