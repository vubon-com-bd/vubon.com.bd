/**
 * TicketMessageModule
 * @module support-service/modules/ticket-message
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MessageService } from '../../application/services/impl/message.service';
import { MessageMapper } from '../../application/mappers/message.mapper';
import { SendMessageHandler } from '../../application/commands/message/send-message.handler';
import { MarkMessageReadHandler } from '../../application/commands/message/mark-read.handler';
import { AttachFileHandler } from '../../application/commands/message/attach-file.handler';
import { GetMessageHandler } from '../../application/queries/message/get-message.handler';
import { ListMessagesHandler } from '../../application/queries/message/list-messages.handler';
import { MessageController } from '../../interfaces/controllers/rest/message.controller';
import { MessageControllerMapper } from '../../interfaces/mappers/message.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageMapper,
    MessageControllerMapper,
    SendMessageHandler,
    MarkMessageReadHandler,
    AttachFileHandler,
    GetMessageHandler,
    ListMessagesHandler,
  ],
  exports: [MessageService],
})
export class TicketMessageModule {}
