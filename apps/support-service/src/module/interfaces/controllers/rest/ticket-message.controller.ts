import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { SendMessageCommand } from '../../../application/commands/message/send-message.command';
import { ListMessagesByTicketQuery } from '../../../application/queries/message/list-messages-by-ticket.query';
import { SendMessageRequestDto } from '../../dtos/requests/message.request.dto';
import { MessageSwagger } from '../../swagger/message.swagger';

@ApiTags('Ticket Messages')
@Controller('tickets/:ticketId/messages')
@UseGuards(JwtAuthGuard)
export class TicketMessageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @MessageSwagger.List()
  async list(@Param('ticketId') ticketId: string): Promise<unknown> {
    return this.queryBus.execute(new ListMessagesByTicketQuery(ticketId));
  }

  @Post()
  @MessageSwagger.Send()
  async send(
    @Param('ticketId') ticketId: string,
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SendMessageRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SendMessageCommand(
        ticketId,
        user.userId,
        body.content,
        body.type ?? 'text',
        body.isInternal ?? false,
      ),
    );
  }
}
