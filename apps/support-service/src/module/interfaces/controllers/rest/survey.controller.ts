/**
 * SurveyController — HTTP adapter
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

import { CreateSurveyCommand } from '../../../application/commands/survey/create-survey.command';
import { RespondSurveyCommand } from '../../../application/commands/survey/respond-survey.command';
import { CloseSurveyCommand } from '../../../application/commands/survey/close-survey.command';
import { GetSurveyQuery } from '../../../application/queries/survey/get-survey.query';
import { ListSurveysQuery } from '../../../application/queries/survey/list-surveys.query';

import { CreateSurveyRequestDTO } from '../../dtos/requests/survey/create-survey.dto';
import { RespondSurveyRequestDTO } from '../../dtos/requests/survey/respond-survey.dto';
import { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';
import { SurveyControllerMapper } from '../../mappers/survey.controller.mapper';

@ApiTags('Surveys')
@ApiBearerAuth()
@Controller({ path: 'surveys', version: '1' })
export class SurveyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: SurveyControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateSurveyRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<SurveyResponseDTO> {
    const result = await this.commandBus.execute(
      new CreateSurveyCommand({
        title: body.title,
        description: body.description,
        type: body.type as never,
        questions: body.questions.map((q) => ({
          id: q.id,
          type: q.type as never,
          text: q.text,
          required: q.required,
          options: q.options,
          order: q.order,
        })),
        targetAudience: body.targetAudience,
        startAt: new Date().toISOString(),
        createdBy: userId,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<SurveyResponseDTO> {
    const result = await this.queryBus.execute(new GetSurveyQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly SurveyResponseDTO[]> {
    const result = await this.queryBus.execute(new ListSurveysQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Post(':id/respond')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async respond(
    @Param('id') id: string,
    @Body() body: RespondSurveyRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<SurveyResponseDTO> {
    const result = await this.commandBus.execute(
      new RespondSurveyCommand({
        surveyId: id,
        userId,
        answers: body.answers,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/close')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async close(
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ): Promise<SurveyResponseDTO> {
    const result = await this.commandBus.execute(
      new CloseSurveyCommand({ surveyId: id, reason: body.reason }),
    );
    return this.mapper.toResponse(result);
  }
}
