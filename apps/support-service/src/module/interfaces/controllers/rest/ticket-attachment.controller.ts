import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';

@ApiTags('Ticket Attachments')
@Controller('tickets/:ticketId/attachments')
@UseGuards(JwtAuthGuard)
export class TicketAttachmentController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async list(@Param('ticketId') ticketId: string): Promise<unknown> {
    return { ticketId, attachments: [] };
    void this.queryBus;
  }
}
