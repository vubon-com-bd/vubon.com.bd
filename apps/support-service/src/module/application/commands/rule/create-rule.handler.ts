import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateRuleCommand } from './create-rule.command';
import type { RuleServiceInterface } from '../../services/interfaces/rule.service.interface';

@CommandHandler(CreateRuleCommand)
export class CreateRuleHandler
  extends BaseCommandHandler<CreateRuleCommand, { id: string }>
  implements ICommandHandler<CreateRuleCommand>
{
  readonly commandType = 'support.rule.create';

  constructor(private readonly ruleService: RuleServiceInterface) {
    super();
  }

  async execute(command: CreateRuleCommand): Promise<{ id: string }> {
    return this.ruleService.create({
      name: command.name,
      type: command.type_,
      condition: command.condition,
      action: command.action,
      priority: command.priority,
    });
  }
}
