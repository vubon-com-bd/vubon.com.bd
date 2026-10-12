/**
 * Metric Module
 */
import { Module } from '@nestjs/common';
import { MetricController } from '../../interfaces/controllers/rest/metric.controller.js';
import { METRIC_COMMAND_HANDLERS } from './commands/index.js';
import { METRIC_QUERY_HANDLERS } from './queries/index.js';
import { METRIC_SAGAS } from './sagas/index.js';
import { MetricPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/metric.prisma.repository.js';
import { MetricAggregationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/metric-aggregation.prisma.repository.js';
import { MetricService } from '../../application/services/impl/metric.service.js';
import { MetricAggregationService } from '../../application/services/impl/metric-aggregation.service.js';
import { MetricValidator } from '../../interfaces/validators/metric.validator.js';
import { MetricHealthIndicator } from './health/index.js';

@Module({
  controllers: [MetricController],
  providers: [
    MetricPrismaRepository,
    MetricAggregationPrismaRepository,
    MetricService,
    MetricAggregationService,
    MetricValidator,
    ...METRIC_COMMAND_HANDLERS as readonly unknown[] as never[],
    ...METRIC_QUERY_HANDLERS as readonly unknown[] as never[],
    ...METRIC_SAGAS as readonly unknown[] as never[],
    MetricHealthIndicator,
  ],
  exports: [
    MetricService,
    MetricAggregationService,
    MetricPrismaRepository,
    MetricHealthIndicator,
  ],
})
export class MetricModule {}
