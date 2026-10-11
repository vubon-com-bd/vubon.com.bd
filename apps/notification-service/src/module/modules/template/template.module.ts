/**
 * TemplateModule — template CRUD + render
 * @module notification-service/modules/template
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { TemplateController } from '../../interfaces/controllers/rest/template.controller.js';
import { TemplateService } from '../../application/services/impl/template.service.js';
import { TEMPLATE_SERVICE } from '../../application/services/interfaces/template.service.interface.js';
import { TEMPLATE_COMMAND_HANDLERS } from '../../application/commands/template/index.js';
import { TEMPLATE_QUERY_HANDLERS } from '../../application/queries/template/index.js';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [TemplateController],
  providers: [
    TemplateService,
    { provide: TEMPLATE_SERVICE, useExisting: TemplateService },
    ...TEMPLATE_COMMAND_HANDLERS,
    ...TEMPLATE_QUERY_HANDLERS,
  ],
  exports: [TemplateService, TEMPLATE_SERVICE],
})
export class TemplateModule {}
