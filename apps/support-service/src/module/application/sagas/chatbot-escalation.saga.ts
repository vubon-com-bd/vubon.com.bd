import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { ChatbotEscalatedEvent } from '../../domain/events/chatbot.events';
import { NotifyAgentAssignedCommand } from './commands/notify-agent-assigned.command';

@Injectable()
export class ChatbotEscalationSaga extends BaseSaga {
  readonly name = 'ChatbotEscalationSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  escalate = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ChatbotEscalatedEvent),
      map((event: ChatbotEscalatedEvent) => {
        return new NotifyAgentAssignedCommand(event.payload.chatbotId, 'auto');
      }),
    );
  };
}
