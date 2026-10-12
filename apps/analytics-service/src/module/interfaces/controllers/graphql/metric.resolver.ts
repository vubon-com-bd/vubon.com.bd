/**
 * Metric GraphQL Resolver
 * @module analytics-service/interfaces/controllers/graphql
 *
 * Read-only GraphQL endpoints for analytics metrics.
 * Delegates to application QueryBus — no business logic.
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetMetricQuery } from '../../../application/queries/metric/get-metric.query.js';
import { AggregateMetricQuery } from '../../../application/queries/metric/aggregate-metric.query.js';
import type { MetricAggregationResponseData } from '../../../application/dtos/responses/metric-aggregation-response.dto.js';
import type { MetricResponseData } from '../../../application/dtos/responses/metric-response.dto.js';

@Resolver('Metric')
export class MetricResolver {
  private readonly logger = new Logger(MetricResolver.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query('metric')
  async getMetric(@Args('id') id: string): Promise<MetricResponseData> {
    this.logger.debug(`GraphQL: get metric ${id}`);
    return this.queryBus.execute(new GetMetricQuery(id));
  }

  @Query('aggregateMetric')
  async aggregateMetric(
    @Args('metric') metric: string,
    @Args('aggregation') aggregation: string,
    @Args('period') period: string,
    @Args('fromDate') fromDate?: string,
    @Args('toDate') toDate?: string
  ): Promise<MetricAggregationResponseData> {
    this.logger.debug(`GraphQL: aggregate ${metric} by ${aggregation}`);
    return this.queryBus.execute(
      new AggregateMetricQuery({
        metric,
        aggregation,
        period,
        fromDate,
        toDate,
      })
    );
  }
}
