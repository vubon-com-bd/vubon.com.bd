/**
 * Cohort Controller
 */
import {
  Body, Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CreateCohortCommand } from '../../../application/commands/cohort/create-cohort.command.js';
import { AnalyzeCohortCommand } from '../../../application/commands/cohort/analyze-cohort.command.js';
import { GetCohortQuery } from '../../../application/queries/cohort/get-cohort.query.js';
import { ListCohortsQuery } from '../../../application/queries/cohort/list-cohorts.query.js';
import {
  CreateCohortRequestDto,
  AnalyzeCohortRequestDto,
} from '../../dtos/requests/cohort-funnel.request.dto.js';
import {
  CohortResponseDto,
  CohortAnalysisResponseDto,
} from '../../dtos/responses/analytics.response.dto.js';

@ApiTags('Analytics — Cohorts')
@Controller('analytics/cohorts')
@UseGuards(JwtAuthGuard)
export class CohortController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async create(@Body() body: CreateCohortRequestDto): Promise<CohortResponseDto> {
    return this.commandBus.execute(new CreateCohortCommand(body));
  }

  @Post(':id/analyze')
  async analyze(
    @Param('id') id: string,
    @Body() body: AnalyzeCohortRequestDto
  ): Promise<CohortAnalysisResponseDto> {
    return this.commandBus.execute(new AnalyzeCohortCommand(id, body));
  }

  @Get()
  async list(): Promise<CohortResponseDto[]> {
    return this.queryBus.execute(new ListCohortsQuery());
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<CohortResponseDto> {
    return this.queryBus.execute(new GetCohortQuery(id));
  }
}
