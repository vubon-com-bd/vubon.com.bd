import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MessageController } from '../../interfaces/controllers/rest/message.controller';
import { SendMessageHandler } from '../../application/commands/message/send-message.handler';
import { GetMessageHandler } from '../../application/queries/message/get-message.handler';
import { MessageService } from '../../application/services/impl/message.service';

@Module({
  imports: [CqrsModule],
  controllers: [MessageController],
  providers: [SendMessageHandler, GetMessageHandler, MessageService],
  exports: [MessageService],
})
export class MessageModule {}
