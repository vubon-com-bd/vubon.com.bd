import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { MarketingAnalyticsService } from '../../application/services/impl/marketing-analytics.service';
import { MarketingAnalyticsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/marketing-analytics.prisma.repository';
import { AnalyticsCacheRepository } from '../../infrastructure/persistence/cache/repositories/analytics.cache.repository';
import { MarketingAnalyticsController } from '../../interfaces/controllers/rest/marketing-analytics.controller';
import {
  GetMarketingAnalyticsHandler,
  GetMarketingOverviewHandler,
  GetAttributionReportHandler,
} from '../../application/queries/analytics';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [MarketingAnalyticsController],
  providers: [
    MarketingAnalyticsService,
    { provide: 'MarketingAnalyticsRepository', useClass: MarketingAnalyticsPrismaRepository },
    AnalyticsCacheRepository,
    GetMarketingAnalyticsHandler,
    GetMarketingOverviewHandler,
    GetAttributionReportHandler,
  ],
  exports: [MarketingAnalyticsService, 'MarketingAnalyticsRepository'],
})
export class MarketingAnalyticsModule {}
