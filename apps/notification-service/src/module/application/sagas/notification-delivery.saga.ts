import { Injectable } from '@nestjs/common';
import { Saga, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { NotificationCreatedEvent } from '../../domain/events/notification.events';

@Injectable()
export class NotificationDeliverySaga extends BaseSaga {
  readonly name = 'NotificationDeliverySaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  onNotificationCreated = (
    events$: Observable<IEvent>,
  ): Observable<NotificationCreatedEvent> => {
    return events$.pipe(ofType(NotificationCreatedEvent));
  };
}
