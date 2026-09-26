/**
 * ConversationController — HTTP adapter
 * @module support-service/interfaces/controllers/rest
 */
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, CurrentUser } from '@vubon/shared-kernel/interfaces';

import { StartConversationCommand } from '../../../application/commands/conversation/start-conversation.command';
import { EndConversationCommand } from '../../../application/commands/conversation/end-conversation.command';
import { GetConversationQuery } from '../../../application/queries/conversation/get-conversation.query';
import { ListConversationsQuery } from '../../../application/queries/conversation/list-conversations.query';

import { StartConversationRequestDTO } from '../../dtos/requests/conversation/start-conversation.dto';
import { EndConversationRequestDTO } from '../../dtos/requests/conversation/end-conversation.dto';
import { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';
import { ConversationControllerMapper } from '../../mappers/conversation.controller.mapper';

@ApiTags('Conversations')
@ApiBearerAuth()
@Controller({ path: 'conversations', version: '1' })
export class ConversationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: ConversationControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async start(
    @Body() body: StartConversationRequestDTO,
  ): Promise<ConversationResponseDTO> {
    const result = await this.commandBus.execute(
      new StartConversationCommand({
        title: body.title,
        type: body.type as never,
        participantIds: body.participantIds,
        ticketId: body.ticketId,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ConversationResponseDTO> {
    const result = await this.queryBus.execute(new GetConversationQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @CurrentUser('userId') userId: string,
  ): Promise<readonly ConversationResponseDTO[]> {
    const result = await this.queryBus.execute(
      new ListConversationsQuery(userId, 1, 20),
    );
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Post(':id/end')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async end(
    @Param('id') id: string,
    @Body() body: EndConversationRequestDTO,
  ): Promise<ConversationResponseDTO> {
    const result = await this.commandBus.execute(
      new EndConversationCommand({ conversationId: id, reason: body.reason }),
    );
    return this.mapper.toResponse(result);
  }
}
