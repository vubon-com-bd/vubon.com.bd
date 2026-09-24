import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LiveChatController } from '../../interfaces/controllers/rest/live-chat.controller';
import { StartChatHandler } from '../../application/commands/live-chat/start-chat.handler';
import { SendChatMessageHandler } from '../../application/commands/live-chat/send-chat-message.handler';
import { TransferChatHandler } from '../../application/commands/live-chat/transfer-chat.handler';
import { EndChatHandler } from '../../application/commands/live-chat/end-chat.handler';
import { GetChatHandler } from '../../application/queries/live-chat/get-chat.handler';
import { ListActiveChatsHandler } from '../../application/queries/live-chat/list-active-chats.handler';
import { LiveChatService } from '../../application/services/impl/live-chat.service';

const HANDLERS = [
  StartChatHandler,
  SendChatMessageHandler,
  TransferChatHandler,
  EndChatHandler,
  GetChatHandler,
  ListActiveChatsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [LiveChatController],
  providers: [...HANDLERS, LiveChatService],
  exports: [LiveChatService],
})
export class LiveChatModule {}
