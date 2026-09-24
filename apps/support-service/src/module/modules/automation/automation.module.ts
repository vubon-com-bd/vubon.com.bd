import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AutomationController } from '../../interfaces/controllers/rest/automation.controller';
import { CreateAutomationHandler } from '../../application/commands/automation/create-automation.handler';
import { UpdateAutomationHandler } from '../../application/commands/automation/update-automation.handler';
import { AutomationService } from '../../application/services/impl/automation.service';

@Module({
  imports: [CqrsModule],
  controllers: [AutomationController],
  providers: [CreateAutomationHandler, UpdateAutomationHandler, AutomationService],
  exports: [AutomationService],
})
export class AutomationModule {}
