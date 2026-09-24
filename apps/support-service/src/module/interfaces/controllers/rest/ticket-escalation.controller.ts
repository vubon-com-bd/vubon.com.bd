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
import {
  JwtAuthGuard,
  Permissions,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { EscalateTicketCommand } from '../../../application/commands/ticket/escalate-ticket.command';
import { EscalateTicketRequestDto } from '../../dtos/requests/ticket.request.dto';

type EscalationLevel = 'L1' | 'L2' | 'L3' | 'L4';

@ApiTags('Ticket Escalations')
@Controller('tickets/:ticketId/escalations')
@UseGuards(JwtAuthGuard)
export class TicketEscalationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async list(@Param('ticketId') ticketId: string): Promise<unknown> {
    return { ticketId, escalations: [] };
  }

  @Post()
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async escalate(
    @Param('ticketId') ticketId: string,
    @Body() body: EscalateTicketRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new EscalateTicketCommand(
        ticketId,
        body.reason,
        body.level as EscalationLevel | undefined,
      ),
    );
  }
}
