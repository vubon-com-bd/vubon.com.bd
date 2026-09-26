import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateReportCommand } from './generate-report.command';
import type { ReportServiceInterface } from '../../services/interfaces/report.service.interface';
import type { ReportResponseDTO } from '../../dtos/responses';

@CommandHandler(GenerateReportCommand)
export class GenerateReportHandler
  extends BaseCommandHandler<GenerateReportCommand, ReportResponseDTO>
  implements ICommandHandler<GenerateReportCommand>
{
  readonly commandType = 'analytics.report.generate';

  constructor(private readonly reportService: ReportServiceInterface) {
    super();
  }

  async execute(command: GenerateReportCommand): Promise<ReportResponseDTO> {
    return this.reportService.generate({
      reportId: command.reportId,
      fromDate: command.fromDate,
      toDate: command.toDate,
      filters: command.filters,
    });
  }
}
