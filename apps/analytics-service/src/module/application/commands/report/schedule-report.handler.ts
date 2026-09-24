import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ScheduleReportCommand } from './schedule-report.command';
import type { ReportServiceInterface } from '../../services/interfaces/report.service.interface';
import type { ReportResponseDTO } from '../../dtos/responses';

@CommandHandler(ScheduleReportCommand)
export class ScheduleReportHandler
  extends BaseCommandHandler<ScheduleReportCommand, ReportResponseDTO>
  implements ICommandHandler<ScheduleReportCommand>
{
  readonly commandType = 'analytics.report.schedule';

  constructor(private readonly reportService: ReportServiceInterface) {
    super();
  }

  async execute(command: ScheduleReportCommand): Promise<ReportResponseDTO> {
    return this.reportService.schedule({
      reportId: command.reportId,
      frequency: command.frequency as never,
      cronExpression: command.cronExpression,
      recipients: command.recipients ? [...command.recipients] : undefined,
    });
  }
}
