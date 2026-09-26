import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MetricAggregationService } from '../../application/services/impl/metric-aggregation.service';
import { MetricAggregationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/metric-aggregation.prisma.repository';
import { MetricAggregationCacheRepository } from '../../infrastructure/persistence/cache/repositories/metric-aggregation.cache.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    MetricAggregationPrismaRepository,
    MetricAggregationCacheRepository,
    MetricAggregationService,
  ],
  exports: [
    MetricAggregationService,
    MetricAggregationPrismaRepository,
    MetricAggregationCacheRepository,
  ],
})
export class MetricAggregationModule {}
