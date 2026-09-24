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
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateCohortCommand } from '../../../application/commands/cohort/create-cohort.command';
import { AnalyzeCohortCommand } from '../../../application/commands/cohort/analyze-cohort.command';
import { GetCohortQuery } from '../../../application/queries/cohort/get-cohort.query';
import { ListCohortsQuery } from '../../../application/queries/cohort/list-cohorts.query';
import {
  CreateCohortRequestDTO,
  AnalyzeCohortRequestDTO,
} from '../../dtos/requests';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';

@Controller('analytics/cohorts')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class CohortController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateCohortRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateCohortCommand(
        body.name,
        body.period,
        body.fromDate,
        body.toDate,
        body.userIds,
      ),
    );
  }

  @Get()
  async list(
    @Query('period') period?: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListCohortsQuery(period, limit ? Number(limit) : 50),
    );
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetCohortQuery(id));
  }

  @Post(':id/analyze')
  @HttpCode(HttpStatus.OK)
  async analyze(
    @Param('id') id: string,
    @Body() body: AnalyzeCohortRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AnalyzeCohortCommand(id, body.periods ?? 30),
    );
  }
}
