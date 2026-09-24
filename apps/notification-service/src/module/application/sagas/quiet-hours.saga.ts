import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { NotificationCreatedEvent } from '../../domain/events/notification.events';
import { SendNotificationCommand } from '../commands/notification/send-notification.command';

@Injectable()
export class QuietHoursSaga extends BaseSaga {
  readonly name = 'QuietHoursSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  defer = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationCreatedEvent),
      map((event) =>
        new SendNotificationCommand(
          event.payload.userId,
          'system',
          'in_app',
          'system',
          '',
          '',
        ),
      ),
    ) as Observable<ICommand>;
  };
}
