import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ScheduleSmsCampaignCommand } from './schedule-sms-campaign.command';

@CommandHandler(ScheduleSmsCampaignCommand)
export class ScheduleSmsCampaignHandler
  extends BaseCommandHandler<ScheduleSmsCampaignCommand, void>
  implements ICommandHandler<ScheduleSmsCampaignCommand>
{
  readonly commandType = 'marketing.sms-marketing.schedule';
  async execute(command: ScheduleSmsCampaignCommand): Promise<void> {
    void command;
  }
}
