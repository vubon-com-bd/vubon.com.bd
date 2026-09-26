/**
 * RuleModule
 * @module support-service/modules/rule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RuleService } from '../../application/services/impl/rule.service';
import { RuleMapper } from '../../application/mappers/rule.mapper';
import { CreateRuleHandler } from '../../application/commands/rule/create-rule.handler';
import { UpdateRuleHandler } from '../../application/commands/rule/update-rule.handler';
import { ActivateRuleHandler } from '../../application/commands/rule/activate-rule.handler';
import { DeactivateRuleHandler } from '../../application/commands/rule/deactivate-rule.handler';
import { GetRuleHandler } from '../../application/queries/rule/get-rule.handler';
import { ListRulesHandler } from '../../application/queries/rule/list-rules.handler';
import { RuleController } from '../../interfaces/controllers/rest/rule.controller';
import { RuleControllerMapper } from '../../interfaces/mappers/rule.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [RuleController],
  providers: [
    RuleService,
    RuleMapper,
    RuleControllerMapper,
    CreateRuleHandler,
    UpdateRuleHandler,
    ActivateRuleHandler,
    DeactivateRuleHandler,
    GetRuleHandler,
    ListRulesHandler,
  ],
  exports: [RuleService],
})
export class RuleModule {}
