/**
 * LiveChatModule
 * @module support-service/modules/live-chat
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LiveChatService } from '../../application/services/impl/live-chat.service';
import { LiveChatMapper } from '../../application/mappers/live-chat.mapper';
import { StartChatHandler } from '../../application/commands/live-chat/start-chat.handler';
import { SendChatMessageHandler } from '../../application/commands/live-chat/send-chat-message.handler';
import { TransferChatHandler } from '../../application/commands/live-chat/transfer-chat.handler';
import { EndChatHandler } from '../../application/commands/live-chat/end-chat.handler';
import { GetChatHandler } from '../../application/queries/live-chat/get-chat.handler';
import { ListChatsHandler } from '../../application/queries/live-chat/list-chats.handler';
import { LiveChatController } from '../../interfaces/controllers/rest/live-chat.controller';
import { LiveChatControllerMapper } from '../../interfaces/mappers/live-chat.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [LiveChatController],
  providers: [
    LiveChatService,
    LiveChatMapper,
    LiveChatControllerMapper,
    StartChatHandler,
    SendChatMessageHandler,
    TransferChatHandler,
    EndChatHandler,
    GetChatHandler,
    ListChatsHandler,
  ],
  exports: [LiveChatService],
})
export class LiveChatModule {}
