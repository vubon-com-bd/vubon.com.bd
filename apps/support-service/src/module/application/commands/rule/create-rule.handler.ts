/**
 * CreateRuleHandler
 * @module support-service/application/commands/rule
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateRuleCommand } from './create-rule.command';
import type { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';
import type { RuleServiceInterface } from '../../services/interfaces/rule.service.interface';

export class CreateRuleHandler extends BaseCommandHandler<
  CreateRuleCommand,
  RuleResponseDTO
> {
  readonly commandType = 'support.rule.create';

  constructor(private readonly ruleService: RuleServiceInterface) {
    super();
  }

  async execute(command: CreateRuleCommand): Promise<RuleResponseDTO> {
    return this.ruleService.create(command.payload);
  }
}
