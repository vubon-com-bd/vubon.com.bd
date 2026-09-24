import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ExportReportCommand } from './export-report.command';
import type { ReportServiceInterface } from '../../services/interfaces/report.service.interface';

export interface ExportReportResult {
  readonly format: string;
  readonly filename: string;
  readonly mimeType: string;
}

@CommandHandler(ExportReportCommand)
export class ExportReportHandler
  extends BaseCommandHandler<ExportReportCommand, ExportReportResult>
  implements ICommandHandler<ExportReportCommand>
{
  readonly commandType = 'analytics.report.export';

  constructor(private readonly reportService: ReportServiceInterface) {
    super();
  }

  async execute(command: ExportReportCommand): Promise<ExportReportResult> {
    return this.reportService.export({
      reportId: command.reportId,
      format: command.format as never,
      filename: command.filename,
    });
  }
}
