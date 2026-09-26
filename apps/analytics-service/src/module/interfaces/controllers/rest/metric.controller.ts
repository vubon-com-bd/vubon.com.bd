import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { AggregateMetricQuery } from '../../../application/queries/metric/aggregate-metric.query';
import { TimeSeriesQuery } from '../../../application/queries/metric/time-series.query';
import { MetricSwagger } from '../../swagger/metric.swagger';
import { AnalyticsAccessGuard } from '../../guards/analytics-access.guard';

interface AggregateBody {
  metricNames: string[];
  aggregation: string;
  fromDate: string;
  toDate: string;
  interval?: string;
  groupBy?: string[];
}

@MetricSwagger.Tag()
@Controller('analytics/metrics')
@UseGuards(JwtAuthGuard, AnalyticsAccessGuard)
export class MetricController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('aggregate')
  @HttpCode(HttpStatus.OK)
  @MetricSwagger.Aggregate()
  async aggregate(@Body() body: AggregateBody): Promise<unknown> {
    return this.queryBus.execute(
      new AggregateMetricQuery(
        body.metricNames,
        body.aggregation,
        body.fromDate,
        body.toDate,
        body.interval,
        body.groupBy,
      ),
    );
  }

  @Get('time-series')
  @MetricSwagger.TimeSeries()
  async timeSeries(
    @Query('metricName') metricName: string,
    @Query('interval') interval: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<unknown> {
    return this.queryBus.execute(
      new TimeSeriesQuery(metricName, interval, fromDate, toDate),
    );
  }
}
