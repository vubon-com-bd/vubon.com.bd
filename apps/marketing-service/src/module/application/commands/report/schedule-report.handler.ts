import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ScheduleReportCommand } from './schedule-report.command';

@CommandHandler(ScheduleReportCommand)
export class ScheduleReportHandler
  extends BaseCommandHandler<ScheduleReportCommand, void>
  implements ICommandHandler<ScheduleReportCommand> {
  readonly commandType = 'marketing.report.schedule';
  async execute(command: ScheduleReportCommand): Promise<void> {
    void command;
  }
}
