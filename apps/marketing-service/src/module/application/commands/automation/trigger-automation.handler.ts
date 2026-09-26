import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TriggerAutomationCommand } from './trigger-automation.command';
import type { MarketingAutomationServiceInterface } from '../../services/interfaces/marketing-automation.service.interface';

@CommandHandler(TriggerAutomationCommand)
export class TriggerAutomationHandler
  extends BaseCommandHandler<TriggerAutomationCommand, void>
  implements ICommandHandler<TriggerAutomationCommand> {
  readonly commandType = 'marketing.automation.trigger';
  constructor(private readonly automationService: MarketingAutomationServiceInterface) { super(); }
  async execute(command: TriggerAutomationCommand): Promise<void> {
    await this.automationService.trigger(command.automationId, command.userId);
  }
}
