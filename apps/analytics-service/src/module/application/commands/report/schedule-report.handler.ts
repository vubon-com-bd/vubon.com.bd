import { ReportService } from '../../services/impl/report.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { ScheduleReportCommand } from './schedule-report.command.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

@Injectable()
@CommandHandler(ScheduleReportCommand)
export class ScheduleReportHandler extends BaseCommandHandler<ScheduleReportCommand, ReportResponseData>
  implements ICommandHandler<ScheduleReportCommand> {
  readonly commandType = 'analytics.report.schedule';
  constructor(private readonly service: ReportService) { super(); }
  async execute(command: ScheduleReportCommand): Promise<ReportResponseData> {
    const report = await this.service.findById(command.reportId);
    if (!report) throw new Error('Report not found');
    return report;
  }
}
