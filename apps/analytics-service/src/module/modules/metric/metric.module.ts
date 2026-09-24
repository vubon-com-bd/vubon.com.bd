import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MetricController } from '../../interfaces/controllers/rest/metric.controller';
import { MetricService } from '../../application/services/impl/metric.service';
import { MetricAggregationService } from '../../application/services/impl/metric-aggregation.service';
import { GetMetricHandler } from '../../application/queries/metric/get-metric.handler';
import { AggregateMetricHandler } from '../../application/queries/metric/aggregate-metric.handler';
import { TimeSeriesHandler } from '../../application/queries/metric/time-series.handler';
import { MetricPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/metric.prisma.repository';
import { MetricAggregationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/metric-aggregation.prisma.repository';
import { MetricCacheRepository } from '../../infrastructure/persistence/cache/repositories/metric.cache.repository';
import { MetricAggregatorService } from '../../infrastructure/services/internal/metric-aggregator.service';
import { TimeSeriesAggregatorService } from '../../infrastructure/services/internal/time-series-aggregator.service';

const HANDLERS = [
  GetMetricHandler,
  AggregateMetricHandler,
  TimeSeriesHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [MetricController],
  providers: [
    MetricPrismaRepository,
    MetricAggregationPrismaRepository,
    MetricCacheRepository,
    MetricAggregatorService,
    TimeSeriesAggregatorService,
    MetricService,
    MetricAggregationService,
    ...HANDLERS,
  ],
  exports: [
    MetricService,
    MetricAggregationService,
    MetricPrismaRepository,
    MetricCacheRepository,
    MetricAggregatorService,
  ],
})
export class MetricModule {}
