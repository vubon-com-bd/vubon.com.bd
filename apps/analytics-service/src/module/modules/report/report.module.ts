/**
 * Report Module
 */
import { Module } from '@nestjs/common';
import { ReportController } from '../../interfaces/controllers/rest/report.controller.js';
import { REPORT_COMMAND_HANDLERS } from './commands/index.js';
import { REPORT_QUERY_HANDLERS } from './queries/index.js';
import { REPORT_SAGAS } from './sagas/index.js';
import { ReportPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/report.prisma.repository.js';
import { ReportFilterPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/report-filter.prisma.repository.js';
import { ReportService } from '../../application/services/impl/report.service.js';
import { ReportFilterService } from '../../application/services/impl/report-filter.service.js';
import { ReportValidator } from '../../interfaces/validators/report.validator.js';
import { ReportHealthIndicator } from './health/index.js';

@Module({
  controllers: [ReportController],
  providers: [
    ReportPrismaRepository,
    ReportFilterPrismaRepository,
    ReportService,
    ReportFilterService,
    ReportValidator,
    ...REPORT_COMMAND_HANDLERS as readonly unknown[] as never[],
    ...REPORT_QUERY_HANDLERS as readonly unknown[] as never[],
    ...REPORT_SAGAS as readonly unknown[] as never[],
    ReportHealthIndicator,
  ],
  exports: [
    ReportService,
    ReportFilterService,
    ReportPrismaRepository,
    ReportHealthIndicator,
  ],
})
export class ReportModule {}
