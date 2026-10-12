/**
 * Metric Controller
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
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { GetMetricQuery } from '../../../application/queries/metric/get-metric.query.js';
import { AggregateMetricQuery } from '../../../application/queries/metric/aggregate-metric.query.js';
import {
  QueryMetricRequestDto,
  AggregateMetricRequestDto,
} from '../../dtos/requests/metric.request.dto.js';
import { MetricResponseDto, MetricAggregationResponseDto } from '../../dtos/responses/metric.response.dto.js';
import { MetricControllerMapper } from '../../mappers/metric.controller.mapper.js';
import { QueryLoggingInterceptor } from '../../interceptors/query-logging.interceptor.js';
import { QueryTimeoutInterceptor } from '../../interceptors/query-timeout.interceptor.js';
import { AnalyticsCache } from '../../interceptors/analytics-cache.interceptor.js';
import { ApiGetMetric, ApiAggregateMetric, ApiMetricTag } from '../../swagger/metric.swagger.js';

@ApiTags('Analytics — Metrics')
@Controller('analytics/metrics')
@UseInterceptors(QueryLoggingInterceptor, QueryTimeoutInterceptor)
@UseGuards(JwtAuthGuard)
export class MetricController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get(':id')
  @ApiGetMetric()
  async getOne(@Param('id') id: string): Promise<MetricResponseDto> {
    const result = await this.queryBus.execute(new GetMetricQuery(id));
    return MetricControllerMapper.toHttp(result);
  }

  @Post('aggregate')
  @HttpCode(HttpStatus.OK)
  @AnalyticsCache(300)
  @ApiAggregateMetric()
  async aggregate(
    @Body() body: AggregateMetricRequestDto
  ): Promise<MetricAggregationResponseDto> {
    const result = await this.queryBus.execute(new AggregateMetricQuery(body));
    return MetricControllerMapper.aggregationToHttp(result);
  }

  @Post('query')
  @HttpCode(HttpStatus.OK)
  @AnalyticsCache(300)
  async query(@Body() _body: QueryMetricRequestDto): Promise<MetricAggregationResponseDto> {
    // Placeholder — wire to a dedicated query handler in next iteration
    const result = await this.queryBus.execute(
      new AggregateMetricQuery({
        metric: _body.metric,
        aggregation: 'sum',
        period: _body.period,
        fromDate: _body.fromDate,
        toDate: _body.toDate,
        dimensions: _body.dimensions,
      })
    );
    return MetricControllerMapper.aggregationToHttp(result);
  }
}
