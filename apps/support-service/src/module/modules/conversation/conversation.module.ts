import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConversationController } from '../../interfaces/controllers/rest/conversation.controller';
import { StartConversationHandler } from '../../application/commands/conversation/start-conversation.handler';
import { EndConversationHandler } from '../../application/commands/conversation/end-conversation.handler';
import { GetConversationHandler } from '../../application/queries/conversation/get-conversation.handler';
import { ListConversationsByUserHandler } from '../../application/queries/conversation/list-conversations-by-user.handler';
import { ListActiveConversationsHandler } from '../../application/queries/conversation/list-active-conversations.handler';
import { ConversationService } from '../../application/services/impl/conversation.service';

const HANDLERS = [
  StartConversationHandler,
  EndConversationHandler,
  GetConversationHandler,
  ListConversationsByUserHandler,
  ListActiveConversationsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ConversationController],
  providers: [...HANDLERS, ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
