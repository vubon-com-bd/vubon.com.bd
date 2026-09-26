/**
 * FeedbackController — HTTP adapter
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

import { SubmitFeedbackCommand } from '../../../application/commands/feedback/submit-feedback.command';
import { ReviewFeedbackCommand } from '../../../application/commands/feedback/review-feedback.command';
import { GetFeedbackQuery } from '../../../application/queries/feedback/get-feedback.query';
import { ListFeedbacksQuery } from '../../../application/queries/feedback/list-feedbacks.query';

import { SubmitFeedbackRequestDTO } from '../../dtos/requests/feedback/submit-feedback.dto';
import { ReviewFeedbackRequestDTO } from '../../dtos/requests/feedback/review-feedback.dto';
import { FeedbackResponseDTO } from '../../dtos/responses/feedback-response.dto';
import { FeedbackControllerMapper } from '../../mappers/feedback.controller.mapper';

@ApiTags('Feedback')
@ApiBearerAuth()
@Controller({ path: 'feedback', version: '1' })
export class FeedbackController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: FeedbackControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async submit(
    @Body() body: SubmitFeedbackRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<FeedbackResponseDTO> {
    const result = await this.commandBus.execute(
      new SubmitFeedbackCommand({
        type: body.type as never,
        title: body.title,
        message: body.message,
        rating: body.rating,
        attachments: body.attachments,
        isAnonymous: body.isAnonymous,
        referenceId: body.referenceId,
        referenceType: body.referenceType,
        userId,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/review')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async review(
    @Param('id') id: string,
    @Body() body: ReviewFeedbackRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<FeedbackResponseDTO> {
    const result = await this.commandBus.execute(
      new ReviewFeedbackCommand({
        feedbackId: id,
        reviewerId: userId,
        status: body.status as never,
        note: body.note,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<FeedbackResponseDTO> {
    const result = await this.queryBus.execute(new GetFeedbackQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly FeedbackResponseDTO[]> {
    const result = await this.queryBus.execute(new ListFeedbacksQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }
}
