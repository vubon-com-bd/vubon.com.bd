/**
 * UpdateRuleHandler
 * @module support-service/application/commands/rule
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateRuleCommand } from './update-rule.command';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';
import type { RuleServiceInterface } from '../../services/interfaces/rule.service.interface';

export class UpdateRuleHandler extends BaseCommandHandler<
  UpdateRuleCommand,
  RuleResponseDTO
> {
  readonly commandType = 'support.rule.update';

  constructor(private readonly ruleService: RuleServiceInterface) {
    super();
  }

  async execute(command: UpdateRuleCommand): Promise<RuleResponseDTO> {
    return this.ruleService.update(command.payload);
  }
}
