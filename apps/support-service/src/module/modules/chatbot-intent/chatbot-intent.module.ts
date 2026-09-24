import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrainIntentHandler } from '../../application/commands/chatbot/train-intent.handler';
import { ChatbotIntentService } from '../../application/services/impl/chatbot-intent.service';

@Module({
  imports: [CqrsModule],
  providers: [TrainIntentHandler, ChatbotIntentService],
  exports: [ChatbotIntentService],
})
export class ChatbotIntentModule {}
