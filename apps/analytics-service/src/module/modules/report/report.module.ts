import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ReportController } from '../../interfaces/controllers/rest/report.controller';
import { ReportService } from '../../application/services/impl/report.service';
import { ReportFilterService } from '../../application/services/impl/report-filter.service';
import { CreateReportHandler } from '../../application/commands/report/create-report.handler';
import { GenerateReportHandler } from '../../application/commands/report/generate-report.handler';
import { ScheduleReportHandler } from '../../application/commands/report/schedule-report.handler';
import { ExportReportHandler } from '../../application/commands/report/export-report.handler';
import { GetReportHandler } from '../../application/queries/report/get-report.handler';
import { ListReportsHandler } from '../../application/queries/report/list-reports.handler';
import { ListScheduledReportsHandler } from '../../application/queries/report/list-scheduled-reports.handler';
import { ReportPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/report.prisma.repository';
import { ReportFilterPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/report-filter.prisma.repository';
import { ReportCacheRepository } from '../../infrastructure/persistence/cache/repositories/report.cache.repository';
import { ReportRendererService } from '../../infrastructure/services/internal/report-renderer.service';
import { ExportService } from '../../infrastructure/services/internal/export.service';
import { ReportGeneratorWorker } from '../../infrastructure/workers/report-generator.worker';
import { ReportSenderWorker } from '../../infrastructure/workers/report-sender.worker';

const HANDLERS = [
  CreateReportHandler,
  GenerateReportHandler,
  ScheduleReportHandler,
  ExportReportHandler,
  GetReportHandler,
  ListReportsHandler,
  ListScheduledReportsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ReportController],
  providers: [
    ReportPrismaRepository,
    ReportFilterPrismaRepository,
    ReportCacheRepository,
    ReportRendererService,
    ExportService,
    ReportGeneratorWorker,
    ReportSenderWorker,
    ReportService,
    ReportFilterService,
    ...HANDLERS,
  ],
  exports: [
    ReportService,
    ReportFilterService,
    ReportPrismaRepository,
    ReportCacheRepository,
    ReportRendererService,
    ExportService,
  ],
})
export class ReportModule {}
