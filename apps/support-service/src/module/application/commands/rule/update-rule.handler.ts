import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateRuleCommand } from './update-rule.command';
import type { SupportRuleRepository } from '../../../domain/repositories/support-rule.repository.interface';
import { RuleIdVO } from '../../../domain/value-objects/primitives/rule-id.vo';
import { RuleNotFoundError } from '../../../domain/errors/rule.errors';

@CommandHandler(UpdateRuleCommand)
export class UpdateRuleHandler
  extends BaseCommandHandler<UpdateRuleCommand, void>
  implements ICommandHandler<UpdateRuleCommand>
{
  readonly commandType = 'support.rule.update';

  constructor(private readonly ruleRepo: SupportRuleRepository) {
    super();
  }

  async execute(command: UpdateRuleCommand): Promise<void> {
    const existing = await this.ruleRepo.findById(RuleIdVO.create(command.ruleId));
    if (!existing) throw new RuleNotFoundError(command.ruleId);
  }
}
