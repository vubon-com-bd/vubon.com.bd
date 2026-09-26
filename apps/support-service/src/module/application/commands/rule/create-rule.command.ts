/**
 * CreateRuleCommand
 * @module support-service/application/commands/rule
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateRuleRequestDTO } from '../../dtos/requests/rule/create-rule.dto';

export class CreateRuleCommand extends BaseCommand {
  readonly type = 'support.rule.create';

  constructor(public readonly payload: CreateRuleRequestDTO) {
    super();
  }
}
