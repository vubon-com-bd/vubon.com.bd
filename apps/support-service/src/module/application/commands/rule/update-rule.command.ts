/**
 * UpdateRuleCommand
 * @module support-service/application/commands/rule
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateRuleRequestDTO } from '../../dtos/requests/rule/update-rule.dto';

export class UpdateRuleCommand extends BaseCommand {
  readonly type = 'support.rule.update';

  constructor(public readonly payload: UpdateRuleRequestDTO) {
    super();
  }
}
