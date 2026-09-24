import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TicketAttachmentController } from '../../interfaces/controllers/rest/ticket-attachment.controller';
import { TicketAttachmentService } from '../../application/services/impl/ticket-attachment.service';

@Module({
  imports: [CqrsModule],
  controllers: [TicketAttachmentController],
  providers: [TicketAttachmentService],
  exports: [TicketAttachmentService],
})
export class TicketAttachmentModule {}
