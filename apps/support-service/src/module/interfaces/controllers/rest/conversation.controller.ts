import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { StartConversationCommand } from '../../../application/commands/conversation/start-conversation.command';
import { EndConversationCommand } from '../../../application/commands/conversation/end-conversation.command';
import { GetConversationQuery } from '../../../application/queries/conversation/get-conversation.query';
import { ListConversationsByUserQuery } from '../../../application/queries/conversation/list-conversations-by-user.query';
import { ListActiveConversationsQuery } from '../../../application/queries/conversation/list-active-conversations.query';
import { StartChatRequestDto } from '../../dtos/requests/chat.request.dto';

@ApiTags('Conversations')
@Controller('conversations')
@UseGuards(JwtAuthGuard)
export class ConversationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(
    @CurrentUser() user: CurrentUserShape,
    @Query('scope') scope?: string,
  ): Promise<unknown> {
    if (scope === 'active') {
      return this.queryBus.execute(new ListActiveConversationsQuery());
    }
    return this.queryBus.execute(new ListConversationsByUserQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetConversationQuery(id));
  }

  @Post()
  async start(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: StartChatRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new StartConversationCommand(user.userId, body.type ?? 'support', body.initialMessage),
    );
  }

  @Post(':id/end')
  @HttpCode(HttpStatus.NO_CONTENT)
  async end(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new EndConversationCommand(id));
  }
}
