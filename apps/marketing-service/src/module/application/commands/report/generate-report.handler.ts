import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { GenerateReportCommand } from './generate-report.command';
import type { MarketingReportServiceInterface } from '../../services/interfaces/marketing-report.service.interface';
import type { MarketingReportResponseDTO } from '../../dtos/responses/marketing-report-response.dto';

@CommandHandler(GenerateReportCommand)
export class GenerateReportHandler
  extends BaseCommandHandler<GenerateReportCommand, MarketingReportResponseDTO>
  implements ICommandHandler<GenerateReportCommand> {
  readonly commandType = 'marketing.report.generate';
  constructor(private readonly reportService: MarketingReportServiceInterface) { super(); }
  async execute(command: GenerateReportCommand): Promise<MarketingReportResponseDTO> {
    return this.reportService.generate({
      name: command.name,
      type: command.reportType,
      format: command.format,
    } as never);
  }
}
