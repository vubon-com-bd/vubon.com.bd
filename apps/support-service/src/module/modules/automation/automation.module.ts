/**
 * AutomationModule
 * @module support-service/modules/automation
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AutomationService } from '../../application/services/impl/automation.service';
import { AutomationMapper } from '../../application/mappers/automation.mapper';
import { CreateAutomationHandler } from '../../application/commands/automation/create-automation.handler';
import { UpdateAutomationHandler } from '../../application/commands/automation/update-automation.handler';
import { EnableAutomationHandler } from '../../application/commands/automation/enable-automation.handler';
import { DisableAutomationHandler } from '../../application/commands/automation/disable-automation.handler';
import { TriggerAutomationHandler } from '../../application/commands/automation/trigger-automation.handler';
import { GetAutomationHandler } from '../../application/queries/automation/get-automation.handler';
import { ListAutomationsHandler } from '../../application/queries/automation/list-automations.handler';
import { AutomationController } from '../../interfaces/controllers/rest/automation.controller';
import { AutomationControllerMapper } from '../../interfaces/mappers/automation.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [AutomationController],
  providers: [
    AutomationService,
    AutomationMapper,
    AutomationControllerMapper,
    CreateAutomationHandler,
    UpdateAutomationHandler,
    EnableAutomationHandler,
    DisableAutomationHandler,
    TriggerAutomationHandler,
    GetAutomationHandler,
    ListAutomationsHandler,
  ],
  exports: [AutomationService],
})
export class AutomationModule {}
