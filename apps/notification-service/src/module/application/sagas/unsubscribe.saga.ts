import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { UnsubscribeEvent } from '../../domain/events/preference.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class UnsubscribeSaga extends BaseSaga {
  readonly name = 'UnsubscribeSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UnsubscribeEvent),
      map((event) => new UpdateAnalyticsCommand('unsubscribe', event.payload.userId)),
    ) as Observable<ICommand>;
  };
}
