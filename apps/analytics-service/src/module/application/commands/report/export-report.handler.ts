import { ReportService } from '../../services/impl/report.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { ExportReportCommand } from './export-report.command.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

@Injectable()
@CommandHandler(ExportReportCommand)
export class ExportReportHandler extends BaseCommandHandler<ExportReportCommand, ReportResponseData>
  implements ICommandHandler<ExportReportCommand> {
  readonly commandType = 'analytics.report.export';
  constructor(private readonly service: ReportService) { super(); }
  async execute(command: ExportReportCommand): Promise<ReportResponseData> {
    const report = await this.service.findById(command.reportId);
    if (!report) throw new Error('Report not found');
    return report;
  }
}
