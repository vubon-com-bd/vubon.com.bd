import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrainEntityHandler } from '../../application/commands/chatbot/train-entity.handler';
import { ChatbotEntityService } from '../../application/services/impl/chatbot-entity.service';

@Module({
  imports: [CqrsModule],
  providers: [TrainEntityHandler, ChatbotEntityService],
  exports: [ChatbotEntityService],
})
export class ChatbotEntityModule {}
