/**
 * LiveChatController — HTTP adapter
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

import { StartChatCommand } from '../../../application/commands/live-chat/start-chat.command';
import { SendChatMessageCommand } from '../../../application/commands/live-chat/send-chat-message.command';
import { TransferChatCommand } from '../../../application/commands/live-chat/transfer-chat.command';
import { EndChatCommand } from '../../../application/commands/live-chat/end-chat.command';
import { GetChatQuery } from '../../../application/queries/live-chat/get-chat.query';
import { ListChatsQuery } from '../../../application/queries/live-chat/list-chats.query';

import { StartChatRequestDTO } from '../../dtos/requests/live-chat/start-chat.dto';
import { SendChatMessageRequestDTO } from '../../dtos/requests/live-chat/send-chat-message.dto';
import { TransferChatRequestDTO } from '../../dtos/requests/live-chat/transfer-chat.dto';
import { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import { LiveChatControllerMapper } from '../../mappers/live-chat.controller.mapper';

@ApiTags('LiveChat')
@ApiBearerAuth()
@Controller({ path: 'live-chats', version: '1' })
export class LiveChatController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: LiveChatControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async start(
    @Body() body: StartChatRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<LiveChatResponseDTO> {
    const result = await this.commandBus.execute(
      new StartChatCommand({
        userId,
        visitorId: body.visitorId,
        trigger: body.trigger as never,
        subject: body.subject,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<LiveChatResponseDTO> {
    const result = await this.queryBus.execute(new GetChatQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly LiveChatResponseDTO[]> {
    const result = await this.queryBus.execute(new ListChatsQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Post(':id/messages')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async sendMessage(
    @Param('id') id: string,
    @Body() body: SendChatMessageRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<LiveChatResponseDTO> {
    const result = await this.commandBus.execute(
      new SendChatMessageCommand({
        sessionId: id,
        senderId: userId,
        senderType: (body.senderType as never) ?? 'customer',
        content: body.content,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/transfer')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async transfer(
    @Param('id') id: string,
    @Body() body: TransferChatRequestDTO,
  ): Promise<LiveChatResponseDTO> {
    const result = await this.commandBus.execute(
      new TransferChatCommand({
        sessionId: id,
        toAgentId: body.toAgentId,
        reason: body.reason,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/end')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async end(
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ): Promise<LiveChatResponseDTO> {
    const result = await this.commandBus.execute(
      new EndChatCommand({ sessionId: id, reason: body.reason }),
    );
    return this.mapper.toResponse(result);
  }
}
