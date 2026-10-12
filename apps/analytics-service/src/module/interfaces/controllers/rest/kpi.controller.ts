/**
 * KPI Controller
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CreateKpiCommand } from '../../../application/commands/kpi/create-kpi.command.js';
import { UpdateKpiCommand } from '../../../application/commands/kpi/update-kpi.command.js';
import { EvaluateKpiCommand } from '../../../application/commands/kpi/evaluate-kpi.command.js';
import { GetKpiQuery } from '../../../application/queries/kpi/get-kpi.query.js';
import { ListKpisQuery } from '../../../application/queries/kpi/list-kpis.query.js';
import {
  CreateKpiRequestDto,
  UpdateKpiRequestDto,
  EvaluateKpiRequestDto,
} from '../../dtos/requests/kpi.request.dto.js';
import { KpiResponseDto, KpiResultResponseDto } from '../../dtos/responses/kpi.response.dto.js';
import { KpiControllerMapper } from '../../mappers/kpi.controller.mapper.js';
import { QueryLoggingInterceptor } from '../../interceptors/query-logging.interceptor.js';
import { ApiCreateKpi, ApiUpdateKpi, ApiEvaluateKpi, ApiGetKpi, ApiListKpis } from '../../swagger/kpi.swagger.js';

@ApiTags('Analytics — KPIs')
@Controller('analytics/kpis')
@UseGuards(JwtAuthGuard)
@UseInterceptors(QueryLoggingInterceptor)
export class KpiController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @ApiCreateKpi()
  async create(@Body() body: CreateKpiRequestDto): Promise<KpiResponseDto> {
    const result = await this.commandBus.execute(new CreateKpiCommand(body));
    return KpiControllerMapper.toHttp(result);
  }

  @Patch(':id')
  @ApiUpdateKpi()
  async update(
    @Param('id') id: string,
    @Body() body: UpdateKpiRequestDto
  ): Promise<KpiResponseDto> {
    const result = await this.commandBus.execute(new UpdateKpiCommand(id, body));
    return KpiControllerMapper.toHttp(result);
  }

  @Post(':id/evaluate')
  @HttpCode(HttpStatus.OK)
  @ApiEvaluateKpi()
  async evaluate(
    @Param('id') id: string,
    @Body() body: EvaluateKpiRequestDto
  ): Promise<KpiResultResponseDto> {
    const result = await this.commandBus.execute(new EvaluateKpiCommand(id, body));
    return KpiControllerMapper.resultToHttp(result);
  }

  @Get(':id')
  @ApiGetKpi()
  async getOne(@Param('id') id: string): Promise<KpiResponseDto> {
    const result = await this.queryBus.execute(new GetKpiQuery(id));
    return KpiControllerMapper.toHttp(result);
  }

  @Get()
  @ApiListKpis()
  async list(@Query('onlyActive') onlyActive?: string): Promise<KpiResponseDto[]> {
    const result = await this.queryBus.execute(
      new ListKpisQuery(onlyActive !== 'false')
    );
    return KpiControllerMapper.toHttpList(result);
  }
}
