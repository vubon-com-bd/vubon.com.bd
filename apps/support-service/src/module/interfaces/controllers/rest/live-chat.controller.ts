import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { StartChatCommand } from '../../../application/commands/live-chat/start-chat.command';
import { SendChatMessageCommand } from '../../../application/commands/live-chat/send-chat-message.command';
import { TransferChatCommand } from '../../../application/commands/live-chat/transfer-chat.command';
import { EndChatCommand } from '../../../application/commands/live-chat/end-chat.command';
import { GetChatQuery } from '../../../application/queries/live-chat/get-chat.query';
import { ListActiveChatsQuery } from '../../../application/queries/live-chat/list-active-chats.query';
import {
  StartChatRequestDto,
  SendChatMessageRequestDto,
} from '../../dtos/requests/chat.request.dto';
import { ChatSwagger } from '../../swagger/chat.swagger';

@ApiTags('Live Chat')
@Controller('live-chats')
@UseGuards(JwtAuthGuard)
export class LiveChatController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('active')
  async listActive(): Promise<unknown> {
    return this.queryBus.execute(new ListActiveChatsQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetChatQuery(id));
  }

  @Post()
  @ChatSwagger.Start()
  async start(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: StartChatRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new StartChatCommand(user.userId, body.type, body.initialMessage),
    );
  }

  @Post(':id/messages')
  async sendMessage(
    @Param('id') id: string,
    @Body() body: SendChatMessageRequestDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new SendChatMessageCommand(id, body.content, body.type),
    );
  }

  @Post(':id/transfer')
  @HttpCode(HttpStatus.NO_CONTENT)
  async transfer(
    @Param('id') id: string,
    @Body() body: { agentId: string; reason?: string },
  ): Promise<void> {
    return this.commandBus.execute(
      new TransferChatCommand(id, body.agentId, body.reason),
    );
  }

  @Post(':id/end')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ChatSwagger.End()
  async end(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new EndChatCommand(id));
  }
}
