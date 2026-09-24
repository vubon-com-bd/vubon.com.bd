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
import { GetMessageQuery } from '../../../application/queries/message/get-message.query';
import { SendMessageRequestDto } from '../../dtos/requests/message.request.dto';
import { MessageSwagger } from '../../swagger/message.swagger';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetMessageQuery(id));
  }

  @Post()
  @MessageSwagger.Send()
  async send(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: SendMessageRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SendMessageCommand(
        body.ticketId,
        user.userId,
        body.content,
        body.type ?? 'text',
        body.isInternal ?? false,
      ),
    );
  }
}
