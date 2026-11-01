/**
 * TemplateModule
 * @module notification-service/modules/template
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { TemplateController } from '@interfaces/controllers/rest/template.controller.js';
import { TEMPLATE_COMMAND_HANDLERS } from './commands/index.js';
import { TEMPLATE_QUERY_HANDLERS } from './queries/index.js';
import { TemplateOwnerGuard } from '@interfaces/guards/template-owner.guard.js';

// ─── Services (with DI tokens) ──────────────
import { TemplateService } from '@application/services/impl/template.service.js';
import { TEMPLATE_SERVICE } from '@application/services/interfaces/template.service.interface.js';
import { TemplateVariableService } from '@application/services/impl/template-variable.service.js';
import { TEMPLATE_VARIABLE_SERVICE } from '@application/services/interfaces/template-variable.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [TemplateController],
  providers: [
    TemplateService,
    { provide: TEMPLATE_SERVICE, useExisting: TemplateService },
    TemplateVariableService,
    { provide: TEMPLATE_VARIABLE_SERVICE, useExisting: TemplateVariableService },
    ...(TEMPLATE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(TEMPLATE_QUERY_HANDLERS as readonly unknown[] as never[]),
    TemplateOwnerGuard,
  ],
  exports: [
    TemplateService,
    TEMPLATE_SERVICE,
    TemplateVariableService,
    TEMPLATE_VARIABLE_SERVICE,
  ],
})
export class TemplateModule {}
