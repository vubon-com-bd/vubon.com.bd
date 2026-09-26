import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AnalyticsController } from '../../interfaces/controllers/rest/analytics.controller';

import { AiAnalyticsPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/ai-analytics.prisma.repository';
import { AnalyticsReportPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/analytics-report.prisma.repository';

import { AiAnalyticsService } from '../../application/services/impl/ai-analytics.service';
import { AnalyticsReportService } from '../../application/services/impl/analytics-report.service';

import { AnalyticsQueue } from '../../infrastructure/queues/analytics.queue';
import { AnalyticsProcessorWorker } from '../../infrastructure/workers/analytics-processor.worker';

import { AnalyticsQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [AnalyticsController],
  providers: [
    AiAnalyticsPrismaRepository,
    AnalyticsReportPrismaRepository,
    AiAnalyticsService,
    AnalyticsReportService,
    AnalyticsQueue,
    AnalyticsProcessorWorker,
    ...AnalyticsQueryHandlers,
  ],
  exports: [AiAnalyticsService, AnalyticsReportService],
})
export class AnalyticsModule {}
