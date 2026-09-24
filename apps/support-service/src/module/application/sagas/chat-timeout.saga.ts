import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ChatStartedEvent } from '../../domain/events/live-chat.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class ChatTimeoutSaga extends BaseSaga {
  readonly name = 'ChatTimeoutSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  track = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ChatStartedEvent),
      map((event: ChatStartedEvent) => {
        return new UpdateAnalyticsCommand('chat.started', event.payload.chatId);
      }),
    );
  };
}
