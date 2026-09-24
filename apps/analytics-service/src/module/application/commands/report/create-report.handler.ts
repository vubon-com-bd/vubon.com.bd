import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateReportCommand } from './create-report.command';
import type { ReportServiceInterface } from '../../services/interfaces/report.service.interface';
import type { ReportResponseDTO } from '../../dtos/responses';

@CommandHandler(CreateReportCommand)
export class CreateReportHandler
  extends BaseCommandHandler<CreateReportCommand, ReportResponseDTO>
  implements ICommandHandler<CreateReportCommand>
{
  readonly commandType = 'analytics.report.create';

  constructor(private readonly reportService: ReportServiceInterface) {
    super();
  }

  async execute(command: CreateReportCommand): Promise<ReportResponseDTO> {
    return this.reportService.create({
      type: command.reportType as never,
      format: command.reportFormat as never,
      ownerId: command.ownerId,
    });
  }
}
