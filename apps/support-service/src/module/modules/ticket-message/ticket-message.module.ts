import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TicketMessageController } from '../../interfaces/controllers/rest/ticket-message.controller';
import { SendMessageHandler } from '../../application/commands/message/send-message.handler';
import { MarkMessageReadHandler } from '../../application/commands/message/mark-read.handler';
import { AttachFileHandler } from '../../application/commands/message/attach-file.handler';
import { GetMessageHandler } from '../../application/queries/message/get-message.handler';
import { ListMessagesByTicketHandler } from '../../application/queries/message/list-messages-by-ticket.handler';
import { CountMessagesHandler } from '../../application/queries/message/count-messages.handler';
import { TicketMessageService } from '../../application/services/impl/ticket-message.service';

const HANDLERS = [
  SendMessageHandler,
  MarkMessageReadHandler,
  AttachFileHandler,
  GetMessageHandler,
  ListMessagesByTicketHandler,
  CountMessagesHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [TicketMessageController],
  providers: [...HANDLERS, TicketMessageService],
  exports: [TicketMessageService],
})
export class TicketMessageModule {}
