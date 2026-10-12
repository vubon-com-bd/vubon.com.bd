import { ReportService } from '../../services/impl/report.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { GenerateReportCommand } from './generate-report.command.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

@Injectable()
@CommandHandler(GenerateReportCommand)
export class GenerateReportHandler extends BaseCommandHandler<GenerateReportCommand, ReportResponseData>
  implements ICommandHandler<GenerateReportCommand> {
  readonly commandType = 'analytics.report.generate';
  constructor(private readonly service: ReportService) { super(); }
  async execute(command: GenerateReportCommand): Promise<ReportResponseData> {
    return this.service.generate(command.reportId, command.payload);
  }
}
