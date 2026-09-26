/**
 * ChatbotModule
 * @module support-service/modules/chatbot
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ChatbotService } from '../../application/services/impl/chatbot.service';
import { ChatbotMapper } from '../../application/mappers/chatbot.mapper';
import { SendChatbotMessageHandler } from '../../application/commands/chatbot/send-chatbot-message.handler';
import { TrainIntentHandler } from '../../application/commands/chatbot/train-intent.handler';
import { TrainEntityHandler } from '../../application/commands/chatbot/train-entity.handler';
import { GetChatbotHandler } from '../../application/queries/chatbot/get-chatbot.handler';
import { ListChatbotsHandler } from '../../application/queries/chatbot/list-chatbots.handler';
import { ChatbotController } from '../../interfaces/controllers/rest/chatbot.controller';
import { ChatbotControllerMapper } from '../../interfaces/mappers/chatbot.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [ChatbotController],
  providers: [
    ChatbotService,
    ChatbotMapper,
    ChatbotControllerMapper,
    SendChatbotMessageHandler,
    TrainIntentHandler,
    TrainEntityHandler,
    GetChatbotHandler,
    ListChatbotsHandler,
  ],
  exports: [ChatbotService],
})
export class ChatbotModule {}
