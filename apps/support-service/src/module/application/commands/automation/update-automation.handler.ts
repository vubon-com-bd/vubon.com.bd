import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAutomationCommand } from './update-automation.command';
import type { SupportAutomationRepository } from '../../../domain/repositories/support-automation.repository.interface';
import { AutomationIdVO } from '../../../domain/value-objects/primitives/automation-id.vo';
import { AutomationNotFoundError } from '../../../domain/errors/automation.errors';

@CommandHandler(UpdateAutomationCommand)
export class UpdateAutomationHandler
  extends BaseCommandHandler<UpdateAutomationCommand, void>
  implements ICommandHandler<UpdateAutomationCommand>
{
  readonly commandType = 'support.automation.update';

  constructor(private readonly automationRepo: SupportAutomationRepository) {
    super();
  }

  async execute(command: UpdateAutomationCommand): Promise<void> {
    const existing = await this.automationRepo.findById(
      AutomationIdVO.create(command.automationId),
    );
    if (!existing) throw new AutomationNotFoundError(command.automationId);
  }
}
