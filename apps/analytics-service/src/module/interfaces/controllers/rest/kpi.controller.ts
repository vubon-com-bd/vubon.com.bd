import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreateKpiCommand } from '../../../application/commands/kpi/create-kpi.command';
import { UpdateKpiCommand } from '../../../application/commands/kpi/update-kpi.command';
import { EvaluateKpiCommand } from '../../../application/commands/kpi/evaluate-kpi.command';
import { ListKpisQuery } from '../../../application/queries/kpi/list-kpis.query';
import { GetKpiQuery } from '../../../application/queries/kpi/get-kpi.query';
import { GetKpiResultsQuery } from '../../../application/queries/kpi/get-kpi-results.query';
import {
  CreateKpiRequestDTO,
  UpdateKpiRequestDTO,
  EvaluateKpiRequestDTO,
} from '../../dtos/requests';
import { KpiSwagger } from '../../swagger/kpi.swagger';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';
import { AdminOnlyGuard } from '../../guards/admin-only.guard';

@KpiSwagger.Tag()
@Controller('analytics/kpis')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class KpiController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @KpiSwagger.Create()
  @UseGuards(AdminOnlyGuard)
  async create(@Body() body: CreateKpiRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateKpiCommand(
        body.name,
        body.metricName,
        body.target,
        body.threshold,
        body.ownerId,
      ),
    );
  }

  @Put(':id')
  @KpiSwagger.Update()
  @UseGuards(AdminOnlyGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateKpiRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateKpiCommand(id, body.name, body.target, body.threshold, body.metricName),
    );
  }

  @Post(':id/evaluate')
  @HttpCode(HttpStatus.OK)
  @KpiSwagger.Evaluate()
  async evaluate(
    @Param('id') id: string,
    @Body() body: EvaluateKpiRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new EvaluateKpiCommand(id, body.actual, body.evaluatedAt),
    );
  }

  @Get()
  @KpiSwagger.List()
  async list(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new ListKpisQuery(limit ? Number(limit) : 50, offset ? Number(offset) : 0),
    );
  }

  @Get(':id')
  @KpiSwagger.List()
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetKpiQuery(id));
  }

  @Get(':id/results')
  @KpiSwagger.GetResults()
  async getResults(
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new GetKpiResultsQuery(id, limit ? Number(limit) : 20),
    );
  }
}
