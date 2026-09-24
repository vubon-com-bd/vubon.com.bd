import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RuleController } from '../../interfaces/controllers/rest/rule.controller';
import { CreateRuleHandler } from '../../application/commands/rule/create-rule.handler';
import { UpdateRuleHandler } from '../../application/commands/rule/update-rule.handler';
import { RuleService } from '../../application/services/impl/rule.service';

@Module({
  imports: [CqrsModule],
  controllers: [RuleController],
  providers: [CreateRuleHandler, UpdateRuleHandler, RuleService],
  exports: [RuleService],
})
export class RuleModule {}
