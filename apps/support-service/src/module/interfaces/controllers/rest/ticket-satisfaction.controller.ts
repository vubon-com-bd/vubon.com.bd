import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { RateTicketCommand } from '../../../application/commands/ticket/rate-ticket.command';
import { RateTicketRequestDto } from '../../dtos/requests/ticket.request.dto';

@ApiTags('Ticket Satisfaction')
@Controller('tickets/:ticketId/satisfaction')
@UseGuards(JwtAuthGuard)
export class TicketSatisfactionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async get(@Param('ticketId') ticketId: string): Promise<unknown> {
    return { ticketId, satisfaction: null };
  }

  @Post()
  async rate(
    @Param('ticketId') ticketId: string,
    @Body() body: RateTicketRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RateTicketCommand(ticketId, body.score, body.comment),
    );
  }
}
