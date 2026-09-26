/**
 * ActivateRuleHandler
 * @module support-service/application/commands/rule
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ActivateRuleCommand } from './activate-rule.command';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';
import type { RuleServiceInterface } from '../../services/interfaces/rule.service.interface';

export class ActivateRuleHandler extends BaseCommandHandler<
  ActivateRuleCommand,
  RuleResponseDTO
> {
  readonly commandType = 'support.rule.activate';

  constructor(private readonly ruleService: RuleServiceInterface) {
    super();
  }

  async execute(command: ActivateRuleCommand): Promise<RuleResponseDTO> {
    return this.ruleService.activate(command.ruleId);
  }
}
