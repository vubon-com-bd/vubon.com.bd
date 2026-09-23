import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { MarketingReportService } from '../../application/services/impl/marketing-report.service';
import { MarketingReportPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/marketing-report.prisma.repository';
import { MarketingReportController } from '../../interfaces/controllers/rest/marketing-report.controller';
import { GenerateReportHandler } from '../../application/commands/report';
import { GetReportHandler, ListReportsHandler } from '../../application/queries/report';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [MarketingReportController],
  providers: [
    MarketingReportService,
    { provide: 'MarketingReportRepository', useClass: MarketingReportPrismaRepository },
    GenerateReportHandler,
    GetReportHandler,
    ListReportsHandler,
  ],
  exports: [MarketingReportService, 'MarketingReportRepository'],
})
export class MarketingReportModule {}
