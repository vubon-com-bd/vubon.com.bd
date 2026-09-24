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
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { SendChatbotMessageCommand } from '../../../application/commands/chatbot/send-chatbot-message.command';
import { TrainIntentCommand } from '../../../application/commands/chatbot/train-intent.command';
import { TrainEntityCommand } from '../../../application/commands/chatbot/train-entity.command';
import { GetChatbotQuery } from '../../../application/queries/chatbot/get-chatbot.query';
import { ListChatbotsQuery } from '../../../application/queries/chatbot/list-chatbots.query';
import { ListChatbotIntentsQuery } from '../../../application/queries/chatbot/list-chatbot-intents.query';

@ApiTags('Chatbot')
@Controller('chatbots')
@UseGuards(JwtAuthGuard)
export class ChatbotController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListChatbotsQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetChatbotQuery(id));
  }

  @Get(':id/intents')
  async listIntents(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new ListChatbotIntentsQuery(id));
  }

  @Post(':id/messages')
  async sendMessage(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
    @Body() body: { message: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new SendChatbotMessageCommand(id, user.userId, body.message),
    );
  }

  @Post(':id/intents')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async trainIntent(
    @Param('id') id: string,
    @Body() body: { name: string; patterns: string[]; response: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new TrainIntentCommand(id, body.name, body.patterns, body.response),
    );
  }

  @Post(':id/entities')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async trainEntity(
    @Param('id') id: string,
    @Body() body: { name: string; type: string; value: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new TrainEntityCommand(id, body.name, body.type, body.value),
    );
  }
}
