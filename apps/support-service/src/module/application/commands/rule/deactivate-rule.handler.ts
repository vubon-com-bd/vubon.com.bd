/**
 * DeactivateRuleHandler
 * @module support-service/application/commands/rule
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeactivateRuleCommand } from './deactivate-rule.command';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';
import type { RuleServiceInterface } from '../../services/interfaces/rule.service.interface';

export class DeactivateRuleHandler extends BaseCommandHandler<
  DeactivateRuleCommand,
  RuleResponseDTO
> {
  readonly commandType = 'support.rule.deactivate';

  constructor(private readonly ruleService: RuleServiceInterface) {
    super();
  }

  async execute(command: DeactivateRuleCommand): Promise<RuleResponseDTO> {
    return this.ruleService.deactivate(command.ruleId);
  }
}
