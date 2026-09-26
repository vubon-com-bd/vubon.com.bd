/**
 * MessageController — HTTP adapter
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

import { SendMessageCommand } from '../../../application/commands/message/send-message.command';
import { MarkMessageReadCommand } from '../../../application/commands/message/mark-read.command';
import { GetMessageQuery } from '../../../application/queries/message/get-message.query';
import { ListMessagesQuery } from '../../../application/queries/message/list-messages.query';

import { SendMessageRequestDTO } from '../../dtos/requests/message/send-message.dto';
import { MarkMessageReadRequestDTO } from '../../dtos/requests/message/mark-read.dto';
import { MessageResponseDTO } from '../../dtos/responses/message-response.dto';
import { MessageControllerMapper } from '../../mappers/message.controller.mapper';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller({ path: 'conversations/:conversationId/messages', version: '1' })
export class MessageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: MessageControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async send(
    @Param('conversationId') conversationId: string,
    @Body() body: SendMessageRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<MessageResponseDTO> {
    const result = await this.commandBus.execute(
      new SendMessageCommand({
        conversationId,
        content: body.content,
        type: body.type as never,
        attachments: body.attachments,
        isInternal: body.isInternal,
        senderId: userId,
        senderType: 'customer',
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(
    @Param('conversationId') conversationId: string,
  ): Promise<readonly MessageResponseDTO[]> {
    const result = await this.queryBus.execute(
      new ListMessagesQuery(conversationId, 1, 50),
    );
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Get(':messageId')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('messageId') messageId: string,
  ): Promise<MessageResponseDTO> {
    const result = await this.queryBus.execute(new GetMessageQuery(messageId));
    return this.mapper.toResponse(result);
  }

  @Post(':messageId/read')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async markRead(
    @Param('messageId') messageId: string,
    @Body() _body: MarkMessageReadRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<MessageResponseDTO> {
    const result = await this.commandBus.execute(
      new MarkMessageReadCommand({ messageId, readerId: userId }),
    );
    return this.mapper.toResponse(result);
  }
}
