/**
 * ConversationModule
 * @module support-service/modules/conversation
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConversationService } from '../../application/services/impl/conversation.service';
import { ConversationMapper } from '../../application/mappers/conversation.mapper';
import { StartConversationHandler } from '../../application/commands/conversation/start-conversation.handler';
import { EndConversationHandler } from '../../application/commands/conversation/end-conversation.handler';
import { UpdateConversationHandler } from '../../application/commands/conversation/update-conversation.handler';
import { GetConversationHandler } from '../../application/queries/conversation/get-conversation.handler';
import { ListConversationsHandler } from '../../application/queries/conversation/list-conversations.handler';
import { ConversationController } from '../../interfaces/controllers/rest/conversation.controller';
import { ConversationControllerMapper } from '../../interfaces/mappers/conversation.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [ConversationController],
  providers: [
    ConversationService,
    ConversationMapper,
    ConversationControllerMapper,
    StartConversationHandler,
    EndConversationHandler,
    UpdateConversationHandler,
    GetConversationHandler,
    ListConversationsHandler,
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
