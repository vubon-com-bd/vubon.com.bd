import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ChatbotController } from '../../interfaces/controllers/rest/chatbot.controller';
import { SendChatbotMessageHandler } from '../../application/commands/chatbot/send-chatbot-message.handler';
import { TrainIntentHandler } from '../../application/commands/chatbot/train-intent.handler';
import { TrainEntityHandler } from '../../application/commands/chatbot/train-entity.handler';
import { GetChatbotHandler } from '../../application/queries/chatbot/get-chatbot.handler';
import { ListChatbotsHandler } from '../../application/queries/chatbot/list-chatbots.handler';
import { ListChatbotIntentsHandler } from '../../application/queries/chatbot/list-chatbot-intents.handler';
import { ChatbotService } from '../../application/services/impl/chatbot.service';
import { ChatbotIntentService } from '../../application/services/impl/chatbot-intent.service';
import { ChatbotEntityService } from '../../application/services/impl/chatbot-entity.service';

const HANDLERS = [
  SendChatbotMessageHandler,
  TrainIntentHandler,
  TrainEntityHandler,
  GetChatbotHandler,
  ListChatbotsHandler,
  ListChatbotIntentsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ChatbotController],
  providers: [
    ...HANDLERS,
    ChatbotService,
    ChatbotIntentService,
    ChatbotEntityService,
  ],
  exports: [ChatbotService, ChatbotIntentService, ChatbotEntityService],
})
export class ChatbotModule {}
