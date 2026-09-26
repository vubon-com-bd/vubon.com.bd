/**
 * ChatbotController — HTTP adapter
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

import { SendChatbotMessageCommand } from '../../../application/commands/chatbot/send-chatbot-message.command';
import { TrainIntentCommand } from '../../../application/commands/chatbot/train-intent.command';
import { TrainEntityCommand } from '../../../application/commands/chatbot/train-entity.command';
import { GetChatbotQuery } from '../../../application/queries/chatbot/get-chatbot.query';
import { ListChatbotsQuery } from '../../../application/queries/chatbot/list-chatbots.query';

import { SendChatbotMessageRequestDTO } from '../../dtos/requests/chatbot/send-chatbot-message.dto';
import { TrainIntentRequestDTO } from '../../dtos/requests/chatbot/train-intent.dto';
import { TrainEntityRequestDTO } from '../../dtos/requests/chatbot/train-entity.dto';
import { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';
import { ChatbotControllerMapper } from '../../mappers/chatbot.controller.mapper';

@ApiTags('Chatbots')
@ApiBearerAuth()
@Controller({ path: 'chatbots', version: '1' })
export class ChatbotController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: ChatbotControllerMapper,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ChatbotResponseDTO> {
    const result = await this.queryBus.execute(new GetChatbotQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly ChatbotResponseDTO[]> {
    const result = await this.queryBus.execute(new ListChatbotsQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Post(':id/messages')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async sendMessage(
    @Param('id') id: string,
    @Body() body: SendChatbotMessageRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<ChatbotResponseDTO> {
    const reply = await this.commandBus.execute(
      new SendChatbotMessageCommand({
        chatbotId: id,
        sessionId: body.sessionId,
        userId,
        message: body.message,
      }),
    );
    // Return the parent chatbot shape (reply content is included in reply.text via DTO if needed)
    const chatbot = await this.queryBus.execute(new GetChatbotQuery(id));
    void reply;
    return this.mapper.toResponse(chatbot);
  }

  @Post(':id/intents')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async trainIntent(
    @Param('id') id: string,
    @Body() body: TrainIntentRequestDTO,
  ): Promise<ChatbotResponseDTO> {
    const result = await this.commandBus.execute(
      new TrainIntentCommand({
        chatbotId: id,
        intent: body.intent as never,
        responses: body.responses,
        keywords: body.keywords,
        confidence: body.confidence,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/entities')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async trainEntity(
    @Param('id') id: string,
    @Body() body: TrainEntityRequestDTO,
  ): Promise<ChatbotResponseDTO> {
    const result = await this.commandBus.execute(
      new TrainEntityCommand({
        chatbotId: id,
        name: body.name,
        entityType: body.entityType as never,
        required: body.required,
        enumValues: body.enumValues,
      }),
    );
    return this.mapper.toResponse(result);
  }
}
