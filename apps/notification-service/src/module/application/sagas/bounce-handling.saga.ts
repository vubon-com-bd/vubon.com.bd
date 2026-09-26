import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { NotificationBouncedEvent } from '../../domain/events/notification-failed.events';
import { UnsubscribeCommand } from '../commands/preference/unsubscribe.command';

@Injectable()
export class BounceHandlingSaga extends BaseSaga {
  readonly name = 'BounceHandlingSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  handleBounce = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationBouncedEvent),
      map(() => new UnsubscribeCommand('', 'email', 'bounce')),
    ) as Observable<ICommand>;
  };
}
